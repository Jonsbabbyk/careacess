import { Location } from '../types';

// Sample accessible locations in the Bronx
export const accessibleLocations: Location[] = [
  {
    id: '1',
    name: 'Bronx Zoo',
    address: '2300 Southern Blvd, Bronx, NY 10460',
    category: 'Entertainment',
    accessible: true,
    coordinates: [40.8506, -73.8770],
    features: ['Wheelchair accessible', 'Accessible restrooms', 'Service animal friendly'],
    description: 'The Bronx Zoo offers accessible paths and accommodations for visitors with disabilities.',
  },
  {
    id: '2',
    name: 'Yankee Stadium',
    address: '1 E 161 St, Bronx, NY 10451',
    category: 'Sports',
    accessible: true,
    coordinates: [40.8296, -73.9262],
    features: ['Wheelchair seating', 'Accessible entrances', 'Assistive listening devices'],
    description: 'Yankee Stadium provides accessible seating and services for fans with disabilities.',
  },
  {
    id: '3',
    name: 'New York Botanical Garden',
    address: '2900 Southern Blvd, Bronx, NY 10458',
    category: 'Park',
    accessible: true,
    coordinates: [40.8617, -73.8812],
    features: ['Wheelchair accessible paths', 'Accessible tram tours', 'Braille signage'],
    description: 'The New York Botanical Garden offers accessible paths and special accommodations.',
  },
  {
    id: '4',
    name: 'Bronx Museum of the Arts',
    address: '1040 Grand Concourse, Bronx, NY 10456',
    category: 'Museum',
    accessible: true,
    coordinates: [40.8315, -73.9214],
    features: ['Elevator access', 'Accessible entrances', 'Visual aids'],
    description: 'The Bronx Museum of the Arts is fully accessible to visitors with disabilities.',
  },
  {
    id: '5',
    name: 'Bay Plaza Shopping Center',
    address: '200 Baychester Ave, Bronx, NY 10475',
    category: 'Shopping',
    accessible: true,
    coordinates: [40.8686, -73.8295],
    features: ['Accessible parking', 'Elevator access', 'Accessible restrooms'],
    description: 'Bay Plaza Shopping Center offers full accessibility features throughout the mall.',
  }
];