import React from 'react';

/*  Hiển thị thông tin thời tiết

    - Các thuộc tính của API:
        .name
        .sys.country
        .main.temp
        .weather[0].description
        .weather[0].icon
        .main.humidity
        .wind.speed
        .dt (timestamp)
*/
const WeatherInfo = ({ weatherData }) => {
    // 'weatherData' là prop chứa data của thời tiết

    // Hàm convert Country Code -> Country Name
    const getCountryName = (countryCode) => {
        const regionNames = new Intl.DisplayNames(["en"], { type: "region" }); // Hiển thị tên quốc gia bằng tiếng Anh
        return regionNames.of(countryCode) || countryCode; // Nếu không tìm thấy, trả về mã gốc
    }

    // Hàm chuyển timestamp -> ngày giờ theo GMT+7
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
        <div className='w-full md:max-w-[48rem] px-4 md:px-0 mx-auto'>
            {/* Icon */}
            <div className='flex justify-center '>
                <img className='size-32 md:size-48 drop-shadow-xl'
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                />
            </div>

            {/* Weather Detail Info */}
            <div className='drop-shadow-2xl mt-5 bg-white/30 rounded-3xl text-center
            bg-gradient-to-r from-sky-400 to-blue-500'>
                <div className='text-white rounded-3xl py-5 [text-shadow:_-3px_3px_3px_rgba(131,131,131,0.57)]'>
                    <h1 className='text-2xl pb-5'>Today, {formatGMT7(weatherData.dt)}</h1>

                    {/* Temperature */}
                    <p className='text-6xl font-bold pb-5 drop-shadow-lg'>
                        {Math.round(weatherData.main.temp)}°
                    </p>

                    {/* Weather Description */}
                    <p className='text-2xl capitalize font-semibold pb-5 tracking-wider'>
                        {weatherData.weather[0].description}
                    </p>

                    {/* Location */}
                    <h2 className='text-lg pb-5 '>
                        {weatherData.name}, {getCountryName(weatherData.sys.country)}
                    </h2>

                    {/* Humid & Wind */}
                    <div className='text-lg px-2 flex justify-between md:justify-evenly items-center'>
                        {/* Humidity */}
                        <div className='flex items-center gap-3 '>
                            <svg width="20" height="20" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.9111 2.44851L3.4501 5.90952C2.76566 6.59402 2.29957 7.46611 2.11076 8.41551C1.92195 9.36491 2.0189 10.349 2.38936 11.2433C2.75982 12.1376 3.38714 12.9019 4.192 13.4397C4.99686 13.9775 5.94311 14.2645 6.9111 14.2645C7.87909 14.2645 8.82534 13.9775 9.63021 13.4397C10.4351 12.9019 11.0624 12.1376 11.4328 11.2433C11.8033 10.349 11.9003 9.36491 11.7114 8.41551C11.5226 7.46611 11.0565 6.59402 10.3721 5.90952L6.9111 2.44851ZM6.9111 0.471191L11.3608 4.92086C12.2408 5.80091 12.8401 6.92217 13.0829 8.14284C13.3257 9.36351 13.2011 10.6288 12.7248 11.7786C12.2485 12.9285 11.442 13.9112 10.4072 14.6027C9.37232 15.2941 8.15568 15.6632 6.9111 15.6632C5.66652 15.6632 4.44989 15.2941 3.41505 14.6027C2.38022 13.9112 1.57366 12.9285 1.09738 11.7786C0.621094 10.6288 0.496472 9.36351 0.739273 8.14284C0.982073 6.92217 1.58139 5.80091 2.46144 4.92086L6.9111 0.471191Z" fill="white" />
                            </svg>
                            <p>Humidity: {weatherData.main.humidity}%</p>
                        </div>

                        <div className='h-6 w-px bg-white/50'></div>

                        {/* Wind Speed */}
                        <div className='flex items-center gap-3 '>
                            <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.86232 11.4021H2.31756V10.0038H6.86232C7.30892 10.0039 7.74697 10.1263 8.129 10.3576C8.51103 10.589 8.82247 10.9204 9.02958 11.3161C9.23668 11.7118 9.33156 12.1566 9.30393 12.6024C9.2763 13.0481 9.12721 13.4778 8.87282 13.8449C8.61843 14.2119 8.26843 14.5024 7.86076 14.6848C7.45308 14.8672 7.00328 14.9345 6.56007 14.8795C6.11686 14.8245 5.69715 14.6492 5.34642 14.3728C4.99569 14.0963 4.72731 13.7291 4.57036 13.3109L5.87995 12.8194C5.9472 12.9986 6.0622 13.156 6.2125 13.2745C6.36281 13.393 6.54268 13.4681 6.73262 13.4917C6.92257 13.5153 7.11535 13.4865 7.29007 13.4083C7.4648 13.3302 7.61481 13.2057 7.72385 13.0484C7.83289 12.8911 7.8968 12.7069 7.90865 12.5159C7.92051 12.3249 7.87986 12.1342 7.79111 11.9646C7.70236 11.7951 7.5689 11.653 7.40518 11.5538C7.24145 11.4547 7.05372 11.4022 6.86232 11.4021ZM3.01675 7.20699H12.4559C12.9025 7.20715 13.3405 7.32952 13.7225 7.56085C14.1046 7.79218 14.416 8.12364 14.6231 8.51933C14.8302 8.91501 14.9251 9.35983 14.8975 9.80558C14.8698 10.2513 14.7208 10.681 14.4664 11.0481C14.212 11.4152 13.862 11.7056 13.4543 11.888C13.0466 12.0704 12.5968 12.1377 12.1536 12.0827C11.7104 12.0277 11.2907 11.8525 10.94 11.576C10.5892 11.2995 10.3209 10.9323 10.1639 10.5142L11.4735 10.0226C11.5407 10.2018 11.6557 10.3592 11.806 10.4777C11.9564 10.5963 12.1362 10.6714 12.3262 10.695C12.5161 10.7185 12.7089 10.6897 12.8836 10.6116C13.0583 10.5334 13.2084 10.4089 13.3174 10.2516C13.4264 10.0943 13.4903 9.91017 13.5022 9.71914C13.5141 9.5281 13.4734 9.33746 13.3847 9.16787C13.2959 8.99829 13.1624 8.85622 12.9987 8.75707C12.835 8.65791 12.6473 8.60546 12.4559 8.60538H3.01675C2.46044 8.60538 1.92691 8.38438 1.53354 7.99101C1.14017 7.59764 0.919174 7.06411 0.919174 6.5078C0.919174 5.95149 1.14017 5.41796 1.53354 5.02459C1.92691 4.63121 2.46044 4.41022 3.01675 4.41022H8.95989C9.1513 4.41014 9.33903 4.35768 9.50276 4.25853C9.66648 4.15938 9.79994 4.01731 9.88869 3.84772C9.97744 3.67814 10.0181 3.4875 10.0062 3.29646C9.99438 3.10542 9.93047 2.92127 9.82143 2.76396C9.71239 2.60665 9.56238 2.48218 9.38765 2.40403C9.21293 2.32589 9.02015 2.29705 8.8302 2.32064C8.64026 2.34422 8.46039 2.41934 8.31008 2.53786C8.15978 2.65637 8.04478 2.81375 7.97753 2.99295L6.66794 2.50212C6.86964 1.9657 7.25315 1.51706 7.75165 1.23435C8.25015 0.951646 8.83204 0.852805 9.39593 0.95505C9.95982 1.0573 10.47 1.35415 10.8375 1.79388C11.205 2.23361 11.4065 2.78835 11.4071 3.36143C11.4071 4.01046 11.1492 4.63291 10.6903 5.09184C10.2314 5.55078 9.60893 5.8086 8.95989 5.8086H3.01675C2.83132 5.8086 2.65347 5.88227 2.52235 6.01339C2.39123 6.14452 2.31756 6.32236 2.31756 6.5078C2.31756 6.69324 2.39123 6.87108 2.52235 7.0022C2.65347 7.13333 2.83132 7.20699 3.01675 7.20699Z" fill="white" />
                            </svg>
                            <p>Wind: {(weatherData.wind.speed * 3.6).toFixed(1)} km/h</p> {/* Chuyển từ m/s -> km/h */}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
};

export default WeatherInfo;