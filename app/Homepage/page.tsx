"use client";
import React, { useEffect, useState } from 'react';
import { Search, User, ShoppingBag, ArrowRight, Truck, ShieldCheck, Clock } from 'lucide-react';

export default function MinimalStore() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

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
  return (
    <div className="min-h-screen bg-[#FAFAFA] text-gray-900 font-sans">
      {/* 1. Navbar */}
      <nav className="sticky top-0 z-50 bg-[#F9F9F8] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="font-bold text-2xl tracking-widest uppercase">Minimal.</span>
            </div>
            
            {/* Center Menu */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium hover:text-gray-500">หน้าแรก</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-black">สินค้าทั้งหมด</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-black">คอลเลกชันใหม่</a>
              <a href="#" className="text-sm font-medium text-gray-500 hover:text-black">เกี่ยวกับเรา</a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-black">
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* เช็คว่ามี userEmail หรือไม่ ถ้ามีให้แสดงอีเมล ถ้าไม่มีให้แสดงไอคอน User ตามปกติ */}
              {userEmail ? (
                <span className="text-sm font-medium text-gray-700">{userEmail}</span>
              ) : (
                <button className="text-gray-600 hover:text-black"><User size={20} strokeWidth={1.5} /></button>
              )}

              <button className="text-gray-600 hover:text-black relative">
                <ShoppingBag size={20} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <section className="relative w-full h-[600px] bg-gray-200">
        <img 
          src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop" 
          alt="Hero Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="bg-[#FBFBF9] p-12 max-w-md shadow-sm">
            <p className="text-xs text-gray-500 tracking-widest mb-4">SPRING / SUMMER 2026</p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-gray-900">
              ค้นพบสไตล์ที่ใช่<br />ในแบบของคุณ
            </h1>
            <p className="text-gray-600 mb-8 leading-relaxed text-sm">
              สัมผัสคอลเลกชันใหม่ล่าสุดที่ออกแบบมาโดยเน้นความเรียบง่าย ใส่สบาย และดูดีได้ในทุกๆ วันของคุณ
            </p>
            <button className="bg-black text-white px-8 py-4 text-sm font-medium flex items-center hover:bg-gray-800 transition-colors">
              ช้อปคอลเลกชันนี้ <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Popular Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold">หมวดหมู่ยอดนิยม</h2>
          <a href="#" className="text-sm text-gray-600 hover:text-black border-b border-gray-600 pb-1">ดูทั้งหมด</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Category 1 */}
          <div className="relative group cursor-pointer bg-gray-100 aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1550639525-c97d455acf70?q=80&w=800&auto=format&fit=crop" alt="Women" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-6 left-6 right-6 bg-white p-4 flex justify-between items-center shadow-sm">
              <span className="font-semibold text-sm">เสื้อผ้าผู้หญิง</span>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </div>
          
          {/* Category 2 */}
          <div className="relative group cursor-pointer bg-gray-200 aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=800&auto=format&fit=crop" alt="Men" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-6 left-6 right-6 bg-white p-4 flex justify-between items-center shadow-sm">
              <span className="font-semibold text-sm">เสื้อผ้าผู้ชาย</span>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </div>

          {/* Category 3 */}
          <div className="relative group cursor-pointer bg-gray-100 aspect-[4/5] overflow-hidden">
            <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800&auto=format&fit=crop" alt="Accessories" className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute bottom-6 left-6 right-6 bg-white p-4 flex justify-between items-center shadow-sm">
              <span className="font-semibold text-sm">กระเป๋า & เครื่องประดับ</span>
              <ArrowRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">สินค้ามาใหม่</h2>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-12">
          อัปเดตตู้เสื้อผ้าของคุณด้วยไอเทมชิ้นใหม่ล่าสุด ที่ผสมผสานความคลาสสิกและมินิมอลเข้าด้วยกันอย่างลงตัว
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left mb-12">
          {/* Product 1 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop" alt="T-shirt" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">เสื้อผ้า</p>
                <h3 className="text-sm font-medium">เสื้อยืดผ้าฝ้ายออร์แกนิก</h3>
              </div>
              <p className="text-sm font-semibold">฿790</p>
            </div>
          </div>

          {/* Product 2 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=800&auto=format&fit=crop" alt="Pants" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">กางเกง</p>
                <h3 className="text-sm font-medium">กางเกงลินินทรงหลวม</h3>
              </div>
              <p className="text-sm font-semibold">฿1,290</p>
            </div>
          </div>

          {/* Product 3 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden flex items-center justify-center">
               <img src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop" alt="Bag" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">กระเป๋า</p>
                <h3 className="text-sm font-medium">กระเป๋าหนังมินิมอล</h3>
              </div>
              <p className="text-sm font-semibold">฿2,590</p>
            </div>
          </div>

          {/* Product 4 */}
          <div className="group cursor-pointer">
            <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=800&auto=format&fit=crop" alt="Sneakers" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">รองเท้า</p>
                <h3 className="text-sm font-medium">รองเท้าผ้าใบสีขาว</h3>
              </div>
              <p className="text-sm font-semibold">฿1,890</p>
            </div>
          </div>
        </div>

        <button className="border border-black px-8 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
          ดูสินค้ามาใหม่ทั้งหมด
        </button>
      </section>

      {/* 5. Features Section */}
      <section className="border-t border-b border-gray-200 mt-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center px-4 py-4 md:py-0">
              <Truck size={32} strokeWidth={1} className="mb-4" />
              <h4 className="font-semibold mb-2">จัดส่งฟรีทั่วประเทศ</h4>
              <p className="text-sm text-gray-500">เมื่อมียอดสั่งซื้อครบ 1,500 บาทขึ้นไป</p>
            </div>
            <div className="flex flex-col items-center px-4 py-4 md:py-0">
              <ShieldCheck size={32} strokeWidth={1} className="mb-4" />
              <h4 className="font-semibold mb-2">รับประกันคุณภาพ</h4>
              <p className="text-sm text-gray-500">สามารถเปลี่ยนหรือคืนสินค้าได้ภายใน 30 วัน</p>
            </div>
            <div className="flex flex-col items-center px-4 py-4 md:py-0">
              <Clock size={32} strokeWidth={1} className="mb-4" />
              <h4 className="font-semibold mb-2">บริการลูกค้า 24/7</h4>
              <p className="text-sm text-gray-500">ทีมงานพร้อมให้คำแนะนำและช่วยเหลือเสมอ</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="bg-[#FAFAFA] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            {/* Brand */}
            <div className="md:col-span-1">
              <h3 className="font-bold text-xl tracking-widest uppercase mb-6">Minimal.</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                แบรนด์แฟชั่นที่เชื่อในความเรียบง่าย แต่แฝงไปด้วยรายละเอียดและความใส่ใจในทุกขั้นตอนการผลิต
              </p>
            </div>

            {/* Links - Products */}
            <div>
              <h4 className="font-semibold mb-6">สินค้า</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black">มาใหม่</a></li>
                <li><a href="#" className="hover:text-black">เสื้อผ้าผู้หญิง</a></li>
                <li><a href="#" className="hover:text-black">เสื้อผ้าผู้ชาย</a></li>
                <li><a href="#" className="hover:text-black">ลดราคา</a></li>
              </ul>
            </div>

            {/* Links - Help */}
            <div>
              <h4 className="font-semibold mb-6">ช่วยเหลือ</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-black">ติดต่อเรา</a></li>
                <li><a href="#" className="hover:text-black">คำถามที่พบบ่อย (FAQ)</a></li>
                <li><a href="#" className="hover:text-black">การจัดส่งสินค้า</a></li>
                <li><a href="#" className="hover:text-black">นโยบายการคืนสินค้า</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-6">รับข่าวสาร</h4>
              <p className="text-sm text-gray-500 mb-4">สมัครรับข่าวสารเพื่อรับสิทธิพิเศษและโปรโมชันก่อนใคร</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="อีเมลของคุณ" 
                  className="bg-white border border-gray-300 px-4 py-3 w-full text-sm outline-none focus:border-black"
                />
                <button className="bg-black text-white px-6 py-3 text-sm font-medium hover:bg-gray-800 transition-colors">
                  ติดตาม
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
            <p>© 2026 MINIMAL. All rights reserved.</p>
            <div className="space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-black">เงื่อนไขการให้บริการ</a>
              <a href="#" className="hover:text-black">นโยบายความเป็นส่วนตัว</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}