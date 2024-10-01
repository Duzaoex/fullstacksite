import { Router, Request, Response } from 'express';
import Patient from '../models/Patient'; // Ajuste o caminho conforme necessário

const router = Router();

// Criar um novo paciente
router.post('/patients', async (req, res) => {
    const { name, birthDate, notes } = req.body;

    if (!name || !birthDate) {
        return res.status(400).json({ message: 'Nome e data de nascimento são obrigatórios' });
    }

    try {
        const patient = await Patient.create({ name, birthDate, notes });
        return res.status(201).json(patient);
    } catch (error) {
        console.error('Erro ao criar paciente:', error);
        return res.status(500).json({ message: 'Erro ao criar paciente' });
    }
});

// Listar todos os pacientes
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.findAll();
        return res.json(patients);
    } catch (error) {
        console.error('Erro ao listar pacientes:', error);
        return res.status(500).json({ message: 'Erro ao listar pacientes' });
    }
});

// Atualizar paciente
router.put('/patients/:id', async (req, res) => {
    const { id } = req.params;
    const { name, birthDate, notes } = req.body;

    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        await patient.update({ name, birthDate, notes });
        return res.json(patient);
    } catch (error) {
        console.error('Erro ao atualizar paciente:', error);
        return res.status(500).json({ message: 'Erro ao atualizar paciente' });
    }
});

// Deletar paciente
router.delete('/patients/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const patient = await Patient.findByPk(id);
        if (!patient) {
            return res.status(404).json({ message: 'Paciente não encontrado' });
        }

        await patient.destroy();
        return res.json({ message: 'Paciente deletado com sucesso' });
    } catch (error) {
        console.error('Erro ao deletar paciente:', error);
        return res.status(500).json({ message: 'Erro ao deletar paciente' });
    }
});

export default router;
