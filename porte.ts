export class Porte{
	isOpen: boolean;
	clef: string;

	constructor(key:string = ""){
		this.isOpen = false;
		this.clef = key;
	}

	pass():boolean {
		return this.isOpen;
	}

	openDoor():void {
		this.isOpen = true;
	}
}