import React from 'react';
import styles from './Browse.scss';
import RockModal from "./RockModal"
class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      viewingRock: null,
    }
  }

  viewRock = (rock) => {
    this.setState({
      viewingRock: rock
    })
  }

  handleClose = (rock) => {
    this.setState({
      viewingRock: null
    })
  }

  render() {
    const { friendRocks } = this.props;
    const { viewingRock } = this.state;


    return (
      <div>
        <h1 className={styles["page-title"]}>All rocks</h1><p></p>
        <h2 className={styles["friend"]}>{friendRocks.sender.name}</h2><p></p>
        <ul>
          {friendRocks.rocks.map((rock,index) => (
            <li onClick={ () => this.viewRock(rock) } className={styles["rock-item"]}>
              <a href={rock.url}>
                <p className={styles["title"]}>{rock.title}</p>
              </a>
              <p>{rock.description}</p>
            </li>
          ))}
        </ul>
        { viewingRock && (
          <RockModal rock={viewingRock} handleClose={this.hideModal}/>
        )}
      </div>
    );
  }
}

export default Browse;
