import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// Deklarasi entitas Post untuk tabel 'posts' di database
@Entity('posts')
export class Post {
  // Kolom ID dengan auto-increment
  @PrimaryGeneratedColumn()
  id!: number; // Non-null assertion: TypeORM akan mengisi nilai

  // Kolom title dengan panjang maksimum 255 karakter
  @Column({ type: 'varchar', length: 255 })
  title!: string; // Non-null assertion: TypeORM akan mengisi nilai

  // Kolom content untuk teks panjang
  @Column({ type: 'text' })
  content!: string; // Non-null assertion: TypeORM akan mengisi nilai

  // Kolom category dengan panjang maksimum 100 karakter
  @Column({ type: 'varchar', length: 100 })
  category!: string; // Non-null assertion: TypeORM akan mengisi nilai

  // Kolom tags disimpan sebagai JSON, boleh null
  @Column({ type: 'json', nullable: true })
  tags?: string[]; // Opsional karena nullable: true

  // Kolom createdAt otomatis diisi saat entitas dibuat
  @CreateDateColumn()
  createdAt!: Date; // Non-null assertion: TypeORM akan mengisi nilai

  // Kolom updatedAt otomatis diperbarui saat entitas diubah
  @UpdateDateColumn()
  updatedAt!: Date; // Non-null assertion: TypeORM akan mengisi nilai
}