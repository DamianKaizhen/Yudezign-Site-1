import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Upload } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you shortly.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen pt-24 bg-luxury-cream">
      {/* Hero Section - Minimal with green accent */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="w-16 h-1 bg-accent mx-auto mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 64, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-mobile md:text-display font-medium mb-6"
          >
            Get Your Free Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-body-lg md:text-h4 font-light text-white/90 max-w-2xl mx-auto"
          >
            Ready to transform your space? Contact us today for a free, no-obligation quote.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-30 px-4 bg-luxury-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-10 shadow-luxury-lg border border-luxury-sand"
            >
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-8">Request a Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-luxury-gray-200 rounded-md bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-luxury-gray-200 rounded-md bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-luxury-gray-200 rounded-md bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-luxury-gray-200 rounded-md bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select a project type</option>
                    <option value="kitchen">Kitchen Cabinets</option>
                    <option value="closet">Custom Closet</option>
                    <option value="vanity">Bathroom Vanity</option>
                    <option value="custom">Custom Project</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Timeline */}
                <div>
                  <label htmlFor="timeline" className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Preferred Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-luxury-gray-200 rounded-md bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Select a timeline</option>
                    <option value="asap">ASAP (2-3 weeks)</option>
                    <option value="1-2months">1-2 months</option>
                    <option value="3-6months">3-6 months</option>
                    <option value="planning">Just planning</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-luxury-gray-200 rounded-md bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                    placeholder="Tell us about your project, including dimensions, style preferences, and any specific requirements..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-body-sm font-medium text-luxury-gray-700 mb-2">
                    Attach Files (Optional)
                  </label>
                  <div className="border-2 border-dashed border-luxury-gray-200 rounded-md p-8 text-center hover:border-primary bg-luxury-beige transition-colors cursor-pointer">
                    <Upload className="w-10 h-10 text-luxury-gray-400 mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-body text-luxury-gray-600 mb-1">
                      Click to upload plans, inspiration photos, or measurements
                    </p>
                    <p className="text-body-sm text-luxury-gray-500">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full px-12 py-4 bg-primary text-white text-body-lg font-medium rounded-md hover:bg-primary-light transition-all duration-300 shadow-luxury hover:shadow-luxury-lg">
                  Request Free Quote
                </button>

                <p className="text-body-sm text-luxury-gray-500 text-center">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-white rounded-lg p-10 shadow-luxury-lg border border-luxury-sand">
                <div className="w-16 h-1 bg-primary mb-8"></div>
                <h2 className="text-h2 font-medium text-luxury-gray-900 mb-8">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-h4 text-luxury-gray-900 mb-2">Visit Our Showroom</h3>
                      <p className="text-body text-luxury-gray-600 leading-relaxed">
                        Houston, TX 77001<br />
                        United States
                      </p>
                      <a href="#" className="text-primary hover:text-primary-dark text-body-sm mt-2 inline-block font-medium">
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-h4 text-luxury-gray-900 mb-2">Call Us</h3>
                      <a href="tel:+1234567890" className="text-body text-luxury-gray-600 hover:text-primary transition-colors">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-h4 text-luxury-gray-900 mb-2">Email Us</h3>
                      <a href="mailto:info@yudezign.com" className="text-body text-luxury-gray-600 hover:text-primary transition-colors">
                        info@yudezign.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-h4 text-luxury-gray-900 mb-2">Business Hours</h3>
                      <div className="text-body text-luxury-gray-600 space-y-1 leading-relaxed">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-white rounded-lg overflow-hidden h-80 shadow-luxury border border-luxury-sand">
                <div className="w-full h-full bg-luxury-beige flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-luxury-gray-400 mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-body text-luxury-gray-600">Google Map Embed</p>
                    <p className="text-body-sm text-luxury-gray-500">Houston, TX Location</p>
                  </div>
                </div>
              </div>

              {/* Schedule Showroom Visit */}
              <div className="bg-primary rounded-lg p-10 text-white shadow-luxury-lg">
                <h3 className="text-h3 font-medium mb-4">Schedule a Showroom Visit</h3>
                <p className="text-body text-white/80 mb-8 leading-relaxed">
                  See our finishes in person and get expert design advice. Book your appointment today!
                </p>
                <button className="w-full px-12 py-4 bg-white text-primary text-body-lg font-medium rounded-md hover:bg-luxury-cream transition-all duration-300">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-30 px-4 bg-luxury-beige">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-1 bg-primary mx-auto mb-8"></div>
            <h2 className="text-display-mobile md:text-display font-medium text-luxury-gray-900">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: 'How long does it take to get a quote?',
                answer: 'We typically provide quotes within 24-48 hours on business days. Complex projects may take up to 3 business days.',
              },
              {
                question: 'Do you offer installation services?',
                answer: 'We are a supply-only manufacturer, but we can connect you with experienced installers in the Houston area.',
              },
              {
                question: 'What is your turnaround time?',
                answer: 'Most projects are completed in 2-3 weeks from order confirmation. Complex or large projects may take 3-4 weeks.',
              },
              {
                question: 'Do you ship outside of Houston?',
                answer: 'Yes! While we\'re based in Houston, we can ship to anywhere in Texas and surrounding states.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-8 shadow-luxury hover:shadow-luxury-lg transition-shadow duration-300"
              >
                <h3 className="text-h4 font-medium text-luxury-gray-900 mb-3">{faq.question}</h3>
                <p className="text-body text-luxury-gray-600 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
