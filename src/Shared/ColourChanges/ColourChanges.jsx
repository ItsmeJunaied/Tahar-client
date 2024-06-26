import React from 'react';

const ColourChanges = ({ item,there}) => {
    

    // console.log(there)

    return (
        <div className=' '>
            <div className=" flex gap-2">

                    <div className={`border-[2px] rounded-full p-[2px] ${there === 'light' ? 'border-black' : 'border-white'}`}>
                        <div

                            className={`w-[28px] h-[28px] rounded-[104px] `}
                            style={{ backgroundColor: item.selectedColor}}
                        >
                            {/* Any content you want to include */}
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default ColourChanges;