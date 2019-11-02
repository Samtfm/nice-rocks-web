import React from 'react';

class Browse extends React.Component {

  render() {
    const { friendRocks } = this.props;
    return (
      <div>
        browse!
        {friendRocks.sender.name}
      </div>
    );
  }
}

export default Browse;
