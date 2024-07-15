import {TAllEnvironment, TypeEnvironment} from '../constants/types';
// import { EnvironmentClient } from './EnvironmentClient';

/**
 * @type { typeof import("../constants/types").TAllEnvironment }
 */
const EnvironmentServer: TAllEnvironment = {
//   ...EnvironmentClient,
  IdDocRegularVerbs: process.env.ID_DOC_REGULAR_VERBS,
  AppEnvironment: process.env.NODE_ENV as TypeEnvironment,
  PORT: Number(process.env.PORT) ?? 1234
};

export {EnvironmentServer};
