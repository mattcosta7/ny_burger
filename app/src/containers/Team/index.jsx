import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import hotReload from '../../helpers/hotloader-helper';
import TeamMemberThumb from '../../components/TeamMemberThumb';
import Styles from './styles.scss';

const fetchTeamMembers = () => ({
  type: 'TYPE',
  payload: {},
});
class Team extends React.Component {
  render() {
    if (this.props.isLoading || !this.props.teamMembers) {
      return <div> is loading </div>;
    }
    return (
      <main>
        <Helmet>
          <title>Team</title>
        </Helmet>
        {renderRoutes(this.props.route.routes, { teamMembers: this.props.teamMembers })}
        <ul className={Styles['team-members-list']}>
          {this.props.teamMembers.map(member => (
            <TeamMemberThumb
              key={member.id}
              name={`${member.firstName} ${member.lastName}`}
              homeland={member.homeland}
              nickname={member.nickname}
              paramName={member.paramName}
              profilePicture={member.profilePicture.image}
            />
          ))}
        </ul>
      </main>
    );
  }
}
const mapStateToProps = (state, props) => ({
  teamMembers: state.team.data.filter(teamMember => !props.location.pathname.includes(teamMember.paramName)),
  isLoading: state.team.isLoading,
});
const mapDispatchToProps = {
  fetchTeamMembers,
};
const SmartTeam = connect(mapStateToProps, mapDispatchToProps)(Team);

export default hotReload(module, SmartTeam);
