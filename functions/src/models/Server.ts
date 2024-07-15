// /* eslint-disable max-len */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import express, {Request, Response, Application, NextFunction} from 'express';
// import fs from 'fs';
// import path from 'path';
// // import axios, {AxiosResponse} from 'axios';
// import https from 'https';
// // import morgan from 'morgan';
// // import bodyParser from 'body-parser';
// // import cookieParser from 'cookie-parser';

// // Swagger
// // import swaggerUi from 'swagger-ui-express';

// // DB
// import {db as dbConnection} from '../db/connection';

// // Routes
// // import PingRoutes from '../routes/PingRoutes.routes';
// // import ApiRoutes from '../routes/ApiRoutes.routes';


// // Middlewares
// // import isLoggedInMiddleware from '../middlewares/is-logged-in.middleware';
// // import {validatePathsError, validatePathsGetNotFound} from '../middlewares/validate-routes.middleware';

// // Constantes
// import {EnvironmentServer} from '../configs/EnvironmentServer';
// // import {EnvironmentClient} from '../configs/EnvironmentClient';
// // import swaggerJSDoc from '../configs/swaggerConfig';

// // Utils, Helpers and Functions
// // import Auditoria from '../utils/auditoria';
// // import ValidateResponseApis from '../helpers/ValidateResponseApis';
// // import OriginVerification from '../helpers/OriginVerification';

// class Server {
//   private app: Application | undefined;
//   private port: number | undefined;
//   private apiPaths = {
//     base: '/api',
//   };

//   get getApp() {
//     return this.app;
//   }

//   constructor() {
//     // this.app = express();
//     // this.port = isNaN(EnvironmentClient.AppPort) ? 5000 : EnvironmentClient.AppPort;
//     // this.corsApi();
//     this.conectarDB();
//     // this.middlewares();
//     this.routes();
//   }

// //   middlewares() {
// //     // Logs request
// //     if (EnvironmentServer.LogsMorgan) {
// //       this.app.use(morgan(['local', 'development'].includes(EnvironmentServer.AppTypeLogsMorgan) ? 'dev' : 'combined'));
// //     }

// //     // Parse cookies
// //     this.app.use(cookieParser());

// //     // A todas las respuestas les adjuntamos los siguientes encabezados
// //     this.app.use((req: Request, res: Response, next: NextFunction) => {
// //       // Este encabezado es usado para las peticiones previas que hace el cliente y le indicamos los
// //       // encabezados soportados por nuestra api, ver mas en:
// //       // https://developer.mozilla.org/es/docs/Web/HTTP/Headers/Access-Control-Allow-Headers
// //       res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

// //       next();
// //     });

// //     // limite
// //     this.app.use(bodyParser.json({limit: '200mb'}));
// //     this.app.use(bodyParser.urlencoded({limit: '200mb', extended: false, parameterLimit: 1000000}));

// //     // Carpeta publica con archivos estáticos, si queremos agregar otras carpetas usar la misma sintaxis
// //     // tomar en cuenta la ruta en la que se encuentra la carpeta y desde donde se llama
// //     this.app.use(express.static(path.join(__dirname, '../public')));

// //     // Swagger
// //     if (['local', 'development'].includes(EnvironmentServer.AppEnvironment)) {
// //       this.app.use(`${this.apiPaths.base}${this.apiPaths.swagger}`, swaggerUi.serve, swaggerUi.setup(swaggerJSDoc));
// //     }

// //     // Instance axios
// //     axios.interceptors.response.use(
// //       function(response: AxiosResponse) {
// //         // Validamos que las respuestas de las apis a las cuales consultamos manejen el estándar definido
// //         // de no ser así se realiza una transformación al nuevo estándar
// //         const validRes = ValidateResponseApis.valid(response.status, response.statusText, response.data);
// //         response.data = validRes;

// //         return response;
// //       },
// //       function(error: any) {
// //         return Promise.reject(error);
// //       },
// //     );
// //   }

//   routes() {
//     this.app.use(this.apiPaths.base, ApiRoutes);

//     // Mapping routes not middleware
//     this.app.use(`${this.apiPaths.base}${this.apiPaths.ping}`, PingRoutes);
//     this.app.use(`${this.apiPaths.base}${this.apiPaths.link}`, LinkRoutes);
//     this.app.use(`${this.apiPaths.base}${this.apiPaths.estados}`, EstadosRoutes);
//     this.app.use(`${this.apiPaths.base}${this.apiPaths.solicitud}`, SolicitudRoutes);
//     this.app.use(`${this.apiPaths.base}${this.apiPaths.sara}`, SaraRoutes);
//     this.app.use(`${this.apiPaths.base}${this.apiPaths.firmaElectronica}`, FirmaElectronicaRoutes);

//     this.app.get('*', (req: Request, res: Response, next: NextFunction) => {
//       if (req.url.includes('/api/') && req.url.startsWith('/api/') && req.url.indexOf('/api/') === 0) {
//         return next();
//       } else {
//         return res.sendFile(path.join(__dirname + './../public/index.html'));
//       }
//     });

//     this.app.use(`${this.apiPaths.base}*`, validatePathsGetNotFound);

//     this.app.use(validatePathsError);
//   }

//   //   corsApi() {
//   //     const originValidate = new OriginVerification(this.app);
//   //     originValidate.validate();
//   //   }

//   conectarDB() {
//     dbConnection(EnvironmentServer.ConnectionMongoDD)
//       .then(() => {
//         console.log('Base de datos en línea');

//         // Auditoria.setAuditoriaAcciones(
//         //   EnvironmentServer.AppId,
//         //   'server',
//         //   'Conexión a base de datos correctamente',
//         //   'server-db-conected',
//         // );
//       })
//       .catch((e: any) => {
//         console.log('Base de datos off', e.message);
//         // Auditoria.setAuditoriaError({
//         //   IdUsuario: EnvironmentServer.AppId,
//         //   IdAplicacion: EnvironmentServer.AppId,
//         //   ExceptionType: 'ERROR',
//         //   NombreRecurso: 'server',
//         //   Clase: 'Server',
//         //   ErrorOriginal: e.toString(),
//         //   Response: JSON.stringify(e),
//         // });
//       });
//   }

//   listen() {
//     if (EnvironmentServer.AppHttps) {
//       https
//         .createServer(
//           {
//             key: fs.readFileSync('/etc/node/ssl/asesuisa.key'),
//             cert: fs.readFileSync('/etc/node/ssl/asesuisa.crt'),
//           },
//           this.app,
//         )
//         .listen(this.port, () => this.messageConsole());
//     } else {
//       this.app.listen(this.port, () => this.messageConsole());
//     }
//   }

//   messageConsole() {
//     Auditoria.setAuditoriaAcciones(
//       EnvironmentServer.AppId,
//       'server',
//       'Servidor levantado correctamente',
//       'server-start',
//     );

//     console.log('######################################');
//     console.log('######################################');
//     console.log(`##### SERVER RUN IN PORT => ${this.port} #####`);
//     console.log('######################################');
//     console.log('######################################');
//   }
// }

// export default Server;
