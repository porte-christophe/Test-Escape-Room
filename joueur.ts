import { Porte } from "./porte";
import { Salle } from "./salle";
import { Alarme } from "./alarme";

export class Joueur{
	inventory:array ;

	constructor(){
		this.inventory = [];
	}

	addToInventory(item:string):void{
		this.inventory.push(item);
	}

	removeFromInventory(id:number):void{
		this.inventory.splice(id , 1);
	}

	openDoor(porte:Porte):boolean{
		let idItemToRemove = -1;
		this.inventory.forEach((item, index)=>{
			if (item === porte.clef) {
				this.removeFromInventory(index);
				idItemToRemove = index;
			}

		})
		if (porte.clef === "" || idItemToRemove !== -1) {
			
			porte.openDoor();
			return true;
		}
		return false;		
	}

	takeItem(salle:Salle, item:string):boolean{
		if (this.inventory.includes(item) || !salle.items.includes(item)) {
			return false;
		}
		salle.removeFromRoomItems(item);
		this.addToInventory(item);
		return true;
	}

	useItem(item:string):boolean{
		if (!this.inventory.includes(item)) {
			return false;
		}
		return true;
	}

	resolve(porte:Porte, res:number):boolean {
		return porte.resolvePuzzle(res);
	}

	alarmeOff(porte:Porte):boolean {
		let idItemToRemove = -1;
		this.inventory.forEach((item, index)=>{
			if (item === porte.alarme.code) {
				idItemToRemove = index;
			}

		})
		if (idItemToRemove === -1) {
			return false;
		}
		porte.setAlarmeOff();
		this.removeFromInventory(idItemToRemove);
		return true
	}
}