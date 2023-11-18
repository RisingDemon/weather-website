import { Component } from "react";
export default class ApiCall extends Component {

    state = {
        city: null,
        api1: "ae318d3ec0684490a06172549231411",
        api2: "b257f6f627de492c940beb105ebad254",
        days: 1,
        arrElement: 0,
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
        precipitation: null
    }
    citySubmit = (event) => {
        console.log(this.state.city);
        const data = async () => {
            const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${this.state.api1}&q=${this.state.city}&aqi=no`)
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
                precipitation: data.current.precip_mm
            })
        }
        data();

    }
    futureWeather = () => {
        console.log(this.state.city);
        const data = async () => {
            const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${this.state.api1}&q=${this.state.city}&days=${this.state.days}&aqi=no&alerts=no`)
            const data = await response.json();
            console.log(data);
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
                humidity: data.forecast.forecastday[this.state.arrElement].day.avghumidity,
                visibility: data.forecast.forecastday[this.state.arrElement].day.avgvis_km,
                precipitation: data.forecast.forecastday[this.state.arrElement].day.totalprecip_mm,

                days: this.state.days + 1,
                arrElement: this.state.arrElement + 1
            })

        }
        data();

    }
    pastWeather=()=>{
        this.setState({
            days: this.state.days - 1,
            arrElement: this.state.arrElement - 2
        })
        this.futureWeather();
        // this.setState({
        //     date: this.state.allData.forecast.forecastday[this.state.arrElement].date,
        //     weatherLocation: this.state.allData.location,
        //     weatherCurrent: this.state.allData.current,
        //     country: this.state.allData.location.country,
        //     // icon: data.current.condition.icon,
        //     temp: this.state.allData.forecast.forecastday[this.state.arrElement].day.avgtemp_c,
        //     feelsLike: "NA",
        //     humidity: this.state.allData.forecast.forecastday[this.state.arrElement].day.avghumidity,
        //     visibility: this.state.allData.forecast.forecastday[this.state.arrElement].day.avgvis_km,
        //     precipitation: this.state.allData.forecast.forecastday[this.state.arrElement].day.totalprecip_mm,
        // })
    }

    handleChange = (event) => {
        this.setState({
            city: event.target.value
        })

        // console.log(this.state.city);
    }

    render() {
        return (
            <div>
                {/* <i className="fa-search"></i> */}
                <input style={{
                    outline: "none",
                    border: '2px solid #6D1921',
                    position: "relative",
                    top: 30,
                    left: 564,
                    width: 277
                }} type="text" placeholder="Search by city name" onChange={this.handleChange} />
                {this.state.weatherCurrent ? (
                    <div style={{
                        width: 555,
                        height: 208,
                        borderRadius: 16,
                        boxShadow: '2px 2px 14px 0px',
                        position: "relative",
                        top: 70,
                        left: 435
                    }}>
                        <h3 style={{ paddingTop: 10, paddingLeft: 10, display: 'inline-block', marginBottom: 0 }}>{this.state.city}</h3>
                        {this.state.date ? (<p style={{ display: 'inline', paddingLeft: 10 }}>{this.state.date}</p>) : <p></p>}
                        <p style={{ paddingLeft: 10 }}>{this.state.country}</p>
                        <div style={{
                            display: 'table',
                            width: '100%'
                        }}>
                            <div style={{
                                width: '50%',
                                float: "left",
                                paddingLeft: 10
                            }}>
                                <img src={this.state.icon} />
                                <p style={{ display: 'inline' }}>{this.state.temp} <sup>o</sup>C</p><br />
                                <p>Feels like {this.state.feelsLike} <sup>o</sup>C</p><br />

                            </div>
                            <div style={{
                                width: '50%',
                                float: "left"
                            }}>
                                <p style={
                                    { marginBottom: 0 }
                                }>Humidity:&nbsp;{this.state.humidity}</p>
                                <p style={
                                    { marginBottom: 0 }
                                }>Visibilty:&nbsp;{this.state.visibility}</p>
                                <p style={
                                    { marginBottom: 0 }
                                }>Precipitation: &nbsp;{this.state.precipitation}</p>

                            </div>
                        </div>

                    </div>
                ) : (<div></div>)}

                <div style={{
                    position: 'relative',
                    top: 70,
                    left: 570,
                    marginTop: 30,
                    display: 'flex'
                }}>
                    <button style={
                        {
                            display: "flex",
                            height: 31,
                            width: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            marginRight:20

                        }
                    } className="btn btn-warning" onClick={this.pastWeather}>Previous</button>
                    <button style={
                        {
                            display: "flex",
                            height: 31,
                            width: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2

                        }
                    } className="btn btn-primary" onClick={this.citySubmit}>Enter</button>

                    <button style={
                        {
                            display: "flex",
                            height: 31,
                            width: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            marginLeft: 20

                        }
                    } className="btn btn-warning" onClick={this.futureWeather}>Next</button>
                </div>
                {/* {this.state.days ? (<div>{this.state.days}</div>): (<div></div>)}
                {this.state.arrElement ? (<div>{this.state.arrElement}</div>): (<div></div>)} */}
            </div>
        );
    }
}