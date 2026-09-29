export class Porte{
	isOpen: boolean;

	constructor(){
		this.isOpen = false;
	}

	pass():boolean {
		return this.isOpen;
	}
}