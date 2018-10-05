# goomer-api
API criada para o desafio da Goomer

# Rotas
- /users POST - Registra um novo usuário. Parametros: name, email, password(6 a 24 digitos, no minimo uma letra maiuscula, uma miniscula, um caracter especial e um numero), cpf (11 caracteres), phone (10 ou 11 caracteres), address
- /users GET - Retorna a lista de usuários cadastrados no sistema
- /users/:user_id GET - Retorna o usuário de id especificado na url
- /users/:user_id PATCH - Altera os dados do usuário de id especificado na url. Parametros: name, phone, address
- /users/:user_id DELETE - Deleta o usuário de id especificado na url
- /groups POST - Registra um novo grupo. Parametros: name, description, users (lista com id de usuários previamente cadastrados no banco - minimo de 2)
- /groups GET - Retorna a lista de grupos cadastrados no sistema.
- /groups/:group_id GET - Retorna o grupo de id especificado na url
- /groups/:group_id PATCH - Altera os dados do grupo de id especificado na url. Parametros: name
- /groups/:group_id/user POST - Adiciona um novo usuário a um grupo. Parametros: user_id (id de um usuario previamente cadastrado no banco)
- /groups/:group_id/user/:user_id DELETE - Deleta um usuário de um grupo. Caso só existam dois usuários, deleta o grupo.
