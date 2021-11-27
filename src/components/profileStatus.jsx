import React, { useState, useEffect } from "react";


const ProfileStatus = (props) => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);
  
  useEffect(()=>{
    setStatus(props.status)}, [props.status]
  )
  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value) ;
  };

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deactivateEditMode = () => {
    setEditMode(false) ;
    props.updateUserStatus(status);
  };

    return (
      <div>
        {!editMode && (
          <div>
            <span onDoubleClick={activateEditMode}>
              {props.status
                ? status
                : "Здесь мог быть ваш статус"}
            </span>
          </div>
        )}
        {editMode && (
          <div>
            <input
              onChange={onStatusChange}
              autoFocus={true}
              value={status}
              onBlur={deactivateEditMode}
            />
          </div>
        )}
      </div>
    );
  
}

export default ProfileStatus;
