import { describe, expect, it } from "vitest";
import { Porte } from "./porte";
import { Joueur } from "./joueur";


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
		const j1 = new Joueur("key-red");

		expect(j1.openDoor(porteRouge)).toBeTruthy();
		expect(porteRouge.isOpen).toBeTruthy();

	});
	it("le joueur ne peut pas ouvrir la porte s'il ne possède pas la clé correspondante", () =>{
		const porteRouge = new Porte("key-red");
		const j1 = new Joueur();

		expect(j1.openDoor(porteRouge)).toBeFalsy();
		expect(porteRouge.isOpen).toBeFalsy();

	});
});