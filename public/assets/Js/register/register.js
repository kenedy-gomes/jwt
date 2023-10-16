// ...

// função para cadastrar
submitButton.addEventListener("click", async () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // validações
  if (!email || !password) { // Alterado para verificar se email ou senha estão vazios
    console.error("Email e senha são campos obrigatórios.");
    return;
  }
  // validações
  const userData = {
    name: name,
    email: email,
    password: password,
  };

  // requisição
  const response = await fetch("http://localhost:8080/user/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(userData),
  });
  // requisição

  // validação
  if (response.ok) {
    const user = await response.json();
    console.log("Usuário cadastrado:", user);
    successMessage.style.display = "block"; // Exibir a mensagem de sucesso

    // Limpar os campos após o registro
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("password").value = '';
  } else {
    console.error("Erro ao cadastrar o usuário.");
  }
});
