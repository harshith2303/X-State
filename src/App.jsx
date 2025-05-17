import { useEffect, useState } from "react";

const countryEndpoint = "https://crio-location-selector.onrender.com/countries";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  useEffect(() => {
    fetch(countryEndpoint)
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((err) => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const stateEndpoint = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
      fetch(stateEndpoint)
        .then((res) => res.json())
        .then((data) => setStates(data))
        .catch((err) => console.error("Error fetching states:", err));
      setSelectedState(""); // when country chages then state will reset
      setCities([]); // clear cities
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      const citiesEndpoint = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;
      fetch(citiesEndpoint)
        .then((res) => res.json())
        .then((data) => setCities(data))
        .catch((err) => console.error("Error fetching cities:", err));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  return (
    <div>
      <select
        name="country"
        id="country"
        onChange={(e) => setSelectedCountry(e.target.value)}
        value={selectedCountry}
      >
        <option value="">Select Country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <select
        name="state"
        id="state"
        onChange={(e) => setSelectedState(e.target.value)}
        value={selectedState}
        disabled={!states.length}
      >
        <option value="">Select State</option>
        {states.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <select
        name="cities"
        id="cities"
        onChange={(e) => setSelectedCity(e.target.value)}
        disabled={!cities.length}
      >
        <option value="">Select City</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      {selectedCity && selectedState && selectedCountry && (
        <h3>
          You selected <h2>{selectedCity},</h2> <h4 style={{color:"grey"}}>{selectedState}, {selectedCountry}</h4>
        </h3>
      )}
    </div>
  );
}
