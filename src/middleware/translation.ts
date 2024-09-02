import type {Handler} from 'express';
import {TranslationFn} from '../types';
import {getLocale} from '../utils/helpers';
import translations from '../utils/i18n/translations';

const translation: Handler = async (req, res, next) => {
  const t: TranslationFn = (key, ...values: string[]) => {
    const keys = key.split('.');
    const locale = getLocale(req);
    let data = translations[locale][key];

    if (typeof data !== 'string') {
      return key; // Return the key if translation is not found
    }

    for (let i = 0; i < values.length; i += 1) {
      data = data.replace(`{${i}}`, values[i]);
    }

    return data;
  };

  req.t = t;

  return next();
};

export default translation;
