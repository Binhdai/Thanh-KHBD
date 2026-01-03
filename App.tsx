
import React, { useState } from 'react';
import { analyzeLessonPlan } from './geminiService';
import { LessonPlan, AIResponse, LessonActivity } from './types';
import { GRADES, DIGITAL_COMPETENCY_FRAMEWORK } from './constants';

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plan, setPlan] = useState<LessonPlan>({
    title: '',
    grade: '10',
    subject: 'Tin học',
    duration: '2 tiết',
    objectives: '',
    activities: [
      { id: '1', name: 'Hoạt động 1: Mở đầu/Khởi động', description: 'Tạo hứng thú, kết nối kiến thức cũ...', integratedCompetencies: [] },
      { id: '2', name: 'Hoạt động 2: Hình thành kiến thức mới', description: 'Đọc SGK, thảo luận, thực hành mẫu...', integratedCompetencies: [] },
      { id: '3', name: 'Hoạt động 3: Luyện tập', description: 'Giải bài tập, thực hành củng cố...', integratedCompetencies: [] },
      { id: '4', name: 'Hoạt động 4: Vận dụng', description: 'Giải quyết tình huống thực tế...', integratedCompetencies: [] }
    ]
  });
  const [result, setResult] = useState<AIResponse | null>(null);

  const handleUpdateActivity = (id: string, field: keyof LessonActivity, value: string) => {
    const updatedActivities = plan.activities.map(a => 
      a.id === id ? { ...a, [field]: value } : a
    );
    setPlan({ ...plan, activities: updatedActivities });
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await analyzeLessonPlan(plan);
      setResult(data);
      setStep(3);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] pb-24 text-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white shadow-2xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-2.5 rounded-2xl border border-white/20">
              <svg className="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight uppercase italic">DigiTeach Pro</h1>
              <p className="text-[10px] text-indigo-300 font-bold tracking-widest">Tích hợp Năng lực số - Phụ lục 1 & 3</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="hidden lg:block text-right">
              <p className="text-xs font-bold text-indigo-200">Thông tư 02/2025/TT-BGDĐT</p>
              <p className="text-[10px] text-indigo-400">Hướng dẫn số 3456/BGDĐT</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 mt-12">
        {/* Step Navigation */}
        <div className="flex items-center justify-center gap-2 mb-16">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div 
                className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm transition-all duration-500 ${step >= s ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-300 border border-slate-200'}`}
              >
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 rounded-full transition-all duration-500 ${step > s ? 'bg-indigo-600' : 'bg-slate-200'}`} />}
            </React.Fragment>
          ))}
        </div>

        {error && (
          <div className="bg-red-50 border-l-8 border-red-500 rounded-2xl p-6 mb-8 shadow-sm animate-bounce">
            <p className="text-red-800 font-black flex items-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </p>
          </div>
        )}

        {/* Step 1: Info */}
        {step === 1 && (
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-10 space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="border-b border-slate-100 pb-6">
              <h2 className="text-2xl font-black text-slate-800">Cấu trúc bài dạy</h2>
              <p className="text-slate-500 text-sm mt-1 font-medium">Xác định các thông số cơ bản theo Phụ lục 1.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tên bài học</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                  placeholder="Ví dụ: Bài 12 - Hệ quản trị CSDL"
                  value={plan.title}
                  onChange={(e) => setPlan({...plan, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Thời lượng dạy (Tiết)</label>
                <input 
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all"
                  value={plan.duration}
                  placeholder="Ví dụ: 2 tiết"
                  onChange={(e) => setPlan({...plan, duration: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Khối lớp</label>
                <select 
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-bold text-slate-700 focus:bg-white focus:border-indigo-500 outline-none transition-all cursor-pointer"
                  value={plan.grade}
                  onChange={(e) => setPlan({...plan, grade: e.target.value})}
                >
                  {GRADES.map(g => <option key={g} value={g}>Tin học lớp {g}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mục tiêu cốt lõi</label>
                <textarea 
                  className="w-full bg-slate-50 border-2 border-transparent rounded-2xl px-6 py-4 font-medium text-slate-700 h-32 focus:bg-white focus:border-indigo-500 outline-none transition-all resize-none"
                  placeholder="Nhập kiến thức trọng tâm cần truyền đạt..."
                  value={plan.objectives}
                  onChange={(e) => setPlan({...plan, objectives: e.target.value})}
                />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => setStep(2)}
                disabled={!plan.title}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-12 py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-20"
              >
                Tiếp theo: Thiết kế hoạt động
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Activities */}
        {step === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-10 duration-500">
            <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[24px] shadow-sm border border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-800">Các hoạt động dạy học</h2>
                <p className="text-xs font-bold text-indigo-500 uppercase tracking-widest mt-1">Cấu trúc 4 bước (Hướng dẫn 3456)</p>
              </div>
              <button 
                onClick={() => setPlan({...plan, activities: [...plan.activities, { id: Date.now().toString(), name: '', description: '', integratedCompetencies: [] }]})}
                className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
              </button>
            </div>

            <div className="space-y-6">
              {plan.activities.map((activity, index) => (
                <div key={activity.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 relative group overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-all"></div>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center font-black text-indigo-600 text-lg">{index + 1}</div>
                    <input 
                      type="text"
                      className="flex-1 text-lg font-bold border-none p-0 focus:ring-0 placeholder-slate-300"
                      value={activity.name}
                      onChange={(e) => handleUpdateActivity(activity.id, 'name', e.target.value)}
                    />
                    <button onClick={() => setPlan({...plan, activities: plan.activities.filter(a => a.id !== activity.id)})} className="text-slate-200 hover:text-red-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                  <textarea 
                    className="w-full bg-slate-50 border-none rounded-2xl px-6 py-4 font-medium text-slate-700 h-24 focus:bg-white focus:ring-2 focus:ring-indigo-100 outline-none transition-all resize-none"
                    placeholder="Mô tả các bước tổ chức thực hiện..."
                    value={activity.description}
                    onChange={(e) => handleUpdateActivity(activity.id, 'description', e.target.value)}
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-10">
              <button onClick={() => setStep(1)} className="text-slate-400 font-bold hover:text-slate-600 transition-colors">Quay lại</button>
              <button 
                onClick={handleAnalyze}
                disabled={loading}
                className="bg-indigo-900 text-white font-black px-14 py-5 rounded-[24px] shadow-2xl shadow-indigo-200 flex items-center gap-4 hover:scale-105 transition-all active:scale-95"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Đang thiết kế giáo án...
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-1.03 0-1.9-.4-2.593-.903l-.547-.547z" /></svg>
                    Xuất KHBD Tách Tiết & Tích Hợp
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && result && (
          <div className="space-y-12 animate-in slide-in-from-bottom-10 duration-700">
            <div className="bg-indigo-900 rounded-[48px] p-12 text-white shadow-3xl relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
               <div className="relative z-10">
                 <span className="bg-indigo-500 text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest">Phân tích Năng lực số</span>
                 <h2 className="text-4xl font-black mt-4 mb-4">{plan.title}</h2>
                 <p className="text-indigo-200 text-lg leading-relaxed font-medium italic opacity-80">{result.analysis}</p>
               </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {result.suggestions.map((s, i) => (
                <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-2 h-8 bg-green-500 rounded-full"></div>
                    <span className="font-black text-xs text-green-700 bg-green-50 px-3 py-1 rounded-lg uppercase tracking-wider">Mã: {s.competencyCode}</span>
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-2 leading-tight">{s.suggestedMethod}</h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">{s.rationale}</p>
                </div>
              ))}
            </div>

            <div className="bg-slate-900 rounded-[48px] p-1.5 shadow-2xl">
               <div className="bg-slate-800 rounded-t-[46px] px-12 py-8 flex items-center justify-between border-b border-slate-700/50">
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1.5">
                       <div className="w-3 h-3 rounded-full bg-red-500"></div>
                       <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                       <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-slate-400 font-mono text-xs ml-4">GIAO_AN_PHU_LUC_1_3.md</span>
                  </div>
                  <button 
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-3 shadow-lg shadow-indigo-900"
                    onClick={() => {
                      const blob = new Blob([result.modifiedPlan], { type: 'text/markdown' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a'); a.href = url; a.download = `KHBD_${plan.title.replace(/\s+/g, '_')}.md`; a.click();
                    }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Tải về Microsoft Word
                  </button>
               </div>
               <div className="p-14 font-mono text-sm leading-loose text-indigo-100/90 overflow-x-auto whitespace-pre-wrap max-h-[1000px] overflow-y-auto selection:bg-indigo-500/40">
                 {result.modifiedPlan}
               </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Status Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 px-10 py-3 bg-white/70 backdrop-blur-xl border border-white/50 rounded-full shadow-3xl z-50 hidden md:flex items-center gap-12 border-t border-white">
          <div className="flex items-center gap-2">
             <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-sm shadow-emerald-200"></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Gemini 2.5 Flash Lite Active</span>
          </div>
          <div className="h-4 w-px bg-slate-200"></div>
          <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Digital Competency Framework v1.0</p>
      </div>
    </div>
  );
};

export default App;
