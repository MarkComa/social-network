import React, { useState, useEffect, ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import { updateUserStatus } from "../redux/reducers/profileReducer";

interface Props {
  status: string;
}

const ProfileStatus = (props:Props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    setStatus(props.status)}, [props.status]
  )
  const onStatusChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatus(e.currentTarget.value) ;
  };

  const activateEditMode: MouseEventHandler<HTMLSpanElement> = () => {
    setEditMode(true);
  };

  const deactivateEditMode:FocusEventHandler<HTMLInputElement> = () => {
    setEditMode(false) ;
    dispatch(updateUserStatus(status))
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
