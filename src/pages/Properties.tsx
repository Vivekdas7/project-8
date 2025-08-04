import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Bed, Bath, Square, ArrowRight, Grid, List } from 'lucide-react';
import { properties } from '../data/properties';

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    return properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || property.status === statusFilter;
      const matchesType = typeFilter === 'All' || property.type === typeFilter;
      
      let matchesPrice = true;
      if (priceRange !== 'All') {
        const price = property.price;
        switch (priceRange) {
          case 'Under 500k':
            matchesPrice = price < 500000;
            break;
          case '500k-1M':
            matchesPrice = price >= 500000 && price < 1000000;
            break;
          case '1M-2M':
            matchesPrice = price >= 1000000 && price < 2000000;
            break;
          case 'Over 2M':
            matchesPrice = price >= 2000000;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesPrice;
    });
  }, [searchTerm, statusFilter, typeFilter, priceRange]);

  const PropertyCard = ({ property, isListView = false }: { property: any, isListView?: boolean }) => (
    <div className={`bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group ${
      isListView ? 'flex' : ''
    }`}>
      <div className={`relative overflow-hidden ${isListView ? 'w-1/3' : ''}`}>
        <img
          src={property.images[0]}
          alt={property.title}
          className={`object-cover group-hover:scale-105 transition-transform duration-300 rounded-t-2xl ${ 
            isListView ? 'w-full h-full rounded-l-2xl rounded-tr-none' : 'w-full h-64'
          }`}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium shadow">
            {property.status}
          </span>
        </div>
      </div>
      
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">{property.title}</h3>
          <span className="text-2xl font-bold text-blue-600">
            ${property.status === 'For Rent' ? property.price.toLocaleString() + '/mo' : property.price.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center text-gray-700 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-2">{property.description}</p>
        
        <div className="flex items-center justify-between text-gray-600 mb-6">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-sm">{property.bedrooms} bed</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-sm">{property.bathrooms} bath</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1 text-blue-600" />
            <span className="text-sm">{property.sqft} sqft</span>
          </div>
        </div>
        
        <Link
          to={`/property/${property.id}`}
          className="w-full bg-blue-600/90 hover:bg-blue-700/90 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 group font-medium shadow-lg"
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Properties</h1>
          <p className="text-xl text-gray-600">Discover your perfect home from our extensive collection</p>
        </div>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-4">
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option value="All">All Status</option>
              <option value="For Sale">For Sale</option>
              <option value="For Rent">For Rent</option>
              <option value="Sold">Sold</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option value="All">All Types</option>
              <option value="House">House</option>
              <option value="Condo">Condo</option>
              <option value="Apartment">Apartment</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Cabin">Cabin</option>
            </select>

            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option value="All">All Prices</option>
              <option value="Under 500k">Under $500k</option>
              <option value="500k-1M">$500k - $1M</option>
              <option value="1M-2M">$1M - $2M</option>
              <option value="Over 2M">Over $2M</option>
            </select>

            <div className="flex space-x-2 items-center justify-end">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-md transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                aria-label="Grid View"
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
                aria-label="List View"
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Filter className="h-4 w-4 mr-1" />
            <span>Showing {filteredProperties.length} of {properties.length} properties</span>
          </div>
        </div>

        {/* Properties Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}`}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} isListView={viewMode === 'list'} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Properties Found</h3>
              <p className="text-gray-600">Try adjusting your search criteria to find more properties.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Properties;
