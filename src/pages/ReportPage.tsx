import React, { useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { ClipboardCheck } from 'lucide-react';
import { InaccessibleReport } from '../types';

const ReportPage: React.FC = () => {
  const [formData, setFormData] = useState<InaccessibleReport>({
    locationName: '',
    address: '',
    issue: '',
    contactName: '',
    contactEmail: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.locationName.trim()) {
      errors.locationName = 'Location name is required';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    }
    
    if (!formData.issue.trim()) {
      errors.issue = 'Description of the issue is required';
    }
    
    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      errors.contactEmail = 'Please enter a valid email address';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, we would send this data to a server
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      // Reset form after submission
      setFormData({
        locationName: '',
        address: '',
        issue: '',
        contactName: '',
        contactEmail: '',
      });
    }
  };

  return (
    <PageContainer>
      <PageHeader 
        title="Report Accessibility Issues" 
        description="Help make the Bronx more accessible by reporting locations with accessibility barriers."
      />
      
      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <ClipboardCheck className="h-8 w-8 text-green-600 dark:text-green-400 mr-3\" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Thank You!</h2>
          </div>
          <p className="mt-3 text-green-700 dark:text-green-300">
            Your report has been submitted successfully. Your contribution helps make the Bronx more accessible for everyone.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 animate-fadeIn">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="locationName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="locationName"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                className={`w-full p-3 border ${formErrors.locationName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                aria-required="true"
                aria-invalid={!!formErrors.locationName}
                aria-describedby={formErrors.locationName ? "locationName-error" : undefined}
              />
              {formErrors.locationName && (
                <p id="locationName-error\" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.locationName}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={`w-full p-3 border ${formErrors.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                aria-required="true"
                aria-invalid={!!formErrors.address}
                aria-describedby={formErrors.address ? "address-error" : undefined}
                placeholder="Street address, city, zip code"
              />
              {formErrors.address && (
                <p id="address-error\" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.address}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="issue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description of Accessibility Issue <span className="text-red-600">*</span>
              </label>
              <textarea
                id="issue"
                name="issue"
                rows={4}
                value={formData.issue}
                onChange={handleChange}
                className={`w-full p-3 border ${formErrors.issue ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                aria-required="true"
                aria-invalid={!!formErrors.issue}
                aria-describedby={formErrors.issue ? "issue-error" : undefined}
                placeholder="Please describe the accessibility barriers at this location in detail"
              />
              {formErrors.issue && (
                <p id="issue-error\" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.issue}
                </p>
              )}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact Information (Optional)</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Providing your contact information helps us follow up if we need more details.
              </p>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>
                
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className={`w-full p-3 border ${formErrors.contactEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                    aria-invalid={!!formErrors.contactEmail}
                    aria-describedby={formErrors.contactEmail ? "contactEmail-error" : undefined}
                  />
                  {formErrors.contactEmail && (
                    <p id="contactEmail-error\" className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {formErrors.contactEmail}
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-gray-700 dark:text-gray-300">
                  I confirm this information is accurate <span className="text-red-600">*</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  By submitting this report, you agree to our terms of service.
                </p>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-2 px-4 bg-primary hover:bg-primary-dark text-white rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
              >
                Submit Report
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="mt-8 bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-3">
          What Makes a Location Inaccessible?
        </h2>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          When reporting inaccessible locations, consider these common barriers:
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>No wheelchair ramps or accessible entrances</li>
          <li>Lack of elevators in multi-story buildings</li>
          <li>Narrow doorways that can't accommodate wheelchairs</li>
          <li>Inaccessible restrooms</li>
          <li>No Braille signage or audio cues for the visually impaired</li>
          <li>Poor lighting that creates visibility issues</li>
          <li>Lack of designated accessible parking spaces</li>
          <li>Absence of staff trained to assist people with disabilities</li>
        </ul>
      </div>
    </PageContainer>
  );
};

export default ReportPage;