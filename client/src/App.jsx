import React from "react";
import { /* Redirect,  */ Route, Switch } from "react-router-dom";
import Board from "./pages/Board/Board";
import { ToastContainer } from "react-toastify";
import TaskProvider from "./hook/useTask";
import NavBar from "./components/ui/common/NavBar";

function App() {
	return (
		<>
			<NavBar/>
			<Switch>
				{/* <Route path="/login" component={Login} />
                <Route path="/category/:type?" component={CategoryEditPage} />
                <Route path="/transaction/:type?" component={TransactionPage} /> */}
				<TaskProvider>
					<Route path="/board" exact component={Board} />
				</TaskProvider>
				{/* <Redirect to="/"/> */}
			</Switch>
			<ToastContainer />
		</>
	);
}

export default App;
