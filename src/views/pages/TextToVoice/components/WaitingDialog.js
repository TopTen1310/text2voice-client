import React, { useState } from 'react'
import { Button, Dialog } from 'components/ui'

const WaitingDialog = ({ dialogIsOpen, setIsOpen, isGenerating }) => {
    const onDialogOk = (e) => {
        setIsOpen(false)
    }

    const onDialogClose = (e) => {
        setIsOpen(false)
    }

    return (
        <Dialog
            isOpen={dialogIsOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
        >
            <h5 className="mb-4">Generating voice</h5>
            <p>
                {isGenerating
                    ? 'It will take a few moment. Please wait.'
                    : 'Successfully generated'}
            </p>
            <div className="text-right mt-6">
                <Button
                    variant="solid"
                    onClick={onDialogOk}
                    disabled={isGenerating}
                >
                    Okay
                </Button>
            </div>
        </Dialog>
    )
}

export default WaitingDialog
