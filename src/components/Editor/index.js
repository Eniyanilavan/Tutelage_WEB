import React, {Component} from 'react';
import './editor.css';
import MonacoEditor from 'react-monaco-editor';
import arrow from '../../assets/arrow.png';
import {host} from '../../config';
import run from '../../assets/run.png'
import Dropdown from '../Dropdown';
var that;

export default class Editor extends Component{

    constructor(props) {
      super(props);
      this.state = {
        code: '// type your code...',
        lang: 'c',
        questions:[],
        active:0,
      }
      that = this
    }

    componentDidMount(){
      fetch(`http://${host}/get_questions/sample`, {
        method:"GET",
        headers:{
          "Content-Type":"application/json"
        },
      })
      .then(res=>{
        if(res.status == 200){
          return res.json()
        }
        else{
          throw "error"
        }
      })
      .then(data=>{
        console.log(data);
        this.setState({
          questions:data.questions
        })
      })
      .catch(e=>{
        console.log(e)
      })
    }

    editorDidMount(editor, monaco) {
      console.log('editorDidMount', editor);
      editor.focus();
    }

    onChange(newValue, e) {
      console.log('onChange', newValue, e);
      that.setState({
        code:newValue
      })
    }  
    extend(e){
      var extender = document.getElementById('extender');
      var editor = document.getElementById('editor');
      var questions = document.getElementById('ques');
      editor.classList.toggle('extend');
      questions.classList.toggle('shorten');
      extender.style.transform?extender.style.transform="":extender.style.transform="rotate(-180deg)";
    }

    OnChange = (e)=>{
      var {value} = e.target;
      this.setState({
        lang:value
      })
    }

    run = ()=>{
      console.log(this.state.code)
      var body = {
        ques_no:this.state.active,
        code:this.state.code,
        lang:this.state.lang,
        test:'sample'
      }
      fetch(`http://${host}/run`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      })
      .then(res=>{
        if(res.status == 200){
          return res.json()
        }
        throw "error"
      })
      .then(data=>{
        console.log(data);
      })
      .catch(e=>{
        console.log(e)
      })
    }

    updateTab=(e)=>{
      console.log("e.target.innerHTML = ",e.target.innerHTML);
      console.log("this.state.active",this.state.active+1);
     if(e.target.innerHTML!=this.state.active+1){
        e.target.classList.toggle('active-tab');
        console.log("hehehe");
        document.getElementsByClassName("tab-head")[this.state.active].classList.toggle("active-tab");
        this.setState({
          active:parseInt(e.target.innerHTML)-1
        })
     }

    }
    render(){
        const code = this.state.code;
        const options = {
            selectOnLineNumbers: true,
            scrollbar: {
              useShadows: false,
              verticalHasArrows: true,
              horizontalHasArrows: true,
              vertical: 'visible',
              horizontal: 'visible',
              verticalScrollbarSize: 14,
              horizontalScrollbarSize: 10,
              arrowSize: 20
            },
            theme:'vs',
            fontSize:16,
            automaticLayout:true,
            rulers:[0],
            smoothScrolling:true
        };
        var tabs = this.state.questions.map((tab,index)=>{
          return index === 0?<div onClick={this.updateTab} className="tab-head active-tab">{index+1}</div>:<div onClick={this.updateTab} className="tab-head">{index+1}</div>;
        })
        return(
            <div className="parent flex flex-column">
                <nav className="Enav width-full flex justify-space-b  align-center">
                  <div className="margin-left-10 product-name">
                    Tutelage
                  </div>
                  <div className="flex justify-space-a">
                    <Dropdown onChange={this.OnChange} value={"lang"} width={"130px"} height={"40px"} default={"c"} bg={"#fff"} dropC={"#02326e"} font={"#04DBB3"} list={['c', 'python', 'java']}/>
                    <div onClick={this.run} className="run-container flex justify-space-b align-center margin-right-20">
                      <img className="run-img" src={run}/>
                      <span>RUN</span>
                    </div>
                  </div>
 
                </nav>
                <div className="workspace flex width-full">
                    <div id="ques" className="questions height-full flex flex-column">
                      <nav className="questions-nav">
                      <div className="tabs flex">
                            {tabs}
                          </div>
                      </nav>
                      <div className="question-nav flex">
                        <div className="questions-tab">
                          {this.state.questions[this.state.active]}
                        </div>
                        <div className="extender flex align-center justify-center" onClick={this.extend}>
                          <img id="extender" src={arrow}></img>
                        </div>
                      </div> 
                      <div className="logs">

                      </div>
                    </div>
                    <div id="editor" className="editor">
                      <MonacoEditor
                          language={this.state.lang}
                          value={code}
                          options={options}
                          onChange={this.onChange}
                          editorDidMount={this.editorDidMount}
                      />
                    </div>
                </div>
                
            </div>
        )
    }
}