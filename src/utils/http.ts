import axios from "axios";

const baseUrl =  import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

// 测试
export const testGet = async() => {
    let { data } = await axios.get(`${baseUrl}/api`, {
        headers: {
            lang: localStorage.getItem('language')
        }
    })
    return data
}

export const uploadFile = async(params: any, onUploadProgress: any) => {
    let { data } = await axios.post(`${baseUrl}/api/uploadFile`, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          deviceId: `ReaderGuru-${window.userInfo.visitorId}`,
          lang: localStorage.getItem('language')
        },
        onUploadProgress
    })
    return data
}

export const summarizeFile = async(filename: string) => {
    let { data } = await axios.post(`${baseUrl}/api/summarize`, {
        filename,
    }, {
        timeout: 300000,
        headers: {
            deviceId: `ReaderGuru-${window.userInfo.visitorId}`,
            lang: localStorage.getItem('language')
        }
    })
    return data
}

export const generateFileInfo = async(filename: string) => {
    let { data } = await axios.post(`${baseUrl}/api/generateFileInfo`, {
        filename,
    }, {
        timeout: 300000,
        headers: {
            deviceId: `ReaderGuru-${window.userInfo.visitorId}`,
            lang: localStorage.getItem('language')
        }
    })
    return data
}

interface QueryBook {
    filename: string;
    query: string;
}

export const queryBook = async(params: QueryBook)  => {
    const { filename, query } = params
    let { data } = await axios.post(`${baseUrl}/api/queryBook`, {
        filename,
        query
    }, {
        headers: {
            deviceId: `ReaderGuru-${window.userInfo.visitorId}`,
            lang: localStorage.getItem('language')
        }
    })
    return data
}
