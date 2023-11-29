import { Component } from "react";

export default class MapTrial extends Component{

    submitReq = (event) => {

        const data = async () => {
            console.log("Called");
            const response = await fetch(`https://api.tomorrow.io/v4/map/tile/0/2/1/humidity/now.png?apikey=XjeyuBDEfKOkp4TAhvZgjuVzbnsxbeLE`)
            const data = await response.json();
            console.log(data);
        }
        data();
    }

    render(){

        return(
            <div>
                <button className="btn btn-primary" onClick={this.submitReq}>Click Me</button>
            </div>
        );
    }
}