import { faPencil, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Provider/AuthProvider';
import defaultImage from '../../../public/photos/userImageStock.png'
const RatingReview = ({ data }) => {
    const { user, } = useContext(AuthContext);
    const [orderData, setOrderData] = useState([]);
    const [invoice, setInvoice] = useState([]);
    const [ratingData, setRatingData] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        setLoading(true);
        fetch('https://taharecom.vercel.app/orders')
            .then(res => res.json())
            .then(data => {
                setOrderData(data);
                setLoading(false);
            });
    }, [setLoading]);


    useEffect(() => {
        fetch('https://taharecom.vercel.app/rating')
            .then(res => res.json())
            .then(data => setRatingData(data))
    }, [])

    const reviewedProductId = data._id;
    const reviewedProductName = data.title;
    // console.log(reviewedProductId, reviewedProductName)
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm()

    const [rating, setRating] = useState(5); // Initialize with 0, indicating no rating selected

    const handleRatingChange = (value) => {
        setRating(value);
    };
    // console.log(rating)


    const onSubmit = (data) => {
        setLoading(true);
        const currentDate = new Date(); // Get the current date and time
        data.rating = rating;
        data.date = currentDate.toISOString();
        data.email = user?.email;
        data.name = user?.displayName;
        data.photo = user?.photoURL;
        data.productId = reviewedProductId;
        data.name = reviewedProductName;
        fetch('https://taharecom.vercel.app/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                if (data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Review Added',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
                fetch('https://taharecom.vercel.app/rating')
                    .then(res => res.json())
                    .then(data => setRatingData(data))
                reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                // Optionally, show an error message here
            });
        setLoading(false);
    }

    const newItems = ratingData
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date in descending order
        .slice(0, 3);

    const allrating = ratingData.map(item => item.rating);

    // Calculate the average rating
    const filteredRating = ratingData.filter(item => item.productId === data._id).map(item => item.rating);
    console.log(filteredRating)
    const averageRating = filteredRating.length > 0 ? filteredRating.reduce((a, b) => a + b) / filteredRating.length : 0;

    const roundedAverage = Math.round(averageRating);

    // Generate stars for display
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(<FontAwesomeIcon key={i} className={`h-[33.8px] ${i <= roundedAverage ? 'text-[#DAB658]' : 'text-gray-300'}`} icon={faStar} />);
    }

    // Calculate percentages
    const totalRatings = filteredRating.length;
    const starRatings = [5, 4, 3, 2, 1];

    const ratingPercentages = starRatings.map(starRating => {
        const occurrences = filteredRating.filter(rating => rating === starRating).length;
        return totalRatings === 0 ? 0 : (occurrences / totalRatings) * 100;
    });
    return (
        <div className="border-solid flex flex-row justify-end gap-24 w-full items-start pt-6 px-6 border-black/18 border-2 rounded-lg">
            <div className="flex flex-col mt-24 gap-10 items-start">
                <div className="flex flex-col gap-5 w-[604px] items-center">
                    <div className="rating rating-lg">
                        <p>
                            {stars}
                        </p>
                    </div>

                    <div className=" text-center text-xl [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#4a4a4a]">
                        Based on 5 Reviews
                    </div>
                </div>
                <div className=' divider'></div>
                {starRatings?.map((starRating, index) => (
                    <div key={starRating} className='flex flex-row justify-between items-center gap-10'>
                        <div className="rating rating-lg">
                            {[...Array(starRating)].map((_, i) => (
                                <input
                                    key={i}
                                    type="radio"
                                    name={`rating-${starRating}`}
                                    className={`mask mask-star-2 ${i < starRating ? 'bg-[#DAB658]' : 'bg-gray-300'}`}
                                    disabled
                                />
                            ))}
                        </div>

                        <div className='flex items-center'>
                            <progress className="progress progress-warning w-56 h-7" value={ratingPercentages[index]} max="100"></progress>
                        </div>

                        <div>
                            <p className="text-center text-xl font-[Helvetica_Now_Display-Medium]  text-[#929292]">
                                {starRating.length === 0 ? '0%' : `${Math.round(ratingPercentages[index])}%`}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-col mb-20 gap-12 w-3/5">
                <button onClick={() => document.getElementById('my_modal_9').showModal()} className={`flex flex-row justify-between ml-2 items-center  `} disabled={!user}>
                    <div className="text-center text-3xl [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold text-[#1c1c1c]">
                        <p>Customer Reviews</p>
                    </div>
                    <div className="border-solid border-[#1c2e37] self-start flex flex-row justify-center gap-2 h-12 items-center pl-5 pr-3 py-4 border-2 rounded-lg">
                        <div>
                            <FontAwesomeIcon icon={faPencil} />
                        </div>
                        <div className="text-center text-base [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-bold text-[#1c2e37]">
                            {
                                user ? <p>Write a Review</p> : <p>Log In to Review</p>
                            }
                        </div>
                    </div>
                </button>
                {/* Open the modal using document.getElementById('ID').showModal() method */}
                {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
                <dialog id="my_modal_9" className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h1 className="text-[#2c2a2a] text-center font-bold text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Submit Product Review</h1>
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                            </form>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 items-center">
                            <div className="rating">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <input
                                        key={value}
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-[#DAB658]"
                                        checked={rating === value}
                                        onChange={() => handleRatingChange(value)}
                                    />
                                ))}
                            </div>
                            <textarea
                                className="border border-gray-300 rounded-lg p-2 w-full max-w-sm"
                                rows="4"
                                {...register("review", { required: true })}
                                placeholder="Write your review here..."
                            ></textarea>
                            <input type="Submit" className="btn btn-lg bg-[#2c2a2a] text-white" />
                        </form>
                    </div>
                </dialog>



                <div className="flex flex-col mr-2 gap-6">
                    <div className="relative flex flex-col">

                        <div className="relative flex flex-col gap-6 items-start">
                            {
                                newItems && newItems
                                    .filter(item => item.productId === data._id)?.map(item =>
                                        <div key={item._id} className="self-stretch flex flex-row gap-5 items-start">
                                            {/* <div className="bg-[#d9d9d9] w-20  h-20 rounded-[80px]" /> */}
                                            <img
                                                className='w-20 h-20 rounded-[80px]'
                                                src={item?.photo ? item.photo : defaultImage}
                                                alt=""
                                            />
                                            <div className="flex flex-col gap-5 w-full items-start">
                                                <div className="text-[25px] font-bold text-black [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">
                                                    {item?.name}
                                                </div>
                                                <div className="rating rating-lg">
                                                    {[...Array(5)].map((_, index) => (
                                                        <input
                                                            key={index}
                                                            type="radio"
                                                            name="rating-7"
                                                            className={`mask mask-star-2 ${index < item.rating ? 'bg-[#DAB658]' : 'bg-gray-300'
                                                                }`}
                                                            disabled
                                                        />
                                                    ))}
                                                </div>

                                                <div className="self-stretch flex flex-col gap-3 items-start">
                                                    <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#818181] w-full">
                                                        <p>{item?.review}</p>
                                                    </div>
                                                </div>
                                                <div className="divider"></div>
                                            </div>

                                        </div>

                                    )
                            }

                            {newItems && newItems.filter(item => item.productId === data._id)?.length === 0 && (
                                <div className="text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-[#818181] w-full">
                                    <p className=' text-center text-4xl'>Be the first reviewer</p>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </div>
        </div>

    );
};

export default RatingReview;