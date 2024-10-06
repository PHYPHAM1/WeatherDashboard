import dotenv from 'dotenv';
// import { stat } from 'fs';
// import { response } from 'express';
// import fs from 'node:fs/promises';

dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates{
  lat: number;
  lon: number;
  name: string;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: Date;
  icon: string;
  description: string;
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(city: string, date: Date, icon: string, description: string, temperature: number, humidity: number, windSpeed: number) {
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.description = description;
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }

}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private apiKey: string;
  private baseUrl: string;
  private cityName = '';

  constructor(){
    this.apiKey = process.env.API_KEY || '';
    this.baseUrl = process.env.API_BASE_URL || '';
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
private async fetchLocationData(query: string){
try {
  if(this.apiKey.length === 0 || this.baseUrl.length === 0){
    throw new Error('missing api key or base url');
  }
  const response: Coordinates[] = await fetch(query).then((res) => res.json())
  console.log('fetchLocationData', response)
  return response[0];     //when u make a call to api, u get info back, turns it into json, [0] data is living in the 1st item on this specific json
} catch (error) {
  console.log(error);
  throw error;
}
}

  // TODO: Create destructureLocationData method
  //this is the response we get back, now we want the specific data, hence const{name, lat, lon} = locationData;
private destructureLocationData(locationData: Coordinates | undefined): Coordinates | undefined {
  if(!locationData){
    throw new Error('missing coordinates');
  }
  const{name, lat, lon} = locationData;
  const coordinates: Coordinates = {lat, lon, name};    //destructureLocationData this function tell us it has to return a TypeOf Coordinates
  return coordinates;
}

  // TODO: Create buildGeocodeQuery method
private buildGeocodeQuery(): string {
  const apiUrl = `${this.baseUrl}/geo/1.0/direct?q=${this.cityName}&appid=${this.apiKey}`
  return apiUrl;
}

  // TODO: Create buildWeatherQuery method
private buildWeatherQuery(coordinates: Coordinates): string {
  const aipUrl = `${this.baseUrl}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`
  return aipUrl;
}
  // TODO: Create fetchAndDestructureLocationData method            //this will get our coordinates
private async fetchAndDestructureLocationData() {
  const coordinates = await this.fetchLocationData(this.buildGeocodeQuery())
  return this.destructureLocationData(coordinates)
}    //1. fetchAndDestructureLocationData - this one gets called-   wait for 
     //2. fetchLocationData - fetch the data-  to be done   and wait for 
     //3. buildGeocodeQuery- this function gets the apiURL-  to be done  
     //4.then goes to fetchLocationData this one fetch us a query, turns it into json, return info back.  
     //5. then it can go to (data) in the .then((data)
     //6. then it goes to destructureLocationData() - 


  // TODO: Create fetchWeatherData method
private async fetchWeatherData(coordinates: Coordinates) {        //call the buildweatherQuery, and on the buildweatherQuery do the same as the buildGeoCode, but use the url they gave u in the challenge
  const url = this.buildWeatherQuery(coordinates)
  const weatherResponse = await fetch(url).then((res) => res.json())
  const weatherData: Weather = this.parseCurrentWeather(weatherResponse.list[0])
  const forecastData: Weather[] = this.buildForecastArray(weatherData as any)
  return  forecastData;
  
}

  // TODO: Build parseCurrentWeather method
private parseCurrentWeather(response: any): Weather {
  const currentWeather = new Weather(
    this.cityName, response.data, response.icon, response.description, response.temperature, response.humidity, response.windSpeed
  );
  return currentWeather;
}

  // TODO: Complete buildForecastArray method
private buildForecastArray(weatherList: any[]): Weather[] {
  const forecastArray: Weather[] = weatherList.map((data) => {
    return new Weather(
      this.cityName,
      new Date(data.dt * 1000),
      data.weather[0].icon,
      data.weather[0].description,
      data.main.temp,
      data.main.humidity,
      data.wind.speed
    );
  });
  return forecastArray;
}


  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
async getWeatherForCity(city: string) {
  //trying different way
  this.cityName = city;
  const coordinates = await this.fetchAndDestructureLocationData();
  const weatherData = await this.fetchWeatherData(coordinates as Coordinates);
  const currentWeather = weatherData[0];
  const forecast = this.buildForecastArray(weatherData as any);
  return {currentWeather, forecast};

    // try {
    //   const url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`        // based url https://api.openweathermap.org
    //   );
    //   await url.json();      //??????
    //   this.cityName = city;           //setting city to whatever user's put in
    //   const coordinates = await this.fetchAndDestructureLocationData();       //then call this function..fetchAndDestructureLocationData
      
    //   if(!coordinates){
    //     throw new Error('missing coordinates');
    //   }
    //   const weatherData = await this.fetchWeatherData(coordinates);
    //   return weatherData;
      

    // } catch (error) {
    //   console.log('Error:', error);
    //   return undefined; // Ensure a value is returned in case of error
    // } 
    
  }
  
}

export default new WeatherService();
