import { LRUCache } from "lru-cache";
import { NextApiRequest, NextApiResponse } from "next";

type Props = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};
function rateLimit({
  uniqueTokenPerInterval = 500,
  interval = 1000 * 60 * 60,
}: Props) {
  const tokenCache = new LRUCache({
    max: uniqueTokenPerInterval,
    ttl: interval,
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<number>((resolve, reject) => {
        if (process.env.NODE_ENV === "production") {
          const tokenCount = (tokenCache.get(token) as number[]) || [0];
          if (tokenCount[0] === 0) {
            tokenCache.set(token, tokenCount);
          }
          tokenCount[0] += 1;

          const currentUsage = tokenCount[0];
          const isRateLimited = currentUsage >= limit;
          res.setHeader("X-RateLimit-Limit", limit);
          res.setHeader(
            "X-RateLimit-Remaining",
            isRateLimited ? 0 : limit - currentUsage
          );

          return isRateLimited ? reject(429) : resolve(200);
        } else {
          return resolve(200);
        }
      }),
  };
}

const limiter = rateLimit({
  uniqueTokenPerInterval: 500,
  interval: 1000 * 60, // 1 minute
});

async function RateLimit(req: NextApiRequest, res: NextApiResponse) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const tokenPath = req.query.path as string;
  await limiter.check(res, 500, `${ip}:${tokenPath}`);
}

export default RateLimit;
