import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";

const CheckOut = () => {
    const { user, orderContactInfo, loading, setorderContactInfo, localCartData, doller, selectedCurrencyValue, contactInfo, setContactInfo, setTotals } = useContext(AuthContext);

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    // console.log(localCartData)

    // console.log(localCartData)
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch the list of countries from an API
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const countryNames = data.map(country => country.name.common);
                setCountries(countryNames.sort());

            })
            .catch(error => console.error('Error fetching countries:', error));
    }, []);

    const navigate = useNavigate();



    useEffect(() => {
        // Get the current cart data from local storage
        const savedContactInfo = JSON.parse(localStorage.getItem('contactInfo'));

        // Update the state with the saved data, if available
        if (savedContactInfo) {
            setContactInfo(savedContactInfo);
        }
    }, [setContactInfo]); // Empty dependency array means this effect runs once when the component mounts

    // console.log(localCartData)
    const onSubmit = (data) => {
        console.log('contact', data);

        setorderContactInfo(data);

        // Save data to local storage
        localStorage.setItem('contactInfo', JSON.stringify(data));

        // Update the state with the new data
        setContactInfo(data);

        navigate('/shipping');
    }





    let total = 0;
    let quantity = 0;
    // console.log(localCartData)
    if (localCartData) {
        for (const product of localCartData) {
            const productPrice = selectedCurrencyValue === 'BDT' ?
                (product.ProductSale === 'Sale' ? product.salePriceInBDT : product.priceInBDT) :
                (product.ProductSale === 'Sale' ? product.salePriceInUSD : product.priceInUSD);

            quantity = quantity + product.ProductQuantity;
            total = (total + productPrice * product.ProductQuantity);
        }
    }
    setTotals(total)
    localStorage.setItem('subtotal', total);
    let subtotalWithTax = (total * 1.05).toFixed(3);


    return (
        <div className="bg-[#D8D8D8] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
            <div className=" px-[100px] py-[100px] ">
                {loading ? (
                    <div className="flex justify-center items-center h-screen">
                        <div className="relative w-24 h-24 animate-spin rounded-full bg-gradient-to-r from-purple-400 via-blue-500 to-red-400 ">
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-white"></div>
                        </div>
                    </div>
                ) : (<div className=" flex flex-col lg:flex-row justify-between items-stretch gap-[20px]">
                    {/* contact 1*/}
                    <div className=" w-1/2 bg-white rounded-[10px] p-20">
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <h1 className=" text-[#000000] text-[27px] font-bold uppercase mb-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">Contact</h1>

                            <p className=" text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" >Email</p>
                            <input
                                // defaultValue={orderContactInfo?.email}
                                {...register("email")} defaultValue={user?.email || contactInfo?.email}
                                className=" border-[2px] border-[#DCDCDC] w-[695px] h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]"
                                type="email" name="email" />

                            <h1 className=" text-[#000000] text-[27px] font-bold uppercase mb-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Shipping Address</h1>

                            <p className=" text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" >Country/Region</p>
                            <select
                                {...register("Country", { required: true })}
                                defaultValue={contactInfo?.Country }
                                required
                                onChange={(e) => {
                                    // Handle onChange if needed
                                }}
                                className="select border-[2px] border-[#DCDCDC] w-[695px] h-[72px]  focus:outline-none text-[#191E1BDB] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]"
                            >
                                <option value="Pick One" disabled>Pick One Category</option>
                                {countries.map((country, index) => (
                                    <option key={index} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>





                            <div className=" flex flex-col lg:flex-row justify-between items-center">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica] ">First Name</span>
                                    </label>
                                    <input
                                        {...register("FirstName")} defaultValue={user?.displayName && user.displayName.split(' ').slice(0, -1).join(' ') || contactInfo?.FirstName} required

                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase" type="text" name="FirstName" />
                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Last Name</span>
                                    </label>
                                    <input
                                        {...register("LastName")}
                                        defaultValue={user?.displayName && user.displayName.split(' ').slice(-1).join(' ') || contactInfo?.LastName} required

                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase" type="text" name="LastName" />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Full Address</span>
                                </label>
                                <input
                                    {...register("Address")}
                                    defaultValue={contactInfo?.Address} required
                                    className=" border-[2px] border-[#DCDCDC] w-[695px] h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="text" name="Address" />
                            </div>

                            <div className=" flex flex-col lg:flex-row justify-between items-center">
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">City</span>
                                    </label>
                                    <input
                                        {...register("City")}
                                        defaultValue={contactInfo?.City} required
                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica] uppercase" type="text" name="City" />

                                </div>
                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Postal Code</span>
                                    </label>
                                    <input
                                        {...register("PostalCode")}
                                        defaultValue={contactInfo?.PostalCode}
                                        className=" border-[2px] border-[#DCDCDC]  h-[72px] mb-5 rounded-[10px] ps-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="number" name="PostalCode" />
                                </div>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-[#828282] text-[19px] mb-2 [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Phone</span>
                                </label>
                                <input
                                    {...register("number")}
                                    defaultValue={contactInfo?.number} required
                                    className=" border-[2px] border-[#DCDCDC] w-[695px] h-[72px] mb-5 rounded-[10px] ps-5 pr-5 [font-family:'Helvetica_Now_Display-Medium',Helvetica]" type="number" name="number" />
                            </div>

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
                            localCartData.map((item, index) =>
                                <div key={index} className=" flex flex-row justify-between align-middle items-center px-20 mb-3">
                                    <div>

                                        <img className="w-[135px] h-[135px] rounded-[10px] "
                                            src={`https://tahar-server.vercel.app/uploads/${item.ProductImage}`}
                                            alt="" />
                                    </div>
                                    <div>
                                        <p className="text-[19px] text-[#474747] mb-[16px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                            {item.ProductName}
                                        </p>
                                        <div className="flex flex-row justify-evenly items-center">
                                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: item?.selectedColor }}></div>
                                            <div> |</div>
                                            <p className="text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica] ml-2">
                                                {item.ProductSize}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Quantity - {item.ProductQuantity}</p>
                                    </div>

                                    <div className="w-20 h-16 text-center border-[2px] border-[#0000002E] rounded-[10px] flex flex-col justify-center">
                                        <span className="font-semibold text-lg">
                                            <p className=" text-[#828282] text-[13px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                                <p className='text-lg font-bold'>
                                                    {selectedCurrencyValue === 'BDT' ? (
                                                        item.ProductSale === 'Sale' ?
                                                            (item.salePriceInBDT && `Tk.${item.salePriceInBDT}`) :
                                                            (item.priceInBDT && `Tk.${item.priceInBDT}`)
                                                    ) : (
                                                        item.ProductSale === 'Sale' ?
                                                            (item.salePriceInUSD && `$${item.salePriceInUSD}`) :
                                                            (item.priceInUSD && `$${item.priceInUSD}`)
                                                    )}
                                                </p>

                                            </p>

                                        </span>
                                    </div>

                                </div>
                            )
                        }
                        <div className="divider text-[#0000003D]"></div>

                        <div>
                            <div className=" flex flex-row justify-between px-20">
                                <h1 className=" text-[19px] text-[#828282] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Subtotal</h1>
                                <p className=" text-[19px] text-[#1C2E37] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">
                                    {
                                        selectedCurrencyValue === "BDT" ? `Tk. ${total}` : `$ ${total}`
                                    }
                                </p>
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

                                    {
                                        selectedCurrencyValue === "BDT" ? `Tk. ${subtotalWithTax}` : `$ ${subtotalWithTax}`
                                    }
                                </p>
                            </div>
                        </div>
                        <div className="divider mb-[53px] text-[#0000003D]"></div>

                        <div className="px-20">
                            <h1 className=" text-[27px] font-bold uppercase mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Coupon:</h1>
                            <p className=" text-[19px] text-[#828282] mb-[14px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Ordering for the First time?</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Heres a special discount!</p>
                            <p className=" text-[19px] text-[#828282] mb-[28px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">Use Code: <span className=" text-[#202020] font-bold ">Tahar20</span></p>
                        </div>
                    </div>

                </div>)}

            </div>
        </div>

    );
};

export default CheckOut;