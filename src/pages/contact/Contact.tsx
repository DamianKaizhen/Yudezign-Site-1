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
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-primary to-primary-dark text-white">
        <div className="container-custom text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="heading-xl mb-4"
          >
            Get Your Free Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-neutral-200 max-w-2xl mx-auto"
          >
            Ready to transform your space? Contact us today for a free, no-obligation quote.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="card p-8"
            >
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">Request a Quote</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="(123) 456-7890"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-neutral-700 mb-2">
                    Project Type *
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  <label htmlFor="timeline" className="block text-sm font-medium text-neutral-700 mb-2">
                    Preferred Timeline *
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Tell us about your project, including dimensions, style preferences, and any specific requirements..."
                  />
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Attach Files (Optional)
                  </label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-600">
                      Click to upload plans, inspiration photos, or measurements
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="w-full btn-primary">
                  Request Free Quote
                </button>

                <p className="text-xs text-neutral-500 text-center">
                  We typically respond within 24 hours on business days.
                </p>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="card p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Visit Our Showroom</h3>
                      <p className="text-neutral-600">
                        Houston, TX 77001<br />
                        United States
                      </p>
                      <a href="#" className="text-primary hover:text-primary-dark text-sm mt-2 inline-block">
                        Get Directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Call Us</h3>
                      <a href="tel:+1234567890" className="text-neutral-600 hover:text-primary">
                        (123) 456-7890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Email Us</h3>
                      <a href="mailto:info@yudezign.com" className="text-neutral-600 hover:text-primary">
                        info@yudezign.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900 mb-1">Business Hours</h3>
                      <div className="text-neutral-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="card p-0 overflow-hidden h-80">
                <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-neutral-400 mx-auto mb-2" />
                    <p className="text-neutral-600">Google Map Embed</p>
                    <p className="text-sm text-neutral-500">Houston, TX Location</p>
                  </div>
                </div>
              </div>

              {/* Schedule Showroom Visit */}
              <div className="card p-8 bg-primary text-white">
                <h3 className="text-2xl font-bold mb-4">Schedule a Showroom Visit</h3>
                <p className="text-neutral-200 mb-6">
                  See our finishes in person and get expert design advice. Book your appointment today!
                </p>
                <button className="btn-secondary w-full">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="heading-lg mb-4">Frequently Asked Questions</h2>
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card p-6"
              >
                <h3 className="text-lg font-bold text-neutral-900 mb-2">{faq.question}</h3>
                <p className="text-neutral-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
