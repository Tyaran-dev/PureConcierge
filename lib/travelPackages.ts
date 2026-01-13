export type TravelPackage = {
  id: number;
  name: string;
  country: string;
  city: string;
  lat: number;
  lng: number;
  price: string;
  duration: string;
  description: string;
  image: string;
  tags: string[];
  matchScore?: number;
};

export const travelPackages: TravelPackage[] = [
  {
    id: 1,
    name: "Paris Cultural Immersion",
    country: "France",
    city: "Paris",
    lat: 48.8566,
    lng: 2.3522,
    price: "$1,299",
    duration: "7 days",
    description: "Explore the art, history, and culture of the City of Light",
    image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["culture", "history", "food", "photography"],
  },
  {
    id: 2,
    name: "Tokyo Modern Adventure",
    country: "Japan",
    city: "Tokyo",
    lat: 35.6762,
    lng: 139.6503,
    price: "$2,499",
    duration: "10 days",
    description: "Experience cutting-edge technology and ancient traditions",
    image: "https://images.pexels.com/photos/2614818/pexels-photo-2614818.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["culture", "food", "adventure", "shopping"],
  },
  {
    id: 3,
    name: "Bali Relaxation Retreat",
    country: "Indonesia",
    city: "Bali",
    lat: -8.3405,
    lng: 115.092,
    price: "$899",
    duration: "5 days",
    description: "Unwind in tropical paradise with yoga and spa treatments",
    image: "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["relaxing", "nature", "food"],
  },
  {
    id: 4,
    name: "Swiss Alps Luxury Escape",
    country: "Switzerland",
    city: "Zermatt",
    lat: 46.0207,
    lng: 7.7491,
    price: "$3,499",
    duration: "6 days",
    description: "Five-star alpine experience with breathtaking mountain views",
    image: "https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["luxury", "nature", "adventure"],
  },
  {
    id: 5,
    name: "New Zealand Adrenaline Rush",
    country: "New Zealand",
    city: "Queenstown",
    lat: -45.0312,
    lng: 168.6626,
    price: "$2,199",
    duration: "8 days",
    description: "Bungee jumping, skydiving, and extreme sports paradise",
    image: "https://images.pexels.com/photos/1118877/pexels-photo-1118877.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["adventure", "nature", "photography"],
  },
  {
    id: 6,
    name: "Rome Historical Journey",
    country: "Italy",
    city: "Rome",
    lat: 41.9028,
    lng: 12.4964,
    price: "$1,599",
    duration: "7 days",
    description: "Walk through 2,000 years of history in the Eternal City",
    image: "https://images.pexels.com/photos/2064827/pexels-photo-2064827.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["culture", "history", "food"],
  },
  {
    id: 7,
    name: "Iceland Nature Expedition",
    country: "Iceland",
    city: "Reykjavik",
    lat: 64.1466,
    lng: -21.9426,
    price: "$2,299",
    duration: "9 days",
    description: "Northern lights, glaciers, and volcanic landscapes",
    image: "https://images.pexels.com/photos/2174656/pexels-photo-2174656.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["nature", "adventure", "photography"],
  },
  {
    id: 8,
    name: "Dubai Luxury Experience",
    country: "UAE",
    city: "Dubai",
    lat: 25.2048,
    lng: 55.2708,
    price: "$2,899",
    duration: "5 days",
    description: "Ultra-modern luxury with world-class shopping and dining",
    image: "https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["luxury", "shopping", "food"],
  },
  {
    id: 9,
    name: "Costa Rica Eco Adventure",
    country: "Costa Rica",
    city: "San Jose",
    lat: 9.9281,
    lng: -84.0907,
    price: "$1,499",
    duration: "8 days",
    description: "Rainforests, wildlife, and pristine beaches",
    image: "https://images.pexels.com/photos/1903702/pexels-photo-1903702.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["nature", "adventure", "relaxing"],
  },
  {
    id: 10,
    name: "Morocco Cultural Odyssey",
    country: "Morocco",
    city: "Marrakech",
    lat: 31.6295,
    lng: -7.9811,
    price: "$1,199",
    duration: "7 days",
    description: "Souks, desert safaris, and authentic Moroccan cuisine",
    image: "https://images.pexels.com/photos/2433467/pexels-photo-2433467.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["culture", "food", "adventure", "shopping"],
  },
  {
    id: 11,
    name: "Santorini Romantic Getaway",
    country: "Greece",
    city: "Santorini",
    lat: 36.3932,
    lng: 25.4615,
    price: "$1,799",
    duration: "6 days",
    description: "Stunning sunsets, white-washed villages, and Greek cuisine",
    image: "https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["relaxing", "food", "photography"],
  },
  {
    id: 12,
    name: "Peru Machu Picchu Trek",
    country: "Peru",
    city: "Cusco",
    lat: -13.5319,
    lng: -71.9675,
    price: "$1,899",
    duration: "10 days",
    description: "Ancient Incan ruins and high-altitude adventure",
    image: "https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=800",
    tags: ["adventure", "history", "nature"],
  },
];

export function getRecommendedPackages(
  personality: string,
  pace: string,
  budgetLevel: string,
  travelWith: string,
  interests: string[]
): TravelPackage[] {
  return travelPackages
    .map(pkg => {
      let score = 0;

      if (personality === 'culture' && pkg.tags.includes('culture')) score += 30;
      if (personality === 'relaxing' && pkg.tags.includes('relaxing')) score += 30;
      if (personality === 'luxury' && pkg.tags.includes('luxury')) score += 30;
      if (personality === 'adventure' && pkg.tags.includes('adventure')) score += 30;

      interests.forEach(interest => {
        if (pkg.tags.includes(interest)) score += 15;
      });

      if (budgetLevel === 'value' && parseInt(pkg.price.replace(/[^0-9]/g, '')) < 1500) score += 20;
      if (budgetLevel === 'balanced' && parseInt(pkg.price.replace(/[^0-9]/g, '')) < 2500) score += 20;
      if (budgetLevel === 'premium' && parseInt(pkg.price.replace(/[^0-9]/g, '')) > 2000) score += 20;

      return { ...pkg, matchScore: score };
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
    .slice(0, 6);
}
