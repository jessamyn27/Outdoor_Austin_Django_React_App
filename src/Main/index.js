import React, {Component} from 'react';
import ActivityList from '../ActivityList';
import CreateActivity from '../CreateActivity';
import EditActivity from '../EditActivity';
const Cookies = require('js-cookie')
// import FeatureList from './FeatureList';
// import FeatureCreate from './FeatureCreate';
// import FeatureEdit from './FeatureEdit';
// import Login from './Login';
// import Logout from './Logout';
// import Map from './Map';
// import Nav from './Nav';
// ---------------------------------------------------
class Main extends Component {
  constructor(props) {
    super()
    this.state = {
      activities: [],
      showEdit: false,
      editactivityId: null,
      counter: 0,
      activityToEdit: {
        'name': '',
      }
    }
  };
  // ---------------------------------------------------

  handleClick = (e) => {
    this.setState({
      counter: this.state.counter + 1
    })
  }
  // ---------------------------------------------------

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/activities/');
      const activities = await res.json();
      this.setState({
        activities
      })

    } catch(err) {
      return(err)
    }
  }
  // ---------------------------------------------------

  getActivities = async () => {

    const activities = await fetch('http://localhost:8000/api/activities/');
    const activitiesJson = activities.json();
    return activitiesJson
  }
  // ---------------------------------------------------

  addActivity = async (activity, e) => {
    const cookie = Cookies.get('csrftoken')
    console.log(cookie, ' this is the cookie');
    e.preventDefault();
    console.log('this is addActivity');
    try {
      const createdActivity = await fetch('http://localhost:8000/api/activities/', {
        method : 'POST',
        credentials: 'include',
        body : JSON.stringify(activity),
        headers : {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie
        }
      });
    const createdActivityJson = await createdActivity.json();

    console.log(createdActivityJson);
    this.setState({
      activities: [...this.state.activities, createdActivityJson]
    })
  } catch (err) {
    console.log(err);
  }
}
// ---------------------------------------------------

deleteActivity = async (id, e) => {

  e.preventDefault();
  console.log('deleteActivity function is being called, this is the id:', id);

  try {
    const deleteActivity = await fetch('http://localhost:8000/api/activities/' + id + '/', {
      method: 'DELETE',
    });
    const parsedResponse = await deleteActivity.json();

    if (parsedResponse.status === 200) {
      this.setState({
        activities: this.state.activities.filter((activity, i) => activity.id !== id)
      });
    } else {
      console.log('there was an error in delete activity');
    }
  } catch (err) {
    console.log(err);
  }
}
// -------------------------------------------------

showModal = (id) => {
  const activityToEdit = this.state.activities.find((activity) => activity._id === id);

  this.setState({
    showEdit: true,
    editActivityId: id,
    activityToEdit: activityToEdit
  });
}
// --------------------------------------------------

closeAndEdit = async (e) => {
  e.preventDefault();

  try {
    const editActivity = await fetch('http://localhost:8000/' + this.state.editCatId, {
      'method': 'PUT',
      credentials: 'include',
      body: JSON.stringify(this.state.activityToEdit),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const parsedResponse = await editActivity.json();

    const editedActivityArray = this.state.activities.map((activity) => {

      if (activity._id === this.state.editActivityId) {
        activity.name = parsedResponse.data.name;
      }
      return activity
    });

    this.setState({
      activities: editedActivityArray,
      showEdit: false
    });
  } catch (err) {
    console.log(err)
  }
}

// ---------------------------------------------------

handleFormChange = (e) => {

  this.setState({
    activityToEdit: {
      ...this.state.activityToEdit,
      [e.target.name]: e.target.value
    }
  });
}
// ---------------------------------------------------

render() {
  console.log(this.state, 'this is state');
  return (<div>
    <h1>Welcome To Outdoor Austin!</h1>
    <h3>Create A List Of Your Favorite Outdoor Activities Or Add To Ours</h3>

    <ActivityList activities={this.state.activities}
          deleteActivity={this.deleteActivity} showModal={this.showModal}/>

    <CreateActivity addActivity={this.addActivity}/>

    {this.state.showEdit ? <EditActivity closeAndEdit={this.closeAndEdit} handleFormChange={this.handleFormChange} activityToEdit={this.state.activityToEdit}/>
        : null}

    <p>Count is {this.state.counter}</p>
    <button onClick={this.handleClick}>click if you love to be outside!</button>
  </div>);
}
}

export default Main;
