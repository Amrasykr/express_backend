import { Sequelize } from "sequelize"; // Mengimpor Sequelize dari paket sequelize
import db from "../config/database.js"; // Mengimpor konfigurasi database
import Users from "./UserModel.js"; // Mengimpor model Users

const { DataTypes } = Sequelize; // Destrukturisasi DataTypes dari Sequelize untuk akses yang lebih mudah

// Mendefinisikan model Products
const Products = db.define(
  "products", // Nama tabel dalam database
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
    price: {
      type: DataTypes.INTEGER, // Tipe kolom adalah integer
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
      },
    },
    description: {
      type: DataTypes.STRING, // Tipe kolom adalah string
      allowNull: false, // Kolom ini tidak boleh null
      validate: {
        notEmpty: true, // Nilai tidak boleh kosong
      },
    },
    userId: {
      type: DataTypes.INTEGER, // Tipe kolom adalah integer
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

// Menetapkan hubungan antara model Users dan Products
Users.hasMany(Products); // Seorang user bisa memiliki banyak produk
Products.belongsTo(Users, { foreignKey: "userId" }); // Setiap produk terkait dengan satu user melalui foreign key userId

export default Products; // Mengekspor model Products
