import { Component } from "react";
import "./ApiCall.css";
export default class ApiCall extends Component {
  state = {
    city: null,
    days: 2,
    arrElement: 1,
    allData: null,
    date: null,
    weatherLocation: null,
    weatherCurrent: null,
    country: null,
    icon: null,
    temp: null,
    feelsLike: null,
    humidity: null,
    visibility: null,
    precipitation: null,
    arr: [],
    favourite: false,
    // detailedToggle: true,
    // additionalDataArr: [],
    // humidityBackup: null,
  };
  citySubmit = (event) => {
    console.log(this.state.city);
    const data = async () => {
      // const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.state.api1}&q=${this.state.city}&aqi=no`)
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${this.state.city}&aqi=no`
      );
      const data = await response.json();
      console.log(data);
      this.setState({
        weatherLocation: data.location,
        weatherCurrent: data.current,
        country: data.location.country,
        icon: data.current.condition.icon,
        temp: data.current.temp_c,
        feelsLike: data.current.feelslike_c,
        humidity: data.current.humidity,
        visibility: data.current.vis_km,
        precipitation: data.current.precip_mm,
      });
      //   check if the city is already in the local storage
      if (localStorage.getItem("cityArr") !== null) {
        console.log("cityArr exists");
        let cityArr = localStorage.getItem("cityArr");
        cityArr = JSON.parse(cityArr);
        console.log(cityArr);
        for (let i = 0; i < cityArr.length; i++) {
          if (cityArr[i] === this.state.city) {
            console.log("city already exists");
            console.log(this.state.favourite);
            this.setState({
              favourite: true,
            });
            console.log(this.state.favourite);
            return;
          } else {
            this.setState({
              favourite: false,
            });
          }
        }
      }
    };
    data();
  };
  futureWeather = () => {
    // console.log(this.state.city);
    const data = async () => {
      //   this.setState({
      //     arrElement: this.state.arrElement + 1,
      //     days: this.state.days + 1,
      //   });
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${this.state.city}&days=${this.state.days}&aqi=no&alerts=no`
      );
      const data = await response.json();
      // console.log(data);
      console.log(this.state.arrElement);

      this.setState({
        allData: data,

        date: data.forecast.forecastday[this.state.arrElement].date,
        weatherLocation: data.location,
        weatherCurrent: data.current,
        country: data.location.country,
        // icon: data.current.condition.icon,
        temp: data.forecast.forecastday[this.state.arrElement].day.avgtemp_c,
        feelsLike: "NA",
        humidity:
          data.forecast.forecastday[this.state.arrElement].day.avghumidity,
        visibility:
          data.forecast.forecastday[this.state.arrElement].day.avgvis_km,
        precipitation:
          data.forecast.forecastday[this.state.arrElement].day.totalprecip_mm,
        arrElement: this.state.arrElement + 1,
        days: this.state.days + 1,
      });
    };
    data();
  };
  pastWeather = () => {
    this.setState({
      days: this.state.days - 1,
      arrElement: this.state.arrElement - 2,
    });
    console.log(this.state.arrElement);
    console.log(this.state.arrElement);
    console.log(this.state.arrElement);
    this.futureWeather();
  };

  handleChange = (event) => {
    this.setState({
      city: event.target.value,
    });

    // console.log(this.state.city);
  };
  checkCondition = () => {
    console.log(this.state.arrElement);
    if (this.state.arrElement <= 1) {
      return false;
    } else {
      return true;
    }
  };

  checkConditionForecast = () => {
    console.log(this.state.arrElement);
    if (this.state.temp == null) {
      return false;
    } else {
      return true;
    }
  };
  checkConditionNext = () => {
    console.log(this.state.arrElement);
    if (this.state.arrElement > 12 || this.state.city == null) {
      return false;
    } else {
      return true;
    }
  };
  //   mouseEnter = (event) => {
  //     console.log("mouse enter");
  //     this.setState({
  //       detailedToggle: true,
  //     });
  //     console.log(this.state.detailedToggle);
  //     this.state.additionalDataArr.push(
  //         <div>
  //             hello there
  //             <p>Humidity: {this.state.humidityBackup}</p>
  //         </div>
  //         );
  //   };
  //   mouseLeave = (event) => {
  //     console.log("mouse leave");
  //     this.setState({
  //       detailedToggle: false,
  //     });
  //     console.log(this.state.detailedToggle);
  //   };

  detailedForecast = () => {
    let arr = [];
    const data = async () => {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_API_KEY}&q=${this.state.city}&days=14&aqi=no&alerts=no`
      );
      const data = await response.json();
      console.log(data);

      //forecast for all days in small card format
      for (let i = 0; i < 4; i++) {
        console.log(data.forecast.forecastday[i].date);
        this.setState({
          temp: data.forecast.forecastday[i].day.avgtemp_c,
          humidityBackup: data.forecast.forecastday[i].day.avghumidity,
          //   visibility: data.forecast.forecastday[i].day.avgvis_km,
          //   precipitation: data.forecast.forecastday[i].day.totalprecip_mm,
          //   date: data.forecast.forecastday[i].date_epoch,
        });
        // console.log(this.state.date);
        // display all the data in small cards
        // dynamic cards
        this.state.arr.push(
          <div key={i} style={{ display: "inline-block" }}>
            <div
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              style={{
                width: 128,
                height: 123,
                borderRadius: 10,
                boxShadow: "2px 2px 14px 0px",
                position: "relative",
                top: 100,
                left: 350,
                marginRight: 45,
                marginLeft: 45,
              }}
            >
              <h6
                style={{
                  paddingTop: 10,
                  paddingLeft: 18,
                  display: "inline-block",
                  marginBottom: 0,
                }}
              >
                {data.forecast.forecastday[i].date}
              </h6>
              <img style={{ marginLeft: -8 }} src={this.state.icon} />
              <p style={{ display: "inline" }}>
                {data.forecast.forecastday[i].day.avgtemp_c} <sup>o</sup>C
              </p>
              <br />

              <p style={{ marginBottom: 0, marginLeft: 14 }}>
                <p style={{ fontWeight: 2, marginRight: 4, display: "inline" }}>
                  {data.forecast.forecastday[i].day.maxtemp_c} <sup>o</sup>{" "}
                </p>
                {data.forecast.forecastday[i].day.mintemp_c} <sup>o</sup>
              </p>
            </div>
          </div>
        );
      }
      //   console.log(this.state.arr);
    };
    data();
    // return <div>{arr}</div>;
  };

  addFavourite = (event) => {
    // event.target.classList.add("fa-solid", "fa-heart");
    console.log("add favourite");
    // check if there is any cityArr in local storage
    if (localStorage.getItem("cityArr") !== null) {
      console.log("cityArr exists");
      let cityArr = localStorage.getItem("cityArr");
      cityArr = JSON.parse(cityArr);
      console.log(cityArr);
      console.log(this.state.favourite);
      //   check if the city is already in the local storage
      if (cityArr.length === 0) {
        this.setState({
          favourite: true,
        });
      }
      for (let i = 0; i < cityArr.length; i++) {
        if (cityArr[i] === this.state.city) {
          console.log("city already exists");
          cityArr.splice(i, 1);
          console.log(cityArr);
          localStorage.setItem("cityArr", JSON.stringify(cityArr));
          this.setState({
            favourite: false,
          });
          return;
        } else {
          console.log("city does not exist");
          this.setState({
            favourite: true,
          });
        }
      }
      console.log(this.state.favourite);
      cityArr.push(this.state.city);
      console.log(cityArr);
      localStorage.setItem("cityArr", JSON.stringify(cityArr));
    } else {
      console.log("cityArr does not exist");
      let cityArr = [];
      cityArr.push(this.state.city);
      localStorage.setItem("cityArr", JSON.stringify(cityArr));
      this.setState({
        favourite: true,
      });
    }
  };

  render() {
    return (
      <div>
        <input
          style={{
            outline: "none",
            border: "2px solid #6D1921",
            position: "relative",
            top: 30,
            left: 564,
            width: 277,
          }}
          type="text"
          placeholder="Search by city name"
          onChange={this.handleChange}
        />
        {this.state.weatherCurrent ? (
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
              {this.state.city}
            </h3>
            <button
              onClick={this.addFavourite}
              style={{
                border: "none",
                background: "none",
                marginRight: 24,
                float: "right",
                marginTop: 10,
              }}
            >
              {this.state.favourite ? (
                <i className="fa-solid fa-heart"></i>
              ) : (
                <i className="fa-regular fa-heart"></i>
              )}
              {/* <i className="fa-regular fa-heart"></i> */}
            </button>

            {this.state.date ? (
              <p style={{ display: "inline", paddingLeft: 10 }}>
                {this.state.date}
              </p>
            ) : (
              <p></p>
            )}
            <p style={{ paddingLeft: 10 }}>{this.state.country}</p>
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
                <img src={this.state.icon} />
                <p style={{ display: "inline" }}>
                  {this.state.temp} <sup>o</sup>C
                </p>
                <br />
                <p>
                  Feels like {this.state.feelsLike} <sup>o</sup>C
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
                  Humidity:&nbsp;{this.state.humidity}
                </p>
                <p style={{ marginBottom: 0 }}>
                  Visibilty:&nbsp;{this.state.visibility}
                </p>
                <p style={{ marginBottom: 0 }}>
                  Precipitation: &nbsp;{this.state.precipitation}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div
          style={{
            position: "relative",
            top: 70,
            left: 570,
            marginTop: 30,
            display: "flex",
          }}
        >
          <button
            style={{
              display: "flex",
              height: 31,
              width: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              marginRight: 20,
            }}
            disabled={!this.checkCondition()}
            className="btn btn-warning"
            onClick={this.pastWeather}
          >
            Previous
          </button>
          <button
            style={{
              display: "flex",
              height: 31,
              width: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
            }}
            className="btn btn-primary"
            onClick={this.citySubmit}
          >
            Enter
          </button>

          <button
            style={{
              display: "flex",
              height: 31,
              width: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              marginLeft: 20,
            }}
            className="btn btn-warning"
            disabled={!this.checkConditionNext()}
            onClick={this.futureWeather}
          >
            Next
          </button>

          <button
            style={{
              display: "flex",
              height: 31,
              width: 70,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              marginLeft: 20,
            }}
            disabled={!this.checkConditionForecast()}
            className="btn btn-warning"
            // disabled={!this.checkConditionDetailed()}
            onClick={this.detailedForecast}
          >
            forecast
          </button>
        </div>
        <div>{this.state.arr}</div>

        {/* {this.state.days ? (<div>{this.state.days}</div>): (<div></div>)}
                {this.state.arrElement ? (<div>{this.state.arrElement}</div>): (<div></div>)} */}
      </div>
    );
  }
}
