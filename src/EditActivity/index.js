import React from 'react';

const EditActivity = (props) => {
    return (
        <div>
            <h4>Edit Activity</h4>
            <form action="">
                <label>
                    Edit Activity:
                    <input type="text" name="name" onChange={props.handleFormChange} value={props.activityToEdit.name}/>
                </label>
                <input type="submit"/>
            </form>
        </div>
    )
}
export default EditActivity;
