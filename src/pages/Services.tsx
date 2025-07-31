import React from 'react';
import { Home, Key, TrendingUp, Search, Calculator, FileText, Users, Award, Shield, CheckCircle } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Property Sales",
      description: "Expert guidance through the entire home selling process, from pricing to closing.",
      features: ["Market Analysis", "Professional Photography", "Marketing Strategy", "Negotiation Support"]
    },
    {
      icon: Key,
      title: "Property Rentals",
      description: "Find the perfect rental property or manage your investment properties efficiently.",
      features: ["Tenant Screening", "Lease Management", "Maintenance Coordination", "Rent Collection"]
    },
    {
      icon: TrendingUp,
      title: "Investment Consulting",
      description: "Strategic advice for real estate investments to maximize your returns.",
      features: ["ROI Analysis", "Market Trends", "Portfolio Planning", "Risk Assessment"]
    },
    {
      icon: Search,
      title: "Property Management",
      description: "Comprehensive management services for residential and commercial properties.",
      features: ["24/7 Support", "Maintenance Services", "Financial Reporting", "Tenant Relations"]
    },
    {
      icon: Calculator,
      title: "Property Valuation",
      description: "Accurate property valuations using advanced market analysis and local expertise.",
      features: ["CMA Reports", "Market Research", "Appraisal Coordination", "Price Recommendations"]
    },
    {
      icon: FileText,
      title: "Legal & Documentation",
      description: "Complete handling of all legal documents and regulatory requirements.",
      features: ["Contract Review", "Closing Coordination", "Title Services", "Regulatory Compliance"]
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Initial Consultation",
      description: "We meet to understand your needs, goals, and timeline for your real estate transaction."
    },
    {
      step: "02",
      title: "Market Analysis",
      description: "Comprehensive analysis of current market conditions and comparable properties in your area."
    },
    {
      step: "03",
      title: "Strategy Development",
      description: "Create a customized plan tailored to your specific situation and objectives."
    },
    {
      step: "04",
      title: "Implementation",
      description: "Execute the plan with professional marketing, showings, negotiations, and closing coordination."
    },
    {
      step: "05",
      title: "Follow-up",
      description: "Continued support after closing to ensure your satisfaction and address any questions."
    }
  ];

  const benefits = [
    "Expert local market knowledge",
    "Professional marketing and photography",
    "Extensive network of qualified buyers and sellers",
    "Skilled negotiation to maximize your outcomes",
    "Full-service transaction management",
    "Ongoing support and consultation"
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900 to-blue-700">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=1920)'
          }}
        ></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Our Services</h1>
          <p className="text-xl md:text-2xl text-blue-100 leading-relaxed">
            Comprehensive real estate solutions tailored to your unique needs and goals
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From buying and selling to property management and investment consulting, we provide comprehensive real estate services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-8 hover:shadow-xl transition-shadow border border-gray-100">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven, step-by-step approach that ensures successful outcomes for every client
            </p>
          </div>

          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            
            <div className="space-y-12">
              {processSteps.map((step, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                      <div className="flex items-center mb-4">
                        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                          {step.step}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 ml-4">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose EliteHomes</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With over 15 years of experience and a track record of successful transactions, 
                we bring unmatched expertise and dedication to every client relationship.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">1,200+</div>
                  <div className="text-sm text-gray-600">Properties Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">850+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.9</div>
                  <div className="text-sm text-gray-600">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Real estate consultation"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
                <div className="flex items-center space-x-3">
                  <Award className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="font-bold text-gray-900">Award Winning</div>
                    <div className="text-sm text-gray-600">Real Estate Team</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Specialized Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Additional services tailored to specific client needs and market segments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Luxury Properties</h3>
              <p className="text-gray-600 leading-relaxed">
                Specialized service for high-end properties with discretion, extensive marketing reach, and luxury market expertise.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">First-Time Buyers</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive guidance and support for first-time homebuyers, including education and financing assistance.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Commercial Real Estate</h3>
              <p className="text-gray-600 leading-relaxed">
                Expert services for commercial property transactions, including office buildings, retail spaces, and investments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Contact us today to discuss your real estate needs and learn how we can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-blue-600 px-8 py-4 rounded-md hover:bg-gray-50 transition-colors text-lg font-medium"
            >
              Schedule Consultation
            </a>
            <a
              href="tel:+1234567890"
              className="bg-blue-700 text-white px-8 py-4 rounded-md hover:bg-blue-800 transition-colors text-lg font-medium"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;