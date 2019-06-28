import * as firebase from 'firebase';
import firestore from 'firebase/firestore'
import { firebaseConfig } from './testfirebaseconfig'

firebase.initializeApp(firebaseConfig);

export default firebase;
