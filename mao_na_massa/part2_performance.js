import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';


export const options = {
     stages:[
        { duration: '10s', target: 10 },
        { duration: '10s', target: 10 },
        { duration: '10s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(90) < 200'],
        checks: ['rate > 0.95']
    }
}

const data = new SharedArray('leitura json', function(){
    return JSON.parse(open('./dados.json')).users
});


export default function(){
    const crocodilos = data[Math.floor(Math.random() * data.length)].id

    console.log(crocodilos)

    const res = http.get(`https://test-api.k6.io/public/crocodiles/${crocodilos}`)
  
    check(res, {
        'status code é 200': (r) => r.status === 200
    });

    sleep(1)
} 


 