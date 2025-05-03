import React from 'react';

/*  Hiển thị thông tin thời tiết

    - Các thuộc tính của API:
        .name
        .sys.country
        .main.temp
        .weather[0].description
        .weather[0].icon
*/
const WeatherInfo = ({ weatherData }) => {
    // 'weatherData' là prop chứa data của thời tiết

    // Hàm convert Country Code -> Country Name
    const getCountryName = (countryCode) => {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" }); // Hiển thị tên quốc gia bằng tiếng Anh
        return regionNames.of(countryCode) || countryCode; // Nếu không tìm thấy, trả về mã gốc
    }

    // Hàm chuyển timestamp → ngày giờ theo GMT+7
    const formatGMT7 = (timestamp) => {
        const date = new Date(timestamp * 1000); // Convert timestamp (giây) thành đối tượng Date (miligiây)
        return date.toLocaleDateString("en-GB", { 
            timeZone: "Asia/Ho_Chi_Minh", // Cố định múi giờ Việt Nam (GMT+7)
            day: "numeric",               // Hiển thị ngày dưới dạng số 
            month: "long",                // Hiển thị tháng dạng chữ đầy đủ (April, May,...)
            year: "numeric",              // Hiển thị năm đầy đủ (2025)
        });
    };

    return (
        <div className=''>
            <h1>Today</h1>

            {/* Location */}
            <h2>
                {weatherData.name}, {getCountryName(weatherData.sys.country)}
            </h2>

            <div className=''>
                <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                />
                <p>Temperature: {weatherData.main.temp}℃ </p>
            </div>
            
            <p className='capitalize'>Weather: {weatherData.weather[0].description} </p>
            <p>Today: {formatGMT7(weatherData.dt)}</p>
            
        </div>
    )
};

export default WeatherInfo;