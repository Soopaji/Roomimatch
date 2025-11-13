import { useState } from 'react';
import Navbar from '../components/Navbar';
import FilterBar from '../components/FilterBar';
import ProfileCard from '../components/ProfileCard';

const sampleProfiles = [
  {
    id: 1,
    name: 'Rahul Sharma',
    age: 22,
    city: 'Delhi',
    tags: ['Non-smoker', 'Non-drinker', 'Tidy', 'Student']
  },
  {
    id: 2,
    name: 'Priya Singh',
    age: 21,
    city: 'Delhi',
    tags: ['Non-smoker', 'Social', 'Music lover', 'Student']
  },
  {
    id: 3,
    name: 'Arjun Patel',
    age: 24,
    city: 'Delhi',
    tags: ['Sports enthusiast', 'Non-drinker', 'Early riser', 'Working']
  },
  {
    id: 4,
    name: 'Sneha Gupta',
    age: 23,
    city: 'Delhi',
    tags: ['Bookworm', 'Vegetarian', 'Non-smoker', 'Student']
  }
];

export default function Home() {
  const [filters, setFilters] = useState({
    gender: 'Any',
    location: 'Any',
    budget: 'Any',
    smoking: 'Any',
    interests: 'Any'
  });

  const [filteredProfiles, setFilteredProfiles] = useState(sampleProfiles);

  const handleSearch = () => {
    // Simple filtering logic - in a real app, this would call an API
    let filtered = sampleProfiles;

    if (filters.smoking !== 'Any') {
      filtered = filtered.filter(profile =>
        profile.tags.some(tag =>
          tag.toLowerCase().includes(filters.smoking.toLowerCase())
        )
      );
    }

    setFilteredProfiles(filtered);
  };

  return (
    <div className="min-h-screen bg-beige">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find your roommate
          </h1>
        </div>

        <FilterBar
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProfiles.map(profile => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}
