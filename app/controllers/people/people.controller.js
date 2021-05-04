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
            from: '"Santiago Cano 👻" <aitest245@gmail.com>', // sender address
            to: person.email, // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: `<h1>Hola ${person.name}\</h1><hr></br>
                    <p>¡Bienvenido a la Universidad!, gracias por haberte registrado.</p> </br>`, // html body
        });
        return res.send({
            ok: true,
            message: result.rowCount == 1 ? "User created, check your email nowwww!" : "User was not created",
            content: person,
        });
    } catch (error) {
        return res.send({
            ok: false,
            message: "There was an error creating the user",
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