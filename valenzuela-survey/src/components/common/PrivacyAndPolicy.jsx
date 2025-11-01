import { useState } from 'react';

const PrivacyAndPolicy = ({ isOpen, onClose, onAccept }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">

        <div className="bg-primary text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Privacy Policy & Data Protection</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-highlight transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4 text-gray-700">
            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                1. Data Collection and Usage
              </h3>
              <p className="text-sm leading-relaxed">
                In compliance with Republic Act No. 10173 (Data Privacy Act of 2012) and the 
                Anti-Red Tape Authority (ARTA) guidelines, the City Government of Valenzuela 
                collects your personal information solely for the purpose of improving public 
                service delivery and gathering citizen feedback.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                2. Information We Collect
              </h3>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Basic demographic information (optional)</li>
                <li>Survey responses and feedback</li>
                <li>Service transaction details</li>
                <li>Device and usage information for system improvement</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                3. Data Protection Measures
              </h3>
              <p className="text-sm leading-relaxed">
                All collected data is encrypted during transmission and storage. Access to personal 
                information is restricted to authorized personnel only. We implement industry-standard 
                security measures to protect your data from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                4. Your Rights
              </h3>
              <p className="text-sm leading-relaxed mb-2">
                Under the Data Privacy Act, you have the right to:
              </p>
              <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                <li>Access your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Object to data processing</li>
                <li>Request deletion of your data</li>
                <li>Lodge a complaint with the National Privacy Commission</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                5. Data Retention
              </h3>
              <p className="text-sm leading-relaxed">
                Survey data will be retained for a period of five (5) years for statistical and 
                analytical purposes, after which it will be securely disposed of in accordance 
                with government retention policies.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                6. ARTA Compliance
              </h3>
              <p className="text-sm leading-relaxed">
                This Customer Satisfaction Survey is conducted in compliance with ARTA Memorandum 
                Circular No. 2020-001, requiring all government agencies to implement a standardized 
                feedback mechanism to measure citizen satisfaction and improve service delivery.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-primary mb-2">
                7. Contact Information
              </h3>
              <p className="text-sm leading-relaxed">
                For questions or concerns regarding this privacy policy or your data rights, 
                please contact the City Government of Valenzuela - Information and Communications 
                Technology Office (ICTO) or our Data Protection Officer.
              </p>
            </section>

            <div className="bg-accent bg-opacity-10 p-4 rounded-lg mt-6">
              <p className="text-sm font-medium text-primary">
                By clicking "I Accept" below, you acknowledge that you have read and understood 
                this Privacy Policy and consent to the collection and processing of your data 
                as described herein.
              </p>
            </div>
          </div>
        </div>


        <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={onAccept}
            className="btn-primary"
          >
            I Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyAndPolicy;
