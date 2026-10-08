import { Puzzle } from "./puzzle";
import { Alarme } from "./alarme";

export class Porte{
	isOpen: boolean;
	clef: string;
	puzzle: Puzzle;
	alarme: Alarme;

	constructor(key:string = ""){
		this.isOpen = false;
		this.clef = key;
	}

	addPuzzle(puzzle:Puzzle):void{
		this.puzzle = puzzle;
	}

	setAlarme(alarme:Alarme):void{
		this.alarme = alarme;
	}

	pass():boolean {
		if (!this.isOpen) {
			return this.isOpen;
		}
		switch(this.isOpen){
			case false:
				return this.isOpen;//false
				break;
			case true:
				if (this.puzzle === undefined || this.puzzle.isSolved) {
					if (this.alarme === undefined || !this.alarme.isActive) {
						return this.isOpen;//true
					}
				} 
				return false;

		}


		
	}

	openDoor():void {
		this.isOpen = true;
	}

	
}