import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const userRoutes = express.Router();

export const users = [];

///===========================================================

///Cadastro

userRoutes.post("/cadastro", async (req,res) => {
    const { name, email, password } = req.body;

    const emailExistente = users.find(user => user.email === email)

    if (emailExistente) {
        return res.status(404).json({
            message: "Este email ja existe"
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
    }

    users.push(newUser) 

    res.status(201).json({
        message: "Conta criada com sucesso",
        newUser
    })

});


///===========================================================

///Login 

userRoutes.post("/login", async (req,res) => {
    const { email, password } = req.body;

    const user = users.find (user => user.email === email)

    const passwordMatch = await bcrypt.compare(password, user.password)

    if(!user) {
        return res.status(404).json({
            message: "Este email não é cadastrado"
        })
    }

    if(!passwordMatch) {
        return res.status(400).json({
            message: "Senha invalida"
        })
    }

    res.status(200).json({
        message: "Login efetuado com sucesso",
        id: user.id
    })

});

///===========================================================

export {userRoutes};