import { describe, expect, it } from "vitest";


describe("Porte", () =>{
	it("Une porte fermée ne peut pas être franchie.", () =>{
		const porte = new Porte();

		expect(porte.pass()).toBeFalsy();
	});
});