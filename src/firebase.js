import { initializeApp } from 'firebase';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyBC-cal4iOEv2S-YNal4mniBJ6fbReqkno",
  authDomain: "surf-ipsum.firebaseapp.com",
  databaseURL: "https://surf-ipsum.firebaseio.com",
  projectId: "surf-ipsum"
});

export const db = firebaseApp.database();
export const wordsRef = db.ref('surf-strings');
