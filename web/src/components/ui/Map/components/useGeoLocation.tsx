import { useEffect, useState } from "react"


export const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: "", lng: ""},
        error: {code: -1, message: ""}
        
    });

    const onSuccess = (location: { coords: { latitude: any; longitude: any; }; }) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude
            },
            error: {
                code: 0,
                message: ""
            }
        });
    }

    const onError = (error: {code: number, message: string}) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: "",
                lng: ""   
            },
            error
        });
    }
    
    useEffect( () => {
        if( !("geolocation" in navigator)) {
            onError({
                code: 1,
                message: "Geolocation not supported"
            });
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
}