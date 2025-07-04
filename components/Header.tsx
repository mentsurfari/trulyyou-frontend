

import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import NotificationsPopover from './NotificationsPopover';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'The Sanctuary', path: '/sanctuary'},
  { name: 'The Library', path: '/library' },
  { name: 'Motivation Compass', path: '/motivation-compass' },
  { name: 'Prep Kit', path: '/prep-kit' },
  { name: 'Our Philosophy', path: '/philosophy' },
  { name: 'For Surgeons', path: '/for-surgeons' },
];

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isNotificationsOpen, setNotificationsOpen] = React.useState(false);
  const { isAuthenticated, user, logout, unreadCount } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const activeLinkStyle = {
    color: '#2A9D8F',
    textDecoration: 'underline',
    textUnderlineOffset: '6px'
  };
  
  const isSurgeon = user?.roles?.includes('surgeon');

  const AuthNav: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => {
    if (isAuthenticated) {
      return (
        <>
          {isSurgeon && (
            <NavLink
              to="/surgeon-dashboard"
              className={isMobile ? "text-brand-charcoal hover:text-brand-teal transition-colors duration-300 block text-center py-2" : "text-brand-charcoal hover:text-brand-teal transition-colors duration-300"}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => (isActive ? activeLinkStyle : {})}
            >
              Surgeon Portal
            </NavLink>
          )}
           <NavLink
              to="/profile"
              className={isMobile ? "text-brand-charcoal hover:text-brand-teal transition-colors duration-300 block text-center py-2" : "text-brand-charcoal hover:text-brand-teal transition-colors duration-300"}
              onClick={() => setIsOpen(false)}
              style={({ isActive }) => (isActive ? activeLinkStyle : {})}
            >
              My Profile
            </NavLink>
          <button
            onClick={handleLogout}
            className={isMobile ? "w-full bg-brand-sand text-brand-charcoal font-semibold px-5 py-2 rounded-full hover:bg-brand-charcoal hover:text-white transition-all duration-300 shadow-sm text-center" :"bg-brand-sand text-brand-charcoal font-semibold px-5 py-2 rounded-full hover:bg-brand-charcoal hover:text-white transition-all duration-300 shadow-sm"}
          >
            Logout
          </button>
        </>
      );
    }
    return (
       <>
        <NavLink
            to="/login"
            className={isMobile ? "text-brand-charcoal hover:text-brand-teal transition-colors duration-300 block text-center py-2" : "text-brand-charcoal hover:text-brand-teal transition-colors duration-300"}
            onClick={() => setIsOpen(false)}
            style={({ isActive }) => (isActive ? activeLinkStyle : {})}
        >
            Login
        </NavLink>
        <NavLink
            to="/signup"
            className={isMobile ? "bg-brand-teal text-white font-semibold px-5 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300 shadow-sm text-center" : "bg-brand-teal text-white font-semibold px-5 py-2 rounded-full hover:bg-brand-charcoal transition-all duration-300 shadow-sm"}
            onClick={() => setIsOpen(false)}
        >
            Sign Up
        </NavLink>
       </>
    );
  };


  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.path === '/'}
                className="text-brand-charcoal hover:text-brand-teal transition-colors duration-300 text-sm"
                style={({ isActive }) => (isActive ? activeLinkStyle : {})}
              >
                {item.name}
              </NavLink>
            ))}
            <div className='w-px h-6 bg-gray-300' />
            {isAuthenticated && (
                <div className="relative">
                     <button onClick={() => setNotificationsOpen(prev => !prev)} className="relative text-brand-charcoal hover:text-brand-teal transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                        {unreadCount > 0 && <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">{unreadCount}</span>}
                    </button>
                    {isNotificationsOpen && <NotificationsPopover onClose={() => setNotificationsOpen(false)} />}
                </div>
            )}
            <AuthNav />
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-charcoal focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path></svg>
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink key={item.name} to={item.path} end={item.path === '/'} onClick={() => setIsOpen(false)} className="text-brand-charcoal hover:text-brand-teal transition-colors duration-300 block text-center py-2" style={({ isActive }) => (isActive ? activeLinkStyle : {})}>
                  {item.name}
                </NavLink>
              ))}
               <hr />
               <AuthNav isMobile={true}/>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
