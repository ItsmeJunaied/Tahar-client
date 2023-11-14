import './FindUsInsta.css';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import instaImg from '../../../../public/photos/instagram.png'
import InstaImg1 from '../../../../public/photos/InstaImg1.png'
import InstaImg2 from '../../../../public/photos/InstaImg2.png'
import InstaImg3 from '../../../../public/photos/InstaImg3.png'
import InstaImg4 from '../../../../public/photos/InstaImg4.png'
import { useContext } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';

const FindUsInsta = () => {
    const { there } = useContext(AuthContext);
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
        <div className=' mb-20'>
            <style>
                {`
            .slick-prev:before, .slick-next:before , .slick-dots{
              
                display: none;
            }
            
            .div-card{
                max-width: 95%;
                
            }
            
            .slick-next , .slick-prev , .slick-dots{
                display: none
            }
          `}
            </style>
            <div className={`flex justify-center lg:justify-between mt-20 mb-20 align-middle items-center `}>
                <p className=' hidden lg:flex'></p>
                <h1 className=" text-[28px] font-semibold [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">Find us on Instagram</h1>
                <a
                    href='https://www.instagram.com/tahar__official/'
                    className={` text-center hidden lg:flex justify-center items-center align-middle w-[193px] h-[43px] bg-[#1C2E37] rounded-[120px] ${there === 'light' ? 'bg-[#1C2E37] border-[#1C2E37] text-white' : ' bg-[#DBC896] border-[#DBC896] text-black '}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open Instagram
                </a>
            </div>
            <Slider {...settings} >
                <div className={`div-card w-[429px] h-[545px] border-[2px] rounded-[10px] pl-5 ${there === 'light' ? 'bg-[#FFFF]' : 'bg-[#2b2829] border-[#2b2829]'}`} >
                    <div className=' p-3'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <h1 className=' font-bold'>tahar__official</h1>
                                <p>21 March 2023</p>
                            </div>
                            <div>
                                <img src={instaImg} alt="" />
                            </div>
                        </div>

                        <div>
                            <img className=' w-[389px] h-[394px] pt-3' src={InstaImg1} alt="" />
                        </div>

                        <div>
                            <p className=' text-[#828282] text-[18px] pt-2'>The Sunshine Biscuit</p>
                        </div>
                    </div>
                </div>
                <div className={`div-card w-[429px] h-[545px] border-[2px] rounded-[10px] pl-5 ${there === 'light' ? 'bg-[#FFFF]' : 'bg-[#2b2829] border-[#2b2829]'}`}>
                    <div className=' p-3'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <h1 className=' font-bold'>tahar__official</h1>
                                <p>21 March 2023</p>
                            </div>
                            <div>
                                <img src={instaImg} alt="" />
                            </div>
                        </div>

                        <div>
                            <img className=' w-[389px] h-[394px] pt-3' src={InstaImg1} alt="" />
                        </div>

                        <div>
                            <p className=' text-[#828282] text-[18px] pt-2'>The Sunshine Biscuit</p>
                        </div>
                    </div>
                </div>
                <div className={`div-card w-[429px] h-[545px] border-[2px] rounded-[10px] pl-5 ${there === 'light' ? 'bg-[#FFFF]' : 'bg-[#2b2829] border-[#2b2829]'}`}>
                    <div className=' p-3'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <h1 className=' font-bold'>tahar__official</h1>
                                <p>21 March 2023</p>
                            </div>
                            <div>
                                <img src={instaImg} alt="" />
                            </div>
                        </div>

                        <div>
                            <img className=' w-[389px] h-[394px] pt-3' src={InstaImg2} alt="" />
                        </div>

                        <div>
                            <p className=' text-[#828282] text-[18px] pt-2'>The Sunshine Biscuit</p>
                        </div>
                    </div>
                </div>
                <div className={`div-card w-[429px] h-[545px] border-[2px] rounded-[10px] pl-5 ${there === 'light' ? 'bg-[#FFFF]' : 'bg-[#2b2829] border-[#2b2829]'}`}>
                    <div className=' p-3'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <h1 className=' font-bold'>tahar__official</h1>
                                <p>21 March 2023</p>
                            </div>
                            <div>
                                <img src={instaImg} alt="" />
                            </div>
                        </div>

                        <div>
                            <img className=' w-[389px] h-[394px] pt-3' src={InstaImg3} alt="" />
                        </div>

                        <div>
                            <p className=' text-[#828282] text-[18px] pt-2'>The Sunshine Biscuit</p>
                        </div>
                    </div>
                </div>
                <div className={`div-card w-[429px] h-[545px] border-[2px] rounded-[10px] pl-5 ${there === 'light' ? 'bg-[#FFFF]' : 'bg-[#2b2829] border-[#2b2829]'}`}>
                    <div className=' p-3'>
                        <div className=' flex justify-between items-center'>
                            <div>
                                <h1 className=' font-bold'>tahar__official</h1>
                                <p>21 March 2023</p>
                            </div>
                            <div>
                                <img src={instaImg} alt="" />
                            </div>
                        </div>

                        <div>
                            <img className=' w-[389px] h-[394px] pt-3' src={InstaImg4} alt="" />
                        </div>

                        <div>
                            <p className=' text-[#828282] text-[18px] pt-2'>The Sunshine Biscuit</p>
                        </div>
                    </div>
                </div>
            </Slider>

            <div className=' w-full flex justify-center mt-3'>
                <a
                    href='https://www.instagram.com/tahar__official/'
                    className={` text-center  lg:hidden flex justify-center items-center align-middle w-[193px] h-[43px] bg-[#1C2E37] rounded-[120px] ${there === 'light' ? 'bg-[#1C2E37] border-[#1C2E37] text-white' : ' bg-[#DBC896] border-[#DBC896] text-black '}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open Instagram
                </a>
            </div>
        </div>
    );
};

export default FindUsInsta;