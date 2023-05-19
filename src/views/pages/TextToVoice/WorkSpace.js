import React from 'react'

import { Card } from 'components/ui'
import { Button, Dropdown, Select, Input, Tag } from 'components/ui'
import {
    BsFillVolumeUpFill,
    BsPlay,
    BsFillPauseFill,
    BsReplyAll,
} from 'react-icons/bs'

import {
    volumeData,
    speakingRateData,
    addPause,
    toneOptions,
} from '../../../constants/data.js'

const CustomToggle = ({ label, data }) => {
    const Toggle = (
        <Button
            size="xs"
            className="flex flex-1 items-center"
            variant="solid"
            color="sky-500"
        >
            {label === 'Volume' ? (
                <BsFillVolumeUpFill />
            ) : label === 'Speaking Rate' ? (
                <BsPlay />
            ) : (
                <BsFillPauseFill />
            )}
            <span>{label}</span>
        </Button>
    )

    return (
        <div>
            <Dropdown renderTitle={Toggle}>
                {data.map((feature, index) => (
                    <Dropdown.Item key={feature.id}>
                        {feature.title}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

const WorkSpace = () => {
    return (
        <Card className="w-full">
            <div className="md:flex justify-between">
                <div className="flex flex-1 justify-start gap-2 items-center">
                    <CustomToggle label="Volume" data={volumeData} />
                    <CustomToggle
                        label="Speaking Rate"
                        data={speakingRateData}
                    />
                    <CustomToggle label="Add Pause" data={addPause} />
                </div>
                <div className="flex gap-2 items-center font-semibold text-xs h-10">
                    Tone
                    <Select
                        size="sm"
                        options={toneOptions}
                        defaultValue={toneOptions[0]}
                        className="w-32"
                    />
                </div>
            </div>
            <hr className="h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />

            <Input placeholder="Text area example" textArea />

            <div className="flex justify-between items-start">
                <div className="flex flex-1 gap-2 justify-start text-sky-500 ">
                    <Tag className="border-sky-500">12 characters</Tag>
                    <Tag className="border-sky-500"> 5 word</Tag>
                </div>
                <div>
                    <Button
                        size="xs"
                        className="flex flex-1 items-center gap-1"
                        variant="solid"
                        color="sky-500"
                    >
                        <BsReplyAll />
                        <span>Generate Audio</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default WorkSpace
