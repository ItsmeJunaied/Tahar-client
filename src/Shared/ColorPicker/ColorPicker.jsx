import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const ColorPicker = ({ sendData, size }) => {
    const [selectedColors, setSelectedColors] = useState([]);
    const [currentColor, setCurrentColor] = useState('');

    const handleColorClick = (color, e) => {
        e.preventDefault();
        setSelectedColors(prevColors => {
            if (prevColors.includes(color)) {
                return prevColors.filter((c) => c !== color);
            } else {
                return [...prevColors, color];
            }
        });
        sendData(selectedColors, size);
    };

    const handleRemoveColor = (color) => {
        setSelectedColors(prevColors => prevColors.filter((c) => c !== color));
    };

    useEffect(() => {
        // console.log('Selected Colors:', selectedColors);
        sendData(selectedColors);
    }, [selectedColors, sendData]);

    return (
        <div className="flex flex-wrap">
            {selectedColors.map((color) => (
                <div key={color} className="m-2 relative">
                    <div
                        className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:shadow-md overflow-hidden"
                        style={{ backgroundColor: color }}
                        onClick={() => setCurrentColor(color)}
                    >
                        <button
                            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 bg-red-500 text-white rounded-full opacity-100 hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveColor(color)}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </div>
            ))}
            <div className="m-2 relative">
                <input
                    type="color"
                    value={currentColor}

                    onChange={(e) => setCurrentColor(e.target.value)}
                />
                <button
                    className="absolute top-0 right-0 p-1 bg-green-500 text-white rounded-full"
                    onClick={(e) => handleColorClick(currentColor, e)}
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default ColorPicker;