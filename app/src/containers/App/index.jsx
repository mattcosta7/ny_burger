import React from 'react';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Helmet from 'react-helmet';

import Navigation from '../../components/Layout/Navigation';
import Header from '../../components/Layout/Header';

import hotReload from '../../helpers/hotloader-helper';

import favicon from '../../assets/favicon/favicon.ico';
import favicon32 from '../../assets/favicon/favicon-32x32.png';
import favicon16 from '../../assets/favicon/favicon-16x16.png';
import safariPinnedTab from '../../assets/favicon/safari-pinned-tab.svg';
import appleTouchFavicon from '../..//assets/favicon/apple-touch-icon.png';
import msConfig from '../../assets/favicon/browserconfig.xml';

import Styles from './style.scss';

class App extends React.Component {
  render() {
    return (
      <div className={Styles['app-body-container']}>
        <Helmet defaultTitle="New York Burger Blog" titleTemplate="New York Burger Blog | %s">
          <meta httpEquiv="Content-type" content="text/html; charset=utf-8" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="apple-touch-icon" sizes="144x144" href={`${appleTouchFavicon}`} />
          <link rel="icon" type="image/png" sizes="32x32" href={`${favicon32}`} />
          <link rel="icon" type="image/png" sizes="16x16" href={`${favicon16}`} />
          <link rel="mask-icon" href={`${safariPinnedTab}`} color="#5bbad5" />
          <link rel="shortcut icon" href={`${favicon}`} />
          {/* <link rel="manifest" href={}> */}
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content={`"${msConfig}"`} />
          <meta name="theme-color" content="#ffffff" />
          <base target="_blank" href="//localhost:3001" />
        </Helmet>
        <Navigation />
        <div>
          <section className={Styles['app-body']}>{renderRoutes(this.props.route.routes)}</section>
          <footer />
        </div>
      </div>
    );
  }
}

const SmartApp = connect(state => ({ todos: state.todos }))(App);

export default hotReload(module, SmartApp);
