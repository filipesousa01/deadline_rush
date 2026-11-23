# 🏁 Deadline Rush — a corrida da entrega

Jogo 2D em pixel art, didático e interativo, feito para a disciplina de **Engenharia de Software (UFMA)**.
Os devs correm para entregar o projeto antes da deadline. Quem atrasar começa a receber **avisos de demissão**,
e quem entrega antes escolhe entre **ajudar o colega** (pair programming) ou **pegar o bônus**.

Feito com HTML, CSS e JavaScript puro (Canvas 2D + Web Audio). Não tem dependências nem build.

## ▶️ Como rodar

Abra o `index.html` no navegador. É só isso.

Para publicar online, ative o **GitHub Pages** no repositório (Settings → Pages → branch `main`, pasta `/root`).

## 🎮 Como jogar

| Ação | Como |
|---|---|
| Programar / depurar bug | Aperte a sua tecla sem parar (**A**, **F**, **J** ou **L**) ou toque no seu botão |
| Responder revisão | Teclas **1–4** ou clique |
| Continuar | **Enter** |
| Pausar | **Esc** |

- Até **4 jogadores** no mesmo teclado. Os lugares vazios ficam com o computador (CPU).
- **Modo demonstração:** coloque todos os devs como CPU e a turma assiste à dinâmica sozinha.
- Prazo: Tranquilo (12 dias), Normal (10) ou Crunch (8). Cada dia dura 7 segundos.

## 📚 Conceitos de Engenharia de Software no jogo

| Mecânica | Conceito |
|---|---|
| 5 fases: Requisitos → Projeto → Implementação → Testes → Deploy | Ciclo de vida do software |
| Pergunta de revisão no fim de cada fase | Revisão / garantia de qualidade |
| Errar a revisão deixa o dev mais lento e com mais bugs | Débito técnico |
| Linha laranja de "ritmo ideal" | Burndown |
| Evento "o cliente mudou o requisito" | Scope creep |
| Ajudar o colega rende só 70% | Pair programming e Lei de Brooks |
| Avisos de demissão deixam o dev mais lento e com mais bugs | Crunch / pressão |
| Bônus individual × bônus de equipe | Incentivos individuais × resultado do time |

São 26 perguntas, com explicação depois de cada resposta. No fim da partida o jogo mostra um ranking e
o que aquela sprint ensinou, com base no que aconteceu na partida.

## 🧮 Pontuação

Entrega **+1000** · no prazo **+300** · revisão certa **+100** · cada 1% feito ajudando um colega **+20** ·
bônus **+200 por dia de folga** · aviso de demissão **−250** · time todo entregou **+400** (todos no prazo **+400**).

## 📁 Estrutura

```
deadline-rush/
├── index.html      # telas (setup, jogo, perguntas, resultado)
├── css/style.css   # estilos
└── js/game.js      # lógica, perguntas, sprites em pixel art e renderização
```

Para adicionar perguntas, edite o array `QUESTIONS` em `js/game.js`. Cada fase tem a sua lista, e a resposta
certa é sempre a primeira opção (o jogo embaralha na hora de mostrar).

## 👤 Autor

**Adrian Filipe** — [github.com/filipesousa01](https://github.com/filipesousa01)
