import React from 'react';
import styles from './FilterButtons.scss';
import { useDispatch, useSelector } from "react-redux";
import { fetchRecievedRocks } from "../store/actions/rocks";

const FilterButtons = () => {
  const rocks = useSelector(state => state.rocks);
  const dispatch = useDispatch();
  return (
    <div>
      <div>Rocks</div>
      <button onClick={() => dispatch(fetchRecievedRocks())}>get rocks</button>
    </div>
  );
}

export default FilterButtons;
