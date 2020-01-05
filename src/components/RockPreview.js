import React from 'react';
import styles from './RockPreview.scss';
import { relativeTimeFromEpoch } from './util/time';

class RockPreview extends React.Component {
  render(){
    const { rock } = this.props;
    window.ts = rock.timeSent;
    return (
      <div className={styles["rock-item"]}>
        <p className={styles["title"]}>{rock.title || rock.url}</p>
        <p className={styles['description']}>{rock.note}</p>
        <div>
          <span className={styles['timestamp']}>{relativeTimeFromEpoch(rock.timeSent.seconds)}</span>
        </div>
      </div>
    );
  }
}

export default RockPreview;
