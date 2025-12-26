"use client";

import WorldMap from "./world-map";
// import MapLegend from "./map-legend";

export default function WorldMapSection() {
  return (
    <section className="mt-2">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
          <WorldMap />
          {/* <MapLegend /> */}
        </div>
      </div>
    </section>
  );
}
