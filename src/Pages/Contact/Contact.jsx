import Partners from '../Home/Partners/Partners';
import './Contact.css';
import emailjs from '@emailjs/browser';
import googleMap from '../../../public/photos/googlemap.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
const Contact = () => {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_2m3t84a', 'template_me1ghqi', form.current, 'CyOBchIeV8ZhI91hI')
            .then((result) => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Your message has been sent',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.current.reset();
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div>
            <div className='bg-[#CFCFCF]  py-20'>
                <div className='bg-white mx-[100px] rounded-[10px] py-10 px-44'>
                    <h1 className=' text-center text-[61px] mb-10'>Contact</h1>
                    <div className="divider mb-10"></div>
                    <div className='  flex flex-col lg:flex-row '>
                        <div className=' w-1/2'>
                            <form ref={form} onSubmit={sendEmail}>
                                <h1 className=' text-[27px] font-semibold mb-10 mt-10'>SEND US A MESSAGE</h1>

                                <p className=' text-[22px] mb-3 text-[#828282]'>Name</p>

                                <input type="text" name="user_name" placeholder="Type here" className="input input-bordered w-[632px] " />

                                <p className=' text-[27px] mb-3 text-[#828282]'>Phone Number</p>

                                <input type="text" name="user_number" placeholder="Type here" className="input input-bordered w-[632px] " />

                                <p className=' text-[22px] mb-3 text-[#828282]'>E-mail</p>

                                <input type="email" name="user_email" placeholder="Type here" className="input input-bordered w-[632px] " />
                                <p className=' text-[22px] mb-3 text-[#828282]'>Message</p>

                                <textarea name="message" className="textarea textarea-bordered mb-3 w-[632px] h-[328px]" placeholder="Bio"></textarea>

                                <p className=' text-[20px] mb-3 text-[#828282] w-[632px]'>This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>

                                <button  type="submit" value="Send" className=' w-[632px] bg-[#1C2E37] rounded-[10px] h-[67px] border-none text-white '>Submit <FontAwesomeIcon icon={faArrowRight} /></button>
                            </form>
                        </div>
                        <div className=' w-1/2'>
                            <div className=' pt-10'>
                                <h1 className=' text-[27px] font-semibold mb-10'>REACH US</h1>
                                <p className=' text-[27px] mb-1 text-[#6B6B6B]'>Customer Queries:</p>
                                <p className=' text-[20px] mb-1 text-[#828282]'>info@tahar.bd</p>

                                <p className=' text-[27px] mb-1 mt-2 text-[#6B6B6B]'>Business Queries:</p>
                                <p className=' text-[20px] mb-1 text-[#828282]'>business@tahar.bd</p>

                                <p className=' text-[27px] mb-1 mt-2 text-[#6B6B6B]'>Hours of Operation</p>
                                <p className=' text-[20px] mb-1 text-[#828282] w-[444px]'>
                                    We are in the office working away to create the best product for you from 9 am-5pm, Monday - Saturday.
                                </p>

                                <p className=' text-[27px] mb-1 mt-2 text-[#6B6B6B]'>Address</p>
                                <p className=' text-[20px] mb-1 text-[#828282] w-[444px]'>
                                    We are an online operation with no official branches yet.
                                </p>
                            </div>
                            <div>
                                <img className='w-[680px] h-[400px]' src={googleMap} alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
};

export default Contact;