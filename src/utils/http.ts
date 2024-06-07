import axios from "axios";

const baseUrl =  import.meta.env.VITE_API_BASE || 'http://127.0.0.1:8000'

// 测试
export const testGet = async() => {
    let { data } = await axios.get(`${baseUrl}/api`)
    return data
}

export const uploadFile = async(params: any) => {
    let { data } = await axios.post(`${baseUrl}/api/uploadfile`, params, {
        headers: {
          'Content-Type': 'multipart/form-data',
          deviceId: `ReaderGuru-${window.userInfo.visitorId}`
        }
    })
    return data
}

export const summarizeFile = async(filename: string) => {
    let { data } = await axios.post(`${baseUrl}/api/summarize`, {
        filename,
    }, {
        timeout: 300000
    })
    return data
}

// export const grabServiceIfAvailable = async() => {
//     let { data } = await axios.get(`${baseUrl}/api/grabservice`)
//     return data
// }