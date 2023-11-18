import { Component } from "react";
import frameImg from './pexels-johannes-plenio-1118873.jpg'

export default class Frame extends Component{
     render(){

        return(
            <div>
                <img style={{
                    height: 315,
                    width: "-webkit-fill-available",
                }} src={frameImg} alt="WeatherImage" />
                <div>
                    <div style={{
                        width: 450,
                        position: "absolute",
                        top:164,
                        left: 901,
                        color: "white",
                        fontWeight: 500,
                        fontSize: 36

                    }}>Get Weather Forecasts, Nowcasts & History</div>
                </div>
            </div>
        );
     }
}