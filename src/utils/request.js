import axios from 'axios'
import store from '@/store'
import { getToken, getCookie } from '@/utils/auth'

const service = axios.create({
    baseURL: 'http://localhost:54943', // uri = baseURL + apiFunction truyền tới
    timeout: 5000,
    headers: { // Request Headers
        project: 'rd-test',
        apikey: 'r6fArtu86fTvdertojf5Hferdcbhmr3U',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkQzQzMwQzhERDg2RTI4NDhCNkUwRDNGMEUyNjY3QzVDQzI0Mzg3RDQiLCJ0eXAiOiJKV1QiLCJ4NXQiOiIwOE1NamRodUtFaTI0TlB3NG1aOFhNSkRoOVEifQ.eyJuYmYiOjE2NTk2NzU0MjUsImV4cCI6MTY1OTY3OTAyNSwiaXNzIjoiaHR0cHM6Ly90ZXN0aWQubWlzYS5jb20udm4iLCJhdWQiOiJodHRwczovL3Rlc3RpZC5taXNhLmNvbS52bi9yZXNvdXJjZXMiLCJjbGllbnRfaWQiOiIzOTVjYmY0Mi1kZGFmLTQ3ZWYtYWQwNS03YmU1Zjc0YzMzMDkiLCJzdWIiOiJjN2JmYWU5Mi1hZTkwLTQ2NjMtOGI1OS0yZmE1NTgxYjZhZTAiLCJhdXRoX3RpbWUiOjE2NTk2NzU0MjQsImlkcCI6Ikdvb2dsZSIsIm1pc2FpZCI6ImM3YmZhZTkyLWFlOTAtNDY2My04YjU5LTJmYTU1ODFiNmFlMCIsInVzZXJuYW1lIjoiZGluaHBodXF1eTIwMDFAZ21haWwuY29tIiwiZW1haWwiOiJkaW5ocGh1cXV5MjAwMUBnbWFpbC5jb20iLCJwaG9uZV9udW1iZXIiOiIwNzc3Mzc1MzQwIiwiY3VsdHVyZSI6InZpLVZOIiwiZmlyc3RfbmFtZSI6IlF1eSIsImxhc3RfbmFtZSI6IlBodSIsInNjb3BlIjpbIm9wZW5pZCJdLCJhbXIiOlsiZXh0ZXJuYWwiXX0.5LWaIECS4nqJUp0xep5Ws1Z4tUGn6tDIYTzVmG5qzE0IX1LKv1kyfFxJ18Yp-NvA-z5wnRQAWihb7ZJ_03iApLVjw_2EHS0S_18Fc7JukjOOawlh8FrTjzpmMRPAId9KqL6wpS2ys8BRSKd_AGXAgxMWJBl7811n29gs7GRDTLUwWJmelH1nmUZJ-Op5MKANlTtCabiPylWxLewu6wW2Wxdo_3hv--1Ba9srKBYeZahZCLI9870B0dJa3V_w5xxyhQLKBKgRhblZfMvjzkl2_4wOem6hm-rH79NmiLVZ-meoodsYy9WBG65RFWV06Fukfv42pGfnQdUwdslUZT4unQ',
        'content-type': 'application/json'
    }
})

service.interceptors.request.use(
    config => {
        if (store.getters.token) {
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        console.log('error', error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service