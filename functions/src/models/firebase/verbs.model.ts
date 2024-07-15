import { db } from '../../db/firebaseConnection';
import { TypeVerb } from '../../enums/verbs.enums';
import { IVerb } from '../../interfaces/IVerbs';

const defaultCollectionName = 'verbs';
const verbsRef = db.collection(defaultCollectionName);

export class VerbsModel {
    static create = async (verbData: IVerb): Promise<Array<any>> => {
        try {
            await verbsRef.doc().create(verbData);
            return [true, 'ADD_VERB_SUCCESS', 1]
        } catch (error) {
            return [false, 'ADD_VERB_ERROR', error]
        }
    }

    static getAllVerbs = async (): Promise<Array<any>> => {

        let isSuccess: boolean = false;
        let message: string = 'GET_ALL_VERBS_NOT_FOUND';
        let result: Array<IVerb> = [];

        try {
            const snapshot = await verbsRef.get();
            if (snapshot.empty) {
                isSuccess = false;
                console.log('No matching documents.');
                message = 'GET_ALL_VERBS_NOT_FOUND';
            } else {
                message = 'GET_ALL_VERBS_SUCCESS';
                isSuccess = true;
                snapshot.docs.map((doc: any) => {
                    result.push({
                        id: doc.id,
                        name: doc.data().name,
                        participle: doc.data().participle,
                        past: doc.data().past,
                        present: doc.data().present,
                        type: doc.data().type
                    })
                })
            }
        } catch (error) {
            isSuccess = false;
            message = 'GET_ALL_VERBS_ERROR';
        }

        return [isSuccess, message, result];
    }

    static getVerbById = async (id: string): Promise<Array<any>> => {
        let isSuccess: boolean = false;
        let message: string = 'VERB_NOT_FOUND';
        let result: IVerb = {
            name: '',
            participle: '',
            past: '',
            present: '',
            type: TypeVerb.regular,
        };

        try {
            const snapshot = await verbsRef.doc(id).get();
            if (snapshot.exists) {
                isSuccess = false;
                console.log('No matching documents.');
                message = 'VERB_NOT_FOUND';
            } else {
                isSuccess = true;
                message = 'GET_VERB_BY_ID_SUCCESS'

                result.id = snapshot.id,
                    result.name = snapshot.data()?.name;
                result.participle = snapshot.data()?.participle;
                result.past = snapshot.data()?.past;
                result.present = snapshot.data()?.present;
                result.type = snapshot.data()?.type;
            }


        } catch (error) {
            isSuccess = false;
            message = 'GET_VERB_BY_ID_ERROR';
        }

        return [isSuccess, message, result];
    }

    static getVerbByType = async (type: TypeVerb): Promise<Array<any>> => {
        let isSuccess: boolean = false;
        let message: string = 'VERBS_BY_TYPE_NOT_FOUND';
        let result: Array<IVerb> = [];

        try {
            const snapshot = await verbsRef
                .where('type', '==', type)
                .get();

            if (snapshot.empty) {
                isSuccess = false;
            } else {
                message = 'GET_VERBS_BY_TYPE_SUCCESS';
                isSuccess = true;
                snapshot.docs.map((doc: any) => {
                    result.push({
                        id: doc.id,
                        name: doc.data().name,
                        participle: doc.data().participle,
                        past: doc.data().past,
                        present: doc.data().present,
                        type: doc.data().type
                    })
                })
            }
        } catch (error) {
            isSuccess = false;
            message = 'GET_VERBS_BY_TYPE_ERROR';
        }

        return [isSuccess, message, result];
    }
}