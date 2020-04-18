import React from "react";
import Preloader from "./preloader.jsx";
import github from "../img/github.png";

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.gettingTheInfo = this.gettingTheInfo.bind(this);
        this.currData = [];
        this.state = {
            currData: []
        }
    }

    gettingTheInfo(){
        fetch("https://api.nbp.pl/api/exchangerates/tables/C/?format=json")
        .then(res => res.json())
        .then(data => {this.setState({currData: data[0].rates})})
        .catch(err => console.log(err));
    }
    render(){
        this.gettingTheInfo();
        return(
            <div className="main-container">
                <header className="main-header">C Table Rates</header>
                {
                    this.state.currData == [] ? <Preloader/>: this.state.currData.map(data => 

<div className = "row">
    <div className="row-item">{data.code}</div>
    <div className="row-item">{data.bid}</div>
    <div className="row-item">{data.ask}</div>
    
</div>)
                }
                <a href = "https://github.com/SKupisz/NBP-rates-react">
                    <div className="github-button"><img src={github} alt="" className = "button-img"/></div>
                </a>
            </div>
        );
    }
}