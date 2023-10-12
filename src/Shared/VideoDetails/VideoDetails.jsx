import React, { useContext, useEffect, useRef, useState } from 'react';
import sizeChart from '../../../public/photos/size chart.png';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import VideoDataColor from '../VideoDataColor/VideoDataColor';
import { Link } from 'react-router-dom';
const VideoDetails = ({ AllProducts, videoTitle, video, selectedColor, setSelectedColor, localCartData, setLocalCartData, user, doller, selectedCurrencyValue, handleCloseModal }) => {

    const productdata = AllProducts.find(productdata => productdata?.title === videoTitle);
    const videodata = video.find(productdata => productdata?.title === videoTitle);

    console.log(selectedColor)


    const [count, setCount] = useState(0);
    const availableSizes = ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

    const [activeSize, setActiveSize] = useState(() => {
        // Find the first available size
        for (const size of availableSizes) {
            if (productdata?.[`${size}quantity`] && parseInt(productdata?.[`${size}quantity`]) > 0) {
                return size;
            }
        }

        return ''; // If no size is available, set it to an empty string
    });
    const [activeID, setActiveID] = useState('');



    const customerEmail = user?.email;
    const customerName = user?.displayName;
    const ProductName = productdata?.title;
    const ProductImage = productdata?.images[0];
    const sellpercet = productdata?.sellpercet;
    const ProductPrice = productdata?.price;
    const ProductDetails = productdata?.description;
    const ProductSize = activeSize;
    const ProductQuantity = count;
    const ProductId = activeID;


    // console.log(ProductId)

    useEffect(() => {
        const retrievedData = JSON.parse(localStorage.getItem('cartData'));
        if (retrievedData) {
            setLocalCartData(retrievedData);
        }
    }, [setLocalCartData])

    // console.log("activeSize:", localCartData);

    let ProductHeightQuantity;

    if (activeSize === "S") {
        ProductHeightQuantity = productdata?.Squantity;
    } else if (activeSize === "M") {
        ProductHeightQuantity = productdata?.Mquantity;
    } else if (activeSize === "L") {
        ProductHeightQuantity = productdata?.Lquantity;
    } else if (activeSize === "XL") {
        ProductHeightQuantity = productdata?.XLquantity;
    } else if (activeSize === "XXL") {
        ProductHeightQuantity = productdata?.XXLquantity;
    } else if (activeSize === "XXXL") {
        ProductHeightQuantity = productdata?.XXXLquantity;
    }

    // console.log("ProductHeightQuantity:", ProductHeightQuantity);

    useEffect(() => {
        // Reset count to 0 when activeSize changes
        setCount(0);
    }, [activeSize]);



    const handleIncrement = () => {

        if (activeSize === "S") {
            if (count < parseInt(productdata?.Squantity)) {
                setCount(prevCount => prevCount + 1);
            }
        } else if (activeSize === "M") {
            if (count < parseInt(productdata?.Mquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "L") {
            if (count < parseInt(productdata?.Lquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "XL") {
            if (count < parseInt(productdata?.XLquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "XXL") {
            if (count < parseInt(productdata?.XXLquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }
        else if (activeSize === "XXXL") {
            if (count < parseInt(productdata?.XXXLquantity)) {
                setCount(prevCount => prevCount + 1);
            }
        }

    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(prevCount => prevCount - 1);
        }
    };

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };





    const handleAddCart = () => {

        if (selectedColor === '' && activeSize === '') {
            toast.error('Please Select Size', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return
        }
        const item = {
            customerEmail,
            customerName,
            ProductName,
            ProductImage,
            ProductDetails,
            ProductPrice,
            ProductSize,
            sellpercet,
            selectedColor,
            ProductQuantity,
            ProductHeightQuantity,
            ProductId
        };

        if (!Array.isArray(localCartData)) {
            // If not, initialize it as an empty array
            setLocalCartData([]);
        }

        // Create a new array with the existing data
        const updatedCartData = [...(localCartData || []), item];

        // Save to local storage
        localStorage.setItem('cartData', JSON.stringify(updatedCartData));

        // Update the state
        setLocalCartData(updatedCartData);

        setActiveSize('');
        setActiveID('');
        setCount(0);

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Added to Cart',
            showConfirmButton: false,
            timer: 1500
        });
    }

    const videoRef = useRef(null);
    return (
        <div>
            <div className=' flex justify-between'>
                <div>
                    <video
                        className="object-cover w-full h-[638px] rounded-xl"
                        src={`https://tahar-server.vercel.app/uploads/${videodata?.video?.filename} `}
                        autoPlay
                        ref={videoRef}
                        controlsList="nodownload noremoteplayback"
                    ></video>

                </div>

                <div key={productdata?._id}>
                    <div className=' flex flex-row gap-5'>
                        {productdata?.images.slice(0, 3).map((image, index) => (
                            <img
                                key={index}
                                className="w-40 h-40 rounded object-cover"
                                src={`https://tahar-server.vercel.app/uploads/${image}`}
                                alt=""
                            />
                        ))}
                    </div>
                    <h1 className=' text-[19px] font-semibold mt-3'>{productdata?.title}</h1>
                    <p className=' text-[#6F6F6F] mt-2 '>

                        {selectedCurrencyValue === 'BDT' ? (productdata?.Clearance === 'Sale' ? (
                            <>
                                <span className="line-through text-[#828282]">Tk.{parseInt(productdata?.price).toFixed(2)}</span> Tk.{((parseInt(productdata?.price) - (parseInt(productdata?.price) * (parseInt(productdata?.sellpercet) / 100)))).toFixed(2)}
                            </>
                        ) : (
                            `Tk.${productdata?.price}`
                        )) : (productdata?.Clearance === 'Sale' ? (
                            <>
                                <span className="line-through text-[#828282]">${parseFloat(productdata?.price * 2.5 * doller).toFixed(2)}</span>
                                $ {(((parseInt(productdata?.price) * 2.5 * doller) - ((parseInt(productdata?.price) * 2.5 * doller) * (parseInt(productdata?.sellpercet)) / 100))).toFixed(2)}
                            </>
                        ) : (
                            `$${productdata?.price * 2.5 * doller}`
                        ))}
                    </p>
                    <p className=' text-[#121212] mt-4 font-semibold'>Color</p>

                    <div className=" flex gap-2 mt-2">

                        <VideoDataColor
                            productdata={productdata}
                            activeSize={activeSize}
                            activeID={activeID}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            setActiveSize={setActiveSize}
                        ></VideoDataColor>
                    </div>

                    <p className=' text-[#121212] text[19px] mt-2 font-semibold'>Size</p>
                    <div className=" flex gap-2">
                        {
                            parseInt(productdata?.Squantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === productdata?._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`}
                                    onClick={() => {
                                        setActiveSize('S');
                                        setActiveID(productdata?._id);
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
                            parseInt(productdata?.Mquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === productdata?._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('M');
                                        setActiveID(productdata?._id);
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
                            parseInt(productdata?.Lquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === productdata?._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('L');
                                        setActiveID(productdata?._id);
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
                            parseInt(productdata?.XLquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === productdata?._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('XL');
                                        setActiveID(productdata?._id);
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
                            parseInt(productdata?.XXLquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === productdata?._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('XXL');
                                        setActiveID(productdata?._id);
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
                            parseInt(productdata?.XXXLquantity) > 0 ? (
                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === productdata?._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                    }`} onClick={() => {
                                        setActiveSize('XXXL');
                                        setActiveID(productdata?._id);
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

                    {/* description */}
                    <p className=' text-[#121212] text[19px] mt-2 font-semibold'>Description</p>
                    <p className=' text-[#939393] text-[18px] w-[473px]'>{productdata?.description}</p>
                    <div className=' flex flex-row mt-5 gap-4'>
                        <Link to={`/product/${productdata?._id}`}>

                            <button className=' w-[238px] h-[59px] text-[#000000] text-[19px] border-[3px] border-[#000000] bg-transparent rounded-[120px]'>View Details</button>

                        </Link>
                        <div>
                            <button onClick={handleAddCart}
                                className={`w-[238px] h-[59px] text-white text-[19px] bg-black rounded-[120px] ${activeSize === '' ? 'disabled' : ''}`}>Add To Cart</button>

                            <ToastContainer />
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default VideoDetails;