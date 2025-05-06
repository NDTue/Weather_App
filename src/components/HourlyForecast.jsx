// Import thư viện React để sử dụng các tính năng của React
import React from 'react';

const HourlyForecast = ({ forecastData }) => {
    // Hàm format thời gian từ timestamp sang định dạng giờ:phút
    const formatTime = (timestamp) => {
        // Chuyển đổi timestamp thành đối tượng Date
        // Nhân với 1000 để chuyển từ s -> ms
        const date = new Date(timestamp * 1000);
        
        // Sử dụng phương thức toLocaleTimeString để định dạng thời gian theo tiếng Việt
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',    // Hiển thị giờ dạng 2 chữ số (01, 02, ...)
            minute: '2-digit',  // Hiển thị phút dạng 2 chữ số (01, 02, ...)
            timeZone: 'Asia/Ho_Chi_Minh'  // Sử dụng múi giờ Việt Nam
        });
    };

    // Lấy 8 mốc thời gian đầu tiên từ dữ liệu dự báo (tương đương 24h)
    // ?. (optional chaining) đảm bảo không lỗi nếu forecastData là null/undefined
    const hourlyData = forecastData?.list.slice(0, 8);

    return (
        <div className='w-full md:max-w-[48rem] px-4 md:px-0 mx-auto mt-8'>
            <h2 className='text-3xl font-semibold text-white mb-4 [text-shadow:_-3px_3px_3px_rgba(131,131,131,0.57)]'>
                Next 24 hours
            </h2>

            {/* Mobile: 4 cột | Desktop: 8 cột */}
            <div className='grid grid-cols-4 gap-4 md:grid-cols-8'>
                {/* ?. (optional chaining) đảm bảo không lỗi nếu hourlyData là null/undefined */}
                {hourlyData?.map((hour, index) => (
                    <div key={index} className='bg-white/30 p-3 rounded-xl text-center text-white 
                        [text-shadow:_-2px_2px_2px_rgba(131,131,131,0.57)]
                        bg-gradient-to-b from-sky-400 to-sky-200'>

                        {/* Time */}
                        <p className='text-md font-semibold'>{formatTime(hour.dt)}</p>
                        
                        {/* Icon */}
                        <img className='mx-auto size-16'
                            src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                            alt={hour.weather[0].description}/>

                        {/* Temperature */}
                        <p className='text-xl font-bold'>{Math.round(hour.main.temp)}°</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;