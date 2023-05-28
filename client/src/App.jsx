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
import ProjectTeam from "pages/ProjectTeam";

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <ProjectProvider>
                    <Route path="/profile/:userID?" component={Profile} />
                    <Route path="/projects" component={Projects} />
                    <Route
                        path="/project/:projectID?/settings"
                        component={ProjectSettings}
                    />
                    <TaskProvider>
                    <Route
                            path="/project/:projectID?"
                            exact
                            component={Project}
                        />
                        <Route
                            path="/project/:projectID?/history"
                            exact
                            component={ProjectHistory}
                        />
                        <Route
                            path="/project/:projectID?/board"
                            exact
                            component={Board}
                        />
                        <Route
                            path="/project/:projectID?/team"
                            exact
                            component={ProjectTeam}
                        />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </TaskProvider>
                </ProjectProvider>
                <Route path="/settings" component={Settings} />
            </Switch>
            <ToastContainer />
        </>
    );
}

export default App;
