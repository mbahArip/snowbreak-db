import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    return res.status(200).json({
      availableRoutes: {
        operatives: [
          "/api/v1/operatives",
          "/api/v1/operatives/:name",
          "/api/v1/operatives/:name/:title (example: Acacia/Redacted, Acacia/Kaguya)",
          "/api/v1/operatives/:name/:title/outfit",
          "/api/v1/operatives/:name/:title/skill",
          "/api/v1/operatives/:name/:title/manifest",
          "/api/v1/operatives/:name/:title/neuronics",
          "/api/v1/operatives/:name/:title/deiwos-alignment",
          "/api/v1/operatives/:name/:title/house",
        ],
        logistics: [
          "/api/v1/logistics",
          "/api/v1/logistics/:squad (example: ulster, amanoIwato)",
          "/api/v1/logistics/:squad/:name (example: amanoIwato/alnair, koffman/jarl-haakon)",
        ],
        weapons: [
          "/api/v1/weapons",
          "/api/v1/weapons/:type (example: pistol, rifle)",
          "/api/v1/weapons/:type/:name (example: smg/homecoming, sniper/space-cowboy)",
          "/api/v1/weapons/:type/:element (example: pistol/chaos, rifle/frost)",
          "/api/v1/weapons/:type/parts",
        ],
      },
      notes: [
        "All routes are case-insensitive.",
        "Spaces are replaced with dashes. (example: 'fritia/little sunshine' becomes 'fritia/little-sunshine')",
        "Special characters are removed. (example: 'acacia/[redacted]' becomes 'acacia/redacted')",
      ],
    });
  } catch (error: any) {
    console.error(error);
    return res.status(error.code || 500).json({ error: error.message });
  }
}
