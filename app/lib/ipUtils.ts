/**
 * Extracts IPv4 from "IP:PORT"
 * Returns null if invalid
 */
export function extractIP(address: string): string | null {
  if (!address) return null;

  const parts = address.split(":");
  if (parts.length < 2) return null;

  const ip = parts[0].trim();

  // very lightweight IPv4 sanity check
  if (!/^\d{1,3}(\.\d{1,3}){3}$/.test(ip)) {
    return null;
  }

  return ip;
}
