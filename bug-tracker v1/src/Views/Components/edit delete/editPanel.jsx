import React from "react";
import './editPanel.css'

export default(props) => {
    return(
        <div className="edit-panel">
            <button className="edit-btn" onClick={props.editClicked}>Edit</button>
            <button onClick={props.deleteClicked}>Delete</button>

        </div>
    )
}