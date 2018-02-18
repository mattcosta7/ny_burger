import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Burger from '../../components/Burger';
import { getLatestBurgerIG } from '../../actions/burger';
import hotLoader from '../../helpers/hotloader-helper';

class Home extends React.Component {
  componentDidMount() {
    this.props.getLatestBurgerIG();
  }
  render() {
    return (
      <main>
        <header>Welcome to the New York Burger Blog</header>
        <section>
          Taking on NYC one Burger at a time. With a cast of Burger experts telling you what you
          need to put in your mouth across the city.
        </section>
        {this.props.latestBurger && (
          <section>
            <h3>Latest Burger</h3>
            <Burger {...this.props.latestBurger} />
            <Link to="/burgers">view all burgers</Link>
          </section>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  latestBurger: state.burger.data[0],
});

const mapDispatchToProps = {
  getLatestBurgerIG,
};

const SmartHome = connect(mapStateToProps, mapDispatchToProps)(Home);

export default hotLoader(module, SmartHome);
