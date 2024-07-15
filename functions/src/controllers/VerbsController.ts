import { TypeVerb } from "../enums/verbs.enums";
import { IVerb } from "../interfaces/IVerbs";
import { Verbs } from "../services/Verbs.service";

export class VerbsController{
    static async addVerb(req: any, res: any)  {

        const data: IVerb  = {
            name: req.body.name,
            type: req.body.type,
            present: req.body.present,
            past: req.body.past,
            participle: req.body.participle
        }

        const [isSuccess, message, result] = await Verbs.addVerb(data);

        console.log(result);

        if (isSuccess) {
            return res.status(200).json(message);
        }else {
            return res.status(500).json(message);
        }   
    }

    static async getAllVerbs(req: any, res: any){
        const [isSuccess, message, result] = await Verbs.getAllVerbs();

        if (isSuccess) {
            return res.status(200).json({result});
        }else {
            return res.status(500).json(message);
        } 
    }

    static async getVerbById(req: any, res: any){
        const {id}: {id: string} = req.params;
        const [isSuccess, message, result] = await Verbs.getVerbById(id);

        if (isSuccess) {
            return res.status(200).json({result});
        }else {
            return res.status(500).json(message);
        } 
    }

    static async getVerbByType(req: any, res: any){
        const {type} : {type: TypeVerb} = req.params

        const [isSuccess, message, result] = await Verbs.getVerbByType(type);

        if (isSuccess) {
            return res.status(200).json({result});
        }else {
            return res.status(500).json(message);
        } 
    }

}