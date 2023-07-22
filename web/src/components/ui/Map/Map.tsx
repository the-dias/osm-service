import { LatLngExpression } from 'leaflet';
import { useMap, MapContainer, LayersControl, TileLayer } from 'react-leaflet';
import { DraggableMarker } from './components/DraggableMarker';
import { RoutingMachine } from './components/RoutingMachine';
import { useGeoLocation } from './components/useGeoLocation';
import { TbLocationFilled } from 'react-icons/tb';

import './styles/Map.css';
import { PDFReport } from './components/PDFReport';
import { SearchControl } from 'leaflet-geosearch';
import { Search } from './components/Search';

function LocationButton() {
  const map = useMap();
  const zoomLevel = 11;

  const location = useGeoLocation();

  const showMyLocation = () => {
    let result = window.confirm(
      'Do you want use information about yout geolocation?',
    );

    if (result && location.loaded && location.error.code === 0) {
      map.flyTo(
        [Number(location.coordinates.lat), Number(location.coordinates.lng)],
        zoomLevel,
        { animate: true },
      );
    } else {
      if (location.error.message !== '') {
        alert(location.error.message);
      }
    }
  };

  return (
    <div className="buttons_location">
      <div className="btn_location" onClick={showMyLocation}>
        <TbLocationFilled size={25} /> {/* MdLocationSearching */}
      </div>
    </div>
  );
}

export const Map = () => {
  const center = [55.7422, 37.5719];
  const zoomLevel = 11;

  return (
    <div className="map__container">
      <MapContainer
        center={center as LatLngExpression}
        zoomControl={true}
        zoom={zoomLevel}
      >
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="OSM Map">
            <TileLayer
              attribution='&amp;copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Dark Map">
            <TileLayer
              attribution='Map data: &amp;copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &amp;copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <RoutingMachine />
        <LocationButton />
        <DraggableMarker />
        <PDFReport />
        <Search />
      </MapContainer>
    </div>
  );
};
