import { libsAtom } from '##/exportAtoms/libs';
import { store } from '##/modules/app';
// @ts-ignore: При сборке стенды осутствуют
import { libs } from '##/stands';

store.dispatch(libsAtom.set(libs));

export { libsAtom };
