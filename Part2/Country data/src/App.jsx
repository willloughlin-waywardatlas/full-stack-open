import { useState, useEffect} from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY
function App() {
  const [query, setQuery] = useState('')
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountryData(response.data)
      })
      .catch(error => {
        alert("error Retrieving data from https://studies.cs.helsinki.fi/restcountries/api/all")
      })
  },[])

  const filter = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <SearchField onChange={filter}/>
      <RetrievedData countryData={countryData} filter={query} updateFilter={filter}/>
    </div>
    
  )
}

const CountryDetails = ({country}) => {
  const [weather, setWeather] = useState(null)
  useEffect(() => {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]}&appid=${api_key}&units=metric`
    axios
      .get(weatherUrl)
      .then(response => {
        setWeather(response.data)
      })
      .catch(error => {
        alert("error Retrieving data from https://api.openweathermap.org")
      })
  },[])
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
            <li key={language}>{language}</li>
          ))}
      </ul>
      <img width="150" src={country.flags.svg} alt={country.flags.alt}/>
      <h2>Weather in {country.capital[0]}</h2>
      { weather ? (
          <div>
            <p>Temperature {weather.main.temp}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0]}.description`}/>
            <p>Wind {weather.wind.speed} m/s</p>
          </div>
        )
        :(<p>loading weather...</p>)

      }
    </div>
  )
}

const SearchField = ({onChange}) => {
  return(
    <div>Find country <input type="text" onChange={onChange}/></div>
  )
}

const RetrievedData = ({countryData, filter, updateFilter}) => {
  if( !filter.length ) return null
  if( !countryData.length ) return <p>Retrieving data...</p>
  const lowerCaseFilter = filter.toLowerCase()
  const results = countryData.filter(country => country.name.common.toLowerCase().includes(lowerCaseFilter))
  switch(true) {
    case results.length === 0:
      return <p>No matches found</p>
    case results.length === 1:
      return <CountryDetails country={results[0]}/>
    case results.length <= 10:
      return results.map(country => 
        <div key={country.name.common}>
          {country.name.common} <button onClick={updateFilter} value={country.name.common}>Show</button>
        </div>
      )
    case results.length > 10:
      return <p>Too many matches, please specify</p>
  }
}

export default App