import {z} from 'zod';
import en from './en';
import fr from './fr';

const zodErrorMaps: {[locale: string]: z.ZodErrorMap} = {en, fr};

const setZodErrorMap = (locale: string): void => {
  z.setErrorMap(zodErrorMaps[locale]);
};

export default zodErrorMaps;
export {setZodErrorMap};
