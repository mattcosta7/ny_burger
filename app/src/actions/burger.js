import { fetchBurgers } from '../api/burgers';
// eslint-disable-next-line import/prefer-default-export
export function getBurgerDataIG({ cursor = null } = {}) {
  return (dispatch) => {
    dispatch({ type: 'BURGER_LOADING' });
    fetchBurgers({ cursor }).then((data) => {
      const { page_info, edges } = data.user.edge_owner_to_timeline_media;
      if (!edges || !edges.length) return {};
      const media = edges.map(({ node }) => ({
        id: node.id,
        description:
          node.edge_media_to_caption.edges[0] && node.edge_media_to_caption.edges[0].node.text,
        image: node.display_url,
        thumbnails: [...node.thumbnail_resources],
        thumbnail: node.thumbnail_src,
      }));
      dispatch({
        type: 'BURGERS_LOADED',
        payload: { data: media, cursor: page_info.has_next_page && `"${page_info.end_cursor}"` },
      });
    });
  };
}
