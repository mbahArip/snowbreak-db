import data from "db/operatives";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const operatives = data;
    return res.status(200).json(operatives);
  } catch (error: any) {
    console.error(error);
    return res.status(error.code || 500).json({ error: error.message });
  }
}
