import React, { useContext, useEffect, useState } from 'react';
import PremiumServices from '../../Pages/Home/PremiumServices/PremiumServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMinus, faPlus, faShareNodes, faSlash, faStar, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import DetailedColour from '../DetailedColour/DetailedColour';
import FrequentkyBought from '../FrequentkyBought/FrequentkyBought';
import PremiumServicesDetails from '../../Pages/Home/PremiumServices/PremiumServicesDetails';
import CollectionCard from '../../Pages/Home/CollectionCard/CollectionCard';
import ShopByCategory from '../../Pages/Home/ShopByCategory/ShopByCategory';
import RatingReview from '../RatingReview/RatingReview';
const ProductDetails = () => {


    const { user, doller, setLocalCartData, selectedCurrencyValue, there, setFavouriteData } = useContext(AuthContext);

    const data = useLoaderData();
    // console.log(data)
    const [count, setCount] = useState(0);
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');
    const [ratingData, setRatingData] = useState([]);

    const navigate = useNavigate();

    useState(() => {
        fetch('https://taharz.onrender.com/rating')
            .then(res => res.json())
            .then(data => setRatingData(data))
    }, [])

    const customerEmail = user?.email;
    const customerName = user?.displayName;
    const ProductName = data.title;
    const ProductImage = data.images[0];
    const sellpercet = data.sellpercet;

    const priceInBDT = data.price; // Regular price in BDT
    const salePriceInBDT = data.Clearance === 'Sale' ? (parseInt(priceInBDT) - (parseInt(priceInBDT) * (parseInt(sellpercet) / 100))).toFixed(2) : '';

    const priceInUSD = (priceInBDT * 2.5 * doller).toFixed(2);
    const salePriceInUSD = (salePriceInBDT * 2.5 * doller).toFixed(2);



    const ProductSize = activeSize;
    const ProductQuantity = count;
    const ProductId = activeID;
    const ProductSale = data.Clearance;
    const selectedColor = data.selectedColor;
    // console.log(ProductId)
    useEffect(() => {
        const retrievedData = JSON.parse(localStorage.getItem('cartData'));
        setLocalCartData(retrievedData);
    }, [setLocalCartData])

    // console.log("activeSize:", localCartData);

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




    const handleAddCart = () => {

        const item = {
            customerEmail,
            customerName,
            ProductName,
            ProductImage,
            ProductDetails,
            priceInBDT,
            ProductSize,
            salePriceInBDT,
            selectedColor,
            priceInUSD,
            salePriceInUSD,
            sellpercet,
            ProductQuantity,
            ProductHeightQuantity,
            ProductId,
            ProductSale

        };
        console.log(item)

        // Get the current cart data from local storage
        const currentCartData = JSON.parse(localStorage.getItem('cartData')) || [];

        // Add the new item to the cart data
        currentCartData.push(item);

        // Save the updated cart data back to local storage
        localStorage.setItem('cartData', JSON.stringify(currentCartData));

        setLocalCartData(currentCartData);
        // Trigger a notification
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500
        });
    }


    const handleBuyNow = () => {


        const item = {
            customerEmail,
            customerName,
            ProductName,
            ProductImage,
            ProductDetails,
            priceInUSD,
            salePriceInUSD,
            priceInBDT,
            ProductSize,
            salePriceInBDT,
            sellpercet,
            selectedColor,
            ProductQuantity,
            ProductHeightQuantity,
            ProductId,
            ProductSale
        };

        // Clear existing cart data
        localStorage.removeItem('cartData');

        // Add the new item to the cart data
        const currentCartData = [item];

        // Save the updated cart data back to local storage
        localStorage.setItem('cartData', JSON.stringify(currentCartData));

        // Trigger a notification
        setLocalCartData(currentCartData);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500
        });

        // Redirect to '/checkout'
        // history.push('/checkout');
        navigate('/checkout')
    }


    const filteredRating = ratingData.filter(item => item.productId === data._id).map(item => item.rating);
    const averageRating = filteredRating.length > 0 ? filteredRating.reduce((a, b) => a + b) / filteredRating.length : 0;

    const roundedAverage = Math.round(averageRating);

    // Generate stars for display
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<FontAwesomeIcon key={i} className={` w-[33.8px] h-[33.8px] ${i <= roundedAverage ? 'text-[#DAB658]' : 'text-gray-300'}`} icon={faStar} />);
    }

    const handlefavourite = (id) => {
        let favourites = JSON.parse(localStorage.getItem('favourite')) || [];

        const index = favourites.indexOf(id);

        if (index !== -1) {
            // If already in favourites, remove it
            favourites.splice(index, 1);
        } else {
            // If not in favourites, add it
            favourites.push(id);
        }

        localStorage.setItem('favourite', JSON.stringify(favourites));

        setFavouriteData(favourites)
    }

    useEffect(() => {
        const retrievedData = JSON.parse(localStorage.getItem('favourite'));
        setFavouriteData(retrievedData);
    }, [setFavouriteData])
    return (
        <div>
            <div className=' flex flex-col lg:flex-row gap-10 lg:mx-[100px] lg:my-[100px]'>
                <div className=' flex flex-col w-1/2'>

                    {/* Container 1*/}
                    <div className='lg:flex flex-row hidden '>

                        <div className='flex flex-col gap-5'>
                            {data?.images?.map((image, index) => (
                                <img
                                    key={index}
                                    className={`w-[165px] h-[160px] rounded-[10px] ${index === selectedImageIndex ? 'border-2 border-[#DBC896]' : ''}`}
                                    src={`https://taharz.onrender.com/uploads/${image}`}
                                    alt=""
                                    onClick={() => handleImageClick(index)}
                                />
                            ))}
                        </div>


                        <div className='ml-5 '>
                            <img
                                className='w-[622px] h-[700px] rounded-[10px] object-cover image-box'

                                src={`https://taharz.onrender.com/uploads/${data.images[selectedImageIndex]}`}
                                alt=""
                            />
                        </div>


                    </div>
                    {/* Container 2 */}
                    <div className='lg:hidden'>
                        <div className="carousel w-screen">
                            <div id="slide1" className="carousel-item relative w-screen">
                                {data?.images?.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`https://taharz.onrender.com/uploads/${image}`}
                                        className=" w-screen" />

                                ))}
                                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                    <a href="#slide4" className="btn btn-circle">❮</a>
                                    <a href="#slide2" className="btn btn-circle">❯</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' lg:flex hidden'>
                        <PremiumServicesDetails></PremiumServicesDetails>
                    </div>



                </div>
                <div className=' lg:w-1/2 '>

                    <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase text-[30px] lg:text-[40px] mb-5 ">{data.category} | {data.title}</h1>
                    <p className='mb-5'>
                        {stars}
                        <span className='ml-2 text-[30px]'>({filteredRating.length})</span>
                    </p>

                    <div className=" flex flex-row justify-between align-middle items-center gap-2 mt-3 ">
                        <button className="w-[154px] h-[54px] rounded-[10px] text-[#000000B0] bg-transparent border-[2px] border-[#0000002E] [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase">
                            <p className='text-lg font-bold'>
                                {selectedCurrencyValue === 'BDT' ? (
                                    data.Clearance === 'Sale' ?
                                        (salePriceInBDT && `Tk.${salePriceInBDT}`) :
                                        (priceInBDT && `Tk.${priceInBDT}`)
                                ) : (
                                    data.Clearance === 'Sale' ?
                                        (salePriceInUSD && `$${salePriceInUSD}`) :
                                        (priceInUSD && `$${priceInUSD}`)
                                )}
                            </p>


                        </button>

                        <p className=" text-[15px] text-[#00000061] font-bold [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Tax included. Shipping calculated at checkout.</p>

                        <button onClick={() => handlefavourite(data._id)} className=" w-[177px] h-[42px] text-[#1C2E37] rounded-[10px] text-[12px] lg:text-[16px] bg-transparent border-[2px] border-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">
                            <FontAwesomeIcon icon={faHeart} />

                            {JSON.parse(localStorage.getItem('favourite'))?.includes(data._id) ? 'Added to Wishlist' : 'Add to Wishlist'}
                        </button>

                        <button className=" w-[110px] h-[42px] text-[#1C2E37] rounded-[10px] text-[12px] lg:text-[16px] bg-transparent border-[2px] border-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica] "><FontAwesomeIcon icon={faShareNodes} />Share</button>
                    </div>
                    <div className="divider mt-5 text-[#0000001C]"></div>
                    {/* color */}
                    <p className=' text-black text-[19px] font-semibold mb-3'>Color</p>


                    <DetailedColour
                        data={data}
                        there={there}
                    ></DetailedColour>

                    {/*  */}

                    <p className=' text-black text-[19px] font-semibold mb-3'>Size</p>
                    <div className=" flex gap-2">
                        {
                            parseInt(data.Squantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === data._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`}
                                    onClick={() => {
                                        setActiveSize('S');
                                        setActiveID(data._id);
                                    }}
                                >S</button>
                            ) : (
                                <button
                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    S
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faSlash} size="x" />

                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.Mquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === data._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('M');
                                        setActiveID(data._id);
                                    }}>M</button>
                            ) : (
                                <button
                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    M
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.Lquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === data._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('L');
                                        setActiveID(data._id);
                                    }}>L</button>
                            ) : (
                                <button
                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    L
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.XLquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === data._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('XL');
                                        setActiveID(data._id);
                                    }}>XL</button>
                            ) : (
                                <button
                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    XL
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.XXLquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === data._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('XXL');
                                        setActiveID(data._id);
                                    }}>XXL</button>
                            ) : (
                                <button
                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    XXL
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                    </div>
                                </button>
                            )
                        }
                        {
                            parseInt(data.XXXLquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === data._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('XXXL');
                                        setActiveID(data._id);
                                    }}>XXXL</button>
                            ) : (
                                <button
                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                    disabled
                                >
                                    XXXL
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                    </div>
                                </button>
                            )
                        }

                    </div>
                    <p className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] mt-2 text-black text-[19px] font-semibold ">Quantity</p>
                    <p className=" text-xs mb-3 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Choose upto Highest Stock based on size</p>
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
                        <button onClick={handleAddCart} className=' w-[350px] lg:w-[415px] h-[54px] rounded-[10px] text-white bg-[#1C2E37] border-none  text-[18px] font-semibold mt-2'>
                            Add to card
                        </button>
                        <button onClick={handleBuyNow} className=' w-[350px] lg:w-[415px] h-[54px] text-black border-[2px] border-[#191E1B4F] rounded-[10px] bg-transparent text-[18px] font-semibold mt-2'>
                            Buy Now
                        </button>
                    </div>

                    <div className=' divider mb-5'></div>

                    <div className="collapse collapse-arrow bg-base-200 w-[350px] lg:w-[624px]">
                        <input type="checkbox" />
                        <div className="collapse-title text-xl font-medium [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                            Click me to show/hide content
                        </div>
                        <div className="collapse-content">
                            <p className="[font-family:'Helvetica_Now_Display-Medium',Helvetica]">hello</p>
                        </div>
                    </div>
                </div>
                <div className=' lg:hidden'>
                    <PremiumServicesDetails></PremiumServicesDetails>
                </div>
            </div>
            <div className=' lg:flex hidden'>
                <FrequentkyBought data={data} selectedCurrencyValue={selectedCurrencyValue} doller={doller}></FrequentkyBought>

            </div>

            <div className=' mt-10 mb-10 mx-[100px] lg:flex hidden'>
                <RatingReview data={data}></RatingReview>
            </div>
            <div className=' mt-10 mb-10 lg:mx-[100px]'>
                <ShopByCategory></ShopByCategory>
            </div>
        </div>
    );
};

export default ProductDetails;