import './Banner.css';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';

import sliderIMG1 from '../../../../public/photos/slider_img1.jpg'
import sliderIMG2 from '../../../../public/photos/slider_img2.jpg'
import sliderIMG3 from '../../../../public/photos/slider_img3.jpg'

const AutoplaySlider = withAutoplay(AwesomeSlider);


const Banner = () => {
    const sliderStyle = {
        width: 'full',
        height: '800px',
    };

    return (

        <AutoplaySlider
            play={true}
            cancelOnInteraction={false}
            interval={6000}
            style={sliderStyle}
            className="my-slider"
        >
            <div data-src={sliderIMG1} />
            <div data-src={sliderIMG2} />
            <div data-src={sliderIMG3} />
        </AutoplaySlider>

    );
};

export default Banner;