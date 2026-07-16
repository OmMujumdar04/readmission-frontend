# Hospital Readmission Risk Predictor — Frontend

A web interface for predicting a diabetic patient's risk of hospital readmission within 30 days. Built with [v0](https://v0.dev) and deployed on Vercel.

**Live app:** https://readmission-frontend-khaki.vercel.app/
**Backend API repo:** [readmission-backend](../readmission-backend) *(link to your backend repo here)*

## Overview

This is the client-side application for the Hospital Readmission Risk Predictor. It provides a form where a clinician or user can enter patient details (lab procedures, medications, admission history, diagnosis categories, etc.), sends that data to the ML-powered FastAPI backend, and displays the predicted readmission risk (HIGH/LOW) along with the model's probability score.

## Features

- Patient data entry form covering all model inputs (numerical clinical stats + encoded categorical fields such as gender, A1C test result, diagnosis groupings, admission type/source, discharge disposition)
- Calls the backend `/predict` endpoint and renders the returned risk level and probability
- Responsive UI generated and refined with v0
- Deployed on Vercel for instant, zero-config hosting

## Tech Stack

- **Next.js / React** (v0-generated)
- **Tailwind CSS** for styling
- **Vercel** for deployment
- Communicates with a **FastAPI** backend for predictions (see backend repo)

## Getting Started

### Prerequisites
- Node.js 18+
- npm / pnpm / yarn

### Installation

```bash
git clone <this-repo-url>
cd readmission-frontend
npm install
```

### Environment Variables

Create a `.env.local` file with the URL of your backend API:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Point this to your deployed backend URL in production.

### Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production

```bash
npm run build
npm start
```

## How It Works

1. User fills out the patient data form (lab procedures, medications, time in hospital, age, diagnosis categories, admission/discharge details, etc.)
2. On submit, the form data is sent as a JSON payload to the backend's `POST /predict` endpoint
3. The backend returns a risk label (`HIGH`/`LOW`), a probability score, and a message
4. The UI displays the result to the user

## Deployment

This app is deployed on **Vercel**. Any push to the main branch triggers an automatic redeploy. To deploy your own copy:

1. Push this repo to GitHub
2. Import the project into [Vercel](https://vercel.com/new)
3. Set the `NEXT_PUBLIC_API_URL` environment variable to point at your backend
4. Deploy

## Related

- **Backend / ML pipeline:** contains the data cleaning, feature engineering, model training notebook, and the FastAPI service this frontend talks to.
- **Dataset:** [Diabetes 130-US hospitals for years 1999–2008](https://archive.ics.uci.edu/dataset/296/diabetes+130-us+hospitals+for+years+1999-2008), UCI Machine Learning Repository
