import React, { useState } from 'react';


// Form nhập tên thành phố
const WeatherForm = ({ onSearch }) => {
    const [city, setCity] = useState('') // State lưu tên thành phố nhập vào

    const handleSubmit = (e) => {
        e.preventDefault() // chặn hành động reload trang của trình duyệt
        if (city.trim() !== '') {
            onSearch(city) // gọi hàm onSearch và truyền vào prop 'city'
            setCity('') // reset ô input sau khi submit
        }
    }

    return (
        <>
            <div className='max-w-96 md:max-w-[78rem] my-0 mx-auto'>
                <form onSubmit={handleSubmit} className='flex justify-center items-center mt-5 w-full'>
                    <input className='border-2 rounded-xl w-72 md:w-full md:mr-4 p-3 focus:outline-teal-400'
                        type="text" placeholder='Enter city name'
                        value={city}
                        onChange={(e) => setCity(e.target.value)} // Cập nhật tên thành phố 
                    />
    
                    <button className="hidden w-1/4 md:block py-3 px-4 flex items-center gap-x-2 text-sm font-medium 
                        rounded-lg border border-transparent bg-teal-200 
                        text-teal-700 hover:scale-105 duration-300 focus:outline-hidden"
                         type="submit"
                    >
                        Button
                    </button>
                </form>
            </div>
        </>
    );
};

export default WeatherForm;