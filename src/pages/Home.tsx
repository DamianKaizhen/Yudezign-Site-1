import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Package, Truck, Wrench, ChevronRight, Sparkles, Zap, Award, TrendingUp } from 'lucide-react';
import { AnimatedGradientBg, FloatingParticles, GridPattern } from '../components/ui/AnimatedBackgrounds';
import { SpotlightCard, BentoCard, NeonCard } from '../components/ui/ModernCard';
import ProjectCard from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import {
  TextEffect,
  AnimatedNumber,
  Card3D,
  MagneticButton,
  ParallaxLayer,
  GradientText,
  RippleEffect,
  MorphingShape
} from '../components/ui/AdvancedAnimations';
import { InView } from '../components/ui/InViewAnimations';
import { CustomCursor } from '../components/ui/CustomCursor';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const featuredProjects = projects.slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  return (
    <div className="min-h-screen" onMouseMove={handleMouseMove}>
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Ultra-Modern Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Multi-Layer Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-black">
          <AnimatedGradientBg />
          <FloatingParticles />
          <GridPattern />

          {/* Morphing Shapes */}
          <MorphingShape className="w-96 h-96 bg-accent -top-48 -left-48" />
          <MorphingShape className="w-[500px] h-[500px] bg-primary-light -bottom-32 -right-32" />
        </div>

        {/* Parallax Background Image */}
        <ParallaxLayer speed={0.3} className="absolute inset-0 z-10">
          <img
            src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1600"
            alt="Custom European Cabinets"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-primary/40 to-primary/90"></div>
        </ParallaxLayer>

        {/* Enhanced Spotlight Effect with Motion */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 165, 116, 0.2), transparent 40%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Hero Content with Advanced Animations */}
        <div className="relative z-30 text-center text-white px-4">
          {/* Glassmorphic Badge with Ripple */}
          <RippleEffect className="inline-block mb-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-accent" />
              </motion.div>
              <span className="text-sm font-semibold">Premium European Craftsmanship</span>
            </motion.div>
          </RippleEffect>

          {/* Animated Text Hero Title */}
          <h1 className="heading-xl mb-6">
            <TextEffect preset="blur" per="word" delay={0.3}>
              Custom European Cabinets,
            </TextEffect>
            <br />
            <GradientText
              className="text-6xl md:text-8xl font-bold"
              colors={['from-accent', 'via-accent-light', 'to-white']}
            >
              Crafted in Houston
            </GradientText>
          </h1>

          {/* Animated Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-12"
          >
            <TextEffect preset="slide" per="word" delay={1}>
              Frameless Design • Supply-Only Excellence • 2-3 Week Delivery
            </TextEffect>
          </motion.div>

          {/* Magnetic Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
          >
            <Link to="/portfolio">
              <MagneticButton className="group relative px-10 py-5 bg-gradient-to-r from-accent via-accent-light to-accent-dark text-white font-bold rounded-2xl overflow-hidden shadow-2xl">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-accent-dark to-accent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center justify-center space-x-2 text-lg">
                  <span>View Portfolio</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.div>
                </span>
              </MagneticButton>
            </Link>

            <Link to="/contact">
              <MagneticButton className="group relative px-10 py-5 bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white font-bold rounded-2xl shadow-2xl hover:bg-white hover:text-primary transition-all duration-300">
                <span className="flex items-center justify-center space-x-2 text-lg">
                  <span>Get Free Quote</span>
                  <motion.div
                    animate={{ rotate: [0, 15, 0, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-6 h-6" />
                  </motion.div>
                </span>
              </MagneticButton>
            </Link>
          </motion.div>

          {/* Animated Stats Bar with Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              { number: 500, label: 'Projects Completed', suffix: '+' },
              { number: 3, label: 'Week Turnaround', prefix: '2-' },
              { number: 25, label: 'Finish Options', suffix: '+' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
              >
                <Card3D intensity={5} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                    {stat.prefix}
                    <AnimatedNumber value={stat.number} duration={2} />
                    {stat.suffix}
                  </div>
                  <div className="text-sm text-neutral-300 font-medium">{stat.label}</div>
                </Card3D>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30"
        >
          <motion.div
            animate={{
              y: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="flex flex-col items-center text-white/70 cursor-pointer hover:text-white transition-colors"
          >
            <motion.span
              className="text-sm mb-2 font-medium"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              Scroll to Explore
            </motion.span>
            <motion.div
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
              whileHover={{ borderColor: 'rgba(255,255,255,1)' }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-white rounded-full"
                animate={{ y: [0, 16, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Value Propositions with 3D Cards */}
      <section className="section-padding bg-neutral-50 relative overflow-hidden">
        {/* Morphing Background Shapes */}
        <MorphingShape className="w-96 h-96 bg-accent/10 top-0 right-0" />
        <MorphingShape className="w-[500px] h-[500px] bg-primary/10 bottom-0 left-0" />

        <div className="container-custom relative z-10">
          <InView variant="fadeUp" className="text-center mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              >
                <Award className="w-5 h-5" />
              </motion.div>
              <span>Why Choose Us</span>
            </motion.div>
            <h2 className="heading-lg mb-6">
              <TextEffect preset="blur" per="word">
                Unmatched Quality & Speed
              </TextEffect>
            </h2>
            <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
              <TextEffect preset="fade" per="word" delay={0.3}>
                We combine European craftsmanship with Houston efficiency
              </TextEffect>
            </p>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Clock,
                title: '2-3 Week Turnaround',
                description: 'Lightning-fast local manufacturing. No overseas delays.',
                color: 'from-blue-500 via-blue-600 to-cyan-500',
              },
              {
                icon: Package,
                title: 'European Frameless',
                description: 'Modern, space-maximizing construction with seamless aesthetics.',
                color: 'from-purple-500 via-purple-600 to-pink-500',
              },
              {
                icon: Truck,
                title: 'Flexible Delivery',
                description: 'Assembled or flat-pack options to fit your needs.',
                color: 'from-pink-500 via-rose-600 to-red-500',
              },
              {
                icon: Wrench,
                title: 'Supply-Only Savings',
                description: 'Direct factory pricing without showroom markup.',
                color: 'from-green-500 via-emerald-600 to-teal-500',
              },
            ].map((item, index) => (
              <InView key={index} variant="scale" delay={index * 0.15}>
                <Card3D intensity={10} className="h-full">
                  <NeonCard className="h-full group cursor-pointer">
                    <div className="p-8">
                      <motion.div
                        className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl mb-6 shadow-2xl`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <item.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-600 leading-relaxed text-lg">{item.description}</p>
                    </div>
                  </NeonCard>
                </Card3D>
              </InView>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects with 3D Cards */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white"></div>

        <div className="container-custom relative z-10">
          <InView variant="fadeUp" className="text-center mb-16">
            <motion.div
              className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ y: [-2, 2, -2] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <TrendingUp className="w-5 h-5" />
              </motion.div>
              <span>Featured Work</span>
            </motion.div>
            <h2 className="heading-lg mb-6">
              <TextEffect preset="blur" per="word">
                Recent Masterpieces
              </TextEffect>
            </h2>
            <p className="text-neutral-600 text-xl max-w-3xl mx-auto">
              <TextEffect preset="fade" per="word" delay={0.3}>
                Explore our latest custom cabinet installations across Houston
              </TextEffect>
            </p>
          </InView>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <InView key={project.id} variant="scale" delay={index * 0.1}>
                <Card3D intensity={15}>
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                </Card3D>
              </InView>
            ))}
          </div>

          <InView variant="fadeUp" className="text-center">
            <Link to="/portfolio">
              <MagneticButton className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary via-primary-dark to-primary text-white font-bold px-12 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-lg">
                <span>View All Projects</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-6 h-6" />
                </motion.div>
              </MagneticButton>
            </Link>
          </InView>
        </div>
      </section>

      {/* Why YuDeZign - Advanced Layout */}
      <section className="section-padding bg-gradient-to-br from-neutral-50 to-white relative overflow-hidden">
        {/* Morphing Background */}
        <MorphingShape className="w-[600px] h-[600px] bg-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* 3D Image Card */}
            <InView variant="fadeLeft">
              <Card3D intensity={20} className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl transform scale-110" />
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <BentoCard glow className="overflow-hidden">
                    <ParallaxLayer speed={0.1}>
                      <img
                        src="https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800"
                        alt="YuDeZign Quality"
                        className="w-full h-[600px] object-cover"
                      />
                    </ParallaxLayer>
                  </BentoCard>
                </motion.div>
              </Card3D>
            </InView>

            {/* Content with Animated Text */}
            <InView variant="fadeRight" className="space-y-8">
              <div>
                <h2 className="heading-lg mb-4">
                  <TextEffect preset="blur" per="word">
                    Uncompromising Quality,
                  </TextEffect>
                  <br />
                  <GradientText colors={['from-primary', 'via-accent', 'to-primary-light']}>
                    Local Craftsmanship
                  </GradientText>
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    badge: '¾"',
                    title: 'Premium Plywood Construction',
                    description: 'We use only high-grade 3/4" plywood, never particle board. Built to last decades.',
                    gradient: 'from-blue-500 to-cyan-500'
                  },
                  {
                    badge: '25+',
                    title: '25+ Finish Options in Stock',
                    description: 'Melamine, laminate, acrylic, and wood grain. See them all in our showroom.',
                    gradient: 'from-purple-500 to-pink-500'
                  },
                  {
                    badge: 'HTX',
                    title: 'Made in Houston',
                    description: 'Local manufacturing means faster turnaround and supporting Texas jobs.',
                    gradient: 'from-orange-500 to-red-500'
                  },
                  {
                    badge: 'PRO',
                    title: 'Free Closet Program',
                    description: 'Design your dream closet with our intuitive software. Get instant pricing.',
                    gradient: 'from-green-500 to-emerald-500'
                  },
                ].map((item, index) => (
                  <InView key={index} variant="fadeUp" delay={index * 0.1}>
                    <Card3D intensity={8}>
                      <RippleEffect>
                        <SpotlightCard>
                          <div className="p-6 flex items-start space-x-4">
                            <motion.div
                              className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-xl`}
                              whileHover={{ rotate: 360, scale: 1.1 }}
                              transition={{ duration: 0.6 }}
                            >
                              {item.badge}
                            </motion.div>
                            <div>
                              <h3 className="font-bold text-xl mb-2 text-neutral-900">{item.title}</h3>
                              <p className="text-neutral-600 text-lg leading-relaxed">{item.description}</p>
                            </div>
                          </div>
                        </SpotlightCard>
                      </RippleEffect>
                    </Card3D>
                  </InView>
                ))}
              </div>
            </InView>
          </div>
        </div>
      </section>

      {/* Closet Program Teaser - Ultra-Modern Dark Section */}
      <section className="section-padding bg-gradient-to-br from-primary via-primary-dark to-black text-white relative overflow-hidden">
        <AnimatedGradientBg />
        <FloatingParticles />
        <MorphingShape className="w-[700px] h-[700px] bg-accent/10 top-0 right-0" />
        <MorphingShape className="w-96 h-96 bg-primary-light/10 bottom-0 left-0" />

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <InView variant="fadeLeft">
              <div>
                <RippleEffect className="inline-block mb-8">
                  <motion.div
                    className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-xl border border-white/30 rounded-full px-6 py-3 shadow-2xl"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-5 h-5 text-accent" />
                    </motion.div>
                    <span className="text-sm font-bold">Free Design Tool</span>
                  </motion.div>
                </RippleEffect>

                <h2 className="heading-lg mb-6">
                  <TextEffect preset="blur" per="word">
                    Design Your Closet with Our Free Program
                  </TextEffect>
                </h2>

                <p className="text-2xl text-neutral-200 mb-10 leading-relaxed">
                  <TextEffect preset="fade" per="word" delay={0.3}>
                    Professional-grade design tools at your fingertips. Drag, drop, visualize, and order.
                  </TextEffect>
                </p>

                <div className="grid grid-cols-2 gap-6 mb-10">
                  {[
                    'Drag-and-drop interface',
                    'Real-time 3D visualization',
                    'Instant pricing quotes',
                    'Order directly from factory',
                  ].map((feature, index) => (
                    <InView key={index} variant="fadeUp" delay={index * 0.1}>
                      <motion.div
                        className="flex items-center space-x-3"
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-8 h-8 bg-gradient-to-br from-accent to-accent-dark rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <span className="text-white text-sm font-bold">✓</span>
                        </motion.div>
                        <span className="text-neutral-200 text-base font-medium">{feature}</span>
                      </motion.div>
                    </InView>
                  ))}
                </div>

                <Link to="/kdlite">
                  <MagneticButton className="inline-flex items-center space-x-3 bg-gradient-to-r from-accent via-accent-light to-accent-dark text-white font-bold px-10 py-5 rounded-2xl shadow-2xl text-lg">
                    <span>Try Closet Program Free</span>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ChevronRight className="w-6 h-6" />
                    </motion.div>
                  </MagneticButton>
                </Link>
              </div>
            </InView>

            <InView variant="fadeRight">
              <Card3D intensity={15} className="relative">
                <motion.div
                  className="relative h-[600px] rounded-3xl overflow-hidden border-2 border-white/30 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ParallaxLayer speed={0.2}>
                    <img
                      src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800"
                      alt="Closet Program"
                      className="w-full h-full object-cover"
                    />
                  </ParallaxLayer>

                  {/* Animated Play button */}
                  <RippleEffect className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 via-black/30 to-black/50 hover:from-black/10 hover:via-black/20 hover:to-black/40 transition-all cursor-pointer group">
                    <motion.div
                      className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
                      whileHover={{ scale: 1.2, rotate: 90 }}
                      transition={{ duration: 0.4 }}
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(255,255,255,0.3)',
                          '0 0 40px rgba(255,255,255,0.6)',
                          '0 0 20px rgba(255,255,255,0.3)'
                        ]
                      }}
                    >
                      <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-primary border-b-12 border-b-transparent ml-2"></div>
                    </motion.div>
                  </RippleEffect>
                </motion.div>
              </Card3D>
            </InView>
          </div>
        </div>
      </section>

      {/* Final CTA - Ultra Eye-Catching */}
      <section className="section-padding bg-gradient-to-br from-white via-neutral-50 to-white relative overflow-hidden">
        <MorphingShape className="w-[800px] h-[800px] bg-primary/5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

        <div className="container-custom relative z-10">
          <InView variant="scale">
            <Card3D intensity={20} className="max-w-5xl mx-auto">
              <BentoCard glow className="text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"></div>
                <div className="relative p-16">
                  <motion.div
                    className="inline-block mb-6"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-16 h-16 text-accent mx-auto" />
                  </motion.div>

                  <h2 className="heading-xl mb-6">
                    <TextEffect preset="blur" per="word">
                      Ready to Transform Your Space?
                    </TextEffect>
                  </h2>

                  <p className="text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto">
                    <TextEffect preset="fade" per="word" delay={0.3}>
                      Get a free quote and discover how YuDeZign can bring your vision to life
                    </TextEffect>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link to="/contact">
                      <MagneticButton className="group inline-flex items-center space-x-3 bg-gradient-to-r from-primary via-primary-dark to-primary text-white font-bold px-12 py-6 rounded-2xl shadow-2xl text-xl">
                        <span>Request Free Quote</span>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Zap className="w-6 h-6" />
                        </motion.div>
                      </MagneticButton>
                    </Link>

                    <Link to="/portfolio">
                      <MagneticButton className="inline-flex items-center space-x-3 bg-white border-2 border-primary/30 text-primary font-bold px-12 py-6 rounded-2xl shadow-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-xl">
                        <span>View Our Work</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ChevronRight className="w-6 h-6" />
                        </motion.div>
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </BentoCard>
            </Card3D>
          </InView>
        </div>
      </section>
    </div>
  );
};

export default Home;
