# App

Find A Friend API - Adopt a pet

# RFs (Resitos funcionais)

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG
- [x] Deve ser possível recuperar os dados de uma organização

# RNs (Regras de negócio)

- [x] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] Um pet deve ter no mínimo uma imagem
- [x] Um pet pode ou não ter requisitos para adoção
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros, além da cidade, são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

# RNFs (Requisitos não-funcionais)

- [x] O banco de dados PostgreSQL deve ser usado para persistência dos dados
- [x] As imagens enviadas por upload devem ficar armazenadas em um serviço externo (SupaBase)
- [x] Todas as listas da aplicação devem ter no máximo 20 itens por página
- [x] A organização deve ser identificada por um JWT (JSON Web Token)