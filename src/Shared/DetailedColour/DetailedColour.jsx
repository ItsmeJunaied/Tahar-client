import React from 'react';

const DetailedColour = ({ data, activeSize, activeID, selectedColor, setSelectedColor }) => {
    let defaultColorArray = null;

    // console.log(selectedColor)
    // console.log(activeSize, activeID)
    if (activeSize === '' || activeID !== data._id) {
        const allColors = [
            ...new Set([
                ...(data.Scolor && data.Scolor.split(',')) || [],
                ...(data.Mcolor && data.Mcolor.split(',')) || [],
                ...(data.Lcolor && data.Lcolor.split(',')) || [],
                ...(data.XLcolor && data.XLcolor.split(',')) || [],
                ...(data.XXLcolor && data.XXLcolor.split(',')) || [],
                ...(data.XXXLcolor && data.XXXLcolor.split(',')) || [],
            ]),
        ];

        if (allColors.length > 0) {
            defaultColorArray = allColors;
        }
    }
    return (
        <div>
            <div className=" flex gap-2">
                {defaultColorArray && defaultColorArray.map((color, index) => (
                    <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                        }`}>
                        <div

                            className={`w-[28px] h-[28px] rounded-[104px] `}
                            onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                        >
                            {/* Any content you want to include */}
                        </div>
                    </div>
                ))}

                {
                    activeSize === 'S' && activeID === data._id && data.Scolor && typeof data.Scolor === 'string' ? (
                        data.Scolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                                }`}>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'M' && activeID === data._id && data.Mcolor && typeof data.Mcolor === 'string' ? (
                        data.Mcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                                }`}>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'L' && activeID === data._id && data.Lcolor && typeof data.Lcolor === 'string' ? (
                        data.Lcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                                }`}>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'XL' && activeID === data._id && data.XLcolor && typeof data.XLcolor === 'string' ? (
                        data.XLcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                                }`}>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'XXL' && activeID === data._id && data.XXLcolor && typeof data.XXLcolor === 'string' ? (
                        data.XXLcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                                }`}>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'XXXL' && activeID === data._id && data.XXXLcolor && typeof data.XXXLcolor === 'string' ? (
                        data.XXXLcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor === color ? 'border-red-500' : 'border-black'
                                }`}>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    onClick={() => setSelectedColor(color)} style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
            </div>
        </div>
    );
};

export default DetailedColour;