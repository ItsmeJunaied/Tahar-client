import './FromalCategory.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const FromalCategory = () => {
    const [category, setCategory] = useState([]);

    console.log(category)
    useEffect(() => {
        fetch('https://tahar-server.vercel.app/categoryInfo')
            .then(res => res.json())
            .then(data => setCategory(data))
    }, [])

    return (
        <div className='lg:flex lg:flex-row md:flex-col gap-5 mt-20'>
            {
                category.map(item => {
                    if (item && item.status === 'Container2' && item.title) {
                        const backgroundImageStyle = {
                            backgroundImage: `url(https://tahar-server.vercel.app/uploads/${item.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center'
                        };
                        return (
                            <div key={item._id} className='lg:flex lg:flex-row md:flex-col'>
                                <span className="single-img img-three" style={backgroundImageStyle}>
                                    <span className="img-text">
                                        <h4 className="lg:w-[478px] md:w-full lg:h-[36px] md:h-auto text-[54px] collectionCard-text [font-family:'Helvetica_Now_Display-Medium',Helvetica]">The {item.title}</h4>
                                        <p className="lg:w-[415px] md:w-full lg:h-[65px] md:h-auto text-[17px] mb-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">A small paragraph creatively explaining what the collection is about or what vibe this collection gives off or inspiration of this category</p>
                                        <Link to={`/product/category/${item._id}`} className="text-[#F0CF5C] underline [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shop {item.title}</Link>
                                    </span>
                                </span>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })
            }



        </div>
    );
};

export default FromalCategory;