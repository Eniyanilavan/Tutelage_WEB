import React, { Component } from 'react';
import './fileupload.css';
import '../TestCard/testcard.css';


export default class FileUpload extends Component {
    state = {
        input: "",
        output: "",
        store: this.props.store
    }
    onChange = (e) => {
        this.props.updateQuestions(e.target.value, this.props.index);
    }

    onChangeInput = (e) => {
        this.state.input = e.target.value;
        // this.props.updateTestcase(e.target.value,this.props.index,0);
    }
    onChangeOutput = (e) => {
        this.state.output = e.target.value;
        // this.props.updateTestcase(e.target.value,this.props.index,1);
    }
    uploadTestcase = () => {
        this.props.updateTestcase(this.state.input, this.state.output, this.props.index);
        document.querySelector("#testcase_output").value = "";
        document.querySelector("#testcase_input").value = "";
        this.state.input = "";
        this.state.output = "";
        this.setState({
            store:this.props.store
        });
        console.log(this.props.store);

    }

    render() {
        console.log(this.props.store.testcases[0].input);
        console.log("hello there!!", this.props);
        var contents = this.state.store.testcases.map((item) => {
            return (<tr><td>{item.input}</td><td>{item.output}</td></tr>)
        })
        return (
            <div className="width-full flex">
                <div className="file-content flex height-full justify-space-e flex-column align-center">
                    <textarea onChange={this.onChange} id="preview" className="preview" ref={el => this.preview = el}>
                        {this.props.store.string}
                    </textarea>
                    <button onClick={this.props.upload} className="Fupload transition-ease" id="Fupload">
                        Upload
                    </button>
                </div>
                <div className="test-cases width-half height-full flex flex-column">
                    <div className="topic flex justify-space-b align-center">
                        <h1 className="margin-left-10" >
                            Test Cases
                        </h1>
                        <span onClick={this.uploadTestcase} id="add"> + </span>
                    </div>
                    <div className="testcard flex">
                        <div className="input flex flex-column width-half height-full justify-center">
                            <span className="margin-left-10">
                                Input
                    </span>
                            <textarea id="testcase_input" onChange={this.onChangeInput} >
                                {this.props.store.testcases[0].input}
                            </textarea>
                        </div>
                        <div className="output flex flex-column input width-half height-full justify-center">
                            <span className="margin-left-10" >
                                Output
                    </span>
                            <textarea id="testcase_output" onChange={this.onChangeOutput}>
                                {this.props.store.testcases[0].output}
                            </textarea>
                        </div>
                    </div>
                    {this.state.store.testcases[0].input!==""? <div className="table">
                        <table id="customers">
                            <tr>
                                <th>Input(s)</th>
                                <th>Output(s)</th>
                            </tr>
                            {contents}
                        </table>
                    </div> : null}
                </div>
            </div>

        )

    }

}