import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Loader2, Image as ImageIcon, Sparkles, Download, Camera, Palette, Wand2 } from 'lucide-react';
import SEO from '../../components/SEO';
import FinishDropdown from '../../components/ui/FinishDropdown';

interface FinishSelection {
  id: string;
  name: string;
  imageUrl: string;
}

const Visualizer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    description: '',
  });

  const [selectedFinishes, setSelectedFinishes] = useState<FinishSelection[]>([]);

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

    if (selectedFinishes.length === 0) {
      errors.finishes = 'Please select at least one finish';
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
        description: formData.description || undefined,
        finishes: selectedFinishes,
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
        description: '',
      });
      setSelectedFinishes([]);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFinishChange = (selections: FinishSelection[]) => {
    setSelectedFinishes(selections);
    if (formErrors.finishes) {
      setFormErrors((prev) => ({ ...prev, finishes: '' }));
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
        description="Upload a photo of your room and see how YuDezign's premium cabinet finishes will look in your space. Free AI-powered visualization tool for kitchens, closets, and bathrooms."
        keywords="cabinet visualizer, room design tool, kitchen visualization, cabinet preview, free design tool, houston cabinets, AI room design"
        url="https://yudezign.com/visualizer"
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Modern Hero Section */}
        <section className="relative pt-32 pb-20 px-4 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8"
            >
              <Wand2 className="w-4 h-4" />
              <span className="text-sm font-semibold uppercase tracking-wider">AI-Powered • Free Tool</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Visualize Your Dream
              <span className="block text-primary">Cabinets Instantly</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-12"
            >
              Upload a photo of your room, choose up to 2 cabinet finishes, and see your space transformed with our premium European-style cabinets.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {[
                { icon: Camera, text: 'Upload Any Room' },
                { icon: Palette, text: 'Mix & Match Colors' },
                { icon: Sparkles, text: 'Instant Results' },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-2 bg-white shadow-md rounded-full px-5 py-2.5">
                  <feature.icon className="w-5 h-5 text-primary" />
                  <span className="text-gray-700 font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 overflow-hidden"
            >
              {/* Form Header */}
              <div className="bg-gradient-to-r from-primary via-primary to-primary-dark px-8 py-6">
                <h2 className="text-2xl font-bold text-white">Create Your Visualization</h2>
                <p className="text-white/80 mt-1">Fill in the details below to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Step 1: Room Image */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">1</div>
                    <h3 className="text-lg font-semibold text-gray-900">Upload Your Room Photo</h3>
                  </div>

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
                      className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 group
                        ${formErrors.roomImage
                          ? 'border-red-400 bg-red-50'
                          : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                        }
                      `}
                    >
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                        <Upload className="w-10 h-10 text-gray-400 group-hover:text-primary transition-colors" strokeWidth={1.5} />
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-2">
                        Drop your room photo here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse • JPG, PNG, WebP up to 10MB
                      </p>
                    </div>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                      <img
                        src={imagePreview}
                        alt="Room preview"
                        className="w-full h-72 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-4 right-4 p-2.5 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                      <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-sm flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        {roomImage?.name}
                      </div>
                    </div>
                  )}

                  {(imageError || formErrors.roomImage) && (
                    <p className="text-sm text-red-500 flex items-center gap-2">
                      <span className="w-1 h-1 bg-red-500 rounded-full" />
                      {imageError || formErrors.roomImage}
                    </p>
                  )}
                </div>

                {/* Step 2: Finish Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2</div>
                    <h3 className="text-lg font-semibold text-gray-900">Choose Your Cabinet Finishes</h3>
                  </div>

                  <FinishDropdown
                    value={selectedFinishes}
                    onChange={handleFinishChange}
                    error={formErrors.finishes}
                    maxSelections={2}
                  />
                </div>

                {/* Step 3: Description (Optional) */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">3</div>
                    <h3 className="text-lg font-semibold text-gray-900">Describe Your Vision <span className="text-gray-400 font-normal text-base">(Optional)</span></h3>
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      What features would you like to see in your new space?
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3.5 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-primary transition-all border-gray-200 resize-none"
                      placeholder="E.g., I'd like to see shaker-style cabinet doors, soft-close drawers, a kitchen island with seating, and under-cabinet lighting..."
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Share any specific cabinet styles, features, or design ideas you'd like included in your visualization.
                    </p>
                  </div>
                </div>

                {/* Step 4: Contact Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">4</div>
                    <h3 className="text-lg font-semibold text-gray-900">Your Contact Information</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                        className={`w-full px-4 py-3.5 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-primary transition-all
                          ${formErrors.name ? 'border-red-400' : 'border-gray-200'}
                        `}
                        placeholder="John Smith"
                      />
                      {formErrors.name && (
                        <p className="mt-1.5 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-primary transition-all
                          ${formErrors.email ? 'border-red-400' : 'border-gray-200'}
                        `}
                        placeholder="john@example.com"
                      />
                      {formErrors.email && (
                        <p className="mt-1.5 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-3.5 border-2 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-0 focus:border-primary transition-all
                          ${formErrors.phone ? 'border-red-400' : 'border-gray-200'}
                        `}
                        placeholder="(123) 456-7890"
                      />
                      {formErrors.phone && (
                        <p className="mt-1.5 text-sm text-red-500">{formErrors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || isUploading}
                    className="w-full px-12 py-5 bg-gradient-to-r from-primary to-primary-dark text-white text-lg font-semibold rounded-2xl hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex items-center justify-center gap-3"
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Uploading image...</span>
                      </>
                    ) : isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Generating visualization...</span>
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-6 h-6" />
                        <span>Generate My Visualization</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Success Message with Generated Image */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    {/* Generated Image Display */}
                    {generatedImage && (
                      <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 border border-primary/10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Sparkles className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900">Your Visualization is Ready!</h4>
                              <p className="text-sm text-gray-500">AI-generated preview of your room</p>
                            </div>
                          </div>
                          <a
                            href={generatedImage}
                            download="yudezign-room-visualization.png"
                            className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors font-medium"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </a>
                        </div>
                        <img
                          src={generatedImage}
                          alt="Your room with YuDezign cabinets"
                          className="w-full rounded-xl shadow-lg"
                        />
                      </div>
                    )}

                    {/* Success Message */}
                    <div className="p-6 bg-green-50 border border-green-100 rounded-2xl text-center">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-green-600" />
                      </div>
                      <p className="text-lg font-semibold text-green-800 mb-2">
                        {generatedImage
                          ? 'Your visualization is ready!'
                          : 'Thank you! Your request has been submitted.'}
                      </p>
                      <p className="text-green-700">
                        {generatedImage
                          ? 'Download your visualization above to save it.'
                          : 'Our team will create your personalized visualization shortly.'}
                      </p>
                    </div>

                    {/* Start New Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus('idle');
                        setGeneratedImage(null);
                      }}
                      className="w-full px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Create Another Visualization
                    </button>
                  </motion.div>
                )}

                {/* Error Message */}
                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center"
                  >
                    <p className="text-lg font-semibold text-red-800 mb-2">
                      {errorMessage}
                    </p>
                    <p className="text-red-600">
                      Please try again or contact us at (281) 568-8000
                    </p>
                  </motion.div>
                )}
              </form>
            </motion.div>

            {/* How It Works - Modern Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-20"
            >
              <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Camera,
                    step: '1',
                    title: 'Upload Your Photo',
                    description: 'Snap a photo of your kitchen, bathroom, or any room you want to upgrade.',
                    gradient: 'from-blue-500 to-blue-600',
                  },
                  {
                    icon: Palette,
                    step: '2',
                    title: 'Pick Your Finishes',
                    description: 'Choose 1-2 cabinet finishes to see how they blend in your space.',
                    gradient: 'from-primary to-primary-dark',
                  },
                  {
                    icon: Sparkles,
                    step: '3',
                    title: 'Get Your Preview',
                    description: 'Our AI generates a realistic visualization of your transformed room.',
                    gradient: 'from-accent to-amber-600',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300"
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                      <item.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-sm font-bold text-gray-400 mb-2">STEP {item.step}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
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