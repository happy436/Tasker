import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Board from "./pages/Board";
import { ToastContainer } from "react-toastify";
import TaskProvider from "./hook/useTask";
import NavBar from "./components/ui/common/NavBar";
import Main from "./pages/Main";
import Project from "./pages/Project";
import Projects from "./pages/Projects";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ProjectProvider from "./hook/useProject";
import ProjectSettings from "./pages/ProjectSettings";
import ProjectHistory from "./pages/ProjectHistory";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/settings" component={Settings} />
                <ProjectProvider>
                    <Route path="/profile/:userID?" component={Profile} />
                    <Route path="/projects" component={Projects} />
                    <Route
                        path="/project/:projectID?/settings"
                        components={ProjectSettings}
                    />
                    <TaskProvider>
                        <Route
                            path="/project/:projectID?/history"
                            components={ProjectHistory}
                        />
                        <Route
                            path="/project/:projectID?/board"
                            component={Board}
                        />
                        <Route
                            path="/project/:projectID?"
                            exact
                            component={Project}
                        />
                    </TaskProvider>
                </ProjectProvider>
                <Route path="/" exact component={Main} />
                <Redirect to="/" />
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
