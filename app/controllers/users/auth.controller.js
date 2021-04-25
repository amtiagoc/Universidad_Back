const _jwt = require("../../services/jwt.service");
const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getUserLogin = async (req, res) => {
  try {
    let user = req.body;
    let sql = `select name, rol, id from users WHERE id='${user.id}' and password='${user.password}' limit 1`;
    let result = await _pg.executeSql(sql);
    let user_logged = result.rows[0];
    let token = user_logged ? _jwt.sign(user_logged) : null;
    return res.send({
      ok: user_logged ? true : false,
      message: user_logged
        ? `Bienvenido ${user_logged.name}`
        : "Usuario no encontrado, verificar identificación y/o contraseña.",
      content: token,
    });
  } catch (error) {
    console.log(error);
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando el usuario.",
      content: error,
    });
  }
};

/**
 *
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const verifyToken = (req, res) => {
  try {
    let token = req.headers.token;
    let user = _jwt.verify(token);
    return res.send({
      ok: true,
      message: "Token verificado",
      content: user,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Error verificando el token.",
      content: error,
    });
  }
};

const verifyTokenMiddleware = (req, res, next) => {
  try {
    let token = req.headers.token;
    let user = _jwt.verify(token);
    next();
  } catch (error) {
    return res.send({
      ok: false,
      message: "Middleware - Error verificando el token.",
      content: error,
    });
  }
};

module.exports = { getUserLogin, verifyToken, verifyTokenMiddleware };
