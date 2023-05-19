import React from 'react'
import { Card, Button, Select, Tooltip } from 'components/ui'

import { projectLists } from '../../../constants/data.js'
import { MdAddTask, MdDeleteOutline } from 'react-icons/md'

const Functions = () => {
    return (
        <Card className="w-full">
            <div className="flex justify-between text-xs">
                <div className="flex flex-1 gap-2 items-center">
                    <Button size="xs" variant="solid" color="sky-500">
                        Delete Selected
                    </Button>
                    <Button size="xs" variant="solid" color="sky-500">
                        Merge Selected
                    </Button>
                    <Button size="xs" variant="solid" color="sky-500">
                        Select All
                    </Button>
                </div>
                <div className="flex items-center gap-2">
                    <span>Project</span>
                    <Select
                        size="sm"
                        options={projectLists}
                        defaultValue={projectLists[0]}
                        className="w-32"
                    />
                    <Tooltip
                        title={
                            <div className="text-xs">Create a new Project</div>
                        }
                    >
                        <Button size="xs" variant="solid" color="sky-500">
                            <MdAddTask />
                        </Button>
                    </Tooltip>
                    <Tooltip
                        title={
                            <div className="text-xs">
                                Delete selected project
                            </div>
                        }
                    >
                        <Button size="xs" variant="solid" color="sky-500">
                            <MdDeleteOutline />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        </Card>
    )
}

export default Functions
