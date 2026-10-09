export class Alarme{
	isActive:boolean;
	code:string;

	constructor(){
		this.isActive = false;
		this.code = "alarm-code";
	}

	setOn():void{
		this.isActive = true;
	}
	setOff():void{
		this.isActive = false;
	}
}