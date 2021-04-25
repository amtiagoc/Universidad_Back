//Servicio de Postgres
const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

/**
 * Método de consultar todos los usuarios
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getUsers = async (req, res) => {
  let sql = "select * from users";
  ////RESOLVIENDO LA PROMESA CON ASYNC-AWAIT
  try {
    let result = await _pg.executeSql(sql);
    let rows = result.rows;

    return res.send({
      ok: true,
      message: "Usuarios consultados",
      content: rows,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los usuario",
      content: error,
    });
  }
  //// RESOLVIENDO LA PROMESA CON THEN-CATCH
  // _pg
  //   .executeSql(sql)
  //   .then((result) => {
  //     return res.send(result.rows);
  //   })
  //   .catch((error) => {
  //     return res.send("Error");
  //   });
};

/**
 * Método para consultar un usuario
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getUser = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = "select * from users WHERE id='" + id + "'";
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Usuario consultado",
      content: rows[0],
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando el usuario",
      content: error,
    });
  }
};

/**
 * Método para crear un usuario
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createUser = async (req, res) => {
  try {
    let user = req.body;
    let sql = `INSERT INTO public.users (email, "password", id, name, rol) VALUES('${user.email}', '${user.password}', '${user.id}', '${user.name}', ${user.rol});`;
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Usuario creado" : "El usuario no fue creado",
      content: user,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error creando el usuario",
      content: error,
    });
  }
};

/**
 * Método para actualizar un usuario
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const updateUser = async (req, res) => {
  try {
    let id = req.params.id;
    let user = req.body;

    let sql = `UPDATE public.users
    SET email='${user.email}',  name='${user.name}', rol=${user.rol}
    WHERE id='${id}'`;
    let result = await _pg.executeSql(sql);

    return res.send({
      ok: result.rowCount == 1,
      message:
        result.rowCount == 1 ? "Usuario modificado" : "El usuario no fue modificado",
      content: user,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error modificando el usuario",
      content: error,
    });
  }
};

/**
 * Método para eliminar usuario
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const deleteUser = async (req, res) => {
  try {
    let id = req.params.id;

    let sql = `DELETE FROM public.users WHERE id='${id}';  `;
    let result = await _pg.executeSql(sql);

    return res.send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Usuario eliminado" : "El usuario no fue eliminado",
      content: id,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error eliminando el usuario",
      content: error,
    });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, getUser };
