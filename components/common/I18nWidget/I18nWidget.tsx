import cn from 'classnames'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import s from './I18nWidget.module.css'
import { Cross, ChevronUp } from '@components/icons'
import ClickOutside from '@lib/click-outside'
import { useLanguage } from '@hooks/useLanguage'
interface LOCALE_DATA {
  name: string
  img: {
    filename: string
    alt: string
  }
}
//link flag https://github.com/HatScripts/circle-flags/tree/gh-pages/flags
const LOCALES_MAP: Record<string, LOCALE_DATA> = {
  "vi": {
    name: 'Tiếng Việt',
    img: {
      filename: 'vn.svg',
      alt: 'Tiếng Việt',
    },
  },
  "en": {
    name: 'English',
    img: {
      filename: 'gb.svg',
      alt: 'English',
    },
  },
}

const I18nWidget: FC = () => {
  const [display, setDisplay] = useState(false)
  const [options, setOptions] = useState<string[]>([])
  const [currentLocale, setCurrentLocale] = useState('vi')

  const { asPath: currentPath } = useRouter()

  const { locale, setLocale } = useLanguage();
  
  useEffect( () => {
    const filters : string[] = ['vi', 'en'].filter((val) => val !== locale)
    setOptions(filters)
    setCurrentLocale(locale || 'vi')
  }, [locale])

  return (
    <ClickOutside active={display} onClick={() => setDisplay(false)}>
      <nav className={s.root}>
        <div
          className="flex items-center relative"
          onClick={() => setDisplay(!display)}
        >
          <button className={s.button} aria-label="Language selector">
            <img
              width="20"
              height="20"
              className="block mr-2 w-5"
              src={`/${LOCALES_MAP[currentLocale].img.filename}`}
              alt={LOCALES_MAP[currentLocale].img.alt}
            />
            {options && (
              <span className="cursor-pointer">
                <ChevronUp className={cn(s.icon, { [s.active]: display })} />
              </span>
            )}
          </button>
        </div>
        <div className="absolute top-0 right-0">
          {options?.length && display ? (
            <div className={s.dropdownMenu}>
              <div className="flex flex-row justify-end px-6">
                <button
                  onClick={() => setDisplay(false)}
                  aria-label="Close panel"
                  className={s.closeButton}
                >
                  <Cross className="h-6 w-6" />
                </button>
              </div>
              <ul>
                {options.map((locale) => (
                  <li key={locale}>
                    <Link href={currentPath} locale={locale}>
                      <a
                        className={cn(s.item)}
                        onClick={() => { setLocale(locale); setDisplay(false)} }
                      >
                        {LOCALES_MAP[locale].name}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </nav>
    </ClickOutside>
  )
}

export default I18nWidget
