import React, { useEffect, useState, useCallback } from 'react'
import classNames from 'classnames'
import withHeaderItem from 'utils/hoc/withHeaderItem'
import {
    Avatar,
    Dropdown,
    ScrollBar,
    Spinner,
    Badge,
    Button,
    Tooltip,
} from 'components/ui'
import {
    HiOutlineBell,
    HiOutlineCalendar,
    HiOutlineClipboardCheck,
    HiOutlineBan,
    HiOutlineMailOpen,
} from 'react-icons/hi'
import {
    apiGetNotificationList,
    apiGetNotificationCount,
} from 'services/CommonService'
import { Link } from 'react-router-dom'
import isLastChild from 'utils/isLastChild'
import useTwColorByName from 'utils/hooks/useTwColorByName'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useSelector } from 'react-redux'
import useResponsive from 'utils/hooks/useResponsive'
import acronym from 'utils/acronym'

const notificationHeight = 'h-72'
const imagePath = '/img/avatars/'

const GeneratedAvatar = ({ target }) => {
    const color = useTwColorByName()
    return (
        <Avatar shape="circle" className={`${color(target)}`}>
            {acronym(target)}
        </Avatar>
    )
}

const notificationTypeAvatar = (data) => {
    const { type, target, image, status } = data
    switch (type) {
        case 0:
            if (image) {
                return <Avatar shape="circle" src={`${imagePath}${image}`} />
            } else {
                return <GeneratedAvatar target={target} />
            }
        case 1:
            return (
                <Avatar
                    shape="circle"
                    className="bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-100"
                    icon={<HiOutlineCalendar />}
                />
            )
        case 2:
            const statusSucceed = status === 'succeed'
            const statusColor = statusSucceed
                ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-100'
                : 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-100'
            const statusIcon = statusSucceed ? (
                <HiOutlineClipboardCheck />
            ) : (
                <HiOutlineBan />
            )
            return (
                <Avatar
                    shape="circle"
                    className={statusColor}
                    icon={statusIcon}
                />
            )
        default:
            return <Avatar />
    }
}

const NotificationToggle = ({ className, dot }) => {
    return (
        <div className={classNames('text-2xl', className)}>
            {dot ? (
                <Badge badgeStyle={{ top: '3px', right: '6px' }}>
                    <HiOutlineBell />
                </Badge>
            ) : (
                <HiOutlineBell />
            )}
        </div>
    )
}

export const Notification = ({ className }) => {
    const [notificationList, setNotificationList] = useState([])
    const [unreadNotification, setUnreadNotification] = useState(false)
    const [noResult, setNoResult] = useState(false)
    const [loading, setLoading] = useState(false)

    const { bgTheme } = useThemeClass()

    const { larger } = useResponsive()

    const direction = useSelector((state) => state.theme.direction)

    const getNotificationCount = useCallback(async () => {
        const resp = await apiGetNotificationCount()
        if (resp.data.count > 0) {
            setNoResult(false)
            setUnreadNotification(true)
        } else {
            setNoResult(true)
        }
    }, [setUnreadNotification])

    useEffect(() => {
        getNotificationCount()
    }, [getNotificationCount])

    const onNotificationOpen = useCallback(async () => {
        if (notificationList.length === 0) {
            setLoading(true)
            const resp = await apiGetNotificationList()
            setLoading(false)
            setNotificationList(resp.data)
        }
    }, [notificationList, setLoading])

    const onMarkAllAsRead = useCallback(() => {
        const list = notificationList.map((item) => {
            if (!item.readed) {
                item.readed = true
            }
            return item
        })
        setNotificationList(list)
        setUnreadNotification(false)
    }, [notificationList])

    const onMarkAsRead = useCallback(
        (id) => {
            const list = notificationList.map((item) => {
                if (item.id === id) {
                    item.readed = true
                }
                return item
            })
            setNotificationList(list)
            const hasUnread = notificationList.some((item) => !item.readed)

            if (!hasUnread) {
                setUnreadNotification(false)
            }
        },
        [notificationList]
    )

    return (
        <Dropdown
            renderTitle={
                <NotificationToggle
                    dot={unreadNotification}
                    className={className}
                />
            }
            menuClass="p-0 min-w-[280px] md:min-w-[340px]"
            placement={larger.md ? 'bottom-end' : 'bottom-center'}
            onOpen={onNotificationOpen}
        >
            <Dropdown.Item variant="header">
                <div className="border-b border-gray-200 dark:border-gray-600 px-4 py-2 flex items-center justify-between">
                    <h6>Notifications</h6>
                    <Tooltip title="Mark all as read">
                        <Button
                            variant="plain"
                            shape="circle"
                            size="sm"
                            icon={<HiOutlineMailOpen className="text-xl" />}
                            onClick={onMarkAllAsRead}
                        />
                    </Tooltip>
                </div>
            </Dropdown.Item>
            <div className={classNames('overflow-y-auto', notificationHeight)}>
                <ScrollBar direction={direction}>
                    {notificationList.length > 0 &&
                        notificationList.map((item, index) => (
                            <div
                                key={item.id}
                                className={`relative flex px-4 py-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-black dark:hover:bg-opacity-20  ${
                                    !isLastChild(notificationList, index)
                                        ? 'border-b border-gray-200 dark:border-gray-600'
                                        : ''
                                }`}
                                onClick={() => onMarkAsRead(item.id)}
                            >
                                <div>{notificationTypeAvatar(item)}</div>
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <div>
                                        {item.target && (
                                            <span className="font-semibold heading-text">
                                                {item.target}{' '}
                                            </span>
                                        )}
                                        <span>{item.description}</span>
                                    </div>
                                    <span className="text-xs">{item.date}</span>
                                </div>
                                <Badge
                                    className="absolute top-4 ltr:right-4 rtl:left-4 mt-1.5"
                                    innerClass={`${
                                        item.readed ? 'bg-gray-300' : bgTheme
                                    } `}
                                />
                            </div>
                        ))}
                    {loading && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <Spinner size={40} />
                        </div>
                    )}
                    {noResult && (
                        <div
                            className={classNames(
                                'flex items-center justify-center',
                                notificationHeight
                            )}
                        >
                            <div className="text-center">
                                <img
                                    className="mx-auto mb-2 max-w-[150px]"
                                    src="/img/others/no-notification.png"
                                    alt="no-notification"
                                />
                                <h6 className="font-semibold">
                                    No notifications!
                                </h6>
                                <p className="mt-1">Please Try again later</p>
                            </div>
                        </div>
                    )}
                </ScrollBar>
            </div>
            <Dropdown.Item variant="header">
                <div className="flex justify-center border-t border-gray-200 dark:border-gray-600 px-4 py-2">
                    <Link
                        to="/app/account/activity-log"
                        className="font-semibold cursor-pointer p-2 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-200 dark:hover:text-white"
                    >
                        View All Activity
                    </Link>
                </div>
            </Dropdown.Item>
        </Dropdown>
    )
}

export default withHeaderItem(Notification)
