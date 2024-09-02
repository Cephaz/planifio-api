export type Environment = 'development' | 'test' | 'production';

export interface TranslationObject {
  [key: string]: string;
}

export interface Translations {
  [locale: string]: TranslationObject;
}

export type TranslationFn = (key: string, ...values: string[]) => string;
