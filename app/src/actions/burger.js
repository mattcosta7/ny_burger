import { fetchBurgers, fetchLatestBurger } from '../api/burgers';
// eslint-disable-next-line import/prefer-default-export
export function getBurgerDataIG({ cursor = null } = {}) {
  return (dispatch) => {
    dispatch({ type: 'BURGER_LOADING' });
    fetchBurgers({ cursor }).then((data) => {
      dispatch({
        type: 'BURGERS_LOADED',
        payload: {
          data: data.media,
          cursor: data.page_info.has_next_page && `"${data.page_info.end_cursor}"`,
        },
      });
    });
  };
}

export function getLatestBurgerIG() {
  return (dispatch) => {
    dispatch({ type: 'BURGER_LOADING' });
    fetchLatestBurger().then((data) => {
      dispatch({
        type: 'BURGERS_LOADED',
        payload: {
          data: data.media,
          cursor: data.page_info.has_next_page && `"${data.page_info.end_cursor}"`,
        },
      });
    });
  };
}
