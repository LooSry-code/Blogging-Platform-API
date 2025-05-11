import { Request, Response, RequestHandler, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import { getRepository } from 'typeorm';
import { Post } from '../entities/Post';

// Validasi untuk create dan update post
const postValidationRules = [
  body('title').isString().isLength({ min: 3 }).trim().withMessage('Title must be at least 3 characters'),
  body('content').isString().isLength({ min: 10 }).trim().withMessage('Content must be at least 10 characters'),
  body('category').isString().notEmpty().trim().withMessage('Category is required'),
  body('tags').isArray().optional().withMessage('Tags must be an array'),
];

// Create Blog Post
export const createPost = [
  ...postValidationRules,
  async (req: Request, res: Response) => {
    // Periksa error validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Buat instance Post dari body request
      const postRepository = getRepository(Post);
      const post = postRepository.create(req.body);
      // Simpan ke database
      const savedPost = await postRepository.save(post);
      // Kembalikan status 201 dengan data post
      res.status(201).json(savedPost);
    } catch (error: any) {
      // Tangani error, kembalikan status 400
      res.status(400).json({ message: error.message });
    }
  },
];

// Update Blog Post
export const updatePost = [
  ...postValidationRules.map((rule) => rule.optional()),
  async (req: Request, res: Response) => {
    // Validasi ID
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID' });
    }

    // Periksa error validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const postRepository = getRepository(Post);
      const post = await postRepository.findOneBy({ id });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      postRepository.merge(post, req.body);
      const updatedPost = await postRepository.save(post);
      res.status(200).json(updatedPost);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
];

// Delete Blog Post
export const deletePost: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  try {
    const postRepository = getRepository(Post);
    const result = await postRepository.delete(id);
    if (result.affected === 0) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
};

// Get Single Blog Post
export const getPost: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).json({ message: 'Invalid ID' });
    return;
  }

  try {
    const postRepository = getRepository(Post);
    const post = await postRepository.findOneBy({ id });
    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }
    res.status(200).json(post);
  } catch (error: any) {
    next(error);
  }
};

// Get All Blog Posts or Filter by Term
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const postRepository = getRepository(Post);
    const term = req.query.term as string;
    let posts;

    if (term) {
      // Filter post berdasarkan term di title, content, atau category
      posts = await postRepository
        .createQueryBuilder('post')
        .where('post.title LIKE :term', { term: `%${term}%` })
        .orWhere('post.content LIKE :term', { term: `%${term}%` })
        .orWhere('post.category LIKE :term', { term: `%${term}%` })
        .getMany();
    } else {
      // Ambil semua post
      posts = await postRepository.find();
    }

    // Kembalikan status 200 dengan array post
    res.status(200).json(posts);
  } catch (error: any) {
    // Tangani error, kembalikan status 400
    res.status(400).json({ message: error.message });
  }
};