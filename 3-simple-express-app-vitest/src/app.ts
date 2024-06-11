import express, { Request, Response } from 'express';
import { z } from 'zod';
import { prismaClient } from './db';

export const app = express();

app.use(express.json());


const schema = z.object({
    a: z.number(),
    b: z.number()
})

app.post("/sum", async (req: Request, res: Response) => {

    const parsedReq = schema.safeParse(req.body);

    if (!parsedReq.success) {
        return res.status(411).json({
            message: 'Incorrect inputs!'
        });
    }

    const answer = parsedReq.data.a + parsedReq.data.b;

    await prismaClient.sum.create({
        data: {
            a: parsedReq.data.a,
            b: parsedReq.data.b,
            result: answer
        }
    });

    return res.json({
        answer
    });
});



app.get("/sum", async (req: Request, res: Response) => {

    const parsedReq = schema.safeParse({
        a: Number(req.headers['a']),
        b: Number(req.headers['b'])
    });

    if (!parsedReq.success) {
        return res.status(411).json({
            message: 'Incorrect inputs!'
        });
    }

    const answer = parsedReq.data.a + parsedReq.data.b;

    await prismaClient.sum.create({
        data: {
            a: parsedReq.data.a,
            b: parsedReq.data.b,
            result: answer
        }
    });

    return res.json({
        answer
    });
})