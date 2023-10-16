 
const express = require('express');
const User = require('../models/user');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'S2J42SW7S7F9AD8128ASD12J3';

const app = express();
const port = 8080;

app.use(express.json());

// Configurações do CORS
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin']
}));

// Configurações do BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Conexão com o MongoDB
mongoose.connect('mongodb+srv://dbCrud:C9LbBecDr7ChaIKy@cluster0.zmvjqmo.mongodb.net/bancoAPI?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conectado ao MongoDB');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
  });

// Rota para listar todos os usuários
app.get("/", async (req, res) => {
  try {
    const user = await User.find();
    res.send(user);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
});

// Rota para cadastrar usuários
app.post("/user/cadastro", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Já existe um usuario com esse Email' });
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();

    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email
    };
    res.send(userResponse);
    console.log('Dados do usuário recebidos:', userResponse);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});


// Rota para atualizar usuários
app.put('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    res.status(500).json({ message: 'Erro ao atualizar o usuário' });
  }
});

// Rota para deletar usuários
app.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'ID de usuário inválido' });
    }
    const deletedUser = await User.findByIdAndRemove(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar o usuário:', error);
    res.status(500).json({ message: 'Erro ao deletar o usuário' });
  }
});

//AuthRequire 


// Rota para Login do usuário
app.post('/user/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ message: 'Esse email não existe em nosso banco de dados' });
    }

    // Verifica se a senha corresponde
   if(!(bcrypt.compare(password, user.password))){
      return res.status(400).json({ message: 'Email ou password incorreto' });
      }else{
        const token = jwt.sign({ userId: user._id }, secretKey);
        return res.status(200).json({ message: 'Login efetuado com sucesso',  token });
   }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}`);
});


 

 