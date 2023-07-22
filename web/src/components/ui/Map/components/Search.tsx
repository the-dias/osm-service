import L from 'leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import { useMap } from 'react-leaflet';
import { EffectCallback, useEffect } from 'react';
// import 'node_modules/leaflet-geosearch/dist/geosearch.css';

export const Search = () => {
  const map = useMap();

  useEffect((): any => {
    const provider = new OpenStreetMapProvider();

    const searchControl: any = GeoSearchControl({
      style: 'button',
      provider: provider,
      searchLabel: 'Enter address',
      animateZoom: true,
      autoClose: true,
    });
    map.addControl(searchControl);
    return (): void => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};
