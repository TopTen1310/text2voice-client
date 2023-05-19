import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'home',
        path: '/home',
        component: React.lazy(() => import('views/pages/Home')),
        authority: [],
    },
    /** Example purpose only, please remove */
    {
        key: 'textToVoice',
        path: '/text-to-voice',
        component: React.lazy(() => import('views/pages/TextToVoice')),
        authority: [],
    },
    {
        key: 'voiceCloning',
        path: '/voice-cloning',
        component: React.lazy(() => import('views/pages/VoiceCloning')),
        authority: [],
    },
    {
        key: 'manage.single',
        path: '/manage-billing',
        component: React.lazy(() =>
            import('views/pages/Billing/CustomerDetail')
        ),
        authority: [],
    },
]
