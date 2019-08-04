import React, { Component } from 'react';
import write from '../../assets/write.png';
import upload from '../../assets/upload.png';
import './upload.css';
import Modal from './Modal/index';
import { host } from '../../config';
import { withRouter } from 'react-router-dom';
import Dropdown from '../Dropdown';

class Upload extends Component {
    modal = () => {
        // console.log(document.getElementById('modal-id'));
        document.getElementById('modal-id').classList.toggle('hide-modal');
        document.getElementById('backdrop-id').classList.toggle('hide');
        console.log("in modal");
    }
    createTest = () => {

        var body = {
            name: this.state.name,
            count: parseInt(this.state.count),
            start_date: this.state.start_date,
            end_date: this.state.end_date,
            duration: parseInt(this.state.duration),
            Type: this.state.type,
            whom: this.state.year+"_"+this.state.section
        }
        console.log(body)
        fetch(`http://${host}/create_test?token=${sessionStorage.getItem("token")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => {
            console.log("in then")
            if (res.status == 200) {
                console.log("in then status")
                this.props.history.push({
                    pathname: '/upload/file',
                    state: { count: body.count, name: body.name }
                });
            }
        })
        console.log(this.state);
    }
    saveValue = (val, e) => {
        this.setState({
            [val]: e.target.value
        });
    }
    yearOnChange = (e)=>{
        var {value} = e.target
        this.setState({year:value})
    }

    sectionOnChange = (e)=>{
        var {value} = e.target
        this.setState({section:value})
    }
    render() {

        return (
            <div className="upload-workspace flex flex-column align-center justify-space-e">
                <h1>
                    Select a upload method to proceed
                </h1>
                <div className="upload flex">
                    <div className="upload-file flex flex-column align-center justify-center">
                        <img className="transition-ease" src={upload} alt="1" ></img>
                        <span>
                            Upload File
                        </span>
                    </div>
                    <div className="write-file flex flex-column align-center justify-center">
                        <img className="transition-ease" src={write} alt="2" onClick={this.modal} ></img>
                        <span className="margin-left-n-30" >
                            Write File
                        </span>
                    </div>
                </div>
                <Modal>
                    <div className="modal hide-modal" id="modal-id" >
                        <div className="modal-heading">Test Creation</div>
                        <div className="services-list input-container flex flex-column justify-space-a">
                            <input type="text" className="test-name" placeholder="Test Name" onChange={(e) => this.saveValue('name', e)} />
                            <input type="number" className="test-duration" placeholder="Test Duration" onChange={(e) => this.saveValue('duration', e)} />
                            <div className="flex justify-space-a">
                                <Dropdown onChange={this.yearOnChange} value={"year"} width={"130px"} height={"40px"} default={"Select Year"} bg={"linear-gradient(to right,#6AB5D0,#21F9CF)"} font={"white"} shadow={"1px 0px 6px #4EBEFF"} list={['I', 'II', 'II', 'IV']}/>
                                <Dropdown onChange={this.sectionOnChange} value={"section"} width={"130px"} height={"40px"} default={"Select Section"} bg={"linear-gradient(to right,#6AB5D0,#21F9CF)"} font={"white"} shadow={"1px 0px 6px #4EBEFF"} list={['A', 'B', 'C']}/>
                            </div>
                            <input type="date" className="start-date" placeholder="start" onChange={(e) => this.saveValue('start_date', e)} />
                            <input type="date" className="end-date" onChange={(e) => this.saveValue('end_date', e)} />
                            <input type="text" className="test-category" placeholder="Test category" onChange={(e) => this.saveValue('type', e)} />
                            <input type="number" className="question-count" placeholder="Number of Question(s)" onChange={(e) => this.saveValue('count', e)} />
                        </div>
                        <div className="buttons-modal">
                            <button className="ok" onClick={this.createTest}>Ok</button>
                            <button className="cancel" onClick={this.modal} >Cancel</button>
                        </div>
                    </div>
                </Modal>
                <div className="backdrop hide" id="backdrop-id" onClick={this.modal}></div>
            </div>
        );
    }
}

export default withRouter(Upload);