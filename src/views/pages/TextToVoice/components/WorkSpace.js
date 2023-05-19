import React, { useEffect, useRef, useState } from 'react'

import { Card } from 'components/ui'
import { Button, Dropdown, Select, ScrollBar, Tag } from 'components/ui'
import {
    BsFillVolumeUpFill,
    BsPlay,
    BsFillPauseFill,
    BsReplyAll,
} from 'react-icons/bs'

import {
    volumeData,
    speakingRateData,
    addPauseData,
    toneOptions,
} from '../constants/data.js'
import WaitingDialog from './WaitingDialog.js'
import { speakers, countryOptions } from '../constants/data.js'

const CustomToggle = ({ label, data, handler }) => {
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
            <Dropdown renderTitle={Toggle} onSelect={handler}>
                {data.map((feature, index) => (
                    <Dropdown.Item key={feature.id} eventKey={`${index}`}>
                        {feature.title}
                    </Dropdown.Item>
                ))}
            </Dropdown>
        </div>
    )
}

const WorkSpace = ({ data, setData }) => {
    // const [volume, setVolume] = useState('volume_normal')
    // const [speakingRate, setSpeakingRate] = useState('rate_normal')
    // const [addPause, setAddPause] = useState([])
    // const [tone, setTone] = useState('general')

    const [audio, setAudio] = useState('')
    const [content, setContent] = useState('')
    const editorRef = useRef(null)

    const handleBold = (fontSize) => {
        document.execCommand('fontSize', false, fontSize)
    }

    const handleColorChange = (color) => {
        document.execCommand('foreColor', false, color)
    }

    const volumeHandler = (eventKey) => {
        handleBold(`${Number(eventKey) + 1}`)
    }

    const speakingRateHandler = (eventKey) => {
        const colors = {
            0: 'green',
            1: 'blue',
            2: 'white',
            3: 'orange',
            4: 'red',
        }
        handleColorChange(colors[eventKey])
    }

    const pauseHandler = (eventKey) => {
        const times = {
            0: 'pause 0.2sec',
            1: 'pause 0.5sec',
            2: 'pause 1sec',
            3: 'pause 1.5sec',
            4: 'pause 2sec',
            5: 'pause 2.5sec',
            6: 'pause 3sec',
            7: 'pause 4sec',
            8: 'pause 5sec',
        }
        document.execCommand(
            'insertHTML',
            false,
            `<span contenteditable="false"><div style='color: red; border: 1px solid red; padding: 3px; border-radius: 5px; user-select: none; display: inline-block;' disabled>${times[eventKey]}<button style="padding: 0 5px; width: 20px; margin: 3px; background-color: red; color: white; border-radius: 3px;">X</button></div></span>`
        )
    }

    const handleCursorPosition = () => {
        if (editorRef.current) {
            const selection = window.getSelection()
            const range = selection.getRangeAt(0)
            const preSelectionRange = range.cloneRange()
            preSelectionRange.selectNodeContents(editorRef.current)
            preSelectionRange.setEnd(range.startContainer, range.startOffset)
            const cursorPosition = preSelectionRange.toString().length
            // console.log('Cursor Index:', cursorPosition);
        }
    }

    function getVolumeFromSize(size) {
        switch (size) {
            case '1':
                return -1
            case '2':
                return 0
            case '3':
                return 1
            default:
                return null
        }
    }

    function getRateFromColor(color) {
        switch (color) {
            case '#ff0000':
                return 2
            case '#ffa500':
                return 1
            case '#ffffff':
                return 0
            case '#0000ff':
                return -1
            case '#008000':
                return -2
            default:
                return null
        }
    }

    function traverseDom(node, parentSize, parentColor) {
        var result = []
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNode = node.childNodes[i]
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                var size = parentSize
                var color = parentColor
                if (childNode.nodeName === 'SPAN') {
                    result.push({
                        volume: -10,
                        rate: -10,
                        text: childNode.textContent
                            .trim()
                            .match(/\d+(\.\d+)?/)[0],
                    })
                    continue
                }
                if (childNode.nodeName === 'FONT') {
                    if (childNode.hasAttribute('size')) {
                        size = getVolumeFromSize(childNode.getAttribute('size'))
                    }
                    if (childNode.hasAttribute('color')) {
                        color = getRateFromColor(
                            childNode.getAttribute('color')
                        )
                    }
                }
                result = result.concat(traverseDom(childNode, size, color))
            } else if (childNode.nodeType === Node.TEXT_NODE) {
                var text = childNode.textContent.trim()
                if (text !== '') {
                    result.push({
                        volume: parentSize,
                        rate: parentColor,
                        text: text,
                    })
                }
            }
        }
        return result
    }

    const [dialogIsOpen, setIsOpen] = useState(false)
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerateAudio = async () => {
        setIsOpen(true)
        setIsGenerating(true)

        const selectedSpeaker = localStorage.getItem('selectedSpeaker')
        const selectedLanguage = localStorage.getItem('selectedLanguage')

        const inputTextArray = traverseDom(editorRef.current, 0, 0)
        const inputText = inputTextArray.reduce(
            (result, item) =>
                item.rate === -10 ? result : `${result}${item.text}`,
            ''
        )
        fetch('/v1/projects/text2voice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: inputTextArray,
            }),
        }).then(async (res) => {
            const msg = await res.json()
            setIsGenerating(false)
            if (typeof msg.audioData !== 'undefined') {
                setData((data) => [
                    ...data,
                    {
                        text: inputText.slice(0, 6),
                        avatar: speakers.find(
                            (speaker) =>
                                speaker.name === selectedSpeaker.slice(7)
                        ).avatar,
                        name: selectedSpeaker.slice(7),
                        language: selectedLanguage,
                        characters: inputText.length,
                        length: 1,
                        audioData: `data:audio/ogg;base64,${msg.audioData}`,
                    },
                ])
            }
        })
    }

    return (
        <Card className="w-full">
            <div className="md:flex justify-between">
                <div className="flex flex-1 justify-start gap-2 items-center">
                    <CustomToggle
                        label="Volume"
                        data={volumeData}
                        handler={volumeHandler}
                    />
                    <CustomToggle
                        label="Speaking Rate"
                        data={speakingRateData}
                        handler={speakingRateHandler}
                    />
                    <CustomToggle
                        label="Add Pause"
                        data={addPauseData}
                        handler={pauseHandler}
                    />
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

            {/* <Input placeholder="Text area example" name textArea /> */}
            <div
                contentEditable
                ref={editorRef}
                onMouseUp={handleCursorPosition}
                style={{
                    border: '1px solid black',
                    minHeight: '100px',
                    padding: '10px',
                }}
                className="mb-2 p-4 h-80 border-gray-200 overflow-auto"
                suppressContentEditableWarning
            ></div>

            <div className="flex justify-between items-start">
                <div className="flex flex-1 gap-2 justify-start text-sky-500 ">
                    <Tag className="border-sky-500">
                        {typeof content !== 'undefined' ? content.length : 0}
                    </Tag>
                    <Tag className="border-sky-500"> 5 word</Tag>
                </div>
                <div>
                    <Button
                        size="xs"
                        className="flex flex-1 items-center gap-1"
                        variant="solid"
                        color="sky-500"
                        onClick={handleGenerateAudio}
                    >
                        <BsReplyAll />
                        <span>Generate Audio</span>
                    </Button>
                </div>
            </div>
            <WaitingDialog
                dialogIsOpen={dialogIsOpen}
                setIsOpen={setIsOpen}
                isGenerating={isGenerating}
            />
        </Card>
    )
}

export default WorkSpace
