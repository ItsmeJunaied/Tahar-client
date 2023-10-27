import React from 'react';

const DetailedColour = ({ data, there}) => {
    
    return (
        <div>
            <div className=" flex gap-2">

                    <div className={`border-[2px] rounded-full p-[2px] ${there === 'light' ? 'border-black' : 'border-white'}`}>
                        <div

                            className={`w-[28px] h-[28px] rounded-[104px] `}
                            style={{ backgroundColor: data.selectedColor}}
                        >
                            {/* Any content you want to include */}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default DetailedColour;