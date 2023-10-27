import { faPlus, faTimes, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';


const ColorPicker = ({ selectedColor, setSelectedColor }) => {
    

    const handleRemoveColor = () => {
        setSelectedColor('');
        
    };

    return (
        <div className="flex align-bottom items-end gap-5">
            <div className=" relative rounded-lg">
                <input
                    type="color"
                    value={selectedColor}
                    className='w-60 h-10 rounded-full'
                    onChange={(e) => setSelectedColor(e.target.value)}
                />
                {/* <button
                    className="absolute -top-1 -right-1 p-1 bg-green-500 text-white rounded-full w-7 h-7 flex justify-center align-middle items-center"
                    onClick={handleColorClick}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button> */}
            </div>
            <div className="w-full">
                <div className="flex flex-wrap ">
                    {selectedColor && (
                        <div className="relative">
                            <div
                                className="w-8 h-8 rounded-full bg-gray-300 cursor-pointer hover:shadow-md overflow-hidden"
                                style={{ backgroundColor: selectedColor }}
                                onClick={handleRemoveColor}
                            >
                                <button
                                    className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 p-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-100 hover:opacity-100 transition-opacity flex justify-center"
                                >
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default ColorPicker;
