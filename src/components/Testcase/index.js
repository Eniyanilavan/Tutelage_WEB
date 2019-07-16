import React, {Component} from 'react';
import './testcase.css';
import TestCard from '../TestCard';
import FileUpload from '../FileUpload';

export default class TestCase extends Component{
    constructor(props){
        super(props);
        this.state = {
            questions:[<FileUpload/>],
            question_tab:[
            <div onClick={this.changeQuestion} className="question-num width-full flex align-center justify-center">
                1
            </div>],
            num_question:1,
            cur_question:1
        }
    }

    changeQuestion=(e)=>{
        this.setState({
            cur_question:parseInt(e.target.innerHTML)
        })
    }

    addQuestion = ()=>{
        var temp = [...this.state.questions]
        temp.push(<FileUpload/>)
        console.log(temp)
        this.setState({
            questions:temp,
            question_tab:[...this.state.question_tab, 
            <div onClick={this.changeQuestion} className="question-num width-full flex align-center justify-center">
                {this.state.num_question+1}
            </div>],
            num_question:this.state.num_question+1
        })
    }

    render(){
        var question = this.state.questions.map((elem, index)=>{
            if(index === this.state.cur_question-1){
                return elem
            }
        })
        return(
            <div className="parent flex">
                <div className="add-q-nav height-full">
                    {this.state.question_tab}
                    <div onClick={this.addQuestion} className="question-num plus width-full flex align-center justify-center">
                        +
                    </div>
                </div>
                {question}
            </div>

        )

    }

}