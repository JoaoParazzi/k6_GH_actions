import http from 'k6/http';

export const options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 30,
      duration: '30s',
      timeunit: '1s',
      preAllocatedVUs: 50,
    },
  },
};

export default function () {
  http.get('https://test.k6.io/contacts.php');
}
