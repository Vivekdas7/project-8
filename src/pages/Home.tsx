import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Star,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';
import { properties, Property } from '../data/properties';

const Home = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("Buy");
  const [type, setType] = useState("All Types");
  const [searchResults, setSearchResults] = useState<Property[] | null>(null);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Generate unique suggestion strings (title, location, type)
  const allSuggestionOptions = React.useMemo(() => {
    const opts = new Set<string>();
    properties.forEach(p => {
      opts.add(p.title);
      opts.add(p.location);
      opts.add(p.type);
    });
    return Array.from(opts);
  }, []);

  // Update suggestions when query changes and has >= 3 chars
  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length >= 3) {
      const filteredSuggestions = allSuggestionOptions.filter(opt =>
        opt.toLowerCase().includes(q)
      ).slice(0, 5); // Limit to 5 suggestions max
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [query, allSuggestionOptions]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const modeToStatus = {
      'Buy': 'For Sale',
      'Rent': 'For Rent',
    };

    const normalizedMode = mode.trim();
    const statusToMatch = modeToStatus[normalizedMode];

    const filtered = properties.filter(property => {
      if (!statusToMatch) return true;

      if ((property.status || '').toLowerCase() !== statusToMatch.toLowerCase()) return false;

      if (type !== "All Types" && property.type !== type) return false;

      if (query.trim()) {
        const q = query.toLowerCase();
        const found =
          (property.title || '').toLowerCase().includes(q) ||
          (property.location || '').toLowerCase().includes(q) ||
          (property.description || '').toLowerCase().includes(q) ||
          (property.type || '').toLowerCase().includes(q);

        if (!found) return false;
      }
      return true;
    });

    setSearchResults(filtered);
    setShowSuggestions(false);
  };

  const featuredProperties = searchResults === null
    ? properties.filter(p => p.featured).slice(0, 6)
    : searchResults;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[84vh] flex items-center justify-center bg-gradient-to-r from-blue-900 to-blue-700 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-blue-950 bg-opacity-60"></div>
        </div>
        {/* Glassmorphism Card */}
        <div className="relative z-10 w-full max-w-3xl mx-auto px-2">
          <div className="backdrop-blur-md bg-white/15 py-10 px-6 rounded-3xl shadow-xl border border-white/15 mb-8">
            <h1 className="text-4xl sm:text-6xl font-bold text-white mb-5 leading-tight">
              Find Your
              <span className="block text-yellow-400 drop-shadow-xl">Dream Home</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-3">
              Discover the perfect property with our expert guidance and personalized service.
            </p>
          </div>
          {/* Floating Search Card */}
          <form
            className="backdrop-blur-lg bg-white/95 border border-blue-100 rounded-xl py-4 px-4 md:px-6 shadow-2xl flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-stretch relative"
            onSubmit={handleSearch}
            autoComplete="off"
          >
            <div className="relative flex-1" ref={inputRef}>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Location, property type, or keywords..."
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none text-gray-900 font-medium transition-shadow bg-white"
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              />
              {showSuggestions && (
                <ul className="absolute z-20 top-full left-0 right-0 bg-white border border-gray-300 rounded-b-md max-h-60 overflow-auto shadow-lg text-gray-900 text-sm">
                  {suggestions.map((sugg, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onMouseDown={e => e.preventDefault()} // Prevent input blur
                      onClick={() => handleSuggestionClick(sugg)}
                    >
                      {sugg}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <select
              value={mode}
              onChange={e => setMode(e.target.value)}
              className="px-3 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium outline-none transition-shadow bg-white"
            >
              <option>Buy</option>
              <option>Rent</option>
            </select>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-3 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 text-gray-900 font-medium outline-none transition-shadow bg-white"
            >
              <option>All Types</option>
              <option>House</option>
              <option>Condo</option>
              <option>Apartment</option>
              <option>Townhouse</option>
              <option>Cabin</option>
            </select>
            <button
              type="submit"
              className="flex items-center space-x-2 bg-blue-600 px-8 py-3 rounded-md text-white font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 transition group"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Rest sections same as before: stats, properties list, etc. */}
      {/* FEATURED / SEARCH RESULTS - abbreviated here for clarity */}

      {/* Featured / Search Results */}
      <section className="py-20 bg-white min-h-[40vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {searchResults === null ? 'Featured Properties' : 'Search Results'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {searchResults === null
                ? 'Discover our handpicked selection of premium properties that offer exceptional value and luxury.'
                : 'Browse the properties that match your search.'}
            </p>
          </div>
          {featuredProperties.length === 0 ? (
            <div className="text-center text-gray-500 text-2xl py-16">
              No properties found. Try changing your search criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl overflow-hidden transition-all duration-200 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow">
                        {property.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
                      <span className="text-2xl font-bold text-blue-600">
                        ${property.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{property.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600 mb-6 text-sm">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms} bed</span>
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" />
                        <span>{property.bathrooms} bath</span>
                      </div>
                      <div className="flex items-center">
                        <Square className="h-4 w-4 mr-1" />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>
                    <Link
                      to={`/property/${property.id}`}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 group font-medium"
                    >
                      <span>View Details</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
          {searchResults !== null && (
            <div className="text-center mt-12">
              <button
                onClick={() => setSearchResults(null)}
                className="text-blue-600 underline text-lg hover:text-blue-800 transition-colors"
              >
                Back to Featured Properties
              </button>
            </div>
          )}
          {searchResults === null && (
            <div className="text-center mt-12">
              <Link
                to="/properties"
                className="inline-flex items-center space-x-2 bg-gray-900 text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-colors text-lg font-medium shadow"
              >
                <span>View All Properties</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Rest of your Why Choose Us, CTA sections remain unchanged */}

    </div>
  );
};

export default Home;
