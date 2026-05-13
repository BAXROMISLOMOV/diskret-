import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { cn } from '../utils';

export const MaxGame = ({ onWin }: { onWin?: () => void }) => {
  const [nums, setNums] = useState([12, 45, 23, 67, 34, 89, 11]);
  const [found, setFound] = useState(false);
  const max = Math.max(...nums);

  const handleClick = (n: number) => {
    if (n === max) {
      setFound(true);
      onWin?.();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="text-white text-sm font-bold uppercase tracking-widest mb-2">Eng katta sonni toping!</div>
      <div className="flex flex-wrap justify-center gap-3">
        {nums.map((n, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleClick(n)}
            className={cn(
              "w-12 h-12 rounded-xl font-bold border-2 transition-all shadow-lg",
              found && n === max ? "bg-emerald-500 border-emerald-400 text-white" : "bg-slate-700 border-slate-600 text-slate-300 hover:border-blue-400"
            )}
          >
            {n}
          </motion.button>
        ))}
      </div>
      {found && <motion.div initial={{scale:0}} animate={{scale:1}} className="text-emerald-400 font-bold uppercase text-xs">Juda soz! {max} - eng kattasi.</motion.div>}
    </div>
  );
};

export const LinearGame = ({ onWin }: { onWin?: () => void }) => {
  const [items] = useState(['🍎', '🍌', '🍇', '🍒', '🍋', '🍉', '🍍']);
  const [target] = useState('🍒');
  const [foundIdx, setFoundIdx] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="text-white text-sm font-bold uppercase tracking-widest mb-2">{target} ni toping!</div>
      <div className="flex gap-2">
        {items.map((item, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -5 }}
            onClick={() => { if (item === target) { setFoundIdx(i); onWin?.(); } }}
            className={cn(
              "w-12 h-12 flex items-center justify-center text-2xl rounded-xl border-2 transition-all",
              foundIdx === i ? "bg-emerald-500 border-emerald-400 shadow-emerald-500/20" : "bg-slate-700 border-slate-600 hover:border-blue-400"
            )}
          >
            {foundIdx === i ? item : '?'}
          </motion.button>
        ))}
      </div>
      {foundIdx !== null && <div className="text-emerald-400 font-bold text-xs">Topildi! Indeks: {foundIdx}</div>}
    </div>
  );
};

export const SortGame = ({ onWin }: { onWin?: () => void }) => {
  const [arr, setArr] = useState([5, 2, 8, 1, 9]);
  const [selected, setSelected] = useState<number | null>(null);

  const handleSwap = (idx: number) => {
    if (selected === null) {
      setSelected(idx);
    } else {
      const nextArr = [...arr];
      [nextArr[selected], nextArr[idx]] = [nextArr[idx], nextArr[selected]];
      setArr(nextArr);
      setSelected(null);
      
      const sorted = nextArr.every((v, i) => i === 0 || v >= nextArr[i-1]);
      if (sorted) {
        onWin?.();
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="text-white text-sm font-bold uppercase tracking-widest mb-2">Elementlarni o'rinini almashtirib saralang!</div>
      <div className="flex gap-2">
        {arr.map((n, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1 }}
            onClick={() => handleSwap(i)}
            className={cn(
              "w-12 h-12 rounded-xl font-bold border-2 transition-all shadow-lg",
              selected === i ? "bg-blue-500 border-blue-400 text-white" : "bg-slate-700 border-slate-600 text-slate-300"
            )}
          >
            {n}
          </motion.button>
        ))}
      </div>
      {arr.every((v, i) => i === 0 || v >= arr[i-1]) && (
        <motion.div initial={{scale:0}} animate={{scale:1}} className="text-emerald-400 font-bold uppercase text-xs">Ajoyib! Saralandi.</motion.div>
      )}
    </div>
  );
};

export const CashierGame = ({ onWin }: { onWin?: () => void }) => {
  const [target] = useState(41);
  const [current, setCurrent] = useState(0);
  const coins = [25, 10, 5, 1];

  const addCoin = (val: number) => {
    if (current + val <= target) {
      const next = current + val;
      setCurrent(next);
      if (next === target) onWin?.();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
      <div className="text-white text-sm font-bold uppercase tracking-widest mb-2">{target} sent yig'ing!</div>
      <div className="text-3xl font-black text-blue-400 mb-2">{current} / {target}</div>
      <div className="flex gap-4">
        {coins.map(c => (
          <motion.button
            key={c}
            whileTap={{ scale: 0.9 }}
            onClick={() => addCoin(c)}
            className="w-14 h-14 rounded-full bg-amber-400 border-b-4 border-amber-600 flex items-center justify-center text-amber-900 font-black shadow-lg"
          >
            {c}
          </motion.button>
        ))}
      </div>
      <button onClick={() => setCurrent(0)} className="text-[10px] text-white/30 uppercase font-black hover:text-white transition-colors mt-2">Tozalash</button>
    </div>
  );
};

export const MaxVisualizer = () => {
  const [array] = useState([1, 8, 12, 9, 11, 2, 14, 5, 10, 4]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxVal, setMaxVal] = useState(array[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < array.length - 1) {
          const next = prev + 1;
          if (array[next] > maxVal) setMaxVal(array[next]);
          return next;
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [maxVal, array]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100">
      <div className="flex flex-wrap justify-center gap-2">
        {array.map((val, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              scale: currentIndex === i ? 1.1 : 1,
              backgroundColor: currentIndex === i ? '#3b82f6' : val === maxVal ? '#10b981' : '#f8fafc',
              color: (currentIndex === i || val === maxVal) ? '#fff' : '#475569'
            }}
            className="w-12 h-12 flex items-center justify-center rounded-xl font-bold border border-gray-100 shadow-sm"
          >
            {val}
          </motion.div>
        ))}
      </div>
      <div className="text-sm font-bold text-gray-500 uppercase tracking-widest bg-gray-50 px-4 py-1 rounded-full">
        Joriy: {array[currentIndex]} | Maksimum: <span className="text-green-600">{maxVal}</span>
      </div>
    </div>
  );
};

export const BinaryVisualizer = () => {
  const [array] = useState([1, 3, 4, 5, 6, 8, 9, 11, 13, 15, 18, 19, 20]);
  const target = 9;
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(array.length - 1);
  const [mid, setMid] = useState(Math.floor((0 + array.length - 1) / 2));
  const [found, setFound] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (left <= right && !found) {
        const m = Math.floor((left + right) / 2);
        setMid(m);
        if (array[m] === target) setFound(true);
        else if (array[m] < target) setLeft(m + 1);
        else setRight(m - 1);
      }
    }, 1500);
    return () => clearInterval(timer);
  }, [left, right, found, array]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-2xl border border-gray-100">
      <div className="text-gray-900 mb-2 font-bold bg-blue-50 px-4 py-1 rounded-full border border-blue-100">Target: {target}</div>
      <div className="flex flex-wrap justify-center gap-2">
        {array.map((val, i) => {
          const isRange = i >= left && i <= right;
          const isMid = i === mid;
          return (
            <motion.div
              key={i}
              animate={{
                opacity: isRange ? 1 : 0.2,
                scale: isMid ? 1.1 : 1,
                backgroundColor: isMid ? '#3b82f6' : i === left || i === right ? '#ef4444' : '#f8fafc',
                color: isMid || i === left || i === right ? '#fff' : '#475569'
              }}
              className="w-10 h-10 flex items-center justify-center rounded-lg font-bold border border-gray-100 shadow-sm"
            >
              {val}
            </motion.div>
          );
        })}
      </div>
      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
        Chap: {left} | O'ng: {right} | O'rta: {mid}
      </div>
      {found && <motion.div initial={{y:10}} animate={{y:0}} className="text-green-600 font-bold text-sm bg-green-50 px-4 py-1 rounded-full border border-green-100 uppercase italic">Topildi!</motion.div>}
    </div>
  );
};

export const BubbleVisualizer = () => {
    const [arr, setArr] = useState([5, 3, 8, 2, 1]);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setArr(prev => {
                const nextArr = [...prev];
                if (i < nextArr.length) {
                    if (j < nextArr.length - 1 - i) {
                        if (nextArr[j] > nextArr[j+1]) {
                            [nextArr[j], nextArr[j+1]] = [nextArr[j+1], nextArr[j]];
                        }
                        setJ(j + 1);
                        return nextArr;
                    } else {
                        setJ(0);
                        setI(i + 1);
                        return nextArr;
                    }
                }
                return prev;
            });
        }, 800);
        return () => clearInterval(timer);
    }, [i, j]);

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-end gap-3 h-32">
                {arr.map((val, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        initial={false}
                        animate={{ 
                            height: val * 24,
                            backgroundColor: (idx === j || idx === j + 1) ? '#3b82f6' : '#f1f5f9'
                        }}
                        className="w-10 rounded-t-xl border border-gray-200 relative shadow-sm"
                    >
                        <span className="absolute bottom-1 w-full text-center text-gray-600 text-xs font-bold">{val}</span>
                    </motion.div>
                ))}
            </div>
            <div className="text-blue-600 font-bold text-xs uppercase tracking-widest">Pufakchali Saralash (Bubble Sort)</div>
        </div>
    );
};

export const InsertionVisualizer = () => {
    const [arr, setArr] = useState([5, 3, 8, 2, 1]);
    const [i, setI] = useState(1);
    const [j, setJ] = useState(0);
    const [key, setKey] = useState<number | null>(null);
    const [sorting, setSorting] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            if (!sorting) return;

            setArr(prev => {
                const nextArr = [...prev];
                if (i < nextArr.length) {
                    if (key === null) {
                        setKey(nextArr[i]);
                        setJ(i - 1);
                        return nextArr;
                    }

                    if (j >= 0 && nextArr[j] > key) {
                        nextArr[j + 1] = nextArr[j];
                        setJ(j - 1);
                        return nextArr;
                    } else {
                        nextArr[j + 1] = key;
                        setKey(null);
                        setI(i + 1);
                        return nextArr;
                    }
                } else {
                    setSorting(false);
                    return nextArr;
                }
            });
        }, 800);
        return () => clearInterval(timer);
    }, [i, j, key, sorting]);

    return (
        <div className="flex flex-col items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100">
            <div className="flex items-end gap-3 h-32">
                {arr.map((val, idx) => (
                    <motion.div
                        key={idx}
                        layout
                        initial={false}
                        animate={{ 
                            height: val * 24,
                            backgroundColor: idx === i ? '#8b5cf6' : (idx === j + 1 && key !== null) ? '#3b82f6' : '#f1f5f9',
                            scale: idx === i ? 1.1 : 1
                        }}
                        className="w-10 rounded-t-xl border border-gray-200 relative shadow-sm"
                    >
                        <span className="absolute bottom-1 w-full text-center text-gray-600 text-xs font-bold">{val}</span>
                    </motion.div>
                ))}
            </div>
            <div className="text-purple-600 font-bold text-xs uppercase tracking-widest">Kiritish Saralashi (Insertion Sort)</div>
        </div>
    );
};

export const ChangeVisualizer = () => {
  const [target, setTarget] = useState(67);
  const coins = [25, 10, 5, 1];
  const [result, setResult] = useState<number[]>([]);

  useEffect(() => {
    let rem = target;
    const res = [];
    for (const c of coins) {
      const count = Math.floor(rem / c);
      res.push(count);
      rem %= c;
    }
    setResult(res);
  }, [target]);

  return (
    <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-2xl border border-gray-100">
      <div className="flex items-center gap-4 mb-6">
        <span className="text-sm font-bold text-gray-400 uppercase">Qaytim miqdori:</span>
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2">
          <input 
            type="number" 
            value={target} 
            onChange={(e) => setTarget(Number(e.target.value))}
            className="w-16 bg-transparent text-gray-900 font-bold text-center focus:outline-none"
          />
          <span className="text-gray-400 font-bold ml-2">sent</span>
        </div>
      </div>
      <div className="flex gap-6">
        {coins.map((c, i) => (
          <div key={c} className="flex flex-col items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              className="w-14 h-14 rounded-full bg-amber-400 border-b-4 border-amber-600 flex items-center justify-center text-amber-900 font-black shadow-lg"
            >
              {c}
            </motion.div>
            <div className="text-blue-600 font-black">× {result[i] || 0}</div>
          </div>
        ))}
      </div>
      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">Kassir Algoritmi (Ochko'z Yondashuv)</div>
    </div>
  );
};

export const BigOChart = () => {
  const data = Array.from({ length: 15 }, (_, i) => {
    const n = i + 1;
    return {
      name: n,
      n: n,
      logN: Math.log2(n) * 2,
      nSq: n * n / 2,
    };
  });

  return (
    <div className="w-full h-80 bg-white p-6 rounded-2xl border border-gray-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} fontStyle="bold" />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Line type="monotone" dataKey="nSq" name="O(n²)" stroke="#f43f5e" strokeWidth={3} dot={{ stroke: '#f43f5e', strokeWidth: 2, r: 4, fill: '#fff' }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="n" name="O(n)" stroke="#3b82f6" strokeWidth={3} dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: '#fff' }} />
          <Line type="monotone" dataKey="logN" name="O(log n)" stroke="#10b981" strokeWidth={3} dot={{ stroke: '#10b981', strokeWidth: 2, r: 4, fill: '#fff' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CodingAnimation = () => {
  const snippets = [
    "function findMax(arr) {\n  let max = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > max) max = arr[i];\n  }\n  return max;\n}",
    "function binarySearch(arr, x) {\n  let l = 0, r = arr.length - 1;\n  while (l <= r) {\n    let m = Math.floor((l + r) / 2);\n    if (arr[m] === x) return m;\n    if (arr[m] < x) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n}",
    "// Diskret Matematika\n// P -> Q <=> NOT P OR Q\n// De Morgan's Law\nNOT (P AND Q) <=> NOT P OR NOT Q",
    "// Graph Theory\n// BFS Algorithm\nqueue.push(root);\nvisited[root] = true;\nwhile (queue.length > 0) {\n  let v = queue.shift();\n  for (let neighbor of adj[v]) {\n    if (!visited[neighbor]) {\n       visited[neighbor] = true;\n       queue.push(neighbor);\n    }\n  }\n}"
  ];

  const [snippetIdx, setSnippetIdx] = useState(0);
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let charIdx = 0;
    const currentSnippet = snippets[snippetIdx];
    
    const typingInterval = setInterval(() => {
      setDisplayText(currentSnippet.slice(0, charIdx));
      charIdx++;
      
      if (charIdx > currentSnippet.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setSnippetIdx((prev) => (prev + 1) % snippets.length);
          setDisplayText("");
        }, 2000);
      }
    }, 30);
    
    return () => clearInterval(typingInterval);
  }, [snippetIdx]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg bg-[#0d1117] rounded-2xl overflow-hidden border border-white/10 shadow-2xl font-mono text-[11px] lg:text-xs p-6 relative group"
    >
       <div className="absolute top-3 left-4 flex gap-1.5 transition-opacity group-hover:opacity-100 opacity-40">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
       </div>
       <div className="mt-4 text-emerald-400/90 min-h-[160px] whitespace-pre-wrap leading-relaxed selection:bg-emerald-500/30">
          {displayText}
          <motion.span 
            animate={{ opacity: [1, 0] }} 
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-1.5 h-3.5 bg-emerald-500 inline-block align-middle ml-1"
          />
       </div>
       <div className="absolute bottom-4 right-4 text-[9px] uppercase font-bold text-white/5 tracking-[0.3em] group-hover:text-white/20 transition-colors">
          Algorithm_Core_V3.sys
       </div>
    </motion.div>
  );
};
