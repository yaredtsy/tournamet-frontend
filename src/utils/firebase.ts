import { initializeApp, } from "firebase/app";
import { getAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const fbconfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASURMENT_Id,
};

const fbconfigsecondary = {
  apiKey: process.env.REACT_APP_API_KEY_SECONDARY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_SECONDARY,
  databaseURL: process.env.REACT_APP_DATABASE_URL_SECONDARY,
  projectId: process.env.REACT_APP_PROJECT_ID_SECONDARY,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_SECONDARY,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_SECONDARY,
  appId: process.env.REACT_APP_APP_ID_SECONDARY,
  measurementId: process.env.REACT_APP_MEASURMENT_Id_SECONDARY,
};
const app = initializeApp(fbconfig);
const secondaryApp = initializeApp(fbconfigsecondary,'secondary')

const auth = getAuth(app);

auth.setPersistence(browserLocalPersistence);
const db = getFirestore(secondaryApp);
auth.languageCode = "en";

export { auth, db };
export default app;
