import React from 'react';
import SendRockModal from "./SendRockModal"

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
        <button onClick={this.showModal}>Send Rock</button>
        <SendRockModal visible={modalVisible} handleClose={this.hideModal}/>
      </React.Fragment>
    );
  }
}

export default Browse;
