import React ,{Component} from 'react';
import './card.css';

export default class Card extends Component{
    render(){

        return(
            <div className="card flex flex-column padding-bottom-10 align-center">
                <span className="title padding-top-10">{this.props.title}</span>
                <div className="flex justify-space-a width-full">
                    <span>
                        Start Time:{this.props.startTime}
                    </span>
                    <span>
                        Number of questions:{this.props.num}
                    </span>
                    <span>
                        Time:{this.props.time}
                    </span>
                </div>
            </div>
        )

    }
}