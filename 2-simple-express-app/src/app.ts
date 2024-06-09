import express, { Request, Response } from 'express';
import { z } from 'zod';

export const app = express();

app.use(express.json());


const schema = z.object({
    a: z.number(),
    b: z.number()
})

app.post("/sum", (req: Request, res: Response) => {

    const parsedReq = schema.safeParse(req.body);

    if (!parsedReq.success) {
        return res.status(411).json({
            message: 'Incorrect inputs!'
        });
    }
    return res.json({
        answer: parsedReq.data.a + parsedReq.data.b
    });
});



app.get("/sum", (req: Request, res: Response) => {

    const parsedReq = schema.safeParse({
        a: Number(req.headers['a']),
        b: Number(req.headers['b'])
    });

    if (!parsedReq.success) {
        return res.status(411).json({
            message: 'Incorrect inputs!'
        });
    }

    return res.json({
        answer: parsedReq.data.a + parsedReq.data.b
    });
})