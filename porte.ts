import { Puzzle } from "./puzzle";
import { Alarme } from "./alarme";

export class Porte{
	isOpen: boolean;
	isUnlock: boolean;
	clef: string;
	puzzle: Puzzle;
	alarme: Alarme;

	constructor(key:string = ""){
		this.isOpen = false;
		this.isUnlock = true;
		this.clef = key;
	}

	addPuzzle(puzzle:Puzzle):void{
		this.puzzle = puzzle;
		this.lockDoor();
	}
	resolvePuzzle(res:number):boolean{
		if(this.puzzle.resolve(res)){
			this.unlockDoor();
			return true;
		} 
		if(!this.puzzle.tryStat) {
			this.setAlarmeOn();
		}
		return false;
	}

	setAlarme(alarme:Alarme):void{
		this.alarme = alarme;
	}

	pass():boolean {
		switch(this.isOpen){
			case false:
				return this.isOpen;//false
			case true:
				if (this.puzzle === undefined || this.puzzle.isSolved) {
					if (this.alarme === undefined || !this.alarme.isActive) {
						return this.isOpen;//true
					}
				} 
				return false;
		}		
	}

	openDoor():boolean {
		if(this.isUnlock){
			this.isOpen = true;
			return true;
		}
		return false;
	}

	unlockDoor():void {
		this.isUnlock = true;
	}

	lockDoor():void {
		this.isUnlock = false;
	}

	setAlarmeOn():void {
		this.alarme.setOn();
		this.lockDoor();
	}

	setAlarmeOff():void {
		this.alarme.setOff();
		this.unlockDoor();
	}

	
}