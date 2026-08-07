import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StickyPhoneButtonProps {
  phoneNumber?: string;
  showAfterScroll?: number; // Show after scrolling X pixels
}

export function StickyPhoneButton({
  phoneNumber = '(281) 568-8000',
  showAfterScroll = 300
}: StickyPhoneButtonProps) {
  const [isPastHero, setIsPastHero] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsPastHero(scrolled > showAfterScroll);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  // Stand down once the footer is on screen. The button is a wide pill anchored
  // bottom-right, which on a phone lands directly on top of the footer's bottom
  // bar — it was covering the Sales Portal and Admin links. Hiding it there
  // costs nothing: the footer carries the same phone number as a tel: link.
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  const isVisible = isPastHero && !isFooterVisible;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 md:hidden"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.a
            href={`tel:${phoneNumber.replace(/[^0-9]/g, '')}`}
            className="flex items-center gap-3 bg-accent text-primary-dark px-6 py-4 rounded-full shadow-luxury-xl hover:shadow-luxury-2xl transition-all duration-300 font-semibold group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-10 h-10 bg-primary-dark/10 rounded-full flex items-center justify-center group-hover:bg-primary-dark/20 transition-colors"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Phone className="w-5 h-5 text-primary-dark" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-xs opacity-80">Call Now</span>
              <span className="text-sm font-bold">{phoneNumber}</span>
            </div>
          </motion.a>

          {/* Pulsing ring effect */}
          <motion.div
            className="absolute inset-0 bg-accent rounded-full opacity-20 pointer-events-none"
            animate={{
              scale: [1, 1.4],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
