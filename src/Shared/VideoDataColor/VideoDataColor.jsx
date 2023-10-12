import React from 'react';

const VideoDataColor = ({ productdata, activeSize, activeID,selectedColor, setSelectedColor,setActiveSize  }) => {
    let defaultColorArray = null;

    // console.log(activeSize, activeID)
    if (activeSize === '' || activeID !== productdata?._id) {
        const allColors = [
            ...new Set([
                ...(productdata?.Scolor && productdata?.Scolor.split(',')) || [],
                ...(productdata?.Mcolor && productdata?.Mcolor.split(',')) || [],
                ...(productdata?.Lcolor && productdata?.Lcolor.split(',')) || [],
                ...(productdata?.XLcolor && productdata?.XLcolor.split(',')) || [],
                ...(productdata?.XXLcolor && productdata?.XXLcolor.split(',')) || [],
                ...(productdata?.XXXLcolor && productdata?.XXXLcolor.split(',')) || [],
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
                    activeSize === 'S' && activeID === productdata?._id && productdata?.Scolor && typeof productdata?.Scolor === 'string' ? (
                        productdata?.Scolor.split(',').map((color, index) => (
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
                    activeSize === 'M' && activeID === productdata?._id && productdata?.Mcolor && typeof productdata?.Mcolor === 'string' ? (
                        productdata?.Mcolor.split(',').map((color, index) => (
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
                    activeSize === 'L' && activeID === productdata?._id && productdata?.Lcolor && typeof productdata?.Lcolor === 'string' ? (
                        productdata?.Lcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor  === color ? 'border-red-500' : 'border-black'
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
                    activeSize === 'XL' && activeID === productdata?._id && productdata?.XLcolor && typeof productdata?.XLcolor === 'string' ? (
                        productdata?.XLcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor  === color ? 'border-red-500' : 'border-black'
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
                    activeSize === 'XXL' && activeID === productdata?._id && productdata?.XXLcolor && typeof productdata?.XXLcolor === 'string' ? (
                        productdata?.XXLcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor  === color ? 'border-red-500' : 'border-black'
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
                    activeSize === 'XXXL' && activeID === productdata?._id && productdata?.XXXLcolor && typeof productdata?.XXXLcolor === 'string' ? (
                        productdata?.XXXLcolor.split(',').map((color, index) => (
                            <div key={index} className={`border-[2px] rounded-full p-[2px] ${selectedColor  === color ? 'border-red-500' : 'border-black'
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

export default VideoDataColor;