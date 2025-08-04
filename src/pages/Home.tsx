import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Bed,
  Bath,
  Square,
  ArrowRight,
  Users,
  Star,
  Mail,
  Phone,
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { properties, Property } from '../data/properties';

const Home = () => {
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState("Buy");
  const [type, setType] = useState("All Types");
  const [searchResults, setSearchResults] = useState<Property[] | null>(null);

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
  };

  const featuredProperties = searchResults === null
    ? properties.filter(p => p.featured).slice(0, 6)
    : searchResults;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#1e293b] via-[#2e3b5e] to-[#374151] relative">
      {/* Hero Section */}
      <section className="relative h-[65vh] sm:h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8">
  {/* Background Video and Overlay */}
  <div className="absolute inset-0 z-0">
    <video
      autoPlay
      loop
      muted
      playsInline
      className="w-full h-full object-cover opacity-60 sm:opacity-80"
    >
      <source src="/mobile.mp4" type="video/mp4" />
    </video>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-indigo-900/70 to-blue-800/80" />
  </div>

  {/* Foreground Content */}
  <div className="relative z-10 max-w-3xl w-full text-center glass-card py-6 px-4 sm:py-10 sm:px-6 rounded-3xl border border-white/20 backdrop-blur-lg shadow-2xl flex flex-col items-center">
    <h1 className="font-extrabold text-white text-2xl sm:text-4xl md:text-5xl leading-tight mb-4 drop-shadow-lg">
      Find Your <span className="text-yellow-400 animate-pulse">Dream Home</span>
    </h1>
    <p className="text-white/90 max-w-md sm:max-w-xl text-sm sm:text-base md:text-lg mb-6">
      Discover the perfect property with our expert guidance and personalized service.
    </p>

    {/* Search Form */}
    <form
      onSubmit={handleSearch}
      autoComplete="off"
      className="w-full max-w-xl flex flex-col space-y-3"
    >
      {/* Input */}
      <div className="relative w-full">
        <Search className="absolute top-3 left-4 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Location, property type, or keywords..."
          className="pl-11 pr-4 py-2 text-sm rounded-3xl w-full border border-gray-300 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
          onFocus={() => {
            if (suggestions.length > 0) setShowSuggestions(true);
          }}
        />
        {showSuggestions && (
          <ul className="absolute z-30 top-full left-0 right-0 max-h-52 overflow-y-auto bg-white rounded-b-3xl border border-t-0 border-gray-300 shadow text-gray-900 text-sm">
            {suggestions.map((sugg, idx) => (
              <li
                key={idx}
                className="px-5 py-3 cursor-pointer hover:bg-blue-100"
                onMouseDown={e => e.preventDefault()}
                onClick={() => handleSuggestionClick(sugg)}
              >
                {sugg}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 w-full">
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 text-sm rounded-3xl border border-gray-300 text-gray-900 font-medium focus:ring-2 focus:ring-blue-400"
        >
          <option>Buy</option>
          <option>Rent</option>
        </select>

        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 text-sm rounded-3xl border border-gray-300 text-gray-900 font-medium focus:ring-2 focus:ring-blue-400"
        >
          <option>All Types</option>
          <option>House</option>
          <option>Condo</option>
          <option>Apartment</option>
          <option>Townhouse</option>
          <option>Cabin</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="w-full bg-yellow-400 hover:bg-yellow-500 flex items-center justify-center rounded-3xl px-4 py-2 text-sm font-bold text-blue-900 shadow-lg transition"
      >
        <Search className="h-5 w-5 mr-2" />
        Search
      </button>
    </form>
  </div>
</section>







      {/* Featured / Search Results */}
      
      <section className="py-20 bg-white/10 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl font-extrabold text-white mb-4">
              {searchResults === null ? 'Featured Properties' : 'Search Results'}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {searchResults === null
                ? 'Discover our handpicked selection of premium properties that offer exceptional value and luxury.'
                : 'Browse the properties that match your search.'}
            </p>
          </div>

          {featuredProperties.length === 0 ? (
            <p className="text-center text-gray-400 text-2xl py-20">
              No properties found. Try changing your search criteria.
            </p>
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
                slideShadows: true,
              }}
              breakpoints={{
                640: { slidesPerView: 1.1 },
                1024: { slidesPerView: 2.2 },
                1280: { slidesPerView: 3 },
              }}
              className="w-full pb-12"
              style={{ padding: '12px 0' }}
            >
              {featuredProperties.map((property) => (
                <SwiperSlide key={property.id}>
                  <PropertyCard property={property} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white/20 backdrop-blur-lg rounded-3xl max-w-7xl mx-auto px-8 my-20 shadow-xl glass-card">
        <h2 className="text-5xl font-extrabold text-white text-center mb-8">About Us</h2>
        <p className="text-xl text-gray-200 max-w-4xl mx-auto text-center leading-relaxed">
          At Dream Homes, we believe that finding a home is about more than just buying a property – it’s about discovering a place where your life’s next chapter unfolds. Our expert team is here to guide you every step of the way with personal service, deep market knowledge, and dedication to your satisfaction.
        </p>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white/10 backdrop-blur-md max-w-7xl mx-auto px-6 rounded-3xl shadow-lg glass-card">
        <h2 className="text-5xl font-extrabold text-white text-center mb-12">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TestimonialCard
            name="Emily R."
            feedback="Dream Homes made buying my first house easy and exciting! Their knowledge and attention to detail gave me full confidence throughout."
            rating={5}
          />
          <TestimonialCard
            name="Mark S."
            feedback="I rented a condo through Dream Homes and the process was smooth and transparent. Highly recommend their professional team."
            rating={4}
          />
          <TestimonialCard
            name="Sophia L."
            feedback="Excellent service and support when selling my property. The team’s marketing expertise brought great offers quickly."
            rating={5}
          />
        </div>
      </section>

      {/* Contact Section */}
    
    </div>
  );
};

// PropertyCard Component for featured listings
const PropertyCard = ({ property }: { property: Property }) => (
  <div className="bg-white/20 backdrop-blur-lg rounded-3xl shadow-lg border border-white/20 overflow-hidden transition hover:shadow-2xl">
    <div className="relative overflow-hidden rounded-t-3xl">
      <img
        src={property.images[0]}
        alt={property.title}
        className="w-full h-64 object-cover rounded-t-3xl transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
        {property.status}
      </div>
    </div>
    <div className="p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-semibold text-white line-clamp-1">{property.title}</h3>
        <span className="text-2xl font-bold text-blue-400">
          {property.status === 'For Rent' ? `$${property.price.toLocaleString()}/mo` : `$${property.price.toLocaleString()}`}
        </span>
      </div>
      <div className="flex items-center text-blue-300 mb-4 text-sm">
        <MapPin className="h-4 w-4 mr-1" />
        <span>{property.location}</span>
      </div>
      <p className="text-blue-200 mb-6 line-clamp-3">{property.description}</p>
      <Link
        to={`/property/${property.id}`}
        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition"
      >
        View Details
      </Link>
    </div>
  </div>
);

// Testimonial Card
const TestimonialCard = ({ name, feedback, rating }: { name: string; feedback: string; rating: number }) => (
  <div className="glass-card p-6 rounded-3xl bg-white/20 backdrop-blur-lg border border-white/30 shadow-xl text-blue-900 flex flex-col justify-between">
    <p className="mb-6 text-lg italic">"{feedback}"</p>
    <div className="flex items-center justify-between">
      <span className="font-bold text-xl">{name}</span>
      <Stars rating={rating} />
    </div>
  </div>
);

// Stars Component
const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1 text-yellow-400">
      {Array(5).fill(0).map((_, i) => (
        <StarIcon key={i} filled={i < rating} />
      ))}
    </div>
  );
};

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-5 w-5 ${filled ? 'fill-current' : 'fill-none stroke-current'}`}
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.03 6.27a1 1 0 00.95.69h6.626c.967 0 1.371 1.24.588 1.81l-5.37 3.895a1 1 0 00-.363 1.118l2.03 6.271c.3.92-.755 1.688-1.538 1.118l-5.371-3.895a1 1 0 00-1.175 0l-5.37 3.895c-.783.57-1.838-.197-1.538-1.118l2.03-6.27a1 1 0 00-.363-1.118L2.445 11.7c-.783-.57-.38-1.81.588-1.81h6.626a1 1 0 00.95-.69l2.03-6.273z" />
  </svg>
);

// Contact Form
const ContactForm = () => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic here (e.g., API call)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center text-green-400 text-xl font-semibold py-8">
        Thank you for reaching out! We'll get back to you shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your Name"
        required
        className="w-full px-5 py-3 rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Your Email"
        required
        className="w-full px-5 py-3 rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Your Message"
        rows={5}
        required
        className="w-full px-5 py-3 rounded-3xl border border-white/40 bg-white/20 backdrop-blur-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 rounded-3xl py-4 font-semibold text-blue-900 shadow-lg transition-transform active:scale-95"
      >
        Send Message
      </button>
    </form>
  );
};

export default Home;
