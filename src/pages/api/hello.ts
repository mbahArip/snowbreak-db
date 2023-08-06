import skillVariables from "db/_helper/data/skillVariables.json";
import fs from "fs/promises";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { EnumCharacterWeaponType, EnumRarity } from "types/database/enum";
import {
  IOperativeBaseGift,
  IOperativeBaseStory,
  IOperativeDetail,
  IOperativeOutfit,
  IOperativeSkill,
} from "types/database/operatives";
import RateLimit from "utils/rateLimit";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await RateLimit(req, res);
    const dataPath = path.join(process.cwd(), "db", "_helper", "data");
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
            EnumCharacterWeaponType[
              girlId as keyof typeof EnumCharacterWeaponType
            ],
          rarity:
            fileCard[id]?.rarity || ((Number(girlRarity) + 3) as EnumRarity),
          description: fileCard[id]?.description || "",
          images: {
            icon: `/img/operatives/girl${girlNumber}/icon.png`,
            portrait: `/img/operatives/girl${girlNumber}/art.png`,
          },
          outfit: fileCard[id]?.outfit || [],
          baseStory: fileCard[id]?.baseStory || undefined,
          baseGift: fileCard[id]?.baseGift || undefined,
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
    await fs
      .readFile(path.join(dataPath, "cardskin.tsv"), "utf-8")
      .then((data) =>
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
          const existingDataIndex =
            girlFileCard.outfit.findIndex((outfit) => outfit.key === skinId) ??
            -1;

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

    console.time("read gift");
    await fs
      .readFile(path.join(dataPath, "dormgift.tsv"), "utf-8")
      .then((data) =>
        data.split("\r\n").map((row) => {
          const [key, value] = row.split("\t");
          if (key.startsWith("type") || !value) return;
          const [id, type] = key.split("_");
          const girlId = `girl${id
            .split("gift")[1]
            .slice(0, -2)
            .padStart(2, "0")}1`;
          const giftId = id.slice(-2).padStart(2, "0");

          const girlFileCard = fileCard[girlId];
          if (!girlFileCard) return;
          const existingData = girlFileCard.baseGift?.find(
            (gift) => gift.key === giftId
          );
          const existingDataIndex =
            girlFileCard.baseGift?.findIndex((gift) => gift.key === giftId) ??
            -1;

          /**
           * IDK how they sort it, but it's not by the gift ID
           * So need to manually set the rarity after generating the data
           */
          const goldGifts = [
            "Vintage Home Theater",
            "Homebody Essentials Kit",
            "Fujwara Retro Arcade",
            "Nerve Repair Pod",
            "Deep Tissue Massage Chair",
            "Dart Board",
            "Auxiliary Maintenance System",
            "Multipurpose Workbench",
            "Energy Drink Case",
            "Advanced Kitchen Set",
            "Storage Pantry",
            "Fleece Lounge Set",
            "Display Case",
            "Designer Tea Set",
            "Floor Mirror",
          ];
          const purpleGifts = [
            "Simple Bookcase",
            "Audio Kit",
            "Knife Block",
            "Omnidirectional Treadmill",
            "Record Player",
            "Rubik's Cube Pillow",
            '"Binary Life" Rug',
            "Adjustable Kettlebell",
            "Penguin Hand Puppet",
            "Double-Door Smart Refrigerator",
            "Cute Pillows",
            "Instrument Set",
            "Holographic Screen",
            "High Transparency Glass Display Case",
          ];
          const blueGifts = [
            "Game Poster",
            "Sword Expo Ticket Set",
            '"Ye Gan" Mask',
            `Artificial Album`,
            `Record`,
            `\"Early Bird\" Digital Clock`,
            `Small Wall-Mounted Bookshelf`,
            `Modified Evergreen Plant`,
            `Backup Key Fob`,
            `Backup Communicator`,
            `Polar Fleece Solid-Colored Blanket`,
            `Celebrity Poster`,
            `Women's Hat Set`,
            `Combat Recording System`,
          ];
          let operativeGift: IOperativeBaseGift = {
            key: giftId,
            name: existingData?.name || "",
            description: existingData?.description || "",
            images: {
              icon: `/img/operatives/${girlId}/gift/${giftId}_icon.png`,
            },
            rarity: existingData?.rarity || 0,
            price: existingData?.price || 0,
            trust: existingData?.trust || 0,
          };

          switch (type) {
            case undefined:
              operativeGift["name"] = value;
              const giftRarity = goldGifts.includes(value)
                ? 5
                : purpleGifts.includes(value)
                ? 4
                : blueGifts.includes(value)
                ? 3
                : 0;
              const giftPower = giftRarity - 2 < 0 ? 0 : giftRarity - 2;
              operativeGift["rarity"] = giftRarity;
              operativeGift["price"] = giftPower * 100;
              operativeGift["trust"] = giftPower * 3000;
              break;
            case "des":
              operativeGift["description"] = value;
              break;
            default:
              break;
          }

          const prevGiftData = fileCard[girlId]?.baseGift || [];
          if (existingDataIndex === -1) {
            prevGiftData.push(operativeGift);
          } else {
            prevGiftData[existingDataIndex] = operativeGift;
          }
          fileCard[girlId] = {
            ...fileCard[girlId],
            baseGift: [
              ...prevGiftData.sort((a, b) => {
                if (a.key > b.key) return 1;
                if (a.key < b.key) return -1;
                return 0;
              }),
            ],
          };
        })
      );
    console.timeEnd("read gift");

    console.time("read story");
    await fs.readFile(path.join(dataPath, "house.tsv"), "utf-8").then((data) =>
      data.split("\r\n").map((row) => {
        const [key, value] = row.split("\t");
        if (!value) return;
        if (!key.includes("girl") || !key.includes("LoveStory")) return;
        const girlId = `${key.split("_")[0]}1`;
        const storyNumber = Number(key.split("Story")[1]);

        const girlFileCard = fileCard[girlId];
        if (!girlFileCard) return;
        const existingData = girlFileCard.baseStory?.find(
          (story) => story.number === storyNumber
        );
        const existingDataIndex =
          girlFileCard.baseStory?.findIndex(
            (story) => story.number === storyNumber
          ) ?? -1;

        let operativeStory: IOperativeBaseStory = {
          number: existingData?.number || storyNumber,
          name: existingData?.name || value,
          summary: existingData?.summary || "",
          trustLevel: storyNumber * 10,
        };

        const prevStoryData = fileCard[girlId]?.baseStory || [];
        if (existingDataIndex === -1) {
          prevStoryData.push(operativeStory);
        } else {
          prevStoryData[existingDataIndex] = operativeStory;
        }
        fileCard[girlId] = {
          ...fileCard[girlId],
          baseStory: [
            ...prevStoryData.sort((a, b) => {
              if (a.number > b.number) return 1;
              if (a.number < b.number) return -1;
              return 0;
            }),
          ],
        };
      })
    );
    await fs
      .readFile(path.join(dataPath, "plot_summary.tsv"), "utf-8")
      .then((data) =>
        data.split("\r\n").map((row) => {
          const [key, value] = row.split("\t");
          if (!value) return;
          if (!key.includes("Girl") && !key.includes("RM")) return;

          const girlId = `girl${key.split("Girl0")[1].split("RM")[0]}1`;
          const storyNumber = Number(key.split("RM")[1]);

          const girlFileCard = fileCard[girlId];
          if (!girlFileCard) return;
          const existingData = girlFileCard.baseStory?.find(
            (story) => story.number === storyNumber
          );
          const existingDataIndex =
            girlFileCard.baseStory?.findIndex(
              (story) => story.number === storyNumber
            ) ?? -1;

          let operativeStory: IOperativeBaseStory = {
            number: existingData?.number || storyNumber,
            name: existingData?.name || "",
            summary: existingData?.summary || value,
            trustLevel: storyNumber * 10,
          };

          operativeStory["summary"] = value;

          const prevStoryData = fileCard[girlId]?.baseStory || [];
          if (existingDataIndex === -1) {
            prevStoryData.push(operativeStory);
          } else {
            prevStoryData[existingDataIndex] = operativeStory;
          }
          fileCard[girlId] = {
            ...fileCard[girlId],
            baseStory: [
              ...prevStoryData.sort((a, b) => {
                if (a.number > b.number) return 1;
                if (a.number < b.number) return -1;
                return 0;
              }),
            ],
          };
        })
      );
    console.timeEnd("read story");

    console.time("read skills");
    await fs
      .readFile(path.join(dataPath, "skill_describe.tsv"), "utf-8")
      .then((data) =>
        data.split("\r\n").map((row) => {
          const [key, value] = row.split("\t");
          if (!value) return;
          const [skillId, type] = key.split("_");
          if (!skillId.startsWith("1") || skillId.length !== 7) return;
          const girlRarity = key.slice(0, 2) === "10" ? "1" : "2";
          const girlId = `girl${key.slice(2, 4)}${girlRarity}`;

          const girlFileCard = fileCard[girlId];
          if (!girlFileCard) return;
          const existingData = girlFileCard.skills?.find(
            (skill) => skill.key === skillId
          );
          const existingDataIndex =
            girlFileCard.skills?.findIndex((skill) => skill.key === skillId) ??
            -1;

          let operativeSkill: IOperativeSkill = {
            key: skillId,
            category: existingData?.category || "standard",
            type: existingData?.type || undefined,
            name: existingData?.name || "",
            description: existingData?.description || "",
            rawDescription: existingData?.rawDescription || "",
            images: {
              icon: `/img/operatives/${girlId}/skills/${skillId}_icon.png`,
            },
            charge: existingData?.charge || 0,
            neuralUpgrade: existingData?.neuralUpgrade || undefined,
            cooldown: existingData?.cooldown || undefined,
            sEnergyCost: existingData?.sEnergyCost || undefined,
            uEnergyCost: existingData?.uEnergyCost || undefined,
            effects: existingData?.effects || [],
            rawEffects: existingData?.rawEffects || [],
          };
          // Some of the data are set to undefined for now.
          // I'll update this later when I have the time to do so.

          /**
           * Skills ID / Key example: 1001101, 1001301, or 1001401
           * Where:
           * 10xxxxx = Rarity of the operative. Where 10 is purple and 11 is gold.
           * xx01xxx = The id of the girl. 01 = Acacia, 02 = Lyfe, etc.
           * xxxx1xx = Skill type? 1 = Standard skill | 2 = ??? | 3 = Ultimate skill | 4 = Support skill *
           * xxxxx01 = IDK what this is. Most of the value is 01, only Nita Hands standard skill is 02.
           *
           * * For Skill type.
           * 1 are standard skills or prolly Projectiles skill? <== Need to confirm this.
           * 2 are found on standard and support skills, It's either skills that deploying aux, kinetic damage, or interrupts skill. <== Need to confirm this.
           * ex:
           * - Lyfe Wednesday standard skill (Deploy aux)
           * - Nita Hands standard skill (Kinetic Dmg)
           * - Fritia Little Sunshine standard skill (Interrupts)
           * - Marian Swift support skill (Interrupts) <== This is the only support skill that has this type.
           * - Haru The Ace standard skill (Kinetic Dmg)
           * - Cherno Those Two standard skill (Interrupts)
           * - Fenny Lionheart standard skill (Interrupts)
           * - Chenxing The Observer standard skill (Deploy aux)
           *
           * For now I'll just set the category for 2 as standard skill, since support skill is only Marian Swift.
           */
          const skillCategory = skillId.slice(4, 5);
          switch (skillCategory) {
            case "1":
              operativeSkill.category = "standard";
              break;
            case "2":
              operativeSkill.category = "standard";
              if (girlId === `girl052`) {
                operativeSkill.category = "support";
              }
              break;
            case "3":
              operativeSkill.category = "ultimate";
              break;
            case "4":
              operativeSkill.category = "support";
              break;
            default:
              break;
          }

          switch (type) {
            case "name":
              operativeSkill.name = value;
              break;
            case "des":
              let newValue = value;
              let description = "";
              let effects = "";
              let charges = 0;

              // Assign skill variables
              /**
               * Is there a better way to assign skill variables?
               * Can't find any skill variable data inside ripped files.
               * So I'll just hardcode it for now.
               *
               * TODO: Find a better way to assign skill variables.
               */
              if (newValue.includes("{") && newValue.includes("}")) {
                const isCurrentGirlVariableExists =
                  skillVariables[girlId as keyof typeof skillVariables];
                if (!isCurrentGirlVariableExists) return;
                const currentSkillVariables: string[] | undefined =
                  isCurrentGirlVariableExists[
                    skillId as keyof typeof isCurrentGirlVariableExists
                  ] as string[] | undefined;
                if (!currentSkillVariables) return;

                for (let i = 0; i < currentSkillVariables.length; i++) {
                  const variable = currentSkillVariables[i];
                  const variableIndex = i + 1;

                  if (newValue.includes(`{${variableIndex}}`)) {
                    newValue = newValue.replaceAll(
                      `{${variableIndex}}`,
                      variable
                    );
                  }
                }
              }

              // Split between description and effects
              if (newValue.includes("\\n\\n")) {
                description = newValue.split("\\n\\n")[0];
                effects = newValue.split("\\n\\n")[1];
              } else {
                description = newValue;
              }

              // Get charge
              if (description.startsWith("Charge:")) {
                const [c, desc] = description.split("\\n");
                const charge = c.split("Charge: ")[1];
                if (charge.includes("{")) {
                  charges = 99;
                } else {
                  charges = Number(charge);
                }
                description = desc;
              }

              // Assign description
              operativeSkill.charge = charges;
              operativeSkill.description = description
                .replaceAll('<span color="#c25c02">', "")
                .replaceAll("</>", "");
              operativeSkill.rawDescription = description
                .replaceAll('<span color="#c25c02">', "<span data-important>")
                .replaceAll("</>", "</span>");

              // Assign effects
              let effectsArray: string[] = [];
              if (effects.includes("\\n")) {
                effectsArray = effects.split("\\n");
              } else {
                effectsArray.push(effects);
              }
              operativeSkill.effects = effectsArray.map((effect) => {
                return effect
                  .replaceAll('<span color="#c25c02">', "")
                  .replaceAll("</>", "");
              });
              operativeSkill.rawEffects = effectsArray.map((effect) => {
                return effect
                  .replaceAll('<span color="#c25c02">', "<span data-important>")
                  .replaceAll("</>", "</span>");
              });
              break;
            case "value":
              break;
            default:
              break;
          }

          const prevSkillData = fileCard[girlId]?.skills || [];
          if (existingDataIndex === -1) {
            prevSkillData.push(operativeSkill);
          } else {
            prevSkillData[existingDataIndex] = operativeSkill;
          }
          fileCard[girlId] = {
            ...fileCard[girlId],
            skills: [
              ...prevSkillData.sort((a, b) => {
                if (a.key > b.key) return 1;
                if (a.key < b.key) return -1;
                return 0;
              }),
            ],
          };
        })
      );
    console.timeEnd("read skills");

    console.timeEnd("Generating Operatives Data");
    return res.status(200).json({ card: fileCard });
  } catch (error: any) {
    if (error === 429)
      return res.status(429).json({ error: "Too Many Requests" });
    return res.status(500).json({ error: error.message, stack: error.stack });
  }
}
