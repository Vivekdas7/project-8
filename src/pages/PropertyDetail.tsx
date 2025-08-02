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
  const property = properties.find(p => p.id === Number(id));
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [liked, setLiked] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl p-10 sm:p-16 shadow-2xl max-w-md text-center">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Property Not Found</h2>
          <Link
            to="/properties"
            className="inline-block bg-blue-600 px-8 py-3 rounded-full text-white font-semibold hover:bg-blue-700 transition"
          >
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareToast(true);
    setTimeout(() => setShareToast(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-16 px-4 md:px-8 lg:px-16 xl:px-24">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto mb-6">
        <Link
          to="/properties"
          className="inline-flex items-center space-x-2 text-blue-700 hover:text-blue-900 font-semibold transition text-sm sm:text-base"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Properties</span>
        </Link>
      </div>

      {/* Gallery */}
      <div className="relative max-w-6xl mx-auto rounded-3xl shadow-2xl overflow-hidden group mb-8">
        <img
          src={property.images[currentImageIndex]}
          alt={`${property.title} image ${currentImageIndex + 1}`}
          className="w-full h-[300px] sm:h-[420px] md:h-[520px] lg:h-[600px] object-cover object-center transition-transform duration-500 group-hover:scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent via-40% to-black/30"></div>

        {/* Image Count */}
        <div className="absolute bottom-5 right-5 bg-white/70 backdrop-blur rounded-full px-4 py-1.5 text-sm font-semibold text-gray-700 shadow-md">
          {currentImageIndex + 1} / {property.images.length}
        </div>

        {/* Gallery Controls */}
        {property.images.length > 1 && (
          <>
            <button
              aria-label="Previous Image"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/70 text-gray-800 hover:bg-blue-600 hover:text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <button
              aria-label="Next Image"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/70 text-gray-800 hover:bg-blue-600 hover:text-white p-3 rounded-full shadow-lg transition transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </>
        )}

        {/* Status Tag */}
        <div className="absolute top-5 left-5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-lg backdrop-blur">
          {property.status}
        </div>

        {/* Action Icons */}
        <div className="absolute top-5 right-5 flex space-x-3">
          <button
            onClick={() => setLiked((liked) => !liked)}
            aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
            className={`backdrop-blur bg-white/60 border border-blue-100 p-2 rounded-full shadow-lg hover:scale-110 transition transform ${
              liked ? 'text-red-600 shadow-red-400' : 'text-gray-700'
            }`}
          >
            <Heart
              className={`h-6 w-6 transition-all duration-150 ${
                liked ? 'fill-red-500 scale-125' : 'fill-none'
              }`}
            />
          </button>
          <button
            onClick={handleShare}
            aria-label="Share property link"
            className="backdrop-blur bg-white/60 p-2 rounded-full shadow-lg hover:scale-110 transition transform text-gray-800 hover:text-blue-600"
          >
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        {/* Share Toast */}
        {shareToast && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow-lg animate-fade-in-out text-sm sm:text-base">
            Link copied!
          </div>
        )}

        {/* Thumbnails */}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-3 sm:space-x-4">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 overflow-hidden shadow-md transition transform hover:scale-105 focus:outline-none ${
                  currentImageIndex === idx
                    ? 'ring-blue-500 scale-110'
                    : 'ring-white/70 opacity-70'
                }`}
                aria-label={`View image ${idx + 1}`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover rounded-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content and Sidebar */}
      <div className="max-w-7xl mx-auto lg:flex lg:gap-12">
        {/* Main Content */}
        <main className="flex-1 space-y-10">
          {/* Header */}
          <header className="bg-white rounded-3xl p-6 shadow-lg border border-blue-100 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-900 to-blue-600 bg-clip-text text-transparent break-words">
                {property.title}
              </h1>
              <span className="inline-block text-3xl md:text-4xl font-extrabold text-white bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 shadow-lg px-5 py-2 rounded-3xl select-none whitespace-nowrap">
                {property.status === 'For Rent'
                  ? `$${property.price.toLocaleString()}/mo`
                  : `$${property.price.toLocaleString()}`}
              </span>
            </div>

            <div className="mt-4 flex items-center text-blue-600 text-sm md:text-base space-x-2">
              <MapPin className="h-5 w-5" />
              <span>{property.location}</span>
            </div>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <InfoCard Icon={Bed} title="Bedrooms" value={property.bedrooms} />
              <InfoCard Icon={Bath} title="Bathrooms" value={property.bathrooms} />
              <InfoCard Icon={Square} title="Square Feet" value={property.sqft} />
              <InfoCard Icon={Car} title="Garage" value={property.garage} />
            </div>
          </header>

          {/* Description */}
          <Section title="Description">
            <p className="text-gray-700 leading-relaxed text-lg">{property.description}</p>
          </Section>

          {/* Details */}
          <Section title="Property Details">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
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
            <div className="flex flex-wrap gap-3">
              {property.amenities.map((amenity, idx) => (
                <span
                  key={idx}
                  className="flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 via-white to-blue-100 px-4 py-1 shadow-sm text-blue-700 font-semibold text-sm"
                >
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-700"></span>
                  {amenity}
                </span>
              ))}
            </div>
          </Section>
        </main>

        {/* Sidebar */}
        <aside className="mt-10 lg:mt-0 lg:w-80 bg-white rounded-3xl shadow-lg p-6 border border-blue-100 backdrop-blur-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Agent</h3>
          <div className="flex items-center gap-5 mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center shadow-lg text-white text-2xl font-extrabold border-4 border-white select-none">
              {property.agent.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900">{property.agent.name}</p>
              <p className="text-sm text-gray-500">Real Estate Agent</p>
            </div>
          </div>
          <div className="space-y-4 mb-7">
            <ContactLink
              Icon={Phone}
              target={`tel:${property.agent.phone}`}
              text={property.agent.phone}
            />
            <ContactLink
              Icon={Mail}
              target={`mailto:${property.agent.email}`}
              text={property.agent.email}
            />
          </div>
          <button
            onClick={() => setShowContactForm((v) => !v)}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl py-3 mb-3 font-semibold shadow hover:brightness-110 transition transform hover:scale-105"
          >
            Request Information
          </button>
          <button className="w-full bg-white border border-blue-300 text-blue-700 rounded-xl py-3 font-semibold shadow hover:bg-blue-100 transition">
            Schedule Tour
          </button>
          {showContactForm && (
            <div className="mt-6 border-t border-blue-200 pt-6">
              <ContactForm />
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

// Section wrapper
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="bg-white rounded-3xl shadow-lg p-6 sm:p-10 border border-blue-100 mb-10 animate-fade-in">
    <h2 className="text-2xl font-extrabold text-gray-900 mb-5">{title}</h2>
    {children}
  </section>
);

// Info Card for Bedrooms, Bathrooms, etc.
const InfoCard = ({
  Icon,
  title,
  value,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  value: number | string;
}) => (
  <div className="flex flex-col items-center p-5 rounded-3xl shadow-md bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 transition hover:scale-105 duration-300">
    <Icon className="h-10 w-10 text-blue-600 mb-3" />
    <span className="text-xl font-extrabold text-gray-900">{value}</span>
    <span className="text-blue-700 tracking-wide text-sm mt-1">{title}</span>
  </div>
);

// Details Table
const DetailsTable = ({
  title,
  details,
}: {
  title: string;
  details: { name: string; value: string | number }[];
}) => (
  <div>
    <h3 className="font-semibold text-lg text-gray-900 mb-3">{title}</h3>
    <dl className="space-y-2">
      {details.map(({ name, value }, idx) => (
        <div key={idx} className="flex justify-between text-gray-700 text-sm sm:text-base">
          <dt>{name}:</dt>
          <dd className="font-medium">{value}</dd>
        </div>
      ))}
    </dl>
  </div>
);

// Contact Link component
const ContactLink = ({
  Icon,
  target,
  text,
}: {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  target: string;
  text: string;
}) => (
  <a
    href={target}
    className="flex items-center gap-3 font-semibold text-blue-700 hover:text-blue-900 text-base transition"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="h-6 w-6" />
    <span>{text}</span>
  </a>
);

// Contact Form
const ContactForm = () => (
  <form className="space-y-5 animate-fade-in">
    <input
      type="text"
      placeholder="Your Name"
      required
      className="w-full px-4 py-3 border rounded-xl border-blue-200 bg-white/90 shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
    />
    <input
      type="email"
      placeholder="Your Email"
      required
      className="w-full px-4 py-3 border rounded-xl border-blue-200 bg-white/90 shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
    />
    <input
      type="tel"
      placeholder="Your Phone"
      className="w-full px-4 py-3 border rounded-xl border-blue-200 bg-white/90 shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition"
    />
    <textarea
      rows={4}
      placeholder="Your Message"
      required
      className="w-full px-4 py-3 border rounded-xl border-blue-200 bg-white/90 shadow-sm placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition resize-y"
    ></textarea>
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-xl font-semibold hover:brightness-110 transition transform hover:scale-105 shadow"
    >
      Send Message
    </button>
  </form>
);

export default PropertyDetail;
