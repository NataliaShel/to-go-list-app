import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white px-4 py-6 mt-auto">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} To-Do List.
        </p>

        {/* 💡 Ключовий момент — flex-col + gap + full-width link containers */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="w-full">
            <Link
              to="/privacy-policy"
              className="w-full block text-sm hover:text-gray-400 text-center"
            >
              Політика конфіденційності
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/terms"
              className="w-full block text-sm hover:text-gray-400 text-center"
            >
              Умови використання
            </Link>
          </div>
          <div className="w-full">
            <Link
              to="/contacts"
              className="w-full block text-sm hover:text-gray-400 text-center"
            >
              Контакти
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
