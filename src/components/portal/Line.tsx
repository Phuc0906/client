import React from "react";
import ReactDOM from "react-dom";
import {Coordinate} from "../../react-app-env";

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
