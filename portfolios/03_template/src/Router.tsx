import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./page/Home";
import NotFound from "./page/NotFound";
import Login from "./page/login";

const Router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{	path: "",	element: <Home /> },		
			{	path: "login",	element: <Login /> },			
		],
		errorElement: <NotFound />
	}
]);

export default Router;