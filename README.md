# RITD eduCash
Consists of a react native app with help from expo, Firebase authentication and possibly Cloud Functions.

WARNING!!: I have cloned this project from Tama-AI therefore I'm still using the Tama-AI firebase configuration. so add or remove users but don't edit any settings inside the backend folder/online firebase

At this moment we are rushing to get as many screens mocked as possible so the main focus is creating code instead cleaning them from the original project ( Tama-AI )

## Run locally
Get `.env` variables from your favourite dev. Only needed in frontend folder


**Firebase emulators**
```bash
cd backend/functions/
npm install
npm run serve
```

**React native**
```bash
cd frontend
npm install
npm run web ( to test the app on browser )
npm run android ( to test the app on your android device )
```
