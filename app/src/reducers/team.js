import lev from '../assets/lev.png';
import bertPic from '../assets/bert.jpg';
import mattPic from '../assets/matt.jpg';

const initialState = {
  isLoading: false,
  data: [
    {
      id: 1,
      firstName: 'Lev',
      lastName: 'Tobias',
      homeland: 'Juneau, Alaska',
      nickname: '',
      bio: '',
      paramName: 'lev-tobias',
      profilePicture: {
        image: lev,
        direction: 'right',
      },
    },
    {
      id: 2,
      firstName: 'Bertrand',
      lastName: 'Vidal',
      homeland: 'Orleans, France',
      nickname: '',
      bio: '',
      paramName: 'bert-vidal',
      profilePicture: {
        image: bertPic,
        direction: 'right',
      },
    },
    {
      id: 3,
      firstName: 'Matthew',
      lastName: 'Costabile',
      homeland: 'Valhalla, New York',
      nickname: '',
      bio: '',
      paramName: 'matthew-costabile',
      profilePicture: {
        image: mattPic,
        direction: 'left',
      },
    },
  ],
};

export default function teamReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
