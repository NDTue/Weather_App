import React from 'react';

const DailyForecast = ({ forecastData }) => {
    // Hàm format ngày thành định dạng tiếng Việt
    const formatDay = (timestamp) => {
        // Chuyển đổi timestamp thành đối tượng Date
        // Nhân với 1000 để chuyển từ giây sang mili giây
        const date = new Date(timestamp * 1000);

        // Sử dụng phương thức toLocaleDateString để định dạng ngày theo tiếng Việt
        const weekday = date.toLocaleDateString("en-GB", { weekday: "short" }); // Mon
        const day = date.toLocaleDateString("en-GB", { day: "numeric" }); // 5
        const month = date.toLocaleDateString("en-GB", { month: "long" }); // May

        return `${weekday}, ${day} ${month}`; // Mon, 5 May
    };

    // Xử lý dữ liệu để lấy dự báo cho 7 ngày với nhiệt độ min/max chính xác
    const dailyData = React.useMemo(() => {
        if (!forecastData?.list) return []

        // Tạo đối tượng để lưu trữ dữ liệu theo ngày
        const dailyMap = {}

        // Duyệt qua tất cả các mốc thời gian
        forecastData.list.forEach(item => {
            // Lấy ngày từ timestamp
            const date = new Date(item.dt * 1000)
            const dateStr = date.toDateString()

            // Nếu chưa có dữ liệu cho ngày này, khởi tạo
            if (!dailyMap[dateStr]) {
                dailyMap[dateStr] = {
                    dt: item.dt,
                    weather: item.weather,
                    main: {
                        temp_min: item.main.temp,
                        temp_max: item.main.temp
                    }
                }
            } else {
                // Cập nhật nhiệt độ min/max nếu cần
                dailyMap[dateStr].main.temp_min = Math.min(dailyMap[dateStr].main.temp_min, item.main.temp)
                dailyMap[dateStr].main.temp_max = Math.max(dailyMap[dateStr].main.temp_max, item.main.temp)
            }
        })

        // Chuyển đối tượng thành mảng và lấy 5 ngày tiếp theo, bỏ qua ngày hiện tại
        return Object.values(dailyMap).slice(1, 6)
    }, [forecastData])

    return (
        <div className='w-full md:max-w-[48rem] px-4 md:px-0 mx-auto mt-8'>
            <h2 className='text-3xl font-semibold text-white mb-4 [text-shadow:_-3px_3px_3px_rgba(131,131,131,0.57)]'>
                Next 5 days
            </h2>

            <div className='space-y-3'>
                {/* ?. (optional chaining) đảm bảo không lỗi nếu dailyData là null/undefined */}
                {dailyData?.map((day, index) => (
                    <div className='bg-white/30 p-4 rounded-xl flex justify-between items-center
                        text-white [text-shadow:_-2px_2px_2px_rgba(131,131,131,0.57)]
                        bg-gradient-to-r from-cyan-400 to-blue-500'
                        key={index}>

                        {/* Hiển thị ngày */}
                        <span className='text-xl font-semibold'>{formatDay(day.dt)}</span>

                        <div className='flex gap-4 items-center'>
                            {/* Icon */}
                            <img className='w-16 h-16'
                                src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                alt={day.weather[0].description}
                            />

                            {/* Min - Max Temperature */}
                            <div className='flex gap-2'>
                                <span className='text-xl font-bold'>{Math.round(day.main.temp_max)}°</span>
                                <span className='text-xl opacity-80'>{Math.round(day.main.temp_min)}°</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
export default DailyForecast;