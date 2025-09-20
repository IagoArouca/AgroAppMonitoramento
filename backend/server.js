const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./src/database');
const authRoutes = require('./src/routes/auth');



dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(error => {
    console.error('Não foi possível conectar ao banco de dados:', error);
});