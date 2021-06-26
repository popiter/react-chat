import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from "firebase";
import "firebase/firestore"

firebase.initializeApp({
    apiKey: "AIzaSyD-Z7_vfAN-r7SEmfof54-fe7qqvdhK24w",
    authDomain: "react-chat-acf95.firebaseapp.com",
    databaseURL: "https://react-chat-acf95-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "react-chat-acf95",
    storageBucket: "react-chat-acf95.appspot.com",
    messagingSenderId: "169987100193",
    appId: "1:169987100193:web:c6857b88ce007757061d60"
});
export const Context = createContext(null)
const firestore = firebase.firestore()

ReactDOM.render(
  <Context.Provider value={{firestore, firebase}}>
    <App/>
  </Context.Provider>,
  document.getElementById('root')
);
