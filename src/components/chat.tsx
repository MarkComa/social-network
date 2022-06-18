import Messanger from "./messager";
import { useAppSelector } from "../redux/hooks/hooks";
import { Link, useParams } from "react-router-dom";

const Chat = () => {
	const friends = useAppSelector((state) => state.dialogPage.friends);

	let {friendId} = useParams<{friendId: string}>();

	if (!friendId) {
		friendId = "";
	}

	const dialogItemEl = friends.map((dI) => {
		return <DialogItem id={dI.id} />;
	});

	const friend = friends.filter((i) => {
		return i.id === friendId;
	});

	return (
		<section>
			<h1>Диалоги</h1>
			<div >
				<ul>{dialogItemEl}</ul>
				<Messanger
					friend={friend}
					friendId={friendId}
				/>
			</div>
		</section>
	);
};
export default Chat
// написать тип ->
const DialogItem = (props:any) => { 
  return (
    <li>
      <Link
        to={`/dialogs/` + props.id}>
        {props.name} {props.fname}
      </Link>
    </li>
  );
};
