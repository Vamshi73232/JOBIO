import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left side: brand + copyright */}
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-bold">Job Io</h2>
            <p className="text-sm">© 2026 Your Company. All rights reserved.</p>
          </div>

          {/* Right side: social links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* GitHub */}
            <a
              href="https://github.com/your-username"
              className="hover:text-gray-400"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 
                  12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                  0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 
                  1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 
                  3.492.998.108-.776.418-1.305.762-1.605-2.665-.305-5.466-1.332-5.466-5.93 
                  0-1.31.468-2.381 1.236-3.221-.124-.303-.536-1.523.117-3.176 
                  0 0 1.008-.322 3.301 1.23a11.52 11.52 0 013.003-.404c1.018.005 
                  2.042.138 3.003.404 2.291-1.552 3.297-1.23 
                  3.297-1.23.655 1.653.243 2.873.12 3.176.77.84 
                  1.235 1.911 1.235 3.221 0 4.61-2.804 5.624-5.475 
                  5.921.43.372.823 1.102.823 2.222 0 1.606-.015 
                  2.896-.015 3.286 0 .319.216.694.825.576C20.565 
                  22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/your-username"
              className="hover:text-gray-400"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 
                  0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 
                  1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 
                  4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 
                  0-1.106.895-2 2-2 1.104 0 2 .895 2 
                  2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696zM22.225 
                  0H1.771C.791 0 0 .774 0 1.729v20.542C0 
                  23.226.792 24 1.771 24h20.451c.979 0 
                  1.771-.774 1.771-1.729V1.729C24 .774 
                  23.205 0 22.225 0z"
                />
              </svg>
            </a>

            {/* LeetCode */}
            <a
              href="https://leetcode.com/your-username"
              className="hover:text-gray-400"
              aria-label="LeetCode"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.373 0 0 5.373 0 12c0 
                  6.627 5.373 12 12 12s12-5.373 
                  12-12c0-6.627-5.373-12-12-12zm0 
                  22c-5.523 0-10-4.477-10-10S6.477 
                  2 12 2s10 4.477 10 10-4.477 
                  10-10 10zm-1-15l-5 5 5 5v-3h4v-4h-4V7z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
