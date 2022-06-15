import "./index.css";
import{ App } from "./App";
import { createRoot } from "react-dom/client";
import store from "./redux/redux-store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container!);
root.render(
	<BrowserRouter>
		<Provider store={store}>
    <App />
		</Provider>
	</BrowserRouter>,
);
