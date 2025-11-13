import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';

const sampleMatches = [
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
  }
];

export default function Matches() {
  const navigate = useNavigate();
  const [matches] = useState(sampleMatches);

  const handleChatClick = (profile) => {
    navigate('/messages', { state: { chatUser: profile } });
  };

  return (
    <div className="min-h-screen bg-beige">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Matches
          </h1>
          <p className="text-gray-600">
            Connect with your compatible roommates
          </p>
        </div>

        {matches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matches.map(match => (
              <ProfileCard
                key={match.id}
                profile={match}
                showChatButton={true}
                onChatClick={handleChatClick}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">💔</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No matches yet
            </h3>
            <p className="text-gray-600">
              Keep swiping to find your perfect roommate match!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
