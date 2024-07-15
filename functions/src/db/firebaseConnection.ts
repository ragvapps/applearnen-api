const admin = require('firebase-admin');

//One way
import * as credential from '../permissions/credential.json';

// console.log(credential);

admin.initializeApp({
// eslint-disable-next-line max-len
  credential: admin.credential.cert(credential),
});

export const db = admin.firestore();