import http from 'k6/http';
import { check } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
    vus: 10,
    duration: '10s',
    thresholds: { 
        checks: ['rate > 0.99']
    }
}

export default function () {

    const res = http.get('https://test-api.k6.io/public/crocodiles/')

    check(res, {
        'status code é 200': (r) => r.status === 200
    });

}
export function handleSummary(data) {
    return {
      "index.html": htmlReport(data),
    };
  }