import React, { useState, useEffect } from 'react';
import styles from './Browse.scss';
import RockModal from "./RockModal"
import RockPreview from "./RockPreview"
import FilterButtons from "./FilterButtons"
import { useDispatch, useSelector } from "react-redux";
import { fetchRecievedRocks, fetchSentRocks } from "../store/actions/rocks";
import PullToRefresh from "./PullToRefresh"

// get sent rocks from redux store
const getSentRocks = (allRocks, userId) => {
  return Object.values(allRocks).filter(rock => {
    return rock.fromUser == userId
  })
}

// get recieved rocks from redux store
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
  const fetchRocks = viewSent ? fetchSentRocks : fetchRecievedRocks;
  const getRocks = viewSent ? getSentRocks : getRecievedRocks;
  const filterKey = viewSent ? 'toUser' : 'fromUser';

  const [viewingRock, setViewingRock] = useState(null);

  const dispatch = useDispatch();
  let groupedRocks = []

  //on first render only
  useEffect(() => {
    dispatch(fetchRocks())
  }, [])

  groupedRocks = groupRocksByAttr(getRocks(rocks, currentUser.id), filterKey);

  const refresh = () => {
    return new Promise((resolve, reject) => {
      dispatch(fetchRocks(true)).then(resolve)
    })
  }
  return (
    <div>
      <button onClick={() => setViewSent(!viewSent)}>{viewSent ? "View Recieved" : "View Sent"}</button>
      <PullToRefresh onRefresh={refresh}>
        <h1 className={styles["page-title"]}>{viewSent ? "Sent Rocks": "Recieved Rocks"}</h1>
        {groupedRocks.map(group => (
          <section key={group.fromUser || group.toUser}>
            <h2 className={styles["sender-name"]}>
              {viewSent ? "to " : "from "}
              {users[group[filterKey]] && users[group[filterKey]].displayName}
            </h2>
            <ul>
              {group.rocks.map((rock,index) => (
                <li key={rock.id} onClick={ () => setViewingRock(rock) }>
                <RockPreview rock={rock}/>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </PullToRefresh>
      {viewingRock && (
        <RockModal rock={viewingRock} visible={Boolean(viewingRock)} handleClose={() => setViewingRock(null)}/>
      )}
    </div>
  );
}

export default Browse;
