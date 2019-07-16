import React, { Component } from 'react';
import write from '../../assets/write.png';
import upload from '../../assets/upload.png';
import './upload.css'

export default class Upload extends Component {
    render() {
        return (
            <div className="upload-workspace flex flex-column align-center justify-space-e">
                <h1>
                    Select a upload method to proceed
                </h1>
                <div className="upload flex">
                    <div className="upload-file flex flex-column align-center justify-center">
                        <img className="transition-ease" src={upload}></img>
                        <span>
                            Upload File
                        </span>
                    </div>
                    <div className="write-file flex flex-column align-center justify-center">
                        <img className="transition-ease" src={write}></img>
                        <span className="margin-left-n-30">
                            Write File
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}