# App

Find a Friend API - Adopt a pet

# RFs (Resitos funcionais)

- [ ] Deve ser possível cadastrar um pet
- [ ] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [ ] Deve ser possível filtrar pets por suas características
- [ ] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG
- [x] Deve ser possível recuperar os dados de uma organização logada

# RNs (Regras de negócio)

- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] Um pet deve ter no mínimo uma imagem
- [ ] Um pet pode ou não ter requisitos para adoção
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# RNFs (Requisitos não-funcionais)

- [ ] Deve ser utilizado a API de um terceiro para buscar a cidade e estado pelo CEP
- [ ] O banco de dados PostgreSQL deve ser usado para persistência dos dados
- [ ] As imagens enviadas por upload devem ficar armazenadas em um serviço externo (SupaBase)
- [ ] Todas as listas da aplicação devem ter no máximo 20 itens por página
- [ ] A organização deve ser identificada por um JWT (JSON Web Token)