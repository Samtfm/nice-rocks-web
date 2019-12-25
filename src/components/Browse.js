import React, { useState } from 'react';
import styles from './Browse.scss';
import RockModal from "./RockModal"
import RockPreview from "./RockPreview"
import FilterButtons from "./FilterButtons"
import { useDispatch, useSelector } from "react-redux";
import { fetchRecievedRocks } from "../store/actions/rocks";

const groupRocksByUser = (rocks) => {
  const userGroupsMap = {}
  rocks.forEach(rock => {
    if (!userGroupsMap[rock.fromUser]) {
      userGroupsMap[rock.fromUser] = {
        userId: rock.fromUser,
        rocks: [],
      }
    }
    userGroupsMap[rock.fromUser].rocks.push(rock)
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

  const [viewingRock, setViewingRock] = useState(null);

  const dispatch = useDispatch();

  const groupedRocks = groupRocksByUser(Object.values(rocks));
  if (!Object.keys(rocks).length) {
    dispatch(fetchRecievedRocks())
  }
  return (
    <div>
    <h1 className={styles["page-title"]}>All rocks</h1>
    {groupedRocks.map(group => (
      <section key={group.userId}>
      <h2 className={styles["sender-name"]}>from {users[group.userId] && users[group.userId].displayName}</h2>
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
