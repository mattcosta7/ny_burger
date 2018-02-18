import React from 'react';
import { Link } from 'react-router-dom';
import hotReload from '../../helpers/hotloader-helper';
import Styles from './styles.scss';

class TeamMemberThumb extends React.Component {
  render() {
    return (
      <li className={Styles['team-member']}>
        <Link to={`/team/${this.props.paramName}`}>
          <div
            className={Styles.thumb}
            style={{
              backgroundImage: `url(${this.props.profilePicture})`,
            }}
          >
            <div className={Styles['team-member-description-container']}>
              <h3 className={Styles['team-member-description']}>
                {this.props.memberId} {this.props.homeland} {this.props.nickname}
              </h3>
            </div>
          </div>
          <h2 className={Styles['team-member-name']}>{this.props.name}</h2>
        </Link>
      </li>
    );
  }
}

export default hotReload(module, TeamMemberThumb);
