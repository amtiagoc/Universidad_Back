//Servicio de Postgres
const PostgresService = require("../../services/postgres.service");
const _pg = new PostgresService();

/**
 * Método de consultar todos los roles
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getRoles = async (req, res) => {
  try {
    let sql = "select * from roles";
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Roles consultados",
      content: rows,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando los roles",
      content: error,
    });
  }
};

/**
 * Método para consultar un rol
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const getRol = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = "select * from roles WHERE id='" + id + "'";
    let result = await _pg.executeSql(sql);
    let rows = result.rows;
    return res.send({
      ok: true,
      message: "Rol consultado",
      content: rows[0],
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error consultando el rol",
      content: error,
    });
  }
};

/**
 * Método para crear un rol
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const createRol = async (req, res) => {
  try {
    let rol = req.body;
    let sql = `INSERT INTO public.roles (id, name, description) VALUES('${rol.id}', '${rol.name}', ${rol.description});`;
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Rol creado" : "El rol no fue creado",
      content: rol,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error creando el rol",
      content: error,
    });
  }
};

/**
 * Método para actualizar un rol
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const updateRol = async (req, res) => {
  try {
    let id = req.params.id;
    let rol = req.body;
    let sql = `UPDATE public.roles SET name='${rol.name}',  description='${rol.description}' WHERE id='${id}'`;
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Rol modificado" : "El rol no fue modificado",
      content: rol,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error modificando el rol",
      content: error,
    });
  }
};

/**
 * Método para eliminar rol
 * @param {Request} req
 * @param {Response} res
 * @returns
 */
const deleteRol = async (req, res) => {
  try {
    let id = req.params.id;
    let sql = `DELETE FROM public.roles WHERE id='${id}';  `;
    let result = await _pg.executeSql(sql);
    return res.send({
      ok: result.rowCount == 1,
      message: result.rowCount == 1 ? "Rol eliminado" : "El rol no fue eliminado",
      content: id,
    });
  } catch (error) {
    return res.send({
      ok: false,
      message: "Ha ocurrido un error eliminando el rol",
      content: error,
    });
  }
};

module.exports = { getRoles, createRol, updateRol, deleteRol, getRol };
