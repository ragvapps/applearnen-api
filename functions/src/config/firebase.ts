const admin = require('firebase-admin');
// const functions = require('firebase-functions');
import * as credential from '../permissions/credential.json';

admin.initializeApp({
  // eslint-disable-next-line max-len
  credential: admin.credential.cert(credential),
});

const db = admin.firestore();

export {admin, db};
