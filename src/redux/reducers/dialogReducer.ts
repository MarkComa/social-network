import { AnyAction } from "@reduxjs/toolkit";
import { FriendType } from "../../types/types";

const ADD_MESSAGE = "ADD-MESSAGE";

type StateProps = {
	friends: FriendType[];
};


const initialState: StateProps = {
	friends: [
		{
			id: "1",
			fName: "sadsad",
			messages: [{ message: "1" }, { message: "2" }],
		},

		{
			id: "2",
			fName: "ыфвфыв",
			messages: [{ message: "Тв" }, { message: "фывфыв" }],
		},
	],
};

const dialogReducer = (state = initialState, action: AnyAction): StateProps => {
	switch (action.type) {
		case ADD_MESSAGE:
			debugger;
			if (action.newMessageText !== "") {
				const newMessage = { message: action.newMessageText };
				debugger;
				return {
					...state,

					friends: [
						...state.friends.map((f) => {
							if (f.id === action.id) {
								return { ...f, messages: [...f.messages, newMessage] };
							}
							return f;
						}),
					],
				};
			} else {
				return state;
			}
		default:
			return state;
	} //switch
};
export const sendMessageClick = (id: string, newMessageText: string) => {
	return {
		type: ADD_MESSAGE,
		id,
		newMessageText,
	};
};

export default dialogReducer;
