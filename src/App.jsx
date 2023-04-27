import sunny from "./assets/icons/sunny.png";
import moon from "./assets/icons/moon.png";
import humidity from "./assets/icons/humidity.png";
import temperature from "./assets/icons/temperature.png";
import wind from "./assets/icons/wind.png";
import { useEffect, useState } from "react";

function App() {
    const [stat, setStat] = useState({
        temp: 0,
        humid: 0,
        wind: 0,
        city: "",
        weather: "",
    });
    const [isDay, setIsDay] = useState(false);

    // set day or night
    useEffect(() => {
        const date = new Date();
        const hour = date.getHours();
        if (hour >= 18 || hour <= 6) {
            setIsDay(false);
        } else {
            setIsDay(true);
        }
    }, []);

    //get weather data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    "https://api.openweathermap.org/data/2.5/weather?lat=10.762622&lon=106.660172&appid=26802e96d8e7dee3afae7cdcfad89a98"
                );
                const data = await res.json();
                console.log(data);
                setStat({
                    temp: data.main.temp - 272.15,
                    humid: data.main.humidity,
                    wind: data.wind.speed,
                    city: data.name,
                    weather: data.weather[0].main,
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex items-center justify-center">
            <div
                className={`w-[390px] h-[844px] p-4 ${
                    isDay ? "bg-day" : "bg-night"
                } bg-center bg-cover flex flex-col items-center justify-between text-white`}
            >
                <div className="w-full flex items-center justify-between">
                    <div className="flex flex-col justify-center">
                        <div className="relative">
                            <p className="text-[82px]">{stat.temp.toFixed()}</p>
                            <span className="absolute top-[25px] right-0">
                                °C
                            </span>
                        </div>
                        <p>{stat.city}</p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img
                            src={isDay ? sunny : moon}
                            alt=""
                            className="w-[82px] h-[82px]"
                        />
                        <span className="text-center">{stat.weather}</span>
                    </div>
                </div>
                <div>
                    <h1 className="text-[32px]">
                        {isDay ? "GOOD MORNING!" : "GOOD NIGHT!"}
                    </h1>
                </div>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="w-4 mx-2" src={humidity} alt="" />
                        <span>{stat.humid}%</span>
                    </div>
                    <div className="flex items-center">
                        <img className="w-4 mx-2" src={temperature} alt="" />
                        <span>{stat.temp.toFixed()}°C</span>
                    </div>
                    <div className="flex items-center">
                        <img className="w-4 mx-2" src={wind} alt="" />
                        <span>{stat.wind} m/s</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
