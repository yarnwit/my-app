'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next//link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Star, Search, User, ShoppingBag, Loader2, Sparkles, ArrowRight } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: string | number;
    image_url: string;
    rating: string | number;
    reviwe_count: number;
    is_popular: boolean;
}

const CATEGORIES = [
    { id: 'all', name: 'ทั้งหมด' },
    { id: 'womens-clothing', name: 'เสื้อผ้าผู้หญิง' },
    { id: 'mens-clothing', name: 'เสื้อผ้าผู้ชาย' },
    { id: 'bags', name: 'กระเป๋า' },
    { id: 'accessories', name: 'เครื่องประดับ' },
];

export default function NewCollectionPage() {
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const router = useRouter();

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
                    setProducts(data.slice(0, 8));
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

    return (
        <div className="min-h-screen bg-[#FAFAFA] pb-12 font-sans text-gray-900 ">

            {/* Navbar - อัปเดตสถานะ Active ให้ คอลเลกชันใหม่ */}
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
                            <Link href="/products" className="text-gray-500 hover:text-black transition">สินค้าทั้งหมด</Link>
                            {/* Highlight คอลเลกชันใหม่ */}
                            <Link href="/new-collection" className="text-black font-medium transition border-b-2 border-black pb-1">คอลเลกชันใหม่</Link>
                            <Link href="/about" className="text-gray-500 hover:text-black transition">เกี่ยวกับเรา</Link>
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
                                <Link href="/" className="text-gray-600 hover:text-black transition-colors">
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

            {/* Hero Banner Section */}
            <section className="relative bg-gray-900 text-white overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-black opacity-40"></div>
                    {/* สามารถใส่รูปภาพแบคกราวด์ตรงนี้ได้ */}
                    <div className="w-full h-full bg-gradient-to-r from-gray-900 to-gray-600"></div>
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm: px-6 lg:px-8 py-24 md:py-32 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-sm font-medium tracking-wider uppercase text-white">Season 2026</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        Spring & Summer Collection
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
                        ค้นพบสไตล์ใหม่ล่าสุดที่ออกแบบมาเพื่อความเรียบง่ายแต่แฝงไปด้วยความหรูหรา อัปเดตตู้เสื้อผ้าของคุณด้วยคอลเลกชันใหม่ล่าสุดจากเรา
                    </p>
                    <button className="bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 group">
                        ช้อปคอลเลกชันนี้
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>

            {/* Products Grid Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">มาใหม่ล่าสุด</h2>
                        <p className="text-gray-500">สินค้าเข้าใหม่ประจำสัปดาห์ที่คุณไม่ควรพลาด</p>
                    </div>
                    <Link href="/products" className="hidden md:flex text-sm font-medium text-gray-900 border-b border-black pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors">
                        ดูสินค้าทั้งหมด
                    </Link>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-10 h-10 animate-spin text-gray-500" />
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col transform hover:-translate-y-1">
                                <div className={`w-full aspect-[4/5] bg-gray-100 relative overflow-hidden flex items-center justify-center`}>
                                    {product.image_url ? (
                                        <Image
                                            src={product.image_url}
                                            alt={product.name}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                            sizes="(max-width: 640px) 100vm, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        />
                                    ) : (
                                        <span className="text-4xl opacity-50 block group-hover:scale-110 transition-transform duration-300">
                                            📦
                                        </span>
                                    )}

                                    {/* ป้ายกำกับ NEW */}
                                    <div className="absolute top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1.5 rounded-md z-10 tracking-widest uppercase">
                                        New
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="text-xs text-gray-500 font-medium mb-1.5 uppercase tracking-wider">
                                        {CATEGORIES.find(c => c.id === product.category)?.name || product.category}
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                                        {product.name}
                                    </h3>

                                    <div className="mt-auto items-center justify-between flex">
                                        <div className="text-xl font-bold text-gray-900">
                                            ฿{Number(product.price).toLocaleString()}
                                        </div>
                                        <button className="bg-white border border-gray-200 text-gray-900 hover:bg-black hover:text-white p-2.5 rounded-full transition-all duration-300">
                                            <ShoppingCart className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-gray-500">ยังไม่มีสินค้าใหม่ในขณะนี้</p>
                    </div>
                )}

                <div className="mt-12 text-center md:hidden">
                    <Link href="/products" className="inline-block border border-black text-black px-8 py-3 rounded-full font-medium hover:bg-black hover:text-white transition-colors">
                        ดูสินค้าทั้งหมด
                    </Link>
                </div>
            </main>

        </div>
    );
}