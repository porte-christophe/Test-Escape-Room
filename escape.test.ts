import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Joueur } from "./joueur";
import { Salle } from "./salle";
import { Puzzle } from "./puzzle";


describe("Porte", () =>{
	it("Une porte fermée ne peut pas être franchie.", () =>{
		const porte = new Porte();
		expect(porte.pass()).toBeFalsy();
	});
	it("Une porte ouverte peut être franchie.", () =>{
		const porte = new Porte();
		porte.openDoor();

		expect(porte.pass()).toBeTruthy();
	});
	it("Chaque porte peut nécessiter une clé particulière", () =>{
		const porteRouge = new Porte("key-red");
		expect(porteRouge.clef).toBe("key-red");
	});
});

describe("Joueur", () =>{
	it("Le joueur peut ouvrir la porte s'il possède la clé correspondante", () =>{
		const porteRouge = new Porte("key-red");
		const j1 = new Joueur();
		j1.addToInventory("key-red");


		expect(j1.openDoor(porteRouge)).toBeTruthy();
		expect(porteRouge.isOpen).toBeTruthy();

	});
	it("Le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () =>{
		const porteRouge = new Porte("key-red");
		const j1 = new Joueur();

		expect(j1.openDoor(porteRouge)).toBeFalsy();
		expect(porteRouge.isOpen).toBeFalsy();

	});
	it("Lorsqu'une clé est utilisée pour ouvrir une porte, elle est retirée de l'inventaire du joueur.", () =>{
		const porteRouge = new Porte("key-red");
		const j1 = new Joueur();

		j1.addToInventory("key-red");
		j1.addToInventory("key-blue");
		j1.openDoor(porteRouge);
		expect(j1.inventory).toStrictEqual(["key-blue"]);
	});
	it("Un joueur ne peut utiliser qu'un objet qu'il possède dans son inventaire.", () =>{
		const j1 = new Joueur();

		j1.addToInventory("key-red");
		expect(j1.useItem("key-red")).toBeTruthy();
		expect(j1.useItem("key-blue")).toBeFalsy();

	})
});

describe("Salle", () =>{
	it("Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle", () =>{
		const salle = new Salle();
		const j1 = new Joueur();
		j1.takeItem(salle, "torch");


		expect(j1.inventory).toStrictEqual(["torch"]);
		expect(salle.items).toStrictEqual(["chest"]);
	});
	it("Un objet déjà ramassé ne peut pas être ramassé une seconde fois.", () =>{
		const salle = new Salle();
		const j1 = new Joueur();
		j1.takeItem(salle, "torch");

		expect(j1.takeItem(salle, "torch")).toBeFalsy();
		expect(j1.inventory).toStrictEqual(["torch"]);
		expect(salle.items).toStrictEqual(["chest"]);
	});
	it("Un joueur ne peut utiliser qu'un objet qu'il possède dans son inventaire.", () =>{
		const j1 = new Joueur();

		j1.addToInventory("key-red");
		expect(j1.useItem("key-red")).toBeTruthy();
		expect(j1.useItem("key-blue")).toBeFalsy();

	})
});

describe("Enigme", () =>{
	it("Une porte peut être associée à une énigme.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		porte.addPuzzle(puzzle);

		expect(porte.puzzle).toBeDefined();
	});
	it("Pour franchir la porte, l’énigme doit avoir été résolue.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		porte.openDoor();
		porte.addPuzzle(puzzle);
		puzzle.resolve(8);

		expect(porte.puzzle.isSolved).toBeTruthy();
		expect(porte.pass()).toBeTruthy();
	});
	it("Le joueur doit fournir la bonne réponse pour résoudre l’énigme.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const j1 = new Joueur();
		porte.openDoor();
		porte.addPuzzle(puzzle);

		expect(j1.resolve(porte.puzzle, 8)).toBeTruthy();
	});
	it("Une mauvaise réponse ne permet pas de résoudre l’énigme.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const j1 = new Joueur();
		porte.openDoor();
		porte.addPuzzle(puzzle);

		expect(j1.resolve(porte.puzzle, 7)).toBeFalsy();
		expect(porte.pass()).toBeFalsy();
	});
	it("Une fois résolue, l’énigme reste résolue.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const j1 = new Joueur();
		porte.openDoor();
		porte.addPuzzle(puzzle);

		expect(j1.resolve(porte.puzzle, 8)).toBeTruthy();
		expect(porte.puzzle.isSolved).toBeTruthy();
	});
	it("Chaque mauvaise réponse augmente le nombre de tentatives échouées.", () =>{
		const puzzle = new Puzzle(8);

		puzzle.resolve(1);
		
		expect(puzzle.failedTry).toBe(1);
	});
	it("Après 3 mauvaises réponses, une conséquence doit être déclenchée.", () =>{
		const puzzle = new Puzzle(8);

		puzzle.resolve(1);
		puzzle.resolve(1);
		expect(puzzle.tryStat).toBeTruthy();
		puzzle.resolve(1);

		expect(puzzle.tryStat).toBeFalsy();

	});
	it("Une bonne réponse permet toujours de résoudre l’énigme.", () =>{
		const puzzle = new Puzzle(8);

		puzzle.resolve(8);
		expect(puzzle.isSolved).toBeTruthy();
	});
	it("Une énigme déjà résolue ne peut pas être résolue une seconde fois.", () =>{
		const puzzle = new Puzzle(8);

		expect(puzzle.resolve(8)).toBeTruthy();
		expect(puzzle.isSolved).toBeTruthy();
		expect(puzzle.resolve(8)).toBeFalsy();
	});



	//	expect(porte.puzzle(7)).toStrictEqual({isSolved:false, error:"plus de trois essai"})
	// it("Résolution unique", () =>{
	// 	const porte = new Porte();
	// 	porte.openDoor();
		
		
	// 	expect(porte.puzzle(2)).toStrictEqual({isSolved:true, error:""});
	// 	expect(porte.puzzle(2)).toStrictEqual({isSolved:true, error:"Déjà résolue"});
	// 	expect(porte.pass()).toBeTruthy();


	// });
})