import React, { useEffect } from 'react';
import sizeChart from '../../../public/photos/size chart.png'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import { useState } from 'react';
import './Filter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faX } from '@fortawesome/free-solid-svg-icons';
import MultiRangeSlider from '../MultiRangeSlider/MultiRangeSlider';


const Filter = ({ AllProducts, activeFabric, setActiveFabric, setFilteredProfuct }) => {
    const { fabricsdata } = useContext(AuthContext);
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');


    const handleButtonClick = (fabricsType) => {
        setActiveFabric(fabricsType);
    };

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSize, setIsOpenSize] = useState(false);
    const [isOpenColor, setIsOpenColor] = useState(false);
    const [isOpenPrice, setIsOpenPrice] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const toggleDropdownSize = () => {
        setIsOpenSize(!isOpenSize);
    };
    const toggleDropdownColor = () => {
        setIsOpenColor(!isOpenColor);
    };
    const toggleDropdownPrice = () => {
        setIsOpenPrice(!isOpenPrice);
    };


    // color

    const SColor = AllProducts.map(item => item.Scolor);
    const MColor = AllProducts.map(item => item.Mcolor);
    const LColor = AllProducts.map(item => item.Lcolor);
    const XLColor = AllProducts.map(item => item.XLcolor);
    const XXLColor = AllProducts.map(item => item.XXLcolor);
    const XXXLColor = AllProducts.map(item => item.XXXLcolor);

    const combinedColors = [...SColor, ...MColor, ...LColor, ...XLColor, ...XXLColor, ...XXXLColor]
        .flatMap(colors => colors.split(',')) // Split into individual color codes
        .filter(color => color !== '') // Remove empty strings
        .filter((color, index, self) => self.indexOf(color) === index); // Remove duplicates

    // console.log(combinedColors);

    // price
    const [minVal, setMinVal] = useState();
    const [maxVal, setMaxVal] = useState();
    const MaxMinPrice = AllProducts.map(item => item.price);
    const max = Math.max(...MaxMinPrice.map(price => parseFloat(price)));
    const min = Math.min(...MaxMinPrice.map(price => parseFloat(price)));

    useEffect(() => {
        setMinVal(min)
    }, [min, setMinVal])

    useEffect(() => {
        setMaxVal(max)
    }, [max, setMaxVal])


    // console.log(minVal); // Should output 10
    // console.log(min);    // Should also output 10



    const [ChooseColor, SelectedChooseColor] = useState([]);
    const [ChooseFabrics, SelectedChooseFabrics] = useState([]);
    const [ChooseSize, SelectedChooseSize] = useState([]);

    const handleColour = (color) => {
        SelectedChooseColor(prevColors =>
            prevColors.includes(color)
                ? prevColors.filter(c => c !== color)
                : [...prevColors, color]
        );
    }

    const handleChoosedFabrics = (fabrics) => {
        SelectedChooseFabrics(prevFabrics =>
            prevFabrics.includes(fabrics)
                ? prevFabrics.filter(f => f !== fabrics)
                : [...prevFabrics, fabrics]
        );
    }

    const handleSize = (size) => {
        SelectedChooseSize(prevSizes =>
            prevSizes.includes(size)
                ? prevSizes.filter(s => s !== size)
                : [...prevSizes, size]
        );
    }


    //show selected fabricsData
    const FindFabricsData = AllProducts.filter(item =>
        ChooseFabrics?.includes(item.fabrics)
    );

    //show selected color data
    const FindColordata = AllProducts.filter(item => {
        const colors = [
            ...(item.Scolor && item.Scolor.split(',')) || [],
            ...(item.Mcolor && item.Mcolor.split(',')) || [],
            ...(item.Lcolor && item.Lcolor.split(',')) || [],
            ...(item.XLcolor && item.XLcolor.split(',')) || [],
            ...(item.XXLcolor && item.XXLcolor.split(',')) || [],
            ...(item.XXXLcolor && item.XXXLcolor.split(',')) || [],
        ];

        return colors.some(color => ChooseColor.includes(color));
    });

    //show selected size data
    const FindSizedata = AllProducts.filter(item => {
        const sizeQuantityMap = {
            'S': 'Squantity',
            'M': 'Mquantity',
            'L': 'Lquantity',
            'XL': 'XLquantity',
            'XXL': 'XXLquantity',
            'XXXL': 'XXXLquantity'
        };

        return ChooseSize.some(size => {
            const quantityProperty = sizeQuantityMap[size];
            return quantityProperty && parseInt(item[quantityProperty]) > 0;
        });
    });


    const handleApply = () => {
        const FinalResult = AllProducts.filter(item => {
            // Check if the item's fabrics match the selected fabrics
            const fabricsCondition = ChooseFabrics.includes(item.fabrics);

            // Extract all colors for the item
            const colors = [
                ...(item.Scolor && item.Scolor.split(',')) || [],
                ...(item.Mcolor && item.Mcolor.split(',')) || [],
                ...(item.Lcolor && item.Lcolor.split(',')) || [],
                ...(item.XLcolor && item.XLcolor.split(',')) || [],
                ...(item.XXLcolor && item.XXLcolor.split(',')) || [],
                ...(item.XXXLcolor && item.XXXLcolor.split(',')) || [],
            ];

            // Check if any of the colors match the selected colors
            const colorsCondition = colors.some(color => ChooseColor.includes(color));

            // Map of size to quantity property
            const sizeQuantityMap = {
                'S': 'Squantity',
                'M': 'Mquantity',
                'L': 'Lquantity',
                'XL': 'XLquantity',
                'XXL': 'XXLquantity',
                'XXXL': 'XXXLquantity'
            };

            // Check if any selected size has a quantity greater than 0
            const sizeCondition = ChooseSize.some(size => {
                const quantityProperty = sizeQuantityMap[size];
                return quantityProperty && parseInt(item[quantityProperty]) > 0;
            });

            // Check if the item's price is within the specified range
            const priceCondition = (!minVal || parseInt(item.price) >= minVal) &&
                (!maxVal || parseInt(item.price) <= maxVal);

            // Combine all conditions
            return fabricsCondition && colorsCondition && sizeCondition && priceCondition;
        });

        setFilteredProfuct(FinalResult);
    }

    // useEffect(() => {
    //     handleApply();
    // }, [])

    const handleClear = () => {
        SelectedChooseColor([]);
        SelectedChooseFabrics([]);
        SelectedChooseSize([]);
    }


    return (
        <div>
            <div className=' flex flex-row justify-between items-center mt-[48px]'>

                <div className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase hidden lg:flex gap-3 text-[18px] text-[#7D7D7D]">
                    {fabricsdata &&
                        fabricsdata.map((item) => (
                            <button
                                key={item._id}
                                className={`${activeFabric === item.fabricsType
                                    ? 'activeFilter'
                                    : ''
                                    }`}
                                onClick={() => handleButtonClick(item.fabricsType)}
                            >
                                {item.fabricsType}
                            </button>
                        ))}

                </div>
                <div className=' flex flex-row gap-2 justify-center items-center align-middle'>
                    <div>
                        <button
                            className=" w-[155px] h-[43px] p-[10px] border-[2px] border-[#1C2E37] rounded-full text-[18px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase  flex justify-center items-center"
                            onClick={() => document.getElementById('my_modal_5').showModal()}
                        >Size Chart</button>

                        <dialog id="my_modal_5" className="modal  ">
                            <div className="modal-box w-11/12 max-w-5xl bg-transparent shadow-none">
                                <img className=' w-[900px] h-[800px]' src={sizeChart} alt="" />
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn btn-sm bg-white btn-circle  absolute right-2 top-2  shadow-lg">✕</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>

                    <div className="drawer drawer-end w-[155px] relative z-20">
                        <input id="my-drawer-6" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            {/* Page content here */}
                            <label htmlFor="my-drawer-6"
                                className="w-[155px] h-[43px]  flex justify-center items-center gap-10 border-2 border-[#1C2E37] rounded-full text-[18px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase"
                            >
                                Filter
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-6" className="drawer-overlay"></label>
                            <ul className="  w-[482px] min-h-screen  text-base-content bg-[#ececec]">

                                <div className="shadow-[0px_18px_70px_0px_rgba(0,_0,_0,_0.13)] bg-white relative flex flex-row justify-between w-full items-start pt-16 pb-8 px-8">
                                    <div className="text-xl font-['Helvetica_Now_Display'] font-bold text-[#1c1c1c] relative">
                                        Filter
                                    </div>
                                    <FontAwesomeIcon icon={faX} />
                                </div>

                                {/* fabrics filter */}
                                <div className="flex flex-col justify-end pt-4 gap-2 w-full items-start">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdown}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display'] font-medium">Fabrics</div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <div className=' divider '></div>
                                    {isOpen && (
                                        <>
                                            <div className=' grid grid-cols-3 gap-3'>
                                                {
                                                    fabricsdata && fabricsdata.map(item =>
                                                        <button key={item._id}
                                                            onClick={() => handleChoosedFabrics(item.fabricsType)}
                                                            className="border-solid flex flex-col justify-center ml-8 h-12 shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                            <div className="text-center text-sm font-['Helvetica_Now_Display'] font-medium text-[#7d7d7d] mx-8">
                                                                {item.fabricsType}
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* size filter */}
                                <div className="flex flex-col justify-end  gap-2 w-full items-start">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdownSize}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display'] font-medium">Size</div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <div className=' divider '></div>
                                    {isOpenSize && (
                                        <>

                                            <div className='grid grid-cols-5 gap-3'>
                                                {AllProducts.some(item => parseInt(item.Squantity) > 0) && (
                                                    <button className="border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica  flex justify-center items-center text-[#5A5A5A] `}
                                                            onClick={() => {
                                                                setActiveSize('S');
                                                                handleSize('S');
                                                            }}
                                                        >
                                                            S
                                                        </div>
                                                    </button>
                                                )}

                                                {AllProducts.some(item => parseInt(item.Mquantity) > 0) && (
                                                    <button className="border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica  flex justify-center items-center text-[#5A5A5A] `}
                                                            onClick={() => {
                                                                setActiveSize('M');
                                                                handleSize('M');
                                                            }}
                                                        >
                                                            M
                                                        </div>
                                                    </button>
                                                )}

                                                {AllProducts.some(item => parseInt(item.Lquantity) > 0) && (
                                                    <button className="border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica  flex justify-center items-center text-[#5A5A5A] `}
                                                            onClick={() => {
                                                                setActiveSize('L');
                                                                handleSize('L');
                                                            }}
                                                        >
                                                            L
                                                        </div>
                                                    </button>
                                                )}

                                                {AllProducts.some(item => parseInt(item.XLquantity) > 0) && (
                                                    <button className="border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica  flex justify-center items-center text-[#5A5A5A] `}
                                                            onClick={() => {
                                                                setActiveSize('XL');
                                                                handleSize('XL');
                                                            }}
                                                        >
                                                            XL
                                                        </div>
                                                    </button>
                                                )}

                                                {AllProducts.some(item => parseInt(item.XXLquantity) > 0) && (
                                                    <button className="border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica  flex justify-center items-center text-[#5A5A5A] `}
                                                            onClick={() => {
                                                                setActiveSize('XXL');
                                                                handleSize('XXL');
                                                            }}
                                                        >
                                                            XXL
                                                        </div>
                                                    </button>
                                                )}
                                                {AllProducts.some(item => parseInt(item.XXXLquantity) > 0) && (
                                                    <button className="border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px]">
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica  flex justify-center items-center text-[#5A5A5A] `}
                                                            onClick={() => {
                                                                setActiveSize('XXXL');
                                                                handleSize('XXXL');
                                                            }}
                                                        >
                                                            XXXL
                                                        </div>
                                                    </button>
                                                )}
                                            </div>

                                        </>
                                    )}
                                </div>

                                {/* color filter */}
                                <div className="flex flex-col justify-end  gap-2 w-full items-start">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdownColor}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display'] font-medium">Color</div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <div className=' divider '></div>
                                    {isOpenColor && (
                                        <>
                                            <div className=' grid grid-cols-4 gap-3'>
                                                {
                                                    combinedColors && combinedColors.map((color, index) => (
                                                        <button
                                                            key={index}
                                                            onClick={() => handleColour(color)}
                                                            className="flex flex-col justify-center w-20 h-10 items-center rounded-[70px] ml-8 mr-10"
                                                            style={{ backgroundColor: color }}
                                                        >
                                                            <div className="text-center text-sm font-['Helvetica_Now_Display'] font-medium 
                                                            " style={{ color: color }}>
                                                                {color}
                                                            </div>
                                                        </button>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* Price filter */}
                                <div className="flex flex-col justify-end  gap-2 w-full items-center ">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdownPrice}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display'] font-medium">Price</div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <div className=' divider '></div>
                                    <div className=' mx-1'>
                                        {isOpenPrice && (
                                            <>
                                                <p className=' text-[18px] text-[#3C6174] mb-5'>BDT {minVal} - BDT {maxVal}</p>
                                                <MultiRangeSlider
                                                    min={min} max={max}
                                                    minVal={minVal} setMinVal={setMinVal}
                                                    maxVal={maxVal} setMaxVal={setMaxVal}
                                                ></MultiRangeSlider>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-20 shadow-[0px_-18px_70px_0px_rgba(0,_0,_0,_0.13)] bg-white flex flex-col justify-center gap-1 w-full px-8 py-5">
                                    <div className="border-solid border-[#1c2e37] flex flex-col justify-center h-16 shrink-0 items-center border-2 rounded-[120px]">
                                        <button
                                            onClick={handleClear}
                                            className="text-center text-sm font-['Helvetica_Now_Display'] font-medium text-[#1c2e37]">
                                            Clear All
                                        </button>
                                    </div>
                                    <div
                                        onClick={handleApply}
                                        className="bg-[#1c2e37] flex flex-col justify-center h-16 shrink-0 items-center rounded-[120px]">
                                        <button className="text-center text-sm font-['Helvetica_Now_Display'] font-medium text-white">
                                            Apply
                                        </button>
                                    </div>
                                </div>



                            </ul>
                        </div>
                    </div>


                    <Link to='/viewAll' className=" hidden md:flex justify-center items-center w-[138px] h-[43px] bg-[#1C2E37] p-3 text-white rounded-full text-center text-[18px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase ">View All</Link>
                </div>
            </div>
        </div>
    );
};

export default Filter;