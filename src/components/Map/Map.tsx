import "./Map.scss";
import { useEffect, useState } from "react";
import { Geolocation } from "@capacitor/geolocation";

const mapboxgl = require("mapbox-gl");

mapboxgl.accessToken = process.env.REACT_APP_MAP_BOX_API_KEY;

interface MapsProps {
  name: string;
  pickupCoordinates: number[];
  dropOffCoordinates: number[];
  onCurrentLocationChange: (location: number[]) => void;
}

const Map: React.FC<MapsProps> = (props) => {
  const [currentLocation, setCurrentLocation] = useState<number[]>([0, 0]);

  const getCurrentLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      setCurrentLocation([longitude, latitude]);
      props.onCurrentLocationChange([longitude, latitude]); // Pass current location to parent component
    } catch (error) {
      console.error("Error getting current location:", error);
    }
  };

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const map = new mapboxgl.Map({
          container: "map",
          style:
            "mapbox://styles/omarashzeinhom98/cl4k5xuzh002h14mtoho5qips?optimize=true",
          center: [longitude, latitude], // Set center to user's current location
          zoom: 1,
          mapboxgl: mapboxgl,
          reverseGeocode: true,
          accessToken: mapboxgl.accessToken,
          cooperativeGestures: true
        });

        const addToMap = (map: mapboxgl.Map, coordinates: number[]) => {
          const marker = new mapboxgl.Marker({
            color: "#568203",
            draggable: true,
          })
            .setLngLat(coordinates)
            .addTo(map);
        };

        // Add markers for pickup and dropoff coordinates
        if (props.pickupCoordinates) {
          addToMap(map, props.pickupCoordinates);
        }
        if (props.dropOffCoordinates) {
          addToMap(map, props.dropOffCoordinates);
        }

        // Fit map bounds to include both pickup and dropoff coordinates
        if (props.pickupCoordinates && props.dropOffCoordinates) {
          map.fitBounds([props.dropOffCoordinates, props.pickupCoordinates], {
            padding: 50,
          });
        }

        setCurrentLocation([longitude, latitude]);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();
  }, [props.pickupCoordinates, props.dropOffCoordinates]);

  useEffect(() => {
    // Debugging current location
    console.log("Current Location:", currentLocation);
  }, [currentLocation]);

  return (
    <>
      <div className="container__map" id="map">
        <strong>{props?.name}</strong>
      </div>
      
      <button onClick={getCurrentLocation} style={{fontSize: '2.0rem', textAlign: 'center'}}>📍⚙</button>
    </>
  );
};

export default Map;
