import L from 'leaflet';
import { createControlComponent } from '@react-leaflet/core';

import { geocoders } from 'leaflet-control-geocoder';
import 'leaflet-routing-machine';
import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { usePDFStore } from '../../../../store/pdf.store';

export const RoutingMachine = () => {
  const map = useMap();
  const { addInstructions, setInformation } = usePDFStore();
  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      waypoints: [],
      routeWhileDragging: true,
      showAlternatives: false,
      router: L.routing.mapbox(
        'pk.eyJ1IjoiZGlhc21hcCIsImEiOiJjbGk5Zjk1bmgyMWtzM2RtbGl6OGdwMnZlIn0.fkmV7gytwxIErf22u_gexQ',
        { language: 'ru', profile: 'mapbox/driving' },
      ),
      geocoder: new geocoders.Nominatim(),
      lineOptions: {
        styles: [
          {
            color: 'black',
            opacity: 1,
          },
        ],
        extendToWaypoints: false,
        missingRouteTolerance: 1,
      },
    }).addTo(map);

    const handleRoutesFound = (e: any) => {
      console.log(e);
      const routes = e.routes;
      console.log('routes', routes);
      const route = routes[0]; // Предполагается, что вы работаете только с первым найденным маршрутом

      const summary = route.summary; // Общая информация о маршруте
      const instructions = route.instructions; // Инструкции по маршруту

      console.log('Total distance:', summary.totalDistance);
      console.log('Total time:', summary.totalTime);
      console.log('Instructions:', instructions);

      const from = route.inputWaypoints[0].name;
      const to = route.inputWaypoints[1].name;
      const totalDistance = summary.totalDistance;
      const totalTime = summary.totalTime;
      setInformation({
        from,
        to,
        totalDistance,
        totalTime,
      });
      addInstructions(instructions);
    };

    routingControl.on('routesfound', handleRoutesFound);

    if (map != null && routingControl != null) {
      return () => {
        map.removeControl(routingControl);
      };
    } else {
      return;
    }

    // return; () => undefined;
  }, [map]);

  return null;
};

// const createRoutineMachineLayer = (props: any) => {
//   let instance = L.Routing.control({
//     routeWhileDragging: true,
//     // plan
//     showAlternatives: false,
//     // router: L.routing.mapbox(
//     //   "pk.eyJ1IjoiZGlhc21hcCIsImEiOiJjbGk5Zjk1bmgyMWtzM2RtbGl6OGdwMnZlIn0.fkmV7gytwxIErf22u_gexQ",
//     //   { language: "ru", profile: "mapbox/walking" }
//     // ),
//     // formatter: new L.Routing.mapzenForamatter(),
//     // plan: new L.Routing.Plan(),
//     geocoder: new geocoders.Nominatim(),
//     lineOptions: {
//       styles: [
//         {
//           color: 'black',
//           opacity: 1,
//         },
//       ],
//       extendToWaypoints: true,
//       missingRouteTolerance: 0,
//     },
//   });

//   // console.log(instance.getWaypoints());
//   return instance;
// };
// export const RoutingMachine = createControlComponent(createRoutineMachineLayer);
