import React from 'react';
import SEO from '../../components/SEO';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Calendar,
  Navigation,
  Camera,
  Users,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import { generateLocalBusinessSchema } from '../../lib/schema';

const ShowroomPage: React.FC = () => {
  const businessInfo = {
    name: 'YuDezign Custom Cabinets',
    address: '13230 Murphy Rd, Ste 600, Stafford, TX 77477',
    phone: '(281) 568-8000',
    email: 'orders@yudezign.com',
    hours: {
      monday: '9:00 AM - 5:30 PM',
      tuesday: '9:00 AM - 5:30 PM',
      wednesday: '9:00 AM - 5:30 PM',
      thursday: '9:00 AM - 5:30 PM',
      friday: '9:00 AM - 5:30 PM',
      saturday: 'Closed',
      sunday: 'Closed',
    },
  };

  const localBusinessSchema = generateLocalBusinessSchema({
    name: businessInfo.name,
    address: businessInfo.address,
    phone: businessInfo.phone,
    hours: 'Mo-Fr 09:00-17:30',
    priceRange: '$$$',
  });

  return (
    <>
      <SEO
        title="Visit Our Houston Showroom | YuDezign Custom Cabinets"
        description="Visit YuDezign's Houston showroom to see 50+ cabinet displays, touch materials, and meet with expert designers. Free consultation included with showroom visit."
        keywords={[
          'cabinet showroom Houston',
          'YuDezign showroom',
          'kitchen cabinet display Houston',
          'visit cabinet showroom',
          'Houston cabinetry showroom',
        ]}
        canonical="https://www.yudezign.com/showroom"
        ogType="place"
        structuredData={localBusinessSchema}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white py-20">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-1 bg-accent mx-auto mb-8"></div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Experience Quality <br />
              <span className="text-white">
                At Our Showroom
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8">
              See, touch, and compare 50+ cabinet displays. Meet with expert designers and bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#book-appointment"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar className="mr-2 w-5 h-5" />
                Book Your Visit
              </a>
              <a
                href="#directions"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <Navigation className="mr-2 w-5 h-5" />
                Get Directions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Visit Us in Houston
              </h2>

              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-slate-900 mb-1">Address</h3>
                    <p className="text-slate-600">{businessInfo.address}</p>
                    <a
                      href="#directions"
                      className="text-primary hover:text-primary-dark font-medium text-sm mt-1 inline-block"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-slate-900 mb-1">Phone</h3>
                    <a
                      href={`tel:${businessInfo.phone.replace(/\D/g, '')}`}
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      {businessInfo.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                    <a
                      href={`mailto:${businessInfo.email}`}
                      className="text-slate-600 hover:text-primary transition-colors"
                    >
                      {businessInfo.email}
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-semibold text-slate-900 mb-3">Showroom Hours</h3>
                    <div className="space-y-2 text-sm">
                      {Object.entries(businessInfo.hours).map(([day, hours]) => (
                        <div key={day} className="flex justify-between">
                          <span className="text-slate-600 capitalize min-w-[100px]">{day}:</span>
                          <span className="text-slate-900 font-medium">{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Note */}
              <div className="mt-8 p-4 bg-accent-light border border-accent-light rounded-lg">
                <p className="text-sm text-slate-700">
                  <strong>Walk-ins welcome!</strong> However, scheduling an appointment ensures a designer is available to give you their full attention.
                </p>
              </div>
            </div>

            {/* Map */}
            <div id="directions">
              <h2 className="text-3xl font-bold text-slate-900 mb-8">
                Find Us
              </h2>
              <div className="bg-slate-100 rounded-xl overflow-hidden shadow-lg h-[500px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.8697832745777!2d-95.56934492349396!3d29.616758975219067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e7a1b1b1b1b1%3A0x1234567890abcdef!2s13230%20Murphy%20Rd%20Ste%20600%2C%20Stafford%2C%20TX%2077477!5e0!3m2!1sen!2sus!4v1699123456789!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="YuDezign Location - 13230 Murphy Rd Ste 600, Stafford, TX 77477"
                />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">From Downtown</p>
                  <p className="font-semibold text-slate-900">15 minutes</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Free Parking</p>
                  <p className="font-semibold text-slate-900">Available</p>
                </div>
                <div className="text-center p-4 bg-slate-50 rounded-lg">
                  <p className="text-sm text-slate-600 mb-1">Wheelchair</p>
                  <p className="font-semibold text-slate-900">Accessible</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              What to Expect During Your Visit
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Your showroom visit is an interactive experience designed to help you make confident decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Personal Designer',
                desc: 'Meet one-on-one with an expert cabinet designer who will listen to your needs and guide you through options.',
              },
              {
                icon: Camera,
                title: 'See & Touch Displays',
                desc: 'Explore 50+ cabinet displays featuring different styles, finishes, materials, and hardware options.',
              },
              {
                icon: Star,
                title: 'Compare Quality',
                desc: 'See the difference between stock, semi-custom, and fully custom construction side-by-side.',
              },
              {
                icon: Calendar,
                title: 'Next Steps',
                desc: 'Leave with a clear plan, preliminary estimate, and timeline for your project.',
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent-light rounded-lg flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Virtual Tour Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Camera className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Virtual Showroom Tour
            </h2>
            <p className="text-lg text-slate-600">
              Can't visit in person? Explore our showroom from home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Kitchen Displays',
                image: '/images/showroom/kitchen-displays.jpg',
                desc: '15+ kitchen cabinet setups in various styles',
              },
              {
                title: 'Material Samples',
                image: '/images/showroom/door-samples.jpg',
                desc: '100+ door styles and finish samples',
              },
              {
                title: 'Design Center',
                image: '/images/showroom/design-center.jpg',
                desc: 'Work with designers on your custom plan',
              },
            ].map((item, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                <div className="aspect-w-16 aspect-h-12 bg-slate-200">
                  {/* Image placeholder */}
                  <div className="w-full h-64 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                    <Camera className="w-12 h-12 text-slate-400" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-300">{item.desc}</p>
                  </div>
                </div>
                <div className="p-4 bg-white">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Visit */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Visit Our Showroom?
            </h2>
          </div>

          <div className="space-y-4">
            {[
              'See quality differences that photos can\'t capture - feel the heft of soft-close hinges and drawer glides',
              'Compare finishes under different lighting conditions to ensure they match your home',
              'Test storage solutions hands-on - open drawers, pull-out organizers, and specialty accessories',
              'Get instant answers to questions from experienced designers who know Houston homes',
              'Avoid costly mistakes by seeing cabinet sizes, door styles, and layouts in real 3D space',
              'Bring photos or measurements - designers can sketch initial concepts during your visit',
              'No pressure, no obligation - we want you to be confident in your decision',
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start bg-white rounded-lg p-4 shadow-sm">
                <CheckCircle className="w-6 h-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                <p className="text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book Appointment */}
      <section id="book-appointment" className="py-16 bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Schedule Your Showroom Visit
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Book a time that works for you. We'll have a designer ready to give you their full attention.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-accent-light transition-all shadow-lg hover:shadow-xl"
            >
              Book Appointment Online
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href={`tel:${businessInfo.phone.replace(/\D/g, '')}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-dark text-white rounded-lg font-semibold hover:bg-primary-dark transition-all"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call {businessInfo.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShowroomPage;
