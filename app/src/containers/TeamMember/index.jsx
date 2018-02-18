import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import classnames from 'classnames';
import hotReload from '../../helpers/hotloader-helper';
import Styles from './styles.scss';

class TeamMember extends React.Component {
  render() {
    return (
      <div className={Styles['team-member-container']}>
        <Helmet>
          <title>{`New York Burger Blog | Team | ${this.props.name}`}</title>
        </Helmet>
        <div
          className={classnames(
            Styles['team-member'],
            this.props.profilePicture.direction === 'left' && Styles.left
          )}
        >
          <img
            src={this.props.profilePicture.image}
            alt={`${this.props.firstName} ${this.props.lastName}`}
          />
          <div>{this.props.firstName}</div>
        </div>
      </div>
    );
  }
}

const SmartTeamMember = connect((state, props) => {
  const teamMember = state.team.data.find(tm => tm.paramName === props.match.params.paramName);
  if (!teamMember) return {};
  return {
    ...teamMember,
  };
})(TeamMember);

export default hotReload(module, SmartTeamMember);
