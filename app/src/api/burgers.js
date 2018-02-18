import fetch from 'isomorphic-fetch';

export function fetchBurgers({ cursor }) {
  return fetch(`http://localhost:3000/api/v1/instagram-data?cursor=${cursor}`)
    .then(res => res.json())
    .then(res => res.data);
}

export function fetchLatestBurger() {
  return fetch('http://localhost:3000/api/v1/instagram-data/latest')
    .then(res => res.json())
    .then(res => res.data);
}
