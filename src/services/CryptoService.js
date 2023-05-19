import ApiService from './ApiService'

export async function apiGetCryptoDashboardData() {
    return ApiService.fetchData({
        url: '/crypto/dashboard',
        method: 'get',
    })
}

export async function apiGetPortfolioData() {
    return ApiService.fetchData({
        url: '/crypto/portfolio',
        method: 'get',
    })
}

export async function apiGetWalletData() {
    return ApiService.fetchData({
        url: '/crypto/wallets',
        method: 'get',
    })
}

export async function apiGetTransctionHistoryData(data) {
    return ApiService.fetchData({
        url: '/crypto/wallets/history',
        method: 'post',
        data,
    })
}

export async function apiGetMarketyData(data) {
    return ApiService.fetchData({
        url: '/crypto/market',
        method: 'post',
        data,
    })
}
