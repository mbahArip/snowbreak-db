import data from "db/operatives";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    name,
    title,
  }: Partial<{
    name: string;
    title: string;
  }> = req.query;
  try {
    const formattedName = name!.toLocaleLowerCase().toLowerCase();
    const formattedTitle = title!
      .toLocaleLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/ /g, "-");

    const fileExists = await fs
      .access(`db/operatives/${formattedName}/${formattedTitle}`)
      .then(() => true)
      .catch(() => false);

    if (!fileExists) {
      return res.status(404).json({
        error: "Operative not found",
        availableOperatives: [
          ...new Set(
            data.map((operative) =>
              operative.title
                .toLocaleLowerCase()
                .replace(/[^a-z0-9 ]/g, "")
                .replace(/ /g, "-")
            )
          ),
        ],
      });
    }

    const { default: operative } = await import(
      `db/operatives/${formattedName}/${formattedTitle}`
    );
    return res.status(200).json(operative);
  } catch (error: any) {
    console.error(error);
    return res.status(error.code || 500).json({ error: error.message });
  }
}
