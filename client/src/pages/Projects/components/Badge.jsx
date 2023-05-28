import React from "react";

function Badge({ children, bg }) {
    return (
        <span class={`badge bg-${bg} d-flex align-items-center`}>
            {children}
        </span>
    );
}

export default Badge;
