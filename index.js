import express from "express"; // Import modul express
import cors from "cors"; // Import modul cors
import session from "express-session"; // Import modul express-session
import dotenv from "dotenv"; // Import modul dotenv untuk mengatur variabel lingkungan
import UserRoute from "./route/UserRoute.js"; // Import UserRoute dari file UserRoute.js
import ProductRoute from "./route/ProductRoute.js"; // Import ProductRoute dari file ProductRoute.js
import AuthRoute from "./route/AuthRoute.js"; // Import AuthRoute dari file AuthRoute.js
import SequelizeStore from "connect-session-sequelize"; // Import modul connect-session-sequelize

import db from "./config/database.js"; // Import instance koneksi database dari file database.js

// Muat variabel lingkungan dari file .env
dotenv.config();

// Buat aplikasi express baru
const app = express();

const sessionStore = SequelizeStore(session.Store); // Membuat instance SequelizeStore
const store = new sessionStore({
  db: db, // Menggunakan instance koneksi database
});

// // Sinkronkan model dengan database
// (async () => {
//   await db.sync();
// })();

// Gunakan session middleware untuk mengelola sesi pengguna
app.use(
  session({
    secret: process.env.APP_SECRET_SESSION, // Kunci rahasia untuk sesi
    resave: false, // Jangan simpan sesi jika tidak dimodifikasi
    saveUninitialized: true, // Simpan sesi yang belum diinisialisasi
    store: store, // Gunakan store untuk menyimpan data sesi
    cookie: {
      secure: "auto", // Otomatis atur flag aman berdasarkan protokol permintaan
    },
  })
);

// Gunakan middleware cors untuk menangani permintaan lintas domain
app.use(
  cors({
    origin: process.env.APP_URL, // Izinkan permintaan dari asal ini
    credentials: true, // Izinkan kredensial untuk disertakan dalam permintaan
  })
);

// Gunakan middleware express.json untuk mem-parsing body permintaan JSON
app.use(express.json());

app.use(UserRoute); // Gunakan UserRoute
app.use(ProductRoute); // Gunakan ProductRoute
app.use(AuthRoute); // Gunakan AuthRoute

// store.sync();

// Dengarkan aplikasi pada port yang ditentukan dalam variabel lingkungan
app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`); // Cetak port dimana server berjalan
});
