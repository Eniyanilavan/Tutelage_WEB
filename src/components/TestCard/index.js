import React, {Component} from 'react';
import './testcard.css';

export default class TestCard extends Component{

    render(){

        return(

            <div className="testcard flex">
                <div className="input flex flex-column width-half height-full justify-center">
                    <span className="margin-left-10">
                        Input
                    </span>
                    <textarea id="input">

                    </textarea>
                </div>
                <div className="output flex flex-column input width-half height-full justify-center">
                    <span className="margin-left-10" >
                        Output
                    </span>
                    <textarea>
                        
                    </textarea>
                </div>
            </div>

        )

    }

}