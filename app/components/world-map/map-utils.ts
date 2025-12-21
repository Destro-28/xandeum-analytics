export type GeoJsonFeatureCollection = {
  type: "FeatureCollection";
  features: {
    type: "Feature";
    properties: {
      confidence: string;
      status: string;
      color: string;
    };
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
  }[];
};

export function confidenceColor(
  tier: string,
  status: string
) {
  if (status !== "active") return "#9CA3AF"; // grey

  switch (tier) {
    case "high":
      return "#22C55E"; // green
    case "medium":
      return "#F59E0B"; // yellow
    case "low":
      return "#EF4444"; // red
    default:
      return "#9CA3AF";
  }
}

interface Node {
  geo?: {
    lat: number;
    lon: number;
  };
  confidence_tier: string;
  status: string;
}

export function buildGeoJSON(nodes: Node[]): GeoJsonFeatureCollection {
  return {
    type: "FeatureCollection" as const,
    features: nodes
      .filter((n) => n.geo && n.geo.lat && n.geo.lon)
      .map((n) => ({
        type: "Feature" as const,
        properties: {
          confidence: n.confidence_tier,
          status: n.status,
          color: confidenceColor(
            n.confidence_tier,
            n.status
          ),
        },
        geometry: {
          type: "Point" as const,
          coordinates: [n.geo!.lon, n.geo!.lat],
        },
      })),
  };
}
