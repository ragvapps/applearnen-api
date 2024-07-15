import { TypeVerb } from "../enums/verbs.enums";

export interface IVerb {
    id?: string;
    type: TypeVerb;
    name: string;
    present: string;
    past: string;
    participle: string;
};