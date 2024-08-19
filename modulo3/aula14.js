import http from 'k6/http';
import { Counter} from 'k6/metrics';
import { Gauge } from 'k6/metrics';
import { Rate } from 'k6/metrics';
import { Trend } from 'k6/metrics';
import { check }  from 'k6';

export const options = {
    vus: 20,
    duration: '30s'
}

const chamadas = new Counter('quantidade_chamadas');
const myGauge = new Gauge('Tempo_bloqueado');
const myRate = new Rate('taxa_req_200');
const myTrend = new Trend('taxa_de_espera');

export default function () {
    const req = http.get('http://test.k6.io/');

    check(req,{
        'status code é 200': (r) => r.status === 200
    });

    //contador
    chamadas.add(1);
    //medidor
    myGauge.add(req.timings.blocked);
    //taxa
    myRate.add(req.status === 200);
    //tendencia
    myTrend.add(req.timings.waiting);
}