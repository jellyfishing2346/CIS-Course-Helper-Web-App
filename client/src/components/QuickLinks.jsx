// QuickLinks.jsx component
const QuickLinks = () => {
    return (
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Access</h2>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
            <h3 className="text-blue-600 font-medium mb-2">📚 Browse Courses</h3>
          <a 
            href="/courses" 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow 
                       w-full sm:w-1/3 text-center border border-blue-100 hover:border-blue-200"
          >
            <p className="text-sm text-gray-600">Explore all available courses</p>
          </a>

         <h3 className="text-blue-600 font-medium mb-2">✅ Prerequisite Checker</h3>
          <a 
            href="/check-prerequisites" 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow 
                       w-full sm:w-1/3 text-center border border-blue-100 hover:border-blue-200"
          >
            
            <p className="text-sm text-gray-600">Verify course requirements</p>
          </a>
          <h3 className="text-blue-600 font-medium mb-2">🎓 Advising Resources</h3>
          <a 
            href="/advising" 
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow 
                       w-full sm:w-1/3 text-center border border-blue-100 hover:border-blue-200"
          >
            
            <p className="text-sm text-gray-600">Get academic guidance</p>
          </a>
        </div>
      </div>
    );
  };

  export default QuickLinks;