import { TypeVerb } from "../enums/verbs.enums";
import { IVerb } from "../interfaces/IVerbs";
import { VerbsModel } from "../models/firebase/verbs.model";

export class Verbs {
    static addVerb = async (verbData: IVerb): Promise<Array<any>> => {
        return await VerbsModel.create(verbData);
    }

    static getAllVerbs = async (): Promise<Array<any>> => {
        return await VerbsModel.getAllVerbs();
    }

    static getVerbById = async (id: string): Promise<Array<any>> => {
        return await VerbsModel.getVerbById(id);
    }

    static getVerbByType = async (type: TypeVerb): Promise<Array<any>> => {
        return await VerbsModel.getVerbByType(type);
    }
}