import React from "react";
import { /* Redirect,  */ Route, Switch } from "react-router-dom";
import Board from "./pages/Board/Board";
import { ToastContainer } from "react-toastify";
import TaskProvider from "./hook/useTask";
import Nav from "./components/ui/common/Nav";

function App() {
	return (
		<>
			<Nav/>
			<Switch>
				{/* <Route path="/login" component={Login} />
                <Route path="/category/:type?" component={CategoryEditPage} />
                <Route path="/transaction/:type?" component={TransactionPage} /> */}
				<TaskProvider>
					<Route path="/" exact component={Board} />
				</TaskProvider>
				{/* <Redirect to="/"/> */}
			</Switch>
			<ToastContainer />
		</>
	);
}

export default App;
