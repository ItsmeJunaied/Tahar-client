
import './Footer.css';
import logo from '../../../public/photos/tahar-logo.png'
import fbicon from '../../../public/photos/fb-footer.png'
import instaicon from '../../../public/photos/instagram_footer.png'
import emailicon from '../../../public/photos/email_footer.png'
import youtubeicon from '../../../public/photos/youtube_footer.png'
const Footer = () => {
    return (
        <div className='footer-bg flex flex-col lg:flex-row justify-between items-center  md:px-8 lg:px-12 w-full md:h-auto lg:h-[340px] pt-5 '>
            <div className='mb-4 lg:mb-0'>
                <img className='w-24 h-32 md:w-32 md:h-40' src={logo} alt="" />
            </div>
            <div className='mb-8 lg:mb-0 text-center md:text-left'>
                <h1 className='text-white font-semibold'>Find us on</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <button className='text-[#878787] w-full h-[42px] rounded-[8px] bg-[#FFFFFF1F] flex justify-center items-center gap-2'>
                        <img src={instaicon} alt="" />Instagram
                    </button>
                    <button className='text-[#878787] w-full h-[42px] rounded-[8px] bg-[#FFFFFF1F] flex justify-center items-center gap-2'>
                        <img src={emailicon} alt="" />Email
                    </button>
                    <button className='text-[#878787] w-full h-[42px] rounded-[8px] bg-[#FFFFFF1F] flex justify-center items-center gap-2'>
                        <img src={fbicon} alt="" />Facebook
                    </button>
                    <button className='text-[#878787] w-full h-[42px] rounded-[8px] bg-[#FFFFFF1F] flex justify-center items-center gap-2'>
                        <img src={youtubeicon} alt="" />YouTube
                    </button>
                </div>
            </div>
            <div className='mb-8 lg:mb-0 text-center md:text-left'>
                <h1 className='text-white font-semibold'>Resolutions</h1>
                <p className='text-[#878787]'>The Company</p>
                <p className='text-[#878787]'>Privacy Policy</p>
                <p className='text-[#878787]'>Contact</p>
                <p className='text-[#878787]'>FAQs</p>
            </div>
            <div className='mb-8 lg:mb-0 text-center md:text-start'>
                <h1 className='text-white font-semibold'>Online Shopping</h1>
                <p className='text-[#878787]'>Form of Payment</p>
                <p className='text-[#878787]'>Request A Return</p>
                <p className='text-[#878787]'>Shipping & Delivery Policy</p>
                <p className='text-[#878787]'>International Orders</p>
            </div>
            <div className='mb-8 lg:mb-0 text-center md:text-start'>
                <h1 className='text-white font-semibold'>Subscribe to Newsletter</h1>
                <div className='flex flex-col md:flex-row gap-3'>
                    <input type="text" placeholder="Type here" className="input input-bordered w-[340px] md:w-[296px] h-[75px] md:h-[75px] bg-transparent border-[3px] border-[#3A3A3A]" />
                    <button className='w-[340px] md:w-[163px] h-[75px] md:h-[75px] rounded-[14px] bg-white text-black font-semibold'>Submit</button>
                </div>
            </div>
        </div>

    );
};

export default Footer;