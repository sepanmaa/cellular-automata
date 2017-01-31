
// Moore neighborhood
const neighbors = [[0, -1], [0, 1], [-1, 0], [1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]];

export class Life {

    constructor() {
	this.colors = ["white", "black"];
    }

    color(value) {
	return this.colors[value];
    }

    inc(value) {
	return (value + 1) % this.colors.length;
    }
    
    step(cells, width, height) {
	let nextGen = [];

	for (let i = 0; i < height; i++) {
	    nextGen[i] = [];
	    for (let j = 0; j < width; j++) {
		const ns = neighbors.reduce((acc, p) => {
		    const y = (i + p[0] + height) % height; // wrap around the grid
		    const x = (j + p[1] + width) % width;
		    return acc + cells[y][x];
		}, 0)
		let next = 0;
		if (ns === 3 || (ns === 2 && cells[i][j] === 1))
		    next = 1;
		nextGen[i][j] = next;
	    }
	}
	
	return nextGen;
    }
}

export class WireWorld {

    constructor() {
	this.colors = ["black", "blue", "red", "yellow"];
    }
    
    color(value) {
	return this.colors[value];
    }

    inc(value) {
	return (value + 1) % this.colors.length;
    }
    
    step(cells, width, height) {
	let nextGen = [];

	for (let i = 0; i < height; i++) {
	    nextGen[i] = [];
	    for (let j = 0; j < width; j++) {
		const ns = neighbors.reduce((acc, p) => {
		    const y = (i + p[0] + height) % height;
		    const x = (j + p[1] + width) % width;
		    const v = cells[y][x] === 1 ? 1 : 0;
		    return acc + v;
		}, 0)
		let next = cells[i][j];
		if ((ns === 1 || ns === 2) && cells[i][j] === 3)
		    next = 1;
		else if (cells[i][j] === 1)
		    next = 2;
		else if (cells[i][j] === 2)
		    next = 3;
		nextGen[i][j] = next;
	    }
	}
	
	return nextGen;
    }
}

export class BriansBrain {
    constructor() {
	this.colors = ["black", "white", "blue"];	
    }
    color(value) {
	return this.colors[value];
    }
    inc(value) {
	return (value + 1) % this.colors.length;
    }
    step(cells, width, height) {
	let nextGen = [];

	for (let i = 0; i < height; i++) {
	    nextGen[i] = [];
	    for (let j = 0; j < width; j++) {
		const ns = neighbors.reduce((acc, p) => {
		    const y = (i + p[0] + height) % height;
		    const x = (j + p[1] + width) % width;
		    const v = cells[y][x] === 1 ? 1 : 0;
		    return acc + v;
		}, 0)
		let next = 0;
		if (ns === 2 && cells[i][j] === 0)
		    next = 1;
		else if (cells[i][j] === 1)
		    next = 2;
		nextGen[i][j] = next;
	    }
	}
	
	return nextGen;
    }    

}

