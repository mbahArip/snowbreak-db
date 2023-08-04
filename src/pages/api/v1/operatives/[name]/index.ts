import data from "db/operatives";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name } = req.query;
  try {
    const operatives = data.filter((operative) => {
      if (operative.name.toLowerCase() === name) {
        return operative;
      }
    });
    if (operatives.length === 0) {
      return res.status(404).json({
        error: "Operative not found",
        availableOperatives: [
          ...new Set(
            data.map((operative) => operative.name.toLocaleLowerCase())
          ),
        ],
      });
    }
    return res.status(200).json(operatives);
  } catch (error: any) {
    console.error(error);
    return res.status(error.code || 500).json({ error: error.message });
  }
}
