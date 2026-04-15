'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-indigo-50 p-3 rounded-full mb-4">
            <Mail className="w-7 h-7 text-[#5a55d2]" strokeWidth={2} />
          </div>
          <h1 className="text-2xl font-bold text-[#1e293b] mb-2 tracking-tight">ลืมรหัสผ่าน?</h1>
          <p className="text-slate-500 text-sm text-center">กรอกอีเมลของคุณเพื่อรับลิงก์สำหรับตั้งรหัสผ่านใหม่</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700">อีเมล</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5a55d2]/20 focus:border-[#5a55d2] text-sm text-slate-800"
            />
          </div>
          <button type="submit" className="w-full bg-[#5a55d2] text-white py-3 rounded-xl font-medium hover:bg-[#4d48b8] transition-all">
            ส่งลิงก์รีเซ็ตรหัสผ่าน
          </button>
        </form>

        {message && <div className="mt-4 p-3 bg-blue-50 text-blue-600 rounded-lg text-sm text-center">{message}</div>}

        <div className="mt-6 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-[#5a55d2] font-medium">
            <ArrowLeft className="w-4 h-4 mr-1" /> กลับไปหน้าเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
}