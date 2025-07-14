import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,coding,teamwork')" }}
    >
      {/* Header Section */}
      <div className="text-center bg-blue-600 bg-opacity-80 p-10 w-full text-white shadow-md">
        <h1 className="text-5xl font-extrabold mb-4">Welcome to the BugTerminator</h1>
        <p className="text-xl">Track, manage, and resolve bugs efficiently with your team!</p>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-4 gap-6 p-10 w-full">
        {/* Box 1: What Is This? */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">What Is This?</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            <strong>BugTerminator</strong> is a web application designed to help teams efficiently track and resolve software bugs.
            Built with modern technologies, it supports seamless collaboration for desktop, mobile devices, and tablets.
          </p>
        </div>

        {/* Box 2: Key Features */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed text-justify">
            <li>Register and monitor projects with team members.</li>
            <li>Track bugs with severity, priority, and commit references.</li>
            <li>Assign bugs to team members and update statuses.</li>
            <li>Role-based permissions for project members and testers.</li>
            <li>
              Inspired by platforms like{' '}
              <a
                href="https://www.bugzilla.org/"
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Bugzilla
              </a>.
            </li>
          </ul>
        </div>

        {/* Box 3: How It Works */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">How It Works</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            <strong>Project Members (PMs):</strong> Create and manage projects, view bugs, and update statuses.<br />
            <strong>Testers (TSTs):</strong> Add and track bugs, providing detailed information.<br />
            Collaborate seamlessly to ensure faster bug resolution!
          </p>
        </div>

        {/* Box 4: Meet the Team */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-blue-600 mb-4 text-center">Meet the Team</h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            This project was developed as part of the <strong>Web Technologies Seminar</strong> by a dedicated team of students from 
            the <strong>3rd year of Economic Informatics</strong>, Faculty of Cybernetics, Statistics and Economic Informatics.
          </p>
          <p className="text-gray-700 mt-2 text-lg leading-relaxed">
            The team members are:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg mt-1">
            <li>Carpenco Daniel</li>
            <li>Chiroiu Mihai</li>
            <li>Ciorici Miroslav</li>
          </ul>
          <p className="text-gray-700 mt-2 text-lg leading-relaxed text-justify">
            We would like to express our gratitude to our professor, <strong>Mete Abduraman</strong>, for his guidance and support throughout this project.
          </p>
        </div>
      </div>

      {/* Box 5: Ready to Start */}
      <div className="flex justify-center items-center w-full p-10 -mb-120">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-[500px] flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-4">Ready to Start?</h2>
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
            Sign in to begin managing your projects and tracking bugs like a pro!
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-blue-700 shadow-md transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;