# Dependências

- nodeJS (versão 18 LTS ou maior)
- npm (ou outro gerenciador de pacotes node como yarn ou pnpm)
- git

## Passos para rodar a aplicação

Fazer um fork e/ou clonar esse repositório

Acessar o diretório onde o projeto foi clonado

Duplicar o arquivo `.env.example`, que se encontra na raiz do projeto e renomear para `.env`

Para enfim rodar a aplicação podem ser utilizados os seguintes comandos:

### Com docker:

- `docker build -t desafio-tisaude .`

- `docker run -p 3000:3000 desafio-tisaude`

### Com node:

- `npm install`

- `npm run dev`
