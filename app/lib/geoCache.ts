type GeoResult = {
  country?: string;
  country_code?: string;
  city?: string;
  lat?: number;
  lon?: number;
} | null;

/**
 * In-memory cache
 * Key: IP string
 * Value: GeoResult | null
 */
const geoCache = new Map<string, GeoResult>();

export function getCachedGeo(ip: string): GeoResult | undefined {
  return geoCache.get(ip);
}

export function setCachedGeo(ip: string, value: GeoResult): void {
  geoCache.set(ip, value);
}
