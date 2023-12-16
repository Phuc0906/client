import React from "react";
import ReactDOM from "react-dom";

const Line: React.FC<Coordinate> = ({ bottom, left, width }) => {
    return ReactDOM.createPortal(
        <div
            style={{
                top: `${bottom}px`,
                left: `${left}px`,
                width: `${width}px`,
            }}
            className="line-effect"></div>,
        document.body
    );
};

export default Line;
