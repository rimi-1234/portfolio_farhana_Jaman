/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Bell,
  Phone,
  MapPin,
  Mail,
  Menu,
  X,
  Linkedin,
  Github,
  ExternalLink,
  Loader2
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2'; // Import SweetAlert2

// --- Shared Components ---

const SocialIcon: React.FC<{ children: React.ReactNode; href?: string; className?: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, href = "#", className = "", ...props }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-12 h-12 bg-gray-800/50 hover:bg-gray-700/50 rounded-md flex items-center justify-center transition duration-300 text-gray-300 hover:text-white ${className}`}
    {...props}
  >
    {children}
  </a>
);

const SectionHeading = ({ title, subtitle, badge }: { title: React.ReactNode; subtitle?: string; badge: string }) => (
  <div className="mb-8">
    <div className="inline-block bg-emerald-600 text-white py-2 px-5 mb-6 text-sm font-semibold tracking-wider rounded-sm">
      {badge}
    </div>
    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-display">
      {title}
    </h2>
    {subtitle && (
      <p className="text-gray-400 leading-relaxed max-w-lg">
        {subtitle}
      </p>
    )}
  </div>
);

const ProgressBar = ({ label, percentage }: { label: string; percentage: number }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-white">{label}</span>
      <span className="text-sm font-medium text-gray-400">{percentage}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2.5">
      <div
        className="bg-emerald-600 h-2.5 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

// --- Layout Components ---

const Footer = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // SweetAlert for Newsletter
    Swal.fire({
      title: 'Subscribed!',
      text: 'Thank you for subscribing to the newsletter.',
      icon: 'success',
      confirmButtonColor: '#059669', // Emerald-600
      background: '#1D1D1D',
      color: '#fff'
    });
  };

  return (
    <footer className="bg-[#1D1D1D] border-t border-gray-800 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h1 className="text-2xl font-bold font-display tracking-wider mb-4">
              FAR<span className="text-emerald-600">HANA</span><sup className="text-xs">®</sup>
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Committed to building efficient, scalable, and intuitive full-stack solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-600">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About</Link></li>
              <li><Link to="/portfolio" className="hover:text-white transition">Portfolio</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-600">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><MapPin size={16} /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2"><Phone size={16} /> +8801783540827</li>
              <li className="flex items-center gap-2"><Mail size={16} /> zfarhana156@gmail.com</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-600">Newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter email"
                required
                className="bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-600 transition"
              />
              <button className="bg-emerald-600 text-white text-sm font-bold uppercase py-2 rounded hover:bg-emerald-700 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 Farhana Jaman. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="https://github.com/rimi-1234/" className="text-gray-400 hover:text-emerald-600 transition"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/farhana-jaman/" className="text-gray-400 hover:text-emerald-600 transition"><Linkedin size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Skills", path: "/skills" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="bg-[#1D1D1D] sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between text-white">
          <Link to="/" className="flex items-center">
            <h1 className="text-3xl font-bold font-display tracking-wider cursor-pointer">
              FAR<span className="text-emerald-600">HANA</span><sup className="text-xs">®</sup>
            </h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium uppercase tracking-wider">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition duration-300 ${isActive ? 'text-emerald-600' : 'hover:text-emerald-600'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <button className="relative hover:text-emerald-600 transition duration-300">
              <Bell size={24} />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-[#1D1D1D] bg-emerald-600 transform translate-x-1/2 -translate-y-1/2"></span>
            </button>
            <Link
              to="/contact"
              className="bg-emerald-600 text-white px-5 py-3 rounded-md text-xs font-bold uppercase tracking-wider flex items-center hover:bg-emerald-700 transition duration-300 shadow-lg shadow-emerald-600/30"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white hover:text-emerald-600 transition"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="lg:hidden bg-[#1D1D1D] border-t border-gray-800"
        >
          <div className="flex flex-col p-6 space-y-4 text-sm font-medium uppercase tracking-wider text-white">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block py-2 hover:text-emerald-600"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-emerald-600 text-center text-white px-5 py-3 rounded-md mt-4 block"
              onClick={() => setIsOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
};

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#111111]">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

// --- Section/Page Components ---

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="container mx-auto px-6 py-12"
    >
      <div className="w-full bg-[#1D1D1D] rounded-lg border border-gray-700/50 p-6 md:p-12 overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
          <div className="text-white">
            <span className="bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-md inline-block uppercase tracking-widest mb-6">
              MERN Stack Developer
            </span>
            <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-7xl leading-tight">
              Hello, I'm <br /> Farhana Jaman
            </h2>
            <p className="text-gray-400 mt-6 text-lg max-w-lg leading-relaxed">
              Passionate MERN Stack Developer proficient in React.js, Node.js, Express.js, and MongoDB. Strong background in crafting secure RESTful services.
            </p>

            <div className="mt-12 flex flex-wrap gap-6 items-center">
              <div className="flex items-center space-x-3">
                <SocialIcon href="https://github.com/rimi-1234/" aria-label="GitHub"><Github size={20} /></SocialIcon>
                <SocialIcon href="https://www.linkedin.com/in/farhana-jaman/" aria-label="LinkedIn"><Linkedin size={20} /></SocialIcon>
                <SocialIcon href="mailto:zfarhana156@gmail.com" aria-label="Email"><Mail size={20} /></SocialIcon>
              </div>
              <div className="flex items-center space-x-4">
                {/* --- UPDATE 1: Replaced Phone icon with Small Image --- */}
                <div className="w-12 h-12 bg-gray-800/50 rounded-md flex items-center justify-center overflow-hidden border border-gray-700">
                    <img 
                      src="https://i.ibb.co.com/3yX1K51Z/cdp-372.jpg" 
                      alt="Farhana" 
                      className="w-full h-full object-cover" 
                    />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">CONTACT ME</p>
                  <p className="text-white text-lg font-semibold tracking-wider">+880 178 354 0827</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            {/* --- UPDATE 2: Replaced Text Placeholder with Large Image --- */}
            <div className="relative z-10 max-w-full h-[500px] flex items-center justify-center">
               <img 
                 src="https://i.ibb.co.com/3yX1K51Z/cdp-372.jpg" 
                 alt="Farhana Jaman" 
                 className="w-full h-full object-cover rounded-lg shadow-2xl border border-gray-700" 
               />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="font-display py-20 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-2">
            {/* --- UPDATE 3: Replaced Text Placeholder with Profile Image --- */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl group bg-gray-800 h-96 flex items-center justify-center border border-gray-700">
              <img 
                 src="https://i.ibb.co.com/3yX1K51Z/cdp-372.jpg" 
                 alt="Farhana Jaman" 
                 className="w-full h-full object-cover transition duration-500 group-hover:scale-105" 
               />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-500"></div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              I'm <span className="text-emerald-600">Farhana Jaman.</span>
            </h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-200 mb-6">
              MERN Stack Developer
            </h3>
            <p className="text-base text-gray-400 mb-8 leading-relaxed">
              I have a strong background in crafting secure RESTful services and leveraging competitive programming skills. I am committed to building efficient, scalable, and intuitive full-stack solutions.
            </p>

            <div className="space-y-4 mb-10">
              {[
                { label: "DEGREE", value: "B.Sc in CSE" },
                { label: "UNIVERSITY", value: "East West University" },
                { label: "LOCATION", value: "Dhaka, Bangladesh" },
                { label: "PHONE", value: "+880 178 354 0827" },
                { label: "EMAIL", value: "zfarhana156@gmail.com" },
                { label: "LANGUAGES", value: "English, Bangla, Hindi" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <span className="font-semibold text-gray-100 w-32">{item.label}</span>
                  <span className="text-gray-400">: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const SkillsSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="font-display py-20 sm:py-24 bg-[#111111]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <SectionHeading
            badge="PROFESSIONAL SKILLS"
            title={<>My Technical <span className="text-emerald-600">Expertise.</span></>}
            subtitle="Proficient in the full MERN stack and modern web tools."
          />
        </div>

        <div className="max-w-5xl mx-auto bg-gray-900/40 p-8 sm:p-12 rounded-lg border border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
            <div className="space-y-2">
              <h3 className="text-emerald-500 font-bold mb-4">Frontend</h3>
              <ProgressBar label="React.js / Next.js" percentage={90} />
              <ProgressBar label="Tailwind CSS" percentage={95} />
              <ProgressBar label="React Router" percentage={85} />
            </div>
            <div className="space-y-2">
              <h3 className="text-emerald-500 font-bold mb-4">Backend & Tools</h3>
              <ProgressBar label="Node.js / Express.js" percentage={85} />
              <ProgressBar label="MongoDB" percentage={80} />
              <ProgressBar label="Firebase / JWT" percentage={75} />
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <a
            className="inline-block bg-emerald-600 text-white font-semibold py-4 px-10 rounded-md hover:bg-emerald-700 transition-colors duration-300 shadow-lg cursor-pointer"
            href="/Farhana_jaman_resume.pdf"
            download="Farhana_Jaman_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD RESUME
          </a>
        </div>
      </div>
    </motion.section>
  );
};

const PortfolioSection = () => {
  const projects = [
    {
      title: "TradeShift",
      category: "E-Commerce Web Platform",
      description: "Full-stack platform enabling secure trading with Firebase login, real-time export management, and dark/light mode.",
      stack: "React.js, Tailwind, Node.js, Express, MongoDB",
      link: "https://react-tract-shift-client.vercel.app/",
      color: "text-emerald-500",
      hoverColor: "group-hover:text-emerald-500"
    },
    {
      title: "Food Menu",
      category: "Food Ordering Platform",
      description: "App with admin dashboard to manage products. Features Google/Email login, dynamic pages, and full CRUD.",
      stack: "Next.js, Node.js, Express, MongoDB, NextAuth",
      link: "https://next-js-client-side-lime.vercel.app/",
      color: "text-emerald-500",
      hoverColor: "group-hover:text-emerald-500"
    },
    {
      title: "ToyVerse",
      category: "Toy Store Platform",
      description: "Marketplace to browse & review toys. Features 'Shop by Age', authentication, and Toast notifications.",
      stack: "React, Firebase, Tailwind, DaisyUI",
      link: "https://farhana-toy-verse-project.netlify.app/",
      color: "text-emerald-500",
      hoverColor: "group-hover:text-emerald-500"
    },
    {
      title: "Hero.iApp",
      category: "App Store Web App",
      description: "Interactive app store simulation. Features install/uninstall logic using LocalStorage and data visualization charts.",
      stack: "React.js, Tailwind, Recharts, LocalStorage",
      link: "https://react-hero-app-project-rimi-1234.netlify.app/",
      color: "text-emerald-500",
      hoverColor: "group-hover:text-emerald-500"
    },
    {
      title: "Green Earth",
      category: "Environmental Platform",
      description: "A platform dedicated to environmental sustainability, promoting eco-friendly awareness and green living.",
      stack: "React.js, Tailwind CSS",
      link: "https://green-earth-rimi-1234.netlify.app/",
      color: "text-emerald-500",
      hoverColor: "group-hover:text-emerald-500"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="font-display py-20 sm:py-24 bg-[#111111]"
    >
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionHeading
            badge="PORTFOLIO"
            title={<>My Latest <span className="text-emerald-600">Work.</span></>}
            subtitle="Check out some of my recent full-stack and frontend projects."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
          {projects.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1a1a1a] p-6 rounded-lg text-left hover:bg-[#252525] transition duration-300 border border-gray-800 group flex flex-col h-full"
            >
              <div className="mb-4 flex-grow">
                <span className={`${item.color} text-xs font-bold uppercase tracking-widest`}>{item.category}</span>
                <h3 className={`text-xl font-bold text-white mt-2 mb-2 ${item.hoverColor} transition`}>{item.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                <div className="text-xs text-gray-500 font-mono border-t border-gray-800 pt-4">
                  <span className="font-semibold text-gray-400">Stack:</span> {item.stack}
                </div>
              </div>

              <div className="mt-auto">
                <a
                  style={{ transition: 'color 0.3s' }}
                  className="inline-flex items-center text-white font-semibold text-sm hover:text-emerald-500 transition-colors duration-300"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VIEW PROJECT <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

const ContactSection = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
    const SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g. service_z3x...
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g. template_k9...
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // e.g. user_123...

    if (form.current) {
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
        .then((result) => {
          console.log(result.text);
          setLoading(false);
          // SweetAlert Success
          Swal.fire({
            title: 'Message Sent!',
            text: 'I will get back to you as soon as possible.',
            icon: 'success',
            confirmButtonColor: '#059669', // Emerald-600
            background: '#1D1D1D',
            color: '#fff'
          });
          if (form.current) form.current.reset();
        }, (error) => {
          console.log(error.text);
          setLoading(false);
          // SweetAlert Error
          Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong. Please try again later.',
            icon: 'error',
            confirmButtonColor: '#d33',
            background: '#1D1D1D',
            color: '#fff'
          });
        });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="font-display bg-[#111111] text-gray-300 py-20 sm:py-24 flex-grow"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">
          <div className="space-y-8">
            <SectionHeading
              badge="CONTACT ME"
              title={<>Let's <span className="text-emerald-600">Collaborate</span></>}
              subtitle="Interested in hiring me for your project or just want to say hi? You can fill in the contact form or send me an email."
            />

            <div className="space-y-6">
              {[
                { icon: <MapPin size={24} />, title: "Address", text: "Dhaka, Bangladesh" },
                { icon: <Phone size={24} />, title: "Phone", text: "+880 178 354 0827" },
                { icon: <Mail size={24} />, title: "Email", text: "zfarhana156@gmail.com" }
              ].map((item, i) => (
                <div key={i} className="flex items-start group">
                  <div className="text-emerald-600 mt-1 mr-4 group-hover:scale-110 transition duration-300">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-white uppercase tracking-wider">{item.title}</h3>
                    <p className="text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <SocialIcon href="https://github.com/rimi-1234/"><Github size={20} /></SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/farhana-jaman/"><Linkedin size={20} /></SocialIcon>
              <SocialIcon href="mailto:zfarhana156@gmail.com"><Mail size={20} /></SocialIcon>
            </div>
          </div>

          <div className="bg-gray-900/40 p-8 sm:p-10 rounded-lg backdrop-blur-sm border border-gray-800">
            <h3 className="text-xl font-semibold text-white mb-6 uppercase tracking-wider">SEND A MESSAGE</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <div>
                <input
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  name="user_name"
                  placeholder="Name"
                  type="text"
                  required
                />
              </div>
              <div>
                <input
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  name="user_email"
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
              <div>
                <textarea
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-md py-3 px-4 text-white placeholder-gray-400 focus:ring-emerald-600 focus:border-emerald-600 transition"
                  name="message"
                  placeholder="Message"
                  rows={4}
                  required
                ></textarea>
              </div>
              <div>
                <button
                  className={`w-full text-white font-semibold py-4 px-10 rounded-md transition-colors duration-300 shadow-lg flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700`}
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <> <Loader2 className="animate-spin" /> Sending... </>
                  ) : (
                    "SEND MESSAGE"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// --- Page Aggregation ---

const Home = () => (
  <>
    <HeroSection />
    <AboutSection />
    <SkillsSection />
    <PortfolioSection />
    <ContactSection />
  </>
);

// --- App Root ---

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutSection />} />
          <Route path="skills" element={<SkillsSection />} />
          <Route path="portfolio" element={<PortfolioSection />} />
          <Route path="contact" element={<ContactSection />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;