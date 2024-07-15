/* eslint-disable no-tabs */
/* eslint-disable max-len */
export type TypeEnvironment = 'local' | 'development' | 'test' | 'production' | 'mocha';

export type TEnvironmentServer = {
	IdDocRegularVerbs?: string;
	AppEnvironment: TypeEnvironment;
	PORT: number;
};

export type TAllEnvironment = TEnvironmentServer;
