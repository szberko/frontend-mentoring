var polishNotation = require("../polishnot.js");

describe('Test Polish Notation evauliation', () => {
    it("should calculate the expression", () => {
        expect(polishNotation.evalPolishNotation("+ 3 + 4 / 20 4")).toBe(12);
        expect(polishNotation.evalPolishNotation("- + * 5 4 * 8 5 10")).toBe(50);
        expect(polishNotation.evalPolishNotation("- * / 15 - 7 + 1 1 3 + 2 + 1 1")).toBe(5);
    });    
});