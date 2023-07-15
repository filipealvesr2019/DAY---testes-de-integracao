const { idValidation } = require("./validation");

describe('testes da função idValidation', () => {
    it('argumento id valido (number)', () => {
        const fnIdValidation = () => idValidation(1);
        expect(fnIdValidation).not.toThrow();
    });

    it('argumento id valido (undefined)', () => {
        const fnIdValidation = () => idValidation(undefined);
        expect(fnIdValidation).not.toThrow();
    });

    it('argumento id inválido (string)', () => {
        const fnIdValidation = () => idValidation("oi");
        expect(fnIdValidation).toThrow('Input Invalid');
    });

});