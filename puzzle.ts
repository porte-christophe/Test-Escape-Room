export class Puzzle{
	isSolved:boolean;
	puzzleTry:number;
	result:number;

	constructor(num:number){
		this.isSolved = false;
		this.puzzleTry = 0;
		this.result = num;
	}

	resolve(res:number):boolean{
		if (this.result !== res) {
			return this.isSolved;
		}
		this.isSolved = true;
		return this.isSolved;
	}

	// puzzle(num:number):{isSolved:boolean, error:string} {
	// 	this.puzzleTry+=1;
	// 	let error = ""
	// 	if (num%2 !== 0) {
	// 		if (this.puzzleTry>=3) {
	// 			error = "plus de trois essai";
	// 		}
	// 		return {isSolved : this.isSolved , error : error};
	// 	}
	// 	if (!this.isSolved) {
	// 		this.isSolved = true;
	// 		error  = "";
	// 		return {isSolved : this.isSolved , error : error};
	// 	}
	// 	error = "Déjà résolue";
	// 	return {isSolved : this.isSolved , error : error};
	// }
}