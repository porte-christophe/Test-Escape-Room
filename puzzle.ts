export class Puzzle{
	isSolved:boolean;
	failedTry:number;
	result:number;
	tryStat:boolean;

	constructor(num:number){
		this.isSolved = false;
		this.failedTry = 0;
		this.result = num;
		this.tryStat = true;
	}

	resolve(res:number):boolean{
		if (this.result !== res) {
			this.failedTry +=1;
			if (this.failedTry>=3) {
				this.tryStat = false;
			}
			return this.isSolved;
		}
		if (!this.isSolved) {
			this.isSolved = true;
			return this.isSolved;
		}
		return false;
	}
}