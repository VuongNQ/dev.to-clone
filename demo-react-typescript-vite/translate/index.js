import { readFile, opendir, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";
import ExcelJS from "exceljs";
import { google } from "googleapis";
import { getAuth } from "./authorGoogleSheet.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const localePath = path.join(__dirname, "../", "src/locales/");

const SheetID = "1uA-3kb32GcRiH2A8ocSq3tpu324Kbh_lKJXUxxSqVwo";

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1uA-3kb32GcRiH2A8ocSq3tpu324Kbh_lKJXUxxSqVwo
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function exportJson() {
	console.time("Execution Time");

	const auth = await getAuth();
	const sheets = google.sheets({ version: "v4", auth });
	const res = await sheets.spreadsheets.get({
		spreadsheetId: SheetID,
		ranges: [],
	});
	// console.log('raw >>>', res.data.sheets[0].properties);
	const allSheet = res.data.sheets;
	if (!allSheet || !allSheet.length) {
		console.log("No sheet found.");
		return;
	}
	const sources = allSheet.map((sheet) => sheet.properties.title);
	// console.log('sources>>> ', sources);

	const getAllSheet = sources.map((source) => {
		return sheets.spreadsheets.values.get({
			spreadsheetId: SheetID,
			range: source,
			majorDimension: "COLUMNS",
		});
	});

	const sourcesTrans = (await Promise.all(getAllSheet)).map(
		(rs) => rs.data.values
	);

	const localeObj = sourcesTrans.reduce((initFull, source) => {
		// if(index !== 4) return initFull;
		// split list key from array
		const listKey = source.shift();

		listKey.forEach((key, indexKey) => {
			if (indexKey === 0) return;
			source.forEach((s) => {
				// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
				initFull[s[0]] ??= {};
				// init path object and set content
				assign(initFull[s[0]], key, s[indexKey]);
			});
		});

		return initFull;
	}, {});

	const locales = Object.keys(localeObj);

	for await (const lang of locales) {
		// console.log(lang);
		const path = localePath + lang.toLocaleLowerCase() + ".json";
		await writeFile(path, JSON.stringify(localeObj[lang], null, 2), (err) => {
			if (err) {
				console.log("Failed to write updated data to file >> lang", lang);
				return;
			}
			console.log("Updated file successfully >>>", lang);
		});
	}
	console.log("Build lang success");
	console.timeEnd("Execution Time");
}

function assign(obj, key, value) {
	let keys = key.split(".");
	let last = keys.pop();
	keys.forEach((k) => {
		if (!obj[k]) {
			obj[k] = {};
		}
		obj = obj[k];
	});

	obj[last] = value;
}

async function exportExcel() {
	try {
		const workbook = new ExcelJS.Workbook();
		workbook.creator = "Vuongnq";
		workbook.lastModifiedBy = "bySwift";
		// await initLayout(workbook);
		const { locales, sources, mapSource, mapKeys } = await getSourceLocale();
		if (!locales.length || !sources.length)
			console.error("not found file translate");
		// console.log('listLocale>>> ', locales, 'listSource>> ', sources, 'mapSource>>>', mapSource['one_expert_page']['en']);
		const title = locales.slice(0);
		title.unshift("key");
		const styleColumns = title.map((t) => {
			return {
				header: t.toLocaleUpperCase(),
				key: t,
				width: 50,
				style: {
					alignment: { vertical: "middle", horizontal: "left", wrapText: true },
				},
			};
		});
		sources.forEach((s) => {
			const worksheet = workbook.addWorksheet(s);
			worksheet.columns = styleColumns;
			const listKey = mapKeys[s].reduce((i, k) => {
				const trans = locales.map((l) => {
					return mapSource[s][l][k];
				});
				i.push([`${s}.${k}`, ...trans]);
				return i;
			}, []);
			worksheet.addRows(listKey);
			// style title
			worksheet.getRow(1).alignment = { vertical: "top", horizontal: "center" };
		});

		console.log("okie hen");
		workbook.xlsx.writeFile("build-locale-excel.xlsx");
	} catch (err) {
		console.error(err);
	}
}

async function getSourceLocale() {
	const dir = await opendir(localePath);
	let locales = [];
	let langObj = {};
	for await (const dirent of dir) {
		const filePath = pathToFileURL(localePath + dirent.name);
		const locale = dirent.name.split(".")[0];
		const contents = await readFile(filePath, { encoding: "utf8" });
		const translate = JSON.parse(contents);
		locales.push(locale);
		langObj[locale] = { ...translate };
	}

	const sources = Object.keys(langObj["en"]).map((k) => k);

	const mapSource = sources.reduce((i, s) => {
		i[s] = locales.reduce((init, l) => {
			init[l] = flatten(langObj[l][s]);
			return init;
		}, {});
		return i;
	}, {});

	const mapKeys = sources.reduce((i, s) => {
		i[s] = Object.keys(mapSource[s]["en"]).map((k) => k);
		return i;
	}, {});

	return {
		locales,
		sources,
		mapSource,
		mapKeys,
	};
}

// source from https://tutorial.eyehunts.com/js/flatten-nested-object-javascript-example-code/
function flatten(obj, prefix = "", res = {}) {
	return Object.entries(obj).reduce((r, [key, val]) => {
		const k = `${prefix}${key}`;
		if (typeof val === "object") {
			flatten(val, `${k}.`, r);
		} else {
			res[k] = val;
		}
		return r;
	}, res);
}

export { exportExcel, exportJson };
