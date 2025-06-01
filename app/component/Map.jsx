"use client";
import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Vector as VectorSource } from "ol/source";
import { fromLonLat, toLonLat } from "ol/proj";
import { Feature } from "ol";
import { Point } from "ol/geom";
import { Style, Icon } from "ol/style";

export default function ProjectsMap({ projects }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const [popupContent, setPopupContent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Function to handle marker click and show project details
  const handleMarkerClick = projectData => {
    setPopupContent(`
      <div>
        <h3>${projectData.name}</h3>
        <p>Orders: ${projectData.orders}</p>
        <p>Last Order: ${projectData.lastOrder}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          ${projectData.tags
            .map(
              tag =>
                `<span class="bg-gray-200 text-sm px-2 py-1 rounded-full">${tag}</span>`
            )
            .join("")}
        </div>
      </div>
    `);
    setShowPopup(true);
  };

  useEffect(() => {
    if (!mapRef.current) return;

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
    });

    mapInstance.current = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({
        center: fromLonLat([78.9629, 22.5937]), // Center of India
        zoom: 5,
      }),
    });

    // Add project markers (red dots) to the map
    projects.forEach(
      ({ latitude, longitude, name, description, orders, lastOrder, tags }) => {
        const marker = new Feature({
          geometry: new Point(fromLonLat([longitude, latitude])),
        });

        marker.setProperties({
          projectData: { name, description, orders, lastOrder, tags },
        });

        marker.setStyle(
          new Style({
            image: new Icon({
              src: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
              anchor: [0.5, 1],
              scale: 1,
            }),
          })
        );

        vectorSourceRef.current.addFeature(marker);
      }
    );

    // Add click listener to show project details in the popup
    mapInstance.current.on("singleclick", function (evt) {
      const clickedFeature = mapInstance.current.forEachFeatureAtPixel(
        evt.pixel,
        feature => feature
      );

      if (clickedFeature) {
        const projectData = clickedFeature.getProperties().projectData;
        console.log("projectData", projectData);
        handleMarkerClick(projectData);
      } else {
        setShowPopup(false);
      }
    });

    return () => {
      mapInstance.current.setTarget(null);
    };
  }, [projects]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "500px", border: "1px solid black" }}
      />

      {showPopup && (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "10px",
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid black",
            zIndex: 1000,
            borderRadius: "5px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
          dangerouslySetInnerHTML={{ __html: popupContent }}
        />
      )}
    </div>
  );
}
