import { Router, RequestHandler } from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from '../controllers/postController';

const router = Router();

router.post('/posts', createPost as RequestHandler[]);
router.put('/posts/:id', updatePost as RequestHandler[]);
router.delete('/posts/:id', deletePost as RequestHandler);
router.get('/posts/:id', getPost as RequestHandler);
router.get('/posts', getAllPosts as RequestHandler);

export default router;