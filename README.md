This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

## Docker Production Build

```bash
# Run
docker-compose -f docker-compose.production.yml --env-file .env.local up --build
```

Open http://localhost:3000 with your browser to see the result.
