'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { ShoppingCart, Star, Filter, Search, User, ShoppingBag, Loader2 } from 'lucide-react';
import Pagination from '../components/Pagination';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string | number;
  image_url: string;
  rating: string | number;
  review_count: number;
  is_popular: boolean;
}

const CATEGORIES = [
  { id: 'all', name: 'ทั้งหมด', icon: '🌟' },
  { id: 'womens-clothing', name: 'เสื้อผ้าผู้หญิง', icon: '👗' },
  { id: 'mens-clothing', name: 'เสื้อผ้าผู้ชาย', icon: '👔' },
  { id: 'bags', name: 'กระเป๋า', icon: '👜' },
  { id: 'accessories', name: 'เครื่องประดับ', icon: '💍' },
];

const ITEMS_PER_PAGE = 4;

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if(!token) return;
      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if(response.ok) {
          const data = await response.json();
          setUserEmail(data.email);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if(response.ok) {
          const data = await response.json();
          setProducts(data);
        }
        else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail(null);
    router.push('/');
  };

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-12 font-sans text-gray-900">

      {/* Navbar (ของเดิม) */}
      <nav className="sticky top-0 z-50 bg-[#F9F9F8] border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/Homepage" className="font-bold text-2xl tracking-widest uppercase hover:opacity-80 transition-opacity">
                Minimal.
              </Link>
            </div>

            <div className="hidden md:flex space-x-8">
              <Link href="/Homepage" className="text-gray-500 hover:text-black transition">หน้าแรก</Link>
              <Link href="/products" className="text-black font-medium transition">สินค้าทั้งหมด</Link>
              <Link href="/new-collection" className="text-gray-500 hover:text-black transition">คอลเลกชันใหม่</Link>
              <Link href="#" className="text-gray-500 hover:text-black transition">เกี่ยวกับเรา</Link>
            </div>

            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-black transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>

              {userEmail ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">{userEmail}</span>
                  <button onClick={handleLogout} className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors">
                    ออกจากระบบ
                  </button>
                </div>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-black transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </Link>
              )}

              <button className="text-gray-600 hover:text-black relative transition-colors">
                <ShoppingBag size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header ค้นหา (ของเดิม) */}
      <header className="bg-white shadow-sm sticky top-20 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">สินค้าทั้งหมด</h1>

            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black focus:border-black sm:text-sm transition duration-150 ease-in-out text-gray-900"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  router.push('?page=1');
                }}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* หมวดหมู่ยอดนิยม (ของเดิม) */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">หมวดหมู่ยอดนิยม</h2>
          </div>

          <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  router.push('?page=1');
                }}
                className={`flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl border font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-black text-white border-black shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span className="text-xl">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </section>

        {/* แสดงผลจำนวนสินค้า (ของเดิม) */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            แสดงผล <span className="font-semibold text-gray-900">{filteredProducts.length}</span> รายการ
          </p>
          {totalPages > 0 && (
            <p className="text-sm text-gray-500">
              หน้า {currentPage} จาก {totalPages}
            </p>
          )}
        </div>

        {/* --- 4. เพิ่มสถานะการโหลด (Loading State) และอัปเดต Property --- */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col"
            >
              <div className={`w-full aspect-square bg-gray-100 relative overflow-hidden flex items-center justify-center`}>
                {/* เปลี่ยน imageUrl เป็น image_url ตาม DB */}
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                ) : (
                  <span className="text-4xl opacity-50 block group-hover:scale-110 transition-transform duration-300">
                    📦
                  </span>
                )}

                {/* เปลี่ยนเงื่อนไขป้ายยอดฮิต เป็นการใช้ column is_popular จาก DB */}
                {product.is_popular && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 tracking-wide">
                    ยอดฮิต
                  </div>
                )}
              </div>

              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">
                  {CATEGORIES.find(c => c.id === product.category)?.name || product.category}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                  {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-4">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                  {/* เปลี่ยน reviews เป็น review_count ตาม DB */}
                  <span className="text-sm text-gray-400">({product.review_count})</span>
                </div>

                <div className="mt-auto items-center justify-between">
                  <div className="text-xl font-bold text-gray-900">
                    ฿{Number(product.price).toLocaleString()}
                  </div>
                  <button className="bg-gray-100 text-gray-900 hover:bg-black hover:text-white p-2.5 rounded-full transition-colors duration-200">
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-12">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบสินค้าที่คุณค้นหา</h3>
            <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่ใหม่ดูสิ</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                router.push('?page=1');
              }}
              className="mt-6 px-6 py-2 bg-gray-100 text-gray-900 font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
          }
          `}} />
    </div>
  );
}