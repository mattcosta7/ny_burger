import fetch from 'isomorphic-fetch';

const domain = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '';
export function fetchBurgers({ cursor }) {
  return fetch(`${domain}/api/v1/instagram-data?cursor=${cursor}`)
    .then(res => res.json())
    .then(res => res.data);
}

export function fetchLatestBurger() {
  return fetch(`${domain}/api/v1/instagram-data/latest`)
    .then(res => res.json())
    .then(res => res.data);
}
