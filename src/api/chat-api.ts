let ws: WebSocket | null;
let subscribers = [] as SubscriberType[];

const closeEvent = () => {
	setTimeout(() => {
		createWebSocket();
	}, 3000);
};
const messageHandler = (e: MessageEvent) => {
	const newMessages: MessagesType[] = JSON.parse(e.data);
	subscribers.forEach((s) => s(newMessages));
};

export const createWebSocket = () => {
	ws = new WebSocket(
		"wss://social-network.samuraijs.com/handlers/ChatHandler.ashx",
	);
	ws?.addEventListener("message", messageHandler);
	ws?.addEventListener("close", closeEvent);
	ws?.removeEventListener("close", closeEvent);
};

export const newMessage = () => {
	ws?.addEventListener("message", messageHandler);
	ws?.removeEventListener("message", messageHandler);
};

export const chatAPI = {
	start() {
		createWebSocket();
	},
	stop() {
		subscribers = []
		ws?.removeEventListener("message", messageHandler);
		ws?.removeEventListener("close", closeEvent);
		ws?.close();
	},
	subscribe(callback: SubscriberType) {
		subscribers.push(callback);
		return () => {
			subscribers.filter((s) => s !== callback); // unsubscribe
		};
	},
	sendMessage(message: string) {
		ws?.send(message);
	},
};

type SubscriberType = (messages: MessagesType[]) => void;
type MessagesType = {
	message: string;
	photo: string;
	userId: number;
	userName: string;
};
