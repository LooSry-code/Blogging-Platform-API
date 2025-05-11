Blogging Platform API
Blogging Platform API adalah aplikasi backend RESTful yang dibangun untuk mengelola konten blog, termasuk operasi CRUD (Create, Read, Update, Delete) untuk post dan fitur pencarian berdasarkan kata kunci. Aplikasi ini menggunakan Express.js, TypeORM, dan MySQL untuk menyediakan API yang skalabel dan efisien, ditulis dalam TypeScript untuk keamanan tipe dan pengembangan yang lebih terstruktur.
Fitur

Operasi CRUD untuk Post:
Membuat post baru (POST /api/posts).
Mengambil semua post atau memfilter berdasarkan kata kunci (GET /api/posts).
Mengambil post berdasarkan ID (GET /api/posts/:id).
Memperbarui post (PUT /api/posts/:id).
Menghapus post (DELETE /api/posts/:id).


Validasi Input: Menggunakan express-validator untuk memastikan data yang masuk valid (misalnya, panjang judul minimal 3 karakter, konten minimal 10 karakter).
Pencarian Post: Memfilter post berdasarkan kata kunci pada judul, konten, atau kategori.
Penanganan Error: Middleware global untuk menangani error dengan respons JSON yang konsisten.
Database MySQL: Menggunakan TypeORM untuk interaksi dengan database, dengan sinkronisasi otomatis untuk pengembangan.
TypeScript: Pengetikan statis untuk mencegah error runtime dan meningkatkan maintainability.

Teknologi yang Digunakan

Node.js: Runtime untuk menjalankan aplikasi.
Express.js: Framework untuk menangani rute dan permintaan HTTP.
TypeORM: ORM untuk berinteraksi dengan database MySQL.
MySQL: Database relasional untuk menyimpan data post.
TypeScript: Bahasa pemrograman untuk pengetikan statis.
express-validator: Library untuk validasi input.
dotenv: Mengelola variabel lingkungan.
nodemon & ts-node: Alat pengembangan untuk hot-reloading dan menjalankan TypeScript.

Prasyarat
Sebelum menjalankan proyek ini, pastikan Anda memiliki:

Node.js (versi 16.x atau lebih baru): Unduh di sini.
MySQL (versi 8.x atau lebih baru): Unduh di sini atau gunakan layanan seperti XAMPP/MAMP.
Git: Untuk mengkloning repositori.
Terminal/CLI: Untuk menjalankan perintah.
Akun GitHub untuk mengkloning dan berkontribusi.

Instalasi
Ikuti langkah-langkah berikut untuk menyiapkan proyek di mesin lokal Anda:

Kloning Repositori:
git clone https://github.com/<your-username>/blogging-platform-api.git
cd blogging-platform-api


Instal Dependensi:Jalankan perintah berikut untuk menginstal semua dependensi yang diperlukan:
npm install


Konfigurasi Variabel Lingkungan:

Buat file .env di root direktori proyek.
Tambahkan konfigurasi berikut, sesuaikan dengan kredensial MySQL Anda:DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=blogging_platform
PORT=3000


Pastikan file .env ditambahkan ke .gitignore untuk mencegah kredensial diunggah ke GitHub.


Buat Database MySQL:

Jalankan MySQL di mesin Anda (misalnya, melalui XAMPP atau perintah sudo service mysql start).
Masuk ke MySQL:mysql -u root -p


Buat database blogging_platform:CREATE DATABASE blogging_platform;




Konfigurasi TypeORM (Opsional):

Jika tidak menggunakan .env, buat file ormconfig.json di root direktori:{
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "your_password",
  "database": "blogging_platform",
  "entities": ["src/entities/**/*.ts"],
  "synchronize": true,
  "logging": false
}


Catatan: Opsi synchronize: true hanya untuk pengembangan. Nonaktifkan di produksi dan gunakan migrasi TypeORM.



Menjalankan Aplikasi

Jalankan dalam Mode Pengembangan:

Gunakan nodemon untuk hot-reloading:npm run dev


Server akan berjalan di http://localhost:3000 (atau port yang ditentukan di .env).
Anda akan melihat pesan:Server running at http://localhost:3000




Jalankan dalam Mode Produksi:

Kompilasi TypeScript ke JavaScript:npm run build


Jalankan aplikasi:npm start





Pengujian
Untuk menguji API, gunakan alat seperti curl, Postman, atau Insomnia. Berikut adalah contoh pengujian menggunakan curl:

Membuat Post Baru:
curl -X POST http://localhost:3000/api/posts \
-H "Content-Type: application/json" \
-d '{"title": "My First Post", "content": "This is my first post content.", "category": "Tech", "tags": ["Tech", "Tutorial"]}'

Harapan: Status 201 dengan data post yang dibuat.

Mengambil Semua Post:
curl http://localhost:3000/api/posts

Harapan: Status 200 dengan array post.

Mengambil Post Berdasarkan ID:
curl http://localhost:3000/api/posts/1

Harapan: Status 200 dengan data post atau 404 jika tidak ditemukan.

Memperbarui Post:
curl -X PUT http://localhost:3000/api/posts/1 \
-H "Content-Type: application/json" \
-d '{"title": "Updated Post", "content": "This is updated content.", "category": "Tech", "tags": ["Tech", "Updated"]}'

Harapan: Status 200 dengan data post yang diperbarui.

Menghapus Post:
curl -X DELETE http://localhost:3000/api/posts/1

Harapan: Status 204 tanpa body.

Memfilter Post Berdasarkan Kata Kunci:
curl http://localhost:3000/api/posts?term=tech

Harapan: Status 200 dengan post yang cocok dengan kata kunci.


Verifikasi di MySQL:

Masuk ke MySQL:mysql -u root -p


Pilih database:USE blogging_platform;


Periksa data:SELECT * FROM posts;



Struktur Direktori
blogging-platform-api/
├── src/
│   ├── controllers/       # Logika untuk menangani permintaan API
│   │   └── postController.ts
│   ├── entities/         # Definisi entitas TypeORM
│   │   └── Post.ts
│   ├── routes/           # Definisi rute API
│   │   └── postRoutes.ts
│   └── index.ts          # Entry point aplikasi
├── .env                  # Variabel lingkungan (tidak di-commit)
├── .gitignore            # File yang diabaikan oleh Git
├── ormconfig.json        # Konfigurasi TypeORM (opsional)
├── package.json          # Dependensi dan skrip
├── tsconfig.json         # Konfigurasi TypeScript
└── README.md             # Dokumentasi proyek

Kontribusi
Kami menyambut kontribusi untuk meningkatkan proyek ini! Ikuti langkah-langkah berikut:

Fork Repositori:

Klik tombol "Fork" di GitHub untuk membuat salinan repositori.


Kloning Fork Anda:
git clone https://github.com/<your-username>/blogging-platform-api.git


Buat Branch Baru:
git checkout -b feature/your-feature


Lakukan Perubahan:

Tambahkan fitur atau perbaiki bug.
Pastikan kode mengikuti standar TypeScript dan lulus linting.


Commit dan Push:
git add .
git commit -m "Add your feature or fix"
git push origin feature/your-feature


Buat Pull Request:

Buka repositori di GitHub dan buat Pull Request ke branch main.
Jelaskan perubahan Anda dengan jelas.



Lisensi
Proyek ini dilisensikan di bawah MIT License. Lihat file LICENSE untuk detail.
Kontak
Jika Anda memiliki pertanyaan atau saran, silakan hubungi:

Email: lilosurury@example.com
GitHub: LooSry-code

Terima kasih telah menggunakan Blogging Platform API!
