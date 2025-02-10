import React from "react";

function Loader() {

    return(
        <div className="p-4">
            <div className="flex justify-center items-center p-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
            <div className="text-center text-gray-500">
                Loading emails... This might take a few seconds.
            </div>
        </div>
    )
}

export default Loader