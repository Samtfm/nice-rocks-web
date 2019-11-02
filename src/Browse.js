import React from 'react';
// import styles from './styles.scss'
class Browse extends React.Component {

  render() {
    const { friendRocks } = this.props;
    return (
      <div>
        <h1 className={"pagetitle"}>All rocks</h1><p></p>
        <h2 className={"friend"}>{friendRocks.sender.name}</h2><p></p>
        <ul>
          {friendRocks.rocks.map((rock,index) => (
            <li>
              <a href={rock.url} className={"a"}><p className={"title"}>{rock.title}</p></a>
              <p>{rock.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Browse;
