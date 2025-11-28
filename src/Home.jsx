import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Lenis from 'lenis';
import {
  Phone,
  Mail,
  MapPin,
  Menu,
  X,
  Heart,
  Activity,
  Syringe,
  UserCheck,
  Clock,
  Users,
  Stethoscope,
  Instagram,
  Home as HomeIcon,
  CheckCircle,
  ChevronDown,
  MessageCircle,
  Facebook,
  Accessibility,
  Upload,
  FileText
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { useConfig } from './context/ConfigContext';

// --- GSAP-like Animation Engine (High Performance) ---
// שימוש ב-IntersectionObserver לחשיפה חכמה ללא הכבדה על הגלילה
const useScrollReveal = (delay = 0, threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element); // Run once for better performance
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
};

const Reveal = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, isVisible] = useScrollReveal(delay);

  // GSAP-like ease-out-quart cubic-bezier for luxurious feel
  const transitionStyle = {
    transition: `all 1.2s cubic-bezier(0.25, 1, 0.5, 1) ${delay}ms`,
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'translate3d(0,0,0)'
      : direction === 'up' ? 'translate3d(0, 40px, 0)'
        : direction === 'down' ? 'translate3d(0, -40px, 0)'
          : direction === 'left' ? 'translate3d(40px, 0, 0)' // RTL
            : 'translate3d(-40px, 0, 0)' // RTL
  };

  return (
    <div ref={ref} style={transitionStyle} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', onClick, href, type = "button" }) => {
  const baseStyle = "inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 focus:outline-none active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide";

  const variants = {
    primary: "bg-sky-600 text-white shadow-[0_10px_20px_-10px_rgba(2,132,199,0.5)] hover:bg-sky-700 hover:shadow-[0_15px_25px_-10px_rgba(2,132,199,0.6)]",
    secondary: "bg-white text-sky-700 border border-sky-100 shadow-sm hover:bg-sky-50 hover:border-sky-200",
    outline: "bg-transparent text-white border border-white/30 hover:bg-white/10 backdrop-blur-sm",
    cta: "bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-lg hover:shadow-xl hover:from-sky-500 hover:to-blue-500",
    red: "bg-red-600 text-white shadow-[0_10px_20px_-10px_rgba(220,38,38,0.5)] hover:bg-red-700 hover:shadow-[0_15px_25px_-10px_rgba(220,38,38,0.6)]"
  };

  const Component = href ? 'a' : 'button';

  return (
    <Component
      type={type}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      onClick={onClick}
      href={href}
    >
      {children}
    </Component>
  );
};

const Preloader = ({ isLoading }) => {
  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-50 transition-opacity duration-700 ease-in-out ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sky-100 rounded-full animate-spin"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-sky-500 rounded-full animate-spin border-t-transparent"></div>
          <Heart className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-sky-600 animate-pulse fill-sky-600" />
        </div>
        <p className="text-sky-900 font-medium tracking-widest animate-pulse">LEV SHALEV</p>
      </div>
    </div>
  );
};

const SlideUpText = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal(delay);

  if (typeof children !== 'string') {
    return <span className={className}>{children}</span>;
  }

  const words = children.split(' ');

  return (
    <span ref={ref} className={`inline-block ${className}`} aria-label={children}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap ml-2 last:ml-0">
          {word.split('').map((char, charIndex) => {
            const charDelay = (wordIndex * 100) + (charIndex * 30) + delay;
            return (
              <span key={charIndex} className="inline-block overflow-hidden align-bottom">
                <span
                  className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.2,0.65,0.3,0.9)] will-change-transform"
                  style={{
                    transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
                    transitionDelay: `${charDelay}ms`
                  }}
                >
                  {char}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

const SectionTitle = ({ subtitle, title, align = 'center' }) => (
  <div className={`mb-16 ${align === 'center' ? 'text-center' : 'text-right'}`}>
    <Reveal>
      <span className="text-sky-600 font-bold tracking-[0.2em] uppercase text-xs block mb-3">{subtitle}</span>
      <h2 className="text-3xl md:text-5xl font-bold text-slate-800 relative inline-block">
        <SlideUpText delay={200}>{title}</SlideUpText>
      </h2>
      <div className={`h-1.5 w-24 bg-sky-400 rounded-full mt-4 ${align === 'center' ? 'mx-auto' : ''} opacity-80`}></div>
    </Reveal>
  </div>
);

const ServiceCard = ({ icon: Icon, title, description, index }) => (
  <Reveal delay={index * 100}>
    <div className="bg-white p-8 rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] transition-all duration-500 group h-full border border-slate-50 hover:border-sky-100 relative overflow-hidden">
      {/* Background blob effect on hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700 ease-out opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-sky-600 shadow-sm group-hover:scale-110 group-hover:text-sky-700 transition-all duration-500">
          <Icon className="w-8 h-8" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-sky-700 transition-colors">{title}</h3>
        <p className="text-slate-600 text-base leading-relaxed">{description}</p>
      </div>
    </div>
  </Reveal>
);

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-5 left-5 p-2 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-5 h-5 text-slate-500" />
        </button>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 pr-2">{title}</h3>
          {children}
        </div>
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full py-6 flex items-center justify-between text-right focus:outline-none group"
        onClick={onClick}
      >
        <span className={`text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-sky-600' : 'text-slate-800 group-hover:text-sky-600'}`}>
          {question}
        </span>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 mr-4 ${isOpen ? 'bg-sky-100 text-sky-600 rotate-180' : 'bg-slate-50 text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500'}`}>
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p
          className="text-slate-600 leading-relaxed pr-4 border-r-2 border-sky-100"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  );
};

const FileUpload = ({ label }) => {
  const [fileName, setFileName] = useState('');

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="relative group">
        <input
          type="file"
          className="hidden"
          id="cv-upload"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFileName(e.target.files[0]?.name)}
        />
        <label
          htmlFor="cv-upload"
          className="flex flex-col items-center justify-center w-full px-4 py-10 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-sky-400 hover:bg-sky-50/50 transition-all duration-300"
        >
          {fileName ? (
            <div className="flex items-center gap-2 text-sky-700 font-medium animate-in fade-in">
              <FileText className="w-6 h-6" />
              {fileName}
            </div>
          ) : (
            <>
              <Upload className="w-8 h-8 text-slate-400 group-hover:text-sky-500 group-hover:-translate-y-1 transition-all duration-300 mb-3" />
              <span className="text-sm text-slate-500 group-hover:text-sky-600 font-medium">העלאת קובץ (PDF, DOC, DOCX)</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
};

const Carousel = ({ images, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-[400px] md:h-[600px] overflow-hidden group">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <img
            src={image.src}
            alt={image.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
            <p className="text-white font-medium text-xl md:text-2xl text-center drop-shadow-md transform transition-transform duration-700 translate-y-0">
              "{image.caption}"
            </p>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

const ContactForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'שירותי אחיות',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/send_mail.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/thank-you');
      } else {
        alert('אירעה שגיאה בשליחת הטופס. אנא נסה שנית.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('אירעה שגיאה בשליחת הטופס. אנא נסה שנית.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-10 md:p-16 bg-white">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">שם מלא</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all bg-slate-50/50 focus:bg-white"
            placeholder="ישראל ישראלי"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">טלפון</label>
            <input
              type="tel"
              name="phone"
              required
              pattern="[0-9]{9,10}"
              title="נא להזין מספר טלפון תקין (9-10 ספרות)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all bg-slate-50/50 focus:bg-white"
              placeholder="050-0000000"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">נושא הפנייה</label>
            <div className="relative">
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all bg-slate-50/50 focus:bg-white appearance-none cursor-pointer"
              >
                <option>שירותי אחיות</option>
                <option>שירותי סיעוד</option>
                <option>התייעצות כללית</option>
              </select>
              <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">כיצד נוכל לעזור?</label>
          <textarea
            rows="4"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all bg-slate-50/50 focus:bg-white resize-none"
            placeholder="כתוב כאן את ההודעה..."
          ></textarea>
        </div>
        <Button type="submit" variant="cta" className="w-full py-5 text-lg shadow-xl shadow-sky-200/50 hover:shadow-2xl hover:-translate-y-1" disabled={isSubmitting}>
          {isSubmitting ? 'שולח...' : 'שלח הודעה'}
        </Button>
      </form>
    </div>
  );
};

export default function Home() {
  const { config, loading: configLoading } = useConfig();
  const [isLoading, setIsLoading] = useState(true); // Preloader state
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);

  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null); // State for FAQ accordion
  const lenisRef = useRef(null);

  // Check cookie consent on mount
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowCookieConsent(true);
    }
  }, []);

  const handleCookieConsent = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowCookieConsent(false);
  };

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Preloader Effect
  useEffect(() => {
    if (!configLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // 2 seconds minimum load time for smooth feel
      return () => clearTimeout(timer);
    }
  }, [configLoading]);
  // Performance optimized scroll detection using IntersectionObserver
  const topSentinelRef = useRef(null);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (topSentinelRef.current) {
      observer.observe(topSentinelRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Track active section for menu highlighting
  useEffect(() => {
    const sections = ['about', 'services', 'audience', 'careers', 'faq', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is near top
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      lenisRef.current.scrollTo(element);
    } else if (element) {
      // Fallback if Lenis isn't ready
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const services = [
    { icon: Syringe, title: "בדיקות דם עד הבית", description: "לקיחת דמים מקצועית וסטרילית בנוחות ביתכם, ללא צורך בהמתנה בקופת החולים." },
    { icon: Stethoscope, title: "טיפול בפצעים וחבישות", description: "טיפול מומחה בפצעי לחץ, פצעים ניתוחיים וסוכרתיים, כולל החלפת חבישות מורכבות." },
    { icon: Activity, title: "טיפול בקטטר וסטומה", description: "החלפה וטיפול בקטטר, סטומה ונפרוסטום על ידי צוות מוסמך ומיומן." },
    { icon: HomeIcon, title: "עזרה בהיגיינה ורחצה", description: "סיוע רגיש ומכבד ברחצה, הלבשה ושמירה על היגיינה אישית יומיומית." },
    { icon: CheckCircle, title: "מתן תרופות וזריקות", description: "מתן זריקות, עירויים וטיפול תרופתי בהתאם להוראות רופא, תחת השגחה." },
    { icon: UserCheck, title: "ליווי והשגחה צמודה", description: "שירותי השגחה בבית או בקהילה, כולל ליווי לאחר אשפוז לתקופת ההחלמה." },
    { icon: Heart, title: "תמיכה רגשית", description: "אוזן קשבת ותמיכה רגשית למטופל ולבני המשפחה המתמודדים עם המצב." },
    { icon: Clock, title: "עזרה בתפקוד יומיומי", description: "סיוע בפעולות היום-יום לשיפור איכות החיים והעצמאות בבית." },
  ];

  return (
    <div dir="rtl" className="font-sans text-slate-800 bg-slate-50 min-h-screen selection:bg-sky-200 selection:text-sky-900">
      <Helmet>
        <title>{config?.general?.siteTitle || "לב שליו - שירותי סיעוד ואחיות עד הבית"}</title>
        <meta name="description" content={config?.general?.siteDescription || "שירותי סיעוד ואחיות מוסמכות עד הבית. זמינות 24/7, יחס אישי ומקצועי."} />
        {config?.general?.pixels?.head && <div dangerouslySetInnerHTML={{ __html: config.general.pixels.head }} />}
      </Helmet>
      {config?.general?.pixels?.body && <div dangerouslySetInnerHTML={{ __html: config.general.pixels.body }} />}

      {/* Preloader */}
      <Preloader isLoading={isLoading} />

      {/* Top Sentinel for Scroll Detection */}
      <div ref={topSentinelRef} className="absolute top-0 h-px w-full pointer-events-none opacity-0" />

      {/* Cookie Consent */}
      {showCookieConsent && (
        <div className="fixed bottom-0 left-0 w-full bg-blue-600 text-white shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.2)] z-[70] p-4 animate-in slide-in-from-bottom duration-500">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 max-w-5xl">
            <p className="text-sm text-white/90 text-center md:text-right font-medium">
              אתר זה משתמש בקובצי Cookie כדי לשפר את חווית הגלישה שלך. המשך השימוש באתר מהווה הסכמה למדיניות זו.
            </p>
            <div className="flex gap-3">
              <button onClick={handleCookieConsent} className="text-sm text-white/80 hover:text-white transition-colors underline decoration-white/50 hover:decoration-white">מדיניות פרטיות</button>
              <button onClick={handleCookieConsent} className="bg-white text-blue-600 text-sm px-6 py-2 rounded-full hover:bg-blue-50 transition-colors shadow-lg font-bold">אני מאשר/ת</button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Buttons */}
      <div className="fixed bottom-2 left-2 md:bottom-8 md:left-8 z-40 flex flex-col gap-2 md:gap-4 items-center pointer-events-none">
        <div className="pointer-events-auto flex flex-col gap-2 md:gap-4">
          {/* WhatsApp */}
          <a
            href="https://wa.me/972527242507"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 text-white p-2 md:p-3.5 rounded-full shadow-lg shadow-green-500/30 hover:bg-green-600 transition-all hover:scale-110 hover:-translate-y-1"
            title="שלח הודעה בוואטסאפ"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
          </a>

          {/* Phone (Mobile Only) */}
          <a
            href="tel:0527242507"
            className="bg-sky-600 text-white p-2 md:p-3.5 rounded-full shadow-lg shadow-sky-600/30 hover:bg-sky-700 transition-all hover:scale-110 hover:-translate-y-1 md:hidden"
            title="חייג עכשיו"
          >
            <Phone className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>



      {/* Job Application Modal */}
      <Modal isOpen={isJobModalOpen} onClose={() => setIsJobModalOpen(false)} title="הגשת מועמדות למשרה">
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('הטופס נשלח בהצלחה!'); setIsJobModalOpen(false); }}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">שם מלא</label>
              <input required type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="ישראל ישראלי" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">טלפון</label>
                <input required type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all" placeholder="050..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">אימייל</label>
                <input required type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none" placeholder="email@..." />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">תפקיד מבוקש</label>
              <div className="relative">
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none bg-white appearance-none">
                  <option>מטפל/ת סיעודי/ת</option>
                  <option>אח/ות מוסמך/ת</option>
                  <option>אחר</option>
                </select>
                <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>

            <FileUpload label="קורות חיים (חובה)" />

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">הערות נוספות</label>
              <textarea rows="2" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none resize-none"></textarea>
            </div>
          </div>

          <Button type="submit" variant="cta" className="w-full text-lg">
            שלח מועמדות
          </Button>
        </form>
      </Modal>

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out-cubic ${isScrolled || isMobileMenuOpen ? 'bg-white shadow-lg py-3' : 'bg-transparent py-6'
        }`}>
        <div className="container mx-auto px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img
              src="logo.svg"
              alt="Lev Shalev Logo"
              className={`h-10 md:h-12 w-auto transition-all duration-500 ${!isScrolled && !isMobileMenuOpen ? 'brightness-0 invert' : ''}`}
            />
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-10 font-medium text-sm transition-colors duration-500 ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}>
            {['about', 'services', 'audience', 'careers', 'faq'].map((section) => {
              const labels = {
                about: 'אודות',
                services: 'שירותים',
                audience: 'למי זה מתאים?',
                careers: 'דרושים',
                faq: 'שאלות ותשובות'
              };
              return (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`hover:text-sky-500 transition-colors relative group ${activeSection === section ? 'text-sky-500 font-bold' : ''}`}
                >
                  {labels[section]}
                  <span className={`absolute -bottom-1 right-0 h-0.5 bg-sky-500 transition-all duration-300 ${activeSection === section ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              );
            })}
            <Button
              variant={isScrolled ? "primary" : "outline"}
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-2.5 text-sm shadow-none hover:shadow-none ${activeSection === 'contact' ? 'ring-2 ring-sky-500 ring-offset-2' : ''}`}
            >
              צור קשר
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className={`md:hidden p-2 rounded-lg transition-colors ${isScrolled || isMobileMenuOpen ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full left-0 w-full bg-white shadow-2xl border-t md:hidden flex flex-col overflow-hidden transition-all duration-500 ease-out-cubic ${isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-2">
            {['אודות', 'שירותים', 'למי זה מתאים?', 'דרושים', 'שאלות ותשובות'].map((item, i) => {
              const sectionId = ['about', 'services', 'audience', 'careers', 'faq'][i];
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item}
                  onClick={() => scrollToSection(sectionId)}
                  className={`text-right py-3 px-4 rounded-xl transition-all font-medium border-b border-slate-50 last:border-0 hover:bg-slate-50 hover:text-sky-600 ${isActive ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-700'}`}
                >
                  {item}
                </button>
              );
            })}
            <button
              onClick={() => scrollToSection('contact')}
              className={`text-right py-3 px-4 rounded-xl transition-all font-medium hover:bg-slate-50 hover:text-sky-600 ${activeSection === 'contact' ? 'text-sky-600 bg-sky-50 font-bold' : 'text-slate-700'}`}
            >
              צור קשר
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Gradient - Medical Blue Theme */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-slate-900/90 via-blue-900/70 to-sky-900/70"></div>

        {/* Vimeo Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <iframe
            src="https://player.vimeo.com/video/1130450520?background=1&autoplay=1&loop=1&byline=0&title=0"
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover opacity-80"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Animated Particles (CSS Only for performance) */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-sky-500 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-16 md:mb-0 text-center md:text-right">
            <Reveal direction="up" delay={100}>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-sky-100 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium mb-8 border border-white/10 mx-auto md:mx-0">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                שירותי סיעוד ואחיות עד הבית
              </div>
            </Reveal>
            <Reveal direction="up" delay={300}>
              <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight whitespace-pre-line">
                {config?.content?.heroTitle || <>טיפול מקצועי, <br /><span className="text-transparent bg-clip-text bg-gradient-to-l from-sky-300 to-white">רגיש ובטוח.</span></>}
              </h1>
            </Reveal>
            <Reveal direction="up" delay={500}>
              <p className="text-lg md:text-xl text-slate-200/90 mb-10 max-w-lg leading-relaxed md:ml-auto">
                {config?.content?.heroSubtitle || <>ב<strong>"לב שליו"</strong> אנו מאמינים שכל אדם זכאי לטיפול אמין, אישי ומכבד. עם צוות אחיות ומטפלות מוסמכות, אנחנו כאן בשבילכם, בבית שלכם.</>}
              </p>
            </Reveal>
            <Reveal direction="up" delay={700}>
              <div className="flex flex-col gap-4 w-full md:flex-row md:gap-5 md:justify-start md:w-auto">
                <Button variant="primary" onClick={() => scrollToSection('contact')} className="text-lg px-10 w-full md:w-auto">
                  {config?.content?.ctaButtonText || "שיחת ייעוץ חינם"}
                </Button>
                <Button variant="outline" href="tel:0527242507" className="text-lg w-full md:w-auto">
                  <Phone className="w-5 h-5 ml-2.5" />
                  {config?.content?.contactPhone || "052-724-2507"}
                </Button>
              </div>
            </Reveal>
          </div>

          {/* Hero Image / Illustration */}
          <div className="md:w-1/2 flex justify-center relative w-full">
            <Reveal direction="left" delay={500} className="w-full max-w-lg mb-4 md:mb-0">
              <div className="relative">
                {/* Main Card */}
                <div className="bg-slate-900/80 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-white/10 shadow-2xl relative z-10 overflow-hidden group transition-colors duration-500 mx-auto w-full">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="space-y-3 md:space-y-6">
                    {[
                      { icon: CheckCircle, title: "זמינות גבוהה", sub: "באזור הצפון" },
                      { icon: Users, title: "צוות מוסמך", sub: "אחיות ומטפלות מנוסות" },
                      { icon: Heart, title: "יחס אישי", sub: "אמפתיה ללא פשרות" }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 md:gap-5 items-center p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                        <div className="w-10 h-10 md:w-14 md:h-14 bg-sky-500 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-lg shadow-sky-900/20 shrink-0">
                          <item.icon className="w-5 h-5 md:w-7 md:h-7" />
                        </div>
                        <div className="text-white">
                          <p className="font-bold text-sm md:text-lg">{item.title}</p>
                          <p className="text-xs md:text-sm text-sky-100/80">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Elements behind */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-sky-400/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-600/30 rounded-full blur-3xl"></div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
          <span className="text-sky-200 text-xs font-medium mb-2 tracking-widest uppercase opacity-80">גלול למטה</span>
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </header>

      {/* Why Us / About Section */}
      <section id="about" className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <Reveal direction="right">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl group bg-slate-100 w-full mx-auto">
              <Carousel
                images={[

                  {
                    src: "/images/atmosphere_1.jpg",
                    caption: "טיפול מסור ומקצועי בבית המטופל"
                  },
                  {
                    src: "/images/atmosphere_2.jpg",
                    caption: "צוות רפואי מיומן וקשוב לכל צורך"
                  },
                  {
                    src: "/images/atmosphere_3.jpg",
                    caption: "ליווי אישי וחם לאורך כל הדרך"
                  },
                  {
                    src: "/images/atmosphere_4.jpg",
                    caption: "ביטחון ושלווה בסביבה המוכרת"
                  },
                  {
                    src: "/images/atmosphere_5.jpg",
                    caption: "איכות חיים וכבוד לגיל השלישי"
                  }
                ]}
              />
            </div>
          </Reveal>
          <div>
            <SectionTitle subtitle="מי אנחנו" title="למה לבחור בלב שליו?" align="right" />
            <Reveal delay={200}>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                ב<strong>"לב שליו"</strong> אנחנו מעניקים ליווי מלא בבריאות ובסיעוד, גם רפואי וגם אישי. הצוות שלנו כולל אחיות מוסמכות ומטפלות סיעודיות מקצועיות, מתוך מטרה אחת: שכל מטופל יקבל את הטיפול המדויק והאנושי שהוא צריך – מבלי לצאת מהבית.
              </p>
              <ul className="space-y-5 mb-10">
                {[
                  "שילוב של אחיות מוסמכות ומטפלות מנוסות",
                  "יחס אישי, חם ומכבד לכל מטופל",
                  "זמינות גבוהה באזור הצפון",
                  "אמינות ומקצועיות ללא פשרות",
                  "התאמת שירותים אישית לצרכי כל אדם"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-4 text-slate-700 font-medium group">
                    <span className="bg-sky-100 text-sky-600 p-1.5 rounded-full group-hover:bg-sky-600 group-hover:text-white transition-colors"><CheckCircle size={18} /></span>
                    {item}
                  </li>
                ))}
              </ul>
              <Button variant="primary" onClick={() => scrollToSection('services')}>
                לרשימת השירותים המלאה
              </Button>
            </Reveal>
          </div>
        </div>
      </section >

      {/* Services Section */}
      < section id="services" className="py-24 bg-sky-100 relative" >
        {/* Subtle BG pattern */}
        < div className="absolute inset-0 bg-[radial-gradient(#e0f2fe_1px,transparent_1px)] [background-size:20px_20px] opacity-30" ></div >

        <div className="container mx-auto px-6 relative z-10">
          <SectionTitle subtitle="ההתמחות שלנו" title="מגוון שירותים עד פתח הבית" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} index={index} />
            ))}
          </div>
        </div>
      </section >

      {/* Target Audience & HMOs */}
      < section id="audience" className="py-24 bg-slate-50" >
        <div className="container mx-auto px-6 text-center">
          <SectionTitle subtitle="קהל היעד" title="למי השירות מיועד?" />

          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { title: "קשישים", icon: UserCheck },
              { title: "בעלי מוגבלויות", icon: Users },
              { title: "מתאוששים מאשפוז", icon: Activity },
              { title: "בני משפחה דואגים", icon: Heart },
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 100} direction="up">
                <div className="flex flex-col items-center w-full md:w-48 group">
                  <div className="w-24 h-24 rounded-full border border-sky-200 flex items-center justify-center mb-4 group-hover:border-sky-500 group-hover:bg-sky-50 transition-all duration-500">
                    <item.icon className="w-10 h-10 text-sky-600 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 text-center max-w-[150px] leading-tight">{item.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={400} className="mt-24">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 max-w-5xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 via-blue-500 to-sky-600"></div>

              <h3 className="text-2xl font-bold text-slate-800 mb-4">החזרים מקופות החולים</h3>
              <p className="text-slate-600 mb-12 text-lg max-w-2xl mx-auto">
                מגיע לך החזר על חלק מהטיפולים דרך הביטוחים המשלימים. אנו עובדים עם כל קופות החולים בישראל.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-80 hover:opacity-100 transition-opacity duration-500">
                {/* Clalit */}
                <div className="group flex flex-col items-center gap-2 cursor-default w-full">
                  <div className="w-full h-24 flex items-center justify-center border border-slate-100 rounded-2xl bg-white px-6 group-hover:shadow-lg transition-all">
                    <img src="/images/clalit_logo.svg" alt="Clalit" className="h-12 w-auto object-contain transition-all duration-500" />
                  </div>
                </div>

                {/* Maccabi */}
                <div className="group flex flex-col items-center gap-2 cursor-default w-full">
                  <div className="w-full h-24 flex items-center justify-center border border-slate-100 rounded-2xl bg-white px-6 group-hover:shadow-lg transition-all">
                    <img src="/images/macabi_logo.svg" alt="Maccabi" className="h-12 w-auto object-contain transition-all duration-500" />
                  </div>
                </div>

                {/* Meuhedet */}
                <div className="group flex flex-col items-center gap-2 cursor-default w-full">
                  <div className="w-full h-24 flex items-center justify-center border border-slate-100 rounded-2xl bg-white px-6 group-hover:shadow-lg transition-all">
                    <img src="/images/meuhedet_logo.png" alt="Meuhedet" className="h-12 w-auto object-contain transition-all duration-500" />
                  </div>
                </div>

                {/* Leumit */}
                <div className="group flex flex-col items-center gap-2 cursor-default w-full">
                  <div className="w-full h-24 flex items-center justify-center border border-slate-100 rounded-2xl bg-white px-6 group-hover:shadow-lg transition-all">
                    <img src="/images/leumit_logo.png" alt="Leumit" className="h-12 w-auto object-contain transition-all duration-500" />
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section >

      {/* Careers Section */}
      < section id="careers" className="py-24 bg-slate-900 text-white relative overflow-hidden" >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-600 rounded-full mix-blend-screen filter blur-[150px] opacity-20 -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-700 rounded-full mix-blend-screen filter blur-[150px] opacity-20 translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="container mx-auto px-6 relative z-10">
          <Reveal>
            <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl md:rounded-[3rem] p-6 md:p-16 border border-white/10 shadow-2xl">
              <div className="text-center mb-16">
                <h2 className="text-2xl md:text-5xl font-bold mb-4 md:mb-6">דרושים - הצטרפו לצוות שלנו</h2>
                <p className="text-sky-100 text-sm md:text-lg max-w-2xl mx-auto font-light">
                  אנו מחפשים מטפלים ומטפלות מסורים להצטרף לצוות המקצועי שלנו ולהיות חלק ממשימה חשובה.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-8 md:mb-16">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-sky-300 mb-4 md:mb-8 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                    דרישות התפקיד
                  </h3>
                  <ul className="space-y-3 md:space-y-6 text-sm md:text-lg">
                    {[
                      "ניסיון בטיפול בקשישים - יתרון",
                      "סבלנות, אמפתיה ויחס חם",
                      "אמינות ויכולת עבודה עצמאית",
                      "רישיון נהיגה - יתרון משמעותי"
                    ].map((req, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-200">
                        <div className="bg-sky-500/20 p-1.5 rounded-lg mt-1"><CheckCircle size={18} className="text-sky-400" /></div>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-sky-300 mb-4 md:mb-8 flex items-center gap-3">
                    <span className="w-8 h-1 bg-sky-500 rounded-full"></span>
                    מה אנו מציעים?
                  </h3>
                  <ul className="space-y-3 md:space-y-6 text-sm md:text-lg">
                    {[
                      "שכר ותנאים מעולים",
                      "סביבת עבודה תומכת ומקצועית",
                      "הכשרות מקצועיות",
                      "גמישות בשעות העבודה"
                    ].map((offer, i) => (
                      <li key={i} className="flex items-start gap-4 text-slate-200">
                        <div className="bg-sky-500/20 p-1.5 rounded-lg mt-1"><CheckCircle size={18} className="text-sky-400" /></div>
                        {offer}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <Button
                  variant="cta"
                  onClick={() => setIsJobModalOpen(true)}
                  className="px-12 py-5 text-xl shadow-sky-900/50 hover:scale-105 transform duration-300"
                >
                  <Upload className="w-6 h-6 ml-3" />
                  הגש מועמדות עכשיו
                </Button>
                <p className="text-sm text-slate-400 mt-4 opacity-70">תהליך קצר שלוקח פחות דקה</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section >

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="שאלות ותשובות" title="כל מה שחשוב לדעת" />

          <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border border-slate-100">
            {[
              {
                q: "מי מטפל במטופל? האם מדובר רק במטפלים סיעודיים או גם באחיות?",
                a: "צוות <strong>\"לב שליו\"</strong> משלב אחיות מוסמכות ומטפלות סיעודיות מנוסות ומקצועיות. שילוב זה מאפשר לנו לספק גם טיפול רפואי (כגון זריקות, עירויים וטיפול בפצעים) וגם סיוע יומיומי (סיעוד והיגיינה)."
              },
              {
                q: "באילו אזורים גיאוגרפיים שירותיכם זמינים?",
                a: "אנו מעניקים שירות עם זמינות גבוהה באזור הצפון. מומלץ ליצור קשר כדי לוודא זמינות מדויקת ביישוב שלכם."
              },
              {
                q: "אילו שירותים רפואיים מקצועיים ניתן לקבל בבית?",
                a: "אנו מתמחים במגוון שירותים רפואיים, כולל: בדיקות דם עד הבית, טיפול מומחה בפצעים וחבישות מורכבות, וכן טיפול והחלפה בקטטר וסטומה."
              },
              {
                q: "האם השירות מיועד רק לקשישים?",
                a: "השירותים שלנו מיועדים למגוון קהלי יעד: קשישים, בעלי מוגבלויות, מתאוששים מאשפוז, וכן לבני משפחה דואגים הזקוקים להשגחה וליווי מקצועי."
              },
              {
                q: "מה קורה במקרה של צורך דחוף או מחוץ לשעות הפעילות?",
                a: "<strong>\"לב שליו\"</strong> מציעה זמינות 24/7 למקרים דחופים. שעות הפעילות הרגילות הן א'-ה' 08:00-18:00, אך ניתן ליצור קשר טלפוני למענה מיידי במקרה הצורך."
              },
              {
                q: "האם ניתן לקבל החזרים כספיים על הטיפול?",
                a: "כן. אנו עובדים מול כל קופות החולים בישראל, וניתן לקבל החזר על חלק מהטיפולים דרך הביטוחים המשלימים (כגון \"שקל שלי\")."
              },
              {
                q: "איך מתבצע תהליך ההתאמה האישית של המטפל/ת?",
                a: "אנו מקפידים על התאמת שירותים אישית לצרכי כל אדם. לאחר שיחת ייעוץ, אנו משבצים את אנשי הצוות המנוסים והרלוונטיים ביותר לצרכים הרפואיים והאישיים הספציפיים של המטופל, תוך דגש על יחס אישי, חם ומכבד."
              },
              {
                q: "האם ניתן לקבל ליווי והשגחה צמודה בבית או מחוצה לו?",
                a: "כן, אנו מספקים שירותי ליווי והשגחה צמודה בבית או בקהילה, כולל ליווי לתקופת ההחלמה לאחר אשפוז, וכן סיוע בעזרה בתפקוד יומיומי."
              }
            ].map((item, index) => (
              <FAQItem
                key={index}
                question={item.q}
                answer={item.a}
                isOpen={openFAQIndex === index}
                onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      < section id="contact" className="py-24 bg-slate-100" >
        <div className="container mx-auto px-6">
          <SectionTitle subtitle="צור קשר" title="אנחנו כאן בשבילכם" />

          <Reveal delay={200} direction="up">
            <div className="grid lg:grid-cols-2 gap-0 max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
              <div className="p-8 md:p-16 bg-gradient-to-br from-sky-600 to-blue-800 text-white flex flex-col justify-between relative overflow-hidden">
                {/* Abstract shapes */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 -left-24 w-64 h-64 bg-sky-400 opacity-20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 hidden md:block">פרטי התקשרות</h3>
                  <p className="mb-8 md:mb-12 text-sky-100 text-sm md:text-lg leading-relaxed">
                    רוצים לשמוע עוד או להזמין מטפלת/אחות עד הבית? <br />השאירו פרטים ונחזור אליכם בהקדם.
                  </p>

                  <div className="space-y-6 md:space-y-8">
                    <div className="flex items-center gap-6 group">
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sky-200 text-sm mb-1 font-medium">טלפון לשיחת ייעוץ</p>
                        <a href="tel:0527242507" className="text-2xl font-bold hover:text-sky-100 transition-colors tracking-wide">052-724-2507</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 group">
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sky-200 text-sm mb-1 font-medium">דואר אלקטרוני</p>
                        <a href="mailto:niponata1989@gmail.com" className="text-xl font-medium hover:text-sky-100 transition-colors">niponata1989@gmail.com</a>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 group">
                      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sky-200 text-sm mb-1 font-medium">כתובת משרדים</p>
                        <p className="text-xl font-medium">המסגר 3, מעלות תרשיחא</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 relative z-10 flex justify-between items-end">
                  <div>
                    <p className="text-sm text-sky-200 font-medium">שעות פעילות</p>
                    <p className="text-lg">א' - ה': 08:00 - 18:00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl opacity-20 font-black">24/7</p>
                    <p className="text-xs text-sky-200">זמינות למקרים דחופים</p>
                  </div>
                </div>
              </div>

              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section >

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">

            {/* Logo & Description */}
            <div className="flex flex-col items-center md:items-start gap-4">
              <img src="/logo.svg" alt="Lev Shalev" className="h-10 w-auto brightness-0 invert opacity-90" />
              <p className="text-slate-400 text-sm text-center md:text-right max-w-xs">
                שירותי סיעוד ורפואה עד הבית,
                כי אין כמו בבית.
              </p>
            </div>

            {/* Contact Minimalist */}
            <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-400">
              <a href="tel:0527242507" className="hover:text-sky-400 transition-colors">052-724-2507</a>
              <a href="mailto:niponata1989@gmail.com" className="hover:text-sky-400 transition-colors">niponata1989@gmail.com</a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="https://wa.me/972527242507" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all duration-300">
                {/* WhatsApp Icon */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </a>
              <a href="https://www.facebook.com/share/1E4mPpQeTa/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/lev.shaleev?igsh=ZXJwNHJ3eWtjeGk2&utm_source=qr" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition-all duration-300 border border-slate-700 hover:border-white/20">
                {/* TikTok Icon (Custom SVG) */}
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>© {new Date().getFullYear()} <strong>לב שליו</strong> - שירותי סיעוד ורפואה. כל הזכויות שמורות.</p>
              <span className="hidden md:inline text-slate-700">|</span>
              <p className="text-slate-400 font-medium">רישיון להעסקת כוח אדם: 4136</p>
            </div>
            <div className="flex gap-6 items-center">
              <Link to="/accessibility" className="hover:text-sky-400 transition-colors flex items-center gap-1">
                <Accessibility className="w-3 h-3" />
                הצהרת נגישות
              </Link>
              <span className="text-slate-700">|</span>
              <Link to="/privacy" className="hover:text-sky-400 transition-colors">מדיניות פרטיות</Link>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
}
