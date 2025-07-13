import React from "react";
import YedidyahLangsam from './YL-portrait_W.jpg'
import IraRudowksy from './Ira-Rudowksy.jpg'
import JosephThurm from './Joseph-Thurm.jpg'
import kathychuang from './katychuang.jpg'

const Advising = () => {
  // Common button styles for reusability
  const buttonLinkClass = "inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
  const textLinkClass = "text-blue-500 hover:underline";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-blue-700 mb-6">
        Computer and Information Science Advising
      </h1>
      <p className="text-center text-gray-700 mb-10 max-w-2xl mx-auto">
        Find all the information you need for academic advising in the Computer and Information Science department.
      </p>

      {/* Advising Info Section */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Advising Hours</h2>
        <p className="text-gray-600 mt-2 leading-relaxed">
          🔹 Walk-in advising is available, or you can schedule an appointment by emailing the department. Please check the department website for the most current walk-in hours.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Contact Information</h2>
        <p className="text-gray-600 mt-4">
          <span className="font-medium">📍 Location:</span> 2109 Ingersoll Hall<br/>
                       Brooklyn College<br/>
                       2900 Bedford Avenue<br/>
                       Brooklyn, NY 11210
        </p>
        <p className="text-gray-600 mt-4">
          <span className="font-medium">📞 Phone:</span> 718.951.5657
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-medium">📞 Fax:</span> 718.951.4842
        </p>
        <p className="text-gray-600 mt-2 mb-6">
          <span className="font-medium">📧 Email:</span> <a href="mailto:cis@sci.brooklyn.cuny.edu" className={textLinkClass}>cis@sci.brooklyn.cuny.edu</a>
        </p>

        <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Department Chair</h2>
        <div className="flex flex-col items-center text-center">
          <img src={YedidyahLangsam} alt="Yedidyah Langsam" className="mb-3 rounded-full border-2 border-blue-400 w-32 h-32 object-cover"/>
          <p className="text-gray-600 mb-1">
            <span className="font-medium">📧 Email:</span> <a href="mailto:langsam@sci.brooklyn.cuny.edu" className={textLinkClass}>Yedidyah Langsam</a>
          </p>
          <p className="text-gray-600">
            <span className="font-medium">📞 Phone:</span> 718.951.5000, ext. 2056
          </p>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">More Contact Info</h2>
        <div className="text-center">
          {/* Styled as a button */}
          <a href="http://www.sci.brooklyn.cuny.edu/cis/faculty/" className={buttonLinkClass} target="_blank" rel="noopener noreferrer">
            View Faculty List
          </a>
        </div>
      </div>

      {/* Important Links Section */}
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg mb-8 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">Undergraduate Program Information</h2>
        <ul className="list-disc pl-5 mt-4 space-y-6">
          <li>
            <p className="text-gray-700 mb-2">This is the advice brochure for the undergraduate program:</p>
            {/* Styled as a button */}
            <a href="http://www.sci.brooklyn.cuny.edu/cis/CompSci_UndergradJavaOctober24.pdf" className={buttonLinkClass} target="_blank" rel="noopener noreferrer">
              Undergraduate Advice Brochure
            </a>
            <p className="text-gray-700 mt-4 mb-2">Consult the course offering for the current semester:</p>
            {/* Styled as a button */}
            <a href="http://www.sci.brooklyn.cuny.edu/cis/undergrad/" className={buttonLinkClass} target="_blank" rel="noopener noreferrer">
                Undergraduate Course Offering
            </a>
            <p className="text-gray-700 mt-4 mb-2">Consult a deputy chair for undergraduate program advice:</p>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">CLAS (Day) Deputy Chair</h3>
            <div className="flex flex-col items-center text-center mb-6">
              <img src={IraRudowksy} alt="Ira Rudowsky" height="150" width="150" className="mb-3 rounded-full border-2 border-blue-400 object-cover"/>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">📧 Email:</span> <a href="mailto:rudowsky@brooklyn.cuny.edu" className={textLinkClass}>Professor Ira Rudowksy</a>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">📞 Phone:</span> 718.951.5000, ext. 2062
              </p>
            </div>

            <h3 className="text-lg font-medium text-gray-800 mt-6 mb-3">SGS (Evening) Deputy Chair</h3>
            <div className="flex flex-col items-center text-center">
              <img src={JosephThurm} alt="Joseph Thurm" height="150" width="150" className="mb-3 rounded-full border-2 border-blue-400 object-cover"/>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">📧 Email:</span> <a href="mailto:thurm@sci.brooklyn.cuny.edu" className={textLinkClass}>Associate Professor Joe Thurm</a>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">📞 Phone:</span> 718.951.5000, ext. 2067
              </p>
            </div>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 border-b pb-2">Graduate Program Information</h2>
        <ul className="list-disc pl-5 mt-4 space-y-6">
          <li>
            <p className="text-gray-700 mb-2">This is the advice brochure for the graduate program:</p>
            {/* Styled as a button */}
            <a href="http://www.sci.brooklyn.cuny.edu/cis/CIS-Advice-to-Graduate-Students.pdf" className={buttonLinkClass} target="_blank" rel="noopener noreferrer">
              Graduate Advice Brochure
            </a>
          </li>
          <li>
            <p className="text-gray-700 mt-4 mb-2">Consult the course offering for the current semester.</p>
            {/* Styled as a button */}
            <a href="http://www.sci.brooklyn.cuny.edu/cis/grad/" className={buttonLinkClass} target="_blank" rel="noopener noreferrer">
              Graduate Course Offering
            </a>
            <p className="text-gray-700 mt-4 mb-2">Graduate Deputy Chair</p>
            <div className="flex flex-col items-center text-center">
              <img src={kathychuang} alt="Katherine Chuang" height="150" width="150" className="mb-3 rounded-full border-2 border-blue-400 object-cover"/>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">📧 Email:</span> <a href="mailto:katherine.chuang@brooklyn.cuny.edu" className={textLinkClass}>Professor Katherine Chuang</a>
              </p>
              <p className="text-gray-600">
                <span className="font-medium">📞 Phone:</span> 718.951.5000, ext. 2069
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Advising;