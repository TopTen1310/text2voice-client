export const getPlacementTransition = ({
    offsetX,
    offsetY,
    placement,
    transitionType,
}) => {
    if (transitionType === 'scale') {
        return scaleTransition(offsetX, offsetY)[placement]
    }

    if (transitionType === 'fade') {
        return fadeTransition(offsetX, offsetY)[placement]
    }
}

const scaleMotionProps = {
    initial: {
        opacity: 0,
        transform: 'scale(0.75)',
    },
    animate: {
        transform: 'scale(1)',
        opacity: 1,
    },
    exit: {
        opacity: 0,
        transform: 'scale(0.75)',
    },
}

const fadeMotionProps = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
}

const scaleTransition = (offsetX, offsetY) => {
    return {
        'top-end': {
            default: {
                top: offsetY,
                right: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'top-start': {
            default: {
                top: offsetY,
                left: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'top-center': {
            default: {
                top: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-end': {
            default: {
                bottom: offsetY,
                right: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-start': {
            default: {
                bottom: offsetY,
                left: offsetX,
            },
            variants: {
                ...scaleMotionProps,
            },
        },
        'bottom-center': {
            default: {
                bottom: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...scaleMotionProps,
            },
        },
    }
}

const fadeTransition = (offsetX, offsetY) => {
    return {
        'top-end': {
            default: {
                top: offsetY,
                right: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'top-start': {
            default: {
                top: offsetY,
                left: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'top-center': {
            default: {
                top: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-end': {
            default: {
                bottom: offsetY,
                right: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-start': {
            default: {
                bottom: offsetY,
                left: offsetX,
            },
            variants: {
                ...fadeMotionProps,
            },
        },
        'bottom-center': {
            default: {
                bottom: offsetY,
                left: '50%',
                transform: 'translateX(-50%)',
            },
            variants: {
                ...fadeMotionProps,
            },
        },
    }
}
