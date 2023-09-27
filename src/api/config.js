import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9zRmAHiwxeomhIMpx1FOTkWzVx0Yqd0k",
  authDomain: "smart-shopping-list-es.firebaseapp.com",
  projectId: "smart-shopping-list-es",
  storageBucket: "smart-shopping-list-es.appspot.com",
  messagingSenderId: "153858313777",
  appId: "1:153858313777:web:32e33427b5de78e8994f10",
  measurementId: "G-5Q4K61VZ7Q"
};
// old firebaseConfig from TCL-57 team:
// const firebaseConfig = {
//   apiKey: "AIzaSyCp5Q7injiGTEKhPMBvq25n2CYzRegXPbQ",
//   authDomain: "tcl-57-smart-shopping-list.firebaseapp.com",
//   projectId: "tcl-57-smart-shopping-list",
//   storageBucket: "tcl-57-smart-shopping-list.appspot.com",
//   messagingSenderId: "218407207047",
//   appId: "1:218407207047:web:febc6b43d7acb01f43f822"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
