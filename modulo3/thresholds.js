import http from 'k6/http';
import { check } from 'k6';

// são utilizaados como critério de aceite ou reprovação


export const options = {
    vus: 2,
    duration: '3s',
    thresholds: {
        http_req_failed: ['rate < 0.01'],
        http_req_duration: [{threshold:'p(95) < 200', AbortOnFail : true}],
        checks: ['rate > 0.99']
    }
}

export default function () {
    const res = http.get('http://test.k6.io/')

    check(res, {
        'status code é 200': (r) => r.status === 200
    });
}