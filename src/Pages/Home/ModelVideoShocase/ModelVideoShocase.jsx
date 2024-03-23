import './ModelVideoShocase.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


import { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useState } from 'react';
import VideoDetails from '../../../Shared/VideoDetails/VideoDetails';

const ModelVideoShocase = () => {
    const { AllProducts, setAllCartData, localCartData, setLocalCartData, user, doller, selectedCurrencyValue, selectedColor, setSelectedColor, there } = useContext(AuthContext);
    const [videoTitle, setVideoTitle] = useState(null);

    const [video, setVideo] = useState([]);

    const handleVideoDetails = (title) => {
        setVideoTitle(title);
        document.getElementById('my_modal_1').showModal();
    }


    // console.log(AllProducts)
    useEffect(() => {
        fetch('https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/video')
            .then(res => res.json())
            .then(data => setVideo(data))
    }, [])

    const videoRef = useRef(null);

    const handleCloseModal = () => {
        document.getElementById('my_modal_1').close();
        setVideoTitle(null);
    }

    useEffect(() => {
        const modalElement = document.getElementById('my_modal_1');

        if (!modalElement) {
            console.error("Modal element with ID 'my_modal_1' not found.");
            return;
        }

        const handleModalHidden = () => {
            const currentVideoRef = videoRef.current;
            if (currentVideoRef) {
                currentVideoRef.pause();
            }
        };

        modalElement.addEventListener('hidden.bs.modal', handleModalHidden);

        return () => {
            modalElement.removeEventListener('hidden.bs.modal', handleModalHidden);
        };
    }, []);
    



    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: false,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className=' mt-20'>
            <style>
                {`
        .slick-prev:before, .slick-next:before {
            display: None;
        }

        video {
            max-width: 95%;
        }

        @media (max-width: 640px) {
            video {
                max-width: 90%;
                margin-left: 8px;
            }
        }
    `}
            </style>

            <Slider {...settings} >
                {
                    video.map(item =>
                        <div key={item._id}>
                            <button
                                className="video-container w-[429px] h-[597px] relative"
                                onClick={() => {
                                    handleVideoDetails(item?.fileInfo?.title);
                                    document.getElementById('my_modal_1').showModal();
                                }}
                            >
                                <video ref={videoRef}
                                    className="object-cover lg:w-full lg:h-full  rounded-xl"
                                    src={item?.fileInfo?.url}
                                    autoPlay
                                    muted
                                    controls
                                    loop
                                ></video>
                                <div className="video-overlay w-full h-full video-overlay">
                                    <div className=' flex justify-start align-middle items-center gap-5'>
                                        {
                                            AllProducts.map(product => {
                                                if (product.title === item?.fileInfo?.title) {
                                                    return (
                                                        <div key={item._id} className="your-class-name">
                                                            <img className=' w-28 h-28 rounded object-cover' src={`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/uploads/${product.images[0]}`} alt="" />
                                                            <div className="flex flex-col justify-start align-start items-start">
                                                                <h1 className="text-[19px]">{product?.title}</h1>
                                                                <p className={`${there === 'light' ? 'text-black' : 'text-[#DBC896]'} text-[18px]`}>
                                                                    {selectedCurrencyValue === 'BDT' ? (product.Clearance === 'Sale' ? (
                                                                        <>
                                                                            <span className="line-through text-[#828282]">Tk.{parseInt(product.price).toFixed(2)}</span> Tk.{((parseInt(product.price) - (parseInt(product.price) * (parseInt(product.sellpercet) / 100)))).toFixed(2)}
                                                                        </>
                                                                    ) : (
                                                                        `Tk.${product.price}`
                                                                    )) : (product.Clearance === 'Sale' ? (
                                                                        <>
                                                                            <span className="line-through text-[#828282]">${parseFloat(product.price * 2.5 * doller).toFixed(2)}</span>
                                                                            $ {(((parseInt(product.price) * 2.5 * doller) - ((parseInt(product.price) * 2.5 * doller) * (parseInt(product.sellpercet)) / 100))).toFixed(2)}
                                                                        </>
                                                                    ) : (
                                                                        `$${product.price * 2.5 * doller}`
                                                                    ))}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })
                                        }


                                    </div>
                                </div>
                            </button>

                            <dialog id="my_modal_1" className="modal ">
                                <div className="modal-box w-11/12 max-w-5xl">

                                    <VideoDetails
                                        doller={doller}
                                        selectedCurrencyValue={selectedCurrencyValue}
                                        localCartData={localCartData}
                                        setAllCartData={setAllCartData}
                                        videoTitle={videoTitle}
                                        AllProducts={AllProducts}
                                        setLocalCartData={setLocalCartData}
                                        user={user}
                                        video={video}
                                        handleCloseModal={handleCloseModal}
                                        selectedColor={selectedColor}
                                        setSelectedColor={setSelectedColor}
                                        there={there}
                                    >

                                    </VideoDetails>

                                    <div className="modal-action">

                                        <form method="dialog">
                                            <button
                                                onClick={handleCloseModal}
                                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                        </form>
                                    </div>
                                </div>
                            </dialog>

                        </div>
                    )
                }


            </Slider>
        </div>
    );
};

export default ModelVideoShocase;