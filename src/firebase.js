import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCJz-orxsOcD4-VwxNqTOYPxtNx2bJlpp8",
  authDomain: "keep-student-edition.firebaseapp.com",
  databaseURL: "https://keep-student-edition.firebaseio.com",
  projectId: "keep-student-edition",
  storageBucket: "keep-student-edition.appspot.com",
  messagingSenderId: "1013522227448"
};

firebase.initializeApp(config);

export default firebase;
export const db = firebase.database();
export const auth = firebase.auth();
