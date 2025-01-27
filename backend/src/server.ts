import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import db from './db';
import authMiddleware from './middlewares/auth';
import { validateLogin, validateRegistration } from './middlewares/validation'
import { validationResult } from 'express-validator';
import cors from 'cors';
import { only } from 'node:test';


dotenv.config();

const app = express()
const port = process.env.SERVER_PORT

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())

const countries = ['Brasil', 'México', 'Bolivia', 'Paraguai', 'Japão', 'Timor Leste', 'Azerbaijão', 'Bahrein', 'Canadá', 'Panamá'];
const streets = ['Alameda Dom Pedro', 'Beco Lima', 'Rua Rio Branco', 'Praça Lima', 'Alameda Silva', 'Rua Palmital', 'Travessa Rio Branco', 'Praça São João', 'Praça Rio Branco', 'Beco Silva'];
const avenues = ['São Sebastião', 'Alphaville', 'Centro', 'Paulista', 'Vila Rica', 'Alphaville', 'Vila Nova', 'Itaim', 'Paulista', 'Vila Nova'];
const tags = ['#IFL', '#URT', '#VTR', '#KZG', '#QAH', '#UJF', '#BQE', '#NUO', '#BEU', '#FRP'];



app.post('/register', validateRegistration, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() }).end();
    } else {

        await db('users').insert({
            username: username,
            hashedPassword: hashedPassword,
            email: `${username}@gmail.com`,
            country: countries[Math.floor(Math.random() * 10)],
            street: streets[Math.floor(Math.random() * 10)],
            avenue: avenues[Math.floor(Math.random() * 10)],
            tag: tags[Math.floor(Math.random() * 10)],
            number: Math.floor(Math.random() * 1000),
            age: Math.round(Math.random() * 100)
        });
        const teste = await db('users').select('*');
        res.status(201).send(teste);
    }

})

app.post('/login', validateLogin, async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await db('users').where({ username }).first();

    const result = validationResult(req);

    if (!result.isEmpty()) {
        res.status(400).json({ errors: result.array() }).end();
    } else {

        if (!user || !(await bcrypt.compare(password, user.hashedPassword))) {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        } else {
            const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
                expiresIn: '1h',
            });

            res.cookie('token', token, { httpOnly: false, secure: true, sameSite: 'strict' });
            res.json({ message: 'Login bem-sucedido!' });
        }

    }


})

app.get('/user/:username', authMiddleware, (req: Request, res: Response) => {
    db('users').select('id', 'username', 'email', 'country', 'age', 'tag', 'street', 'avenue', 'number').where({ username: req.params.username }).then((users) => {
        res.json(users)
    })


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
