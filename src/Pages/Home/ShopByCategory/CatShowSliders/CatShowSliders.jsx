import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import './CstShowSlider.css';


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Provider/AuthProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faSlash } from "@fortawesome/free-solid-svg-icons";
import ColourChanges from "../../../../Shared/ColourChanges/ColourChanges";
import { Link } from "react-router-dom";

const CatShowSliders = ({ activeFabric, filteredFroduct, selectedCurrencyValue, doller }) => {
    const { AllProducts, setFavouriteData } = useContext(AuthContext);


    // console.log(filteredFroduct)
    const [activeSize, setActiveSize] = useState('');
    const [activeID, setActiveID] = useState('');
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const handlefavourite = (id) => {
        let favourites = JSON.parse(localStorage.getItem('favourite')) || [];

        const index = favourites.indexOf(id);

        if (index !== -1) {
            // If already in favourites, remove it
            favourites.splice(index, 1);
        } else {
            // If not in favourites, add it
            favourites.push(id);
        }

        localStorage.setItem('favourite', JSON.stringify(favourites));

        setFavouriteData(favourites)
    }

    useEffect(() => {
        const retrievedData = JSON.parse(localStorage.getItem('favourite'));
        setFavouriteData(retrievedData);
    }, [setFavouriteData])
    return (
        <div>
            <style>
                {`
            .slick-prev:before, .slick-next:before {
              
              color: black;
            }
            
            img{
                max-width: 95%;
            }
            
          `}
            </style>
            <Slider {...settings} >
                {
                    activeFabric === '' && filteredFroduct.length <= 0 ? (
                        AllProducts && AllProducts.map(item =>
                            <div key={item._id} className=' w-[431px] h-fit '>
                                {/* <Link to={`/product/${item._id}`}> */}
                                <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                    <img
                                        className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                        src={`https://tahar-server.vercel.app/uploads/${item.images[0]}`}
                                        alt="" />
                                    <button onClick={() => handlefavourite(item._id)} style={{ position: 'absolute', top: 13, right: 8 }}>
                                        <div
                                            id="MdiheartoutlineRoot"
                                            className="overflow-hidden bg-[rgba(28,_46,_55,_0.61)] flex flex-row justify-center gap-2 w-20 h-8 items-center rounded-[104px]"
                                        >
                                            <FontAwesomeIcon className=' text-white ' icon={faHeart} />
                                            <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                {JSON.parse(localStorage.getItem('favourite'))?.includes(item._id) ? 'Liked' : 'Like'}
                                            </div>
                                        </div>
                                    </button>
                                    <button>
                                        {
                                            item.Clearance === 'Sale' && (
                                                <div
                                                    className="absolute top-3 left-3 bg-[rgba(255,_75,_64,_0.71)] flex flex-col justify-center w-20 h-8 items-center rounded-[63.22041702270508px]"
                                                >
                                                    <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                        {`${item?.sellpercet}% Off`}
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </button>
                                </div>
                                {/* </Link> */}

                                <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                    <Link to={`/product/${item._id}`}>
                                        <h1 className=" text-[#474747]  h-16 text-[19px] uppercase text-xl text-center [font-family:'Helvetica_Now_Display-Medium',Helvetica]">{item.title} | {item.category}
                                        </h1>
                                    </Link>
                                    <p className=" text-black   text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">

                                        {selectedCurrencyValue === 'BDT' ? (item.Clearance === 'Sale' ? (
                                            <>
                                                <span className="line-through text-[#828282] ">Tk.{parseInt(item.price).toFixed(2)}</span> Tk.{((parseInt(item.price) - (parseInt(item.price) * (parseInt(item?.sellpercet) / 100)))).toFixed(2)}
                                            </>
                                        ) : (
                                            `Tk.${item.price}`
                                        )) : (item.Clearance === 'Sale' ? (
                                            <>
                                                <span className="line-through text-[#828282]">${parseFloat(item.price * 2.5 * doller).toFixed(2)}</span>
                                                $ {(((parseInt(item.price) * 2.5 * doller) - ((parseInt(item.price) * 2.5 * doller) * (parseInt(item?.sellpercet)) / 100))).toFixed(2)}
                                            </>
                                        ) : (
                                            `$${item.price * 2.5 * doller}`
                                        ))}

                                    </p>


                                    {/* colour */}
                                    <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                    <div className=" flex gap-2">
                                        {
                                            parseInt(item.Squantity) > 0 ? (
                                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                    }`}
                                                    onClick={() => {
                                                        setActiveSize('S');
                                                        setActiveID(item._id);
                                                    }}
                                                >S</button>
                                            ) : (
                                                <button
                                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                    disabled
                                                >
                                                    S
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faSlash} size="x" />

                                                    </div>
                                                </button>
                                            )
                                        }
                                        {
                                            parseInt(item.Mquantity) > 0 ? (
                                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                    }`} onClick={() => {
                                                        setActiveSize('M');
                                                        setActiveID(item._id);
                                                    }}>M</button>
                                            ) : (
                                                <button
                                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                    disabled
                                                >
                                                    M
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                                    </div>
                                                </button>
                                            )
                                        }
                                        {
                                            parseInt(item.Lquantity) > 0 ? (
                                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                    }`} onClick={() => {
                                                        setActiveSize('L');
                                                        setActiveID(item._id);
                                                    }}>L</button>
                                            ) : (
                                                <button
                                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                    disabled
                                                >
                                                    L
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                                    </div>
                                                </button>
                                            )
                                        }
                                        {
                                            parseInt(item.XLquantity) > 0 ? (
                                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                    }`} onClick={() => {
                                                        setActiveSize('XL');
                                                        setActiveID(item._id);
                                                    }}>XL</button>
                                            ) : (
                                                <button
                                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                    disabled
                                                >
                                                    XL
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                                    </div>
                                                </button>
                                            )
                                        }
                                        {
                                            parseInt(item.XXLquantity) > 0 ? (
                                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                    }`} onClick={() => {
                                                        setActiveSize('XXL');
                                                        setActiveID(item._id);
                                                    }}>XXL</button>
                                            ) : (
                                                <button
                                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                    disabled
                                                >
                                                    XXL
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                                    </div>
                                                </button>
                                            )
                                        }
                                        {
                                            parseInt(item.XXXLquantity) > 0 ? (
                                                <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                    }`} onClick={() => {
                                                        setActiveSize('XXXL');
                                                        setActiveID(item._id);
                                                    }}>XXXL</button>
                                            ) : (
                                                <button
                                                    className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                    disabled
                                                >
                                                    XXXL
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <FontAwesomeIcon icon={faSlash} size="x" />
                                                    </div>
                                                </button>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                    ) :
                        activeFabric === '' && filteredFroduct.length > 0 ? (
                            filteredFroduct && filteredFroduct.map(item =>
                                <div key={item._id} className=' w-[431px] h-fit '>
                                    {/* <Link to={`/product/${item._id}`}> */}
                                    <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                        <img
                                            className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                            src={`https://tahar-server.vercel.app/uploads/${item.images[0]}`}
                                            alt="" />
                                        <button onClick={() => handlefavourite(item._id)} style={{ position: 'absolute', top: 13, right: 8 }}>
                                            <div
                                                id="MdiheartoutlineRoot"
                                                className="overflow-hidden bg-[rgba(28,_46,_55,_0.61)] flex flex-row justify-center gap-2 w-20 h-8 items-center rounded-[104px]"
                                            >
                                                <FontAwesomeIcon className=' text-white ' icon={faHeart} />
                                                <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                    {JSON.parse(localStorage.getItem('favourite'))?.includes(item._id) ? 'Liked' : 'Like'}
                                                </div>
                                            </div>
                                        </button>
                                        <button>
                                            {
                                                item.Clearance === 'Sale' && (
                                                    <div
                                                        className="absolute top-3 left-3 bg-[rgba(255,_75,_64,_0.71)] flex flex-col justify-center w-20 h-8 items-center rounded-[63.22041702270508px]"
                                                    >
                                                        <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                            {`${item?.sellpercet}% Off`}
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </button>
                                    </div>
                                    {/* </Link> */}

                                    <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                        <Link to={`/product/${item._id}`}><h1 className=" text-[#474747] h-16 text-[19px] uppercase text-xl text-center [font-family:'Helvetica_Now_Display-Medium',Helvetica]">{item.title} | {item.category}</h1></Link>
                                        <p className=" text-black  text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">

                                            {selectedCurrencyValue === 'BDT' ? (item.Clearance === 'Sale' ? (
                                                <>
                                                    <span className="line-through text-[#828282]">Tk.{parseInt(item.price).toFixed(2)}</span> Tk.{((parseInt(item.price) - (parseInt(item.price) * (parseInt(item?.sellpercet) / 100)))).toFixed(2)}
                                                </>
                                            ) : (
                                                `Tk.${item.price}`
                                            )) : (item.Clearance === 'Sale' ? (
                                                <>
                                                    <span className="line-through text-[#828282]">${parseFloat(item.price * 2.5 * doller).toFixed(2)}</span>
                                                    $ {(((parseInt(item.price) * 2.5 * doller) - ((parseInt(item.price) * 2.5 * doller) * (parseInt(item?.sellpercet)) / 100))).toFixed(2)}
                                                </>
                                            ) : (
                                                `$${item.price * 2.5 * doller}`
                                            ))}

                                        </p>


                                        {/* colour */}
                                        <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                        <div className=" flex gap-2">
                                            {
                                                parseInt(item.Squantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`}
                                                        onClick={() => {
                                                            setActiveSize('S');
                                                            setActiveID(item._id);
                                                        }}
                                                    >S</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        S
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.Mquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('M');
                                                            setActiveID(item._id);
                                                        }}>M</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        M
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.Lquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('L');
                                                            setActiveID(item._id);
                                                        }}>L</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        L
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XLquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XL');
                                                            setActiveID(item._id);
                                                        }}>XL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        XL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XXLquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XXL');
                                                            setActiveID(item._id);
                                                        }}>XXL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        XXL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }
                                            {
                                                parseInt(item.XXXLquantity) > 0 ? (
                                                    <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                        }`} onClick={() => {
                                                            setActiveSize('XXXL');
                                                            setActiveID(item._id);
                                                        }}>XXXL</button>
                                                ) : (
                                                    <button
                                                        className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                        disabled
                                                    >
                                                        XXXL
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <FontAwesomeIcon icon={faSlash} size="x" />
                                                        </div>
                                                    </button>
                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                            )
                        )
                            : (

                                AllProducts &&
                                AllProducts.filter((item) => item.fabrics === activeFabric).map((item) => (

                                    <div key={item._id} className=' w-[431px] h-fit '>
                                        {/* <Link to={`/product/${item._id}`}> */}
                                        <div className=" w-[431px]" style={{ position: 'relative', display: 'inline-block' }}>
                                            <img
                                                className="mx-auto block w-[431px] h-[417px] rounded-[10px] object-cover object-center"
                                                src={`https://tahar-server.vercel.app/uploads/${item.images[0]}`}
                                                alt="" />
                                            <button onClick={() => handlefavourite(item._id)} style={{ position: 'absolute', top: 13, right: 8 }}>
                                                <div
                                                    id="MdiheartoutlineRoot"
                                                    className="overflow-hidden bg-[rgba(28,_46,_55,_0.61)] flex flex-row justify-center gap-2 w-20 h-8 items-center rounded-[104px]"
                                                >
                                                    <FontAwesomeIcon className=' text-white ' icon={faHeart} />
                                                    <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                        {JSON.parse(localStorage.getItem('favourite'))?.includes(item._id) ? 'Liked' : 'Like'}
                                                    </div>
                                                </div>
                                            </button>
                                            <button>
                                                {
                                                    item.Clearance === 'Sale' && (
                                                        <div
                                                            className="absolute top-3 left-3 bg-[rgba(255,_75,_64,_0.71)] flex flex-col justify-center w-20 h-8 items-center rounded-[63.22041702270508px]"
                                                        >
                                                            <div className="text-center text-lg [font-family:'Helvetica_Now_Display-Medium',Helvetica] font-medium text-white">
                                                                {`${item?.sellpercet}% Off`}
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </button>
                                        </div>
                                        {/* </Link> */}

                                        <div className="flex flex-col justify-center align-middle items-center mt-2 gap-3">
                                            <Link to={`/product/${item._id}`}><h1 className=" text-[#474747] h-16 text-[19px] uppercase text-xl text-center [font-family:'Helvetica_Now_Display-Medium',Helvetica]">{item.title} | {item.category}</h1></Link>

                                            <p className=" text-black  text-[19px] [font-family:'Helvetica_Now_Display-Medium',Helvetica]">

                                                {selectedCurrencyValue === 'BDT' ? (item.Clearance === 'Sale' ? (
                                                    <>
                                                        <span className="line-through text-[#828282]">Tk.{parseInt(item.price).toFixed(2)}</span> Tk.{((parseInt(item.price) - (parseInt(item.price) * (parseInt(item?.sellpercet) / 100)))).toFixed(2)}
                                                    </>
                                                ) : (
                                                    `Tk.${item.price}`
                                                )) : (item.Clearance === 'Sale' ? (
                                                    <>
                                                        <span className="line-through text-[#828282]">${parseFloat(item.price * 2.5 * doller).toFixed(2)}</span>
                                                        $ {(((parseInt(item.price) * 2.5 * doller) - ((parseInt(item.price) * 2.5 * doller) * (parseInt(item?.sellpercet)) / 100))).toFixed(2)}
                                                    </>
                                                ) : (
                                                    `$${item.price * 2.5 * doller}`
                                                ))}

                                            </p>


                                            {/* colour */}
                                            <ColourChanges key={item._id} item={item} activeSize={activeSize} activeID={activeID}></ColourChanges>

                                            <div className=" flex gap-2">
                                                {
                                                    parseInt(item.Squantity) > 0 ? (
                                                        <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'S' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                            }`}
                                                            onClick={() => {
                                                                setActiveSize('S');
                                                                setActiveID(item._id);
                                                            }}
                                                        >S</button>
                                                    ) : (
                                                        <button
                                                            className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                            disabled
                                                        >
                                                            S
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                                {
                                                    parseInt(item.Mquantity) > 0 ? (
                                                        <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'M' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                            }`} onClick={() => {
                                                                setActiveSize('M');
                                                                setActiveID(item._id);
                                                            }}>M</button>
                                                    ) : (
                                                        <button
                                                            className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                            disabled
                                                        >
                                                            M
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                                {
                                                    parseInt(item.Lquantity) > 0 ? (
                                                        <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'L' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                            }`} onClick={() => {
                                                                setActiveSize('L');
                                                                setActiveID(item._id);
                                                            }}>L</button>
                                                    ) : (
                                                        <button
                                                            className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                            disabled
                                                        >
                                                            L
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                                {
                                                    parseInt(item.XLquantity) > 0 ? (
                                                        <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                            }`} onClick={() => {
                                                                setActiveSize('XL');
                                                                setActiveID(item._id);
                                                            }}>XL</button>
                                                    ) : (
                                                        <button
                                                            className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                            disabled
                                                        >
                                                            XL
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                                {
                                                    parseInt(item.XXLquantity) > 0 ? (
                                                        <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                            }`} onClick={() => {
                                                                setActiveSize('XXL');
                                                                setActiveID(item._id);
                                                            }}>XXL</button>
                                                    ) : (
                                                        <button
                                                            className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                            disabled
                                                        >
                                                            XXL
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }
                                                {
                                                    parseInt(item.XXXLquantity) > 0 ? (
                                                        <button className={`[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px] rounded-[8px] flex justify-center items-center text-[#5A5A5A] ${activeSize === 'XXXL' && activeID === item._id ? 'bg-white border-[#5A5A5A]' : 'bg-[#ebebeb] hover:border-[#5A5A5A]'
                                                            }`} onClick={() => {
                                                                setActiveSize('XXXL');
                                                                setActiveID(item._id);
                                                            }}>XXXL</button>
                                                    ) : (
                                                        <button
                                                            className="[font-family:'Helvetica_Now_Display-Medium',Helvetica] w-[51px] h-[40px] border-[2px]  rounded-[8px] flex justify-center items-center bg-[#ebebeb] relative"
                                                            disabled
                                                        >
                                                            XXXL
                                                            <div className="absolute inset-0 flex items-center justify-center">
                                                                <FontAwesomeIcon icon={faSlash} size="x" />
                                                            </div>
                                                        </button>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    </div>
                                ))
                            )
                }
            </Slider>

        </div>
    );
};

export default CatShowSliders;