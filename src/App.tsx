/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  Star,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Send
} from 'lucide-react';
import { 
  SERVICES, 
  WHY_CHOOSE_US, 
  WORK_PROCESS, 
  PORTFOLIO_ITEMS, 
  TESTIMONIALS, 
  TECHNOLOGIES 
} from './constants';

const FadeInWhenVisible = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
};

interface ServiceCardProps {
  key?: React.Key;
  service: typeof SERVICES[0];
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      className="group relative p-8 rounded-[2rem] bg-white border border-brand-dark/5 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-full -mr-16 -mt-16 transition-transform duration-700 group-hover:scale-[3]" />
      
      <div className="relative z-10">
        <motion.div 
          whileHover={{ rotate: [0, -10, 10, 0] }}
          className="w-16 h-16 bg-brand-blue/10 text-brand-blue rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300 shadow-lg shadow-brand-blue/5"
        >
          <service.icon size={32} />
        </motion.div>
        <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-brand-blue transition-colors">{service.title}</h3>
        <p className="text-brand-dark/60 leading-relaxed mb-6">{service.description}</p>
        <div className="flex items-center gap-2 text-brand-blue font-bold text-sm opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
          Learn More <ArrowRight size={16} />
        </div>
      </div>
    </motion.div>
  );
};

interface PortfolioCardProps {
  key?: React.Key;
  item: typeof PORTFOLIO_ITEMS[0];
  index: number;
}

const PortfolioCard = ({ item, index }: PortfolioCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group rounded-[2.5rem] overflow-hidden aspect-[4/5] cursor-pointer"
    >
      <motion.img 
        src={item.image} 
        alt={item.title} 
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      
      <motion.div 
        className="absolute inset-0 p-10 flex flex-col justify-end"
        animate={{ y: isHovered ? 0 : 20 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
          className="bg-brand-blue text-white text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full w-fit mb-4"
        >
          {item.category}
        </motion.div>
        <h3 className="text-3xl font-display font-bold text-white mb-2 leading-tight">{item.title}</h3>
        <motion.div 
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="flex items-center gap-2 text-white/70 font-medium"
        >
          View Case Study <ArrowRight size={18} className="text-brand-blue" />
        </motion.div>
      </motion.div>

      <motion.div 
        className="absolute top-6 right-6 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20"
        animate={{ scale: isHovered ? 1 : 0, rotate: isHovered ? 0 : -90 }}
      >
        <ExternalLink size={20} />
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-brand-blue selection:text-white bg-[#FAFAFA]">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-brand-blue z-[60] origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-brand-blue/10">
              <img src="/logo.png" alt="W Tech Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-black text-2xl tracking-tighter text-brand-dark">
              W TECH <span className="text-brand-blue">IT</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-bold text-brand-dark/60 hover:text-brand-blue transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-blue transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a 
              href="#contact" 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-brand-blue text-white px-8 py-3.5 rounded-2xl text-sm font-bold hover:bg-brand-blue/90 transition-all shadow-xl shadow-brand-blue/20 active:scale-95"
            >
              Start a Project
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-md text-brand-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[55] bg-white pt-32 px-10 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a 
                  key={link.name} 
                  href={link.href} 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-display font-black text-brand-dark hover:text-brand-blue transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a 
                href="#contact" 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsMenuOpen(false)}
                className="bg-brand-blue text-white py-6 rounded-[2rem] text-center font-black text-xl shadow-2xl shadow-brand-blue/30"
              >
                Get Started Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-2/3 h-full bg-gradient-to-bl from-brand-blue/10 via-brand-blue/5 to-transparent rounded-bl-[200px]" />
        
        {/* Animated Background Blobs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 -z-10 w-96 h-96 bg-brand-blue/10 blur-[100px] rounded-full" 
        />
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 bg-white border border-brand-dark/5 shadow-xl shadow-black/5 text-brand-blue rounded-full text-xs font-black uppercase tracking-widest mb-10"
            >
              <Sparkles size={16} className="animate-pulse" />
              India's Premier IT Partner
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-[5.5rem] font-display font-black leading-[0.95] mb-10 text-brand-dark tracking-tighter"
            >
              WE BUILD <br />
              <span className="text-brand-blue relative">
                DIGITAL
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1, delay: 1 }}
                  className="absolute bottom-2 left-0 h-3 bg-brand-blue/20 -z-10" 
                />
              </span> <br />
              EXCELLENCE.
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-xl text-brand-dark/50 mb-12 max-w-xl leading-relaxed font-medium"
            >
              Transforming businesses with innovative technology, creative design, and strategic digital marketing. Your vision, our expertise.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              <a href="#services" className="group bg-brand-blue text-white px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-brand-blue/30">
                Our Services 
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  <ArrowRight size={22} />
                </motion.div>
              </a>
              <a href="#portfolio" className="bg-white text-brand-dark border-2 border-brand-dark/5 px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-brand-dark hover:text-white transition-all shadow-xl shadow-black/5">
                View Work
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] border-[12px] border-white">
              <img 
                src="/banner.jpg" 
                alt="IT Solutions" 
                className="w-full h-auto scale-105 hover:scale-100 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-4 md:-bottom-10 md:-left-10 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl z-20 border border-brand-dark/5 flex items-center gap-4 md:gap-5"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-emerald-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                <Star fill="currentColor" size={24} className="md:w-8 md:h-8" />
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-brand-dark">4.9/5</div>
                <div className="text-[10px] md:text-sm font-bold text-brand-dark/40 uppercase tracking-widest">Client Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm mb-4"
            >
              Expertise
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-7xl font-display font-black mb-6 tracking-tighter"
            >
              Services We <span className="text-brand-blue">Master</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-brand-dark/40 max-w-2xl mx-auto text-xl font-medium"
            >
              We don't just provide services; we craft digital success stories tailored to your unique business needs.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service, index) => (
              <ServiceCard key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-padding bg-brand-dark text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm mb-4"
              >
                Showcase
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-7xl font-display font-black tracking-tighter"
              >
                Selected <span className="text-brand-blue">Projects</span>
              </motion.h2>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white text-brand-dark px-10 py-5 rounded-[2rem] font-black text-lg flex items-center gap-3 transition-all shadow-2xl shadow-white/5"
            >
              View All Work 
              <motion.div className="group-hover:translate-x-2 transition-transform">
                <ArrowRight size={22} className="text-brand-blue" />
              </motion.div>
            </motion.button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {PORTFOLIO_ITEMS.map((item, index) => (
              <PortfolioCard key={item.title} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Work Process */}
      <section id="process" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-7xl font-display font-black mb-6 tracking-tighter">How We <span className="text-brand-blue">Work</span></h2>
            <p className="text-brand-dark/40 max-w-2xl mx-auto text-lg md:text-xl font-medium">A transparent and efficient workflow designed for excellence.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16 relative">
            {WORK_PROCESS.map((step, index) => (
              <motion.div 
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="text-[6rem] md:text-[10rem] font-display font-black text-brand-dark/5 absolute -top-12 md:-top-20 -left-6 md:-left-10 pointer-events-none group-hover:text-brand-blue/10 transition-colors">
                  {step.step}
                </div>
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-brand-blue/10 text-brand-blue rounded-3xl flex items-center justify-center mb-8 group-hover:bg-brand-blue group-hover:text-white transition-all duration-500 shadow-xl shadow-brand-blue/5">
                    <step.icon size={36} />
                  </div>
                  <h3 className="text-2xl font-display font-black mb-4">{step.title}</h3>
                  <p className="text-brand-dark/50 leading-relaxed text-lg">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-[#0F0F0F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-20 items-center">
            <div className="lg:col-span-1">
              <div className="text-brand-blue font-black uppercase tracking-[0.3em] text-sm mb-6">Testimonials</div>
              <h2 className="text-4xl md:text-5xl font-display font-black mb-8 leading-tight tracking-tighter">What Our <br /> <span className="text-brand-blue">Clients</span> Say.</h2>
              <p className="text-white/40 text-lg md:text-xl font-medium mb-10">Trusted by hundreds of businesses across India for our commitment to quality and innovation.</p>
              <div className="flex gap-4">
                <button className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-dark transition-all">
                  <ChevronRight size={24} className="rotate-180" />
                </button>
                <button className="w-16 h-16 rounded-full bg-brand-blue flex items-center justify-center hover:bg-brand-blue/80 transition-all shadow-xl shadow-brand-blue/20">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {TESTIMONIALS.slice(0, 2).map((review, index) => (
                <motion.div 
                  key={review.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm"
                >
                  <div className="flex gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-2xl font-medium italic mb-10 leading-relaxed text-white/80">"{review.content}"</p>
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-brand-blue rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                      {review.name[0]}
                    </div>
                    <div>
                      <div className="font-black text-xl">{review.name}</div>
                      <div className="text-brand-blue font-bold text-sm uppercase tracking-widest">{review.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-brand-dark rounded-[4rem] overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-blue/10 -z-0 rounded-l-full blur-[100px]" />
            
            <div className="grid lg:grid-cols-2 relative z-10">
              <div className="p-8 md:p-20 text-white">
                <h2 className="text-4xl md:text-7xl font-display font-black mb-10 tracking-tighter leading-[0.9]">Ready to <br /> <span className="text-brand-blue">Innovate?</span></h2>
                <p className="text-white/50 text-lg md:text-xl mb-12 md:mb-16 max-w-md">Let's discuss how we can help your business grow with our expert IT solutions.</p>
                
                <div className="space-y-8 md:space-y-10">
                  <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:bg-brand-blue transition-all duration-500">
                      <Phone size={28} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-sm text-white/30 uppercase font-black tracking-[0.2em] mb-1">Direct Line</div>
                      <div className="text-xl md:text-2xl font-black">+91-XXXXXXXXXX</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 md:gap-8 group cursor-pointer">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:bg-brand-blue transition-all duration-500">
                      <Mail size={28} className="text-brand-blue group-hover:text-white" />
                    </div>
                    <div>
                      <div className="text-[10px] md:text-sm text-white/30 uppercase font-black tracking-[0.2em] mb-1">Support Email</div>
                      <div className="text-xl md:text-2xl font-black">info@wtechitsolution.com</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white m-6 md:m-12 rounded-[3rem] p-10 md:p-16 shadow-2xl">
                <form className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-brand-dark/40 uppercase tracking-widest ml-1">Name</label>
                      <input type="text" className="w-full px-6 py-5 rounded-2xl bg-brand-dark/5 border-2 border-transparent focus:border-brand-blue focus:bg-white transition-all outline-none font-bold text-brand-dark" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-brand-dark/40 uppercase tracking-widest ml-1">Email</label>
                      <input type="email" className="w-full px-6 py-5 rounded-2xl bg-brand-dark/5 border-2 border-transparent focus:border-brand-blue focus:bg-white transition-all outline-none font-bold text-brand-dark" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-brand-dark/40 uppercase tracking-widest ml-1">Message</label>
                    <textarea rows={4} className="w-full px-6 py-5 rounded-2xl bg-brand-dark/5 border-2 border-transparent focus:border-brand-blue focus:bg-white transition-all outline-none font-bold text-brand-dark" placeholder="Tell us about your project goals..."></textarea>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-brand-blue text-white py-6 rounded-2xl font-black text-xl shadow-2xl shadow-brand-blue/30 hover:bg-brand-blue/90 transition-all"
                  >
                    Send Inquiry
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white pt-24 pb-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-50" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-blue/5 blur-[120px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center overflow-hidden shadow-xl shadow-brand-blue/20">
                  <img src="/logo.png" alt="W Tech Logo" className="w-full h-full object-contain p-1" />
                </div>
                <span className="font-display font-black text-2xl tracking-tighter">W TECH <span className="text-brand-blue">IT</span></span>
              </div>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-8">
                Empowering businesses with smart, scalable, and result-oriented IT solutions across India. Your growth is our priority.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" }
                ].map((social, i) => (
                  <motion.a 
                    key={i}
                    href={social.href}
                    whileHover={{ y: -5, scale: 1.1 }}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-white uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-brand-blue" /> Quick Links
              </h4>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-white/50 font-bold hover:text-brand-blue hover:translate-x-2 transition-all flex items-center gap-2 group">
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-black text-white uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-brand-blue" /> Our Services
              </h4>
              <ul className="space-y-4">
                {SERVICES.slice(0, 5).map(service => (
                  <li key={service.title}>
                    <a href="#services" className="text-white/50 font-bold hover:text-brand-blue hover:translate-x-2 transition-all flex items-center gap-2 group">
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {service.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-black text-white uppercase tracking-widest text-sm mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-brand-blue" /> Newsletter
              </h4>
              <p className="text-white/40 text-sm font-medium mb-6">
                Subscribe to our newsletter to get the latest updates and news.
              </p>
              <form className="relative">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-14 text-white placeholder:text-white/20 focus:outline-none focus:border-brand-blue transition-colors font-bold"
                />
                <button className="absolute right-2 top-2 bottom-2 w-10 h-10 bg-brand-blue rounded-xl flex items-center justify-center text-white hover:bg-brand-blue/80 transition-all">
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-white/30 font-bold text-sm flex items-center gap-2">
              <span>© {new Date().getFullYear()} W TECH IT SOLUTION.</span>
              <span className="hidden md:inline w-1 h-1 bg-white/20 rounded-full" />
              <span>ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex gap-8 text-white/30 font-bold text-sm">
              <a href="#" className="hover:text-brand-blue transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-brand-blue transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
