const PostgresService = require('../../services/postgres_service');
const _pg = new PostgresService();
const transporter = require('../../services/mailer_service');
const ExcelService = require('../../services/Excel_service');
const _exceljs = new ExcelService();


const createPeople = async (req, res) => {
    try {
        let person = req.body;
        let sql = `INSERT INTO public.people
        ("name", email)
        VALUES('${person.name}', '${person.email}');`;
        let result = await _pg.executeSql(sql);
        // send mail with defined transport object
        await transporter.sendMail({
            from: '"Santiago Cano 👻" <cano2030@gmail.com>', // sender address
            to: person.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello ${person.name}?</b>", // html body
        });
        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "Usuario creado, revisa tu correo!" : "El usuario no fue creado",
            content: person,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "Ha ocurrido un error creando el usuario",
            content: error,
        });
    }
};

const createReport = async (req, res) => {
	try {
        let sql = 'select * from people'
        let result = await _pg.executeSql(sql);
        let rows = result.rows;
		await _exceljs.createSheet(rows);
		return res.send({
			ok: true,
			message: "Excel file created",
			download_link: "http://localhost:3001/reports/Ureports.xlsx"
		});
	} catch (error) {
		return res.send({
			ok: false,
			message: "There was an error in the server generating the excel report",
			content: error,
		});
	}
};


module.exports = { createPeople, createReport };