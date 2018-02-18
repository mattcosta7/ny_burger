function sortedUniqueData(state, data) {
  return state
    .concat(data)
    .reduce((acc, item) => {
      const index = acc.findIndex(burger => burger.id === item.id);
      if (index > -1) return [...acc.slice(0, index), item, ...acc.slice(index + 1)];
      return acc.concat([item]);
    }, [])
    .sort((a, b) => {
      if (a.takenAt > b.takenAt) return -1;
      else if (b.takenAt > a.takenAt) return 1;
      return 0;
    });
}

export default function burgerReducer(
  state = {
    loading: false,
    data: [],
    cursor: null,
  },
  action
) {
  switch (action.type) {
    case 'BURGERS_LOADED':
      return {
        ...state,
        loading: false,
        data: sortedUniqueData(state.data, action.payload.data),
        cursor: action.payload.cursor,
      };
    case 'BURGER_LOADING':
      return {
        ...state,
        loading: state.data.length === 0,
        cursor: null,
      };
    default:
      return state;
  }
}
