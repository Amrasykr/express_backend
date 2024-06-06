import Users from "../model/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  const user = await Users.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(404).json({ message: "Email tidak ditemukan" });
  }

  const validPassword = await argon2.verify(user.password, req.body.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Password salah" });
  }
  req.session.userId = user.uuid;

  const uuid = user.uuid;
  const name = user.name;
  const email = user.email;
  const role = user.role;
  res.status(200).json({ uuid, name, email, role });
};

export const checkAuth = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Anda belum masuk" });
  }
  const user = await Users.findOne({
    attributes: { exclude: ["password"] },
    where: { uuid: req.session.userId },
  });
  if (!user) {
    return res.status(404).json({ message: "Pengguna tidak ditemukan" });
  }
  res.status(200).json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    res.clearCookie("sid");
    res.status(200).json({ message: "Berhasil keluar" });
  });
};
