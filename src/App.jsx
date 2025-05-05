import React, { useState } from "react";
import WeatherForm from "./components/WeatherForm";
import WeatherInfo from "./components/WeatherInfo";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";

/*
    1. Người dùng nhập tên thành phố vào WeatherForm.
    2. WeatherForm gửi thành phố về App.
    3. App gọi API để fetch dữ liệu thời tiết.
    4. App lưu dữ liệu thời tiết vào state.
    5. WeatherInfo nhận dữ liệu và hiển thị thông tin thời tiết.
    6. Nếu lỗi (ví dụ thành phố không tìm thấy), hiển thị lỗi.
*/

const App = () => {
    const [weatherData, setWeatherData] = useState() // State lưu data
    const [error, setError] = useState('') // State lưu lỗi
    const [forecastData, setForecastData] = useState() // State lưu dự báo

    const API_KEY = '53c949e3f49c8657a3d6437d52829239' // key của tài khoản cá nhân OpenWeather

    const fetchData = async (city) => {
        try {
            // Fetch dữ liệu thời tiết hiện tại
            // 'units=metric' giúp lấy dữ liệu theo đơn vị độ C.
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ API_KEY }&units=metric`
            )
            setError('') // Xóa lỗi trước đó nếu có.
            setWeatherData(null) // Xóa dữ liệu cũ trước khi gửi yêu cầu mới.
            setForecastData(null) // Xóa dữ liệu cũ trước khi gửi yêu cầu mới.

            // return true nếu API phản hồi mã 200
            // return false nếu API phản hồi mã 400, 404, 500
            if(!response.ok) // kiểm tra nếu false -> throw lỗi
                throw new Error('City not found')
            const data = await response.json() // covert JSON -> Javascript

            // Fetch dự báo 7 ngày tiếp theo
            const forecast = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${ city }&appid=${ API_KEY }&units=metric`
            )
            if(!forecast.ok){
                throw new Error('Forecast data not available')
            }
            const forecastData = await forecast.json()

            setWeatherData(data)  // Cập nhật state 'weatherData' với dữ liệu thời tiết mới.
            setForecastData(forecastData)  // Cập nhật state 'forecastData' với dữ liệu thời tiết mới.
        } catch (err) { // 'err' là 1 object có thuộc tính message chứa mô tả lỗi
            setError(err.message)
        }
    }

    return (
        <div className="flex flex-col justify-center items-center mt-12">
            <h1 className="text-5xl  font-bold  text-white
            bg-gradient-to-tr from-fuchsia-300 to-rose-600 bg-clip-text text-transparent">
                Weather App
            </h1>

            <WeatherForm onSearch={fetchData}/> {/* Submit tên thành phố sẽ fetchData */}
            
            {error && <p className="mt-10 text-3xl text-white [text-shadow:_-3px_3px_3px_rgba(131,131,131,0.57)] font-semibold">
                {error}
            </p>} {/* Nếu có lỗi, hiển thị thông báo lỗi */}
            
            {/* Nếu có data thì render */}
            {weatherData && ( 
                <>
                    <WeatherInfo weatherData={weatherData}/>
                    <HourlyForecast forecastData={forecastData}/>
                    <DailyForecast forecastData={forecastData}/>
                </>
            )} 
        </div>
    );
};

export default App;
