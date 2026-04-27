'use client';

import React, { useState } from 'react';
import { ShoppingCart, Star, Filter, Search } from 'lucide-react';

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
  },
  {
    id: 2,
    name: 'เสื้อเชิ้ตแขนยาวทรงคลาสสิค',
    price: 450,
    category: 'mens-clothing',
    rating: 4.5,
    reviews: 89,
    imageColor: 'bg-blue-100',
  },
  {
    id: 3,
    name: 'กระเป๋าสะพายข้างหนังพรีเมียม',
    price: 1290,
    category: 'bags',
    rating: 4.9,
    reviews: 210,
    imageColor: 'bg-amber-100',
  },
  {
    id: 4,
    name: 'สร้อยคอเงินแท้ จี้มินิมอล',
    price: 890,
    category: 'accessories',
    rating: 4.7,
    reviews: 45,
    imageColor: 'bg-slate-200',
  },
  {
    id: 5,
    name: 'กระโปรงพลีทยาวเอวสูง',
    price: 390,
    category: 'womens-clothing',
    rating: 4.6,
    reviews: 356,
    imageColor: 'bg-pink-100',
  },
  {
    id: 6,
    name: 'กางเกงยีนส์ผู้ชายทรงกระบอก',
    price: 990,
    category: 'mens-clothing',
    rating: 4.4,
    reviews: 78,
    imageColor: 'bg-indigo-100',
  },
  {
    id: 7,
    name: 'กระเป๋าเป้ผ้าแคนวาสความจุสูง',
    price: 650,
    category: 'bags',
    rating: 4.6,
    reviews: 112,
    imageColor: 'bg-stone-200',
  },
  {
    id: 8,
    name: 'นาฬิกาข้อมือสายหนังวินเทจ',
    price: 1500,
    category: 'accessories',
    rating: 4.8,
    reviews: 95,
    imageColor: 'bg-zinc-200',
  },
];

export default function ProductsPage() {
  // State สำหรับเก็บหมวดหมู่ที่ถูกเลือกและคำค้นหา
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // ฟังก์ชันกรองสินค้า
  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* ส่วนหัวของหน้า */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
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
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out text-gray-900"
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
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
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
                {/* รูปภาพจำลอง (Placeholder) */}
                <div className={`w-full aspect-square ${product.imageColor} relative overflow-hidden flex items-center justify-center`}>
                   <span className="text-4xl opacity-50 block group-hover:scale-110 transition-transform duration-300">
                      

[Image of {product.name}]

                   </span>
                   {/* ป้าย Tag (จำลอง) */}
                   {product.rating >= 4.8 && (
                     <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                       ยอดฮิต
                     </div>
                   )}
                </div>

                {/* รายละเอียดสินค้า */}
                <div className="p-5 flex flex-col flex-grow">
                  <div className="text-xs text-blue-600 font-medium mb-1 uppercase tracking-wider">
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
                    <button className="bg-gray-900 hover:bg-blue-600 text-white p-2.5 rounded-full transition-colors duration-200">
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
              className="mt-6 px-6 py-2 bg-blue-100 text-blue-700 font-medium rounded-full hover:bg-blue-200 transition-colors"
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