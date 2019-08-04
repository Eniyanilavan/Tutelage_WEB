import React, {Component} from 'react';
import './login.css';
import icon from '../../assets/loginIcon.gif';
import Dropdown from '../Dropdown';
import {host} from '../../config/index'
// import {connect} from 'react-redux'


export default class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLogin: true,
            username:"",
            password:"",
            regno:"",
            dept:"",
            year:"",
            section:"",
        }
    }

    usernameOnChange = (e)=>{
        var {value} = e.target
        this.setState({username:value})
    }

    passwordOnChange = (e)=>{
        var {value} = e.target
        this.setState({password:value})
    }

    regnoOnChange = (e)=>{
        var {value} = e.target
        this.setState({regno:value})
    }

    deptOnChange = (e)=>{
        var {value} = e.target
        this.setState({dept:value})
    }

    yearOnChange = (e)=>{
        var {value} = e.target
        this.setState({year:value})
    }

    sectionOnChange = (e)=>{
        var {value} = e.target
        this.setState({section:value})
    }

    switchS = ()=>{
        var tab = document.getElementById('tab');
        this.state.isLogin?undefined:this.setState({isLogin:!this.state.isLogin},()=>{
            tab.classList.toggle('right')
        })
    }

    switchL = ()=>{
        var tab = document.getElementById('tab');
        this.state.isLogin?this.setState({isLogin:!this.state.isLogin},()=>{
            tab.classList.toggle('right')
        }):undefined
    }

    login = ()=>{
        this.Lalert.classList.add('invisible');
        var alert = this.Lalert
        if(this.state.regno==="" || this.state.password===""){
            this.Lalert.classList.remove('invisible');
            return
        }
        var body = {
            regno:this.state.regno,
            password:this.state.password
        }
        fetch(`http://${host}/login`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify(body),
            credentials: 'same-origin'
        })
        .then(res=>{
            if(res.status == 403){
                alert.innerHTML = "Wrong user name or password"
                this.Lalert.classList.remove('invisible');
            }
            console.log(res.headers)
            return res.json()
        })
        .then(data=>{
            console.log(data);
            sessionStorage.setItem("uname",data.user[1]);
            sessionStorage.setItem("reg",data.user[0]);
            sessionStorage.setItem("dep",data.user[2]);
            sessionStorage.setItem("year",data.user[3]);
            sessionStorage.setItem("sec",data.user[4]);
            // this.props.history.push({
            //     pathname: '/dashboard',
            // });
        })
        .catch(e=>{
            console.log(e)
        })
    }

    signup = ()=>{
        this.Salert.classList.add('invisible');
        var alert = this.Salert
        if(this.state.regno==="" || this.state.username==="" || this.state.dept==="" || this.state.year==="" || this.state.section==="" || this.state.password===""){
            this.Salert.classList.remove('invisible');
            return
        }
        var body = {
            regno:this.state.regno,
            uname:this.state.username,
            dept:this.state.dept,
            year:this.state.year,
            section:this.state.section,
            password:this.state.password,
            isAdmin: false
        }
        fetch(`http://${host}/signup`,{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(body)
        })
        .then(res=>{
            if(res.status === 409){
                alert.innerHTML = "User already exists";
                this.Salert.classList.remove('invisible');
                return
            }
            else if(res.status === 500){
                alert.innerHTML = "Try again later, if the error continues contact admin."
                this.Salert.classList.remove('invisible');
                return
            }
            return res.json()
        })
        .then(data=>{
            console.log(data);
        })
        .catch(e=>{
            console.log(e)
        })
    }

    render(){
        return(
            <div className="login parent flex">
                <div className="form flex align-center justify-center">
                    <div className="loginform flex flex-column">
                        <div>
                            <nav className="nav flex justify-space-a">
                                <span onClick={this.switchS}>
                                    Login
                                </span>
                                <span onClick={this.switchL}>
                                    Signup
                                </span>
                            </nav>
                            <div id="tab" className="tab"></div>
                        </div>
                        {this.state.isLogin?<div className="fields flex flex-column justify-space-b align-center">
                            <div className = "uname flex flex-column">
                                <label>Register Number</label>
                                <input onChange={this.regnoOnChange} type="text"></input>
                            </div>
                            <div className = "uname flex flex-column">
                                <label>Password</label>
                                <input onChange={this.passwordOnChange} type="password"></input>
                            </div>
                            <span ref={el=>this.Lalert=el} className="alert invisible"> *fill all the details</span>
                            <button onClick={this.login} className="submit transition-ease">
                                submit
                            </button>
                        </div>:<div className="Sfields flex flex-column justify-space-b align-center">
                            <div className="width-full flex justify-space-a">
                                <div className = "uname flex flex-column">
                                    <label>User Name</label>
                                    <input onChange={this.usernameOnChange} type="text"></input>
                                </div>
                                <div className = "uname flex flex-column">
                                    <label>Register Number</label>
                                    <input onChange={this.regnoOnChange} type="text"></input>
                                </div>
                            </div>
                            <div className="width-full flex justify-space-a">
                                <Dropdown onChange={this.deptOnChange} value={"dept"} width={"130px"} height={"40px"} default={"Select Dept"} bg={"#4EBEFF"} font={"white"} shadow={"1px 0px 6px #4EBEFF"} list={['CSE', 'ECE', 'EEE', 'IT', 'MECH', 'CIVIL', 'ICE']}/>
                                <Dropdown onChange={this.yearOnChange} value={"year"} width={"130px"} height={"40px"} default={"Select Year"} bg={"#4EBEFF"} font={"white"} shadow={"1px 0px 6px #4EBEFF"} list={['I', 'II', 'II', 'IV']}/>
                                <Dropdown onChange={this.sectionOnChange} value={"section"} width={"130px"} height={"40px"} default={"Select Section"} bg={"#4EBEFF"} font={"white"} shadow={"1px 0px 6px #4EBEFF"} list={['A', 'B', 'C']}/>
                            </div>
                            <div className = "uname flex flex-column">
                                <label>Password</label>
                                <input onChange={this.passwordOnChange} type="password"></input>
                            </div>
                            <span ref={el=>this.Salert=el} className="alert invisible"> *fill all the details</span>
                            <button onClick={this.signup} className="submit transition-ease">
                                Sign Up
                            </button>
                        </div>}
                    </div>
                </div>
                <div className="bg flex align-center">
                    <img src={icon}></img>
                </div>
            </div>
        )
    }
}

// var mapStoreToProps = (state)=>{

// }


// export default connect(mapStoreToProps)(Login);