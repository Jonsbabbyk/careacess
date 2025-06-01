import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Armchair as Wheelchair, Check, X } from 'lucide-react';
import { accessibleLocations } from '../data/accessibleLocations';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { Location } from '../types';

const MapPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAccessible, setShowAccessible] = useState<boolean | null>(null);
  const bronxCenter: [number, number] = [40.8448, -73.8648]; // Center of Bronx
  
  const filteredLocations = accessibleLocations.filter(location => {
    if (selectedCategory && location.category !== selectedCategory) return false;
    if (showAccessible !== null && location.accessible !== showAccessible) return false;
    return true;
  });

  const categories = [...new Set(accessibleLocations.map(loc => loc.category))];

  return (
    <PageContainer>
      <PageHeader 
        title="Accessible Locations in the Bronx" 
        description="Find wheelchair accessible and disability-friendly locations throughout the Bronx."
      />
      
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="category-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Filter by Category
          </label>
          <select
            id="category-filter"
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value || null)}
            aria-label="Filter locations by category"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Accessibility Status
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setShowAccessible(null)}
              className={`flex-1 p-2 rounded-md ${
                showAccessible === null 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={showAccessible === null}
            >
              All
            </button>
            <button
              onClick={() => setShowAccessible(true)}
              className={`flex-1 p-2 rounded-md flex items-center justify-center ${
                showAccessible === true 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={showAccessible === true}
            >
              <Check className="w-4 h-4 mr-1" />
              Accessible
            </button>
            <button
              onClick={() => setShowAccessible(false)}
              className={`flex-1 p-2 rounded-md flex items-center justify-center ${
                showAccessible === false 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
              aria-pressed={showAccessible === false}
            >
              <X className="w-4 h-4 mr-1" />
              Not Accessible
            </button>
          </div>
        </div>
      </div>

      <div className="h-[calc(100vh-20rem)] min-h-[400px] rounded-lg overflow-hidden shadow-md relative">
        <div className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-800 p-3 z-10 rounded-t-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Showing {filteredLocations.length} locations
            {selectedCategory ? ` in ${selectedCategory}` : ''}
            {showAccessible !== null ? ` that are ${showAccessible ? 'accessible' : 'not accessible'}` : ''}
          </p>
        </div>
        
        <MapContainer 
          center={bronxCenter} 
          zoom={13} 
          style={{ height: '100%', width: '100%', zIndex: 1 }}
          aria-label="Map of accessible locations in the Bronx"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredLocations.map((location: Location) => (
            <Marker 
              key={location.id}
              position={location.coordinates}
            >
              <Popup>
                <div className="max-w-xs">
                  <div className={`${location.accessible ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} flex items-center justify-between p-1 rounded mb-1`}>
                    <h3 className="font-semibold text-lg">{location.name}</h3>
                    {location.accessible ? (
                      <Wheelchair className="h-5 w-5" />
                    ) : null}
                  </div>
                  <p className="text-gray-600 text-sm mb-1">{location.address}</p>
                  <p className="text-gray-600 text-sm mb-2">{location.category}</p>
                  
                  {location.features && location.features.length > 0 && (
                    <div className="mb-2">
                      <h4 className="font-medium text-sm">Accessible Features:</h4>
                      <ul className="list-disc list-inside text-sm">
                        {location.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {location.description && (
                    <p className="text-sm text-gray-600">{location.description}</p>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      <div className="mt-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Understanding the Map</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-3">
          This map shows locations in the Bronx that have been evaluated for accessibility. Click on any marker to see detailed information about the location's accessibility features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-600 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Accessible locations</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-red-600 mr-2"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Inaccessible locations</span>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default MapPage;