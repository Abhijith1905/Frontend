import React from 'react';

function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-gray-600">© 2024 EduSupport. All rights reserved.</span>
          <div className="flex gap-8">
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-indigo-600 hover:text-indigo-800 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;