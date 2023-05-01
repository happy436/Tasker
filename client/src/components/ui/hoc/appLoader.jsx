import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotesList, getNotesLoadingStatus } from "../../../store/notes";
import { getIsLoggedIn } from "../../../store/users";
import Loader from "./../../common/icon/loader";

function AppLoader({ children }) {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isLoadingData = useSelector(getNotesLoadingStatus());

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(loadNotesList());
        }
    }, [isLoggedIn]);

    if (isLoggedIn && isLoadingData) {
        return (
            <div className="text-center">
                <div role="status">
                    <Loader />
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    return children;
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;