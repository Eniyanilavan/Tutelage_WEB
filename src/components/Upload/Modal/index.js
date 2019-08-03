import React, { Component } from 'react'
import './Modal.css';

export default class Modal extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}
