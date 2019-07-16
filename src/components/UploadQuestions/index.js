import React, {Component} from 'react';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './upload.css';
import Upload from '../Upload';
import TestCase from '../Testcase';

export default class UploadQuestions extends Component{

    render(){

        return(
            <div className="parent flex flex-column">
                <nav className="Unav">

                </nav>
                    <Switch>
                        <Route path="/upload/file" component={TestCase}/>
                        <Route path="/upload/" component={Upload}/>
                    </Switch>
            </div>
        )

    }

}