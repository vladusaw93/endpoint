import { numberService } from '../../../src/services';

describe('NumberService', () => {

    it('should return G when number is divisible by 3', () => {
        const result = numberService.checkNumber(9); // 9 is divisible by 3
        expect(result).toBe('G');
    });

    it('should return N when number is divisible by 5', () => {
        const result = numberService.checkNumber(10); // 10 is divisible by 5
        expect(result).toBe('N');
    });

    it('should return GN when number is divisible by both 3 and 5', () => {
        const result = numberService.checkNumber(15); // 15 is divisible by both 3 and 5
        expect(result).toBe('GN');
    });

    it('should return the number itself when number is not divisible by 3 or 5', () => {
        const result = numberService.checkNumber(7); // 7 is not divisible by 3 or 5
        expect(result).toBe(7);
    });

    it('should handle negative numbers', () => {
        const result = numberService.checkNumber(-3); // -3 is divisible by 3
        expect(result).toBe('G');
    });

});
