import {z, ZodIssueCode} from 'zod';

const frZodErrorMap: z.ZodErrorMap = (issue, ctx): {message: string} => {
  let message: string;

  switch (issue.code) {
    case ZodIssueCode.invalid_type: {
      if (issue.received === 'undefined') {
        message = 'Ce champ est obligatoire';
      } else {
        message = `Entrée invalide, attendu ${issue.expected}, reçu ${issue.received}`;
      }
      break;
    }

    case ZodIssueCode.invalid_date: {
      message = `Date invalide`;
      break;
    }

    case ZodIssueCode.invalid_string: {
      if (issue.validation !== 'regex') {
        message = `Chaîne invalide, doit correspondre à ${issue.validation}`;
      } else {
        message = 'Chaîne invalide';
      }
      break;
    }

    case ZodIssueCode.invalid_enum_value: {
      message = `Valeur d'énumération invalide, attendu ${issue.options
        .map((val) => (typeof val === 'string' ? `'${val}'` : val))
        .join(' | ')}`;
      break;
    }

    case ZodIssueCode.invalid_literal: {
      message = `Valeur littérale invalide, attendu ${JSON.stringify(issue.expected)}`;
      break;
    }

    case ZodIssueCode.custom: {
      message = `Entrée invalide`;
      break;
    }

    case ZodIssueCode.too_small: {
      if (issue.type === 'array') {
        message = `Le tableau doit contenir ${issue.inclusive ? `au moins` : `plus de`} ${issue.minimum} élément(s)`;
      } else if (issue.type === 'string') {
        message = `La chaîne doit contenir ${issue.inclusive ? `au moins` : `plus de`} ${issue.minimum} caractère(s)`;
      } else if (issue.type === 'number') {
        message = `Le nombre doit être ${issue.inclusive ? `supérieur ou égal à` : `supérieur à`} ${issue.minimum}`;
      } else {
        message = 'Entrée invalide';
      }
      break;
    }

    case ZodIssueCode.too_big: {
      if (issue.type === 'array') {
        message = `Le tableau doit contenir ${issue.inclusive ? `au maximum` : `moins de`} ${issue.maximum} élément(s)`;
      } else if (issue.type === 'string') {
        message = `La chaîne doit contenir ${issue.inclusive ? `au maximum` : `moins de`} ${issue.maximum} caractère(s)`;
      } else if (issue.type === 'number') {
        message = `Le nombre doit être ${issue.inclusive ? `inférieur ou égal à` : `inférieur à`} ${issue.maximum}`;
      } else {
        message = 'Entrée invalide';
      }
      break;
    }

    default: {
      message = ctx.defaultError;
    }
  }

  return {message};
};

export default frZodErrorMap;
