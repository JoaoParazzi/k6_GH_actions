 import http from 'k6/http';
  
export const options ={
    scenarios:{
        contacts: {
            executor: 'shared-iterations',
            vus: 10,
            iterations: 200,
            maxDuration: '30s',
        },
    },
};

export default function(){
    http.get('https://test.k6.io/contacts.php')
}
