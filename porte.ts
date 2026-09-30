import { Puzzle } from "./puzzle";

export class Porte{
	isOpen: boolean;
	clef: string;
	puzzle: Puzzle;

	constructor(key:string = ""){
		this.isOpen = false;
		this.clef = key;
	}

	addPuzzle(puzzle:Puzzle){
		this.puzzle = puzzle;
	}

	pass():boolean {
		if(this.puzzle === undefined){
			return this.isOpen;
		}
		return this.isOpen && this.puzzle.isSolved;
	}

	openDoor():void {
		this.isOpen = true;
	}

	
}