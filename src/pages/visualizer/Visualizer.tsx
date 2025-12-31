import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, Image as ImageIcon, Sparkles, Download } from 'lucide-react';
import SEO from '../../components/SEO';
import FinishDropdown from '../../components/ui/FinishDropdown';

const Visualizer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    finishId: '',
    finishName: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  // Image upload state
  const [roomImage, setRoomImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form validation
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    }

    if (!formData.finishId) {
      errors.finishId = 'Please select a finish';
    }

    if (!roomImage) {
      errors.roomImage = 'Please upload a room image';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Upload room image first
      let roomImageUrl = '';
      if (roomImage) {
        roomImageUrl = await uploadImage();
      }

      const submissionData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        finishId: formData.finishId,
        finishName: formData.finishName,
        roomImage: roomImageUrl,
      };

      // Submit to API (which also sends to webhook)
      const response = await fetch('/api/admin/visualizer-submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit visualization request');
      }

      const result = await response.json();

      // Check if we got a generated image back from the webhook
      if (result.generatedImage) {
        setGeneratedImage(result.generatedImage);
      }

      // Success!
      setSubmitStatus('success');
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        finishId: '',
        finishName: '',
      });
      setRoomImage(null);
      setImagePreview(null);
      setFormErrors({});
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'An unexpected error occurred. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFinishChange = (finishId: string, finishName: string) => {
    setFormData((prev) => ({ ...prev, finishId, finishName }));
    if (formErrors.finishId) {
      setFormErrors((prev) => ({ ...prev, finishId: '' }));
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError('');

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setImageError('Please upload a JPG, PNG, or WebP image');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setImageError('Image must be under 10MB');
      return;
    }

    setRoomImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Clear form error
    if (formErrors.roomImage) {
      setFormErrors((prev) => ({ ...prev, roomImage: '' }));
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveImage = () => {
    setRoomImage(null);
    setImagePreview(null);
  };

  const uploadImage = async (): Promise<string> => {
    if (!roomImage) return '';

    setIsUploading(true);

    try {
      const response = await fetch(
        `/api/upload-attachment?filename=${encodeURIComponent(roomImage.name)}`,
        {
          method: 'POST',
          body: roomImage,
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to upload image');
      }

      const result = await response.json();
      return result.url;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <SEO
        title="Free Room Visualizer - See Your Cabinets Before You Buy"
        description="Upload a photo of your room and see how YuDezign's premium cabinet finishes will look in your space. Free visualization tool for kitchens, closets, and bathrooms."
        keywords="cabinet visualizer, room design tool, kitchen visualization, cabinet preview, free design tool, houston cabinets"
        url="https://yudezign.com/visualizer"
      />
      <div className="min-h-screen pt-24 bg-luxury-cream">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              className="w-16 h-1 bg-accent mx-auto mb-8"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 64, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Sparkles className="w-8 h-8 text-accent" />
              <span className="text-body-lg font-medium text-accent uppercase tracking-wider">
                Free Tool
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-display-mobile md:text-display font-medium mb-6"
            >
              Room Visualizer
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-body-lg md:text-h4 font-light text-white/90 max-w-2xl mx-auto"
            >
              See how our premium cabinet finishes will look in your space. Upload a photo, pick a finish, and we'll create a visualization just for you.
            </motion.p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-20 px-4 bg-luxury-white">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-lg p-8 md:p-12 shadow-luxury-lg border border-luxury-sand"
            >
              <div className="w-16 h-1 bg-primary mb-8"></div>
              <h2 className="text-h2 font-medium text-luxury-gray-900 mb-4">
                Get Your Free Visualization
              </h2>
              <p className="text-body text-luxury-gray-600 mb-8">
                Upload a photo of your room and select your preferred cabinet finish. Our team will create a visualization showing how your space could look with YuDezign cabinets.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Room Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Photo <span className="text-red-500">*</span>
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageSelect}
                    className="hidden"
                  />

                  {!imagePreview ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
                        ${formErrors.roomImage ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-primary bg-luxury-beige'}
                      `}
                    >
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" strokeWidth={1.5} />
                      <p className="text-body text-gray-600 mb-2">
                        Click to upload your room photo
                      </p>
                      <p className="text-body-sm text-gray-500">
                        JPG, PNG, or WebP up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imagePreview}
                        alt="Room preview"
                        className="w-full h-64 object-cover"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        {roomImage?.name}
                      </div>
                    </div>
                  )}

                  {(imageError || formErrors.roomImage) && (
                    <p className="mt-2 text-sm text-red-500">
                      {imageError || formErrors.roomImage}
                    </p>
                  )}
                </div>

                {/* Finish Dropdown */}
                <FinishDropdown
                  value={formData.finishId}
                  onChange={handleFinishChange}
                  error={formErrors.finishId}
                />

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                      ${formErrors.name ? 'border-red-500' : 'border-gray-300'}
                    `}
                    placeholder="John Smith"
                  />
                  {formErrors.name && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                      ${formErrors.email ? 'border-red-500' : 'border-gray-300'}
                    `}
                    placeholder="john@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-luxury-cream focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
                      ${formErrors.phone ? 'border-red-500' : 'border-gray-300'}
                    `}
                    placeholder="(123) 456-7890"
                  />
                  {formErrors.phone && (
                    <p className="mt-1 text-sm text-red-500">{formErrors.phone}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isUploading}
                  className="w-full px-12 py-4 bg-primary text-white text-body-lg font-medium rounded-lg hover:bg-primary-light transition-all duration-300 shadow-luxury hover:shadow-luxury-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Uploading image...</span>
                    </>
                  ) : isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Get My Free Visualization</span>
                    </>
                  )}
                </button>

                {/* Success Message with Generated Image */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Generated Image Display */}
                    {generatedImage && (
                      <div className="bg-white rounded-lg border-2 border-primary shadow-luxury-lg overflow-hidden">
                        <div className="bg-primary px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent" />
                            <span className="text-white font-medium">Your Room Visualization</span>
                          </div>
                          <a
                            href={generatedImage}
                            download="room-visualization.png"
                            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-lg text-sm transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </div>
                        <div className="p-4">
                          <img
                            src={generatedImage}
                            alt="Your room with YuDezign cabinets"
                            className="w-full rounded-lg shadow-md"
                          />
                        </div>
                      </div>
                    )}

                    {/* Success Message */}
                    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-body text-green-800 text-center font-medium mb-2">
                        {generatedImage
                          ? 'Your visualization is ready! Download it above.'
                          : 'Thank you! Your visualization request has been submitted.'}
                      </p>
                      <p className="text-body-sm text-green-700 text-center">
                        {generatedImage
                          ? "We'll also send this to your email for your records."
                          : 'Our team will create your personalized visualization and send it to your email within 1-2 business days.'}
                      </p>
                    </div>

                    {/* Start New Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus('idle');
                        setGeneratedImage(null);
                      }}
                      className="w-full px-8 py-3 bg-luxury-cream text-primary border-2 border-primary font-medium rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Create Another Visualization
                    </button>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-red-50 border border-red-200 rounded-lg"
                  >
                    <p className="text-body text-red-800 text-center font-medium mb-2">
                      {errorMessage}
                    </p>
                    <p className="text-body-sm text-red-700 text-center">
                      Please try again or contact us at (281) 568-8000
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-12 text-center"
            >
              <h3 className="text-h3 font-medium text-luxury-gray-900 mb-8">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    step: '1',
                    title: 'Upload Your Photo',
                    description: 'Take a photo of your kitchen, closet, or any room you want to transform.',
                  },
                  {
                    step: '2',
                    title: 'Choose a Finish',
                    description: 'Browse our premium finishes and select the one that matches your vision.',
                  },
                  {
                    step: '3',
                    title: 'Receive Your Visualization',
                    description: 'Our team creates a personalized rendering and sends it to your email.',
                  },
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-h4 font-medium mx-auto mb-4">
                      {item.step}
                    </div>
                    <h4 className="text-h4 font-medium text-luxury-gray-900 mb-2">
                      {item.title}
                    </h4>
                    <p className="text-body text-luxury-gray-600">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Visualizer;