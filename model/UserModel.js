import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari paket sequelize
import db from "../config/database.js"; // Mengimpor konfigurasi database

const { DataTypes } = Sequelize; // Destrukturisasi DataTypes dari Sequelize untuk akses yang lebih mudah

// Mendefinisikan model Users
const Users = db.define(
  "users", // Nama tabel dalam database
  {
    uuid: {
      type: DataTypes.STRING, // Tipe kolom adalah string
      defaultValue: DataTypes.UUIDV4, // Nilai default adalah UUID versi 4
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
      },
    },
    name: {
      type: DataTypes.STRING, // Tipe kolom adalah string
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
      },
    },
    email: {
      type: DataTypes.STRING, // Tipe kolom adalah string
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
        isEmail: true, // Nilai harus berupa alamat email yang valid
      },
    },
    password: {
      type: DataTypes.STRING, // Tipe kolom adalah string
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"), // Tipe kolom adalah ENUM dengan nilai "user" atau "admin"
      defaultValue: "user", // Nilai default adalah "user"
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
      },
    },
  },
  {
    timestamps: true, // Secara otomatis menambahkan kolom createdAt dan updatedAt
    freezeTableName: true, // Menggunakan nama tabel yang tepat seperti yang ditentukan, tanpa diubah menjadi bentuk jamak
  }
);

export default Users; // Mengekspor model Users
