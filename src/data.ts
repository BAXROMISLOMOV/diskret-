import { Chapter } from './types';

export const CHAPTERS: Chapter[] = [
  {
    id: 'intro',
    title: "Maksimal Element",
    shortTitle: "MAX",
    complexity: "O(n)",
    description: "Aniqlik va tartib",
    slides: [
      {
        id: 's1',
        characterExpression: 'happy',
        dialogue: "Salom! Men sizga 'Diskret Tuzilmalar' fanining eng qiziqarli qismi - Algoritmlarni o'rgataman. Tayyormisiz?",
        type: 'text',
        codeSnippet: "// Boshlang'ich tushuncha\n// Algoritm - bu qadamlar\n// ketma-ketligidir."
      },
      {
        id: 's1_game',
        characterExpression: 'happy',
        dialogue: "Keling, o'yin o'ynaymiz! Eng katta sonni bosing.",
        type: 'visualizer',
        content: { algo: 'max_game' }
      },
      {
        id: 's2',
        characterExpression: 'neutral',
        dialogue: "Algoritm – bu muammoni hal qilish uchun aniq va tartibli qadamlar ketma-ketligi. Masalan, retsept yoki yo'riqnoma kabi.",
        type: 'text'
      },
      {
        id: 's3',
        characterExpression: 'thinking',
        dialogue: "Keling, eng katta sonni topishni ko'ramiz. Biz har safar yangi sonni 'vaqtinchalik maksimum' bilan solishtiramiz.",
        type: 'visualizer',
        content: { algo: 'max' },
        codeSnippet: "max := a[1];\nfor i := 2 to n do\n  if max < a[i] then\n    max := a[i];"
      }
    ]
  },
  {
    id: 'search',
    title: "Chiziqli Qidiruv",
    shortTitle: "LINEAR",
    complexity: "O(n)",
    description: "Chiziqli vs Binar",
    slides: [
      {
        id: 's4',
        characterExpression: 'neutral',
        dialogue: "Chiziqli qidiruvda biz hammani birma-bir tekshiramiz. Bu uzoq vaqt oladi, lekin ishonchli.",
        type: 'visualizer',
        content: { algo: 'linear_game' },
        codeSnippet: "i := 1\nwhile (i <= n and x != a[i])\n  i := i + 1\nlocation := i"
      },
      {
        id: 's5',
        characterExpression: 'surprised',
        dialogue: "Binar qidiruvchi? U ro'yxatni ikkiga bo'lib, kerakli qismini qidiradi. Juda tez, lekin tartiblangan ro'yxat kerak!",
        type: 'visualizer',
        content: { algo: 'binary' },
        codeSnippet: "i := 1; j := n\nwhile i < j\n  m := floor((i+j)/2)\n  if x > a[m] then i := m+1\n  else j := m"
      },
      {
        id: 'quiz1',
        characterExpression: 'thinking',
        dialogue: "Qaysi biri tezroq deb o'ylaysiz?",
        type: 'quiz',
        content: {
          question: "Millionta tartiblangan son ichidan bittasini topishda qaysi algoritm afzal?",
          options: ["Chiziqli (Linear)", "Binar (Binary)", "Ikkalasi bir xil", "Tasodifiy"],
          correctAnswer: 1
        }
      }
    ]
  },
  {
    id: 'sorting',
    title: "Bubble Sort",
    shortTitle: "BUBBLE",
    complexity: "O(n²)",
    description: "Bubble va Insertion",
    slides: [
      {
        id: 's6',
        characterExpression: 'happy',
        dialogue: "Pufakchali saralashda (Bubble Sort) eng katta elementlar xuddi suv ostidagi pufakchalar kabi yuqoriga 'suzib chiqadi'.",
        type: 'visualizer',
        content: { algo: 'bubble' },
        codeSnippet: "for i := 1 to n-1\n  for j := 1 to n-i\n    if a[j] > a[j+1] then\n      swap(a[j], a[j+1])"
      },
      {
        id: 's7',
        characterExpression: 'neutral',
        dialogue: "Kiritish saralashi (Insertion Sort) xuddi qo'ldagi kartalarni tartiblashdek gap. Har bir yangi elementni o'z o'rniga joylaymiz.",
        type: 'visualizer',
        content: { algo: 'insertion' },
        codeSnippet: "for i := 2 to n\n  key := a[i]; j := i - 1\n  while j >= 1 and a[j] > key\n    a[j+1] := a[j]; j := j - 1\n  a[j+1] := key"
      },
      {
        id: 's7_game',
        characterExpression: 'happy',
        dialogue: "Keling, o'zingiz sinab ko'ring! Sonlarni kichigidan kattasiga qarab tartiblang.",
        type: 'visualizer',
        content: { algo: 'sort_game' }
      }
    ]
  },
  {
    id: 'greedy',
    title: "Kassir Algoritmi",
    shortTitle: "CASHIER",
    complexity: "Various",
    description: "Greedy Algorithms",
    slides: [
      {
        id: 's8',
        characterExpression: 'thinking',
        dialogue: "Greedy algoritmlar har qadamda eng foydali ko'ringan variantni tanlaydi. Masalan, eng kam tangalar bilan qaytim berish.",
        type: 'visualizer',
        content: { algo: 'change' },
        codeSnippet: "for i := 1 to r\n  while n >= c[i]\n    count[i]++\n    n := n - c[i]"
      },
      {
        id: 's8_game',
        characterExpression: 'happy',
        dialogue: "Kassa o'yini! Ko'rsatilgan miqdorni minimal tangalar bilan yig'ing.",
        type: 'visualizer',
        content: { algo: 'cashier_game' }
      }
    ]
  },
  {
    id: 'bigo',
    title: "Big-O Nazariyasi",
    shortTitle: "BIG-O",
    complexity: "Various",
    description: "Algoritmlar qanchalik tez o'sadi?",
    slides: [
      {
        id: 's10',
        characterExpression: 'surprised',
        dialogue: "Algoritmlarni solishtirish uchun biz Big-O dan foydalanamiz. Bu ma'lumotlar ko'payganda vaqt qanday o'zgarishini ko'rsatadi.",
        type: 'chart',
        content: { type: 'bigo' }
      }
    ]
  },
  {
    id: 'dynamic',
    title: "Dinamik Dasturlash",
    shortTitle: "DP",
    complexity: "O(n)",
    description: "Bo'lib tashla va hukmronlik qil",
    slides: [
      {
        id: 'dp_1',
        characterExpression: 'thinking',
        dialogue: "Dinamik dasturlash - bu murakkab muammoni kichik bo'laklarga bo'lib, ularning natijasini eslab qolish orqali yechishdir.",
        type: 'text',
        codeSnippet: "dp[0] := 0; dp[1] := 1;\nfor i := 2 to n\n  dp[i] := dp[i-1] + dp[i-2];"
      },
      {
        id: 'dp_2',
        characterExpression: 'happy',
        dialogue: "Fibonachchi sonlarini hisoblash - bu DP ning eng yorqin misolidir. Biz har bir natijani jadvalga yozib boramiz.",
        type: 'text'
      }
    ]
  },
  {
    id: 'theory',
    title: "Diskret Matematika",
    shortTitle: "THEORY",
    complexity: "Info",
    description: "Nazariy asoslar",
    slides: [
      {
        id: 'theory_1',
        characterExpression: 'neutral',
        dialogue: "Diskret matematika algoritmlarning fundamenti hisoblanadi. To'plamlar, graflar va mantiqiy amallar orqali biz murakkab muammolarni hal qilamiz.",
        type: 'text',
        codeSnippet: "Sets: {1, 2, 3}\nLogic: A AND B\nGraphs: Nodes & Edges"
      },
      {
        id: 'theory_2',
        characterExpression: 'happy',
        dialogue: "Bu bilimlar sizga faqat dasturlashda emas, balki hayotiy mantiqiy masalalarni yechishda ham yordam beradi.",
        type: 'text'
      }
    ]
  },
  {
    id: 'conclusion',
    title: "Xulosa",
    shortTitle: "END",
    complexity: "Final",
    description: "Dars yakunlandi",
    slides: [
      {
        id: 'final',
        characterExpression: 'happy',
        dialogue: "Siz bilan birga o'rganish juda yoqimli bo'ldi! Endi algoritmlar sirlarini bilasiz.",
        type: 'text'
      },
      {
        id: 'credits',
        characterExpression: 'neutral',
        dialogue: "Ushbu interaktiv o'quv dasturi Islomov Baxrom va Inomiddinov Asadxoja tomonidan yaratildi.\n\nE'tiboringiz uchun rahmat!",
        type: 'text'
      }
    ]
  }
];
