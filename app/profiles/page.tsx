'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Settings, User, ChevronRight, Plus, SlidersHorizontal } from 'lucide-react';
import PaymentSchedule, { CalcParams, DEFAULT_CALC, loadCalcParams, saveCalcParams } from '@/components/PaymentSchedule';

const DURATIONS = [60, 120, 180, 240, 360];

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState('active');
    const [calc, setCalc] = useState<CalcParams>(DEFAULT_CALC);
    const [calcReady, setCalcReady] = useState(false);
    useEffect(() => { setCalc(loadCalcParams()); setCalcReady(true); }, []);
    useEffect(() => { if (calcReady) saveCalcParams(calc); }, [calc, calcReady]);

    return (
        <div className="flex flex-col min-h-screen bg-[#0b1626]">
            {/* Header */}
            <header className="bg-[#122037] px-4 py-4 border-b border-white/10">
                <div className="max-w-screen-md mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-semibold text-white">Личный кабинет</h1>
                    <Link href="/profiles/settings">
                        <Settings size={24} className="text-white/75" />
                    </Link>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-grow px-4 py-4 pb-20">
                <div className="max-w-screen-md mx-auto space-y-4">
                    {/* User Profile */}
                    <div className="bg-[#122037] rounded-xl p-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
                                <User size={28} className="text-white/55" />
                            </div>
                            <div>
                                <h2 className="text-lg font-medium text-white">
                                    user@example.com
                                </h2>
                                <p className="text-white/55 text-sm">Хозяин</p>
                                <p className="text-white/40 text-sm">Кабинет №1234</p>
                            </div>
                        </div>
                    </div>

                    {/* Balance */}
                    <div className="bg-[#122037] rounded-xl p-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-3xl font-bold text-white">0 ед.</h3>
                            </div>
                            <button className="bg-[#d4af5a] text-[#0b1626] px-6 py-2 rounded-lg font-medium hover:bg-[#e6c87a] transition-colors">
                                Пополнить
                            </button>
                        </div>
                    </div>

                    {/* Billing */}
                    <div className="bg-[#122037] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-white font-medium">Счёт и платежи</span>
                            <ChevronRight size={20} className="text-white/40" />
                        </div>
                    </div>

                    {/* Payment schedule */}
                    <div className="bg-[#122037] rounded-xl p-4">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-white font-medium">Мой график платежей</span>
                            <Link href="/arenda-s-vykupom#calculator" className="inline-flex items-center gap-1 text-xs text-[#e6c87a]">
                                <SlidersHorizontal size={14} /> Калькулятор
                            </Link>
                        </div>
                        <div className="grid grid-cols-[1fr_auto] gap-2 mb-2">
                            <label className="text-xs text-white/55">
                                Стоимость жилья, ₸
                                <input
                                    type="number"
                                    min={0}
                                    step={500000}
                                    value={calc.propertyValue}
                                    onChange={e => setCalc(c => ({ ...c, propertyValue: Math.max(0, parseInt(e.target.value, 10) || 0) }))}
                                    className="mt-1 w-full border border-white/10 rounded-lg px-3 py-2 text-sm text-white"
                                />
                            </label>
                            <div className="text-xs text-white/55">
                                Взнос
                                <div className="mt-1 flex gap-1">
                                    {[30, 50].map(v => (
                                        <button key={v} type="button" onClick={() => setCalc(c => ({ ...c, initialPaymentPercent: v }))}
                                            className={`px-3 py-2 rounded-lg text-sm font-medium ${calc.initialPaymentPercent === v ? 'bg-[#d4af5a] text-[#0b1626]' : 'bg-[#122037] text-[#e6c87a] border border-[#d4af5a]'}`}>
                                            {v}%
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-1 mb-3">
                            {DURATIONS.map(d => (
                                <button key={d} type="button" onClick={() => setCalc(c => ({ ...c, duration: d }))}
                                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium ${calc.duration === d ? 'bg-[#d4af5a] text-[#0b1626]' : 'bg-[#122037] text-[#e6c87a] border border-[#d4af5a]'}`}>
                                    {d} мес
                                </button>
                            ))}
                        </div>
                        <PaymentSchedule params={calc} compact title="Платежи по рассрочке" />
                    </div>

                    {/* My Listings */}
                    <div className="bg-[#122037] rounded-xl p-4">
                        {/* Tabs */}
                        <div className="flex gap-2 mb-6">
                            <button 
                                className={`flex-1 py-3 rounded-xl text-center font-medium ${
                                    activeTab === 'active' 
                                    ? 'bg-[#d4af5a] text-[#0b1626]' 
                                    : 'bg-white/5 text-white/75'
                                }`}
                                onClick={() => setActiveTab('active')}
                            >
                                Активные
                            </button>
                            <button 
                                className={`flex-1 py-3 rounded-xl text-center font-medium ${
                                    activeTab === 'inactive' 
                                    ? 'bg-[#d4af5a] text-[#0b1626]' 
                                    : 'bg-white/5 text-white/75'
                                }`}
                                onClick={() => setActiveTab('inactive')}
                            >
                                Неактивные
                            </button>
                        </div>

                        {/* Empty state */}
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                                </svg>
                            </div>
                            <p className="text-white/55 text-center mb-6 text-sm">
                                Ваши объявления увидят тысячи покупателей и арендаторов недвижимости
                            </p>
                        </div>

                        {/* Add listing button */}
                        <Link href="/add-listing" className="w-full bg-[#d4af5a] text-[#0b1626] py-3 rounded-xl flex items-center justify-center gap-2 font-medium hover:bg-[#e6c87a] transition-colors">
                            <Plus size={20} />
                            Подать объявление
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;