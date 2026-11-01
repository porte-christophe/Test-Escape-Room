export class Salle{
	items:array = [];

	constructor(initItems:array){
		initItems.forEach((item) =>{
			this.items.push(item);
		})
	}
	removeFromRoomItems(itemName:string):boolean{
		this.items.forEach((item, index)=>{
			if (itemName === item) {
				this.items.splice(index , 1);
				return true;
			} else {
				return false;	
			}
			
		})
	}
}