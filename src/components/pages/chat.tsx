import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/hooks/hooks";
import { sendMessage, startMessagesListening, stopMessagesListening } from "../../redux/reducers/chatSlice";

export type MessagesType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;
};

const Chat = () => {
	const dispatch = useAppDispatch()
	useEffect(()=>{
		dispatch(startMessagesListening())
		return () => {
			dispatch(stopMessagesListening())
		}
	},[])
	return (
		<>
			<Messages />
			<MessagesForm />
		</>
	);
};

export default Chat;

export const Messages = () => {
	const messages = useAppSelector(state => state.chat.messages)
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
	const { register, handleSubmit, setValue } = useForm<{ message: string }>();
	const onSubmit: SubmitHandler<{ message: string }> = ({ message }) => {
		if (!message) {
			return;
		}
		sendMessage(message)
		setValue("message", "");
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<textarea {...register("message")} />
			<input type='submit' value='send' />
		</form>
	);
};
