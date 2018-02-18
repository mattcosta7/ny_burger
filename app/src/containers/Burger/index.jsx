import React from 'react';
import { connect } from 'react-redux';
import BurgerComp from '../../components/Burger';
import hotLoader from '../../helpers/hotloader-helper';

class Burger extends React.Component {
  render() {
    return <BurgerComp {...this.props.burger} />;
  }
}

const mapStateToProps = (state, props) => {
  console.log(state, props);
  const burger = state.burger.data.find(burg => burg.id === props.match.params.burger_id);
  return {
    burger,
  };
};
const SmartBurger = connect(mapStateToProps)(Burger);

export default hotLoader(module, SmartBurger);
