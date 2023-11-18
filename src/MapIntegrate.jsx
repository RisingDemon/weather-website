import React, { Component } from "react";
import {Map, GoogleMap} from "google-map-react";

export default class MapIntegrate extends Component {
    myRef=React.createRef();
    state = {
        API_KEY: 'XjeyuBDEfKOkp4TAhvZgjuVzbnsxbeLE',
        DATA_FIELD: 'precipitationIntensity',
        TIMESTAMP: (new Date()).toISOString(),
        zoom: 7,
        coord_x: 42.355438,
        coord_y: -71.059914
    }

    // sample=async()=>{
    //     const response= await fetch (`https://api.tomorrow.io/v4/map/tile/${this.state.zoom}/${this.state.coord_x}/${this.state.coord_y}/${this.state.DATA_FIELD}/${this.state.TIMESTAMP}.png?apikey=${this.state.API_KEY}`);
    //     console.log(response);
    //     const data= await response.json();
    //     console.log(data);
    // }
    initMap = () => {
        console.log(this.myRef.current);
        var map = new google.maps.Map(this.myRef, {
            zoom: 7,
            center: {
                lat: 42.355438,
                lng: -71.059914
            }
        });

        // inject the tile layer
        var imageMapType = new google.maps.ImageMapType({
            getTileUrl: function (coord, zoom) {
                if (zoom > 12) {
                    return null;
                }

                return `https://api.tomorrow.io/v4/map/tile/${zoom}/${coord.x}/${coord.y}/${this.state.DATA_FIELD}/${this.state.TIMESTAMP}.png?apikey=${this.state.API_KEY}`;
            },
            tileSize: new google.maps.Size(256, 256)
        });

        map.overlayMapTypes.push(imageMapType);
    }

    render() {
        return (

            // pick the field (like temperature, precipitationIntensity or cloudCover)

            <div ref={this.myRef}>
                <button onClick={this.initMap}>Click Me</button>
                {/* <button onClick={this.sample}>Click Me</button> */}
                

            </div>
             

        );
    }
}