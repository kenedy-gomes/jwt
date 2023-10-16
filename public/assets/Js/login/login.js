document.getElementById('login-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  
  try {
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    // Requisição para o servidor do login
    const response = await fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
       
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        window.location.href = '/crud'; // Redireciona após o login
      } else {
        alert('Erro ao fazer login: Token não recebido do servidor.');
      }
    } else {
      const errorData = await response.json();
      alert('Erro ao fazer login: ' + errorData.message);
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    alert('Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.');
  }
});