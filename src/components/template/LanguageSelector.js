import React, { useMemo, useState } from 'react'
import { Avatar, Dropdown, Spinner } from 'components/ui'
import classNames from 'classnames'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import { useSelector, useDispatch } from 'react-redux'
import { setLang } from 'store/locale/localeSlice'
import { dateLocales } from 'locales'
import dayjs from 'dayjs'
import i18n from 'i18next'

import { HiCheck } from 'react-icons/hi'

const languageList = [{ label: 'English', value: 'en', flag: 'us' }]

export const LanguageSelector = ({ className }) => {
    const [loading, setLoading] = useState(false)

    const locale = useSelector((state) => state.locale.currentLang)
    const dispatch = useDispatch()

    const selectLangFlag = useMemo(() => {
        return languageList.find((lang) => lang.value === locale)?.flag
    }, [locale])

    const selectedLanguage = (
        <div className={classNames(className, 'flex items-center')}>
            {loading ? (
                <Spinner size={20} />
            ) : (
                <Avatar
                    size={24}
                    shape="circle"
                    src={`/img/countries/${selectLangFlag}.png`}
                />
            )}
        </div>
    )

    const onLanguageSelect = (lang) => {
        const formattedLang = lang.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase()
        })

        setLoading(true)

        const dispatchLang = () => {
            i18n.changeLanguage(formattedLang)
            dispatch(setLang(lang))
            setLoading(false)
        }

        dateLocales[formattedLang]()
            .then(() => {
                dayjs.locale(formattedLang)
                dispatchLang()
            })
            .catch((_) => {
                dispatchLang()
            })
    }

    return (
        <Dropdown renderTitle={selectedLanguage} placement="bottom-end">
            {languageList.map((lang) => (
                <Dropdown.Item
                    className="mb-1 justify-between"
                    eventKey={lang.label}
                    key={lang.label}
                    onClick={() => onLanguageSelect(lang.value)}
                >
                    <span className="flex items-center">
                        <Avatar
                            size={18}
                            shape="circle"
                            src={`/img/countries/${lang.flag}.png`}
                        />
                        <span className="ltr:ml-2 rtl:mr-2">{lang.label}</span>
                    </span>
                    {locale === lang.value && (
                        <HiCheck className="text-emerald-500 text-lg" />
                    )}
                </Dropdown.Item>
            ))}
        </Dropdown>
    )
}

export default withHeaderItem(LanguageSelector)
