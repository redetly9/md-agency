'use client';

import React, { useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import marketIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: marketIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
  onLocationChange?: (location: { lat: number; lng: number }) => void;
}

const Map: React.FC<MapProps> = ({ center, onLocationChange }) => {
  const [markerPosition, setMarkerPosition] = useState(center);

  // Custom hook to handle map clicks
  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newLocation = { lat: e.latlng.lat, lng: e.latlng.lng };
        setMarkerPosition([newLocation.lat, newLocation.lng]);
        onLocationChange?.(newLocation); // Notify parent component about the new location
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={markerPosition as L.LatLngExpression}
      zoom={15}
      scrollWheelZoom={false}
      className={`h-full rounded-lg`}>
      <MapClickHandler />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={markerPosition as L.LatLngExpression} />
    </MapContainer>
  );
};

export default Map;
