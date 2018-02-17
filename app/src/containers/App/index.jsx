import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import Navigation from '../../components/Layout/Navigation';
import Header from '../../components/Layout/Header';

import Styles from './style.scss';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        <Header />
        <section className={Styles.appBody}>{renderRoutes(this.props.route.routes)}</section>
        <footer />
      </React.Fragment>
    );
  }
}

const SmartApp = connect(state => ({ todos: state.todos }))(App);

export default (process.env.NODE_ENV !== 'production' ? hot(module)(SmartApp) : SmartApp);
