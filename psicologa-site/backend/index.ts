import express from 'express';
import dotenv from 'dotenv';
import loginRouter from './routes/login'; // Importar o roteador de login
import patientRouter from './routes/patients'; // Importar o roteador de pacientes

dotenv.config(); // Carregar variáveis de ambiente

const app = express();

app.use(express.json()); // Para analisar JSON
app.use('/api', loginRouter); // Adicionar o roteador de login
app.use('/api', patientRouter); // Adicionar o roteador de pacientes

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
