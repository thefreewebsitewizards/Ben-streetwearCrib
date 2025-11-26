import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { functions, storage, auth, db } from '../firebase'
import { httpsCallable } from 'firebase/functions'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { onAuthStateChanged, signOut, type User } from 'firebase/auth'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import Signin from '../components/Signin'
import Signup from '../components/Signup'

// Interface for Image Item
interface ImageItem {
    id: string;
    url: string;
    file?: File; // Optional, only for new uploads
}

function ProductsSection({ onEdit, onDelete }: { onEdit: (product: any) => void, onDelete: (product: any) => void }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for products
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedProducts = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setProducts(fetchedProducts);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-white text-2xl font-bold leading-tight tracking-tight">Products</h2>
      <div className="rounded-xl border border-gray-800/60 bg-foreground-dark overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="border-b border-gray-800/60 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3" scope="col">Product</th>
                <th className="px-6 py-3" scope="col">Category</th>
                <th className="px-6 py-3" scope="col">Price</th>
                <th className="px-6 py-3" scope="col">Stock</th>
                <th className="px-6 py-3" scope="col">Rating</th>
                <th className="px-6 py-3 text-right" scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-6 py-4 text-center text-white">Loading products...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-4 text-center text-white">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-800/60 hover:bg-background-dark/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                            <img 
                                src={product.imageUrl || (product.images && product.images[0]) || 'https://placehold.co/100x100?text=No+Img'} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <span className="truncate max-w-[150px]">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4 font-medium text-white">${product.price}</td>
                    <td className="px-6 py-4">{product.stock}</td>
                    <td className="px-6 py-4 flex items-center gap-1">
                        <span className="material-symbols-outlined text-yellow-500 text-sm">star</span>
                        {product.rating || 0}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                          <button onClick={() => onEdit(product)} className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-blue-900/20 transition-colors" title="Edit">
                              <span className="material-symbols-outlined text-lg">edit</span>
                          </button>
                          <button onClick={() => onDelete(product)} className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-900/20 transition-colors" title="Delete">
                              <span className="material-symbols-outlined text-lg">delete</span>
                          </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

const AVAILABLE_SIZES = ['US 7', 'US 7.5', 'US 8', 'US 8.5', 'US 9', 'US 9.5', 'US 10', 'US 10.5', 'US 11', 'US 12', 'US 13', 'S', 'M', 'L', 'XL', 'XXL'];

const AVAILABLE_CATEGORIES = [
  'All Products',
  'New Arrivals',
  'New Releases',
  'Jordan',
  'Nike',
  'Adidas',
  'Hats',
  'Watches',
  'Shirts',
  'Hoodies',
  'Best Selling',
  'Home carousel'
];

function AddProductSection() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'All Products', // Keep for backward compatibility
    categories: ['All Products'], // Array for multi-select
    shippingInfo: '',
    materialsCare: '',
    color: '',
    rating: '',
    reviewCount: ''
  });
  
  // Manage images as objects to handle both existing URLs and new Files
  const [imageList, setImageList] = useState<ImageItem[]>([]);
  
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Edit/Delete State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    let key = id;
    if (id === 'product-name') key = 'name';
    if (id === 'product-description') key = 'description';
    if (id === 'product-price') key = 'price';
    if (id === 'stock-quantity') key = 'stock';
    if (id === 'product-category') key = 'category';
    if (id === 'shipping-info') key = 'shippingInfo';
    if (id === 'materials-care') key = 'materialsCare';
    if (id === 'product-color') key = 'color';
    if (id === 'product-rating') key = 'rating';
    if (id === 'review-count') key = 'reviewCount';
    
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleCategoryChange = (category: string) => {
    setFormData(prev => {
      const currentCategories = prev.categories || [];
      const updatedCategories = currentCategories.includes(category)
        ? currentCategories.filter(c => c !== category)
        : [...currentCategories, category];
      
      // Update the legacy category field with the first selected category or default
      const legacyCategory = updatedCategories.length > 0 ? updatedCategories[0] : 'All Products';
      
      return { ...prev, categories: updatedCategories, category: legacyCategory };
    });
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryDropdownRef]);

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = files.map(file => ({
          id: Math.random().toString(36).substr(2, 9),
          url: URL.createObjectURL(file),
          file: file
      }));
      setImageList(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (id: string) => {
    setImageList(prev => {
        const img = prev.find(i => i.id === id);
        if (img && img.file) {
            URL.revokeObjectURL(img.url);
        }
        return prev.filter(i => i.id !== id);
    });
  };

  // Clean up URL objects when component unmounts
  useEffect(() => {
    return () => {
      imageList.forEach(img => {
          if (img.file) URL.revokeObjectURL(img.url);
      });
    };
  }, []); // Only on unmount

  const handleEdit = (product: any) => {
      setEditingId(product.id);
      setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price?.toString() || '',
          stock: product.stock?.toString() || '',
          category: product.category || 'All Products',
          categories: product.categories || (product.category ? [product.category] : ['All Products']),
          shippingInfo: product.shippingInfo || '',
          materialsCare: product.materialsCare || '',
          color: product.colors ? product.colors.join(', ') : (product.color || ''),
          rating: product.rating?.toString() || '',
          reviewCount: product.reviewCount?.toString() || ''
      });
      setSelectedSizes(product.sizes || []);
      
      // Handle existing images
      const existingImages = (product.images || []).map((url: string) => ({
          id: Math.random().toString(36).substr(2, 9),
          url: url,
          file: undefined
      }));
      setImageList(existingImages);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteClick = (product: any) => {
      setProductToDelete(product);
      setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
      if (!productToDelete) return;
      try {
          const deleteProduct = httpsCallable(functions, 'deleteProduct');
          await deleteProduct({ productId: productToDelete.id });
          setMessage({ type: 'success', text: 'Product deleted successfully.' });
          
          // Reset form if we were editing the deleted product
          if (editingId === productToDelete.id) {
              resetForm();
          }
      } catch (error: any) {
          console.error("Error deleting product:", error);
          setMessage({ type: 'error', text: 'Failed to delete product: ' + error.message });
      } finally {
          setShowDeleteModal(false);
          setProductToDelete(null);
      }
  };

  const resetForm = () => {
      setFormData({ 
        name: '', description: '', price: '', stock: '', category: 'All Products', categories: ['All Products'],
        shippingInfo: '', materialsCare: '', color: '', rating: '', reviewCount: ''
      });
      setImageList(prev => {
          prev.forEach(img => { if (img.file) URL.revokeObjectURL(img.url); });
          return [];
      });
      setSelectedSizes([]);
      setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const finalImageUrls: string[] = [];
      
      // Upload new images and keep existing URLs
      for (const img of imageList) {
          if (img.file) {
              // Upload new file
              const storageRef = ref(storage, `products/${Date.now()}_${img.file.name}`);
              const snapshot = await uploadBytes(storageRef, img.file);
              const url = await getDownloadURL(snapshot.ref);
              finalImageUrls.push(url);
          } else {
              // Keep existing URL
              finalImageUrls.push(img.url);
          }
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        categories: formData.categories,
        shippingInfo: formData.shippingInfo,
        materialsCare: formData.materialsCare,
        sizes: selectedSizes,
        images: finalImageUrls,
        imageUrl: finalImageUrls[0] || '', // Fallback
        color: formData.color,
        colors: formData.color.split(',').map(c => c.trim()).filter(c => c !== ''),
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        reviewCount: formData.reviewCount ? parseInt(formData.reviewCount) : 0
      };

      if (editingId) {
          // Update existing
          const updateProduct = httpsCallable(functions, 'updateProduct');
          await updateProduct({
              productId: editingId,
              ...productData
          });
          setMessage({ type: 'success', text: 'Product updated successfully!' });
      } else {
          // Create new
          const addProduct = httpsCallable(functions, 'addProduct');
          await addProduct({
              ...productData,
          });
          setMessage({ type: 'success', text: 'Product created successfully!' });
      }

      resetForm();
    } catch (error: any) {
      console.error(error);
      setMessage({ type: 'error', text: `Failed to ${editingId ? 'update' : 'upload'} product: ` + error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 p-8 overflow-y-auto">
      <div className="flex flex-col gap-12 max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-white text-3xl font-bold leading-tight tracking-tight">{editingId ? 'Edit Product' : 'Add New Product'}</p>
            <div className="flex gap-3">
                {editingId && (
                    <button onClick={resetForm} className="px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors">
                        Cancel Edit
                    </button>
                )}
                <Link to="/" className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-colors">
                    Back to Website
                    <span className="material-symbols-outlined text-base">arrow_outward</span>
                </Link>
            </div>
          </div>

          {/* Messages */}
          {message.text && (
            <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <div className="rounded-xl p-6 lg:p-8 border border-gray-800/60 bg-foreground-dark shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <form className="grid grid-cols-1 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
              <div className="lg:col-span-2 flex flex-col gap-6">
                {/* Product Name */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-name">Product Name</label>
                  <input 
                    className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white" 
                    id="product-name" 
                    placeholder="e.g. Air Jordan 1 Retro High" 
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-description">Description</label>
                  <textarea 
                    className="w-full min-h-40 p-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-background-dark" 
                    id="product-description" 
                    placeholder="Enter a detailed description..." 
                    rows={6}
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                
                {/* Materials & Shipping */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="materials-care">Materials & Care</label>
                      <textarea 
                        className="w-full min-h-24 p-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-background-dark" 
                        id="materials-care" 
                        value={formData.materialsCare}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="shipping-info">Shipping & Returns</label>
                      <textarea 
                        className="w-full min-h-24 p-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-background-dark" 
                        id="shipping-info" 
                        value={formData.shippingInfo}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                </div>

                {/* Price, Stock, Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-price">Price</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                      <input 
                        className="h-12 w-full pl-7 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white" 
                        id="product-price" 
                        type="text" 
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="stock-quantity">Stock Quantity</label>
                    <input 
                      className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                      id="stock-quantity" 
                      type="number" 
                      value={formData.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-category">Category</label>
                    <div className="relative" ref={categoryDropdownRef}>
                      <button
                        type="button"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white focus:ring-primary focus:border-primary text-left flex items-center justify-between"
                      >
                        <span className="truncate">
                          {formData.categories && formData.categories.length > 0 
                            ? formData.categories.join(', ') 
                            : 'Select Categories'}
                        </span>
                        <span className="material-symbols-outlined">expand_more</span>
                      </button>
                      
                      {showCategoryDropdown && (
                        <div className="absolute z-10 w-full mt-1 bg-foreground-dark border border-gray-800/60 rounded-lg shadow-lg max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-background-dark">
                          {AVAILABLE_CATEGORIES.map((category) => (
                            <div 
                              key={category} 
                              className="flex items-center px-4 py-2 hover:bg-background-dark cursor-pointer"
                              onClick={() => handleCategoryChange(category)}
                            >
                              <input
                                type="checkbox"
                                checked={formData.categories?.includes(category) || false}
                                onChange={() => {}} // Handled by div click
                                className="mr-3 h-4 w-4 rounded border-gray-600 bg-gray-700 text-primary focus:ring-primary"
                              />
                              <span className="text-white text-sm">{category}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Color & Rating */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-color">Color</label>
                        <input 
                            className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white" 
                            id="product-color" 
                            placeholder="e.g. Red, Blue, Black" 
                            type="text" 
                            value={formData.color}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-rating">Rating (0-5)</label>
                        <div className="grid grid-cols-2 gap-3">
                            <input 
                                className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                id="product-rating" 
                                placeholder="Rate 0-5" 
                                type="number" 
                                step="0.1"
                                min="0"
                                max="5"
                                value={formData.rating}
                                onChange={handleInputChange}
                            />
                            <input 
                                className="h-12 w-full px-3 bg-background-dark border border-gray-800/60 rounded-lg text-white placeholder-gray-500 focus:ring-primary focus:border-primary focus:bg-background-dark autofill:bg-background-dark autofill:text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                                id="review-count" 
                                placeholder="Reviews" 
                                type="number" 
                                min="0"
                                value={formData.reviewCount}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </div>

                {/* Sizes */}
                <div>
                    <label className="text-sm font-medium text-gray-300 mb-2 block">Available Sizes</label>
                    <div className="flex flex-wrap gap-2">
                        {AVAILABLE_SIZES.map(size => (
                            <button
                                key={size}
                                type="button"
                                onClick={() => handleSizeChange(size)}
                                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                    selectedSizes.includes(size)
                                        ? 'bg-primary border-primary text-white'
                                        : 'bg-background-dark border-gray-800/60 text-gray-400 hover:border-gray-600'
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>
              </div>

              {/* Image Upload Section - Vertical Layout Improved */}
              <div className="lg:col-span-1 flex flex-col gap-6 h-full">
                <div className="flex flex-col flex-1 min-h-[500px]">
                  <label className="text-sm font-medium text-gray-300 mb-2 block" htmlFor="product-images">Product Images</label>
                  
                  {/* Image List / Preview Area - Takes available space */}
                  <div className="flex-1 border border-gray-800/60 rounded-lg bg-background-dark p-4 flex flex-col gap-4 overflow-y-auto max-h-[600px]">
                      
                      {/* Upload Button inside */}
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-800/60 border-dashed rounded-lg cursor-pointer hover:bg-white/5 transition-colors flex-shrink-0">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <span className="material-symbols-outlined text-gray-400 text-3xl"> cloud_upload </span>
                          <p className="mt-2 text-sm text-gray-400">Click to upload images</p>
                        </div>
                        <input className="hidden" id="dropzone-file" type="file" multiple onChange={handleFileChange} />
                      </label>

                      {/* Image List */}
                      {imageList.map((img, index) => (
                          <div key={img.id} className="relative group flex-shrink-0">
                              <img src={img.url} alt={`Preview ${index}`} className="w-full h-48 object-cover rounded-lg border border-gray-700" />
                              <button
                                type="button"
                                onClick={() => removeImage(img.id)}
                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                              >
                                <span className="material-symbols-outlined text-sm">close</span>
                              </button>
                              {index === 0 && (
                                <span className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">Main Image</span>
                              )}
                          </div>
                      ))}
                      
                      {imageList.length === 0 && (
                          <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
                              No images uploaded yet.
                          </div>
                      )}
                  </div>
                </div>
                
                <button 
                    type="submit"
                    disabled={loading}
                    className={`flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 gap-2 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <span className="material-symbols-outlined text-base"> {loading ? 'hourglass_empty' : (editingId ? 'save' : 'add')} </span>
                  <span className="truncate">{loading ? (editingId ? 'Updating...' : 'Uploading...') : (editingId ? 'Update Product' : 'Upload Product')}</span>
                </button>
              </div>
            </form>
          </div>
          
          <ProductsSection onEdit={handleEdit} onDelete={handleDeleteClick} />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                <div className="bg-foreground-dark border border-gray-800 rounded-xl p-6 max-w-sm w-full shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-2">Delete Product</h3>
                    <p className="text-gray-400 mb-6">Are you sure you want to delete "{productToDelete?.name}"? This action cannot be undone.</p>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-600 transition-colors">
                            Cancel
                        </button>
                        <button onClick={confirmDelete} className="px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
      )}
    </main>
  )
}

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
        await signOut(auth);
        navigate('/');
    } catch (error) {
        console.error("Error signing out: ", error);
    }
  };

  const ADMIN_UID = "bvBxlNqOpcTQF623WSMkmCInMY53";

  if (authLoading) {
    return <div className="min-h-screen bg-background-dark flex items-center justify-center text-white">Loading...</div>;
  }

  // Authentication check
  if (!user) {
    if (showSignup) {
        return <Signup onClose={() => navigate('/')} onSwitchToSignin={() => setShowSignup(false)} />;
    }
    return <Signin onClose={() => navigate('/')} onSwitchToSignup={() => setShowSignup(true)} />;
  }

  // Authorization check
  if (user.uid !== ADMIN_UID) {
    return (
        <div className="min-h-screen bg-background-dark flex flex-col items-center justify-center text-white gap-4">
            <span className="material-symbols-outlined text-6xl text-red-500">gpp_bad</span>
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-gray-400">You do not have permission to view this page.</p>
            <button 
                onClick={() => navigate('/')}
                className="px-6 py-2 rounded-lg bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
            >
                Return to Home
            </button>
            <button 
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-white transition-colors"
            >
                Sign Out
            </button>
        </div>
    );
  }

  return (
    <div className='bg-background-dark font-display text-gray-300'>
      <div className='relative flex min-h-screen w-full'>
        <aside className='sticky top-0 h-screen w-64 flex-shrink-0 bg-[#111318] p-4 flex flex-col justify-between'>
          <div className='flex flex-col gap-8'>
            <div className='flex items-center gap-3 px-3'>
              <img src="/logo-streetwear.webp" alt="Streetwear Crib" className="h-8 w-42 object-contain dark:invert dark:hue-rotate-[60deg] dark:saturate-150 dark:brightness-110" />
            </div>
            <div className='flex flex-col gap-2'>
              <a className='flex items-center gap-3 px-3 py-2 rounded-lg bg-card-dark text-white' href='#'>
                <span className='material-symbols-outlined'> inventory_2 </span>
                <p className='text-sm font-medium leading-normal'>Products</p>
              </a>
              <a className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-card-dark hover:text-white transition-colors duration-200' href='#'>
                <span className='material-symbols-outlined'> receipt_long </span>
                <p className='text-sm font-medium leading-normal'>Orders</p>
              </a>
              <a className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-card-dark hover:text-white transition-colors duration-200' href='#'>
                <span className='material-symbols-outlined'> group </span>
                <p className='text-sm font-medium leading-normal'>Customers</p>
              </a>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <a className='flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-card-dark hover:text-white transition-colors duration-200' href='#'>
              <span className='material-symbols-outlined'> settings </span>
              <p className='text-sm font-medium leading-normal'>Settings</p>
            </a>
            <div className='border-t border-gray-800/60 my-2'></div>
            <div className='flex gap-3 items-center px-3 py-2 cursor-pointer hover:bg-card-dark rounded-lg transition-colors' onClick={handleLogout}>
              <div
                className='bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10'
                style={{ backgroundImage: `url('${user?.photoURL || "https://placehold.co/100x100?text=User"}')` }}
              ></div>
              <div className='flex flex-col'>
                <h1 className='text-white text-sm font-medium leading-normal'>{user?.displayName || user?.email?.split('@')[0] || 'Admin'}</h1>
                <p className='text-gray-400 text-xs font-normal leading-normal'>Sign Out</p>
              </div>
            </div>
          </div>
        </aside>
        <AddProductSection />
      </div>
    </div>
  );
}
