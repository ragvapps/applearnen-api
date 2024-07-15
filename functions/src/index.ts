/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
const express = require('express');
const functions = require('firebase-functions');
const path = require('path');
const packageInfo = require(path.join(__dirname, '..', 'package.json'));
const apiVersion = packageInfo.version;
require('dotenv').config();
import setVariablesEnviroment from './utils/setVariablesEnviroment';
import VerbsRoutes  from './routes/Verbs.routes'

setVariablesEnviroment();

// import {EnvironmentServer} from './configs/EnvironmentServer';
// import { db } from './db/connection';

const app = express();



// console.log('PRUEBA:', process.env.ID_DOC_REGULAR_VERBS);
// console.log('PRUEBA .ENV2', EnvironmentServer.IdDocRegularVerbs);
// console.log('PRUEBA .ENV3', EnvironmentServer.AppEnvironment);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// app.post('/api/verbs/add', async (req: any, res: any) => {
//   await db.collection(`verbs/${EnvironmentServer.IdDocRegularVerbs}/regulars`).doc().create({
//     past: req.body.past,
//     present: req.body.present,
//   });

//   return res.status(200).json();
// });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.get('/', (req: any, res: any) => {
  return res.status(200).json({message: `Api-Version dev V-${apiVersion}`});
});


app.use('/api/verbs', VerbsRoutes);

exports.app = functions.https.onRequest(app);


// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
