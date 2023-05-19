import React, { useState } from 'react'
import { components } from 'react-select'

import { Card, Select, Avatar, ScrollBar, Button } from 'components/ui'
import { HiCheck } from 'react-icons/hi'
import { BsFillPlayFill } from 'react-icons/bs'

import { speakers, countryOptions } from '../constants/data.js'

const { Control } = components

const CustomSelectOption = ({ innerProps, label, data, isSelected }) => {
    return (
        <div
            className={`flex items-center justify-between p-2 ${
                isSelected
                    ? 'bg-gray-100 dark:bg-gray-500'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-600'
            }`}
            {...innerProps}
        >
            <div className="flex items-center">
                <Avatar shape="circle" size={20} src={data.imgPath} />
                <span className="ml-2 rtl:mr-2">{label}</span>
            </div>
            {isSelected && <HiCheck className="text-emerald-500 text-xl" />}
        </div>
    )
}

const CustomControl = ({ children, ...props }) => {
    const selected = props.getValue()[0]
    return (
        <Control {...props}>
            {selected && (
                <Avatar
                    className="ltr:ml-4 rtl:mr-4"
                    shape="circle"
                    size={18}
                    src={selected.imgPath}
                />
            )}
            {children}
        </Control>
    )
}

const Speakers = ({ data, selectedSpeaker, setSelectedSpeaker }) => {
    return (
        <div className="flex-auto mr-4">
            {data.map((speaker) => (
                <div
                    key={speaker.id}
                    onClick={() => setSelectedSpeaker(speaker.id)}
                    className={`${
                        selectedSpeaker === speaker.id && 'bg-gray-700'
                    } pl-3 pt-2`}
                >
                    <div className="flex justify-between cursor-pointer">
                        <div className="flex mr-2 items-center">
                            <Avatar
                                shape="circle"
                                size={60}
                                src={speaker.avatar}
                            />
                        </div>
                        <div className="w-full text-xs items-center">
                            <div className="flex font-semibold truncate text-gray-900 dark:text-gray-100">
                                {speaker.name}
                            </div>
                            <div className="">{speaker.desc}</div>
                        </div>
                    </div>
                    <div className="flex relative">
                        <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                        <Button
                            size="xs"
                            className="flex items-center absolute right-0 bottom-0 "
                        >
                            <BsFillPlayFill />
                            <span>Preview Voice</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}

const SpeakerList = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-us')
    const [selectedSpeaker, setSelectedSpeaker] = useState('speakerAxel')

    const getCountryOption = (languageValue) => {
        return countryOptions.filter(
            (country) => country.value === languageValue
        )
    }

    const getLanguageSpeaker = (languageValue) => {
        return speakers.filter((speaker) => speaker.language === languageValue)
    }

    const handleSelectedLanguage = (e) => {
        setSelectedLanguage(e.value)
        localStorage.setItem('selectedLanguage', e.value)
    }

    const handleSelectedSpeaker = (e) => {
        setSelectedSpeaker(e)
        localStorage.setItem('selectedSpeaker', e)
    }

    return (
        <Card className="w-full">
            <div className="flex items-center gap-2 text-xs">
                <span className="flex-none">Language</span>
                <Select
                    size="sm"
                    options={countryOptions}
                    components={{
                        Option: CustomSelectOption,
                        Control: CustomControl,
                    }}
                    defaultValue={getCountryOption(selectedLanguage)}
                    className="flex-auto"
                    onChange={handleSelectedLanguage}
                />
            </div>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-500" />
            <div className="h-96 overflow-auto">
                <ScrollBar autoHide>
                    <Speakers
                        data={getLanguageSpeaker(selectedLanguage)}
                        selectedSpeaker={selectedSpeaker}
                        setSelectedSpeaker={handleSelectedSpeaker}
                    />
                </ScrollBar>
            </div>
        </Card>
    )
}

export default SpeakerList
