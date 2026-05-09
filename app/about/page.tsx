"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Rocket, Microchip, ShieldCheck, Target, Zap } from 'lucide-react';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const coreValues = [
    {
      icon: <Eye className="w-8 h-8 text-cyan-400" />,
      title: "Vision",
      desc: "เชื่อมต่อมนุษย์กับเทคโนโลยีให้เป็นหนึ่งเดียว ผ่านอุปกรณ์ที่เป็นเสมือนส่วนขยายของร่างกาย"
    },
    {
      icon: <Rocket className="w-8 h-8 text-cyan-400" />,
      title: "Mission",
      desc: "ยกระดับชีวิตผู้คนทั่วโลกด้วย Gadget ประสิทธิภาพสูงที่สร้างขึ้นจากวิศวกรรมที่ไร้ข้อผิดพลาด"
    },
    {
      icon: <Microchip className="w-8 h-8 text-cyan-400" />,
      title: "Innovation",
      desc: "เราไม่เพียงแต่ตามเทรนด์ แต่เราคือผู้กำหนดมาตรฐานใหม่ในทุกวงจรที่เราออกแบบ"
    }
  ];

  const roadmap = [
    { year: "2024", task: "Global Brand Launch & Initial Drop" },
    { year: "2025", task: "ZETRA Ecosystem & AI Integration" },
    { year: "2026", task: "Market Leadership in Premium Tech" }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          className="z-10 text-center"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <h2 className="text-cyan-400 font-bold tracking-[0.3em] uppercase mb-4">ZETRA Tech</h2>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 uppercase">
            The Zenith of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Innovation</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            ที่ ZETRA เราเชื่อว่าเทคโนโลยีที่ดีที่สุดคือเทคโนโลยีที่หายไปในวิถีชีวิต 
            เหลือเพียงประสบการณ์ที่ลื่นไหลและทรงพลัง
          </p>
        </motion.div>
      </section>

      {/* Foundations Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 transition-colors group"
            >
              <div className="mb-6 p-3 bg-black rounded-lg w-fit group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
              <p className="text-slate-400 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brand Essence (Positioning) */}
      <section className="py-24 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-8 flex items-center gap-4">
              <div className="w-12 h-1 bg-cyan-400" />
              Refined Intelligence
            </h2>
            <p className="text-xl text-slate-300 mb-6 leading-relaxed">
              ZETRA ยืนอยู่ตรงจุดตัดของความหรูหราและการใช้งานจริง (Sophistication & Utility) 
              เราไม่ได้เน้นแค่สเปกที่สูงสุด แต่เราเน้น "Emotional Resonance" 
              เพื่อให้ทุกครั้งที่คุณสัมผัสสินค้าของเรา คุณจะรู้สึกถึงความใส่ใจในทุกรายละเอียด
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-cyan-400 mt-1" />
                <div>
                  <h4 className="font-bold">Uncompromising Quality</h4>
                  <p className="text-slate-400">วัสดุเกรดอวกาศและอลูมิเนียมรีไซเคิลระดับพรีเมียม</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Zap className="text-cyan-400 mt-1" />
                <div>
                  <h4 className="font-bold">Seamless Ecosystem</h4>
                  <p className="text-slate-400">การเชื่อมต่อที่ไร้รอยต่อระหว่างซอฟต์แวร์และฮาร์ดแวร์</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            className="aspect-square bg-gradient-to-br from-slate-800 to-black rounded-3xl border border-slate-700 flex items-center justify-center relative overflow-hidden"
          >
            {/* ตัวแทนภาพสินค้า (Placeholder) */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            <div className="relative z-10 text-center">
               <Target className="w-32 h-32 text-cyan-500/50 mx-auto mb-4 animate-pulse" />
               <p className="text-slate-500 uppercase tracking-widest font-bold">ZETRA Engineering Lab</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <h2 className="text-6xl font-black text-cyan-400 mb-2">85%</h2>
              <p className="text-slate-400 uppercase tracking-widest text-sm">Brand Trust Rating</p>
            </div>
            <div>
              <h2 className="text-6xl font-black text-cyan-400 mb-2">12+</h2>
              <p className="text-slate-400 uppercase tracking-widest text-sm">Design Awards</p>
            </div>
            <div>
              <h2 className="text-6xl font-black text-cyan-400 mb-2">24/7</h2>
              <p className="text-slate-400 uppercase tracking-widest text-sm">Elite Support</p>
            </div>
            <div>
              <h2 className="text-6xl font-black text-cyan-400 mb-2">100%</h2>
              <p className="text-slate-400 uppercase tracking-widest text-sm">Recyclable Packaging</p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 underline decoration-cyan-500 underline-offset-8">Roadmap สู่โลกอนาคต</h2>
        <div className="relative border-l border-slate-800 ml-4 md:ml-0 space-y-12">
          {roadmap.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative pl-8"
            >
              <div className="absolute left-[-5px] top-2 w-[10px] h-[10px] rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              <h3 className="text-cyan-400 font-bold text-2xl mb-1">{item.year}</h3>
              <p className="text-xl text-white">{item.task}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-24 px-6 text-center border-t border-slate-900">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Join the <span className="text-cyan-400">ZETRA</span> Citizen</h2>
        <button className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)]">
          Explore the Future
        </button>
      </footer>
    </div>
  );
};

export default AboutPage;