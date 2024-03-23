import React from 'react';
import './ShowCategory.css';
const ShowCategory = ({ categoryData, handleStatus }) => {

    return (
        <div className="flex flex-col h-[664px] ">
            <div className="w-full max-w-2xl  mx-auto bg-[#201D1D] shadow-lg  border border-[#FFFFFF24] rounded-[18px] p-10 overflow-y-auto">

                <h2 className="font-semibold text-gray-800 category_text text-start">Category List</h2>
                <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>

                <div className=" ">
                    <div className="overflow-x-auto">
                        <table className="table-auto w-full ">
                            <thead className="text-xs font-semibold uppercase ">
                                <tr>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="Category_List">Image</div>
                                        <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="Category_List">Category</div>
                                        <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="Category_List">Status</div>
                                        <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                    </th>
                                    <th className="p-2 whitespace-nowrap">
                                        <div className="Category_List">Action</div>
                                        <div className=" bg-[#FFFFFF24] h-[2px] divider"></div>
                                    </th>
                                </tr>
                            </thead>
                            
                            <tbody className="text-sm ">
                                {
                                    categoryData.map(item =>
                                        <tr key={item._id}>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className=" flex-shrink-0 mr-2 sm:mr-3"><img className=" w-10 h-10 rounded-full"
                                                        src={`https://taharecom-ayh8nwjc2-itsmejunaieds-projects.vercel.app/uploads/${item.image}`}
                                                        width="40" height="40" alt="Alex Shatov" />
                                                    </div>
                                                    <div className="font-medium text-gray-800">

                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-center font-['Manrope'] section-name-category">
                                                    {item.title}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className={`text-center font-['Manrope']  font-medium  ${item.status === 'Not Show' ? 'text-[#ABA9A9]' : 'text-[#B3EEAA]' }`}>
                                                    {item.status}
                                                </div>
                                            </td>
                                            <td className="p-2 whitespace-nowrap">
                                                <div className="text-lg text-center">
                                                    <button onClick={() => handleStatus(item._id, item.status)} className="btn btn-sm bg-[#DAC795] border-[#DAC795] font-['Manrope']"  >Change Status</button>
                                                </div>
                                            </td>
                                        </tr> 
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default ShowCategory;