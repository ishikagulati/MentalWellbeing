import React, { useEffect, useRef, useState } from 'react';
import './Map.css';

function Map() {
    const [mapShown, setMapShown] = useState(false);
    const mapFrame = useRef(null);

    useEffect(() => {
        getClientLocation();
    })

    // Taking Client Location from points
    function getClientLocation() {
        navigator.permissions.query({ name: "geolocation" })
        .then((result) => {
            if (result.state === "granted" || result.state === "prompt") {
                // console.log(result.state);
                displayMap();
            } else if (result.state === "denied") {
                console.log(result.state);
            }
        });
    }
      
    // Display Map
    function displayMap() {
        if (!mapFrame.current || (mapFrame.current && mapFrame.current.getAttribute("src") === "")) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log("Latitude: " + position.coords.latitude + ", Longitude: " + position.coords.longitude);
                const mapUrl = "http://www.google.com/maps?q=psychiatrist+near+me/" + position.coords.latitude + "," + position.coords.longitude + "&z=13&output=embed";
                if (mapFrame.current) {
                    mapFrame.current.setAttribute("src", mapUrl);
                    setMapShown(true);
                }
            });
        } else {
            if (mapFrame.current) {
                setMapShown(!mapShown);
            }
        }
    }
    
    return (
        <div>
            <div className="map">
                <h3 id="map-text">Find psychiatrists in your area</h3>
                <iframe
                    title="Google Map"
                    ref={mapFrame}
                    src=""
                    allowFullScreen>
                </iframe>
            </div>
        </div>
    )
}

export default Map