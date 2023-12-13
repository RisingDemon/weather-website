import { Component } from "react";
import frameImg from "./pexels-johannes-plenio-1118873.jpg";

export default class Frame extends Component {
  state = {
    hover: false,
  };
  hoverEffect = () => {
    this.setState({ hover: true });
  }
  unhoverEffect = () => {
    this.setState({ hover: false });
  }
  render() {
    return (
      <div>
        <img
          style={{
            height: 315,
            width: "-webkit-fill-available",
            overflowX: "hidden",
          }}
          src={frameImg}
          alt="WeatherImage"
        />
        <div>
          <div
            style={{
              width: 450,
              position: "absolute",
              top: 164,
              left: 901,
              color: "white",
              fontWeight: 500,
              fontSize: 36,
            }}
          >
            Get Weather Forecasts, Nowcasts & History
          </div>
        </div>
        <div onMouseEnter={this.hoverEffect} onMouseLeave={this.unhoverEffect} style={{position:"absolute", top:30, left:26}}>
          <a
            style={{
              textDecoration: "none",
            }}
            href="/favourites"
          >
            {/* <i style={{color:"white", fontSize:19}} className="fa-solid fa-heart"></i> */}
            <iconify-icon style={{color:"white", fontSize:30}} icon="el:heart-alt"></iconify-icon>
            {this.state.hover ? (<div style={{display:"inline", fontSize:20, color:"white", marginLeft:10, verticalAlign:"top"}}>favourite</div>) : (<div></div>)}
            {/* <i class="fa-light fa-circle-heart"></i> */}
          </a>
        </div>
      </div>
    );
  }
}
