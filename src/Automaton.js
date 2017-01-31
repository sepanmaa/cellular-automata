import React, { Component } from 'react';

function initCells(width, height) {
    let cells = [];
    for (let i = 0; i < height; i++) {
	cells[i] = [];
	for (let j = 0; j < width; j++) {
	    cells[i][j] = 0;
	}
    }
    return cells;
}

class Automaton extends Component {
    constructor(props) {
	super(props);
	this.state = { cells: initCells(this.props.width, this.props.height),
		       running: false,
		       ticks: 0 };
	this.handleClick = this.handleClick.bind(this);
	this.handleStop = this.handleStop.bind(this);
	this.handleRun = this.handleRun.bind(this);
	this.handleReset = this.handleReset.bind(this);
    }
    
    componentDidMount() {
	this.timerID = setInterval(
	    () => this.tick(),
	    500
	);
    }
    componentWillReceiveProps(props) {
	this.props = props;
	this.setState({ cells: initCells(this.props.width, this.props.height),
			running: false,
			ticks: 0 });
    }

    componentWillUnmount() {
	clearInterval(this.timerID);
    }

    handleClick(e) {
	const bcr = e.target.getBoundingClientRect();
	const x = Math.floor((e.clientX - bcr.left) / this.props.tileSize);
	const y = Math.floor((e.clientY - bcr.top) / this.props.tileSize);
	let cs = this.state.cells;
	cs[y][x] = this.props.rules.inc(cs[y][x]);
	this.setState({cells: cs});
    }

    handleStop() {
	this.setState({running: false});
    }

    handleRun() {
	this.setState({running: true});
    }

    handleReset() {
	this.setState({cells: initCells(this.props.width, this.props.height),
		       running: false, ticks: 0});
    }

    tick() {
	if (this.state.running) {
	    this.setState(
		{ cells: this.props.rules.step(this.state.cells, this.props.width, this.props.height),
		  ticks: this.state.ticks + 1} );
	}
    }

    render() {
	let lines = [];
	let rects = [];
	const w = this.props.width;
	const h = this.props.height;
	const s = this.props.tileSize;
	for (let i = 0; i < this.props.width; i++)
	    lines.push(<line key={"vline"+i} y1={0} x1={i*s} x2={i*s} y2={h*s}
			     stroke="grey" pointerEvents="none"/>)
	for (let i = 0; i < this.props.height; i++) {
	    lines.push(<line key={"hline"+i} x1={0} y1={i*s} x2={w*s} y2={i*s}
			     stroke="grey" pointerEvents="none"/>);
	    for (let j = 0; j < this.props.width; j++) {
		const c = this.state.cells[i][j];
		if (c !== 0)
		    rects.push(<rect key={"cell"+i*w+j} x={j*s} y={i*s} width={s} height={s}
				     fill={this.props.rules.color(c)} pointerEvents="none"/>);
	    }
	}
	return(
	    <div>
	        <svg width={w*s} height={h*s} onClick={this.handleClick}>
		    <rect x={0} y={0} pointerEvents="none" width={w*s} height={h*s}
			  fill={this.props.rules.color(0)} stroke="black"/>
		    {rects}
		    {lines}
		</svg>
	        <div>
		    <button onClick={this.handleStop}>Stop</button>
		    <button onClick={this.handleRun}>Run</button>
		    <button onClick={this.handleReset}>Reset</button>
		    <div>Time: {this.state.ticks}</div>
	        </div>
	    </div>);
    }            
}

export default Automaton;

