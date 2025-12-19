import * as maxmind from "maxmind";
import path from "path";
import { getCachedGeo, setCachedGeo } from "./geoCache";

type GeoResult = {
  country?: string;
  country_code?: string;
  city?: string;
  lat?: number;
  lon?: number;
};

let reader: maxmind.Reader<maxmind.CityResponse> | null = null;

async function getReader() {
  if (!reader) {
    const dbPath = path.join(process.cwd(), "data/GeoLite2-City.mmdb");
    reader = await maxmind.open(dbPath);
  }
  return reader;
}

export async function resolveIP(ip: string): Promise<GeoResult | null> {
  const cached = getCachedGeo(ip);
  if (cached !== undefined) return cached;

  try {
    const reader = await getReader();
    const res = reader.get(ip);

    if (!res) {
      setCachedGeo(ip, null);
      return null;
    }

    const geo: GeoResult = {
      country: res.country?.names?.en,
      country_code: res.country?.iso_code,
      city: res.city?.names?.en,
      lat: res.location?.latitude,
      lon: res.location?.longitude,
    };

    setCachedGeo(ip, geo);
    return geo;
  } catch {
    setCachedGeo(ip, null);
    return null;
  }
}
