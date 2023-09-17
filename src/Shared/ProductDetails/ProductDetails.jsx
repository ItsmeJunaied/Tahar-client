import React, { useContext, useEffect, useState } from 'react';
import PremiumServices from '../../Pages/Home/PremiumServices/PremiumServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinus, faPlus, faShareNodes, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import DetailedColour from '../DetailedColour/DetailedColour';

const ProductDetails = () => {


    const { user, setAllCartData } = useContext(AuthContext);
    const data = useLoaderData()
    const [count, setCount] = useState(0);
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');

    const customerEmail = user?.email;
    const customerName = user?.displayName;
    const ProductName = data.title;
    const ProductImage = data.images[0];
    const ProductPrice = data.price;
    const ProductSize = activeSize;
    const ProductQuantity = count;


    // console.log("activeSize:", activeSize);

    let ProductHeightQuantity;

    if (activeSize === "S") {
        ProductHeightQuantity = data.Squantity;
    } else if (activeSize === "M") {
        ProductHeightQuantity = data.Mquantity;
    } else if (activeSize === "L") {
        ProductHeightQuantity = data.Lquantity;
    } else if (activeSize === "XL") {
        ProductHeightQuantity = data.XLquantity;
    } else if (activeSize === "XXL") {
        ProductHeightQuantity = data.XXLquantity;
    } else if (activeSize === "XXXL") {
        ProductHeightQuantity = data.XXXLquantity;
    }

    // console.log("ProductHeightQuantity:", ProductHeightQuantity);

    useEffect(() => {
        // Reset count to 0 when activeSize changes
        setCount(0);
    }, [activeSize]);



    const handleIncrement = () => {

        if (activeSize === "S") {
            if (count < parseInt(data.Squantity)) {
                setCount(prevCount => prevCount + 1);
            }
        } else if (activeSize === "M") {
            if (count < parseInt(data.Mquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "L") {
            if (count < parseInt(data.Lquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "XL") {
            if (count < parseInt(data.XLquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "XXL") {
            if (count < parseInt(data.XXLquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "XXXL") {
            if (count < parseInt(data.XXXLquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }

    };

    const handleDecrement = () => {
        if (count > 0) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };


    useEffect(() => {
        fetch('https://tahar-server.vercel.app/userCartData')
            .then(res => res.json())
            .then(data => setAllCartData(data))
    })
    // send data to backedn
    const item = { customerEmail, customerName, ProductName, ProductImage, ProductDetails, ProductPrice, ProductSize, ProductQuantity, ProductHeightQuantity }
    // console.log(item)
    const handleAddCart = () => {
        // console.log(item)
        fetch('https://tahar-server.vercel.app/userCartData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(responseData => {
                console.log(responseData);
                if (responseData.success) {
                    fetch('https://tahar-server.vercel.app/userCartData')
                        .then(res => res.json())
                        .then(updatedData => setAllCartData(updatedData));
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Added to Cart',
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
            })
    }




    return (
        <div>
            <div className=' flex flex-col lg:flex-row gap-10 mx-[100px] my-[100px]'>
                <div className=' flex flex-col w-1/2'>

                    <div className='flex flex-row'>
                        {/* Container 1 */}
                        <div className='flex flex-col gap-5'>
                            {data?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    className={`w-[165px] h-[160px] rounded-[10px] ${index === selectedImageIndex ? 'border-2 border-blue-500' : ''}`}
                                    src={`https://tahar-server.vercel.app/uploads/${image}`}
                                    alt=""
                                    onClick={() => handleImageClick(index)}
                                />
                            ))}
                        </div>

                        {/* Container 2 */}
                        <div className='ml-5'>
                            <img
                                className='w-[622px] h-[700px] rounded-[10px]'

                                src={`https://tahar-server.vercel.app/uploads/${data.images[selectedImageIndex]}`}
                                alt=""
                            />
                        </div>
                    </div>
                    <div>
                        <PremiumServices ></PremiumServices>
                    </div>
                </div>
                <div className=' w-1/2'>

                    <h1 className=' text-[40px] mb-5'>{data.category} | {data.title}</h1>
                    <p className=' mb-5' >
                        <FontAwesomeIcon className=' h-[33.8px] text-[#DAB658]' icon={faStar} />
                        <FontAwesomeIcon className=' h-[33.8px] text-[#DAB658]' icon={faStar} />
                        <FontAwesomeIcon className=' h-[33.8px] text-[#DAB658]' icon={faStar} />
                        <FontAwesomeIcon className=' h-[33.8px] text-[#DAB658]' icon={faStar} />
                        <FontAwesomeIcon className=' h-[33.8px] text-[#DAB658]' icon={faStar} />
                    </p>
                    <div className=' flex flex-row justify-between align-middle items-center gap-2 mt-3'>
                        <button className=' w-[154px] h-[54px] rounded-[10px] text-[#000000B0] bg-transparent border-[2px] border-[#0000002E] '>
                            BDT {data.price}
                        </button>
                        <p className=' text-[15px] text-[#00000061] font-bold '>Tax included. Shipping calculated at checkout.</p>
                        <button className=' w-[177px] h-[42px] text-[#1C2E37] rounded-[10px] bg-transparent border-[2px] border-[#1C2E37] '><FontAwesomeIcon icon={faHeart} />Add to Wishlist</button>
                        <button className=' w-[110px] h-[42px] text-[#1C2E37] rounded-[10px] bg-transparent border-[2px] border-[#1C2E37] '><FontAwesomeIcon icon={faShareNodes} />Share</button>
                    </div>
                    <div className="divider mt-5 text-[#0000001C]"></div>
                    {/* color */}
                    <p className=' text-black text-[19px] font-semibold mb-3'>Color</p>


                    {/* <ColourChanges data={data} activeSize={activeSize} activeID={activeID}></ColourChanges> */}
                    <DetailedColour data={data} activeSize={activeSize} activeID={activeID}></DetailedColour>


                    <p className=' text-black text-[19px] font-semibold mb-3'>Size</p>
                    <div className=" flex gap-2">
                        {
                            parseInt(data.Squantity) > 0 ? (
                                <button className={`w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black ${activeSize === 'S' ? 'border-black' : 'bg-transparent'}`}
                                    onClick={() => {
                                        setActiveSize('S');
                                        setActiveID(data._id);
                                    }}
                                >S</button>
                            ) : (
                                <button
                                    className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    S
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} size="2x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.Mquantity) > 0 ? (
                                <button className={`w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black ${activeSize === 'M' ? 'border-black' : 'bg-transparent'}`} onClick={() => {
                                    setActiveSize('M');
                                    setActiveID(data._id);
                                }}>M</button>
                            ) : (
                                <button
                                    className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    M
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} size="2x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.Lquantity) > 0 ? (
                                <button className={`w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black ${activeSize === 'L' ? 'border-black' : 'bg-transparent'}`} onClick={() => {
                                    setActiveSize('L');
                                    setActiveID(data._id);
                                }}>L</button>
                            ) : (
                                <button
                                    className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    L
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} size="2x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.XLquantity) > 0 ? (
                                <button className={`w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black ${activeSize === 'XL' ? 'border-black' : 'bg-transparent'}`} onClick={() => {
                                    setActiveSize('XL');
                                    setActiveID(data._id);
                                }}>XL</button>
                            ) : (
                                <button
                                    className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    XL
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} size="2x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.XXLquantity) > 0 ? (
                                <button className={`w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black ${activeSize === 'XXL' ? 'border-black' : 'bg-transparent'}`} onClick={() => {
                                    setActiveSize('XXL');
                                    setActiveID(data._id);
                                }}>XXL</button>
                            ) : (
                                <button
                                    className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    XXL
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} size="2x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.XXXLquantity) > 0 ? (
                                <button className={`w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black ${activeSize === 'XXXL' ? 'border-black' : 'bg-transparent'}`} onClick={() => {
                                    setActiveSize('XXXL');
                                    setActiveID(data._id);
                                }}>XXXL</button>
                            ) : (
                                <button
                                    className="w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    XXXL
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faTimes} size="2x" />
                                    </div>
                                </button>
                            )
                        }

                    </div>
                    <p className=' text-black text-[19px] font-semibold '>Quantity</p>
                    <p className=' text-xs mb-3'>Choose upto Highest Stock based on size</p>
                    {/* quantity */}
                    <div className='mb-3 w-[118px] h-[43px] rounded-[10px] bg-transparent border-[2px] border-[#0000002E] flex justify-evenly items-center align-middle'>
                        <button onClick={handleDecrement}>
                            <FontAwesomeIcon icon={faMinus} />
                        </button>
                        <p>{count}</p>
                        <button onClick={handleIncrement}>
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>

                    <div className=' flex flex-col lg:flex-row gap-5 mb-5'>
                        <button onClick={handleAddCart} className=' w-[415px] h-[54px] rounded-[10px] text-white bg-[#1C2E37] border-none  text-[18px] font-semibold mt-2'>
                            Add to card
                        </button>
                        <button className=' w-[415px] h-[54px] text-black border-[2px] border-[#191E1B4F] rounded-[10px] bg-transparent text-[18px] font-semibold mt-2'>
                            Buy Now
                        </button>
                    </div>
                    <p className=' text-black text-[19px] font-semibold mb-3'>Delivery Options</p>
                    <div className=' flex flex-row gap-3  items-center'>
                        <input type="text" placeholder=' Enter Your Zipcode' className=' w-[276px] h-[67px] rounded-[10px] border-[2px] border-[#191E1B4F]' />
                        <button className=' w-[148px] h-[67px] rounded-[10px] text-white bg-[#1C2E37] border-none  text-[18px] font-semibold '>
                            Add
                        </button>
                    </div>
                    <div className=' divider mb-5'></div>

                    <div className="collapse collapse-arrow bg-base-200 w-[624px]">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium">
                            Click me to show/hide content
                        </div>
                        <div className="collapse-content">
                            <p>hello</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;