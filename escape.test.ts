import { describe, expect, it } from "vitest";
import { Porte } from "./porte";


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