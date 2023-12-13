import { Component } from "react";
export default class Favourites extends Component {
  state = {
    cities: [],
    loader: true,
    favourite: true,
  };

    removeFavourite = (index) => {
        console.log(index);
        // get key of city to be removed
        // remove city from local storage

        let cities = JSON.parse(localStorage.getItem("cityArr"));
        cities.splice(index,1);
        localStorage.setItem("cityArr", JSON.stringify(cities));
        // remove city from state
        this.state.cities.splice(index,1);
        this.setState({favourite: false});
    }

  componentDidMount() {
    // fetch cities from local storage
    // fetch weather data for each city
    // display weather data
    // console.log("hello");
    if (localStorage.getItem("cityArr") !== null) {
      let cities = JSON.parse(localStorage.getItem("cityArr"));
      console.log(cities);
      // fetch weather data for each city
      // display weather data
      for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        console.log(city);
        const data = async () => {
          const response = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${city}&aqi=no`
          );
          const data = await response.json();
          console.log(data);
          let simplifiedData = {
            name: city,
            country: data.location.country,
            temp: data.current.temp_c,
            feelsLike: data.current.feelslike_c,
            humidity: data.current.humidity,
            visibility: data.current.vis_km,
            precipitation: data.current.precip_mm,
            icon: data.current.condition.icon,
          };
          console.log(simplifiedData);
          this.state.cities.push(simplifiedData);
          console.log(this.state.cities);
          this.setState({loader: false});
        };
        data();
      }
    }
  }
  render() {
    return (
      <div>
        <h1>Favourites</h1>
        <div>
          {this.state.cities.map((city,index) => (
            <div key={index} style={{marginBottom:29}}>
            {city ? (
        
            
            <div
            style={{
              width: 555,
              height: 208,
              borderRadius: 16,
              boxShadow: "2px 2px 14px 0px",
              position: "relative",
              top: 70,
              left: 435,
            }}
          >
            <h3
              style={{
                paddingTop: 10,
                paddingLeft: 10,
                display: "inline-block",
                marginBottom: 0,
              }}
            >
              {city.name}
            </h3>
            <button key={index}
            //   onClick={this.removeFavourite}
              onClick={() => this.removeFavourite(index)}
              style={{
                border: "none",
                background: "none",
                marginRight: 24,
                float: "right",
                marginTop: 10,
              }}
            >
                {/* {this.state.favourite ? (<i className="fa-solid fa-heart"></i>):(<i className="fa-regular fa-heart"></i>)} */}
              <i key={index} className="fa-solid fa-heart"></i>
            </button>

            {/* {this.state.date ? (
              <p style={{ display: "inline", paddingLeft: 10 }}>
                {this.state.date}
              </p>
            ) : (
              <p></p>
            )} */}
            <p style={{ paddingLeft: 10 }}>{city.country}</p>
            <div
              style={{
                display: "table",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: "50%",
                  float: "left",
                  paddingLeft: 10,
                }}
              >
                <img src={city.icon} />
                <p style={{ display: "inline" }}>
                  {city.temp} <sup>o</sup>C
                </p>
                <br />
                <p>
                  Feels like {city.feelsLike} <sup>o</sup>C
                </p>
                <br />
              </div>
              <div
                style={{
                  width: "50%",
                  float: "left",
                }}
              >
                <p style={{ marginBottom: 0 }}>
                  Humidity:&nbsp;{city.humidity}
                </p>
                <p style={{ marginBottom: 0 }}>
                  Visibilty:&nbsp;{city.visibility}
                </p>
                <p style={{ marginBottom: 0 }}>
                  Precipitation: &nbsp;{city.precipitation}
                </p>
              </div>
            </div>
          </div>    
            
            )
            : (<div>loading</div>)}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
