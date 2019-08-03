import React, { Component } from 'react';
import './card.css';
import { withRouter } from 'react-router-dom';

class Card extends Component {
    getTest = (name) => {
        this.props.history.push({
            pathname: '/editor',
            state: { name: this.props.title }
        })
    }
    render() {
        return (
            <div className="card flex flex-column padding-bottom-10 align-center" onClick={this.getTest} >
                <div className="title width-full flex justify-space-b padding-top-10">
                    <span>
                        {this.props.title}
                    </span>
                    <span>
                        Category : {this.props.class}
                    </span>
                </div>
                <div className="flex justify-space-a width-full">
                    <span>
                        Start Time  : {this.props.startTime}
                    </span>
                    <span>{this.props.num} question(s)</span>
                    <span>
                        {this.props.time}(s)
                    </span>
                </div>
            </div>
        )

    }
}


export default withRouter(Card);