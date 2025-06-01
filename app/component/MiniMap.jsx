"use client";

import React, { useEffect, useRef } from "react";
import Map from "ol/Map";
import View from "ol/View";
import { fromLonLat, toLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Style, Icon } from "ol/style";

const MiniMap = ({ coordinates, project }) => {
  const mapRef = useRef(null);
  const mapObj = useRef(null);

  useEffect(() => {
    const iconFeature = new Feature({
      geometry: new Point(fromLonLat(coordinates)),
      projectData: project,
    });

    const iconStyle = new Style({
      image: new Icon({
        src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scale: 1,
      }),
    });

    iconFeature.setStyle(iconStyle);

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    mapObj.current = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat(coordinates),
        zoom: 13,
      }),
      controls: [],
    });

    mapObj.current.on("singleclick", function (event) {
      mapObj.current.forEachFeatureAtPixel(event.pixel, function (feature) {
        const [lon, lat] = toLonLat(feature.getGeometry().getCoordinates());
        const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
        window.open(googleMapsUrl, "_blank");
      });
    });

    return () => mapObj.current.setTarget(null);
  }, [coordinates, project]);

  return <div ref={mapRef} className="w-full h-40 rounded overflow-hidden" />;
};

export default MiniMap;
