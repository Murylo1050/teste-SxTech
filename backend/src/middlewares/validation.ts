import { body } from 'express-validator';
import db from './../db'; // Assuma que `db` é uma instância configurada do Knex

// Validação do formulário de registro
export const validateRegistration = [
    body('username')
        .notEmpty()
        .withMessage('O campo usuário é obrigatório')
        .custom(async (username: string) => {
            // Validação de unicidade do email
            const user = await db('users').where({ username }).first();
            if (user) {
                throw new Error('Este nome de usuário já está em uso.');
            }
        }),
    body('password')
        .isLength({ min: 3 })
        .withMessage('A senha deve ter pelo menos 6 caracteres')
        .notEmpty()
        .withMessage('O campo senha é obrigatório'),


];


export const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('O campo usuário é obrigatório'),
    body('password')
        .notEmpty()
        .withMessage('O campo senha é obrigatório'),


];


