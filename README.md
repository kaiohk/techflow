# TechFlow - Checkpoint 5

Dashboard desenvolvido para a disciplina FrontEnd Design, utilizando HTML, Tailwind CSS e JavaScript puro.

## Integrantes

- Leonardo Daniel dos Santos - RM571092
- Kaio Hiroki Kinoshita - RM569127
- Matheus Dionisio Cintra - RM569844

## Link do GitHub

[Link do GitHub](https://github.com/kaiohk/techflow)

## Tecnologias utilizadas

- HTML5
- Tailwind CSS v4
- JavaScript puro
- Vite
- Node.js e npm para executar o ambiente de desenvolvimento

## Como executar

Instale o Node.js 22.12 ou mais recente. Abra a pasta `techflow-dashboard` no VS Code e execute os comandos no terminal:

```sh
npm install
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

Assim como nos exemplos feitos em aula, o CSS utiliza `@import "tailwindcss"` e é processado pelo plugin `@tailwindcss/vite`. Por isso, a versão de desenvolvimento deve ser executada com o Vite, em vez de abrir o HTML diretamente ou usar apenas o Live Server.

Para gerar a versão final:

```sh
npm run build
npm run preview
```

O comando de build cria a pasta `dist`, com HTML, CSS e JavaScript preparados para publicação. O projeto não utiliza CDN, fontes externas ou imagens remotas. Depois de instalar as dependências, a página pode ser executada sem internet.

## Estrutura do projeto

```text
techflow-dashboard/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── README.md
├── package.json
├── package-lock.json
```

Os caminhos `css/styles.css` e `js/app.js` seguem o documento do checkpoint. Os arquivos de configuração do Vite e npm seguem o ambiente utilizado nas aulas. A pasta `node_modules` não acompanha a entrega; ela é criada pelo `npm install`.

## Principais recursos implementados

- Navbar com informações do usuário e dropdown.
- Sidebar fixa no mobile e visível no desktop.
- Abertura e fechamento do menu mobile, com sobreposição.
- Quatro indicadores: projetos ativos, concluídos, tarefas pendentes e equipes.
- Seis cards iniciais de projetos organizados com CSS Grid.
- Um card com `md:col-span-2` e `lg:row-span-2`, demonstrando tamanhos diferentes.
- Pesquisa por projeto, responsável ou categoria.
- Filtro de projetos em andamento ou concluídos.
- Modal de novo projeto com nome, responsável, categoria, prioridade, prazo e descrição.
- Validação visual com mensagens de erro e bordas vermelhas ou verdes.
- Nome e responsável com pelo menos 3 caracteres, descrição com pelo menos 10 e prazo a partir da data atual.
- Cadastro de novos cards na página, com atualização dos indicadores.
- Três botões de tema: Light, Dark e System, organizados como no exemplo de aula.
- Preferência de tema armazenada no `localStorage`, na chave `theme`.
- Modo System acompanhando a preferência do sistema.
- Layout Mobile-First com `sm:`, `md:`, `lg:`, `xl:` e `2xl:`.
- Flexbox, Grid, estados `hover:`, `focus:`, `active:`, `disabled:`, `group-hover:` e transições.
- Navegação por teclado, fechamento por Escape e mensagens associadas aos campos do formulário.

Os projetos adicionados ficam apenas na página durante a sessão. Ao recarregar, os seis projetos demonstrativos são restaurados. Não há banco de dados ou backend. O `localStorage` é utilizado apenas para o tema.

O indicador de equipes conta as categorias distintas dos projetos: Design, Desenvolvimento, Marketing e Operações. As tarefas pendentes são dados demonstrativos dos cards; um novo projeto começa com zero tarefas.

## Organização do código

O HTML contém diretamente os indicadores e os seis cards. As classes Tailwind ficam nos próprios elementos, com comentários identificando as seções, seguindo os exemplos das aulas.

O JavaScript começa com o mapeamento dos elementos usando `document.getElementById`. Depois, as funções e eventos são separados por tema, sidebar, dropdown, pesquisa e formulário. Os nomes das variáveis e funções estão em português.

O CSS contém a importação do Tailwind, a variante `dark:`, as cores do `@theme` e pequenos ajustes para o modal e a validação.

## Dificuldades encontradas

- Adaptar a sidebar para celular e desktop. Foi utilizado o breakpoint `lg:` junto com JavaScript para controlar a abertura e o fechamento.
- Manter os cards organizados em telas diferentes. Os spans são aplicados somente a partir dos breakpoints maiores.
- Alternar entre tema manual e preferência do sistema. A classe `dark` é controlada pelo JavaScript e o sistema é acompanhado com `matchMedia`.
- Mostrar os erros do formulário sem recarregar a página. O envio é interrompido com `preventDefault`, e cada campo recebe sua mensagem de validação.
- Cadastrar projetos sem banco de dados. O novo card é criado copiando a estrutura de um card existente e preenchendo os dados com `textContent`.
