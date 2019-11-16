import React from 'react';
import styles from './Browse.scss';
import RockModal from "./RockModal"
import RockPreview from "./RockPreview"

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

  hideRockModal = () => {
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
        {friendRocks.rocks.length > 0 && (
          <div>
            <h2 className={styles["friend"]}>from: {friendRocks.rocks[0].fromUser.displayName}</h2><p></p>
            <ul>
              {friendRocks.rocks.map((rock,index) => (
                <li onClick={ () => this.viewRock(rock) }>
                  <RockPreview rock={rock}/>
                </li>
              ))}
            </ul>
            {viewingRock && (
              <RockModal rock={viewingRock} visible={Boolean(viewingRock)} handleClose={this.hideRockModal}/>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Browse;
