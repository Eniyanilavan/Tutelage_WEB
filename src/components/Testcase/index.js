import React, { Component } from 'react';
import './testcase.css';
import FileUpload from '../FileUpload';
import { host } from '../../config'

export default class TestCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [<FileUpload />],
            question_tab: [],
            num_question: 0,
            cur_question: 1,
            questions_obj: [
                {
                    string: "",
                    testcases: [{ input: "", output: "" }]
                },
            ]
        }
    }

    changeQuestion = (e) => {
        this.setState({
            cur_question: parseInt(e.target.innerHTML)
        })
    }
    updateTestcase = (input, output, index) => {
        var questions_obj = this.state.questions_obj;
        if (questions_obj[index].testcases[0].input === "") {
            questions_obj[index].testcases[0].input = input;
            questions_obj[index].testcases[0].output = output;
            return;
        }
        questions_obj[index].testcases.push({
            input,
            output
        });
        console.log(input, output);
    }
    updateQuestions = (questions, number) => {
        var questions_obj = this.state.questions_obj;
        questions_obj[number].string = questions;
        this.setState({
            questions_obj: questions_obj
        });
    }

    addQuestion = () => {
        var temp = [...this.state.questions];
        var questions_obj = this.state.questions_obj;
        questions_obj.push({ string: "", testcases: [{ input: "", output: "" }] });
        temp.push(1)
        console.log(temp)
        this.setState({
            questions: temp,
            question_tab: [...this.state.question_tab,
            <div onClick={this.changeQuestion} className="question-num width-full flex align-center justify-center">
                {this.state.num_question + 1}
            </div>],
            num_question: this.state.num_question + 1
        })
    }
    componentDidMount() {
        var temp = [...this.state.questions];
        var questions_obj = this.state.questions_obj;
        var state_d = this.state;
        for (var i = 0; i < this.props.location.state.count; i++) {
            questions_obj.push({ string: "", testcases: [{ input: "", output: "" }] });
            temp.push(1)
            console.log(temp)
            state_d.questions = temp;
            state_d.question_tab = [...this.state.question_tab,
            <div onClick={this.changeQuestion} className="question-num width-full flex align-center justify-center">
                {this.state.num_question + 1}
            </div>];
            state_d.num_question = this.state.num_question + 1
        }
        this.setState({
            ...state_d
        })
    }
    componentDidUpdate() {
        console.log("state", this.state.questions_obj);
    }

    upload = () => {
        fetch(`http://${host}/upload/sample`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "questions": this.state.questions_obj })
        })
    }

    render() {
        console.log(this.state);
        var question = this.state.questions.map((elem, index) => {
            console.log("the index value is ", index);
            if (index === this.state.cur_question - 1) {
                return <FileUpload key={index} upload={this.upload} updateTestcase={this.updateTestcase} index={index} store={this.state.questions_obj[index]} updateQuestions={this.updateQuestions} />
            }
        })
        return (
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