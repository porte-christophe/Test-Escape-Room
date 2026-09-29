import { Porte } from "./porte";

export class Joueur{
	clef:string;

	constructor(key:string = ""){
		this.clef = key;
	}

	openDoor(porte:Porte){
		if (this.clef !== porte.clef) {
			return false;
		}

		porte.openDoor();
		return true;
	}
}