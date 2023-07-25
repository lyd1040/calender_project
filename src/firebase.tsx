import firebase from 'firebase/app';
import 'firebase/database'; // 필요한 모듈들을 import 합니다.

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
firebase.initializeApp(firebaseConfig);

// 데이터베이스 사용을 위한 변수 설정
const database = firebase.database();

export default database;
