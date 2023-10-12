
import './CategoryShow.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import { Link } from 'react-router-dom';

const CategoryShow = () => {
    const { AllProducts, categoryName } = useContext(AuthContext);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        fetch('https://tahar-server.vercel.app/categoryInfo')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            }
        ]
    };
    return (
        <div>

            <div className='mt-10 w-full hidden sm:block md:block'>
                {/* {!isMediumDevice && ( */}
                {/* <Slider {...settings}> */}
                <div className='flex flex-row justify-center align-middle items-center w-full lg:w-[1,775.99px] gap-10 '>
                    {
                        category.map(item => {
                            if (item.status === 'Show') {
                                return (
                                    <Link key={item._id} to={`/product/category/${item._id}`} className='flex flex-col justify-center items-center gap-[32px]'>
                                        <img
                                        className=' w-[267px]  border-[7px] border-[#CBB06B] rounded-full'
                                        src={`https://tahar-server.vercel.app/uploads/${item.image}`} alt="" />
                                        <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">{item.title}</h1>
                                    </Link>
                                );
                            } else {
                                return null; // Return null for items with status other than 'Show'
                            }
                        })
                    }



                </div>
            </div>

            <div className=' block lg:hidden'>
                <Slider {...settings}>
                    {
                        category.map(item => {
                            if (item.status === 'Show') {
                                return (
                                    <Link key={item._id} to={`/product/category/${item._id}`} className='flex flex-col justify-center items-center gap-[32px]'>
                                        <img 
                                        className=' w-[267px]  border-[7px] border-[#CBB06B] rounded-full'
                                        src={`https://tahar-server.vercel.app/uploads/${item.image}`} alt="" />
                                        <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[19px]">{item.title}</h1>
                                    </Link>
                                );
                            } else {
                                return null; // Return null for items with status other than 'Show'
                            }
                        })
                    }


                </Slider>
            </div>

        </div>
    );
};


export default CategoryShow;