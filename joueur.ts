import { Porte } from "./porte";
import { Salle } from "./salle";

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
				idItemToRemove = index;
			}

		})
		if (idItemToRemove === -1) {
			return false;
		}

		this.removeFromInventory(idItemToRemove);
		porte.openDoor();
		return true;
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

	resolve(puzzle:Puzzle, res:number):boolean {
		return puzzle.resolve(res);
	}
}