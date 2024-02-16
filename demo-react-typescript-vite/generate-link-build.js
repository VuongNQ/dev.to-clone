/* import { opendir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localePath = path.join(__dirname, "./", "dist/assets/");
const dir = await opendir(localePath);
let contentTxt = "";
for await (const dirent of dir) {
    const names = dirent.name.split(".");
    if (["js", "css"].includes(names[names.length - 1])) {
        // console.log(dirent.name);
        contentTxt += dirent.name + "\n";
    }
}

const pathTxt = path.join(__dirname, "./", "public/") + "clearCache.txt";
await writeFile(pathTxt, contentTxt); */
console.log("had create txt!");
