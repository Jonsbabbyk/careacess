import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ClipboardList, MessageSquare } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';

const HomePage: React.FC = () => {
  return (
    <PageContainer className="space-y-10 py-8">
      {/* Hero section */}
      <section className="text-center px-4 py-12 md:py-20 bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-xl">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Welcome to <span className="text-primary">AccessBuddy</span>
        </h1>
        <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Making the Bronx more accessible, one location at a time.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/map"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 inline-flex items-center justify-center"
          >
            <Map className="w-5 h-5 mr-2" />
            Find Accessible Places
          </Link>
          <Link
            to="/report"
            className="bg-white dark:bg-gray-800 text-primary hover:bg-gray-50 dark:hover:bg-gray-700 font-medium py-3 px-6 rounded-md border border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 inline-flex items-center justify-center"
          >
            <ClipboardList className="w-5 h-5 mr-2" />
            Report Issues
          </Link>
        </div>
      </section>

      {/* Mission section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            AccessBuddy is dedicated to improving accessibility for people with disabilities in the Bronx. We believe that everyone deserves equal access to public spaces, businesses, and services in our community.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Through our community-driven platform, we aim to:
          </p>
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 dark:text-gray-300 mb-8">
            <li>Map and highlight accessible locations throughout the Bronx</li>
            <li>Identify areas needing accessibility improvements</li>
            <li>Connect people with disabilities to accessible resources</li>
            <li>Advocate for better accessibility standards in our community</li>
          </ul>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Together, we can make the Bronx a more inclusive place for everyone.
          </p>
        </div>
      </section>

      {/* Features section */}
      <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            How AccessBuddy Helps
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
                <Map className="h-8 w-8 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Accessible Map</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find accessible locations throughout the Bronx with our interactive map.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-green-100 dark:bg-green-900 rounded-full mb-4">
                <ClipboardList className="h-8 w-8 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Report Issues</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Help the community by reporting locations that need accessibility improvements.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-purple-100 dark:bg-purple-900 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">AccessBuddy AI</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ask questions about accessibility resources and get instant answers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community section */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">
            Join Our Community
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            AccessBuddy is powered by people like you. By sharing information and reporting accessibility issues, you're helping to make the Bronx more inclusive for everyone.
          </p>
          <Link
            to="/chatbot"
            className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-900 inline-flex items-center justify-center"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Ask AccessBuddy
          </Link>
        </div>
      </section>
    </PageContainer>
  );
};

export default HomePage;