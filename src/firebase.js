import firebase from 'firebase'
import 'firebase/storage'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBrGEMT3MjduOc9Tshvhql6pt-G9dCKPPI',
  authDomain: 'instagram-react-d8ca5.firebaseapp.com',
  databaseURL: 'https://instagram-react-d8ca5-default-rtdb.firebaseio.com',
  projectId: 'instagram-react-d8ca5',
  storageBucket: 'instagram-react-d8ca5.appspot.com',
  messagingSenderId: '659778591208',
  appId: '1:659778591208:web:fdfe22101cbf2cea9d2c5d',
  measurementId: 'G-53C3CQRN9K',
})

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
