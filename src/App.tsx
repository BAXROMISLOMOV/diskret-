import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  Monitor, 
  Info,
  Terminal,
  Cpu,
  Github
} from 'lucide-react';
import { CHAPTERS } from './data';
import { QuizContent } from './types';
import { cn } from './utils';
import { 
  MaxVisualizer, 
  BinaryVisualizer, 
  BubbleVisualizer, 
  BigOChart, 
  ChangeVisualizer, 
  InsertionVisualizer,
  MaxGame,
  LinearGame,
  SortGame,
  CashierGame,
  CodingAnimation
} from './components/Visualizers';

const CodeBlock = ({ code }: { code: string }) => {
  if (!code) return null;
  return (
    <div className="bg-[#0d1117] rounded-2xl border border-white/5 overflow-hidden font-mono text-sm relative group w-full shadow-2xl">
      <div className="bg-white/5 px-4 py-2 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        </div>
        <span className="text-[10px] text-white/30 uppercase font-black font-sans">Source Kod</span>
      </div>
      <div className="p-6 flex">
        <div className="text-white/20 select-none mr-6 text-right w-4">
          {code.split('\n').map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <pre className="text-blue-100 flex-1 whitespace-pre-wrap leading-relaxed">
          {code.split('\n').map((line, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="hover:bg-white/5 px-2 -mx-2 transition-colors"
            >
              {line.split(' ').map((word, j) => {
                if (['for', 'if', 'while', 'to', 'then', 'do', 'return', 'else'].includes(word)) {
                  return <span key={j} className="text-pink-400 font-bold">{word} </span>;
                }
                if (word.includes(':=')) return <span key={j} className="text-blue-400 font-bold">{word} </span>;
                return <span key={j}>{word} </span>;
              })}
            </motion.div>
          ))}
        </pre>
      </div>
      <div className="absolute top-24 right-4 opacity-10 pointer-events-none">
        <Terminal className="w-48 h-48 text-white" strokeWidth={1} />
      </div>
    </div>
  );
};

const Quiz = ({ content, onComplete }: { content: QuizContent; onComplete: () => void }) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    const correct = idx === content.correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setTimeout(onComplete, 1500);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="grid gap-3">
        {content.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleSelect(i)}
            disabled={isCorrect === true}
            className={cn(
              "w-full p-6 text-left rounded-2xl border-2 transition-all group flex items-start gap-4",
              selected === i 
                ? (i === content.correctAnswer ? "border-emerald-500 bg-emerald-500/10 text-emerald-100" : "border-red-500 bg-red-500/10 text-red-100")
                : "border-slate-800 bg-slate-900/50 hover:border-blue-500 hover:bg-blue-500/5 text-slate-400"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center font-black",
              selected === i 
                ? (i === content.correctAnswer ? "bg-emerald-500 text-white" : "bg-red-500 text-white")
                : "bg-slate-800 text-slate-500"
            )}>
              {String.fromCharCode(65 + i)}
            </div>
            <div className="flex-1">
              <span className="font-bold block mb-1">{opt}</span>
              {selected === i && (
                i === content.correctAnswer ? <div className="text-[10px] uppercase font-black text-emerald-400">To'g'ri!</div> : <div className="text-[10px] uppercase font-black text-red-400">Xato!</div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  const chapter = CHAPTERS[activeChapterIdx];
  const slide = chapter.slides[activeSlideIdx];

  const nextSlide = () => {
    if (activeSlideIdx < chapter.slides.length - 1) {
      setActiveSlideIdx(activeSlideIdx + 1);
    } else if (activeChapterIdx < CHAPTERS.length - 1) {
      setActiveChapterIdx(activeChapterIdx + 1);
      setActiveSlideIdx(0);
    }
  };

  const prevSlide = () => {
    if (activeSlideIdx > 0) {
      setActiveSlideIdx(activeSlideIdx - 1);
    } else if (activeChapterIdx > 0) {
      setActiveChapterIdx(activeChapterIdx - 1);
      setActiveSlideIdx(CHAPTERS[activeChapterIdx - 1].slides.length - 1);
    }
  };

  const renderVisualizer = (content: any) => {
    if (!content) return null;
    switch (content.algo) {
      case 'max_game': return <MaxGame />;
      case 'linear_game': return <LinearGame />;
      case 'sort_game': return <SortGame />;
      case 'cashier_game': return <CashierGame />;
      case 'max': return <MaxVisualizer />;
      case 'binary': return <BinaryVisualizer />;
      case 'bubble': return <BubbleVisualizer />;
      case 'insertion': return <InsertionVisualizer />;
      case 'change': return <ChangeVisualizer />;
      default: return null;
    }
  };

  return (
    <div className="flex h-screen bg-[#f1f3f6] text-gray-900 font-sans overflow-hidden">
      <style>{`
        .grid-bg {
          background-image: radial-gradient(#d1d5db 1px, transparent 1px);
          background-size: 32px 32px;
        }
      `}</style>

      {/* Modern Sidebar */}
      <aside className="w-[340px] bg-[#0a121e] flex flex-col border-r border-white/5 z-20">
        <div className="p-10 pb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 border border-white/20">
              <Monitor className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase">DISKRET</h1>
              <p className="text-[11px] font-black text-white/30 uppercase tracking-[0.2em] mt-0.5">System Terminal V2.0</p>
            </div>
          </div>
          <div className="h-[2px] w-full bg-white/5 rounded-full" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-2 py-4">
          {CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => {
                setActiveChapterIdx(idx);
                setActiveSlideIdx(0);
              }}
              className={cn(
                "group relative w-full p-4 rounded-2xl transition-all flex items-center justify-between border-2",
                activeChapterIdx === idx 
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 border-blue-400 shadow-2xl shadow-blue-500/30 text-white" 
                  : "bg-transparent border-transparent text-white/40 hover:bg-white/5"
              )}
            >
              <div className="text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-black text-sm tracking-tight">{ch.title}</span>
                  <div className={cn(
                    "text-[8px] px-1.5 py-0.5 rounded-md font-black uppercase border",
                    activeChapterIdx === idx ? "bg-white/20 border-white/20 text-white" : "bg-white/5 border-white/10 text-white/30"
                  )}>{ch.complexity}</div>
                </div>
                <div className={cn(
                  "text-[10px] font-black uppercase tracking-widest",
                  activeChapterIdx === idx ? "text-white/60" : "text-white/20"
                )}>{ch.shortTitle}</div>
              </div>
              <ChevronRight className={cn("w-4 h-4 transition-transform", activeChapterIdx === idx ? "translate-x-1" : "opacity-0")} />
            </button>
          ))}
        </div>


      </aside>

      {/* Scientific Main Area */}
      <main className="flex-1 relative flex flex-col grid-bg">
        <header className="h-20 border-b border-gray-200 flex items-center justify-between px-10 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
             <span className="text-blue-500">Directed Access</span>
             <span className="text-gray-300">//</span>
             <span>{chapter.shortTitle}</span>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="flex gap-1.5">
                {[1,2,3].map(i => <div key={i} className={cn("w-2 h-2 rounded-full", activeSlideIdx === i-1 ? "bg-blue-600" : "bg-gray-200")} />)}
             </div>
             <div className="h-6 w-[1px] bg-gray-200" />
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Status:</span>
                <span className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Operational</span>
             </div>
          </div>
        </header>

        <div className="flex-1 p-6 lg:p-10 overflow-auto flex items-center justify-center">
          <div className="w-full max-w-7xl grid grid-cols-12 gap-6 lg:gap-10 items-stretch min-h-[500px] max-h-full">
            {/* Left Panel: Content Visual/Code */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-4 lg:gap-6">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={slide.id}
                   initial={{ opacity: 0, scale: 0.98 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 1.02 }}
                   transition={{ duration: 0.3 }}
                   className="flex-1 flex flex-col gap-4 lg:gap-6"
                 >
                   {slide.codeSnippet ? (
                      <CodeBlock code={slide.codeSnippet} />
                   ) : (
                     <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6 lg:p-10 flex-1 flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px]">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 -mr-32 -mt-32 transition-transform group-hover:scale-125" />
                        <div className="relative z-10 w-full">
                           {renderVisualizer(slide.content)}
                           {slide.type === 'chart' && <BigOChart />}
                           {(slide.type === 'text' || slide.type === 'quiz') && !slide.codeSnippet && (
                              <div className="flex flex-col items-center gap-10 w-full max-w-2xl">
                                 <CodingAnimation />
                                 <div className="flex flex-col items-center gap-4">
                                     <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 text-blue-600 shadow-inner">
                                        {slide.type === 'quiz' ? (
                                           <Info className="w-6 h-6 animate-bounce" strokeWidth={2.5} />
                                        ) : (
                                           <Cpu className="w-6 h-6 animate-pulse" strokeWidth={2.5} />
                                        )}
                                     </div>
                                     <p className="text-xl font-black text-center text-gray-800 tracking-tight leading-snug italic px-6">
                                       {slide.type === 'quiz' ? slide.content.question : `"${slide.dialogue}"`}
                                     </p>
                                 </div>
                              </div>
                           )}
                        </div>
                     </div>
                   )}

                   {/* Secondary Content if Code Snippet is present */}
                   {slide.codeSnippet && slide.type !== 'text' && (
                      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6">
                         {renderVisualizer(slide.content)}
                      </div>
                   )}
                 </motion.div>
               </AnimatePresence>
            </div>

            {/* Right Panel: Description/Quiz */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 lg:gap-6">
               <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 lg:p-10 flex-1 flex flex-col min-h-0">
                  <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-none mb-6 italic">Muammo Yechimi</h3>
                  
                  <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                     <div className="space-y-2">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ushbu protsedura</p>
                        <h4 className="text-lg font-bold border-b-2 border-blue-600 pb-1 inline-block">{chapter.title}</h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">muammosini diskret matematika tamoyillari asosida hal qiladi.</p>
                     </div>

                     <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-sm text-gray-500 leading-relaxed font-medium">
                        {slide.type === 'quiz' ? (
                          <Quiz content={slide.content} onComplete={nextSlide} />
                        ) : (
                          slide.dialogue
                        )}
                     </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
                     <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                        <Info className="w-5 h-5" />
                     </div>
                     <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] leading-relaxed">
                        Tizim tahlili yakunlandi. <br />
                        <span className="text-blue-500">Algoritm optimallashtirilgan.</span>
                     </p>
                  </div>
               </div>

               {/* Navigation Controls */}
               <div className="flex gap-4 h-20">
                  <button
                    onClick={prevSlide}
                    disabled={activeChapterIdx === 0 && activeSlideIdx === 0}
                    className="flex-1 bg-white border border-gray-200 rounded-3xl flex items-center justify-center hover:bg-gray-50 transition-all disabled:opacity-30 shadow-lg active:scale-95"
                  >
                    <ChevronLeft className="w-8 h-8 text-gray-400" />
                  </button>
                  <button
                    onClick={nextSlide}
                    disabled={activeChapterIdx === CHAPTERS.length - 1 && activeSlideIdx === chapter.slides.length - 1}
                    className="flex-[2] bg-[#00c2ff] rounded-3xl flex items-center justify-center gap-3 hover:bg-[#00a6db] transition-all shadow-xl active:scale-95 text-white font-black uppercase tracking-widest text-sm"
                  >
                    Keyingi
                    <ChevronRight className="w-6 h-6" />
                  </button>
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
