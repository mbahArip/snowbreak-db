import fs from "fs/promises";
import path from "path";
import { IOperativeDetail, IOperatives } from "types/database/operatives";

const dbPath = path.resolve(process.cwd(), "db", "operatives");

const data: Promise<IOperatives[]> = new Promise(async (resolve, reject) => {
  const data: IOperatives[] = [];
  // let fetchPath = dbPath;
  async function fetchData(fetchPath: string) {
    const files = await fs.readdir(fetchPath);
    for (const file of files) {
      const filepath = path.join(fetchPath, file);
      const stat = await fs.stat(filepath);
      if (stat.isDirectory()) {
        await fetchData(filepath);
      } else if (
        file === "index.ts" &&
        !filepath.includes("template") &&
        filepath !== path.resolve(dbPath, "index.ts")
      ) {
        const absolutePath = path.resolve(filepath);
        const relativePath = path.relative(dbPath, absolutePath);
        const importPath = relativePath.replace(/\\/g, "/").replace(".ts", "");
        const { default: operative } = (await import(
          "db/operatives/" + importPath
        )) satisfies IOperativeDetail;
        const dataSummary: IOperatives = {
          key: operative.key,
          fullName: operative.fullName,
          name: operative.name,
          title: operative.title,
          weapon: operative.weapon,
          rarity: operative.rarity,
          description: operative.description,
          images: {
            icon: `/img/operatives/icon/${operative.key}.png`,
            portrait: `/img/operatives/portrait/${operative.key}.png`,
          },
        };

        data.push(dataSummary);
      }
    }
  }

  try {
    await fetchData(dbPath);
    const resolvedData = await data;
    resolve(resolvedData.sort((a, b) => a.key.localeCompare(b.key)));
  } catch (error) {
    reject(error);
  }
});

export default await data;
