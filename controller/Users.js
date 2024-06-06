import Users from "../model/UserModel.js"; // Impor UserModel untuk berinteraksi dengan database
import argon2 from "argon2"; // Impor pustaka argon2 untuk hashing password

// Mendapatkan semua pengguna
export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      // Mengambil semua pengguna dari database
      attributes: { exclude: ["password"] }, // Mengesampingkan bidang kata sandi dari data yang dikembalikan
    });
    res.status(200).json(users); // Merespons dengan pengguna yang ditemukan
  } catch (error) {
    res.status(500).json({ message: error.message }); // Mengatasi kesalahan
  }
};

// Mendapatkan satu pengguna berdasarkan ID
export const getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({
      // Mencari pengguna berdasarkan ID di database
      where: { uuid: req.params.id }, // Mencari berdasarkan ID yang diberikan dalam parameter permintaan
      attributes: { exclude: ["password"] }, // Mengesampingkan bidang kata sandi dari data yang dikembalikan
    });
    if (user) {
      res.status(200).json(user); // Jika pengguna ditemukan, merespons dengan data pengguna
    } else {
      res.status(404).json({ message: "Pengguna tidak ditemukan" }); // Jika pengguna tidak ditemukan, merespons dengan status 404
    }
  } catch (error) {
    res.status(500).json({ message: error.message }); // Mengatasi kesalahan
  }
};

// Membuat pengguna baru
export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, role } = req.body; // Mendapatkan data pengguna dari badan permintaan
  if (password !== confirmPassword) {
    // Memeriksa apakah password dan konfirmasi password cocok
    return res
      .status(400)
      .json({ message: "Password dan konfirmasi password tidak cocok" }); // Merespons dengan pesan kesalahan jika password tidak cocok
  }
  const hashedPassword = await argon2.hash(password); // Menghasilkan hash password menggunakan argon2

  try {
    const user = await Users.create({
      // Membuat pengguna baru dalam database
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json(user); // Merespons dengan pengguna yang dibuat
  } catch (error) {
    res.status(500).json({ message: error.message }); // Mengatasi kesalahan
  }
};

// Memperbarui pengguna
export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    // Menemukan pengguna berdasarkan ID di database
    where: { uuid: req.params.id },
  });
  if (!user) {
    // Memeriksa apakah pengguna ditemukan
    return res.status(404).json({ message: "Pengguna tidak ditemukan" }); // Merespons dengan pesan kesalahan jika pengguna tidak ditemukan
  }
  const { name, email, role, password, confirmPassword } = req.body; // Mendapatkan data pengguna yang diperbarui dari badan permintaan
  let hashedPassword; // Inisialisasi variabel untuk menyimpan hash password
  if (password === "" || password === null) {
    // Memeriksa apakah password kosong atau tidak ada
    hashedPassword = user.password; // Menggunakan password yang ada jika tidak ada password baru
  } else {
    hashedPassword = await argon2.hash(password); // Menghasilkan hash password baru menggunakan argon2
  }
  if (password !== confirmPassword) {
    // Memeriksa apakah password dan konfirmasi password cocok
    return res
      .status(400)
      .json({ message: "Password dan konfirmasi password tidak cocok" }); // Merespons dengan pesan kesalahan jika password tidak cocok
  }
  try {
    await Users.update(
      // Memperbarui pengguna dalam database
      {
        name,
        email,
        role,
        password: hashedPassword,
      },
      { where: { uuid: req.params.id } }
    );
    res.status(200).json({ message: "Pengguna diperbarui" }); // Merespons dengan pesan sukses
  } catch (error) {
    res.status(500).json({ message: error.message }); // Mengatasi kesalahan
  }
};

// Menghapus pengguna
export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    // Mencari pengguna berdasarkan ID di database
    where: { uuid: req.params.id },
  });
  if (!user) {
    // Memeriksa apakah pengguna ditemukan
    return res.status(404).json({ message: "Pengguna tidak ditemukan" }); // Merespons dengan pesan kesalahan jika pengguna tidak ditemukan
  }
  try {
    await Users.destroy({ where: { uuid: req.params.id } }); // Menghapus pengguna dari database
    res.status(200).json({ message: "Pengguna dihapus" }); // Merespons dengan pesan sukses
  } catch (error) {
    res.status(500).json({ message: error.message }); // Mengatasi kesalahan
  }
};
