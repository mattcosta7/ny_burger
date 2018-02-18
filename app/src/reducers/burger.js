export default function burgerReducer(
  state = {
    loading: false,
    data: [],
  },
  action
) {
  switch (action.type) {
    case 'BURGERS_LOADED':
      return {
        ...state,
        loading: false,
        data: state.data.concat(action.payload.data),
      };
    case 'BURGER_LOADING':
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
