import type { Request, Response, NextFunction } from "express";
import { redis } from "../config/redis";

const maxRequest = 10;
const windowSeconds = 60;

const rateLimiter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userIp = req.ip as string;

    const rateLimitKey = `rate:${userIp}`;
    const requestCount = await redis.incr(rateLimitKey);

    if (requestCount === 1) {
      await redis.expire(rateLimitKey, windowSeconds);
    }

    if (requestCount > maxRequest) {
      const retryAfter = await redis.ttl(rateLimitKey);
      return res
        .status(429)
        .json({ message: `Too many request, try after ${retryAfter} seconds` });
    }
    return next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default rateLimiter;
