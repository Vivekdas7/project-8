export interface Property {
  id: number;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  type: string;
  status: 'For Sale' | 'For Rent' | 'Sold';
  featured: boolean;
  images: string[];
  description: string;
  amenities: string[];
  yearBuilt: number;
  lotSize: string;
  garage: number;
  agent: {
    name: string;
    phone: string;
    email: string;
  };
}

export const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Modern Villa",
    price: 1200000,
    location: "Beverly Hills, CA",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3500,
    type: "House",
    status: "For Sale",
    featured: true,
    images: [
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Stunning modern villa with panoramic city views, featuring an open-concept design, gourmet kitchen, and luxurious finishes throughout.",
    amenities: ["Swimming Pool", "Home Theater", "Wine Cellar", "Gym", "Smart Home System"],
    yearBuilt: 2020,
    lotSize: "0.5 acres",
    garage: 3,
    agent: {
      name: "Sarah Johnson",
      phone: "+1 (555) 123-4567",
      email: "sarah@elitehomes.com"
    }
  },
  {
    id: 2,
    title: "Downtown Luxury Condo",
    price: 850000,
    location: "Manhattan, NY",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    type: "Condo",
    status: "For Sale",
    featured: true,
    images: [
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121120/pexels-photo-2121120.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Elegant high-rise condo with floor-to-ceiling windows and breathtaking city views. Premium finishes and top-tier amenities.",
    amenities: ["Concierge", "Rooftop Terrace", "Fitness Center", "Valet Parking"],
    yearBuilt: 2018,
    lotSize: "N/A",
    garage: 1,
    agent: {
      name: "Michael Chen",
      phone: "+1 (555) 234-5678",
      email: "michael@elitehomes.com"
    }
  },
  {
    id: 3,
    title: "Charming Victorian Home",
    price: 675000,
    location: "San Francisco, CA",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2800,
    type: "House",
    status: "For Sale",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Beautiful Victorian home with original hardwood floors, high ceilings, and modern updates while preserving historic charm.",
    amenities: ["Garden", "Fireplace", "Bay Windows", "Updated Kitchen"],
    yearBuilt: 1895,
    lotSize: "0.15 acres",
    garage: 1,
    agent: {
      name: "Emily Rodriguez",
      phone: "+1 (555) 345-6789",
      email: "emily@elitehomes.com"
    }
  },
  {
    id: 4,
    title: "Modern Lakefront Estate",
    price: 2500000,
    location: "Lake Tahoe, CA",
    bedrooms: 6,
    bathrooms: 5,
    sqft: 4500,
    type: "House",
    status: "For Sale",
    featured: true,
    images: [
      "https://images.pexels.com/photos/1571457/pexels-photo-1571457.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121122/pexels-photo-2121122.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Spectacular lakefront estate with private beach, infinity pool, and panoramic mountain views. Ultimate luxury retreat.",
    amenities: ["Private Beach", "Infinity Pool", "Boat Dock", "Hot Tub", "Guest House"],
    yearBuilt: 2019,
    lotSize: "2 acres",
    garage: 4,
    agent: {
      name: "David Thompson",
      phone: "+1 (555) 456-7890",
      email: "david@elitehomes.com"
    }
  },
  {
    id: 5,
    title: "Cozy Suburban Ranch",
    price: 450000,
    location: "Austin, TX",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    type: "House",
    status: "For Sale",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571471/pexels-photo-1571471.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Perfect family home in quiet neighborhood with large backyard, updated kitchen, and move-in ready condition.",
    amenities: ["Large Backyard", "Updated Kitchen", "Hardwood Floors", "Two-Car Garage"],
    yearBuilt: 2005,
    lotSize: "0.25 acres",
    garage: 2,
    agent: {
      name: "Lisa Martinez",
      phone: "+1 (555) 567-8901",
      email: "lisa@elitehomes.com"
    }
  },
  {
    id: 6,
    title: "Urban Loft Apartment",
    price: 3200,
    location: "Chicago, IL",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 900,
    type: "Apartment",
    status: "For Rent",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121123/pexels-photo-2121123.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Stylish urban loft with exposed brick, high ceilings, and modern amenities in the heart of downtown Chicago.",
    amenities: ["Exposed Brick", "High Ceilings", "In-Unit Laundry", "Balcony"],
    yearBuilt: 2015,
    lotSize: "N/A",
    garage: 0,
    agent: {
      name: "James Wilson",
      phone: "+1 (555) 678-9012",
      email: "james@elitehomes.com"
    }
  },
  {
    id: 7,
    title: "Elegant Colonial Estate",
    price: 950000,
    location: "Greenwich, CT",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 4200,
    type: "House",
    status: "For Sale",
    featured: true,
    images: [
      "https://images.pexels.com/photos/1396141/pexels-photo-1396141.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571474/pexels-photo-1571474.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Magnificent colonial estate on private grounds with formal gardens, library, and wine cellar. Timeless elegance.",
    amenities: ["Wine Cellar", "Library", "Formal Gardens", "3-Car Garage", "Pool"],
    yearBuilt: 1998,
    lotSize: "1.2 acres",
    garage: 3,
    agent: {
      name: "Patricia Davis",
      phone: "+1 (555) 789-0123",
      email: "patricia@elitehomes.com"
    }
  },
  {
    id: 8,
    title: "Beachfront Penthouse",
    price: 1800000,
    location: "Miami Beach, FL",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2200,
    type: "Condo",
    status: "For Sale",
    featured: true,
    images: [
      "https://images.pexels.com/photos/1571461/pexels-photo-1571461.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2121124/pexels-photo-2121124.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Luxurious beachfront penthouse with wraparound terrace, ocean views, and access to pristine private beach.",
    amenities: ["Ocean Views", "Private Beach Access", "Wraparound Terrace", "Concierge", "Spa"],
    yearBuilt: 2016,
    lotSize: "N/A",
    garage: 2,
    agent: {
      name: "Robert Garcia",
      phone: "+1 (555) 890-1234",
      email: "robert@elitehomes.com"
    }
  },
  {
    id: 9,
    title: "Mountain Cabin Retreat",
    price: 325000,
    location: "Aspen, CO",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1400,
    type: "Cabin",
    status: "For Sale",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396145/pexels-photo-1396145.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571477/pexels-photo-1571477.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Cozy mountain cabin with stunning alpine views, perfect for weekend getaways or year-round living.",
    amenities: ["Mountain Views", "Fireplace", "Deck", "Hot Tub", "Ski Storage"],
    yearBuilt: 2010,
    lotSize: "0.75 acres",
    garage: 1,
    agent: {
      name: "Amanda White",
      phone: "+1 (555) 901-2345",
      email: "amanda@elitehomes.com"
    }
  },
  {
    id: 10,
    title: "Historic Brownstone",
    price: 1100000,
    location: "Boston, MA",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2600,
    type: "Townhouse",
    status: "For Sale",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396148/pexels-photo-1396148.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571480/pexels-photo-1571480.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Beautifully restored historic brownstone in prestigious Back Bay neighborhood with original details and modern amenities.",
    amenities: ["Historic Details", "Roof Deck", "Original Moldings", "Updated Kitchen", "Garden"],
    yearBuilt: 1885,
    lotSize: "0.08 acres",
    garage: 0,
    agent: {
      name: "Christopher Lee",
      phone: "+1 (555) 012-3456",
      email: "christopher@elitehomes.com"
    }
  },
  {
    id: 11,
    title: "Luxury Townhome",
    price: 750000,
    location: "Portland, OR",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2100,
    type: "Townhouse",
    status: "For Sale",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396151/pexels-photo-1396151.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571483/pexels-photo-1571483.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Contemporary townhome with modern design, eco-friendly features, and prime location near downtown Portland.",
    amenities: ["Solar Panels", "Rain Garden", "Modern Design", "Rooftop Terrace", "EV Charging"],
    yearBuilt: 2021,
    lotSize: "0.05 acres",
    garage: 2,
    agent: {
      name: "Jennifer Brown",
      phone: "+1 (555) 123-4567",
      email: "jennifer@elitehomes.com"
    }
  },
  {
    id: 12,
    title: "Desert Oasis Villa",
    price: 825000,
    location: "Scottsdale, AZ",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2900,
    type: "House",
    status: "For Sale",
    featured: false,
    images: [
      "https://images.pexels.com/photos/1396154/pexels-photo-1396154.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1571486/pexels-photo-1571486.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    description: "Stunning desert villa with southwestern architecture, resort-style backyard, and breathtaking mountain views.",
    amenities: ["Pool", "Outdoor Kitchen", "Desert Landscaping", "Mountain Views", "Casita"],
    yearBuilt: 2017,
    lotSize: "0.6 acres",
    garage: 3,
    agent: {
      name: "Mark Johnson",
      phone: "+1 (555) 234-5678",
      email: "mark@elitehomes.com"
    }
  }
];