// CustomNode.js
import React from 'react';
import { BsChat, BsImage, BsFileText, BsFilePlay } from 'react-icons/bs';

const CustomNode = ({ data }) => {
    return (
        <div className="p-4 bg-white border rounded shadow">
            <div className="font-bold text-lg">{data.label}</div>
            <div className="flex flex-col mt-2 space-y-2">
                <button className="flex items-center space-x-2 p-2 bg-blue-500 text-white rounded">
                    <BsChat />
                    <span>Message</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-green-500 text-white rounded">
                    <BsImage />
                    <span>Image</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-gray-500 text-white rounded">
                    <BsFileText />
                    <span>Document</span>
                </button>
                <button className="flex items-center space-x-2 p-2 bg-red-500 text-white rounded">
                    <BsFilePlay />
                    <span>Video</span>
                </button>
            </div>
        </div>
    );
};

export default CustomNode;
