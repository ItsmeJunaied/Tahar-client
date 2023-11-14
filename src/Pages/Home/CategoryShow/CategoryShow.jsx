
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
        fetch('https://tahar-server-production.up.railway.app/categoryInfo')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])

    var setting = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        arrows: false,
        slidesToScroll: 5,
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
            <div className='mt-10 w-full '>
                <Slider {...setting}>
                    {
                        category.map(item => {
                            if (item.status === 'Show') {
                                return (
                                    <Link
                                        key={item._id} to={`/product/category/${item._id}`}>
                                        <div className='flex flex-col justify-center items-center gap-[32px]'>
                                            <img
                                                className=' w-[120px] h-[120px] lg:w-[267px] lg:h-[267px] border-[4px]  lg:border-[7px] border-[#CBB06B] rounded-full'
                                                src={`https://tahar-server-production.up.railway.app/uploads/${item.image}`} alt="" />
                                            <h1 className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] text-[15px] lg:text-[19px]">{item.title}</h1>
                                        </div>
                                    </Link>
                                );
                            } else {
                                return null;
                            }
                        })
                    }
                </Slider>
            </div>
        </div>
    );
};


export default CategoryShow;