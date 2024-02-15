import { ReplaySubject } from 'rxjs'
import 'rxjs-compat'
import translate, {
  getLocale,
  onLocaleChange,
  registerTranslations,
} from 'counterpart'

;(window as any).translateInstance = translate

export type LocaleLoader = (locale: string) => Promise<Object>

// This code expects Language Culture Names, such as `en-US`, for the locale.
// It'll fall back automatically to just the language code if an error is
// returned for the culture-specific code.
const localeLoaderFactory = (loadingFn: LocaleLoader) => (
  locale: string
): Promise<void> =>
  loadingFn(locale)
    .catch((error) => {
      if (locale.split('-').length > 1) {
        return loadingFn(locale.split('-')[0])
      }
      return Promise.reject(error)
    })
    .then(
      (translations: any) => {
        const _translations = translations?.messages
          ? translations.messages
          : translations
        registerTranslations(locale, _translations)
        notifyTranslationsChanged()
      },
      (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(
            `No translations for '${locale}', even after fallback.`,
            loadingFn
          )
        }
      }
    )

/**
 * Registers additional translations dynamically based on the current locale and future locale changes
 *
 * @param dynamicLoader A import call to load the locale's json for the module
 * @param allowTest Allows these registrations to run in test mode
 */
export const registerModuleTranslations = (
  dynamicLoader: LocaleLoader,
  allowTest: boolean = false
) => {
  const result = new ReplaySubject<null>(1)
  if (process.env.NODE_ENV === 'test' && !allowTest) {
    // Tests don't have import, so unless we specifically turn it on...
    return
  }
  const loader = localeLoaderFactory((locale: string) =>
    dynamicLoader(locale).then((_) => {
      result.next(null)

      return _
    })
  )

  setTimeout(() => {
    loader(getLocale())
    onLocaleChange(loader)
  })
  return result
}

const translationsChanged = new Set<() => void>()

;(window as any)['translationsChangedSet'] = translationsChanged

onLocaleChange(() => notifyTranslationsChanged())

/** Registers a callback to be notified of new plugins
 *
 * @returns an unregistration function that clears the current callback
 */
export function addTranslationChangedCallback(callback: () => void) {
  translationsChanged.add(callback)

  return () => {
    translationsChanged.delete(callback)
  }
}

export function notifyTranslationsChanged() {
  translationsChanged.forEach((callback) => callback())
}
