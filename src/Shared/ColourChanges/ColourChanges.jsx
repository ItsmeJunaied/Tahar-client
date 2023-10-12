import React from 'react';

const ColourChanges = ({ item, activeSize, activeID }) => {
    let defaultColorArray = null;

    // console.log(activeSize, activeID)
    if (activeSize === '' || activeID !== item._id) {
        const allColors = [
            ...new Set([
                ...(item.Scolor && item.Scolor.split(',')) || [],
                ...(item.Mcolor && item.Mcolor.split(',')) || [],
                ...(item.Lcolor && item.Lcolor.split(',')) || [],
                ...(item.XLcolor && item.XLcolor.split(',')) || [],
                ...(item.XXLcolor && item.XXLcolor.split(',')) || [],
                ...(item.XXXLcolor && item.XXXLcolor.split(',')) || [],
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
                    <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                        <div

                            className={`w-[28px] h-[28px] rounded-[104px] `}
                            style={{ backgroundColor: color }}
                        >
                            {/* Any content you want to include */}
                        </div>
                    </div>
                ))}

                {
                    activeSize === 'S' && activeID === item._id && item.Scolor && typeof item.Scolor === 'string' ? (
                        item.Scolor.split(',').map((color, index) => (
                            <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'M' && activeID === item._id && item.Mcolor && typeof item.Mcolor === 'string' ? (
                        item.Mcolor.split(',').map((color, index) => (
                            <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'L' && activeID === item._id && item.Lcolor && typeof item.Lcolor === 'string' ? (
                        item.Lcolor.split(',').map((color, index) => (
                            <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>

                        ))
                    ) : null
                }
                {
                    activeSize === 'XL' && activeID === item._id && item.XLcolor && typeof item.XLcolor === 'string' ? (
                        item.XLcolor.split(',').map((color, index) => (
                            <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'XXL' && activeID === item._id && item.XXLcolor && typeof item.XXLcolor === 'string' ? (
                        item.XXLcolor.split(',').map((color, index) => (
                            <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    style={{ backgroundColor: color }}
                                >
                                    {/* Any content you want to include */}
                                </div>
                            </div>
                        ))
                    ) : null
                }
                {
                    activeSize === 'XXXL' && activeID === item._id && item.XXXLcolor && typeof item.XXXLcolor === 'string' ? (
                        item.XXXLcolor.split(',').map((color, index) => (
                            <div key={index} className='border-[2px] border-black dark:border-white rounded-full p-[2px]'>
                                <div

                                    className={`w-[28px] h-[28px] rounded-[104px] `}
                                    style={{ backgroundColor: color }}
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

export default ColourChanges;