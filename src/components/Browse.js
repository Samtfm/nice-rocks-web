import React, { useState } from 'react';
import styles from './Browse.scss';
import RockModal from "./RockModal"
import RockPreview from "./RockPreview"
import FilterButtons from "./FilterButtons"
import { useDispatch, useSelector } from "react-redux";
import { fetchRecievedRocks, fetchSentRocks } from "../store/actions/rocks";

const getSentRocks = (allRocks, userId) => {
  return Object.values(allRocks).filter(rock => {
    return rock.fromUser == userId
  })
}

const getRecievedRocks = (allRocks, userId) => {
  return Object.values(allRocks).filter(rock => {
    return rock.toUser == userId
  })
}

const groupRocksByAttr = (rocks, attr) => {
  const userGroupsMap = {}
  rocks.forEach(rock => {
    if (!userGroupsMap[rock[attr]]) {
      userGroupsMap[rock[attr]] = {
        [attr]: rock[attr],
        rocks: [],
      }
    }
    userGroupsMap[rock[attr]].rocks.push(rock)
  })
  return Object.values(userGroupsMap)
}

const Browse = () => {
  const rocks = useSelector(
    state => state.rocks,
    (a, b) => Object.values(a) == Object.values(b),
  );
  const users = useSelector(
    state => state.users,
  );
  const currentUser = useSelector(
    state => state.session.currentUser,
  );

  const [viewSent, setViewSent] = useState(false);

  const [viewingRock, setViewingRock] = useState(null);

  const dispatch = useDispatch();
  let groupedRocks = []
  if (viewSent) {
    dispatch(fetchSentRocks())
    groupedRocks = groupRocksByAttr(getSentRocks(rocks, currentUser.id), 'toUser');
  } else {
    dispatch(fetchRecievedRocks())
    groupedRocks = groupRocksByAttr(getRecievedRocks(rocks, currentUser.id), 'fromUser');
  }
  
  return (
    <div>
      <button onClick={() => setViewSent(!viewSent)}>{viewSent ? "View Recieved" : "View Sent"}</button>
      <h1 className={styles["page-title"]}>{viewSent ? "Sent Rocks": "Recieved Rocks"}</h1>
      {groupedRocks.map(group => (
        <section key={group.fromUser || group.toUser}>
        {viewSent ? (
          <h2 className={styles["sender-name"]}>to {users[group.toUser] && users[group.toUser].displayName}</h2>
        ) : (
          <h2 className={styles["sender-name"]}>from {users[group.fromUser] && users[group.fromUser].displayName}</h2>
        )}
        <ul>
        {group.rocks.map((rock,index) => (
          <li key={rock.id} onClick={ () => setViewingRock(rock) }>
          <RockPreview rock={rock}/>
          </li>
        ))}
        </ul>
        </section>
      ))}
      {viewingRock && (
        <RockModal rock={viewingRock} visible={Boolean(viewingRock)} handleClose={() => setViewingRock(null)}/>
      )}
    </div>
  );
}

export default Browse;
