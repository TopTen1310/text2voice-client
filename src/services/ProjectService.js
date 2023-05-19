import ApiService from './ApiService'

export async function apiGetProjectDashboardData(params) {
    return ApiService.fetchData({
        url: '/project/dashboard',
        method: 'get',
        params,
    })
}

export async function apiGetProjectList(data) {
    return ApiService.fetchData({
        url: '/project/list',
        method: 'post',
        data,
    })
}

export async function apiPutProjectList(data) {
    return ApiService.fetchData({
        url: '/project/list/add',
        method: 'put',
        data,
    })
}

export async function apiGetScrumBoards() {
    return ApiService.fetchData({
        url: '/project/scrum-board/boards',
        method: 'post',
    })
}

export async function apiGetScrumBoardtMembers() {
    return ApiService.fetchData({
        url: '/project/scrum-board/members',
        method: 'post',
    })
}

export async function apiGetScrumBoardtTicketDetail(params) {
    return ApiService.fetchData({
        url: '/project/scrum-board/tickets/detail',
        method: 'get',
        params,
    })
}
