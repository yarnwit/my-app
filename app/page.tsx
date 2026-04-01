'use client'; // จำเป็นต้องมีเพื่อใช้ Hook ใน Next.js

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // 1. Import useRouter เข้ามา

export default function LoginPage() {
  const router = useRouter(); // 2. เรียกใช้งาน router
  
  // เพิ่ม State สำหรับเก็บค่าจากช่องกรอกข้อมูล
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // ยิง API ไปที่ Express.js ของคุณ
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ถ้ารหัสถูกต้อง เก็บ Token ไว้ใน localStorage
        localStorage.setItem('token', data.token);
        console.log("เข้าสู่ระบบสำเร็จ!");
        
        // 3. สั่งเปลี่ยนหน้าไปที่โฟลเดอร์ Homepage
        router.push('/Homepage'); 
        
      } else {
        alert(data.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
      }
    } catch (error) {
      console.error("เชื่อมต่อเซิร์ฟเวอร์ไม่ได้", error);
      alert("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md p-8 sm:p-10">
        
        <div className="text-center mb-8">
          <h1 className="text-[22px] font-bold text-gray-900 mb-2">ยินดีต้อนรับกลับมา</h1>
          <p className="text-gray-500 text-sm">กรุณากรอกข้อมูลเพื่อเข้าสู่ระบบบัญชีของคุณ</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">อีเมล</label>
            <input
              type="email"
              placeholder="your@email.com"
              required
              value={email} // ผูกค่ากับ state
              onChange={(e) => setEmail(e.target.value)} // อัปเดต state เมื่อพิมพ์
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-sm font-medium text-gray-700">รหัสผ่าน</label>
              <a href="#" className="text-sm text-[#2563eb] hover:underline">ลืมรหัสผ่าน?</a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              required
              value={password} // ผูกค่ากับ state
              onChange={(e) => setPassword(e.target.value)} // อัปเดต state เมื่อพิมพ์
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#3b71ca] text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-[15px] mt-2 shadow-sm"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          ยังไม่มีบัญชีใช่หรือไม่?{' '}
          <Link href="/register" className="text-[#5a55d2] hover:underline font-medium">
            ลงทะเบียน
          </Link>
        </div>

      </div>
    </div>
  );
}