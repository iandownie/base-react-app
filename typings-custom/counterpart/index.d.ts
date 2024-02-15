declare module 'counterpart' {
  export function getLocale(): string
  export function setLocale(locale: string): void
  export function setFallbackLocale(locale: string | string[]): void
  export function onLocaleChange<T>(
    callback: (this: T, newLocale: string, oldLocale: string) => void,
    callbackContext?: T
  ): void
  export function offLocaleChange<T>(
    callback: (this: T, newLocale: string, oldLocale: string) => void,
    callbackContext?: T
  ): void

  export const onTranslationNotFound: any

  export const offTranslationNotFound: any
  export function translate(locale: string, args?: Object): string
  export function registerTranslations(locale: string, messages: Object): void
}

declare module 'sprintf-js' {
  export function sprintf(text: string, values: Object): string
}
