import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";

const CheckOut = () => {
    const { user, orderContactInfo, setorderContactInfo, localCartData } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm()



    const navigate = useNavigate();

    const onSubmit = (data) => {
        data.OrderDetails = localCartData;
        console.log('contact', data);

        setorderContactInfo(data);
        navigate('/shipping');
    }


    let total = 0;
    let quantity = 0;

    for (const product of localCartData) {
        quantity = quantity + product.ProductQuantity;
        total = total + product.ProductPrice * product.ProductQuantity;
    }
    let subtotalWithTax = total * 1.05;

    
    // console.log(localCartData.length);

    // const localCartData = AllcartData.filter(item => item.customerEmail === user?.email);

    // console.log(user);
    // console.log(localCartData);
    // const handleQuantityChange = (itemId, newQuantity) => {

    //     const updatedData = AllcartData.map(item => {
    //         if (item._id === itemId) {
    //             return { ...item, ProductQuantity: newQuantity };
    //         }
    //         return item;
    //     });

    //     // Update the state with the new data
    //     setAllCartData(updatedData);
    // };

    // const [selectedOption, setSelectedOption] = useState('Inside Dhaka - Tk. 80');

    // const handleChange = (e) => {
    //     setSelectedOption(e.target.value);
    //     console.log(e.target.value);
    // }

    // let shippingCost = 0;

    // if (selectedOption === 'Inside Dhaka - Tk. 80') {
    //     shippingCost = 80;
    // } else {
    //     shippingCost = 120;
    // }


    // let totalWithShipping = total + shippingCost;
    // let totalWithVat = totalWithShipping * 1.05; // Including 5% VAT
    return (
        <div className="bg-[#D8D8D8] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
            <div className=" px-[100px] py-[100px] ">
                <div className=" flex flex-col lg:flex-row justify-between items-stretch gap-[20px]">
                    {/* contact 1*/}
                    <div className=" w-1/2 bg-white rounded-[10px] p-20">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <h1 className=" text-[#000000] text-[27px] font-bold uppercase mb-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">Contact</h1>

                            <p className=" text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" >Email</p>
                            <input
                                // defaultValue={orderContactInfo?.email}
                                {...register("email", { required: true })} defaultValue={user?.email || orderContactInfo?.email} required
                                className=" border-[2px] border-[#DCDCDC] w-[695px] h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]"
                                type="email" name="email" />

                            <h1 className=" text-[#000000] text-[27px] font-bold uppercase mb-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shipping Address</h1>

                            <p className=" text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" >Country/Region</p>
                            <select
                                {...register("Country", { required: true })} required
                                defaultValue={orderContactInfo?.Country}
                                className="select border-[2px] border-[#DCDCDC] w-[695px] h-[72px]  focus:outline-none text-[#191E1BDB] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                <option disabled selected>Pick Up Country</option>
                                <option>Bangladesh</option>
                            </select>

                            <div className=" flex flex-col lg:flex-row justify-between items-center">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">First Name</span>
                                    </label>
                                    <input
                                        {...register("FirstName", { required: true })} defaultValue={user?.displayName && user.displayName.split(' ').slice(0, -1).join(' ') || orderContactInfo?.FirstName} required

                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase" type="text" name="FirstName" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Last Name</span>
                                    </label>
                                    <input
                                        {...register("LastName")}
                                        defaultValue={user?.displayName && user.displayName.split(' ').slice(-1).join(' ') || orderContactInfo?.LastName} required

                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase" type="text" name="LastName" />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Full Address</span>
                                </label>
                                <input
                                    {...register("Address", { required: true })} required
                                    defaultValue={orderContactInfo?.Address}
                                    className=" border-[2px] border-[#DCDCDC] w-[695px] h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="text" name="Address" />
                            </div>

                            <div className=" flex flex-col lg:flex-row justify-between items-center">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">City</span>
                                    </label>
                                    <input
                                        {...register("City", { required: true })} required
                                        defaultValue={orderContactInfo?.City}
                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase" type="text" name="City" />

                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Postal Code</span>
                                    </label>
                                    <input
                                        {...register("PostalCode")}
                                        defaultValue={orderContactInfo?.PostalCode}
                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="number" name="PostalCode" />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Phone</span>
                                </label>
                                <input
                                    {...register("number", { required: true })}
                                    defaultValue={orderContactInfo?.number} required
                                    className=" border-[2px] border-[#DCDCDC] w-[695px] h-[72px] mb-5 rounded-[10px] ps-5 pr-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="number" name="number" />
                            </div>

                            {errors.email && <p className="text-red-500">Email is required</p>}
                            {errors.Country && <p className="text-red-500">Country is required</p>}
                            {errors.FirstName && <p className="text-red-500">First Name is required</p>}
                            {errors.LastName && <p className="text-red-500">Last Name is required</p>}
                            {errors.Address && <p className="text-red-500">Address is required</p>}
                            {errors.City && <p className="text-red-500">City is required</p>}
                            {errors.PostalCode && <p className="text-red-500">Postal Code is required</p>}
                            {errors.number && <p className="text-red-500">Phone number is required</p>}



                            {/* <Link to="/shipping" disabled> */}
                            <input type="submit"
                                className=" w-[691px] h-[67px] bg-[#1C2E37] rounded-[10px] [font-family:'Helvetica_Now_Display-Medium',Helvetica] text-white"
                                value="Continue to Shipping" />
                            {/* </Link> */}

                        </form>
                    </div>




                    {/* container 2 */}
                    <div className=" w-1/2 bg-white rounded-[10px] py-[100px] ">
                        {
                            localCartData.map(item =>
                                <div key={item.ProductId} className=" flex flex-row justify-between align-middle items-center px-20 mb-3">
                                    <div>

                                        <img className="w-[135px] h-[135px] rounded-[10px] "
                                            src={`http://localhost:5000/uploads/${item.ProductImage}`}
                                            alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[19px] text-[#474747] mb-[16px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            {item.ProductName}
                                        </p>
                                        <p className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Dark Green / {item.ProductSize}</p>
                                    </div>
                                    <div className="  border-[2px] border-[#0000002E] rounded-[10px]">
                                        <p className="px-[28px] py-[20px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            Tk. {item.ProductPrice}</p>

                                    </div>
                                </div>
                            )
                        }
                        <div className="divider text-[#0000003D]"></div>

                        <div>
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Subtotal</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Tk. {total}</p>
                            </div>
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shipping</h1>
                                <p className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Calculated at next step</p>
                            </div>
                        </div>

                        <div className="divider text-[#0000003D]"></div>

                        <div className=" px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[25px]  [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Total</h1>
                            <div className=" flex flex-row justify-between">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Including 5%  in Taxes</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    Tk.{subtotalWithTax}
                                </p>
                            </div>
                        </div>
                        <div className="divider mb-[53px] text-[#0000003D]"></div>

                        <div className="px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Coupon:</h1>
                            <p className=" text-[19px] text-[#828282] mb-[14px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Ordering for the First time?</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Heres a special discount!</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Use Code: <span className=" text-[#202020] font-bold ">FIRSTORDER</span></p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default CheckOut;