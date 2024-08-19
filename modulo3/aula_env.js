import http from 'k6/http';
import { check }  from 'k6';

export const options = {
    vus: 1,
    duration: '3s'
}
const id = 7;

export default function () {
    const BASE_URL = __ENV.URL;

    const res = http.get(BASE_URL);

    check(res, {
        'status code é 200': (r) => r.status === 200
    });
}