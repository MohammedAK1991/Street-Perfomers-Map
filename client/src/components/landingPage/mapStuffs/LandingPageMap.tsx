import React, { useEffect } from 'react';
import { useState, useMemo, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  InfoWindow,
} from '@react-google-maps/api';
import {
  Button,
  Center,
  Flex,
  Heading,
  Link,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { usePerformances } from '../../../data/performances';
import { useAllPerformances } from '../../../data/allPerformances';

type LandingPageMapProps = {
  isLoaded: boolean;
};

type MarkerType = {
  creatorID: string;
  coordinates: {
    lng: number;
    lat: number;
  };
  performance: string;
  performanceTime: string;
};

const LandingPageMap: React.FC<LandingPageMapProps> = ({ isLoaded }) => {
  const { allPerformances, loading, error, mutate } = useAllPerformances();
  console.log('data', allPerformances);
  console.log('error', error);

  const markerFeeders: MarkerType[] = allPerformances?.map((performance) => ({
    creatorID: performance.creatorID,
    coordinates: {
      lng: performance.coordinates.longitude,
      lat: performance.coordinates.latitude,
    },
    performance: performance.performance,
    performanceTime: performance.performanceTime,
  }));

  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>();
  const [selected, setSelected] = useState<null | MarkerType>(null);

  const mapRef = useRef<google.maps.Map>();
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  const mapContainerStyle = {
    height: '80vh',
    width: '100vw',
  };
  const options = useMemo<google.maps.MapOptions>(
    () => ({
      mapId: '7a95851571563ec6',
      disableDefaultUI: false,
      zoomControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      clickableIcons: false,
    }),
    [],
  );

  const [zoom, setZoom] = useState(17);
  // const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 51.5079,
    lng: -0.0877,
  });
  // function to get the current location of the user
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
    // setMarkers(testmarkers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //function to use ESCAPE key ti exit of directions and event selection
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelected(null);
        setDirections(null);
        console.log(directions, 'directions');
        window.location.reload();
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const fetchDirections = useCallback(
    (performance: MarkerType) => {
      if (!center) return;

      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: center,
          destination: performance.coordinates,
          travelMode: google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            setDirections(result);
          }
        },
      );
    },
    [center, setDirections],
  );

  // const testmarkers: google.maps.LatLngLiteral[] = [
  //   {
  //     lat: 51.508,
  //     lng: -0.1283,
  //   },
  //   {
  //     lat: 51.508,
  //     lng: -0.2285,
  //   },
  //   {
  //     lat: 51.508,
  //     lng: -0.3287,
  //   },
  //   {
  //     lat: 51.508,
  //     lng: -0.4289,
  //   },
  // ];
  return (
    <div>
      <GoogleMap
        zoom={zoom}
        center={center}
        mapContainerStyle={mapContainerStyle}
        options={options}
        onLoad={onMapLoad}
      >
        {directions ? (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                zIndex: 50,
                strokeColor: '#1976D2',
                strokeWeight: 5,
              },
            }}
          />
        ) : null}
        {markerFeeders.map((marker) => (
          <Marker
            key={marker.performance}
            position={{
              lat: marker.coordinates.lat as number,
              lng: marker.coordinates.lng as number,
            }}
            animation={window.google.maps.Animation.BOUNCE}
            onClick={() => {
              console.log('hey marker clicked');
              setSelected(marker);
              console.log('selected', setSelected);
            }}
            icon={{
              url: `/images/kyle-2.png`,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(30, 55),
              scaledSize: new window.google.maps.Size(60, 50),
            }}
          />
        ))}
        {selected && (
          <InfoWindow
            zIndex={100}
            position={{
              lat: selected.coordinates.lat,
              lng: selected.coordinates.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
              setDirections(null);
            }}
          >
            <Flex
              height='200px'
              width='200px'
              direction='column'
              justify='space-between'
              alignItems={'center'}
              padding='10px'
            >
              <Heading size='lg'>Event Details</Heading>{' '}
              <Button size={'sm'} onClick={() => fetchDirections(selected)}>
                Fetch Directions
              </Button>
              {!!directions && (
                <Text>
                  the event is{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    {directions.routes[0].legs[0].distance?.text}
                  </span>{' '}
                  away from you
                  <br />
                  It will take you
                  <span style={{ fontWeight: 'bold' }}>
                    {directions.routes[0].legs[0].duration?.text}{' '}
                  </span>
                  time to get there
                </Text>
              )}
              <Button
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&origin=${center.lat},${center.lng}&destination=${selected.coordinates.lat},${selected.coordinates.lng}&travelmode=walking`,
                    '_blank',
                  );
                }}
              >
                open in google maps
              </Button>
            </Flex>
          </InfoWindow>
        )}
        <Marker
          key={center.lat}
          position={center}
          animation={window.google.maps.Animation.BOUNCE}
          icon={{
            url: '/images/cartman-1.png',
            scaledSize: new window.google.maps.Size(50, 50),
          }}
          label={{
            color: 'orange',
            fontWeight: 'bolder',
            fontSize: '14px',
            text: '👆🏻 YOU 👆🏻 ',
            fontFamily: 'Avenir',
          }}
        />

        <Marker
          key={Math.random() * 100}
          position={{
            lat: 51.508,
            lng: -0.1281,
          }}
          label={{
            color: 'orange',
            fontWeight: 'bolder',
            fontSize: '14px',
            text: '👆🏻 TRAFALGAR SQUARE 👆🏻 ',
            fontFamily: 'Avenir',
          }}
        />
      </GoogleMap>
    </div>
  );
};;;;;;;

export default LandingPageMap;
