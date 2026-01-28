import { useState } from 'react';
import { ShoppingCart, Heart, Star, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Check } from 'lucide-react';


const Land = () => {
    const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('blue');
  const [selectedSize, setSelectedSize] = useState('M');
  const [isLiked, setIsLiked] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);

  const product = {
    name: 'Premium Wireless Headphones',
    price: 299.99,
    originalPrice: 499.99,
    rating: 4.8,
    reviews: 2847,
    inStock: true,
    images: [
      'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/8000589/pexels-photo-8000589.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    colors: [
      { name: 'blue', value: '#3B82F6', label: 'Ocean Blue' },
      { name: 'black', value: '#1F2937', label: 'Midnight Black' },
      { name: 'red', value: '#EF4444', label: 'Ruby Red' },
      { name: 'green', value: '#10B981', label: 'Forest Green' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Premium sound quality',
      'Bluetooth 5.0 connectivity',
      'Foldable design',
      'Built-in microphone',
    ],
  };

  const handleAddToCart = () => {
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-pink-50 to-blue-50">
      {showAddedToCart && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          Added to cart successfully!
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <div className="relative group overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                  40% OFF
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      selectedImage === idx
                        ? 'border-blue-500 scale-105 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`View ${idx + 1}`} className="w-full h-20 object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6 animate-fadeIn">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold">{product.rating}</span>
                    <span className="text-gray-500 text-sm">({product.reviews} reviews)</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-blue-600">${product.price}</span>
                  <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">
                Experience premium audio quality with our state-of-the-art wireless headphones. Featuring advanced noise
                cancellation technology and exceptional comfort for all-day wear.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                  <div className="flex gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative w-12 h-12 rounded-full transition-all duration-300 ${
                          selectedColor === color.name ? 'scale-110 ring-4 ring-offset-2 ring-blue-500' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.label}
                      >
                        {selectedColor === color.name && (
                          <Check className="w-6 h-6 text-white absolute inset-0 m-auto" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                  <div className="flex gap-3">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                          selectedSize === size
                            ? 'bg-blue-500 text-white scale-105 shadow-lg'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold transition-all duration-300 hover:scale-110"
                    >
                      -
                    </button>
                    <span className="w-16 text-center font-bold text-xl">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 font-bold transition-all duration-300 hover:scale-110"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`px-6 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                    isLiked
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-white' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Truck className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <Shield className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">2 Year Warranty</span>
                </div>
                <div className="flex flex-col items-center text-center p-4 bg-orange-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <RefreshCw className="w-8 h-8 text-orange-600 mb-2" />
                  <span className="text-sm font-semibold text-gray-700">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-r from-blue-50 to-pink-50 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {product.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Land;