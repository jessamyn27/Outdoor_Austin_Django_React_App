import React, {Component} from 'react';

class ActivityList extends Component {



  render() {
    return(
      <div>
        {this.props.activities.map(item =>(
          <div key={item.id}>
            <h1>{item.name}</h1>
            <img src={item.photo_url} alt=""/>
          </div>
        ))}
      </div>
    )
  }
}

export default ActivityList;
