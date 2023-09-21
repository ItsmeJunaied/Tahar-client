import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './CstShowSlider.css';

import catshowslider1 from '../../../../../public/photos/catShowSlider1.jpg'
import catshowslider2 from '../../../../../public/photos/catShowSlider2.jpg'
import catshowslider3 from '../../../../../public/photos/catShowSlider3.jpg'
import catshowslider4 from '../../../../../public/photos/catShowSlider4.jpg'
import catshowslider5 from '../../../../../public/photos/catShowSlider5.jpg'
import { useContext, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import ColourChanges from "../../../../Shared/ColourChanges/ColourChanges";
import { Link } from "react-router-dom";

const CatShowSliders = () => {
    const { AllProducts } = useContext(AuthContext);

    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');
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
        <div>
            <style>
                {`
            .slick-prev:before, .slick-next:before {
              
              color: black;
            }
            
            img{
                max-width: 95%;
            }
            
          `}
            </style>
            <Slider {...settings} >
                {
                    AllProducts.map(item =>
                        <div key={item._id} >
                            <div className=' w-[431px] h-[600px] '>
                                <Link to={`/product/${item._id}`}>
                                    <img
                                        className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                        src={`http://localhost:5000/uploads/${item.images[0]}`}
                                        alt=""
                                    />
                                </Link>

                                <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                    <h1 className=" text-[#474747]  text-[19px] uppercase text-xl text-center">{item.title} | {item.category}</h1>
                                    <p className=" text-[#828282]  text-[19px]">${item.price}</p>


                                    {/* colour */}
                                    <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                    <div className=" flex gap-2">
                                        {
                                            parseInt(item.Squantity) > 0 ? (
                                                <button
                                                    className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black"
                                                    onClick={() => {
                                                        setActiveSize('S');
                                                        setActiveID(item._id);
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
                                            parseInt(item.Mquantity) > 0 ? (
                                                <button className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                    setActiveSize('M');
                                                    setActiveID(item._id);
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
                                            parseInt(item.Lquantity) > 0 ? (
                                                <button className="w-[51px] h-[40px] border-[2px] bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                    setActiveSize('L');
                                                    setActiveID(item._id);
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
                                            parseInt(item.XLquantity) > 0 ? (
                                                <button className="w-[51px] h-[40px] border-[2px]  bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                    setActiveSize('XL');
                                                    setActiveID(item._id);
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
                                            parseInt(item.XXLquantity) > 0 ? (
                                                <button className="w-[51px] h-[40px] border-[2px]  bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                    setActiveSize('XXL');
                                                    setActiveID(item._id);
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
                                            parseInt(item.XXXLquantity) > 0 ? (
                                                <button className="w-[51px] h-[40px] border-[2px]  bg-transparent rounded-[8px] flex justify-center items-center hover:border-[2px] hover:border-black" onClick={() => {
                                                    setActiveSize('XXXL');
                                                    setActiveID(item._id);
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
                                </div>
                            </div>
                        </div>
                    )
                }
            </Slider>

        </div>
    );
};

export default CatShowSliders;