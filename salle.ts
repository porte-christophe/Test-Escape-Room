export class Salle{
	items:array;

	constructor(){
		this.items = ["chest", "torch"];
	}
	removeFromRoomItems(itemName:string):void{
		this.items.forEach((item, index)=>{
			if (itemName === item) {
				this.items.splice(index , 1);
			}
		})
	}
}