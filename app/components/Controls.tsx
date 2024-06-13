"use client"
import React, { useState } from 'react';
import { FaArrowAltCircleDown, FaArrowAltCircleLeft, FaArrowAltCircleRight, FaArrowAltCircleUp } from 'react-icons/fa';
import { IoIosHelpCircle, IoMdClose } from 'react-icons/io';
import { RiSpace } from 'react-icons/ri';

const Controls = () => {
    const [showControls, setShowControls] = useState(false);

    const toggleControls = () => {
        setShowControls(!showControls);
    };

    return (
        <div className="fixed top-0 right-0 m-4 flex flex-col items-end">
            {showControls ? (
                <div className="bg-white shadow-md p-4 rounded-lg flex flex-col items-end">
                    <button className="text-xl" onClick={toggleControls}>
                        <IoMdClose />
                    </button>
                    <div className="flex flex-col items-start mt-2">
                        <div className="flex items-center mb-2">
                            <FaArrowAltCircleUp className="text-2xl mr-2" />
                            <span>Rotate</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaArrowAltCircleLeft className="text-2xl mr-2" />
                            <span>Move Left</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaArrowAltCircleRight className="text-2xl mr-2" />
                            <span>Move Right</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <FaArrowAltCircleDown className="text-2xl mr-2" />
                            <span>Move Down</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <span className="text-2xl mr-2"><RiSpace /></span>
                            <span>Pause/Play</span>
                        </div>
                    </div>
                </div>
            ) : (
                <button className="bg-blue-500 text-white rounded-full p-2" onClick={toggleControls}>
                    <IoIosHelpCircle className="text-2xl" />
                </button>
            )}
        </div>
    );
};

export default Controls;
