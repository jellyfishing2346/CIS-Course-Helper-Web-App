// src/components/Advising.jsx

import React from "react";
import YedidyahLangsam from './YL-portrait_W.jpg'
import IraRudowksy from './Ira-Rudowksy.jpg'
import JosephThurm from './Joseph-Thurm.jpg'
import kathychuang from './katychuang.jpg'

const Advising = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        <center>Computer and Information Science Advising</center>
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Find all the information you need for academic advising in the Computer and Information Science department.
      </p>

      {/* Advising Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Advising Hours</h2>
        <p className="text-gray-600 mt-2">
          🔹 Walk-in advising is available or you can schedule an appointment by emailing the department.
        </p>
      </div>

      {/* Contact Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Contact Information</h2>
        <p className="text-gray-600 mt-2">
          📍 Location: 2109 Ingersoll Hall
                       Brooklyn College
                       2900 Bedford Avenue
                       Brooklyn, NY 11210
        </p>
        <p className="text-gray-600 mt-2">
          📞 P: 718.951.5657
        </p>
        <p className="text-gray-600 mt-2">
          📞 F: 718.951.4842
        </p>
        <p className="text-gray-600 mt-2">
          📧 Email: <a href="mailto:cis@sci.brooklyn.cuny.edu">cis@sci.brooklyn.cuny.edu</a>
        </p>
        <h2>Department Chair</h2>
        <img src={YedidyahLangsam} alt="Yedidyah Langsam"></img>
        <p className="text-gray-600 mt-2">
          📧 Email: <a href="mailto:langsam@sci.brooklyn.cuny.edu">Yedidyah Langsam</a>
          </p>
          <p>P: 718.951.5000, ext. 2056</p>
        <h2>Contact Info</h2>
        <button href="http://www.sci.brooklyn.cuny.edu/cis/faculty/">Faculty List</button>
      </div>

      {/* Important Links Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Undergraduate Program Information</h2>
        <ul className="list-disc pl-5 mt-2">
          <li className="text-gray-600">
            <p>This is the advice brochure for the undergraduate program</p>
            <button href="http://www.sci.brooklyn.cuny.edu/cis/CompSci_UndergradJavaOctober24.pdf" className="text-blue-500 hover:underline">
              Advice Brochure
            </button>
            <p>Consult the course offering for the current semester.</p>
            <button href="http://www.sci.brooklyn.cuny.edu/cis/undergrad/">
                Course Offering
            </button>
            <p>Consult a deputy chair for undergraduate program advice.</p>
            <p>CLAS (Day) Deputy Chair</p>
            <img src={IraRudowksy} alt="Ira Rudowsky" height="300" width="300"></img>
            <p className="text-gray-600 mt-2">
          📧 Email: <a href="mailto:rudowsky@brooklyn.cuny.edu">Professor Ira Rudowksy</a>
          </p>
          <p>P: 718.951.5000, ext. 2062</p>
          <p>SGS (Evening) Deputy Chair</p>
          <img src={JosephThurm} alt="Joseph Thurm" height="300" width="300"></img>
          <p className="text-gray-600 mt-2">
          📧 Email: <a href="mailto:thurm@sci.brooklyn.cuny.edu">Associate Professor Joe Thurm</a>
          </p>
          <p>P: 718.951.5000, ext. 2067</p>
          </li>
          <h2>Graduate Program Information</h2>
          <li className="text-gray-600">
          <p>This is the advice brochure for the rgraduate program</p>
            <button href="http://www.sci.brooklyn.cuny.edu/cis/CIS-Advice-to-Graduate-Students.pdf" className="text-blue-500 hover:underline">
              Advice Brochure
            </button>
          </li>
          <li className="text-gray-600">
          <p>Consult the course offering for the current semester.</p>
            <button href="http://www.sci.brooklyn.cuny.edu/cis/grad/" className="text-blue-500 hover:underline">
              Course Offering
            </button>
            <p>Graduate Deputy Chair</p>
            <img src={kathychuang} alt="Katherine Chuang" height="300" width="300"></img>
          <p className="text-gray-600 mt-2">
          📧 Email: <a href="mailto:katherine.chuang@brooklyn.cuny.edu">Professor Katherine Chuang</a>
          </p>
          <p>P: 718.951.5000, ext. 2069</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Advising;
