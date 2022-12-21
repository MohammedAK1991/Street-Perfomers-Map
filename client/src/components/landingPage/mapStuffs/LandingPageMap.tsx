import React, { useEffect } from 'react';
import { useState, useMemo, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api';
import { Center, Flex, Spinner } from '@chakra-ui/react';

type LandingPageMapProps = {
  isLoaded: boolean;
};

const LandingPageMap: React.FC<LandingPageMapProps> = ({ isLoaded }) => {
  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: '7a95851571563ec6',
      disableDefaultUI: true,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    }),
    [],
  );
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult>();
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 51.5079,
    lng: -0.0877,
  });

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const mapContainerStyle = {
    height: '80vh',
    width: '100vw',
  };

  useEffect(() => {
    function getCurrentCoordinates() {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          setCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => null,
      );
    }
    getCurrentCoordinates();
    setMarkers(testmarkers);
  }, []);

  const [zoom, setZoom] = useState(17);
  const [radius, setRadius] = useState(1000);
  // const [markers, setMarkers] = useState<google.maps.Marker[]>([]);
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);

  const testmarkers: google.maps.LatLngLiteral[] = [
    {
      lat: 52.508,
      lng: -0.1281,
    },
    {
      lat: 53.508,
      lng: -0.1281,
    },
    {
      lat: 54.508,
      lng: -0.1281,
    },
    {
      lat: 55.508,
      lng: -0.1281,
    },
  ];

  console.log(isLoaded, 'isLoaded');

  return (
    <div>
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={onMapLoad}
      >
        {isLoaded &&
          markers.map((marker) => (
            <Marker
              key={marker.lat}
              position={{ lat: marker.lat, lng: marker.lng }}
              animation={window.google.maps.Animation.BOUNCE}
            />
          ))}

        <Marker
          key={center.lat}
          position={center}
          animation={window.google.maps.Animation.BOUNCE}
        />

        <Marker
          animation={window.google.maps.Animation.BOUNCE}
          key={51.50899999999999}
          position={{
            lat: 51.508,
            lng: -0.1281,
          }}
          draggable
          label={{
            color: 'orange',
            fontWeight: 'bolder',
            fontSize: '14px',
            text: '👆🏻 YOU 👆🏻 ',
            fontFamily: 'Avenir',
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default LandingPageMap;
