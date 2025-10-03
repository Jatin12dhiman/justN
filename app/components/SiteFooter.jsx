import React from "react";

// Dark green color for buttons and app store links
const DARK_GREEN = "#2A524A";

// Mock navigation data
const navData = {
  discover: ["Miami", "New York", "Chicago", "Florida", "Los Angeles", "San Diego"],
  quickLinks: ["About", "Contact", "FAQ's", "Blog", "Pricing Plans", "Privacy Policy", "Terms & Conditions"],
  contact: {
    email: "hi@justhome.com",
    phone: "(123) 456-7890",
    address: "99 Fifth Avenue, 3rd Floor\nSan Francisco, CA 1980",
  },
};

// Simple link component
const FooterLink = ({ href = "#", children }) => (
  <a href={href} className="text-gray-600 hover:text-gray-900 text-base">
    {children}
  </a>
);

const SiteFooter = () => {
  return (
    <footer className="bg-white pt-10 text-gray-900 border-t border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
      
        {/* Top section: Logo + Socials */}
        <div className="flex justify-between items-center pb-8 border-b border-gray-100">
          {/* Logo */}
          <img src="/images/logo-green.png" alt="Logo" className="h-8 w-auto" />

          {/* Socials with label */}
          <div className="flex items-center space-x-4">
            {/* Text label */}
            <span className="text-gray-700 font-semibold">Follow Us:</span>

            {/* Icons */}
            <div className="flex space-x-3">
              <img src="/images/face.png" alt="Facebook" className="w-5 h-5" />
              <img src="/images/twitter.png" alt="Twitter" className="w-5 h-5" />
              <img src="/images/insta.png" alt="Instagram" className="w-5 h-5" />
              <img src="/images/linkedin.png" alt="LinkedIn" className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-8 gap-8 py-10">
          {/* Subscribe */}
          <div className="col-span-2 md:col-span-2 ">
            <h4 className="font-bold mb-3">Subscribe</h4>
            <div className="flex mb-2">
              <input
                type="email"
                placeholder="Your email"
                className="p-2 border-b border-gray-400 focus:outline-none w-full"
              />
              <button className="ml-2 px-4 py-2 bg-[#2A524A] text-white rounded-full hover:bg-gray-700 transition flex items-center">
                Send <span className="ml-2"> → </span>
              </button>
            </div>
            <p className="text-sm text-gray-500">Subscribe to our newsletter for weekly updates.</p>
          </div>

          {/* Discover */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-bold mb-3">Discover</h4>
            <div className="flex flex-col space-y-1">
              {navData.discover.map((item, i) => (
                <FooterLink key={i}>{item}</FooterLink>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="font-bold mb-3">Quick Links</h4>
            <div className="flex flex-col space-y-1">
              {navData.quickLinks.map((item, i) => (
                <FooterLink key={i}>{item}</FooterLink>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-1 ">
            <h4 className="font-bold ">Contact Us</h4>
            <p className="break-words">{navData.contact.email}</p>
            <p>{navData.contact.phone}</p>
          </div>

          {/* Address */}
          <div className=" col-span-1 md:col-span-1 ">
            <h4 className="font-bold mb-3">Our Address</h4>
            {navData.contact.address.split("\n").map((line, i) => (
              <p key={i}>{line}</p>
            ))}
          </div>

          {/* App Links */}
          <div className="flex flex-col space-y-2 col-span-2">
            {/* Apple Store */}
            <a
              href="#"
              className="flex items-center bg-[#2A524A] rounded-xl px-4 py-3 hover:opacity-90"
            >
              <img src="/images/ap.png" alt="Apple Store" className="h-8 w-8" />
              <span className="mx-3 w-px h-6 bg-white"></span>
              <div className="flex flex-col">
                <span className="text-xs text-white">Download on the</span>
                <span className="text-sm font-semibold text-white">Apple Store</span>
              </div>
            </a>

            {/* Google Play */}
            <a
              href="#"
              className="flex items-center bg-[#2A524A] rounded-xl px-4 py-3 hover:opacity-90"
            >
              <img src="/images/gp.png" alt="Google Play" className="h-8 w-8" />
              <span className="mx-3 w-px h-6 bg-white"></span>
              <div className="flex flex-col">
                <span className="text-xs text-white">Get it on</span>
                <span className="text-sm font-semibold text-white">Google Play</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 pb-6 border-t border-gray-100 text-center text-sm text-gray-500">
          &copy; 2025 JustHome. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
