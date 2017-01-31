import React, { Component } from 'react';
import Automaton  from './Automaton.js'
import {Life, WireWorld, BriansBrain} from './rules.js';

class App extends Component {
    constructor(props) {
	super(props);
	this.state = {automaton: "life"};
	this.handleChange = this.handleChange.bind(this);
	this.automatons = {"life": new Life(),
			   "wire": new WireWorld(),
			   "brain": new BriansBrain()};
    }

    handleChange(e) {
	this.setState({automaton: e.target.value});
    }
    
    render() {
	return (
	    <div className="App" style={{ textAlign: "center" }}>
		<Automaton width={60} height={30} tileSize={15} rules={this.automatons[this.state.automaton]}/>
		<select value={this.state.automaton} onChange={this.handleChange}>
		    <option value="life">Conway's Game of Life</option>
		    <option value="wire">WireWorld</option>
		    <option value="brain">Brian's Brain</option>
		</select>
	    </div>
	);
    }
}

export default App;
