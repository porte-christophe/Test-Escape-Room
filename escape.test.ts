import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Joueur } from "./joueur";
import { Salle } from "./salle";
import { Puzzle } from "./puzzle";
import { Alarme } from "./alarme";


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
		const salle = new Salle(["torch","chest"]);
		const j1 = new Joueur();
		j1.takeItem(salle,"torch");


		expect(j1.inventory).toStrictEqual(["torch"]);
		expect(salle.items).toStrictEqual(["chest"]);
	});
	it("Un objet déjà ramassé ne peut pas être ramassé une seconde fois.", () =>{
		const salle = new Salle(["chest","torch"]);
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
		const j1 = new Joueur();
		porte.addPuzzle(puzzle);

		j1.resolve(porte, 8);
		j1.openDoor(porte);//le joueur ouvre la porte qui est deverouiller

		expect(porte.puzzle.isSolved).toBeTruthy();
		expect(porte.pass()).toBeTruthy();
	});
	it("Le joueur doit fournir la bonne réponse pour résoudre l’énigme.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const j1 = new Joueur();
		porte.addPuzzle(puzzle);

		expect(j1.resolve(porte, 8)).toBeTruthy();
	});
	it("Une mauvaise réponse ne permet pas de résoudre l’énigme.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const j1 = new Joueur();
		porte.addPuzzle(puzzle);

		expect(j1.resolve(porte, 7)).toBeFalsy();
	});
	it("Une fois résolue, l’énigme reste résolue.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const j1 = new Joueur();
		porte.addPuzzle(puzzle);

		expect(j1.resolve(porte, 8)).toBeTruthy();
		expect(porte.puzzle.isSolved).toBeTruthy();
	});
	it("Chaque mauvaise réponse augmente le nombre de tentatives échouées.", () =>{
		const puzzle = new Puzzle(8);

		puzzle.resolve(1);
		
		expect(puzzle.failedTry).toBe(1);
	});
	it("Après 3 mauvaises réponses, une conséquence doit être déclenchée.", () =>{
		const puzzle = new Puzzle(8);
		const porte = new Porte();
		const alert = new Alarme();

		porte.addPuzzle(puzzle);
		porte.setAlarme(alert);

		porte.resolvePuzzle(1);
		porte.resolvePuzzle(1);
		expect(puzzle.tryStat).toBeTruthy();
		porte.resolvePuzzle(1);


		expect(puzzle.tryStat).toBeFalsy();
		expect(porte.alarme.isActive).toBeTruthy();

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
});

describe("Alarme", () =>{
	it("L’alarme peut être inactive.", () =>{
		const alert = new Alarme();

		expect(alert.isActive).toBeFalsy();
	});
	it("Une action permet d’activer l’alarme.", () =>{
		const alert = new Alarme();

		alert.setOn();

		expect(alert.isActive).toBeTruthy();
	});
	it("Une fois activée, l’alarme reste active jusqu’à sa désactivation.", () =>{
		const alert = new Alarme();

		alert.setOn();

		expect(alert.isActive).toBeTruthy();
		expect(alert.isActive).toBeTruthy();
		alert.setOff();
		expect(alert.isActive).toBeFalsy();

	});
	it("Certaines portes ne peuvent pas être franchies lorsque l’alarme est active.", () =>{
		const alert = new Alarme();
		const porte = new Porte();
		porte.openDoor();
		
		porte.setAlarme(alert);
		alert.setOn();

		expect(porte.alarme.isActive).toBeTruthy();
		expect(porte.pass()).toBeFalsy();
	});
	it("Un joueur peut desactiver une alarme avec un code adapter et le code et retiré de l'inventaire.", () =>{
		const alert = new Alarme();
		const j1 = new Joueur();
		const porte = new Porte();
		j1.addToInventory("alarm-code");//code de l'alarme par default

		porte.setAlarme(alert);
		porte.setAlarmeOn();
		j1.alarmeOff(porte);

		expect(j1.inventory).toStrictEqual([]);
		expect(alert.isActive).toBeFalsy();
	});
	it("Un mauvais code ne désactive pas l’alarme.", () =>{
		const alert = new Alarme();
		const j1 = new Joueur();
		const porte = new Porte();
		j1.addToInventory("alarme-code");//code erronné

		porte.setAlarme(alert);
		porte.setAlarmeOn();
		j1.alarmeOff(porte);

		expect(j1.inventory).toStrictEqual(["alarme-code"]);
		expect(alert.isActive).toBeTruthy();
	});
	it("Une fois l’alarme désactivée, les portes bloquées par l’alarme peuvent à nouveau être franchies.", () =>{
		const alert = new Alarme();
		const porte = new Porte();
		const j1 = new Joueur();
		j1.addToInventory("alarm-code");//code de l'alarme par default

		porte.setAlarme(alert);
		porte.setAlarmeOn();

		j1.openDoor(porte);
		expect(porte.pass()).toBeFalsy();


		j1.alarmeOff(porte);
		j1.openDoor(porte);

		expect(porte.pass()).toBeTruthy();
	});
});

describe("Porte du labo", () =>{
	it("aucune condition remplie", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();


		expect(porteLab.isOpen).toBeFalsy();
		expect(porteLab.puzzle.isSolved).toBeFalsy();
		expect(porteLab.alarme.isActive).toBeTruthy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car aucune condition remplie

		
	});
	it("uniquement la clé", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.addToInventory("cle-labo");
		j1.openDoor(porteLab);//"ouverte" mais non franchie


		expect(porteLab.isOpen).toBeFalsy();
		expect(porteLab.puzzle.isSolved).toBeFalsy();
		expect(porteLab.alarme.isActive).toBeTruthy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car alarme active et puzzle non resolus
	});
	it("uniquement l’énigme", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.resolve(porteLab, 7);

		expect(porteLab.isOpen).toBeFalsy();
		expect(porteLab.puzzle.isSolved).toBeTruthy();
		expect(porteLab.alarme.isActive).toBeTruthy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car alarme active et serrure non déverrouiller
	});
	it("uniquement l’alarme désactivée", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.addToInventory("alarm-code");

		j1.alarmeOff(porteLab);

		expect(porteLab.isOpen).toBeFalsy();
		expect(porteLab.puzzle.isSolved).toBeFalsy();
		expect(porteLab.alarme.isActive).toBeFalsy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car puzzle non resolus et serrure non déverrouiller
		
	});
	it("clé + énigme ", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.addToInventory("cle-labo");
		j1.openDoor(porteLab);//ouverture ko car alarme on
		j1.resolve(porteLab, 7);

		expect(porteLab.isOpen).toBeFalsy();
		expect(porteLab.puzzle.isSolved).toBeTruthy();
		expect(porteLab.alarme.isActive).toBeTruthy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car alarme active 
		
	});
	it("clé + alarme désactivée", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.addToInventory("cle-labo");
		j1.addToInventory("alarm-code");
		j1.alarmeOff(porteLab);
		j1.openDoor(porteLab);//"ouverte" mais non franchie

		expect(porteLab.isOpen).toBeTruthy();
		expect(porteLab.puzzle.isSolved).toBeFalsy();
		expect(porteLab.alarme.isActive).toBeFalsy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car puzzle non resolus 
		
	});
	it("énigme + alarme désactivée", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.addToInventory("alarm-code");
		j1.openDoor(porteLab);
		j1.alarmeOff(porteLab);
		j1.resolve(porteLab, 7);

		expect(porteLab.isOpen).toBeFalsy();
		expect(porteLab.puzzle.isSolved).toBeTruthy();
		expect(porteLab.alarme.isActive).toBeFalsy();

		expect(porteLab.pass()).toBeFalsy();//franchissement impossible car pas la clé
		
	});
	it("les trois conditions réunies", () =>{
		const porteLab = new Porte("cle-labo");
		const puzzleLab = new Puzzle(7);
		const alarmeLab = new Alarme();//code par default "alarm-code"

		porteLab.addPuzzle(puzzleLab);
		porteLab.setAlarme(alarmeLab);
		porteLab.setAlarmeOn();

		const j1 = new Joueur();
		j1.addToInventory("cle-labo");
		j1.addToInventory("alarm-code");
		j1.alarmeOff(porteLab);
		j1.resolve(porteLab, 7);
		j1.openDoor(porteLab);//"ouverte" mais non franchie

		expect(porteLab.isOpen).toBeTruthy();
		expect(porteLab.puzzle.isSolved).toBeTruthy();
		expect(porteLab.alarme.isActive).toBeFalsy();

		expect(porteLab.pass()).toBeTruthy();
	});
})