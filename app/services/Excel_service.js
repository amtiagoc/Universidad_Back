
const ExcelJS = require("exceljs");

class ExcelService {
	constructor() {
		this.Workbook = new ExcelJS.Workbook();
	}
	async createSheet(People) {
		const peopleSheet = this.Workbook.addWorksheet("People_Report");
		peopleSheet.columns = [
			{header: "Id", key: "id", width: 10},
			{header: "Name", key: "name", width: 32},
			{header: "Mail", key: "email", width: 32},
		];
		People.forEach((person) => {
			peopleSheet.addRow(person);
		});
		await this.Workbook.xlsx.writeFile("reports/Ureports.xlsx");
	}
}
module.exports = ExcelService;