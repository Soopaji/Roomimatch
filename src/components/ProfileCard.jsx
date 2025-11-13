import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';

export default function ProfileCard({ profile, showChatButton = false, onChatClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square bg-gray-200 flex items-center justify-center">
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-gray-600">
            {profile.name.charAt(0)}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{profile.name}</h3>
        <p className="text-gray-600 text-sm mb-2">
          {profile.age} • {profile.city || 'Delhi'}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {profile.tags?.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {showChatButton && (
          <Button
            onClick={() => onChatClick(profile)}
            className="w-full bg-black hover:bg-gray-800 text-white"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </Button>
        )}
      </div>
    </div>
  );
}
