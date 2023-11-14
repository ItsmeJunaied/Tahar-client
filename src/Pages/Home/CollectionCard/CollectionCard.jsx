import { useEffect, useState } from 'react';
import './CollectionCard.css';
import { Link } from 'react-router-dom';

const CollectionCard = () => {
    const [category, setCategory] = useState([]);

    // console.log(category)
    useEffect(() => {
        fetch('https://tahar-server-production.up.railway.app/categoryInfo')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])

    return (
        <div className='flex flex-col lg:flex-row justify-between gap-5 mt-20'>
            {
                category.map(item => {
                    if (item && item.status === 'Container1' && item.title) {
                        const backgroundImageStyle = {
                            backgroundImage: `url(https://tahar-server-production.up.railway.app/uploads/${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center'
                        };
                        return (
                            <div key={item._id} className='flex flex-col lg:flex-row w-1/2 justify-center align-middle '>
                                <span className="single-img img-three" style={backgroundImageStyle}>
                                    <span className="img-text">
                                        <h4 className="lg:w-[478px] md:w-full lg:h-[36px] md:h-auto  collectionCard-text ">
                                            The {item.title}
                                        </h4>

                                        <p className="lg:w-[415px] md:w-full lg:h-[65px] md:h-auto mb-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            A small paragraph creatively explaining what the collection is about or what vibe this collection gives off or inspiration of this category
                                        </p>

                                        <Link to={`/product/category/${item._id}`}
                                            className=" [font-family:'Helvetica_Now_Display-Medium',Helvetica] yellow-Shop">
                                            Shop {item.title}
                                        </Link>

                                        <svg className=' mb-[59px] ' xmlns="http://www.w3.org/2000/svg" width="120" height="4" viewBox="0 0 120 4" fill="none">
                                            <path d="M0 2.04883L120 2.04884" stroke="#F0CF5C" strokeWidth="2.5" />
                                        </svg>
                                    </span>
                                </span>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            }

            {/* <div className='lg:flex lg:flex-row md:flex-col'>
                <span className="single-img img-three">
                    <span className="img-text">
                        <h4 className='lg:w-[478px] md:w-full lg:h-[36px] md:h-auto text-[54px] collectionCard-text'>The Zenith Collection</h4>
                        <p className='lg:w-[415px] md:w-full lg:h-[65px] md:h-auto text-[17px] mb-5'>A small paragraph creatively explaining what the collection is about or what vibe this collection gives off or inspiration of this category</p>
                        <button className='text-[#F0CF5C] underline'>Shop Zenith</button>
                    </span>
                </span>
            </div> */}
        </div>


    );
};

export default CollectionCard;