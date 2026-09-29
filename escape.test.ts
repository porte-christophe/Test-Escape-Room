import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Joueur } from "./joueur";
import { Salle } from "./salle";


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
	it("chaque porte peut nécessiter une clé particulière", () =>{
		const porteRouge = new Porte("key-red");
		expect(porteRouge.clef).toBe("key-red");
	});

});

describe("Joueur", () =>{
	it("le joueur peut ouvrir la porte s'il possède la clé correspondante", () =>{
		const porteRouge = new Porte("key-red");
		const j1 = new Joueur();
		j1.addToInventory("key-red");


		expect(j1.openDoor(porteRouge)).toBeTruthy();
		expect(porteRouge.isOpen).toBeTruthy();

	});
	it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () =>{
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
});

describe("Salle", () =>{
	it("Lorsqu'un joueur ramasse un objet, celui-ci est ajouté à son inventaire et retiré de la salle", () =>{
		const salle = new Salle();
		const j1 = new Joueur();
		j1.takeItem(salle, "torch");


		expect(j1.inventory).toStrictEqual(["torch"]);
		expect(salle.items).toStrictEqual(["chest"]);
	});
});