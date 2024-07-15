import path from 'path';
import {TypeEnvironment} from '../constants/types';

interface IArg {
    build?: TypeEnvironment
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
}

const resolvePathEnvironment = (argv: IArg = {build: 'local'}): string => {
  const build = argv.build || 'local';

  return path.resolve(process.cwd(), 'ENV', `${build.trim()}.env`);
};

export default resolvePathEnvironment;
