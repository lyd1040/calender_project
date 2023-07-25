import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDCMdVGADWibXsn1R4r91WGnUjM5NeNLTg",
    authDomain: "calender-bfb18.firebaseapp.com",
    databaseURL: "https://calender-bfb18-default-rtdb.firebaseio.com",
    projectId: "calender-bfb18",
    storageBucket: "calender-bfb18.appspot.com",
    messagingSenderId: "853950304043",
    appId: "1:853950304043:web:2868771c3e54ed5d687f6e"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firestore 초기화
const db = getDatabase(app);

// Firebase Authentication 초기화
const auth = getAuth(app);

export { db, auth }; // db와 auth를 외부에서 사용할 수 있도록 내보내기
