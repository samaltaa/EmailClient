import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

/*
TODO: 
[] make component take up full page width and height 
[] bg should be a gradient color identical to the one on the home page
[] center the loader icon and text in the center of screen
[] make the loading message change if loading takes too long 
*/

function Loader() {

    return(
        <div className="flex flex-col items-center justify-center border border-black w-full h-screen bg-gradient-to-br from-pink-200 to-pink-300">
            <div className="justify-center items-center p-4">
                <PropagateLoader color="#fa75ce"/>
            </div>
            <div className="text-center text-pink-500">
                Loading Emails, please wait........
            </div>
        </div>
    )
}

export default Loader