import firebase from "firebase";
var firebaseConfig = {
  apiKey: "AIzaSyB-pVW5bj6utAqjJZkT3ZHhHyYHCkbpdOM",
  authDomain: "financial-portfolio-d69ac.firebaseapp.com",
  databaseURL: "https://financial-portfolio-d69ac.firebaseio.com",
  projectId: "financial-portfolio-d69ac",
  storageBucket: "financial-portfolio-d69ac.appspot.com",
  messagingSenderId: "1035459282656",
  appId: "1:1035459282656:web:052f4a82a9e88502ce7285",
};

var fire = firebase.initializeApp(firebaseConfig);

export default fire;