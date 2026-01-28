// src/utils/cache.ts
import { CACHE_PREFIX, DEFULT_TTL } from "../config/cacheConfig";
import { redis } from "../config/redis";


export const namespacedKey = (key: string) => {
    return `${CACHE_PREFIX}${key}`;
}

// set cache in redis
export const setCache = async(key: string, value: any, ttlSeconds = DEFULT_TTL) =>{
    const namespacedKeyValue = namespacedKey(key);
    // redis set value
    await redis.set(namespacedKeyValue, JSON.stringify(value), "EX", ttlSeconds);
}

// get cache from redis
export const getCache = async(key: string): Promise<any | null> => {
    const namespacedKeyValue = namespacedKey(key);
    const raw = await redis.get(namespacedKeyValue);
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw);
        return parsed;
    } catch (err) {
        console.error("getCache parse error:", err);
        return null;
    }
}


// get cache and total life time 
export const getCacheWithTTL = async<T=any>(key: string): Promise<{data: T | null; ttl: number} | null> => {
    const namespacedKeyValue = namespacedKey(key);
    const result = await redis.multi().get(namespacedKeyValue).ttl(namespacedKeyValue).exec() as [string | null, string | null][];

    if(!result || !result[0] || !result[1]) return null;
    
    // distructure result
    const [data, ttl] = [result[0][1], result[1][1]];

    // check data
    if(!data) return null;

    // return data
    return {
        data: JSON.parse(data),
        ttl: Number(ttl),
    }

}


// invalid cache (delete cache from redis)  for single cache delete
export const invalidateCache = async(pattern: string): Promise<number> => {
    try {
        let cursor = "0";
        let deleteCount = 0;
        const startTime = Date.now();
        const timeout = 5000; // 5 second
        const searchPattern = namespacedKey(`${pattern}*`);
        console.log(`Invalidating cache for pattern: ${pattern} (full pattern: ${searchPattern})`);

        do {
            if(Date.now() - startTime > timeout) {
                console.warn("invalidateCache timeout");
                break;
            }

            const [nextCursor, keys] = await Promise.race([
                redis.scan(cursor, "MATCH", searchPattern, "COUNT", 100),
                new Promise<[string, string[]]>((_, reject) => setTimeout(() => reject(new Error("invalidateCache timeout")), 2000)),
            ])

            if(keys.length > 0) {
                console.log(`Deleting ${keys.length} cache keys: `, keys)
                const result = await Promise.race([
                    redis.del(...keys),
                    new Promise<number>((_, reject) => setTimeout(() => reject(new Error("Cache delete timeout")), 2000)),
                ]) as number;
                deleteCount += result;
            }

            cursor = nextCursor;

        } while (cursor != "0");

        console.log(`Cache invalidation compleate: ${deleteCount} keys for pattern: ${pattern}`);
        return deleteCount;

    } catch (error) {
        console.error(`Cache invalidation failed: `, error);
        return 0;
    }
}


// invalid cache async
export const invalidateCacheAsync = (pattern: string): void => {
    invalidateCache(pattern).catch(error => console.error(`Cache invalidation failed: `, error));
}


// all data delete from redis
export const invalidateAllCache = async(patterns: string[])=> {
    const promise = patterns.map(pattern => invalidateCache(pattern));
    const results = await Promise.allSettled(promise);
    return results.reduce((total, result) => {
        if(result.status === "fulfilled") {
            total += result.value;
        }
        return total;
    }, 0);
}

