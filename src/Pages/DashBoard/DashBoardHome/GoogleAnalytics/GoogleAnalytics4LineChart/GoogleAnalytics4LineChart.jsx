import React, { useState, useEffect } from "react";
import { Line } from "react-google-charts";

const GoogleAnalytics4LineChart = ({ viewId, metric, dimension }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://www.googleapis.com/analytics/data/v1/alpha/properties/${viewId}/reports?metrics=${metric}&dimensions=${dimension}`
            );
            const data = await response.json();
            setData(data.rows);
        };

        fetchData();
    }, [viewId, metric, dimension]);

    return (
        <Line
            data={data}
            options={{
                chart: {
                    title: "User Activity Over Time",
                },
                hAxis: {
                    title: "Date",
                },
                vAxis: {
                    title: "Metric",
                },
            }}
        />
    );
};

export default GoogleAnalytics4LineChart;