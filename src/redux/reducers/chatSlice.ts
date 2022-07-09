import { chatAPI } from "./../../api/chat-api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../redux-store";
import { MessagesType } from "../../components/pages/chat";

const initialState = {
	messages: [] as MessagesType[],
};

const chatSlice = createSlice({
	name: "chatSlice",
	initialState,
	reducers: {
		messagesReceived(state, action: PayloadAction<MessagesType[]>) {
			state.messages.push(...action.payload);
		},
	},
});

let _newMessageHandler: ((messages: MessagesType[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: AppDispatch) => {
	if (_newMessageHandler === null) {
		_newMessageHandler = (messages) => {
			dispatch(messagesReceived(messages));
		};
	}
	return _newMessageHandler;
};

export const startMessagesListening = () => async (dispatch: AppDispatch) => {
	chatAPI.start();
	chatAPI.subscribe(newMessageHandlerCreator(dispatch));
};
export const stopMessagesListening = () => async (dispatch: AppDispatch) => {
	chatAPI.stop();
  const unsubscribe =  chatAPI.subscribe(newMessageHandlerCreator(dispatch));
  unsubscribe()
};
export const sendMessage = (message: string) => chatAPI.sendMessage(message);

export const { messagesReceived } = chatSlice.actions;
export default chatSlice.reducer;
