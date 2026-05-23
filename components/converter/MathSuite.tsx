'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, Percent, Ruler, Hash, 
  Activity, Wallet, Receipt, Clock, Globe,
  CheckCircle2, Info, ArrowRight, ExternalLink
} from 'lucide-react';
import { Category, convertValue } from '@/lib/units';
import VisualClock from './VisualClock';
import TimezoneSuggestions from './TimezoneSuggestions';
import { useRouter } from 'next/navigation';

interface MathSuiteProps {
  category: string;
  initialTool?: string;
  categoryData?: Category;
  initialFromUnitId?: string;
  initialToUnitId?: string;
}

export default function MathSuite({ 
  category, 
  initialTool, 
  categoryData, 
  initialFromUnitId, 
  initialToUnitId 
}: MathSuiteProps) {
  const router = useRouter();
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  // Timezone State
  const [timeInput, setTimeInput] = useState('12:00');
  const [fromTz, setFromTz] = useState(initialFromUnitId || categoryData?.units[0]?.id || 'utc');
  const [toTz, setToTz] = useState(initialToUnitId || categoryData?.units[1]?.id || 'india');
  const [tzResult, setTzResult] = useState<string | null>(null);

  useEffect(() => {
    if (category === 'timezone') {
      calculateTz();
    }
  }, [fromTz, toTz, timeInput]);

  const handleShareTz = () => {
    if (!fromTz || !toTz) return;
    router.push(`/time/${fromTz}-to-${toTz}`);
  };

  // Percentage Calculator State
  const [pctInput1, setPctInput1] = useState('');
  const [pctInput2, setPctInput2] = useState('');
  const [pctMode, setPctMode] = useState('of'); // 'of', 'what-percent', 'increase-decrease'
  const [pctResult, setPctResult] = useState<number | null>(null);

  // Geometry State
  const [geoShape, setGeoShape] = useState('circle'); // 'circle', 'square', 'rectangle', 'triangle'
  const [geoInput1, setGeoInput1] = useState('');
  const [geoInput2, setGeoInput2] = useState('');
  const [geoResult, setGeoResult] = useState<{ area: number, perimeter: number } | null>(null);

  // Health State
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);

  // Finance State
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [finResult, setFinResult] = useState<number | null>(null);

  // Tax State
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [taxResult, setTaxResult] = useState<{ tax: number, total: number } | null>(null);

  const calculateTz = () => {
    if (!timeInput) return;
    const [hours, minutes] = timeInput.split(':').map(Number);
    if (isNaN(hours) || isNaN(minutes)) return;

    const fromUnit = categoryData?.units.find(u => u.id === fromTz);
    const toUnit = categoryData?.units.find(u => u.id === toTz);
    
    if (!fromUnit || !toUnit) return;

    // Convert input time to UTC decimal hours
    // UTC = LocalTime + OffsetInUnitsFile
    let utcHours = hours + (minutes / 60) + (fromUnit.offset || 0);
    
    // Convert UTC to Target decimal hours
    // Target = UTC - OffsetInUnitsFile
    let targetHours = utcHours - (toUnit.offset || 0);

    // Normalize targetHours to [0, 24)
    targetHours = ((targetHours % 24) + 24) % 24;

    const resultH = Math.floor(targetHours);
    const resultM = Math.round((targetHours - resultH) * 60);
    
    const formattedH = resultH.toString().padStart(2, '0');
    const formattedM = resultM.toString().padStart(2, '0');
    
    setTzResult(`${formattedH}:${formattedM}`);
  };

  const calculatePct = () => {
    const val1 = parseFloat(pctInput1);
    const val2 = parseFloat(pctInput2);
    if (isNaN(val1) || isNaN(val2)) return;

    if (pctMode === 'of') {
      // What is val1% of val2?
      setPctResult((val1 / 100) * val2);
    } else if (pctMode === 'what-percent') {
      // val1 is what percent of val2?
      setPctResult((val1 / val2) * 100);
    } else if (pctMode === 'increase-decrease') {
      // Percentage change from val1 to val2
      const diff = val2 - val1;
      setPctResult((diff / val1) * 100);
    }
  };

  const calculateGeo = () => {
    const v1 = parseFloat(geoInput1);
    const v2 = parseFloat(geoInput2);
    
    if (geoShape === 'circle') {
      if (isNaN(v1)) return;
      setGeoResult({
        area: Math.PI * v1 * v1,
        perimeter: 2 * Math.PI * v1
      });
    } else if (geoShape === 'square') {
      if (isNaN(v1)) return;
      setGeoResult({
        area: v1 * v1,
        perimeter: 4 * v1
      });
    } else if (geoShape === 'rectangle') {
      if (isNaN(v1) || isNaN(v2)) return;
      setGeoResult({
        area: v1 * v2,
        perimeter: 2 * (v1 + v2)
      });
    } else if (geoShape === 'triangle') {
      if (isNaN(v1) || isNaN(v2)) return; // v1 = base, v2 = height
      // For perimeter we need hypotenuse for right triangle or other sides, lets stick to area for now or assume right triangle
      setGeoResult({
        area: 0.5 * v1 * v2,
        perimeter: v1 + v2 + Math.sqrt(v1*v1 + v2*v2) // Right triangle assumption
      });
    }
  };

  const calculateTdee = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseFloat(age);
    if (!isNaN(w) && !isNaN(h) && !isNaN(a)) {
      let bmr = (10 * w) + (6.25 * h) - (5 * a);
      bmr = gender === 'male' ? bmr + 5 : bmr - 161;
      setTdeeResult(Math.round(bmr * 1.2)); 
    }
  };

  const calculateLoan = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100 / 12;
    const n = parseFloat(time) * 12;
    if (!isNaN(p) && !isNaN(r) && !isNaN(n)) {
      const pmt = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setFinResult(Math.round(pmt));
    }
  };

  const calculateTax = () => {
    const p = parseFloat(price);
    const t = parseFloat(taxRate);
    if (!isNaN(p) && !isNaN(t)) {
      const taxAmt = (p * t) / 100;
      setTaxResult({ tax: taxAmt, total: p + taxAmt });
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4 md:mt-0 px-4">
      <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="flex border-b border-slate-50 bg-primary">
          <div className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-center text-white flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            {categoryData?.name || 'Active'} Calculator Tool
          </div>
        </div>

        <div className="p-8">
          {category === 'timezone' && (
            <div className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Input Time (24h)</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="time" 
                    value={timeInput} 
                    onChange={e => setTimeInput(e.target.value)} 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 pl-12 font-bold focus:border-primary outline-none transition-all" 
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">From Location</label>
                  <select 
                    value={fromTz} 
                    onChange={e => setFromTz(e.target.value)} 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none"
                  >
                    {categoryData?.units.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center pt-5">
                  <ArrowRight className="w-6 h-6 text-slate-300 hidden sm:block" />
                  <div className="h-px w-full bg-slate-100 sm:hidden"></div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">To Location</label>
                  <select 
                    value={toTz} 
                    onChange={e => setToTz(e.target.value)} 
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none"
                  >
                    {categoryData?.units.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.symbol})</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                onClick={handleShareTz} 
                className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all hover:bg-primary/90"
              >
                <Globe className="w-4 h-4" /> Convert Timezone
              </button>
              {tzResult && (
                <div className="flex flex-col items-center gap-8 py-4 animate-in fade-in zoom-in duration-500">
                  <div className="flex flex-col sm:flex-row items-center gap-10">
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base Time</span>
                      <VisualClock 
                        time={timeInput} 
                        locationName={categoryData?.units.find(u => u.id === fromTz)?.name || ''} 
                        offset={categoryData?.units.find(u => u.id === fromTz)?.offset}
                      />
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="p-4 bg-primary rounded-full shadow-lg">
                        <ArrowRight className="w-8 h-8 text-white sm:rotate-0 rotate-90" />
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Calculated Time</span>
                      <VisualClock 
                        time={tzResult} 
                        locationName={categoryData?.units.find(u => u.id === toTz)?.name || ''} 
                        offset={categoryData?.units.find(u => u.id === toTz)?.offset}
                      />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 w-full text-center shadow-inner space-y-4">
                    <p className="text-sm font-bold text-slate-500 leading-relaxed max-w-sm mx-auto">
                      Scheduling tip: The target local time is <span className="text-primary font-black">{tzResult}</span> in {categoryData?.units.find(u => u.id === toTz)?.name}.
                    </p>
                    <button 
                      onClick={handleShareTz}
                      className="bg-white border-2 border-primary/20 text-primary font-black py-2 px-6 rounded-full text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all flex items-center gap-2 mx-auto"
                    >
                      <ExternalLink className="w-3 h-3" /> Share this conversion
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {category === 'scientific' && (
             <div className="space-y-6">
               <div className="bg-slate-900 rounded-2xl p-6 text-right font-mono">
                 <div className="text-slate-500 text-sm h-6 mb-1">{equation}</div>
                 <div className="text-white text-4xl font-bold tracking-tight truncate">{display}</div>
               </div>
               <div className="grid grid-cols-4 gap-3">
                 {['sin','cos','tan','log','7','8','9','/','4','5','6','*','1','2','3','-','0','.','C','+'].map(key => (
                   <button 
                    key={key}
                    onClick={() => {
                        if (key === 'C') { setDisplay('0'); setEquation(''); }
                        else if (['sin','cos','tan','log'].includes(key)) {
                            setEquation(`${key}(${display})`);
                            let val = parseFloat(display);
                            if (key === 'sin') setDisplay(Math.sin(val).toFixed(4));
                            if (key === 'cos') setDisplay(Math.cos(val).toFixed(4));
                            if (key === 'tan') setDisplay(Math.tan(val).toFixed(4));
                            if (key === 'log') setDisplay(Math.log10(val).toFixed(4));
                        }
                        else { setDisplay(prev => prev === '0' ? key : prev + key); }
                    }}
                    className="h-14 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-primary hover:text-white transition-all active:scale-95 border border-slate-100 text-xs uppercase"
                   >
                     {key}
                   </button>
                 ))}
                 <button onClick={() => { try { setDisplay(eval(display).toString()); setEquation(display + ' ='); } catch { setDisplay('Error'); } }} className="col-span-4 h-14 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20">CALCULATE</button>
               </div>
             </div>
          )}

          {category === 'health' && (
            <div className="space-y-6">
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Weight (kg)</label>
                     <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" placeholder="70" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Height (cm)</label>
                     <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" placeholder="175" />
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Age</label>
                     <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" placeholder="25" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Gender</label>
                     <select value={gender} onChange={e => setGender(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold outline-none">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                     </select>
                  </div>
               </div>
               <button onClick={calculateTdee} className="w-full bg-rose-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-rose-500/20 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                 <Activity className="w-4 h-4" /> Calculate Deficit
               </button>
               {tdeeResult && (
                 <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center animate-in zoom-in-95">
                    <p className="text-[10px] font-black text-rose-600 uppercase tracking-widest mb-1">Maintenance Calories</p>
                    <p className="text-4xl font-black text-rose-700">{tdeeResult} kcal</p>
                    <div className="mt-4 pt-4 border-t border-rose-100 grid grid-cols-2 gap-4">
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase">Weight Loss Target</p>
                          <p className="text-xl font-black text-emerald-600">{tdeeResult - 500} kcal</p>
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase">Aggressive Loss</p>
                          <p className="text-xl font-black text-amber-600">{tdeeResult - 750} kcal</p>
                       </div>
                    </div>
                 </div>
               )}
            </div>
          )}

          {category === 'finance' && (
            <div className="space-y-6">
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Amount ($)</label>
                  <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-indigo-500 outline-none" placeholder="10000" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rate (%)</label>
                     <input type="number" value={rate} onChange={e => setRate(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-indigo-500 outline-none" placeholder="5.5" />
                  </div>
                  <div className="space-y-1">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Term (Years)</label>
                     <input type="number" value={time} onChange={e => setTime(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-indigo-500 outline-none" placeholder="5" />
                  </div>
               </div>
               <button onClick={calculateLoan} className="w-full bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                 <Wallet className="w-4 h-4" /> Estimate Payment
               </button>
               {finResult && (
                 <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 text-center animate-in zoom-in-95">
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-1">Monthly Payment</p>
                    <p className="text-4xl font-black text-indigo-700">${finResult.toLocaleString()}</p>
                 </div>
               )}
            </div>
          )}

          {category === 'tax' && (
            <div className="space-y-6">
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Net Price ($)</label>
                  <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-amber-500 outline-none" placeholder="100.00" />
               </div>
               <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tax Rate (%)</label>
                  <input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-amber-500 outline-none" placeholder="10" />
               </div>
               <button onClick={calculateTax} className="w-full bg-amber-500 text-white font-black py-4 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                 <Receipt className="w-4 h-4" /> Calculate Gross
               </button>
               {taxResult && (
                 <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 animate-in zoom-in-95">
                    <div className="flex justify-between items-center mb-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tax Amount</p>
                       <p className="text-lg font-black text-amber-700">${taxResult.tax.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-amber-200">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Price</p>
                       <p className="text-2xl font-black text-slate-800">${taxResult.total.toFixed(2)}</p>
                    </div>
                 </div>
               )}
            </div>
          )}

          {category === 'percentage' && (
            <div className="space-y-6">
              <div className="flex bg-slate-100 p-1 rounded-2xl">
                <button 
                  onClick={() => { setPctMode('of'); setPctResult(null); }}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${pctMode === 'of' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  X% of Y
                </button>
                <button 
                  onClick={() => { setPctMode('what-percent'); setPctResult(null); }}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${pctMode === 'what-percent' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  X is What % of Y
                </button>
                <button 
                  onClick={() => { setPctMode('increase-decrease'); setPctResult(null); }}
                  className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${pctMode === 'increase-decrease' ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                >
                  % Change
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      {pctMode === 'of' ? 'Percentage (%)' : pctMode === 'what-percent' ? 'Value (X)' : 'Initial Value'}
                    </label>
                    <input 
                      type="number" 
                      value={pctInput1} 
                      onChange={e => setPctInput1(e.target.value)} 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" 
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      {pctMode === 'of' ? 'Total (Y)' : pctMode === 'what-percent' ? 'Total (Y)' : 'Final Value'}
                    </label>
                    <input 
                      type="number" 
                      value={pctInput2} 
                      onChange={e => setPctInput2(e.target.value)} 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" 
                      placeholder="0"
                    />
                  </div>
                </div>
                <button 
                  onClick={calculatePct}
                  className="w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Percent className="w-4 h-4" /> Calculate Percentage
                </button>
              </div>

              {pctResult !== null && (
                <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8 text-center animate-in zoom-in-95">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">Calculation Result</p>
                  <div className="text-5xl font-black text-slate-800 tracking-tighter">
                    {pctResult.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    {pctMode !== 'of' && <span className="text-primary ml-1">%</span>}
                  </div>
                  <p className="mt-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {pctMode === 'of' ? `${pctInput1}% of ${pctInput2}` : 
                     pctMode === 'what-percent' ? `${pctInput1} is what percent of ${pctInput2}` :
                     `Percent change from ${pctInput1} to ${pctInput2}`}
                  </p>
                </div>
              )}
            </div>
          )}

          {category === 'geometry' && (
            <div className="space-y-6">
              <div className="grid grid-cols-4 gap-2 bg-slate-100 p-1 rounded-2xl">
                {['circle', 'square', 'rectangle', 'triangle'].map(shape => (
                  <button 
                    key={shape}
                    onClick={() => { setGeoShape(shape); setGeoResult(null); setGeoInput1(''); setGeoInput2(''); }}
                    className={`py-3 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${geoShape === shape ? 'bg-white text-primary shadow-sm' : 'text-slate-400'}`}
                  >
                    {shape}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      {geoShape === 'circle' ? 'Radius' : geoShape === 'square' ? 'Side Length' : geoShape === 'rectangle' ? 'Length' : 'Base'}
                    </label>
                    <input 
                      type="number" 
                      value={geoInput1} 
                      onChange={e => setGeoInput1(e.target.value)} 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" 
                      placeholder="0"
                    />
                  </div>
                  {(geoShape === 'rectangle' || geoShape === 'triangle') && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        {geoShape === 'rectangle' ? 'Width' : 'Height'}
                      </label>
                      <input 
                        type="number" 
                        value={geoInput2} 
                        onChange={e => setGeoInput2(e.target.value)} 
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl p-4 font-bold focus:border-primary outline-none transition-all" 
                        placeholder="0"
                      />
                    </div>
                  )}
                </div>
                <button 
                  onClick={calculateGeo}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl shadow-lg shadow-slate-900/20 active:scale-95 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Ruler className="w-4 h-4" /> Calculate {geoShape}
                </button>
              </div>

              {geoResult && (
                <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Area</p>
                    <p className="text-2xl font-black text-slate-800">{geoResult.area.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">sq units</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {geoShape === 'circle' ? 'Circumference' : 'Perimeter'}
                    </p>
                    <p className="text-2xl font-black text-slate-800">{geoResult.perimeter.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                    <p className="text-[9px] font-bold text-slate-400 uppercase">units</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Fallback for other math tools */}
          {['statistics', 'trigonometry', 'fractions', 'discrete', 'algebra', 'math'].includes(category) && (
              <div className="text-center py-10">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-500 mx-auto mb-4">
                      <Calculator className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter mb-2">{categoryData?.name} Tools</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest max-w-xs mx-auto">
                    Advanced solvers for {categoryData?.name} are being updated. Use standard methods for now.
                  </p>
              </div>
          )}
        </div>

        <div className="bg-slate-50 p-6 flex items-start gap-4">
           <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
           <p className="text-[11px] font-medium text-slate-500 leading-relaxed">
             This calculation is for informational purposes. For critical financial or health decisions, please consult with a professional.
           </p>
        </div>
      </div>
      {category === 'timezone' && categoryData && (
        <TimezoneSuggestions 
          categoryData={categoryData} 
          currentFromId={fromTz} 
          currentToId={toTz} 
        />
      )}
    </div>
  );
}
