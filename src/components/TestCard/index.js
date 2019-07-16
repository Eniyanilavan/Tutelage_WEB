import React, {Component} from 'react';
import './testcard.css';

export default class TestCard extends Component{

    onChangeInput=(e)=>{
        this.props.updateTestcase(e.target.value,this.props.index,0);
    }
    onChangeOutput=(e)=>{
        this.props.updateTestcase(e.target.value,this.props.index,1);
    }

    render(){
        return(
            <div className="testcard flex">
                <div className="input flex flex-column width-half height-full justify-center">
                    <span className="margin-left-10">
                        Input
                    </span>
                    <textarea id="input" onChange={this.onChangeInput} >

                    </textarea>
                </div>
                <div className="output flex flex-column input width-half height-full justify-center">
                    <span className="margin-left-10" >
                        Output
                    </span>
                    <textarea onChange={this.onChangeOutput}>
                        
                    </textarea>
                </div>
            </div>

        )

    }

}