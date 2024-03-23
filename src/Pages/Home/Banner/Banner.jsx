import './Banner.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AutoplaySlider = withAutoplay(AwesomeSlider);


const Banner = () => {

    const [bannerinfo, setBannerinfo] = useState([]);

    useEffect(() => {
        fetch('https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/banner')
            .then(res => res.json())
            .then(data => setBannerinfo(data))
    }, [])
    const sliderStyle = {
        width: '100%',
        height: '800px',
        position: 'relative', // Make sure the container is positioned
    };

    const textOverlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Center the text
        color: '#fff', // Text color
        fontSize: '24px', // Adjust the font size as needed
    };

    return (
        <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            style={sliderStyle}
            className="my-slider "
        >
            {
                bannerinfo?.map(item =>
                    <div key={item._id} data-src={`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/uploads/${item.images}`}>
                        <div style={textOverlayStyle}>

                            <div className="flex flex-col gap-10 w-full items-center">
                                <div className="self-stretch flex flex-col gap-5 items-center">
                                    <div className="text-center text-3xl [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#dbc896]">
                                        {item.title}
                                    </div>
                                    <div className="text-center text-[99px] font-['Times_New_Roman'] text-white self-start">
                                        {item.description}
                                    </div>
                                </div>
                                <Link to='/ViewAll' className="bg-[#dbc896] flex flex-col justify-center h-16 shrink-0 items-center rounded-[120px]">
                                    <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium mx-16">
                                        Shop Now
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                )
            }

            {/* <div data-src={sliderIMG2}>
                <div style={textOverlayStyle}>
                    <p>More Text</p>
                </div>
            </div>
            <div data-src={sliderIMG3}>
                <div style={textOverlayStyle}>
                    <p>Even More Text</p>
                </div>
            </div> */}
        </AutoplaySlider>
    );
};

export default Banner;
