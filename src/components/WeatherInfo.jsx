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
        const regionNames = new Intl.DisplayNames(["eng"], { type: "region" }); // Hiển thị tên quốc gia bằng tiếng Anh
        return regionNames.of(countryCode) || countryCode; // Nếu không tìm thấy, trả về mã gốc
    }

    return (
        <div className=''>
            <h2>
                {weatherData.name}, {getCountryName(weatherData.sys.country)}
            </h2>

            <p>Temperature: {weatherData.main.temp}℃ </p>
            <p className='capitalize'>Weather: {weatherData.weather[0].description} </p>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Weather Icon"
            />
        </div>
    );
};

export default WeatherInfo;