import { NextApiRequest, NextApiResponse } from "next";
import img from "public/img/icons/operatives.webp";
import sharp from "sharp";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      row: x,
      column: y,
    }: Partial<{
      row: string | undefined;
      column: string | undefined;
    }> = req.query;
    // convert icon to image buffer
    const imgPublicUrl = new URL(img.src, "http://localhost:3001");
    const imgBuffer = await fetch(imgPublicUrl).then((res) =>
      res.arrayBuffer()
    );
    const gap = 1;
    const xPos = {
      start: 0,
      end: 0,
    };
    const yPos = {
      start: 0,
      end: 0,
    };
    // Column max 5
    const selectedGirl = {
      row: parseInt(x ?? "1", 10),
      column: parseInt(y ?? "1", 10),
    };

    // It's a grid of 200x200 icons, the whole image is 1024x2048px.
    // every icon is 200x200px, with a 1px gap between them.
    // The first icon is at 0,0 and the last one is at 1023,2047.
    // generate x and y based on selectedGirl
    xPos.start =
      (selectedGirl.column - 1) * 200 + (selectedGirl.column - 1) * gap;
    xPos.end = xPos.start + 200;
    yPos.start = (selectedGirl.row - 1) * 200 + (selectedGirl.row - 1) * gap;
    yPos.end = yPos.start + 200;

    const shrp = await sharp(imgBuffer)
      .extract({
        left: xPos.start,
        top: yPos.start,
        width: 200,
        height: 200,
      })
      .webp({
        alphaQuality: 100,
        quality: 100,
      })
      .toBuffer();

    res.setHeader("Content-Type", "image/webp");
    res.setHeader("Content-Length", shrp.length);
    res.setHeader("Content-Disposition", "inline; filename=operatives.webp");
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    res.setHeader("Expires", new Date(Date.now() + 31536000000).toUTCString());

    return res.status(200).send(shrp);
  } catch (error: any) {
    console.error(error);
    return res.status(error.code || 500).json({ error: error.message });
  }
}
