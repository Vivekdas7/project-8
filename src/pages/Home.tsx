import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  X,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { properties, Property } from '../data/properties';
import Enquire from './Enquire'; // Adjust path if needed

const Modal: React.FC<{ show: boolean; onClose: () => void; children: React.ReactNode }> = ({ show, onClose, children }) => {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (show) window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [show, onClose]);

  if (!show) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
    >
      <div onClick={e => e.stopPropagation()} className="glass-card relative max-w-md w-full p-8 rounded-3xl border border-white/20 shadow-2xl">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition"
        >
          <X className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

const Home = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("Buy");
  const [type, setType] = useState("All Types");
  const [searchResults, setSearchResults] = useState<Property[] | null>(null);

  // Automatically show enquiry modal on page load
  const [showEnquire, setShowEnquire] = useState(true);

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const allSuggestionOptions = React.useMemo(() => {
    const opts = new Set<string>();
    properties.forEach(p => {
      opts.add(p.title);
      opts.add(p.location);
      opts.add(p.type);
    });
    return Array.from(opts);
  }, []);

  useEffect(() => {
    const q = query.trim().toLowerCase();
    if (q.length >= 3) {
      const filteredSuggestions = allSuggestionOptions.filter(opt =>
        opt.toLowerCase().includes(q)
      ).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setShowSuggestions(filteredSuggestions.length > 0);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
    }
  }, [query, allSuggestionOptions]);

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
    setShowEnquire(false); // Hide modal on new search for better UX
  };

  const featuredProperties = searchResults === null
    ? properties.filter(p => p.featured).slice(0, 6)
    : searchResults;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e293b] via-[#2e3b5e] to-[#374151] relative">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src="/mobile.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-indigo-800/70 to-blue-700/70" />
        </div>
        <div className="relative z-10 w-full max-w-3xl mx-auto px-2">
          <div className="glass-card py-12 px-8 mb-8 border border-white/20 flex flex-col items-center shadow-2xl">
            <h1 className="text-5xl sm:text-7xl font-extrabold text-white mb-5 leading-tight tracking-tight drop-shadow-2xl">
              Find Your <span className="block text-yellow-400 animate-pulse">Dream Home</span>
            </h1>
            <p className="text-2xl text-white/90 mb-3 font-medium text-center drop-shadow">
              Discover the perfect property with <span className="font-bold text-blue-200">expert guidance</span> and <span className="font-bold text-blue-200">personalized service</span>.
            </p>
          </div>
          <form
            className="glass-card py-6 px-6 md:px-8 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-stretch relative border border-white/20 shadow-2xl backdrop-blur-2xl"
            onSubmit={handleSearch}
            autoComplete="off"
          >
            <div className="relative flex-1" ref={inputRef}>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Location, property type, or keywords..."
                className="w-full px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-blue-400 outline-none text-gray-900 font-medium transition-shadow bg-white/80 shadow-inner"
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              />
              {showSuggestions && (
                <ul className="absolute z-20 top-full left-0 right-0 bg-white/95 rounded-b-xl max-h-60 overflow-auto shadow-lg text-gray-900 text-sm">
                  {suggestions.map((sugg, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                      onMouseDown={e => e.preventDefault()}
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
              className="px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-bold outline-none transition-shadow bg-white/80 shadow-inner"
            >
              <option>Buy</option>
              <option>Rent</option>
            </select>
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="px-4 py-3 rounded-full border-none focus:ring-2 focus:ring-blue-400 text-gray-900 font-bold outline-none transition-shadow bg-white/80 shadow-inner"
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
              className="flex items-center space-x-2 rounded-full bg-blue-700 px-8 py-3 font-semibold shadow-lg text-white transition hover:bg-yellow-400 hover:text-blue-900 active:scale-95 duration-150 focus:ring-2 focus:ring-blue-400"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </form>
        </div>
      </section>

      {/* Featured/Search Results Section */}
      <section className="py-24 min-h-[40vh] bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="glass-card py-10 px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-gray-900 mb-5 tracking-tight">
                {searchResults === null ? 'Featured Properties' : 'Search Results'}
              </h2>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                {searchResults === null
                  ? 'Discover our handpicked selection of premium properties that offer exceptional value and luxury.'
                  : 'Browse the properties that match your search.'}
              </p>
            </div>
            {featuredProperties.length === 0 ? (
              <div className="text-center text-gray-500 text-2xl py-16 rounded-3xl bg-white/60 shadow-inner">
                No properties found. Try changing your search criteria.
              </div>
            ) : (
              <Swiper
                modules={[Navigation, Pagination, EffectCoverflow]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                effect="coverflow"
                coverflowEffect={{
                  rotate: 30,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true
                }}
                breakpoints={{
                  640: { slidesPerView: 1.1 },
                  1024: { slidesPerView: 2.2 },
                  1280: { slidesPerView: 3 }
                }}
                className="w-full pb-12"
                style={{ padding: "12px 0" }}
              >
                {featuredProperties.map((property) => (
                  <SwiperSlide key={property.id}>
                    <div className="glass-card overflow-hidden border border-white/15 transition-transform duration-200 group relative max-w-lg mx-auto h-full shadow-2xl">
                      <div className="relative">
                        <img
                          src={property.images[0]}
                          alt={property.title}
                          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-4 py-1 rounded-full text-sm font-medium shadow">
                            {property.status}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 line-clamp-1">{property.title}</h3>
                          <span className="text-2xl font-bold text-blue-700">
                            ${property.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center text-blue-700 mb-3">
                          <MapPin className="h-5 w-5 mr-1" />
                          <span className="text-md">{property.location}</span>
                        </div>
                        <div className="flex items-center justify-between text-gray-700 mb-6 text-base">
                          <div className="flex items-center gap-1">
                            <Bed className="h-5 w-5 mr-1" />
                            <span>{property.bedrooms} bed</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Bath className="h-5 w-5 mr-1" />
                            <span>{property.bathrooms} bath</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Square className="h-5 w-5 mr-1" />
                            <span>{property.sqft} sqft</span>
                          </div>
                        </div>
                        <Link
                          to={`/property/${property.id}`}
                          className="w-full rounded-full bg-blue-700 text-white py-3 px-4 mt-3 flex items-center justify-center gap-2 font-semibold shadow hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-200 active:scale-95"
                        >
                          <span>View Details</span>
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            {searchResults !== null && (
              <div className="text-center mt-12">
                <button
                  onClick={() => {
                    setSearchResults(null);
                    setShowEnquire(false);
                  }}
                  className="rounded-full bg-gradient-to-r from-blue-700 to-blue-500 text-white px-8 py-4 text-lg font-bold shadow hover:bg-yellow-400 hover:text-blue-900 transition-colors duration-150"
                >
                  Back to Featured Properties
                </button>
              </div>
            )}
            {searchResults === null && (
              <div className="text-center mt-12">
                <Link
                  to="/properties"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 text-white px-8 py-4 text-lg font-semibold shadow hover:bg-gray-800 active:scale-95 transition"
                >
                  <span>View All Properties</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enquire Popup Modal */}
   
    </div>
  );
};

export default Home;
