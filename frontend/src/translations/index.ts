import { en, TranslationKeys } from './en';
import { hi } from './hi';

export type SupportedLanguage = 'en' | 'hi';

export const translations: Record<SupportedLanguage, TranslationKeys> = {
  en,
  hi,
};

/**
 * Gets a nested value from object by dot notation string path
 */
export function getTranslationValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.');
  let current: unknown = obj;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path; // Fallback to path if key not found
    }
  }

  return typeof current === 'string' ? current : path;
}
