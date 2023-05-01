import React from "react";

function Modal({
    active,
    children,
    title,
    handleNegativeFunction,
    handlePositiveFunction,
    positiveTitleButton,
}) {
    let header, body, footer;
    React.Children.forEach(children, (child) => {
        if (child.type === Modal.Header) {
            header = child;
        } else if (child.type === Modal.Body) {
            body = child;
        } else if (child.type === Modal.Footer) {
            footer = child;
        }
    });
    return (
        <section
            className={`modal bg-secondary bg-opacity-75 ${
                active ? "d-block" : null
            }`}
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <header className="modal-header">
                        {header ? (
                            header.props.children
                        ) : (
                            <h1
                                className="modal-title fs-5"
                                id="exampleModalLabel"
                            >
                                {title}
                            </h1>
                        )}
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={() => handleNegativeFunction()}
                        ></button>
                    </header>
                    <main className="modal-body d-flex flex-column">
                        {body && body.props.children}
                    </main>
                    <footer className="modal-footer">
                        {footer ? (
                            footer.props.children
                        ) : (
                            <>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    onClick={() => handleNegativeFunction()}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => handlePositiveFunction()}
                                >
                                    {positiveTitleButton ? positiveTitleButton : "Save"}
                                </button>
                            </>
                        )}
                    </footer>
                </div>
            </div>
        </section>
    );
}

Modal.Header = function Header({ children }) {
    return <>{children}</>;
};
Modal.Body = function Body({ children }) {
    return <>{children}</>;
};
Modal.Footer = function Footer({ children }) {
    return <>{children}</>;
};

export default Modal;
