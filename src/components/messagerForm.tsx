import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from "../redux/hooks/hooks";
import style from "./blocks/dialogs.module.css";

type Data = {
	newMessageText: string;
};
type Props = {
	friendId: string;
	sendMessageClick: (id: string, newMessageText: string)=> any ;
};

export const MessangerForm = ({ friendId, sendMessageClick }:Props) => {
	const dispatch = useAppDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Data>();

	const onSubmit: SubmitHandler<Data> = (data) => {
		dispatch(sendMessageClick(friendId, data.newMessageText));
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<textarea
				{...register("newMessageText", { maxLength: 100 })}
				className={style.textarea}
				placeholder='Введите новое сообщение'
			/>
			<input className={style.btn} type='submit' value='Отправить' />
		</form>
	);
};
