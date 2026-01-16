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
  }
];

export function getRecommendedPackages(
  personality: string,
  pace: string,
  budgetLevel: string,
  travelWith: string,
  interests: string[],
  days_range: string
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