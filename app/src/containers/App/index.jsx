import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';

import Navigation from '../../components/Layout/Navigation';
import Header from '../../components/Layout/Header';

import hotReload from '../../helpers/hotloader-helper';

import Styles from './style.scss';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navigation />
        {/* <Header /> */}
        <section className={Styles.appBody}>{renderRoutes(this.props.route.routes)}</section>
        <footer />
      </React.Fragment>
    );
  }
}

const SmartApp = connect(state => ({ todos: state.todos }))(App);

export default hotReload(module, SmartApp);
