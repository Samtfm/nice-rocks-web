import React from 'react';
import styles from './RockPreview.scss';


class RockPreview extends React.Component {
  render(){
    const { rock } = this.props;
    return (
      <div className={styles["rock-item"]}>
        <p className={styles["title"]}>{rock.title || rock.url}</p>
        <p className={styles['description']}>{rock.note}</p>
      </div>
    );
  }
}

export default RockPreview;
