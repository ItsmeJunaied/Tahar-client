import { useForm } from 'react-hook-form';
import './Newsletter.css';
import Swal from 'sweetalert2';

const Newsletter = () => {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {

        fetch('https://tahar-server-production.up.railway.app/newsletter', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                console.log(result);
                reset();
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Subscribed',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
    }


    return (
        <div className='Newsletter h-full flex flex-col justify-center items-center'>
            <h1 className='text-[#DBC896] text-[28px] text-center max-w-[750px] px-4'>Subscribe to our newsletter to get the latest updates on our new apparel and clothing!</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col md:flex-row gap-4 mt-2'>
                <input {...register("email")}
                    type="email"
                    required
                    placeholder="Type your email address"
                    className="input input-bordered custom-input w-full md:w-[467px] h-[75px] bg-transparent text-[#717171] border-[3px] border-[#3A3A3A]"

                />
                <button type='submit' className='w-full md:w-[207px] h-[75px] rounded-[9px] bg-[#DBC896] text-[#000000] text-[19px] font-semibold mt-4 md:mt-0'>Submit</button>
            </form>
        </div>
    );

};

export default Newsletter;