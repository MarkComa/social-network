import { useAppDispatch } from "../redux/hooks/hooks";

type Props = {
	setUsers: () => void;
};
const FriendsList = ({ setUsers }: Props) => {
	const dispatch = useAppDispatch();
	return (
		<section>
			<h1>Мои Друзья</h1>
			<div></div>
			<button onClick={() => dispatch(setUsers)}>
				Set Users Followed
			</button>
		</section>
	);
};

export default FriendsList;
