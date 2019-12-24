import React from 'react';
import styles from './Browse.scss';
import RockModal from "./RockModal"
import RockPreview from "./RockPreview"
import FilterButtons from "./FilterButtons"
import { withFirebase } from './FirebaseProvider';

const groupRocksByUser = (rocks) => {
  const userGroupsMap = {}
  rocks.forEach(rock => {
    if (!userGroupsMap[rock.fromUser.id]) {
      userGroupsMap[rock.fromUser.id] = {
        fromUser: rock.fromUser,
        rocks: [],
      }
    }
    userGroupsMap[rock.fromUser.id].rocks.push(rock)
  })
  return Object.values(userGroupsMap)
}


class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      viewingRock: null,
      recievedRocks: [],
    }
  }

  componentDidMount(){
    const { firestoreConnection, currentUser, localStore } = this.props.firebase;
    if (!currentUser) {
      return;
    }
    console.log(currentUser.uid)
    firestoreConnection.getRocks("toUser", "==", currentUser.uid).then(rocks => {
      this.setState({
        recievedRocks: rocks,
      });
    });
  }

  viewRock = (rock) => {
    this.setState({
      viewingRock: rock
    })
  }

  hideRockModal = () => {
    this.setState({
      viewingRock: null
    })
  }

  render() {
    const { viewingRock, recievedRocks } = this.state;
    const groupedRocks = groupRocksByUser(recievedRocks);
    return (
      <div>
        <FilterButtons />
        <h1 className={styles["page-title"]}>All rocks</h1>
        {groupedRocks.map(group => (
          <section key={group.fromUser.id}>
            <h2 className={styles["sender-name"]}>from {group.fromUser.displayName}</h2>
            <ul>
              {group.rocks.map((rock,index) => (
                <li key={rock.id} onClick={ () => this.viewRock(rock) }>
                  <RockPreview rock={rock}/>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {viewingRock && (
          <RockModal rock={viewingRock} visible={Boolean(viewingRock)} handleClose={this.hideRockModal}/>
        )}
      </div>
    );
  }
}

export default withFirebase(Browse);
