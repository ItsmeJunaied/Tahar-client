import './ModelVideoShocase.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import modelvideo1 from '../../../../public/photos/modelVideo2.mp4'
// import modelvideo2 from '../../../../public/photos/modelVideo3 (online-video-cutter.com).mp4'
// import modelvideo5 from '../../../../public/photos/modevideo5.mp4'
import videoOverlayImg from '../../../../public/photos/Video_overlay_img.png';

import modalimg1 from '../../../../public/photos/modaImg1.png';
import modalimg2 from '../../../../public/photos/modaImg2.png';
import modalimg3 from '../../../../public/photos/modaImg3.png';

import sizeChart from '../../../../public/photos/size chart.png';

import { useEffect, useRef } from 'react';
const ModelVideoShocase = () => {
    const videos = useRef([]);
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    };

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection, options);

        videos.current.forEach((video) => {
            observer.observe(video);
        });

        return () => observer.disconnect();
    });
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
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
                <div>
                    <button className="video-container w-[429px] h-[597px] relative" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <video
                            className="object-cover lg:w-full lg:h-full  rounded-xl"
                            ref={(el) => (videos.current[0] = el)}
                            src={modelvideo1}
                            autoPlay
                            muted
                            loop
                        ></video>
                        <div className="video-overlay w-full h-full video-overlay">
                            <div className=' flex justify-start align-middle items-center gap-5'>
                                <div>
                                    <img src={videoOverlayImg} alt="" />
                                </div>
                                <div className=' flex flex-col justify-start align-start items-start'>
                                    <h1 className=' text-[19px]'>Item Full Name</h1>
                                    <p className=' text-[#B7B7B7] text-[18px]'>$1,000</p>
                                </div>
                            </div>
                        </div>
                    </button>

                    <dialog id="my_modal_1" className="modal ">
                        <div className="modal-box w-11/12 max-w-5xl">
                            <div className=' flex justify-between'>
                                <div>
                                    <video
                                        className="object-cover w-full h-[638px] rounded-xl"
                                        ref={(el) => (videos.current[0] = el)}
                                        src={modelvideo1}

                                        loop
                                        controls
                                        controlsList="nodownload noremoteplayback"
                                    ></video>

                                </div>
                                <div>
                                    <div className=' flex flex-row'>
                                        <img src={modalimg1} alt="" />
                                        <img src={modalimg2} alt="" />
                                        <img src={modalimg3} alt="" />
                                    </div>
                                    <h1 className=' text-[19px] font-semibold mt-3'>Item Full Name</h1>
                                    <p className=' text-[#6F6F6F] mt-2 '>$1,000</p>
                                    <p className=' text-[#121212] mt-4 font-semibold'>Color</p>
                                    <div className=" flex gap-2 mt-2">
                                        <div className=" w-[28px] h-[28px] rounded-[104px] border-[2px] border-black bg-[#4F797C]"></div>
                                        <div className=" w-[28px] h-[28px] rounded-[104px] bg-[#FDD79D]"></div>
                                        <div className=" w-[28px] h-[28px] rounded-[104px] bg-[#9DDBFD]"></div>
                                        <div className=" w-[28px] h-[28px] rounded-[104px] bg-[#B3EEAA]"></div>
                                    </div>
                                    <p className=' text-[#121212] text[19px] mt-2 font-semibold'>Size</p>
                                    <div className=" flex gap-2 mt-2">
                                        <div className=" w-[51px] h-[40px] border-[2px] border-black bg-transparent rounded-[8px] flex justify-center items-center">S</div>
                                        <div className=" w-[51px] h-[40px] bg-[#00000014] rounded-[8px] flex justify-center items-center">M</div>
                                        <div className=" w-[51px] h-[40px] bg-[#00000014] rounded-[8px] flex justify-center items-center">L</div>
                                        <div className=" w-[51px] h-[40px] bg-[#00000014] rounded-[8px] flex justify-center items-center">XL</div>
                                        <div>
                                            <button
                                                className=" w-[142px] h-[40px] bg-transparent text-black border-[3px] border-[#ECC53C] rounded-[8px] flex justify-center items-center"
                                                onClick={() => document.getElementById('my_modal_4').showModal()}
                                            >Size Chart</button>

                                            <dialog id="my_modal_4" className="modal">
                                                <div className="modal-box w-11/12 max-w-5xl">
                                                    <img className=' w-[900px] h-[800px]' src={sizeChart} alt="" />
                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </div>

                                    </div>
                                    <p className=' text-[#121212] text[19px] mt-2 font-semibold'>Description</p>
                                    <p className=' text-[#939393] text-[18px] w-[473px]'>Lorem ipsum dolor sit amet consectetur.</p>
                                    <div className=' flex flex-row mt-5 gap-4'>
                                        <button className=' w-[238px] h-[59px] text-[#000000] text-[19px] border-[3px] border-[#000000] bg-transparent rounded-[120px]'>View Product</button>
                                        <button className=' w-[238px] h-[59px] text-white text-[19px]  bg-black rounded-[120px]'>Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                </div>
                <div>
                    <button className="video-container w-[429px] h-[597px] relative" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <video
                            className="object-cover lg:w-full lg:h-full  rounded-xl"
                            ref={(el) => (videos.current[0] = el)}
                            src={modelvideo1}
                            autoPlay
                            muted
                            loop
                        ></video>
                        <div className="video-overlay w-full h-full video-overlay">
                            <div className=' flex justify-start align-middle items-center gap-5'>
                                <div>
                                    <img src={videoOverlayImg} alt="" />
                                </div>
                                <div className=' flex flex-col justify-start align-start items-start'>
                                    <h1 className=' text-[19px]'>Item Full Name</h1>
                                    <p className=' text-[#B7B7B7] text-[18px]'>$1,000</p>
                                </div>
                            </div>
                        </div>
                    </button><dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <div>
                    <button className="video-container w-[429px] h-[597px] relative" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <video
                            className="object-cover lg:w-full lg:h-full  rounded-xl"
                            ref={(el) => (videos.current[0] = el)}
                            src={modelvideo1}
                            autoPlay
                            muted
                            loop
                        ></video>
                        <div className="video-overlay w-full h-full video-overlay">
                            <div className=' flex justify-start align-middle items-center gap-5'>
                                <div>
                                    <img src={videoOverlayImg} alt="" />
                                </div>
                                <div className=' flex flex-col justify-start align-start items-start'>
                                    <h1 className=' text-[19px]'>Item Full Name</h1>
                                    <p className=' text-[#B7B7B7] text-[18px]'>$1,000</p>
                                </div>
                            </div>
                        </div>
                    </button><dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <div>
                    <button className="video-container w-[429px] h-[597px] relative" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <video
                            className="object-cover lg:w-full lg:h-full  rounded-xl"
                            ref={(el) => (videos.current[0] = el)}
                            src={modelvideo1}
                            autoPlay
                            muted
                            loop
                        ></video>
                        <div className="video-overlay w-full h-full video-overlay">
                            <div className=' flex justify-start align-middle items-center gap-5'>
                                <div>
                                    <img src={videoOverlayImg} alt="" />
                                </div>
                                <div className=' flex flex-col justify-start align-start items-start'>
                                    <h1 className=' text-[19px]'>Item Full Name</h1>
                                    <p className=' text-[#B7B7B7] text-[18px]'>$1,000</p>
                                </div>
                            </div>
                        </div>
                    </button><dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <div>
                    <button className="video-container w-[429px] h-[597px] relative" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <video
                            className="object-cover lg:w-full lg:h-full  rounded-xl"
                            ref={(el) => (videos.current[0] = el)}
                            src={modelvideo1}
                            autoPlay
                            muted
                            loop
                        ></video>
                        <div className="video-overlay w-full h-full video-overlay">
                            <div className=' flex justify-start align-middle items-center gap-5'>
                                <div>
                                    <img src={videoOverlayImg} alt="" />
                                </div>
                                <div className=' flex flex-col justify-start align-start items-start'>
                                    <h1 className=' text-[19px]'>Item Full Name</h1>
                                    <p className=' text-[#B7B7B7] text-[18px]'>$1,000</p>
                                </div>
                            </div>
                        </div>
                    </button><dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
                <div>
                    <button className="video-container w-[429px] h-[597px] relative" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        <video
                            className="object-cover lg:w-full lg:h-full  rounded-xl"
                            ref={(el) => (videos.current[0] = el)}
                            src={modelvideo1}
                            autoPlay
                            muted
                            loop
                        ></video>
                        <div className="video-overlay w-full h-full video-overlay">
                            <div className=' flex justify-start align-middle items-center gap-5'>
                                <div>
                                    <img src={videoOverlayImg} alt="" />
                                </div>
                                <div className=' flex flex-col justify-start align-start items-start'>
                                    <h1 className=' text-[19px]'>Item Full Name</h1>
                                    <p className=' text-[#B7B7B7] text-[18px]'>$1,000</p>
                                </div>
                            </div>
                        </div>
                    </button><dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </Slider>
        </div>
    );
};

export default ModelVideoShocase;