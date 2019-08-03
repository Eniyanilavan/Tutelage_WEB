import React, { Component } from 'react';
import './dropdown.css';
import arrow from '../../assets/arrow-white.png'


export default class Dropdown extends Component {

    constructor(props) {
        super(props);
        this.head =  "";
        this.dropId =  "";
        this.selected =  "";
    }

    componentDidMount() {
        console.log(this.head)
        this.head.addEventListener('click', () => {
            this.dropId.classList.toggle('hide');
            this.arrow.classList.toggle('rotate-90');
        });

        this.dropId.addEventListener('click', (e) => {
            this.selected.innerHTML = e.target.innerHTML;
            this.dropId.classList.toggle('hide');
            this.arrow.classList.toggle('rotate-90');
            this.props.onChange({target:{value:e.target.innerHTML}})
        })
    }

    click = () => {

    }

    render() {
        console.log(this.props.list)
        var list = this.props.list.map(elm=>{
            return <div key={elm} className="drop-down-item">{elm}</div>
        })
        return (
            <div style={{height:this.props.height, width:this.props.width, backgroundColor:this.props.bg, color:this.props.font, boxShadow:this.props.shadow}} className="drop-down-container">
                <div ref={el=>this.head=el} id="drop-head-id"  className="drop-tag flex align-center">
                    <div ref={el=>this.selected=el} id="selected" className="drop-head">
                        {this.props.default}
                    </div>
                    <div className="arrow"><img className="arrow-drop" ref={el=>this.arrow=el} src={this.props.arrow||arrow} alt="⥮" /></div>
                </div>
                <div ref={el=>this.dropId=el} className="drop-down hide" style={{backgroundColor:this.props.dropC||this.props.bg, color:this.props.font}} id="drop-id">
                    {list}
                </div>
            </div>
        )
    }

}