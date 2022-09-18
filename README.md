This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

[![Deployment Pipeline](https://github.com/kevin-dev71/nextjs-weather-app/actions/workflows/pipeline.yml/badge.svg?branch=main)](https://github.com/kevin-dev71/nextjs-weather-app/actions/workflows/pipeline.yml)

## Getting Started

You need to be using:

- [Nodejs v16 or higher](https://nodejs.org/es/download/)
- [Git](https://git-scm.com/downloads)

Clone the repository & install dependencies:

```bash
git clone https://github.com/kevin-dev71/nextjs-weather-app.git

cd nextjs-weather-app

npm install
# or
yarn
```

Rename `.env.example` to `.env.local` and add `OPENWEATHER_API_KEY`

```bash
OPENWEATHER_API_BASE_URL=http://api.openweathermap.org
OPENWEATHER_API_KEY=
DEFAULT_CITY="santiago de chile"
```

if you dont have an Open weather API KEY, get one in this [link](https://home.openweathermap.org/api_keys)

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

```bash
# Run
npm run test
# or
yarn test
```

## Check Nextjs Bundlers with `@next/bundle-analyzer`

```bash
# Run
ANALYZE=true yarn build
```

## Docker Production Build

```bash
# Run
docker-compose -f docker-compose.production.yml --env-file .env.local up --build
# or
docker build -f Dockerfile.production -t nextjs-weather-app:latest .
&&
docker run -p 3000:3000 --env-file .env.local nextjs-weather-app
```

Open http://localhost:3000 with your browser to see the result.

## Design Inspiration

[dribble](https://dribbble.com/shots/7177589-Dashboard-Weather-App/attachments/178655?mode=media)

## Built With

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
