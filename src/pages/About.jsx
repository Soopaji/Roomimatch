import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-beige">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About RoomiMatch
          </h1>
          <p className="text-xl text-gray-600">
            Connecting roommates for better living experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To make finding the perfect roommate easy and stress-free. We believe
              that great roommates make great living experiences, and we're here to
              help you find your perfect match.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-600">
              Create your profile, set your preferences, and browse through compatible
              roommates. Use our advanced filters to find people who match your lifestyle
              and budget requirements.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
            Why Choose RoomiMatch?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Matching</h3>
              <p className="text-gray-600 text-sm">
                Our algorithm finds roommates based on your preferences and lifestyle
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-gray-900 mb-2">Safe & Secure</h3>
              <p className="text-gray-600 text-sm">
                Verified profiles and secure messaging to ensure your safety
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="font-semibold text-gray-900 mb-2">Easy Communication</h3>
              <p className="text-gray-600 text-sm">
                Built-in chat system to connect with potential roommates instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
