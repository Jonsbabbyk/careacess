import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/layout/PageHeader';
import { HealthIssueReport } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ReportIssuePage: React.FC = () => {
  const [formData, setFormData] = useState<HealthIssueReport>({
    facilityName: '',
    issueCategory: 'Access',
    description: '',
    healthIssue: '',
    contactName: '',
    contactEmail: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.facilityName.trim()) {
      errors.facilityName = 'Facility name is required';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description of the issue is required';
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
      const report: HealthIssueReport = {
        ...formData,
        id: uuidv4(),
        dateReported: new Date().toISOString(),
      };
      
      // In a real app, we would send this data to a server
      console.log('Health Issue Report submitted:', report);
      setIsSubmitted(true);
      
      // Reset form
      setFormData({
        facilityName: '',
        issueCategory: 'Access',
        description: '',
        healthIssue: '',
        contactName: '',
        contactEmail: '',
      });
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="Report a Health Access Issue"
        description="Help us identify and address healthcare accessibility issues in the Bronx. Your report will help improve access to healthcare for everyone."
      />

      {isSubmitted ? (
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <ClipboardCheck className="h-8 w-8 text-green-600 dark:text-green-400 mr-3\" aria-hidden="true" />
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Thank You!</h2>
          </div>
          <p className="mt-3 text-green-700 dark:text-green-300">
            Your report has been submitted successfully. Your feedback helps improve healthcare accessibility in the Bronx.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="mt-4 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
          >
            Submit Another Report
          </button>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label htmlFor="facilityName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Healthcare Facility or Location <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="facilityName"
                name="facilityName"
                value={formData.facilityName}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  formErrors.facilityName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                aria-required="true"
                aria-invalid={!!formErrors.facilityName}
                aria-describedby={formErrors.facilityName ? "facilityName-error" : undefined}
                placeholder="Name of hospital, clinic, or healthcare facility"
              />
              {formErrors.facilityName && (
                <p id="facilityName-error\" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.facilityName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="issueCategory" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Issue Category <span className="text-red-600">*</span>
              </label>
              <select
                id="issueCategory"
                name="issueCategory"
                value={formData.issueCategory}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                aria-required="true"
              >
                <option value="Access">Physical Access Issues</option>
                <option value="Communication">Communication Barriers</option>
                <option value="Transport">Transportation Problems</option>
                <option value="Other">Other Issues</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description of the Issue <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className={`w-full p-3 border ${
                  formErrors.description ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
                aria-required="true"
                aria-invalid={!!formErrors.description}
                aria-describedby={formErrors.description ? "description-error" : undefined}
                placeholder="Please describe the accessibility issue in detail"
              />
              {formErrors.description && (
                <p id="description-error\" className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {formErrors.description}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="healthIssue" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Health Issue Description (Optional)
              </label>
              <textarea
                id="healthIssue"
                name="healthIssue"
                rows={4}
                value={formData.healthIssue}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary"
                placeholder="If you're comfortable, please describe your health concern or symptoms"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                This information helps us understand the impact of accessibility barriers. Your privacy will be protected.
              </p>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Contact Information (Optional)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className={`w-full p-3 border ${
                      formErrors.contactEmail ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    } rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary`}
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
                  id="privacy"
                  name="privacy"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="privacy" className="font-medium text-gray-700 dark:text-gray-300">
                  Privacy Agreement <span className="text-red-600">*</span>
                </label>
                <p className="text-gray-500 dark:text-gray-400">
                  I understand that this information will be handled confidentially and used only to improve healthcare accessibility.
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
          About Healthcare Accessibility Issues
        </h2>
        <p className="text-blue-700 dark:text-blue-300 mb-4">
          Common healthcare accessibility barriers include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-blue-700 dark:text-blue-300">
          <li>Physical barriers (stairs, narrow doorways, lack of ramps)</li>
          <li>Communication barriers (lack of interpreters, unclear signage)</li>
          <li>Transportation difficulties</li>
          <li>Long wait times or appointment scheduling issues</li>
          <li>Lack of accessible medical equipment</li>
          <li>Inadequate accommodation for disabilities</li>
        </ul>
        <p className="mt-4 text-blue-700 dark:text-blue-300">
          Your report helps us identify and address these barriers to ensure everyone can access the healthcare they need.
        </p>
      </div>
    </PageContainer>
  );
};

export default ReportIssuePage;