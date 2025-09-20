const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller.js'); // ← corregido
const authMiddleware = require('../../middlewares/authMiddleware'); // ← corregido

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/perfil', authMiddleware, userController.perfil);

module.exports = (app) => {
  app.use("/api", router);
};
