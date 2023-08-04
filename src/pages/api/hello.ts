// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { GirlWeaponType } from "db/_helper/operatives/data/enum";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { IOperativeDetail, IOperativeOutfit } from "types/database/operatives";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const dataPath = path.join(
      process.cwd(),
      "db",
      "_helper",
      "operatives",
      "data"
    );
    console.time("Generating Operatives Data");
    const fileCard: Record<string, IOperativeDetail> = {};
    console.time("read card.tsv");
    await fs.readFile(path.join(dataPath, "card.tsv"), "utf-8").then((data) =>
      data.split("\r\n").map((row) => {
        const [key, value] = row.split("\t");
        const [id, type] = key.split("_");
        if (!id.startsWith("girl")) return;
        const girlId = id.slice(0, -1);
        const girlRarity = id.slice(-1);
        const girlNumber = id.split("girl")[1];
        fileCard[id] = {
          key: id,
          isReleased: true,
          fullName: fileCard[id]?.fullName || "",
          name: fileCard[id]?.name || "",
          title: fileCard[id]?.title || "",
          weapon:
            fileCard[id]?.weapon ||
            GirlWeaponType[girlId as keyof typeof GirlWeaponType],
          rarity: fileCard[id]?.rarity || Number(girlRarity) + 3,
          description: fileCard[id]?.description || "",
          images: {
            icon: `/img/operatives/${girlNumber}/icon.png`,
            portrait: `/img/operatives/${girlNumber}/art.png`,
          },
          outfit: fileCard[id]?.outfit || [],
          baseStory: fileCard[id]?.baseStory || [],
          baseGift: fileCard[id]?.baseGift || [],
          skills: fileCard[id]?.skills || [],
          manifests: fileCard[id]?.manifests || [],
          deiwosAlignment: fileCard[id]?.deiwosAlignment || [],
        };
        switch (type) {
          case undefined:
            fileCard[id] = { ...fileCard[id], name: value };
            break;
          case "full":
            fileCard[id] = { ...fileCard[id], fullName: value };
            break;
          case "title":
            fileCard[id] = { ...fileCard[id], title: value };
            break;
          case "des":
            fileCard[id] = { ...fileCard[id], description: value };
            break;
          default:
            break;
        }
      })
    );
    console.timeEnd("read card.tsv");
    console.time("read outfit.tsv");
    await fs.readFile(path.join(dataPath, "outfit.tsv"), "utf-8").then((data) =>
      data.split("\r\n").map((row) => {
        const [key, value] = row.split("\t");
        const [id, type] = key.split("_");
        const girlId = `girl${id.split("skin")[1].slice(0, 3)}`;
        const skinId = id.split("skin")[1].slice(3, 5);

        const girlFileCard = fileCard[girlId];
        if (!girlFileCard) return;
        const existingData = girlFileCard.outfit.find(
          (outfit) => outfit.key === skinId
        );
        const existingDataIndex = girlFileCard.outfit.findIndex(
          (outfit) => outfit.key === skinId
        );

        let operativeOutfit: IOperativeOutfit = {
          key: skinId,
          isReleased: true,
          name: existingData?.name || "",
          description: existingData?.description || "",
          default: existingData?.default || false,
          images: {
            icon: `/img/operatives/${girlId}/outfit/${skinId}_icon.png`,
            portrait: `/img/operatives/${girlId}/outfit/${skinId}_art.png`,
          },
          price: existingData?.price || 0,
          obtainMethod: existingData?.obtainMethod || "",
        };

        switch (type) {
          case undefined:
            operativeOutfit["name"] = value;
            break;
          case "des":
            operativeOutfit["description"] = value;
            break;
          case "use":
            operativeOutfit["default"] = value === "Default";
            operativeOutfit["obtainMethod"] = value;
            break;
          default:
            break;
        }

        const prevOutfitData = fileCard[girlId]?.outfit || [];
        if (existingDataIndex === -1) {
          prevOutfitData.push(operativeOutfit);
        } else {
          prevOutfitData[existingDataIndex] = operativeOutfit;
        }
        fileCard[girlId] = {
          ...fileCard[girlId],
          outfit: [
            ...prevOutfitData.sort((a, b) => {
              if (a.default) return -1;
              if (b.default) return 1;
              return 0;
            }),
          ],
        };
      })
    );
    console.timeEnd("read outfit.tsv");

    console.timeEnd("Generating Operatives Data");
    return res.status(200).json({ card: fileCard });
  } catch (error: any) {
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}
