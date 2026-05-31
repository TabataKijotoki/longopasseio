# Longo Passeio

> *...o mundo além do seu quintal*

Guia curado de cafés no centro de São Paulo. 19 endereços em 6 bairros — o centro que nem todo mundo vê.

**curadoria por Tabata Kijotoki**

---

## O que é

Longo Passeio é um site responsivo de descoberta de cafés no centro histórico de São Paulo. A proposta é simples: um catálogo afetivo, sem pressa, de lugares que valem a pausa nos bairros de Santa Cecília, Vila Buarque, Higienópolis, República, Barra Funda e Campos Elíseos.

## Funcionalidades

- **Início** — hero com frase da marca, chips de bairro, roteiro em destaque e dica de ouro
- **Explorar** — grid filtrável por bairro, por tipo (trabalhar, encontro, leitura, especialidade) e por novidades; busca por nome
- **Roteiros** — 4 roteiros curados com timeline de paradas, horários e dica de percurso
- **Favoritos** — salva cafés localmente (localStorage), agrupados por bairro
- **Modal de café** — foto, vibe, horário, embed do Google Maps e link de navegação
- **Seletor de cidade** — São Paulo Centro ativo; Rio, BH, Curitiba e Porto Alegre em breve
- **Responsivo** — top nav no desktop, bottom tab bar no mobile (≤ 899px); modal como bottom sheet no mobile (≤ 560px)
- **Badges de atualização** — indica cafés mapeados ou atualizados nos últimos 15 dias

## Stack

Protótipo de página única, zero build step:

- **React 18** via CDN (UMD)
- **Babel Standalone** para transpilação de JSX no browser
- **CSS puro** com variáveis (design tokens)
- **Fontes:** DM Serif Display + DM Sans (Google Fonts)
- **Fotos:** Unsplash (URLs curadas por café)

## Estrutura

```
site/
├── index.html          # entrada da aplicação
├── site.css            # todos os estilos — tokens, layout, componentes, responsivo
├── app.jsx             # app React completo (Header, Home, Explorar, Roteiros, Favoritos, Modal)
├── icons-from-source.jsx   # SVGs inline: HomeIcon, MapIcon, RouteIcon, HeartIcon, SearchIcon
├── recently-updated.jsx    # lógica e componentes de badge de novidade
├── cafe-photos.js      # mapa de URLs de foto por ID de café
└── data/
    └── cafes.js        # 19 cafés + 4 roteiros (CAFES_DATA, ROTEIROS)
```

## Como rodar localmente

Qualquer servidor HTTP serve. Exemplos:

```bash
# Python 3
cd site && python3 -m http.server 8787

# Node (npx)
cd site && npx serve .

# PowerShell (.NET HttpListener — sem dependências)
powershell -File serve.ps1
```

Acesse **http://localhost:8787** no browser.

> Não abra `index.html` direto pelo sistema de arquivos (`file://`) — o Babel não consegue carregar os arquivos `.jsx` externos por restrições de CORS local.

## Bairros cobertos

| Bairro | Cor |
|---|---|
| Santa Cecília | sage `#c8d8b0` |
| Vila Buarque | blush `#f2c4c4` |
| Higienópolis | menta `#b8d4c8` |
| República | areia `#e8d8b0` |
| Barra Funda | verde `#b8d4b8` |
| Campos Elíseos | lavanda `#d0c4e8` |

## Design system

Os tokens de cor, tipografia, espaçamento, raios e sombras estão documentados em `site/site.css` (`:root`). A identidade visual completa — paleta, voz, iconografia, componentes — está descrita no `README.md` do design system original.

Fontes: **DM Serif Display** (títulos, citações de vibe, frases da marca) + **DM Sans** (tudo o mais). Sem terceira família.

---

*lugares pra ir sem pressa*
