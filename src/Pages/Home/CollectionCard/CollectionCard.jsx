import { useEffect, useState } from 'react';
import './CollectionCard.css';
import { Link } from 'react-router-dom';

const CollectionCard = () => {
    const [category, setCategory] = useState([]);

    // console.log(category)
    useEffect(() => {
        fetch('http://localhost:5000/categoryInfo')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])

    return (
        <div className='lg:flex lg:flex-row md:flex-col gap-5 mt-20'>
            {
                category.map(item => {
                    if (item && item.status === 'Container1' && item.title) {
                        const backgroundImageStyle = {
                            backgroundImage: `url(http://localhost:5000/uploads/${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center'
                        };
                        return (
                            <div key={item._id} className='lg:flex lg:flex-row md:flex-col'>
                                <span className="single-img img-three" style={backgroundImageStyle}>
                                    <span className="img-text">
                                        <h4 className='lg:w-[478px] md:w-full lg:h-[36px] md:h-auto text-[54px] collectionCard-text'>The {item.title}</h4>
                                        <p className='lg:w-[415px] md:w-full lg:h-[65px] md:h-auto text-[17px] mb-5'>A small paragraph creatively explaining what the collection is about or what vibe this collection gives off or inspiration of this category</p>
                                        <Link to={`/product/category/${item._id}`} className='text-[#F0CF5C] underline'>Shop {item.title}</Link>
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