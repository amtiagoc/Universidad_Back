const express = require("express");

const router = express.Router();

const _userController = require("../controllers/users/users.controller");
const _rolesController = require("../controllers/roles/roles.controller");
const _authController = require("../controllers/users/auth.controller");

// RUTAS PUBLICAS
// Rutas no necesitan un token
router.post("/login", _authController.getUserLogin);

//REGISTRO DEL MIDDLEWARE
router.use([_authController.verifyTokenMiddleware]);

// RUTAS PRIVADAS
router
  // Descrifrar y verificar token
  .get("/verify", _authController.verifyToken)
  //CRUD de usuarios
  .get("/usuarios/:id", _userController.getUser)
  .get("/usuarios", _userController.getUsers)
  .post("/usuarios", _userController.createUser)
  .put("/usuarios/:id", _userController.updateUser)
  .delete("/usuarios/:id", _userController.deleteUser)
  //CRUD de roles
  .get("/roles/:id", _rolesController.getRol)
  .get("/roles", _rolesController.getRoles)
  .post("/roles", _rolesController.createRol)
  .put("/roles/:id", _rolesController.updateRol)
  .delete("/roles/:id", _rolesController.deleteRol);

module.exports = router;
