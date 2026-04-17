import { LayoutDashboard, Ticket, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const stats = [
    { label: 'Total Tickets', value: '128', icon: Ticket, color: 'text-blue-500' },
    { label: 'Pending', value: '12', icon: Clock, color: 'text-yellow-500' },
    { label: 'Completed', value: '110', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Urgent', value: '6', icon: AlertCircle, color: 'text-red-500' },
];

export default function DashboardPage() {
    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <header className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <LayoutDashboard /> Overview Dashboard
                </h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                    + Create New Ticket
                </button>
            </header>

            {/* 1. Summary Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((item, index) => (
                    <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-gray-50 ${item.color}`}>
                            <item.icon size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">{item.label}</p>
                            <p className="text-2xl font-semibold">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 2. Main Visualization Area (ตารางข้อมูล) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4">Recent Tickets</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b text-gray-400 text-sm">
                                    <th className="pb-3">Subject</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3">Date</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                <tr className="border-b hover:bg-gray-50 transition">
                                    <td className="py-4 font-medium">System Update Failure</td>
                                    <td className="py-4"><span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">Pending</span></td>
                                    <td className="py-4 text-gray-500">2026-04-16</td>
                                </tr>
                                <tr className="border-b hover:bg-gray-50 transition">
                                    <td className="py-4 font-medium">New Feature Request</td>
                                    <td className="py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Open</span></td>
                                    <td className="py-4 text-gray-500">2026-04-15</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 3. Side Panel (สถานะระบบ หรือสถิติเล็กๆ) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold mb-4">System Health</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Database Connection</span>
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">API Response Time</span>
                            <span className="text-sm font-medium">42ms</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 mt-4">
                            <div className="bg-blue-600 h-2 rounded-full w-[85%]"></div>
                        </div>
                        <p className="text-xs text-gray-400 text-center">Storage Usage: 85%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}