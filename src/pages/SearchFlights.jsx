import { useEffect, useState } from "react";
import { getCities } from "../api/cityApi";

const PRICE_MIN = 500;
const PRICE_MAX = 20000;
const PRICE_STEP = 500;

export default function SearchFlights({ onSearch }) {
  const [cities, setCities] = useState([]);
  const today = new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({
    fromCityId: "",
    toCityId: "",
    date: "",
    passengers: 1,
    minPrice: 3000,
    maxPrice: 12000,
  });

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    const res = await getCities();
    setCities(res.data.data);
  };

  // 🔍 SEARCH
  const handleSearch = () => {
    const payload = {};

    if (filters.fromCityId) payload.fromCityId = Number(filters.fromCityId);
    if (filters.toCityId) payload.toCityId = Number(filters.toCityId);
    if (filters.date) payload.date = filters.date;
    if (filters.passengers) payload.minSeats = filters.passengers;

    payload.minPrice = filters.minPrice;
    payload.maxPrice = filters.maxPrice;

    onSearch(payload);
  };

  // 🔄 CLEAR
  const clearFilters = () => {
    const reset = {
      fromCityId: "",
      toCityId: "",
      date: "",
      passengers: 1,
      minPrice: PRICE_MIN,
      maxPrice: PRICE_MAX,
    };
    setFilters(reset);
    onSearch({});
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">

        {/* FROM CITY */}
        <select
          className="border rounded-full px-4 py-3"
          value={filters.fromCityId}
          onChange={(e) =>
            setFilters({ ...filters, fromCityId: e.target.value })
          }
        >
          <option value="">From</option>
          {cities.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* TO CITY */}
        <select
          className="border rounded-full px-4 py-3"
          value={filters.toCityId}
          onChange={(e) =>
            setFilters({ ...filters, toCityId: e.target.value })
          }
        >
          <option value="">To</option>
          {cities.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* DATE */}
        <input
          type="date"
          min={today}
          className="border rounded-full px-4 py-3"
          value={filters.date}
          onChange={(e) =>
            setFilters({ ...filters, date: e.target.value })
          }
        />

        {/* PASSENGERS */}
        <input
          type="number"
          min={1}
          className="border rounded-full px-4 py-3"
          value={filters.passengers}
          onChange={(e) =>
            setFilters({ ...filters, passengers: Number(e.target.value) })
          }
        />

        {/* 💸 PRICE RANGE SLIDER */}
        <div className="sm:col-span-2 lg:col-span-2">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Price: ₹{filters.minPrice} – ₹{filters.maxPrice}
          </p>

          <div className="relative h-10">
            {/* Track */}
            <div className="absolute top-4 h-2 w-full rounded bg-gray-200" />

            {/* Active Range */}
            <div
              className="absolute top-4 h-2 rounded bg-blue-500"
              style={{
                left: `${((filters.minPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                right: `${100 - ((filters.maxPrice - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
              }}
            />

            {/* Min Slider */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={filters.minPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPrice: Math.min(Number(e.target.value), filters.maxPrice - PRICE_STEP),
                })
              }
              className="absolute w-full appearance-none bg-transparent pointer-events-none
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-blue-600"
            />

            {/* Max Slider */}
            <input
              type="range"
              min={PRICE_MIN}
              max={PRICE_MAX}
              step={PRICE_STEP}
              value={filters.maxPrice}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPrice: Math.max(Number(e.target.value), filters.minPrice + PRICE_STEP),
                })
              }
              className="absolute w-full appearance-none bg-transparent pointer-events-none
                [&::-webkit-slider-thumb]:pointer-events-auto
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-blue-600"
            />
          </div>

          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>₹{PRICE_MIN}</span>
            <span>₹{PRICE_MAX}</span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex gap-2 sm:col-span-2 lg:col-span-2">
          <button
            onClick={handleSearch}
            className="flex-1 bg-blue-600 text-white rounded-full py-3 font-semibold hover:bg-blue-700"
          >
            Search
          </button>

          <button
            onClick={clearFilters}
            className="flex-1 bg-gray-200 rounded-full py-3 font-semibold hover:bg-gray-300"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
