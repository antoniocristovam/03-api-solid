# App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível X ser cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado;
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de check-ins;
- [ ] Deve ser possível o usuário buscar academias próximas;
- [ ] Deve ser possível o usuário buscar uma academias pelo nome;
- [ ] Deve ser possível o usuário realizar check-in em uma academia;
- [ ] Deve ser possível validar o check-in de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia;
- [ ] O usuário não pode fazer check-in se não tiver perto (100m) da academia;
- [ ] O check-in só pode ser validate até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] Academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 item por página;
- [ ] O usuário deve ser identificado por JWT (JSON WEB TOKEN);