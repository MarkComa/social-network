import { FC, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const ws = new WebSocket(
	"wss://social-network.samuraijs.com/handlers/ChatHandler.ashx",
);

type MessagesType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;
};

const Chat = () => {
	return (
		<>
			<Messages />
			<MessagesForm />
		</>
	);
};

export default Chat;

export const Messages = () => {
	const [messages, setMessages] = useState<MessagesType[]>([]);
	useEffect(() => {
		ws.addEventListener("message", (e) => {
			const newMessages = JSON.parse(e.data);
			setMessages((prevMessage) => [...prevMessage, ...newMessages]);
		});
	}, []);
	return (
		<div style={{ height: "700px", overflow: "auto" }}>
			{messages.map((m, index) => (
				<Message message={m} key={index} />
			))}
		</div>
	);
};

export const Message: FC<{ message: MessagesType }> = ({ message }) => {
	return (
		<>
			<img
				style={{ width: "60px", borderRadius: "50%" }}
				src={message.photo}
				alt=''
			/>
			<div>{message.message}</div>
		</>
	);
};

export const MessagesForm = () => {
	const { register, handleSubmit, setValue } = useForm<{message: string}>();
  const onSubmit: SubmitHandler<{message: string}> = ({message}) => {
    if (!message) {
      return
    }
    ws.send(message)
    setValue('message', '')
  }
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<textarea {...register('message')} />
      <input type="submit" value="send" />
		</form>
	);
};
