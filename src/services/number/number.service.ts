
/**
 * NumberService class responsible for the business logic related to number processing.
 */
class NumberService {
    checkNumber(num: number): string {
        return (num % 3 === 0 ? 'G' : '') + (num % 5 === 0 ? 'N' : '');
    }
}

export const numberService = new NumberService();
