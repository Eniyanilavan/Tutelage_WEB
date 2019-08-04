import React, { Component } from 'react';
import './dashboard.css';
import Card from '../Card';
import { host } from '../../config/index';

export default class Dashborad extends Component {
    state = {
        cards: null
    }

    componentDidMount() {
        fetch(`http://${host}/tests?token=${sessionStorage.getItem("token")}`,
            // {
            //     method: "GET",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(body)
            // }
            )
            .then(res => res.json())
            .then(res => {
                console.log(res)
                var cards = res.rows.map(elm => {
                    var date = (new Date(elm[1])).toLocaleTimeString();

                    return <Card key={elm[0]} title={elm[0]} startTime={date} num={elm[5]} time={elm[2]} class={elm[6]} />
                })
                this.setState({
                    cards: cards
                });
            });

    }
    render() {
        console.log("in component did mount ");
        return (
            <div className="parent">
                <nav className="Enav width-full">

                </nav>
                <div className="width-full padding-top-10 height-full dashboard">
                    {this.state.cards}
                </div>
            </div>
        )
    }
}