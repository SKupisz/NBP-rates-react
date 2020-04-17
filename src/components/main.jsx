import React from "react";

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
                    this.state.currData == [] ? <h1 className = "loading-bar">loading</h1>: this.state.currData.map(data => 

                    <div className = "row">
                        <div className="row-item">{data.code}</div>
                        <div className="row-item">{data.bid}</div>
                        <div className="row-item">{data.ask}</div>
                        
                    </div>)
                }
            </div>
        );
    }
}