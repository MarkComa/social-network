import { Button } from 'antd';
import { useAppDispatch } from '../redux/hooks/hooks';
import { AppDispatch } from '../redux/redux-store';
import { IUser } from '../types/types';

type Props = {
  isAuth: boolean
  user: IUser
  follow: (userId: string | null) => (dispatch: AppDispatch) => Promise<void>
  unfollow: (userId: string) => (dispatch: AppDispatch) => Promise<void>
  followingInProgress: (string | null)[]

}

export const ToggleFollow = ({isAuth, user, follow, unfollow, followingInProgress}:Props) => {
  const dispatch = useAppDispatch()
  return (
    <div>
      {isAuth ? (
      <div>
        {user.followed ? (
          <Button
            type={"primary"}
            onClick={() => {
              dispatch(unfollow(user.id));
            }}
            disabled={followingInProgress.some(
              (id: string | null) => id === user.id,
            )}>
            Unfollow
          </Button>
        ) : (
          <Button
            type='default'
            disabled={followingInProgress.some(
              (id) => id === user.id,
            )}
            onClick={() => {
              dispatch(follow(user.id));
            }}>
            Follow
          </Button>
        )}
      </div>
    ) : null}</div>
  )
}
