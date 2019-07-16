import React, {Component} from 'react';
import './editor.css';
import MonacoEditor from 'react-monaco-editor';
import arrow from '../../assets/arrow.png'

export default class Editor extends Component{

    constructor(props) {
      super(props);
      this.state = {
        code: '// type your code...',
        lang: 'java'
      }
    }

    editorDidMount(editor, monaco) {
      console.log('editorDidMount', editor);
      editor.focus();
    }

    onChange(newValue, e) {
      console.log('onChange', newValue, e);
    }  
    extend(e){
      var extender = document.getElementById('extender');
      var editor = document.getElementById('editor');
      var questions = document.getElementById('ques');
      editor.classList.toggle('extend');
      questions.classList.toggle('shorten');
      extender.style.transform?extender.style.transform="":extender.style.transform="rotate(-180deg)";
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
        return(
            <div className="parent flex flex-column">
                <nav className="Enav width-full">

                </nav>
                <div className="workspace flex width-full">
                    <div id="ques" className="questions height-full flex flex-column">
                      <nav className="questions-nav">

                      </nav>
                      <div className="question-nav flex">
                        <div className="questions-tab">
                          
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