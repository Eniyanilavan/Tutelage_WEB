import React ,{Component} from 'react';
import './dashboard.css';
import Card from '../Card';

export default class Dashborad extends Component{
    render(){
        var cards = [{'title':'sample', 'start_time':'12th July 12:30', 'time':'60min', 'num':'60'}, {'title':'sample', 'start_time':'12th July 12:30', 'time':'60min', 'num':'60'},].map(elm=>{
            return <Card title={elm.title} startTime={elm.start_time} num={elm.num} time={elm.time}/>
        })
        return(
            <div className="parent">
                <nav className="Enav width-full">

                </nav>
                <div className="width-full padding-top-10 height-full dashboard">
                    {cards}
                </div>
            </div>
        )
    }
}