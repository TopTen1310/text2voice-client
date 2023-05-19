import React from 'react'
import { Card, Checkbox, Avatar, Button } from 'components/ui'

import { generatedAudios } from '../../../constants/data.js'

const GeneratedAudioCard = ({ data }) => {
    console.log(data)
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
            {data.map((generatedAudio) => (
                <div className="mb-3" key={generatedAudio.id}>
                    <Card>
                        <div className="w-full grid grid-cols-11 ">
                            <div className="col-span-1">
                                <Checkbox />
                            </div>
                            <div className="col-span-10">
                                <div className="flex justify-between text-white">
                                    <div className="">
                                        {generatedAudio.id}-
                                        <span className="font-semibold">
                                            {generatedAudio.date}
                                        </span>
                                    </div>
                                    <div className="bg-green-400  rounded-md p-1 text-[10px]">
                                        {generatedAudio.characters} chars/
                                        {generatedAudio.length} second
                                    </div>
                                </div>
                                <div className="my-2">
                                    {generatedAudio.text}
                                    <span className="text-sky-600 cursor-pointer">
                                        View more
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <div className="flex gap-3 items-center">
                                        <Avatar
                                            shape="circle"
                                            size={48}
                                            src={generatedAudio.avatar}
                                        />
                                        <div className="flex flex-col ">
                                            <span className="text-green-400 font-semibold text-xs">
                                                {generatedAudio.language}
                                            </span>
                                            <span>{generatedAudio.name}</span>
                                        </div>
                                    </div>
                                    <div className="xs:flex items-center gap-1">
                                        <Button
                                            size="xs"
                                            variant="solid"
                                            color="sky-500"
                                            className="xs:m-0 m-0.5"
                                        >
                                            Add Music
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="solid"
                                            color="sky-500"
                                            className="xs:m-0 m-0.5"
                                        >
                                            Play
                                        </Button>
                                        <Button
                                            size="xs"
                                            variant="solid"
                                            color="sky-500"
                                            className="xs:m-0 m-0.5"
                                        >
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}
        </div>
    )
}

const GeneratedAudio = () => {
    return (
        <div>
            <GeneratedAudioCard data={generatedAudios} />
        </div>
    )
}

export default GeneratedAudio
