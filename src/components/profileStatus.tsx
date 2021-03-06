import Title from "antd/lib/typography/Title";
import { useState, useEffect, ChangeEventHandler, FocusEventHandler, MouseEventHandler } from "react";
import { useAppDispatch } from "../redux/hooks/hooks";
import { updateUserStatus } from "../redux/reducers/profileSlice";

interface Props {
  status: string | null;
  isOwner: boolean
}

const ProfileStatus = (props:Props) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState<string | null>(props.status);
  const dispatch = useAppDispatch()
  
  useEffect(()=>{
    setStatus(props.status)}, [props.status]
  )
  const onStatusChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStatus(e.currentTarget.value) ;
  };

  const activateEditMode: MouseEventHandler<HTMLSpanElement> = () => {
    if (props.isOwner) {
    setEditMode(true);
    }
  };

  const deactivateEditMode:FocusEventHandler<HTMLInputElement> = () => {
    if (props.isOwner) {
    setEditMode(false) ;
    dispatch(updateUserStatus(status))
    }
  };

    return (
      <Title level={2} >
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
              value={status as string}
              onBlur={deactivateEditMode}
            />
          </div>
        )}
      </Title>
    );
  
}

export default ProfileStatus;
