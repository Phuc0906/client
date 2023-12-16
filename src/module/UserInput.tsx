import React from "react";

const UserInput = () => {
    return (
        <div className="w-full p-4 border-2 rounded-md border-primary">
            <textarea
                placeholder="To write text, enter or paste it here and press 'Correct' "
                className="w-full mt-4 border-none resize-none focus:border-none focus:outline-none"></textarea>
        </div>
    );
};

export default UserInput;
