import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Upload, X, FileText, Loader2 } from 'lucide-react';
import SEO from '../../components/SEO';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    timeline: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // File upload state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Upload files first if any are selected
      let attachmentUrls: string[] = [];
      if (selectedFiles.length > 0) {
        attachmentUrls = await uploadFiles();
      }

      const submissionData = {
        ...formData,
        attachments: attachmentUrls,
        submittedAt: new Date().toISOString(),
        source: 'Yudezign Website',
      };

      // Dual submission: Send to both admin API and n8n webhook (in parallel)
      const [adminResponse, webhookResponse] = await Promise.allSettled([
        // Send to admin API for storage
        fetch('/api/admin/contact-messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        }),
        // Send to n8n webhook for notifications
        fetch('https://n8n.kaizhen8n.cloud/webhook/quote-form', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        }),
      ]);

      // Check if at least one succeeded
      const adminSuccess =
        adminResponse.status === 'fulfilled' && adminResponse.value.ok;
      const webhookSuccess =
        webhookResponse.status === 'fulfilled' && webhookResponse.value.ok;

      if (!adminSuccess && !webhookSuccess) {
        throw new Error('Failed to submit form to both systems');
      }

      // Log any partial failures (for debugging)
      if (!adminSuccess) {
        console.warn('Admin API submission failed, but n8n webhook succeeded');
      }
      if (!webhookSuccess) {
        console.warn('n8n webhook submission failed, but admin API succeeded');
      }

      // Success! (at least one submission worked)
      setSubmitStatus('success');
      // Reset form and files
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        timeline: '',
        message: '',
      });
      setSelectedFiles([]);
      setFileErrors([]);
      setUploadProgress({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message.includes('upload')
            ? 'Failed to upload files. Please try again or contact us directly.'
            : 'Unable to submit form. Please try again or contact us directly.'
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // File handling functions
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newFiles: File[] = [];
    const errors: string[] = [];

    // Validate each file
    Array.from(files).forEach((file) => {
      // Check file size (4MB limit)
      if (file.size > 4 * 1024 * 1024) {
        errors.push(`${file.name}: File size exceeds 4MB limit`);
        return;
      }

      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only PDF, JPG, and PNG allowed`);
        return;
      }

      newFiles.push(file);
    });

    setFileErrors(errors);
    setSelectedFiles((prev) => [...prev, ...newFiles]);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (selectedFiles.length === 0) return [];

    setIsUploading(true);
    const urls: string[] = [];

    try {
      // Upload each file
      for (const file of selectedFiles) {
        setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));

        const response = await fetch(`/api/upload-attachment?filename=${encodeURIComponent(file.name)}`, {
          method: 'POST',
          body: file,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Failed to upload file');
        }

        const result = await response.json();
        urls.push(result.url);

        setUploadProgress((prev) => ({ ...prev, [file.name]: 100 }));
      }

      return urls;
    } catch (error) {
      console.error('File upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Get Free Cabinet Quote"
        description="Get in touch with YuDeZign for custom European frameless cabinets in Houston. Free quotes, fast 2-3 week turnaround, supply-only pricing. Call (832) 516-5650 or email orders@yudezign.com for kitchen cabinets, closets, and vanities."
        keywords="contact cabinet maker, houston cabinet quote, custom cabinet pricing, european cabinet supplier, frameless cabinet quote, houston cabinetry"
        url="https://yudezign.com/contact"
      />
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

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    className="hidden"
                  />

                  {/* Upload area */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-luxury-gray-200 rounded-md p-8 text-center hover:border-primary bg-luxury-beige transition-colors cursor-pointer"
                  >
                    <Upload className="w-10 h-10 text-luxury-gray-400 mx-auto mb-3" strokeWidth={1.5} />
                    <p className="text-body text-luxury-gray-600 mb-1">
                      Click to upload plans, inspiration photos, or measurements
                    </p>
                    <p className="text-body-sm text-luxury-gray-500">PDF, JPG, PNG up to 4MB per file</p>
                  </div>

                  {/* File errors */}
                  {fileErrors.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {fileErrors.map((error, index) => (
                        <p key={index} className="text-body-sm text-red-600">
                          ⚠ {error}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Selected files list */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white rounded-md border border-luxury-gray-200"
                        >
                          <div className="flex items-center space-x-3 flex-1 min-w-0">
                            <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-body-sm text-luxury-gray-900 truncate">{file.name}</p>
                              <p className="text-body-sm text-luxury-gray-500">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                            {isUploading && uploadProgress[file.name] !== undefined && (
                              <div className="flex items-center space-x-2">
                                {uploadProgress[file.name] === 100 ? (
                                  <span className="text-green-600 text-body-sm">✓</span>
                                ) : (
                                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                )}
                              </div>
                            )}
                          </div>
                          {!isUploading && (
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="ml-2 p-1 hover:bg-red-50 rounded-md transition-colors"
                            >
                              <X className="w-5 h-5 text-red-500" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full px-12 py-4 bg-primary text-white text-body-lg font-medium rounded-md hover:bg-primary-light transition-all duration-300 shadow-luxury hover:shadow-luxury-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Uploading files...</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <span>Request Free Quote</span>
                  )}
                </button>

                {/* Success Message */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-green-50 border border-green-200 rounded-md"
                  >
                    <p className="text-body text-green-800 text-center font-medium">
                      ✓ Thank you! Your quote request has been submitted successfully.
                    </p>
                    <p className="text-body-sm text-green-700 text-center mt-1">
                      We'll contact you within 24 hours on business days.
                    </p>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-50 border border-red-200 rounded-md"
                  >
                    <p className="text-body text-red-800 text-center font-medium">
                      ✗ {errorMessage}
                    </p>
                    <p className="text-body-sm text-red-700 text-center mt-1">
                      You can also reach us at (281) 568-8000 or orders@yudezign.com
                    </p>
                  </motion.div>
                )}

                {submitStatus === 'idle' && (
                  <p className="text-body-sm text-luxury-gray-500 text-center">
                    We typically respond within 24 hours on business days.
                  </p>
                )}
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
                        13230 Murphy Rd, Ste 600<br />
                        Stafford, TX 77477<br />
                        United States
                      </p>
                      <a
                        href="https://www.google.com/maps/dir/?api=1&destination=13230+Murphy+Rd+Ste+600+Stafford+TX+77477"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary-dark text-body-sm mt-2 inline-block font-medium"
                      >
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
                      <a href="tel:+12815688000" className="text-body text-luxury-gray-600 hover:text-primary transition-colors">
                        (281) 568-8000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-medium text-h4 text-luxury-gray-900 mb-2">Email Us</h3>
                      <a href="mailto:orders@yudezign.com" className="text-body text-luxury-gray-600 hover:text-primary transition-colors">
                        orders@yudezign.com
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

              {/* Google Maps Embed */}
              <div className="bg-white rounded-lg overflow-hidden h-80 shadow-luxury border border-luxury-sand">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3467.8697832745777!2d-95.56934492349396!3d29.616758975219067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640e7a1b1b1b1b1%3A0x1234567890abcdef!2s13230%20Murphy%20Rd%20Ste%20600%2C%20Stafford%2C%20TX%2077477!5e0!3m2!1sen!2sus!4v1699123456789!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yudezign Location - 13230 Murphy Rd Ste 600, Stafford, TX 77477"
                />
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
    </>
  );
};

export default Contact;
