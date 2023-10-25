import { Router } from '../../helpers';
import {numberController} from '../../controllers';

const NumberRouter = new Router('number');

NumberRouter.get(':num', numberController.getNumber);

export const numberRouter = NumberRouter;
