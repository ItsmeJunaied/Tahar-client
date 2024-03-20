import React, { useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { AuthContext } from '../../../../Provider/AuthProvider';



const Revenue = () => {
  const { user, } = useContext(AuthContext);
  const [orderData, setOrderData] = useState([]);
  useEffect(() => {
    fetch('https://taharz.onrender.com/orders')
      .then(res => res.json())
      .then(data => {
        setOrderData(data);
      });
  }, []);


  const allDatesAndSubtotal = orderData.map(item => {
    const dt = item.data;
    return { date: dt.date, subtotalTaxandShipping: dt.total_amount };
  });

  // console.log(allDatesAndSubtotal);

  const filteredData = allDatesAndSubtotal.filter(item => item.date !== undefined);

  const uniqueDates = [...new Set(filteredData.map(item => item.date))];

  const result = uniqueDates.map(date => {
    const total = filteredData
      .filter(item => item.date === date)
      .reduce((acc, item) => acc + parseFloat(item.subtotalTaxandShipping), 0);

    return { date, total };
  });

  // Sort the result array by date
  result.sort((a, b) => new Date(a.date) - new Date(b.date));

  const data = result;



  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default Revenue;