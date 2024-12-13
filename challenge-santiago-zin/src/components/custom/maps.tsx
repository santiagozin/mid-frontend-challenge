import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/types/properties";

const customIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [32, 32],
});

const MapWithMarkers = ({ properties }: { properties: Property[] }) => {

    const center = properties.length > 0 ? properties[0].location : [0, 0];
  return (
    <MapContainer
      center={center as L.LatLngTuple}
      zoom={5}
      className="leaflet-container"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {properties.map((location) => (
        <Marker
          key={location.id}
          position={location.location}
          icon={customIcon}
        >
          <Popup>
            <strong>{location.title}</strong>
            <br />
            {location.description}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWithMarkers;
