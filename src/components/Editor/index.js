import React, { Component } from 'react';
import './editor.css';
import MonacoEditor from 'react-monaco-editor';
import arrow from '../../assets/arrow.png';
import { host, WShost } from '../../config';
import run from '../../assets/run.png'
import Dropdown from '../Dropdown';
import { withRouter } from 'react-router-dom';
var that;

var events = {
	'opened': (ws, message, file_id) => {
		// console.log('opened');
		ws.send(JSON.stringify({ 'event': 'register', id: file_id }))
	},
	'completed': (ws, message, file_id) => {
		// console.log('completd')
		// console.log(message)
		if (message.result.failed === 0) {
			document.getElementById('logs').innerText = 'SUCCESS'
		}
		else {
			document.getElementById('logs').innerText = 'FAILED\n' + message.result.outputs[message.result.error[0]]
		}
		ws.close()
	}
}

var WSConnector = (file_id) => {
	const ws = new WebSocket(`ws://${WShost}`);
	ws.onopen = (event) => {
		// console.log('connected');
	}
	ws.onmessage = (message) => {
		message = JSON.parse(message.data);
		var event = message.event;
		events[event](ws, message, file_id);
	}
}


class Editor extends Component {

	constructor(props) {
		super(props);
		this.state = {
			code: '// type the code...',
			lang: 'python',
			questions: [],
			active: 0,
		}
		that = this
	}

	componentDidMount() {
		fetch(`http://${host}/get_questions/${this.props.location.state.name}?token=${sessionStorage.getItem("token")}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			},
		})
			.then(res => {
				if (res.status === 200) {
					return res.json()
				}
				else {
					throw "error"
				}
			})
			.then(data => {
				// console.log(data);
				// console.log(sessionStorage.getItem("attempts"));
				if (sessionStorage.getItem("attempts") === null) {
					// console.log("hello");
				}
				else {
					// console.log("in else");
					const attempts = {
						id: sessionStorage.getItem("reg"),
						uname: sessionStorage.getItem("uname"),
						dept: sessionStorage.getItem("dep"),
						year: sessionStorage.getItem("year"),
						section: sessionStorage.getItem("sec"),
						test: this.props.location.state.name,
						report: {}
					}
					for (var index = 0; index < data.questions.length; index++) {
						attempts.report[index] = {
							count: 0,
							code: '//type the code',
							error: ['']
						}
					}
					// console.log(attempts);
					sessionStorage.setItem("attempts", JSON.stringify(attempts));
				}
				this.setState({
					questions: data.questions,
					id: + new Date()
				}, () => { WSConnector(this.state.id) })
			})
			.catch(e => {
				console.log(e)
			})
	}
	editorDidMount = (editor, monaco) => {
		// console.log('editorDidMount', editor);
		editor.focus();
	}

	onChange = (newValue, e) => {
		console.log('onChange', newValue, e);
		that.setState({
			code: newValue
		})
	}
	extend = (e) => {
		var extender = document.getElementById('extender');
		var editor = document.getElementById('editor');
		var questions = document.getElementById('ques');
		editor.classList.toggle('extend');
		questions.classList.toggle('shorten');
		extender.style.transform ? extender.style.transform = "" : extender.style.transform = "rotate(-180deg)";
	}

	OnChange = (e) => {
		var { value } = e.target;
		this.setState({
			lang: value
		})
	}

	submit = () => {
		var body = {
			ques_no: this.state.active,
			code: this.state.code,
			lang: this.state.lang,
			id: this.state.id,
			test: 'sample'
		}
		fetch(`http://${host}/code/submit?token=${sessionStorage.getItem("token")}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if (res.status === 200) {
					return res.json()
				}
				throw "error"
			})
			.then(data => {
				console.log(data);
				WSConnector(data.id);
			})
			.catch(e => {
				console.log(e)
			})
	}

	submit = () => {
		var body = {
			ques_no: this.state.active,
			code: this.state.code,
			lang: this.state.lang,
			id: this.state.id,
			test: 'sample'
		}
		fetch(`http://${host}/code/submit?token=${sessionStorage.getItem("token")}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if (res.status == 200) {
					return res.json()
				}
				throw "error"
			})
			.then(data => {
				console.log(data);
				WSConnector(data.id);
			})
			.catch(e => {
				console.log(e)
			})
		var attempts = JSON.parse(sessionStorage.getItem("attempts"));
		attempts[this.state.active].count = attempts[this.state.active].count + 1;
		sessionStorage.setItem("attempts", JSON.stringify(attempts));
	}

	run = () => {
		var body = {
			ques_no: this.state.active,
			code: this.state.code,
			lang: this.state.lang,
			id: this.state.id,
			test: 'sample'
		}
		fetch(`http://${host}/code/run?token=${sessionStorage.getItem("token")}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => {
				if (res.status == 200) {
					return res.json()
				}
				throw "error"
			})
			.then(data => {
				console.log(data);
				WSConnector(data.id);
			})
			.catch(e => {
				console.log(e)
			})
	}

	end = () => {
		fetch(`http://${host}/report?token=${sessionStorage.getItem("token")}`, {
			headers: {
				'Content-Type': 'application/json'
			},
			body: (sessionStorage.getItem("attempts")),
			method: "POST"
		}).then(res => res.json())
			.then((res) => {
				console.log(res);
				if (res.message === "Success") {
					this.props.history.push('/dashboard');
				}
			})
	}

	updateTab = (e) => {
		// console.log("e.target.innerHTML = ", e.target.innerHTML);
		// console.log("this.state.active", this.state.active + 1);
		if (e.target.innerHTML != this.state.active + 1) {
			var attempts = JSON.parse(sessionStorage.getItem("attempts"));
			console.log(attempts);
			console.log(this.state.code);
			attempts[this.state.active].code = this.state.code;
			this.setState({
				code: attempts[parseInt(e.target.innerHTML) - 1].code
			});
			sessionStorage.setItem("attempts", JSON.stringify(attempts));
			e.target.classList.toggle('active-tab');
			// console.log("hehehe");
			document.getElementsByClassName("tab-head")[this.state.active].classList.toggle("active-tab");
			this.setState({
				active: parseInt(e.target.innerHTML) - 1
			})
		}

	}
	render() {
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
			theme: 'vs',
			fontSize: 16,
			automaticLayout: true,
			rulers: [0],
			smoothScrolling: true
		};
		var tabs = this.state.questions.map((tab, index) => {
			return index === 0 ? <div onClick={this.updateTab} key={index} className="tab-head active-tab">{index + 1}</div> : <div onClick={this.updateTab} key={index} className="tab-head">{index + 1}</div>;
		})
		return (
			<div className="parent flex flex-column">
				<nav className="Enav width-full flex justify-space-b  align-center">
					<div className="margin-left-10 product-name">
						Tutelage
					</div>
					<div className="margin-left-10 product-name">
						{this.props.location.state.name}
					</div>
					<div className="flex justify-space-a">
						<Dropdown onChange={this.OnChange} value={"lang"} width={"130px"} height={"40px"} default={this.state.lang} bg={"#fff"} dropC={"#02326e"} font={"#04DBB3"} list={['c', 'python', 'java']} />
						<div onClick={this.run} className="run-container flex justify-space-b align-center margin-right-20">
							<img className="run-img" src={run} />
							<span>RUN</span>
						</div>
						<div onClick={this.submit} className="submit-container flex justify-space-b align-center margin-right-20">
							<img className="run-img" src={run} />
							<span>SUBMIT</span>
						</div>
						<div onClick={this.end} className="submit-container flex justify-space-b align-center margin-right-20">
							<span>END TEST</span>
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
						<div id="logs" className="logs">

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

export default withRouter(Editor);