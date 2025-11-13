import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Badge } from "./components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem } from "./components/ui/select";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://roomimatch-backend.onrender.com';

export default function RoomiMatchPrototype() {
  const [currentView, setCurrentView] = useState('register'); // 'register', 'swipe', 'chat'

  // Registration state
  const [registrationData, setRegistrationData] = useState({
    name: '',
    age: '',
    gender: '',
    occupation: '',
    budget: '',
    habits: [],
    interests: []
  });

  const [filters, setFilters] = useState({
    gender: "Any",
    smoker: "Any",
    drinker: "Any",
    budget: "Any",
  });

  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    fetchProfiles();
  }, [filters]);

  const fetchProfiles = async () => {
    try {
      const queryParams = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}/api/users?${queryParams}`);
      const data = await response.json();
      setProfiles(data.map(profile => ({
        ...profile,
        habits: JSON.parse(profile.habits),
        interests: JSON.parse(profile.interests)
      })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profiles:', error);
      // Fallback to sample data if backend is not running
      setProfiles([
        {
          id: 1,
          name: "Rahul",
          age: 22,
          gender: "Male",
          occupation: "Student",
          budget: "₹7k",
          habits: ["Non-smoker", "Non-drinker"],
          interests: ["Football", "Movies"],
        },
        {
          id: 2,
          name: "Aditi",
          age: 21,
          gender: "Female",
          occupation: "Student",
          budget: "₹8k",
          habits: ["Smoker", "Party"],
          interests: ["Music", "Dance"],
        },
        {
          id: 3,
          name: "Karan",
          age: 24,
          gender: "Male",
          occupation: "Working Professional",
          budget: "₹10k",
          habits: ["Non-smoker", "Non-drinker"],
          interests: ["Gaming", "Cricket"],
        },
      ]);
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Registration successful! You can now start swiping.');
        setCurrentView('swipe');
        fetchProfiles(); // Refresh profiles to include the new user
      } else {
        alert('Registration failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert('Registration failed. Please try again.');
    }
  };

  const toggleHabit = (habit) => {
    setRegistrationData(prev => ({
      ...prev,
      habits: prev.habits.includes(habit)
        ? prev.habits.filter(h => h !== habit)
        : [...prev.habits, habit]
    }));
  };

  const toggleInterest = (interest) => {
    setRegistrationData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSwipe = (action) => {
    if (action === "like") {
      setMatches([...matches, profiles[currentIndex]]);
    }
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setChatMessages([...chatMessages, { sender: "You", text: newMessage }]);
      setNewMessage("");
    }
  };

  const filteredProfiles = profiles.filter((p) => {
    return (
      (filters.gender === "Any" || p.gender === filters.gender) &&
      (filters.smoker === "Any" || p.habits.includes(filters.smoker)) &&
      (filters.drinker === "Any" || p.habits.includes(filters.drinker)) &&
      (filters.budget === "Any" || p.budget === filters.budget)
    );
  });

  if (currentView === 'register') {
    return (
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-yellow-100 to-white p-4 max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">RoomiMatch</h1>
        <Card className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Create Your Profile</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input
                value={registrationData.name}
                onChange={(e) => setRegistrationData({...registrationData, name: e.target.value})}
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Age</label>
              <Input
                type="number"
                value={registrationData.age}
                onChange={(e) => setRegistrationData({...registrationData, age: parseInt(e.target.value) || ''})}
                placeholder="Enter your age"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <Select onValueChange={(v) => setRegistrationData({...registrationData, gender: v})}>
                <SelectTrigger>{registrationData.gender || 'Select gender'}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Occupation</label>
              <Select onValueChange={(v) => setRegistrationData({...registrationData, occupation: v})}>
                <SelectTrigger>{registrationData.occupation || 'Select occupation'}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Working Professional">Working Professional</SelectItem>
                  <SelectItem value="Freelancer">Freelancer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Budget</label>
              <Select onValueChange={(v) => setRegistrationData({...registrationData, budget: v})}>
                <SelectTrigger>{registrationData.budget || 'Select budget'}</SelectTrigger>
                <SelectContent>
                  <SelectItem value="₹7k">₹7k</SelectItem>
                  <SelectItem value="₹8k">₹8k</SelectItem>
                  <SelectItem value="₹10k">₹10k</SelectItem>
                  <SelectItem value="₹12k">₹12k</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Habits</label>
              <div className="flex flex-wrap gap-2">
                {['Non-smoker', 'Smoker', 'Non-drinker', 'Drinker', 'Early riser', 'Night owl'].map(habit => (
                  <Badge
                    key={habit}
                    variant={registrationData.habits.includes(habit) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleHabit(habit)}
                  >
                    {habit}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {['Sports', 'Music', 'Movies', 'Gaming', 'Reading', 'Cooking', 'Travel', 'Fitness'].map(interest => (
                  <Badge
                    key={interest}
                    variant={registrationData.interests.includes(interest) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <Button
              onClick={handleRegister}
              className="w-full py-3 text-lg font-semibold"
              disabled={!registrationData.name || !registrationData.age || !registrationData.gender || !registrationData.occupation || !registrationData.budget}
            >
              Register & Start Swiping
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-yellow-100 to-white p-4 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">RoomiMatch</h1>

      {/* Filter Section */}
      <Card className="w-full max-w-md p-4 mb-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium">Gender</label>
            <Select onValueChange={(v) => setFilters({ ...filters, gender: v })}>
              <SelectTrigger>{filters.gender}</SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Smoker</label>
            <Select onValueChange={(v) => setFilters({ ...filters, smoker: v })}>
              <SelectTrigger>{filters.smoker}</SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Smoker">Smoker</SelectItem>
                <SelectItem value="Non-smoker">Non-smoker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Drinker</label>
            <Select onValueChange={(v) => setFilters({ ...filters, drinker: v })}>
              <SelectTrigger>{filters.drinker}</SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="Drinker">Drinker</SelectItem>
                <SelectItem value="Non-drinker">Non-drinker</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Budget</label>
            <Select onValueChange={(v) => setFilters({ ...filters, budget: v })}>
              <SelectTrigger>{filters.budget}</SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="₹7k">₹7k</SelectItem>
                <SelectItem value="₹8k">₹8k</SelectItem>
                <SelectItem value="₹10k">₹10k</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {chatUser ? (
        <Card className="w-full max-w-md p-4 bg-white rounded-2xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">Chat with {chatUser.name}</h2>
          <div className="h-64 overflow-y-auto border p-2 rounded mb-4">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded-lg max-w-xs ${
                  msg.sender === "You" ? "bg-yellow-200 ml-auto" : "bg-gray-100"
                }`}
              >
                <strong>{msg.sender}: </strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="px-6">Send</Button>
          </div>
        </Card>
      ) : currentIndex < filteredProfiles.length ? (
        <Card className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-1">{filteredProfiles[currentIndex].name}</h2>
            <p className="text-gray-600 mb-2">
              {filteredProfiles[currentIndex].age} • {filteredProfiles[currentIndex].gender} • {filteredProfiles[currentIndex].occupation}
            </p>
            <p className="font-medium mb-2">Budget: {filteredProfiles[currentIndex].budget}</p>

            <p className="font-semibold">Habits</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {filteredProfiles[currentIndex].habits.map((habit, i) => (
                <Badge key={i}>{habit}</Badge>
              ))}
            </div>

            <p className="font-semibold">Interests</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {filteredProfiles[currentIndex].interests.map((interest, i) => (
                <Badge key={i}>{interest}</Badge>
              ))}
            </div>

            <div className="flex justify-between gap-4">
              <Button variant="destructive" onClick={() => handleSwipe("pass")} className="flex-1 py-3 text-lg font-semibold">Pass</Button>
              <Button variant="default" onClick={() => handleSwipe("like")} className="flex-1 py-3 text-lg font-semibold">Like</Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-xl font-semibold">No more profiles</h2>
          <p className="text-gray-600 mt-2">You liked {matches.length} roommate(s).</p>
          {matches.length > 0 && (
            <ul className="mt-4 text-left">
              {matches.map((m) => (
                <li key={m.id} className="p-2 border-b cursor-pointer hover:bg-gray-50" onClick={() => setChatUser(m)}>
                  ✅ {m.name} ({m.budget})
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
