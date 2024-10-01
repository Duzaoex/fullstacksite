import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const router = Router();

// Definição da interface LoginRequest
interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

router.post('/login', async (req: LoginRequest, res: Response): Promise<void> => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: 'Usuário e senha são obrigatórios' });
    return;
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(401).json({ message: 'Usuário não encontrado' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Senha incorreta' });
      return;
    }

    const secretKey = process.env.JWT_SECRET || 'SECRET_KEY';

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

export default router;
