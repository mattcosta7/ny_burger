import fetch from 'isomorphic-fetch';

const NY_BURGER_BLOG_IG_ID = 5762816323;
const COUNT = 20;

export function fetchBurgers({ cursor }) {
  /* found this hacky query online */
  const url = `https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"${NY_BURGER_BLOG_IG_ID}","first":"${COUNT}","after":${cursor}}`;
  return fetch(url)
    .then(res => res.json())
    .then(res => res.data);
}
