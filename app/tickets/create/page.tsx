'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CreateTicketPage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push('/tickets');
        } catch (error) {
            console.error('เกิดข้อผิดพลาด:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-md -mx-auto">
            <h1 className="text-2xl font-bold mb-6">สร้าง Ticket ใหม่</h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="ระบุหัวข้อปัญหา..."
                    required
                    className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400">
                        {isLoading ? 'กำลังดำเนินการ...' : 'บันทึกข้อมูล'}
                </button>
            </form>
        </div>
    );
}