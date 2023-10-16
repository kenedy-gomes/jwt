const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const {eAdmin} = require('./auth/requireAuth'); 


app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//Configuração dos arquivos estáticos 
app.use('/assets', express.static(__dirname + '/public/assets'));
 

// Chave secreta para JWT 
const secretKey = '1234567890';
 

// Configuração do ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
 

// configuração das rotas de renderização
app.get('/', (req, res) => {
  const token = req.query.token;
  res.render('../views/users/login', {token});
});

app.get('/register', (req, res) => {
  res.render('../views/users/register'); 
});

app.get('/crud', eAdmin, (req, res) => {
  res.render('../views/users/crud');  
  res.json({ userId: req.userId, message: 'Acesso permitido à rota protegida' });
});
 


// Porta que a aplicação subirá
const port = 3000;
 

// Inicia a aplicação
app.listen(port, () => {
  console.log(`Servidor do Frontend rodando na porta ${port}`);
});
 
