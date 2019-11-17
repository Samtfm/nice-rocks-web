import React from 'react';
import SendRockModal from "./SendRockModal"
import styles from "./SendRockLink.scss"

class Browse extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  showModal = () => {
    this.setState({
      modalVisible: true
    })
  }

  hideModal = () => {
    this.setState({
      modalVisible: false
    })
  }

  render() {
    const { modalVisible } = this.state;

    return (
      <React.Fragment>
        <button className={styles['floating-button']} onClick={this.showModal}>+</button>
        <SendRockModal visible={modalVisible} handleClose={this.hideModal}/>
      </React.Fragment>
    );
  }
}

export default Browse;
