export class Porte{
	isOpen: boolean;
	clef: string;
	isSolved: boolean;

	constructor(key:string = ""){
		this.isOpen = false;
		this.clef = key;
		this.isSolved = false;
	}

	pass():boolean {
		return this.isOpen && this.isSolved;
	}

	openDoor():void {
		this.isOpen = true;
	}

	puzzle(num:number):boolean {
		if (num%2 !== 0) {
			this.isSolved = false;
			return this.isSolved;
		}
		this.isSolved = true;
		return this.isSolved;
	}
}