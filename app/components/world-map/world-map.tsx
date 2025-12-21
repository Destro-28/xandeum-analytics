"use client";

import { useEffect, useState } from "react";
import Map, { Source, Layer } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

import { buildGeoJSON, GeoJsonFeatureCollection } from "./map-utils";

export default function WorldMap() {
  const [data, setData] = useState<GeoJsonFeatureCollection | null>(null);

  useEffect(() => {
    fetch("/api/gossip")
      .then((r) => r.json())
      .then((res) => {
        setData(buildGeoJSON(res.nodes));
      });
  }, []);

  return (
    <div className="h-150 w-full">
      <Map
        initialViewState={{
          latitude: 20,
          longitude: 0,
          zoom: 1.3,
        }}
        mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
        minZoom={1.2}
        maxZoom={6}
        renderWorldCopies={false}
      >
        {data && (
          <Source
            id="nodes"
            type="geojson"
            data={data}
            cluster
            clusterMaxZoom={4}
            clusterRadius={40}
          >
            {/* Clusters */}
            <Layer
              id="clusters"
              type="circle"
              filter={["has", "point_count"]}
              paint={{
                "circle-color": "#64748B",
                "circle-radius": [
                  "step",
                  ["get", "point_count"],
                  18,
                  10,
                  22,
                  30,
                  28,
                ],
                "circle-opacity": 0.85,
              }}
            />

            {/* Cluster count */}
            <Layer
              id="cluster-count"
              type="symbol"
              filter={["has", "point_count"]}
              layout={{
                "text-field": "{point_count_abbreviated}",
                "text-size": 12,
              }}
              paint={{
                "text-color": "#ffffff",
              }}
            />

            {/* Individual pins */}
            <Layer
              id="unclustered-point"
              type="circle"
              filter={["!", ["has", "point_count"]]}
              paint={{
                "circle-color": ["get", "color"],
                "circle-radius": 6,
                "circle-stroke-width": 1,
                "circle-stroke-color": "#020617",
              }}
            />
          </Source>
        )}
      </Map>
    </div>
  );
}
