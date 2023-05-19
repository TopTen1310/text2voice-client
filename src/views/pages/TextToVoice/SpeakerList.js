import React from 'react'
import { Card, Select, Avatar, ScrollBar, Button } from 'components/ui'
import { HiCheck } from 'react-icons/hi'
import { components } from 'react-select'
import { speakers } from '../../../constants/data.js'

import { BsFillPlayFill } from 'react-icons/bs'

const { Control } = components

const countryOptions = [
    { value: 'us', label: 'United State', imgPath: '/img/countries/us.png' },
    { value: 'cn', label: 'China', imgPath: '/img/countries/cn.png' },
    { value: 'jp', label: 'Japan', imgPath: '/img/countries/jp.png' },
    { value: 'fr', label: 'French', imgPath: '/img/countries/fr.png' },
]

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

const Speakers = ({ data }) => {
    return (
        <div className="flex-auto mr-4">
            {data.map((speaker) => (
                <div
                    key={speaker.id}
                    className="dark:border-gray-600 last:border-0 hover:bg-hover my-1"
                >
                    <div className="flex justify-between">
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
                            className="flex items-center absolute right-0 bottom-0"
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
    return (
        <>
            <Card>
                <div className="flex items-center gap-2 text-xs">
                    <span className="flex-none">Language</span>
                    <Select
                        size="sm"
                        options={countryOptions}
                        components={{
                            Option: CustomSelectOption,
                            Control: CustomControl,
                        }}
                        defaultValue={countryOptions[0]}
                        className="flex-auto"
                    />
                </div>
                <hr className="h-px my-2 bg-gray-200 border-0 dark:bg-gray-700" />
                <div className="h-96 overflow-auto">
                    <ScrollBar autoHide>
                        <Speakers data={speakers} />
                    </ScrollBar>
                </div>
            </Card>
        </>
    )
}

export default SpeakerList
