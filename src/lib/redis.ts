import { Redis } from '@upstash/redis'
import { mockRedis } from './mockRedis'

const redis = process.env.NODE_ENV === 'production'
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    })
  : mockRedis;

export { redis };