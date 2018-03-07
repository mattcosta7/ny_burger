import React from 'react';
import ReactGA from 'react-ga';
import { withRouter } from 'react-router';
import { NODE_ENV, DEVELOPMENT_ENV } from '../../../config';

class Analytics extends React.Component {
  componentDidMount() {
    ReactGA.initialize('UA-115326879-1');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }
  componentDidUpdate(lastProps) {
    if (lastProps.location.pathname !== this.props.location.pathname) {
      ReactGA.set({ page: this.props.location.pathname });
      ReactGA.pageview(this.props.location.pathname);
    }
  }
  render() {
    return null;
  }
}

export default withRouter(Analytics);
