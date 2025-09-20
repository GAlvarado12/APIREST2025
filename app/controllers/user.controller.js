const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = db.User;

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.json({ message: "Usuario registrado correctamente", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login exitoso", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.perfil = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "username", "email"]
    });
    res.json({ perfil: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
