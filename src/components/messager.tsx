import { sendMessageClick } from "../redux/reducers/dialogReducer";
import { FriendType, MessageType } from "../types/types";
import style from "./blocks/dialogs.module.css";
import { MessangerForm } from "./messagerForm";

type Props = {
	friendId: string;
	friend: FriendType[];
};
type MessageListProps = {
	messages: MessageType[];
};

const Messanger = ({ friend, friendId }: Props) => {
	const messageItemEl = friend.map((mI) => {
		return <MessageList messages={mI.messages} />;
	});

	return (
		<div className={style.chat}>
			<div className={style.message}>{messageItemEl}</div>
			<div className={style.actionMessage}>
				<MessangerForm
					friendId={friendId}
					sendMessageClick={sendMessageClick}
				/>
			</div>
		</div>
	);
};

const MessageList = ({ messages }: MessageListProps) => {
	return (
		<>
			{messages.map((m) => (
				<MessageItem message={m.message} />
			))}
		</>
	);
};

const MessageItem = (props: MessageType) => {
	return <div className={style.myMessage}>{props.message}</div>;
};
export default Messanger;
