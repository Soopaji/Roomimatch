import { Select, SelectTrigger, SelectContent, SelectItem } from './ui/select';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

export default function FilterBar({ filters, setFilters, onSearch }) {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <Select
            value={filters.gender}
            onValueChange={(value) => handleFilterChange('gender', value)}
          >
            <SelectTrigger>
              {filters.gender}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Location
          </label>
          <Select
            value={filters.location}
            onValueChange={(value) => handleFilterChange('location', value)}
          >
            <SelectTrigger>
              {filters.location}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
              <SelectItem value="Mumbai">Mumbai</SelectItem>
              <SelectItem value="Bangalore">Bangalore</SelectItem>
              <SelectItem value="Chennai">Chennai</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Budget
          </label>
          <Select
            value={filters.budget}
            onValueChange={(value) => handleFilterChange('budget', value)}
          >
            <SelectTrigger>
              {filters.budget}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="₹5k-7k">₹5k-7k</SelectItem>
              <SelectItem value="₹7k-10k">₹7k-10k</SelectItem>
              <SelectItem value="₹10k-15k">₹10k-15k</SelectItem>
              <SelectItem value="₹15k+">₹15k+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Smoking
          </label>
          <Select
            value={filters.smoking}
            onValueChange={(value) => handleFilterChange('smoking', value)}
          >
            <SelectTrigger>
              {filters.smoking}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Non-smoker">Non-smoker</SelectItem>
              <SelectItem value="Smoker">Smoker</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Interests
          </label>
          <Select
            value={filters.interests}
            onValueChange={(value) => handleFilterChange('interests', value)}
          >
            <SelectTrigger>
              {filters.interests}
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Any">Any</SelectItem>
              <SelectItem value="Sports">Sports</SelectItem>
              <SelectItem value="Music">Music</SelectItem>
              <SelectItem value="Reading">Reading</SelectItem>
              <SelectItem value="Cooking">Cooking</SelectItem>
              <SelectItem value="Gaming">Gaming</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button
        onClick={onSearch}
        className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-8 py-2"
      >
        <Search className="w-4 h-4 mr-2" />
        Search Roommates
      </Button>
    </div>
  );
}
