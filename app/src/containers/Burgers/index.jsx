import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import hotLoader from '../../helpers/hotloader-helper';
import { getBurgerDataIG } from '../../actions/burger';

class Burgers extends React.Component {
  constructor(props) {
    super(props);
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
  }
  componentDidMount() {
    if (!this.props.burgers || !this.props.burgers.length) this.props.getBurgerDataIG();
  }
  handleNextPageClick() {
    if (this.props.cursor) {
      this.props.getBurgerDataIG({ cursor: this.props.cursor });
    }
  }
  render() {
    if (this.props.isLoading) return <div>... loading </div>;
    return (
      <div>
        <h1> Burger Feed </h1>
        {renderRoutes(this.props.route.routes, { burgers: this.props.burgers })}
        {this.props.cursor && <button onClick={this.handleNextPageClick}>View Older</button>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.burger.loading,
  burgers: state.burger.data,
  cursor: state.burger.cursor,
});

const mapDispatchToProps = {
  getBurgerDataIG,
};
const SmartBurgers = connect(mapStateToProps, mapDispatchToProps)(Burgers);

export default hotLoader(module, SmartBurgers);
