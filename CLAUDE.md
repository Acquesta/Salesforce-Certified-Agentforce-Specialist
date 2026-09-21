# CLAUDE.md

Quiz de prática para a certificação **Salesforce Certified Agentforce Specialist** (Vite + React + TypeScript + Tailwind v4). Conteúdo do quiz em inglês.

## Fluxo de branches (obrigatório)

Branches:
- `main`: branch original, só recebe código já testado na `dev`.
- `dev`: branch de integração e testes.
- Branch de trabalho: uma por melhoria, sempre criada a partir da `dev`.

Passos para cada atualização:
1. Atualize a `dev`: `git switch dev && git pull origin dev`.
2. Crie a branch de trabalho a partir da `dev`, com prefixo por tipo: `feat/<nome>`, `fix/<nome>`, `docs/<nome>`, `chore/<nome>`.
3. Implemente a melhoria na branch de trabalho. Rode `npm run test` e `npm run build` antes de cada commit.
4. Faça merge da branch de trabalho na `dev` e envie a `dev` para o GitHub.
5. Teste na `dev`: rode `npm run test` e `npm run build`, e teste o app no browser com `npm run dev`.
6. Só depois de a `dev` estar testada, abra um Pull Request no GitHub de `dev` para `main`. O merge na `main` acontece pelo PR.

Regras:
- Nunca commite direto na `main`.
- Nunca faça merge local na `main` nem `git push` para a `main`. Use sempre um PR de `dev` para `main`.
- Nunca crie branch de trabalho a partir da `main`.
- Peça confirmação ao usuário antes de abrir o PR para a `main`.
- No corpo do PR, liste as mudanças e o resultado dos testes (`npm run test`, `npm run build`, teste no browser).
- Para abrir o PR, use `gh pr create --base main --head dev` se o GitHub CLI estiver instalado. Se não estiver, envie o link `https://github.com/Acquesta/Salesforce-Certified-Agentforce-Specialist/compare/main...dev` ao usuário.

Remote: `origin` = https://github.com/Acquesta/Salesforce-Certified-Agentforce-Specialist.git

## Comandos

```bash
npm run dev      # servidor de desenvolvimento (porta 5173; config em .claude/launch.json)
npm run test     # testes de lógica + validação do banco de questões
npm run build    # typecheck e build de produção
```

## Estrutura

- `src/data/questions/*.ts`: banco de questões por seção. Siga o tipo `Question` em `src/types/quiz.ts`.
- `src/data/sections.ts`: seções oficiais, pesos, nota de aprovação (72%), tempo da prova.
- `src/lib/`: sorteio ponderado, pontuação, `localStorage`.
- `src/hooks/quizReducer.ts`: estado do quiz.
- `src/components/`: telas Start, Quiz e Results.
- `docs/research.md`: pesquisa da prova (guia oficial Spring '26, fatos por seção, referências).

## Regras para questões

- Questões originais, no estilo da prova real. Nunca copie de dumps ou sites de prática.
- Toda alternativa precisa de `explanation`.
- Múltipla escolha: mais de um id em `correct`. Não escreva "Choose 2" no enunciado; a UI mostra isso.
- Não baseie resposta correta em fatos marcados como UNVERIFIED em `docs/research.md`.
- Perguntas e alternativas ficam sempre em inglês. Nunca traduza nem altere esse texto.
- Explicações têm versão em português em `src/data/questions/pt/<seção>.ts`. Ao criar ou mudar uma questão, atualize a tradução de todas as alternativas.
- `npm run test` valida o banco e as traduções.
