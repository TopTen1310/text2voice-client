import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
} from 'constants/navigation.constant'

const navigationConfig = [
    {
        key: 'home',
        path: '/home',
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'textToVoice',
        path: '/text-to-voice',
        title: 'Text to Voice',
        translateKey: 'nav.textToVoice',
        icon: 'textToVoice',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'voiceToText',
        path: '/voice-to-text',
        title: 'Voice To Text',
        translateKey: 'nav.voiceToText',
        icon: 'voiceCloning',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'voiceCloning',
        path: '/voice-cloning',
        title: 'Voice Cloning',
        translateKey: 'nav.voiceCloning',
        icon: 'voiceCloning',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },

    {
        key: 'manage',
        path: '',
        title: 'Manage',
        translateKey: 'nav.manage.manage',
        icon: '',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [],
        subMenu: [
            {
                key: 'manage.single',
                path: '/manage-billing?id=8',
                title: 'Billing',
                translateKey: 'nav.manage.billing',
                icon: 'billing',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [],
                subMenu: [],
            },
        ],
    },
]

export default navigationConfig
