import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../app';

//mock the prisma client
vi.mock('../db', () => ({
    prismaClient: { sum: { create: vi.fn() } }
}));

describe('POST /sum', () => {
    it('the sum of 1 and 2 should be 3', async () => {
        const res = await request(app).post('/sum').send({
            a: 1,
            b: 2
        });

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });


    it('should throw error on incorrect inputs', async () => {
        const res = await request(app).post('/sum').send({
            a: 1,
            b: 'djafldfjjl'
        });

        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe('Incorrect inputs!');
    });
});



describe('GET /sum', () => {
    it('the sum of 1 and 2 should be 3', async () => {
        const res = await request(app).get('/sum').set({
            a: "1",
            b: "2"
        }).send();

        expect(res.statusCode).toBe(200);
        expect(res.body.answer).toBe(3);
    });


    it('should throw error on incorrect inputs', async () => {
        const res = await request(app).get('/sum').set({
            a: "1",
            b: 'djafldfjjl'
        }).send();

        expect(res.statusCode).toBe(411);
        expect(res.body.message).toBe('Incorrect inputs!');
    });
});