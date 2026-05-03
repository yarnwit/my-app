'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star, Filter, Search, User, ShoppingBag } from 'lucide-react';

// --- ข้อมูลจำลอง (Mock Data) ---
const CATEGORIES = [
  { id: 'all', name: 'ทั้งหมด', icon: '🌟' },
  { id: 'womens-clothing', name: 'เสื้อผ้าผู้หญิง', icon: '👗' },
  { id: 'mens-clothing', name: 'เสื้อผ้าผู้ชาย', icon: '👔' },
  { id: 'bags', name: 'กระเป๋า', icon: '👜' },
  { id: 'accessories', name: 'เครื่องประดับ', icon: '💍' },
];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'เดรสลายดอกไม้สไตล์เกาหลี',
    price: 590,
    category: 'womens-clothing',
    rating: 4.8,
    reviews: 124,
    imageColor: 'bg-rose-100',
    imageUrl: '/products/B08335A802B780BBE81966C79B6D93CF_800x.jpg',
  },
  {
    id: 2,
    name: 'เสื้อเชิ้ตแขนยาวทรงคลาสสิค',
    price: 450,
    category: 'mens-clothing',
    rating: 4.5,
    reviews: 89,
    imageColor: 'bg-blue-100',
    imageUrl: '/products/f6510ce8102eaa07fd673f40be7dc802.jpg',
  },
  {
    id: 3,
    name: 'กระเป๋าสะพายข้างหนังพรีเมียม',
    price: 1290,
    category: 'bags',
    rating: 4.9,
    reviews: 210,
    imageColor: 'bg-amber-100',
    imageUrl: '/products/sg-11134201-22110-prju4dtjirjv14.jpg',
  },
  {
    id: 4,
    name: 'สร้อยคอเงินแท้ จี้มินิมอล',
    price: 890,
    category: 'accessories',
    rating: 4.7,
    reviews: 45,
    imageColor: 'bg-slate-200',
    imageUrl: '/products/qcy63j.jpg',
  },
  {
    id: 5,
    name: 'กระโปรงพลีทยาวเอวสูง',
    price: 390,
    category: 'womens-clothing',
    rating: 4.6,
    reviews: 356,
    imageColor: 'bg-pink-100',
    imageUrl: '/products/f6510ce8102eaa07fd673f40be7dc802.jpg',
  },
  {
    id: 6,
    name: 'กางเกงยีนส์ผู้ชายทรงกระบอก',
    price: 990,
    category: 'mens-clothing',
    rating: 4.4,
    reviews: 78,
    imageColor: 'bg-indigo-100',
    imageUrl: '/products/z6.jpg',
  },
  {
    id: 7,
    name: 'กระเป๋าเป้ผ้าแคนวาสความจุสูง',
    price: 650,
    category: 'bags',
    rating: 4.6,
    reviews: 112,
    imageColor: 'bg-stone-200',
    imageUrl: '/products/4-1.jpg',
  },
  {
    id: 8,
    name: 'นาฬิกาข้อมือสายหนังวินเทจ',
    price: 1500,
    category: 'accessories',
    rating: 4.8,
    reviews: 95,
    imageColor: 'bg-zinc-200',
    imageUrl: '/products/as7dai.jpg',
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State สำหรับดึงข้อมูล Auth จากหน้า Homepage
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();

  // ดึงข้อมูล User เหมือนในหน้า Homepage
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if(!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/auth/me', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
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

  // ฟังก์ชันออกจากระบบ
  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserEmail(null);
    router.push('/');
  };

  // ฟังก์ชันกรองสินค้า
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-12 font-sans text-gray-900">
      
      {/* 1. Navbar (ใช้ UI เดียวกับหน้า Homepage) */}
      <nav className="sticky top-0 z-50 bg-[#F9F9F8] border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo เปลี่ยนเป็น Link กลับหน้าแรก */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/Homepage" className="font-bold text-2xl tracking-widest uppercase hover:opacity-80 transition-opacity">
                Minimal.
              </Link>
            </div>
            
            {/* Center Menu */}
            <div className="hidden md:flex space-x-8">
              <Link href="/Homepage" className="text-gray-500 hover:text-black transition">หน้าแรก</Link>
              <Link href="/products" className="text-black font-medium transition">สินค้าทั้งหมด</Link>
              <Link href="#" className="text-gray-500 hover:text-black transition">คอลเลกชันใหม่</Link>
              <Link href="#" className="text-gray-500 hover:text-black transition">เกี่ยวกับเรา</Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-black transition-colors">
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* เช็คว่ามี userEmail หรือไม่ */}
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

      {/* ส่วนหัวของการค้นหาสินค้า (แก้ไข top เป็น 20 เพื่อไม่ให้ทับกับ Navbar ด้านบน) */}
      <header className="bg-white shadow-sm sticky top-20 z-40 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">สินค้าทั้งหมด</h1>
            
            {/* ช่องค้นหา */}
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-black focus:border-black sm:text-sm transition duration-150 ease-in-out text-gray-900"
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* ส่วนหมวดหมู่ยอดนิยม */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-800">หมวดหมู่ยอดนิยม</h2>
          </div>
          
          {/* แถบเลื่อนหมวดหมู่ */}
          <div className="flex overflow-x-auto pb-4 gap-3 hide-scrollbar">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
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

        {/* ส่วนแสดงผลจำนวนสินค้า */}
        <div className="mb-6">
          <p className="text-gray-600">
            แสดงผล <span className="font-semibold text-gray-900">{filteredProducts.length}</span> รายการ
          </p>
        </div>

        {/* ตาราง Grid แสดงสินค้า */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 group flex flex-col"
              >
                {/* ส่วนรูปภาพ */}
                <div className={`w-full aspect-square ${product.imageColor} relative overflow-hidden flex items-center justify-center`}>
                  {product.imageUrl ? (
                    <Image
                      src={product.imageUrl}
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

                  {/* ป้าย Tag ยอดฮิต */}
                  {product.rating >= 4.8 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md z-10 tracking-wide">
                      ยอดฮิต
                    </div>
                  )}
                </div>

                {/* รายละเอียดสินค้า */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">
                    {CATEGORIES.find(c => c.id === product.category)?.name}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  
                  {/* เรตติ้ง */}
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>

                  {/* ราคาและปุ่มสั่งซื้อ */}
                  <div className="mt-auto flex items-center justify-between">
                    <div className="text-xl font-bold text-gray-900">
                      ฿{product.price.toLocaleString()}
                    </div>
                    <button className="bg-gray-100 text-gray-900 hover:bg-black hover:text-white p-2.5 rounded-full transition-colors duration-200">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* กรณีไม่พบสินค้า */
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">ไม่พบสินค้าที่คุณค้นหา</h3>
            <p className="text-gray-500">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่ใหม่ดูสิ</p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
              className="mt-6 px-6 py-2 bg-gray-100 text-gray-900 font-medium rounded-full hover:bg-gray-200 transition-colors"
            >
              ล้างการค้นหา
            </button>
          </div>
        )}
      </main>

      {/* สไตล์เพิ่มเติมสำหรับซ่อน Scrollbar แต่ยังเลื่อนได้ */}
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