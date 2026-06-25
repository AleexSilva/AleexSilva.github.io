# Alex Silva — Personal Site

A professional portfolio website. **Enterprise-meets-edge** aesthetic: dark slate base, warm
amber accent, glassmorphism, and subtle motion. Built with Next.js 16 (App Router), TypeScript,
Tailwind CSS v4, and Framer Motion.

## Sections
- **Hero** — name, tagline, key stats, primary CTAs
- **About** — narrative bio + capability pillars
- **Career Journey** — animated vertical timeline (Confidential Client → Prudential → Paradigma → Deloitte)
- **Expertise** — skills, education, certifications, languages
- **Portfolio** — links to the live Streamlit portfolio and LinkedIn
- **Contact** — email + LinkedIn
- **Digital Twin** — a floating AI chat that answers questions about Alex's career in his voice

## Digital Twin (AI chat)

A floating "Ask my Digital Twin" button (bottom-right) opens a chat backed by
[OpenRouter](https://openrouter.ai). The server route [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts)
injects Alex's career data (from `content.ts`) as a system prompt and streams the reply.

- **Primary model:** `meta-llama/llama-3.3-70b-instruct:free` (as requested).
- **Fallbacks:** because OpenRouter's free models are frequently rate-limited *upstream*, the route
  automatically falls back through other free models (`openai/gpt-oss-120b:free`,
  `google/gemma-4-31b-it:free`, …) only when the primary returns 429 — so the Twin keeps answering.
  The model that actually responded is returned in the `X-Model` response header.
- **Config:** the key is read from `.env` (`OPENROUTER_API_KEY`). Override the primary model with
  `OPENROUTER_MODEL` if you ever want a different/paid model.

## Running locally

Node is installed via **nvm** in your home directory, so each new terminal must load nvm first:

```bash
# load nvm (only needed once per shell)
export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"

cd ~/Projects/site

npm run dev      # start dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

> Tip: add `export NVM_DIR="$HOME/.nvm" && . "$NVM_DIR/nvm.sh"` to your `~/.bashrc`
> so `node`/`npm` are always available.

## Editing content

All copy lives in one place — [`src/lib/content.ts`](src/lib/content.ts). Edit the profile,
experience, education, skills, certifications, and links there and every section updates.

## Theme

Colors, fonts, and surfaces are defined as tokens in [`src/app/globals.css`](src/app/globals.css)
(`--amber`, `--bg`, `--surface`, etc.) and exposed to Tailwind via `@theme`.
