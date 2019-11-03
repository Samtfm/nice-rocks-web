import React from 'react';
import styles from './Browse.scss';
class Browse extends React.Component {

  render() {
    console.log(styles);
    const { friendRocks } = this.props;
    return (
      <div>
        <h1 className={styles["page-title"]}>All rocks</h1><p></p>
        <h2 className={styles["friend"]}>{friendRocks.sender.name}</h2><p></p>
        <ul>
          {friendRocks.rocks.map((rock,index) => (
            <li className={styles["rock-item"]}>
              <a href={rock.url}>
                <p className={styles["title"]}>{rock.title}</p>
              </a>
              <p>{rock.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Browse;
