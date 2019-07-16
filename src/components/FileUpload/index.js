import React, {Component} from 'react';
import './fileupload.css';
import TestCard from '../TestCard';

export default class FileUpload extends Component{

    constructor(props){
        super(props)
        this.state = {
            question:"question here"
        }
    }

    componentDidMount(){
        console.log("hi", this.state.question)
        // this.preview.value = this.state.question
    }

    componentWillUnmount(){
        console.log("unmount")
    }

    onChange = (e)=>{
        console.log(e.target.value)
        this.setState({
            question:e.target.value
        },()=>this.preview.value = this.state.question)
    }

    render(){
        return(
            <div className="width-full flex">
                <div className="file-content flex height-full justify-space-e flex-column align-center">
                    <textarea onChange={this.onChange} id="preview" className="preview" ref={el=>this.preview=el}>

                    </textarea>
                    <button className="Fupload transition-ease" id="Fupload">
                        Upload
                    </button>
                </div>
                <div className="test-cases width-half height-full flex flex-column">
                    <div className="topic flex justify-space-b align-center">
                        <h1 className="margin-left-10" >
                            Test Cases
                        </h1>
                        <span id="add"> + </span>
                    </div>
                    <TestCard/>
                </div>
            </div>

        )

    }

}