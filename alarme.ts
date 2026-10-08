export class Alarme{
	isActive:boolean;

	constructor(){
		this.isActive = false;
	}

	setOn():void{
		this.isActive = true;
	}
}