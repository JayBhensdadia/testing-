import { describe, expect, it } from '@jest/globals';
import { multiply, sum } from '../index';


describe('sum module', () => {
    it('1+2 should be 3', () => {
        expect(sum(1, 2)).toBe(3);
    });

    it('1+3 should be 4', () => {
        expect(sum(1, 3)).toBe(4);
    })
});


describe('multiply module', () => {
    it('1*2 should be 2', () => {
        expect(multiply(1, 2)).toBe(2);
    })
})