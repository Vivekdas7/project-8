import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Car,
  Mail,
  Phone,
  ArrowLeft,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { properties } from '../data/properties';

const PropertyDetail = () => {
  const { id } = useParams();
  const property = properties.find(p => p.id === parseInt(id || '0'));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 pt-20 flex items-center justify-center">
        <div className="text-center bg-white/80 rounded-2xl p-8 sm:p-12 shadow-xl mx-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Property Not Found</h2>
          <Link to="/properties" className="inline-block bg-blue-600 text-white rounded px-6 py-2 mt-2 hover:bg-blue-700">Back to Properties</Link>
        </div>
      </div>
    );
  }

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-3">
        <Link to="/properties" className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-semibold transition-all text-sm sm:text-base">
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Properties</span>
        </Link>
      </div>

      {/* GALLERY */}
      <div className="relative h-[250px] xs:h-[300px] sm:h-[360px] md:h-[480px] lg:h-[520px] bg-gradient-to-tr from-gray-900/95 via-gray-800/90 to-blue-900/70 rounded-3xl mx-auto max-w-full md:max-w-4xl lg:max-w-6xl shadow-2xl overflow-hidden group mb-3 md:mb-6">
        <img
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          style={{ filter: "brightness(0.90)" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent via-40% to-black/0"></div>
        {/* Image count indicator */}
        <div className="absolute bottom-4 right-4 bg-gradient-to-r from-white/30 to-blue-100/50 shadow-xl px-3 py-1 rounded-full font-semibold text-xs sm:text-sm text-gray-800">
          {currentImageIndex + 1}/{property.images.length}
        </div>
        {/* Gallery Controls */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 xs:left-4 top-1/2 -translate-y-1/2 bg-white/60 text-gray-800 hover:bg-blue-600/90 hover:text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 xs:right-4 top-1/2 -translate-y-1/2 bg-white/60 text-gray-800 hover:bg-blue-600/90 hover:text-white p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
        {/* Status Tag */}
        <div className="absolute top-3 sm:top-6 left-3 sm:left-6">
          <span className="bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 text-white px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-lg backdrop-blur">
            {property.status}
          </span>
        </div>
        {/* Action Icons */}
        <div className="absolute top-3 sm:top-6 right-3 sm:right-6 flex space-x-2 sm:space-x-3">
          <button
            className={`backdrop-blur-lg bg-white/60 border border-blue-100 p-2 rounded-full shadow hover:scale-110 transition ${liked ? 'text-red-600 shadow-lg' : 'text-gray-700'}`}
            onClick={() => setLiked(x => !x)}
            aria-label={liked ? "Unlike" : "Like"}
          >
            <Heart className={`h-5 w-5 sm:h-6 sm:w-6 transition-all duration-150 ${liked ? 'fill-red-500 scale-125' : 'fill-none'}`} />
          </button>
          <button
            className="backdrop-blur-lg bg-white/60 p-2 rounded-full shadow hover:scale-110 transition text-gray-800 hover:text-blue-600"
            onClick={handleShare}
            aria-label="Share"
          >
            <Share2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        {/* Toast for sharing */}
        {shareToast && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 sm:px-6 py-2 rounded-full bg-blue-600 text-white font-medium shadow-xl animate-fade-in-out text-xs sm:text-base">
            Link copied!
          </div>
        )}
        {/* Gallery Thumbnails */}
        {property.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
            {property.images.map((img, idx) => (
              <button key={idx} onClick={() => setCurrentImageIndex(idx)}
                className={`rounded-full ring-2 
                  ${currentImageIndex === idx ? 'ring-blue-500 scale-110' : 'ring-white/60 opacity-70'} 
                  overflow-hidden shadow-md hover:scale-105 duration-200 transition-all`}>
                <img src={img} alt={`thumb-${idx}`} className="w-7 h-7 sm:w-10 sm:h-10 object-cover rounded-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-10">
          {/* MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-6 sm:space-y-10">
            {/* Property Header */}
            <div className="bg-gradient-to-br from-white/95 via-white/80 to-blue-50/80 rounded-2xl shadow-2xl p-4 sm:p-8 border border-blue-100/30 animate-fade-in">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-500 bg-clip-text text-transparent break-words break-all">
                  {property.title}
                </h1>
                <span className="inline-block text-2xl sm:text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-blue-600 to-blue-400 shadow px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl text-white mt-2 md:mt-0">
                  ${property.status === 'For Rent'
                    ? property.price.toLocaleString() + '/mo'
                    : property.price.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center text-gray-600 mb-5 sm:mb-8 text-sm sm:text-base">
                <MapPin className="h-5 w-5 mr-1.5 text-blue-500" />
                <span>{property.location}</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
                <DetailCard Icon={Bed} label="Bedrooms" value={property.bedrooms} />
                <DetailCard Icon={Bath} label="Bathrooms" value={property.bathrooms} />
                <DetailCard Icon={Square} label="Sq Ft" value={property.sqft} />
                <DetailCard Icon={Car} label="Garage" value={property.garage} />
              </div>
            </div>

            {/* Description */}
            <Section title="Description">
              <p className="text-gray-700 leading-relaxed text-base sm:text-lg">{property.description}</p>
            </Section>

            {/* Property Details */}
            <Section title="Property Details">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <DetailsTable
                  title="Property Information"
                  details={[
                    { name: 'Type', value: property.type },
                    { name: 'Year Built', value: property.yearBuilt },
                    { name: 'Lot Size', value: property.lotSize },
                    { name: 'Status', value: property.status },
                  ]}
                />
                <DetailsTable
                  title="Interior Features"
                  details={[
                    { name: 'Bedrooms', value: property.bedrooms },
                    { name: 'Bathrooms', value: property.bathrooms },
                    { name: 'Square Feet', value: property.sqft },
                    { name: 'Garage Spaces', value: property.garage },
                  ]}
                />
              </div>
            </Section>

            {/* Amenities */}
            <Section title="Amenities">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {property.amenities.map((amenity, i) => (
                  <span key={i} className="inline-flex items-center px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-blue-50 via-white to-blue-100/80 text-blue-700 font-semibold shadow text-xs border border-blue-200/40 mt-1">
                    <span className="inline-block w-2 h-2 mr-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600"></span>
                    {amenity}
                  </span>
                ))}
              </div>
            </Section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-1 mt-6 lg:mt-0">
            <div className="backdrop-blur-2xl bg-gradient-to-br from-white/70 via-blue-50/70 to-blue-100/40 border border-blue-200/30 shadow-2xl rounded-3xl p-4 xs:p-6 sm:p-8 sticky top-24 z-20 animate-fade-in delay-150 duration-300">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-5 sm:mb-7">Contact Agent</h3>
              <div className="flex items-center space-x-3 sm:space-x-5 mb-5 sm:mb-7">
                <div className="aspect-square w-14 sm:w-20 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-full flex items-center justify-center shadow-2xl text-white text-xl sm:text-2xl font-bold border-2 sm:border-4 border-white">
                  {property.agent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-base sm:text-lg text-gray-900">{property.agent.name}</div>
                  <div className="text-gray-600 text-xs sm:text-sm">Real Estate Agent</div>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3 mb-5 sm:mb-8">
                <ContactLink Icon={Phone} target={`tel:${property.agent.phone}`} text={property.agent.phone} />
                <ContactLink Icon={Mail} target={`mailto:${property.agent.email}`} text={property.agent.email} />
              </div>
              <button
                onClick={() => setShowContactForm(x => !x)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl py-2 sm:py-3 mb-2 mt-2 font-semibold hover:scale-105 hover:shadow-lg hover:brightness-110 transition-all duration-200 shadow text-sm sm:text-base"
              >
                Request Information
              </button>
              <button className="w-full bg-white/80 border border-blue-100 text-blue-700 rounded-xl py-2 sm:py-3 font-semibold hover:bg-blue-100/70 hover:scale-105 shadow transition-all text-sm sm:text-base">
                Schedule Tour
              </button>
              {/* Reveal Contact Form */}
              {showContactForm && (
                <div className="animate-fade-in mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-blue-100/40">
                  <ContactForm />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Section Card
const Section = ({ children, title }) => (
  <div className="bg-white/95 rounded-2xl shadow-lg p-4 sm:p-8 border border-blue-100/30 animate-fade-in">
    <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-3 sm:mb-4">{title}</h2>
    {children}
  </div>
);

// Detail Card
const DetailCard = ({ Icon, label, value }) => (
  <div className="bg-gradient-to-br from-blue-50 via-white to-blue-100/90 p-4 sm:p-6 rounded-2xl shadow flex flex-col items-center gap-1 hover:scale-105 transition-all duration-300 border border-blue-100/40">
    <div className="bg-gradient-to-br from-blue-500/90 to-blue-400/60 p-2 sm:p-3 rounded-full shadow-lg mb-1 sm:mb-2">
      <Icon className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
    </div>
    <span className="text-xl sm:text-2xl font-extrabold text-gray-800">{value}</span>
    <span className="text-[10px] sm:text-xs tracking-wide text-blue-600 mt-1 bg-blue-50 py-0.5 px-2 sm:py-1 sm:px-3 rounded-full">{label}</span>
  </div>
);

// Details Table
const DetailsTable = ({ title, details }) => (
  <div>
    <div className="font-semibold text-gray-900 mb-1 sm:mb-2">{title}</div>
    <div className="space-y-1 sm:space-y-2">
      {details.map((d, i) => (
        <div className="flex justify-between text-gray-700 text-xs sm:text-base" key={i}>
          <span>{d.name}:</span>
          <span className="font-medium">{d.value}</span>
        </div>
      ))}
    </div>
  </div>
);

// Contact Link Row
const ContactLink = ({ Icon, target, text }) => (
  <a
    href={target}
    className="flex items-center space-x-2 text-gray-900 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
  >
    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    <span>{text}</span>
  </a>
);

// Contact Form
const ContactForm = () => (
  <form className="space-y-3 sm:space-y-4 animate-fade-in">
    <input
      type="text"
      placeholder="Your Name"
      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-200 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow placeholder-blue-400 text-sm sm:text-base"
      required
    />
    <input
      type="email"
      placeholder="Your Email"
      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-200 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow placeholder-blue-400 text-sm sm:text-base"
      required
    />
    <input
      type="tel"
      placeholder="Your Phone"
      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-200 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow placeholder-blue-400 text-sm sm:text-base"
    />
    <textarea
      placeholder="Your Message"
      rows={3}
      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-blue-200 rounded-xl bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow placeholder-blue-400 text-sm sm:text-base"
      required
    ></textarea>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-2 sm:py-3 rounded-lg font-semibold hover:scale-105 transition-all shadow text-sm sm:text-base"
    >
      Send Message
    </button>
  </form>
);

export default PropertyDetail;
