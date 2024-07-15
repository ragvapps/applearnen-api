import { Router } from 'express'
import { VerbsController } from '../controllers/VerbsController';
// import { EnvironmentServer } from '../configs/EnvironmentServer';


const VerbsRoutes = Router();

VerbsRoutes.get('/', VerbsController.getAllVerbs);
VerbsRoutes.post('/', VerbsController.addVerb);
VerbsRoutes.get('/:id', VerbsController.getVerbById);
VerbsRoutes.get('/type/:type',VerbsController.getVerbByType)

export default VerbsRoutes;