import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Image as ImageIcon,
  AlertCircle,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { FormButton } from '../../components/admin/ui/FormButton';
import AdminLayout from '../../components/admin/AdminLayout';
import ProtectedRoute from '../../components/admin/ProtectedRoute';

// Sample image interface - matches the Visualizer interface
interface SampleImage {
  id: string;
  name: string;
  url: string;
  category: 'kitchen' | 'bathroom' | 'closet' | 'office';
}

// Default sample images from Visualizer.tsx
const defaultSampleImages: SampleImage[] = [
  {
    id: 'kitchen-1',
    name: 'Empty Kitchen',
    url: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80',
    category: 'kitchen',
  },
  {
    id: 'kitchen-2',
    name: 'Modern Kitchen',
    url: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80',
    category: 'kitchen',
  },
  {
    id: 'kitchen-3',
    name: 'White Kitchen',
    url: 'https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=1200&q=80',
    category: 'kitchen',
  },
  {
    id: 'bathroom-1',
    name: 'Modern Bathroom',
    url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    category: 'bathroom',
  },
  {
    id: 'bathroom-2',
    name: 'Elegant Vanity',
    url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80',
    category: 'bathroom',
  },
  {
    id: 'closet-1',
    name: 'Bedroom Closet',
    url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80',
    category: 'closet',
  },
  {
    id: 'closet-2',
    name: 'Walk-In Closet',
    url: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=80',
    category: 'closet',
  },
  {
    id: 'office-1',
    name: 'Living Room',
    url: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?w=1200&q=80',
    category: 'office',
  },
  {
    id: 'office-2',
    name: 'Home Office',
    url: 'https://images.unsplash.com/photo-1486946255434-2466348c2166?w=1200&q=80',
    category: 'office',
  },
];

const STORAGE_KEY = 'visualizer_sample_images';

const categoryLabels: Record<string, string> = {
  kitchen: 'Kitchens',
  bathroom: 'Bathrooms',
  closet: 'Closets',
  office: 'Home Office',
};

const categoryColors: Record<string, string> = {
  kitchen: 'bg-blue-100 text-blue-700',
  bathroom: 'bg-purple-100 text-purple-700',
  closet: 'bg-amber-100 text-amber-700',
  office: 'bg-green-100 text-green-700',
};

// Generate unique ID
const generateId = (category: string): string => {
  return `${category}-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

export default function SampleImages() {
  const [images, setImages] = useState<SampleImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['kitchen', 'bathroom', 'closet', 'office']));

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<SampleImage | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    category: 'kitchen' as SampleImage['category'],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [imagePreviewError, setImagePreviewError] = useState(false);

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; image: SampleImage | null }>({
    show: false,
    image: null,
  });

  // Load images from localStorage on mount
  useEffect(() => {
    const loadImages = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setImages(parsed);
          } else {
            // Initialize with defaults if stored array is empty
            setImages(defaultSampleImages);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSampleImages));
          }
        } else {
          // No stored images, use defaults
          setImages(defaultSampleImages);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSampleImages));
        }
      } catch (error) {
        console.error('Failed to load sample images:', error);
        setImages(defaultSampleImages);
      }
      setIsLoading(false);
    };

    loadImages();
  }, []);

  // Save images to localStorage
  const saveImages = (newImages: SampleImage[]) => {
    setImages(newImages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
  };

  // Filter images by category
  const filteredImages = selectedCategory
    ? images.filter((img) => img.category === selectedCategory)
    : images;

  // Group images by category
  const imagesByCategory = images.reduce<Record<string, SampleImage[]>>((acc, img) => {
    if (!acc[img.category]) {
      acc[img.category] = [];
    }
    acc[img.category].push(img);
    return acc;
  }, {});

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  // Open modal for adding
  const handleAdd = () => {
    setEditingImage(null);
    setFormData({ name: '', url: '', category: 'kitchen' });
    setFormErrors({});
    setImagePreviewError(false);
    setShowModal(true);
  };

  // Open modal for editing
  const handleEdit = (image: SampleImage) => {
    setEditingImage(image);
    setFormData({
      name: image.name,
      url: image.url,
      category: image.category,
    });
    setFormErrors({});
    setImagePreviewError(false);
    setShowModal(true);
  };

  // Validate form
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Image name is required';
    }

    if (!formData.url.trim()) {
      errors.url = 'Image URL is required';
    } else {
      try {
        new URL(formData.url);
      } catch {
        errors.url = 'Please enter a valid URL';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingImage) {
      // Update existing image
      const updatedImages = images.map((img) =>
        img.id === editingImage.id
          ? { ...img, name: formData.name, url: formData.url, category: formData.category }
          : img
      );
      saveImages(updatedImages);
    } else {
      // Add new image
      const newImage: SampleImage = {
        id: generateId(formData.category),
        name: formData.name,
        url: formData.url,
        category: formData.category,
      };
      saveImages([...images, newImage]);
    }

    setShowModal(false);
  };

  // Handle delete
  const handleDelete = () => {
    if (deleteConfirm.image) {
      const updatedImages = images.filter((img) => img.id !== deleteConfirm.image?.id);
      saveImages(updatedImages);
      setDeleteConfirm({ show: false, image: null });
    }
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all sample images to defaults? This will remove any custom images you have added.')) {
      saveImages(defaultSampleImages);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-luxury-gray-600">Loading sample images...</p>
            </div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-luxury-gray-900">Sample Images</h1>
              <p className="text-luxury-gray-600 mt-1">
                Manage sample room images for the visualizer tool ({images.length} total)
              </p>
            </div>
            <div className="flex gap-3">
              <FormButton
                onClick={handleResetToDefaults}
                variant="secondary"
              >
                Reset to Defaults
              </FormButton>
              <FormButton
                onClick={handleAdd}
                icon={<Plus className="w-5 h-5" />}
              >
                Add New Image
              </FormButton>
            </div>
          </div>

          {/* Category Filter */}
          <div className="bg-white rounded-lg p-4 shadow-sm border border-luxury-sand">
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === ''
                    ? 'bg-primary text-white'
                    : 'bg-luxury-cream text-luxury-gray-700 hover:bg-luxury-beige'
                }`}
              >
                All Categories ({images.length})
              </button>
              {(['kitchen', 'bathroom', 'closet', 'office'] as const).map((category) => {
                const count = imagesByCategory[category]?.length || 0;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-luxury-cream text-luxury-gray-700 hover:bg-luxury-beige'
                    }`}
                  >
                    {categoryLabels[category]} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Images Grid by Category */}
          {selectedCategory ? (
            // Filtered view - single grid
            <div className="bg-white rounded-lg shadow-sm border border-luxury-sand p-6">
              <h2 className="text-xl font-semibold text-luxury-gray-900 mb-4">
                {categoryLabels[selectedCategory]}
              </h2>
              {filteredImages.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredImages.map((image) => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      onEdit={() => handleEdit(image)}
                      onDelete={() => setDeleteConfirm({ show: true, image })}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <ImageIcon className="w-16 h-16 mx-auto text-luxury-gray-300 mb-4" />
                  <p className="text-luxury-gray-500">No images in this category.</p>
                  <FormButton
                    onClick={handleAdd}
                    icon={<Plus className="w-5 h-5" />}
                    variant="secondary"
                  >
                    Add First Image
                  </FormButton>
                </div>
              )}
            </div>
          ) : (
            // All categories view - collapsible sections
            <div className="space-y-4">
              {(['kitchen', 'bathroom', 'closet', 'office'] as const).map((category) => {
                const categoryImages = imagesByCategory[category] || [];
                const isExpanded = expandedCategories.has(category);

                return (
                  <div
                    key={category}
                    className="bg-white rounded-lg shadow-sm border border-luxury-sand overflow-hidden"
                  >
                    <button
                      onClick={() => toggleCategory(category)}
                      className="w-full flex items-center justify-between p-4 hover:bg-luxury-cream transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-md text-sm font-medium ${categoryColors[category]}`}>
                          {categoryLabels[category]}
                        </span>
                        <span className="text-luxury-gray-500">
                          {categoryImages.length} image{categoryImages.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-luxury-gray-500 transition-transform ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 pt-0 border-t border-luxury-sand">
                            {categoryImages.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {categoryImages.map((image) => (
                                  <ImageCard
                                    key={image.id}
                                    image={image}
                                    onEdit={() => handleEdit(image)}
                                    onDelete={() => setDeleteConfirm({ show: true, image })}
                                  />
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-luxury-gray-500 mb-3">No images in this category.</p>
                                <FormButton
                                  onClick={() => {
                                    setFormData((prev) => ({ ...prev, category }));
                                    handleAdd();
                                  }}
                                  icon={<Plus className="w-4 h-4" />}
                                  variant="secondary"
                                >
                                  Add Image
                                </FormButton>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          )}

          {/* Add/Edit Modal */}
          <AnimatePresence>
            {showModal && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl shadow-luxury-lg max-w-lg w-full p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-luxury-gray-900">
                      {editingImage ? 'Edit Sample Image' : 'Add Sample Image'}
                    </h3>
                    <button
                      onClick={() => setShowModal(false)}
                      className="text-luxury-gray-500 hover:text-luxury-gray-700 transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Image Name */}
                    <div>
                      <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                        Image Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, name: e.target.value }));
                          if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        placeholder="e.g., Modern Kitchen"
                        className={`w-full px-4 py-3 border rounded-lg transition-all ${
                          formErrors.name
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary'
                        } focus:outline-none`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                        Image URL <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        value={formData.url}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, url: e.target.value }));
                          setImagePreviewError(false);
                          if (formErrors.url) setFormErrors((prev) => ({ ...prev, url: '' }));
                        }}
                        placeholder="https://images.unsplash.com/..."
                        className={`w-full px-4 py-3 border rounded-lg transition-all ${
                          formErrors.url
                            ? 'border-red-500 focus:ring-red-500'
                            : 'border-luxury-sand focus:ring-2 focus:ring-primary focus:border-primary'
                        } focus:outline-none`}
                      />
                      {formErrors.url && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.url}</p>
                      )}
                      <p className="mt-1 text-xs text-luxury-gray-500">
                        Use Unsplash URLs for best results. Add ?w=1200&q=80 for optimized loading.
                      </p>
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            category: e.target.value as SampleImage['category'],
                          }))
                        }
                        className="w-full px-4 py-3 border border-luxury-sand rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none"
                      >
                        {(['kitchen', 'bathroom', 'closet', 'office'] as const).map((cat) => (
                          <option key={cat} value={cat}>
                            {categoryLabels[cat]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Image Preview */}
                    {formData.url && (
                      <div>
                        <label className="block text-sm font-medium text-luxury-gray-700 mb-2">
                          Preview
                        </label>
                        <div className="relative aspect-video rounded-lg overflow-hidden bg-luxury-cream border border-luxury-sand">
                          {imagePreviewError ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-luxury-gray-500">
                              <AlertCircle className="w-8 h-8 mb-2" />
                              <p className="text-sm">Failed to load image</p>
                            </div>
                          ) : (
                            <img
                              src={formData.url}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={() => setImagePreviewError(true)}
                            />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex gap-3 pt-4">
                      <FormButton type="submit" icon={<Save className="w-5 h-5" />} fullWidth>
                        {editingImage ? 'Save Changes' : 'Add Image'}
                      </FormButton>
                      <FormButton
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                        fullWidth
                      >
                        Cancel
                      </FormButton>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          {/* Delete Confirmation Modal */}
          <AnimatePresence>
            {deleteConfirm.show && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl shadow-luxury-lg max-w-md w-full p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-luxury-gray-900 mb-2">
                        Delete Sample Image
                      </h3>
                      <p className="text-luxury-gray-600 mb-4">
                        Are you sure you want to delete "{deleteConfirm.image?.name}"? This action
                        cannot be undone.
                      </p>
                      <div className="flex gap-3">
                        <FormButton variant="danger" onClick={handleDelete} fullWidth>
                          Delete
                        </FormButton>
                        <FormButton
                          variant="secondary"
                          onClick={() => setDeleteConfirm({ show: false, image: null })}
                          fullWidth
                        >
                          Cancel
                        </FormButton>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

// Image Card Component
interface ImageCardProps {
  image: SampleImage;
  onEdit: () => void;
  onDelete: () => void;
}

function ImageCard({ image, onEdit, onDelete }: ImageCardProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group relative bg-white rounded-lg border border-luxury-sand overflow-hidden hover:shadow-lg transition-all">
      {/* Image */}
      <div className="aspect-video bg-luxury-cream relative">
        {hasError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-luxury-gray-400">
            <AlertCircle className="w-8 h-8 mb-2" />
            <p className="text-xs">Failed to load</p>
          </div>
        ) : (
          <img
            src={image.url}
            alt={image.name}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        )}

        {/* Hover overlay with actions */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={onEdit}
            className="p-2 bg-white rounded-lg text-luxury-gray-700 hover:bg-primary hover:text-white transition-colors"
            title="Edit"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-white rounded-lg text-luxury-gray-700 hover:bg-red-500 hover:text-white transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <a
            href={image.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white rounded-lg text-luxury-gray-700 hover:bg-blue-500 hover:text-white transition-colors"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="font-medium text-luxury-gray-900 truncate">{image.name}</h4>
        <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs font-medium ${categoryColors[image.category]}`}>
          {categoryLabels[image.category]}
        </span>
      </div>
    </div>
  );
}
