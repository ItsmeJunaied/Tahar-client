import { faAngleDown, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import MultiRangeSlider from '../../Shared/MultiRangeSlider/MultiRangeSlider';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../Provider/AuthProvider';
import sizeChart from '../../../public/photos/size chart.png'

const ShopWomenFilter = ({ ShopWomen, activeFabric, setActiveFabric, setFilteredProfuct }) => {
    // console.log(ShopWomen)
    const { fabricsdata } = useContext(AuthContext);
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');

    // console.log(ShopWomen)

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

    const SColor = ShopWomen?.map(item => item?.Scolor);
    const MColor = ShopWomen?.map(item => item?.Mcolor);
    const LColor = ShopWomen?.map(item => item?.Lcolor);
    const XLColor = ShopWomen?.map(item => item?.XLcolor);
    const XXLColor = ShopWomen?.map(item => item?.XXLcolor);
    const XXXLColor = ShopWomen?.map(item => item?.XXXLcolor);

    const combinedColors = [...SColor, ...MColor, ...LColor, ...XLColor, ...XXLColor, ...XXXLColor]
        .flatMap(colors => colors.split(','))
        .filter(color => color !== '')
        .filter((color, index, self) => self.indexOf(color) === index);

    // console.log(combinedColors);

    // price
    const [minVal, setMinVal] = useState();
    const [maxVal, setMaxVal] = useState();
    const MaxMinPrice = ShopWomen.map(item => item.price);
    const max = Math.max(...MaxMinPrice.map(price => parseFloat(price)));
    const min = Math.min(...MaxMinPrice.map(price => parseFloat(price)));

    useEffect(() => {
        setMinVal(min)
    }, [min, setMinVal])

    useEffect(() => {
        setMaxVal(max)
    }, [max, setMaxVal])


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

    // console.log(ChooseSize)

    //show selected fabricsData
    const FindFabricsData = ShopWomen.filter(item =>
        ChooseFabrics?.includes(item.fabrics)
    );

    //show selected color data
    const FindColordata = ShopWomen.filter(item => {
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
    const FindSizedata = ShopWomen.filter(item => {
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
        const FinalResult = ShopWomen.filter(item => {
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
        setMinVal(min);
        setMaxVal(max);
        setActiveFabric('');
        setFilteredProfuct([])
    }


    return (
        <div>
            <div className=' flex flex-row justify-between items-center mt-[48px]'>

                <div className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica] uppercase hidden lg:flex gap-3 text-[18px] text-[#7D7D7D]">
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
                            className=" w-[155px] h-[43px] p-[10px] border-[2px] border-[#1C2E37] rounded-full text-[18px] [font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica] uppercase  flex justify-center items-center"
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
                                className="w-[155px] h-[43px]  flex justify-center items-center gap-10 border-2 border-[#1C2E37] rounded-full text-[18px] [font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica] uppercase"
                            >
                                Filter
                            </label>
                        </div>
                        <div className="drawer-side">
                            <label htmlFor="my-drawer-6" className="drawer-overlay"></label>
                            <ul className="  w-[482px] min-h-screen  text-base-content bg-[#ececec]">

                                <div className="shadow-[0px_18px_70px_0px_rgba(0,_0,_0,_0.13)] bg-white relative flex flex-row justify-between w-full items-start pt-16 pb-8 px-8">
                                    <div className="text-xl font-['Helvetica_Now_Display-Medium',Helvetica'] font-bold text-[#1c1c1c] relative">
                                        Filter
                                    </div>
                                    <button onClick={() => document.getElementById('my-drawer-6').checked = false}>
                                        <FontAwesomeIcon icon={faX} />
                                    </button>
                                </div>

                                {/* fabrics filter */}
                                <div className="flex flex-col justify-end pt-4 gap-2 w-full items-start mt-5">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdown}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium">Fabrics</div>
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
                                                            className={`border-solid flex flex-col justify-center ml-8 h-12 shrink-0 items-center  border-2 rounded-[70px] ${ChooseFabrics.includes(item.fabricsType) ? 'border-black text-black' : 'border-[#0000001F]'}`}>
                                                            <div className="text-center text-sm font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium  mx-8">
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
                                <div className="flex flex-col justify-end  gap-2 w-full items-start mt-5">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdownSize}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium">Size</div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <div className=' divider '></div>
                                    {isOpenSize && (
                                        <>

                                            <div className='grid grid-cols-5 gap-3'>
                                                {ShopWomen.some(item => parseInt(item.Squantity) > 0) && (
                                                    <button
                                                        onClick={() => {
                                                            setActiveSize('S');
                                                            handleSize('S');
                                                        }}
                                                        className={`border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px] ${ChooseSize.includes('S') ? 'border-black text-black ' : ''}`}>
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica  flex justify-center items-center `}

                                                        >
                                                            <p>S</p>
                                                        </div>
                                                    </button>
                                                )}

                                                {ShopWomen.some(item => parseInt(item.Mquantity) > 0) && (
                                                    <button
                                                        onClick={() => {
                                                            setActiveSize('M');
                                                            handleSize('M');
                                                        }}
                                                        className={`border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px] ${ChooseSize.includes('M') ? 'border-black text-black ' : ''}`}>
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica  flex justify-center items-center  `}

                                                        >
                                                            <p>M</p>
                                                        </div>
                                                    </button>
                                                )}

                                                {ShopWomen.some(item => parseInt(item.Lquantity) > 0) && (
                                                    <button
                                                        onClick={() => {
                                                            setActiveSize('L');
                                                            handleSize('L');
                                                        }}
                                                        className={`border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px] ${ChooseSize.includes('L') ? 'border-black text-black ' : ''}`}>
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica  flex justify-center items-center `}

                                                        >
                                                            <p>L</p>
                                                        </div>
                                                    </button>
                                                )}

                                                {ShopWomen.some(item => parseInt(item.XLquantity) > 0) && (
                                                    <button
                                                        onClick={() => {
                                                            setActiveSize('XL');
                                                            handleSize('XL');
                                                        }}
                                                        className={`border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px] ${ChooseSize.includes('XL') ? 'border-black text-black ' : ''}`}>
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica  flex justify-center items-center `}

                                                        >
                                                            <p>XL</p>
                                                        </div>
                                                    </button>
                                                )}

                                                {ShopWomen.some(item => parseInt(item.XXLquantity) > 0) && (
                                                    <button
                                                        onClick={() => {
                                                            setActiveSize('XXL');
                                                            handleSize('XXL');
                                                        }}
                                                        className={`border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px] ${ChooseSize.includes('XXL') ? 'border-black text-black ' : ''}`}>
                                                        <div
                                                            className={`font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica  flex justify-center items-center  `}

                                                        >
                                                            <p>XXL</p>
                                                        </div>
                                                    </button>
                                                )}
                                                {ShopWomen.some(item => parseInt(item.XXXLquantity) > 0) && (
                                                    <button
                                                        onClick={() => {
                                                            setActiveSize('XXXL');
                                                            handleSize('XXXL');
                                                        }}
                                                        className={`border-solid flex flex-col justify-center ml-8 h-12 w-full shrink-0 items-center border-[#0000001F] border-2 rounded-[70px] ${ChooseSize.includes('XXXL') ? 'border-black text-black ' : ''}`}>
                                                        <div className={`font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica  flex justify-center items-center  `}

                                                        >
                                                            <p>XXXL</p>
                                                        </div>
                                                    </button>
                                                )}
                                            </div>

                                        </>
                                    )}
                                </div>

                                {/* color filter */}
                                <div className="flex flex-col justify-end  gap-2 w-full items-start mt-5">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdownColor}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium ">Color</div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                    <div className=' divider '></div>
                                    {isOpenColor && (
                                        <>
                                            <div className=' grid grid-cols-4 gap-3'>
                                                {
                                                    combinedColors && combinedColors.map((color, index) => (
                                                        <div key={index} className={`${ChooseColor.includes(color) ? 'border-[2px] border-black p-2 rounded-full' : ''}`}>
                                                            <button

                                                                onClick={() => handleColour(color)}
                                                                className={`flex flex-col justify-center w-20 h-10 items-center rounded-[70px]  mx-auto `}
                                                                style={{ backgroundColor: color }}
                                                            >
                                                                <div className="text-center text-sm font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium
                                                            " style={{ color: color }}>
                                                                    {color}
                                                                </div>
                                                            </button>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* Price filter */}
                                <div className="flex flex-col justify-end  gap-2 w-full items-center mt-5 ">
                                    <div className="self-stretch flex flex-row justify-between items-center align-middle ml-8 mr-10" onClick={toggleDropdownPrice}>
                                        <div className="text-center text-lg font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium">Price</div>
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
                                    <button
                                        onClick={handleClear}
                                        className="border-solid border-[#1c2e37] flex flex-col justify-center h-16 shrink-0 items-center border-2 rounded-[120px]">
                                        <div

                                            className="text-center text-[19px] font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium text-[#1c2e37]">
                                            Clear All
                                        </div>
                                    </button>
                                    <button
                                        onClick={handleApply}
                                        className="bg-[#1c2e37] flex flex-col justify-center h-16 shrink-0 items-center rounded-[120px]">
                                        <div className="text-center text-[19px] font-['Helvetica_Now_Display-Medium',Helvetica'] font-medium text-white">
                                            Apply
                                        </div>
                                    </button>
                                </div>



                            </ul>
                        </div>
                    </div>


                    <Link to='/viewAll' className=" hidden md:flex justify-center items-center w-[138px] h-[43px] bg-[#1C2E37] p-3 text-white rounded-full text-center text-[18px] [font-family:'Helvetica_Now_Display-Medium',Helvetica-Medium',Helvetica] uppercase ">View All</Link>
                </div>
            </div>
        </div>
    );
};


export default ShopWomenFilter;