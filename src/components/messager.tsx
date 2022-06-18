import { sendMessageClick } from "../redux/reducers/dialogReducer";
import { FriendType, MessageType } from "../types/types";
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
		<div>
			<div>{messageItemEl}</div>
			<div>
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
	return <div>{props.message}</div>;
};
export default Messanger;
