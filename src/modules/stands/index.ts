import { standsAtom } from '##/exportAtoms/stands';
import { store } from '##/modules/app';
// @ts-ignore: При сборке стенды осутствуют
import { stands } from '##/stands';

store.dispatch(standsAtom.set(stands));

export { standsAtom };
