import './FromalCategory.css';

const FromalCategory = () => {

    return (
        <div>
            <style>
                {`
            .slick-dots li.slick-active button:before , .slick-dots li button:before {
                display: none;
            }
          `}
            </style>
            <div className='lg:flex lg:flex-row md:flex-col gap-5 mt-20'>
                <div className='lg:flex lg:flex-row md:flex-col'>
                    <span className="single-img img-four">
                        <span className="img-text">
                            <h4 className='lg:w-[478px] md:w-full lg:h-[36px] md:h-auto text-[54px] collectionCard-text'>The Zenith Collection</h4>
                            <p className='lg:w-[415px] md:w-full lg:h-[65px] md:h-auto text-[17px] mb-5'>A small paragraph creatively explaining what the collection is about or what vibe this collection gives off or inspiration of this category</p>
                            <button className='text-[#F0CF5C] underline'>Shop Zenith</button>
                        </span>
                    </span>
                </div>
                <div className='lg:flex lg:flex-row md:flex-col'>
                    <span className="single-img img-five">
                        <span className="img-text">
                            <h4 className='lg:w-[478px] md:w-full lg:h-[36px] md:h-auto text-[54px] collectionCard-text'>The Zenith Collection</h4>
                            <p className='lg:w-[415px] md:w-full lg:h-[65px] md:h-auto text-[17px] mb-5'>A small paragraph creatively explaining what the collection is about or what vibe this collection gives off or inspiration of this category</p>
                            <button className='text-[#F0CF5C] underline'>Shop Zenith</button>
                        </span>
                    </span>
                </div>
            </div>


        </div>
    );
};

export default FromalCategory;