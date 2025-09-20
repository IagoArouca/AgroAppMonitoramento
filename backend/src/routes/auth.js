const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if(existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        const newUser = await User.create({ username, email, password });

        const token = jwt.sign({ id: newUser.id}, process.env.JWT_SECRET, { expiresIn: '1h' } );

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao registrar usuário.', details: error.message });
    }
});

router.post('login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if(!user) {
            return res.status(400).json({ error: 'Credenciais inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json( { error: 'Credenciais inválidas.' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT,SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login.', details: error.message });
    }
});

module.exports = router;

