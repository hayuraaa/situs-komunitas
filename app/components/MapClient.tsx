"use client";

import { useEffect, useRef, useState } from "react";

type Community = {
  id: number;
  nama_komunitas: string;
  jenis_komunitas: string;
  logo_url: string;
  deskripsi: string | null;
  pranala: string | null;
  latitude: string | null;
  longitude: string | null;
};

const TYPE_COLOR: Record<string, string> = {
  daerah: "#006A9F",
  bahasa: "#14866d",
  klubWiki: "#f59e0b",
  proyek: "#9333ea",
};

const TYPE_LABEL: Record<string, string> = {
  daerah: "Daerah",
  bahasa: "Bahasa",
  klubWiki: "KlubWiki",
  proyek: "Proyek",
};

function injectLeafletCss() {
  if (document.getElementById("leaflet-css")) return;
  const link = document.createElement("link");
  link.id = "leaflet-css";
  link.rel = "stylesheet";
  link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(link);
}

export default function MapClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Community | null>(null);

  useEffect(() => {
    fetch("https://dashboard.wikimedia.or.id/api/v1/communities")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setCommunities(json.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || !containerRef.current || mapRef.current) return;

    let active = true;
    injectLeafletCss();

    (async () => {
      const L = (await import("leaflet")).default;
      if (!active || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        center: [-2.5, 118],
        zoom: 5,
        zoomControl: false,
        attributionControl: false,
        minZoom: 4,
        maxZoom: 13,
      });

      L.control.zoom({ position: "topright" }).addTo(map);

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        { subdomains: "abcd", maxZoom: 20 }
      ).addTo(map);

      communities
        .filter((c) => c.latitude && c.longitude)
        .forEach((c) => {
          const color = TYPE_COLOR[c.jenis_komunitas] ?? "#6b7280";
          const label = TYPE_LABEL[c.jenis_komunitas] ?? c.jenis_komunitas;

          const logoInner = c.logo_url
            ? `<img src="${c.logo_url}" style="width:100%;height:100%;object-fit:contain;padding:4px" onerror="this.style.display='none'">`
            : `<div style="width:100%;height:100%;background:${color}"></div>`;

          const icon = L.divIcon({
            html: `<div style="
              width:38px;height:38px;border-radius:50%;
              background:white;border:3px solid ${color};
              box-shadow:0 2px 8px rgba(0,0,0,.22);
              overflow:hidden;display:flex;align-items:center;justify-content:center;
            ">${logoInner}</div>`,
            className: "",
            iconSize: [38, 38],
            iconAnchor: [19, 38],
            popupAnchor: [0, -44],
          });

          const desc = c.deskripsi
            ? c.deskripsi.slice(0, 120) + (c.deskripsi.length > 120 ? "…" : "")
            : "";

          const popup = `
            <div style="width:220px;font-family:Arial,sans-serif;padding:2px">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
                <img src="${c.logo_url}" alt="" style="width:36px;height:36px;border-radius:50%;object-fit:contain;padding:2px;border:2px solid ${color};flex-shrink:0" onerror="this.style.display='none'"/>
                <div>
                  <div style="font-weight:700;font-size:13px;line-height:1.3;color:#111">${c.nama_komunitas}</div>
                  <span style="display:inline-block;margin-top:3px;padding:1px 8px;border-radius:99px;font-size:10px;font-weight:600;background:${color}22;color:${color}">${label}</span>
                </div>
              </div>
              ${desc ? `<p style="font-size:11.5px;color:#555;line-height:1.6;margin:0 0 10px">${desc}</p>` : ""}
              ${c.pranala ? `<a href="${c.pranala}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:5px 14px;background:#006A9F;color:#fff;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none">Kunjungi →</a>` : ""}
            </div>
          `;

          L.marker([parseFloat(c.latitude!), parseFloat(c.longitude!)], { icon })
            .addTo(map)
            .bindPopup(popup, { maxWidth: 244 });
        });

      mapRef.current = map;
      setTimeout(() => {
        if (active && mapRef.current) mapRef.current.invalidateSize();
      }, 100);
    })();

    return () => {
      active = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [loading, communities]);

  const noCoord = communities.filter((c) => !c.latitude || !c.longitude);

  return (
    // Outer wrapper: relative → jadi positioning context untuk sm:absolute
    <div className="relative">

      {/* ── Peta ── */}
      <div className="relative rounded-xl overflow-hidden border border-gray-200 shadow-sm h-[380px] sm:h-[540px]">
        {loading && (
          <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-50">
            <p className="text-sm text-gray-400">Memuat peta…</p>
          </div>
        )}
        <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
        <div className="absolute bottom-1 right-[46px] z-[1000] text-[9px] text-gray-400 pointer-events-none">
          © OpenStreetMap contributors © CARTO
        </div>
      </div>

      {/* ── Panel / Detail ──
          Mobile : muncul di bawah peta (flow normal, mt-3)
          sm+    : overlay pojok kanan bawah (sm:absolute sm:bottom-3 sm:right-3)
      */}
      {!loading && (
        <>
          {/* Detail card */}
          {selected && (() => {
            const color = TYPE_COLOR[selected.jenis_komunitas] ?? "#6b7280";
            const label = TYPE_LABEL[selected.jenis_komunitas] ?? selected.jenis_komunitas;
            return (
              <div className="mt-3 sm:mt-0 sm:absolute sm:bottom-3 sm:right-3 sm:w-[264px] sm:z-[1001] bg-white rounded-xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                  <div
                    className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden bg-white flex items-center justify-center"
                    style={{ border: `3px solid ${color}` }}
                  >
                    <img
                      src={selected.logo_url}
                      alt=""
                      className="w-full h-full object-contain p-1"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-gray-900 leading-tight">{selected.nama_komunitas}</p>
                    <span
                      className="inline-block mt-1 text-[10px] font-semibold px-2 py-px rounded-full"
                      style={{ background: color + "22", color }}
                    >
                      {label}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors flex-shrink-0 self-start"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                {selected.deskripsi && (
                  <p className="px-4 pb-3 text-[11.5px] text-gray-500 leading-relaxed">
                    {selected.deskripsi.slice(0, 160)}{selected.deskripsi.length > 160 ? "…" : ""}
                  </p>
                )}
                {selected.pranala && (
                  <div className="px-4 pb-4">
                    <a
                      href={selected.pranala}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 text-[12px] font-semibold text-white rounded-lg hover:opacity-90 transition-opacity"
                      style={{ background: "#006A9F" }}
                    >
                      Kunjungi →
                    </a>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Panel list */}
          {!selected && noCoord.length > 0 && (
            <div
              className="mt-3 sm:mt-0 sm:absolute sm:bottom-3 sm:right-3 sm:w-60 sm:z-[1000] bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
              style={{ maxHeight: 260 }}
            >
              <div className="px-4 py-2.5 border-b border-gray-100 bg-gray-50">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Komunitas Proyek
                </p>
              </div>
              <ul className="overflow-y-auto" style={{ maxHeight: 212 }}>
                {noCoord.map((c) => {
                  const color = TYPE_COLOR[c.jenis_komunitas] ?? "#6b7280";
                  const label = TYPE_LABEL[c.jenis_komunitas] ?? c.jenis_komunitas;
                  return (
                    <li key={c.id} className="border-b border-gray-50 last:border-0">
                      <button
                        onClick={() => setSelected(c)}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-blue-50 transition-colors group text-left"
                      >
                        <div
                          className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden bg-white flex items-center justify-center"
                          style={{ border: `2.5px solid ${color}` }}
                        >
                          <img
                            src={c.logo_url}
                            alt=""
                            className="w-full h-full object-contain p-0.5"
                            onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11.5px] font-semibold leading-tight truncate text-gray-800 group-hover:text-blue-600 transition-colors">
                            {c.nama_komunitas}
                          </p>
                          <span
                            className="text-[10px] font-semibold px-1.5 py-px rounded-full"
                            style={{ background: color + "20", color }}
                          >
                            {label}
                          </span>
                        </div>
                        <svg className="w-3 h-3 text-gray-300 group-hover:text-blue-400 transition-colors flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
}
