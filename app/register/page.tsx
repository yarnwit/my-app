'use client'; // 1. ต้องใส่บรรทัดนี้เพื่อใช้ useState และ useRouter

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, AtSign, Lock, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  // 2. สร้าง State มารับค่าจากช่องกรอก
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 3. ฟังก์ชันสำหรับส่งข้อมูลไปที่ Backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // เช็คว่ารหัสผ่าน 2 ช่องตรงกันไหม
    if (password !== confirmPassword) {
      alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    try {
      // ยิง API ไปที่ Express ของเรา
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ');
        router.push('/'); // เปลี่ยนไปหน้า Login
      } else {
        alert(data.message || 'เกิดข้อผิดพลาดในการลงทะเบียน');
      }
    } catch (error) {
      console.error('เชื่อมต่อเซิร์ฟเวอร์ไม่ได้', error);
      alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-8 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-50 p-3 rounded-full mb-4">
            <UserPlus className="w-7 h-7 text-[#5a55d2]" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-[#1e293b] mb-2 tracking-tight">สร้างบัญชีใหม่</h1>
          <p className="text-slate-500 text-sm">กรอกข้อมูลด้านล่างเพื่อลงทะเบียนเข้าใช้งาน</p>
        </div>

        {/* 4. ใส่ onSubmit ให้กับ form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">อีเมล</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <AtSign className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="email" 
                placeholder="you@example.com" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // ผูกค่ากับ State
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a55d2]/20 focus:border-[#5a55d2] text-sm text-slate-800 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">รหัสผ่าน</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="password" 
                placeholder="........" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // ผูกค่ากับ State
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a55d2]/20 focus:border-[#5a55d2] text-sm text-slate-800 transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">ยืนยันรหัสผ่าน</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <ShieldCheck className="w-5 h-5 text-slate-400" />
              </div>
              <input 
                type="password" 
                placeholder="........" 
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} // ผูกค่ากับ State
                className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a55d2]/20 focus:border-[#5a55d2] text-sm text-slate-800 transition-colors"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#5a55d2] text-white py-3 rounded-xl font-medium hover:bg-[#4d48b8] focus:ring-4 focus:ring-[#5a55d2]/20 transition-all mt-2"
          >
            ลงทะเบียน
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          มีบัญชีผู้ใช้อยู่แล้ว?{' '}
          <Link href="/" className="text-[#5a55d2] hover:underline font-medium">
            เข้าสู่ระบบ
          </Link>
        </div>
        
      </div>
    </div>
  );
}