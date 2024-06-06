import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari paket sequelize

// Membuat instance baru dari Sequelize untuk terhubung ke database
const db = new Sequelize("express_backend", "ammar", "root", {
  host: "localhost", // Host database
  dialect: "mysql", // Dialek database (jenis database)
});

export default db; // Eksport instance koneksi database
