import {
  Coffee,
  Flame,
  Gift,
  Laptop,
  Music,
  ShoppingBag,
  Sparkles,
  Trophy,
  Utensils,
  Zap,
} from 'lucide-react-native';


// 1. Types & Interfaces


export interface CategoryItem {
  id: string;
  name: string;
  icon: any;
  spent: number;
  budget: number;
  color: string;
  bg: string;
}

export interface TransactionItem {
  id: string;
  name: string;
  amount: number;
  time: string;
  type: 'income' | 'expense';
  category: string;
  paymentMethod: string;
  trxId: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  category: string;
  targetAmount: number;
  currentAmount: number;
  icon: any;
  color: string;
  bgLight: string;
  deadline: string;
}

export interface BadgeItem {
  id: string;
  name: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
  unlocked: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  icon: any;
  color: string;
  bg: string;
  unread: boolean;
}

// 2. Utility Functions


export function formatRupiah(amount: number): string {
  const abs = Math.abs(amount);
  if (abs >= 1000000) return `Rp ${(abs / 1000000).toFixed(1)}jt`;
  if (abs >= 1000) return `Rp ${(abs / 1000).toFixed(0)}rb`;
  return `Rp ${abs}`;
}

// 3. Static Datasets


export const categories: CategoryItem[] = [
  { id: '1', name: 'Makanan & Minuman', icon: Utensils, spent: 450000, budget: 800000, color: '#f97316', bg: '#fff7ed' },
  { id: '2', name: 'Belanja & Fashion', icon: ShoppingBag, spent: 320000, budget: 500000, color: '#8b5cf6', bg: '#f5f3ff' },
  { id: '3', name: 'Transportasi', icon: Zap, spent: 150000, budget: 300000, color: '#06b6d4', bg: '#ecfeff' },
  { id: '4', name: 'Coffee & Chill', icon: Coffee, spent: 85000, budget: 150000, color: '#ec4899', bg: '#fdf2f8' },
];

export const initialTransactions: TransactionItem[] = [
  {
    id: '1',
    name: 'Starbucks Reserve',
    amount: -45000,
    time: 'Hari ini, 15:15 WIB',
    type: 'expense',
    category: 'Makanan & Minuman',
    paymentMethod: 'GoPay (QRIS)',
    trxId: 'TRX-20261108-9842',
  },
  {
    id: '2',
    name: 'Gojek Ride',
    amount: -25000,
    time: 'Hari ini, 10:30 WIB',
    type: 'expense',
    category: 'Transportasi',
    paymentMethod: 'GoPay',
    trxId: 'TRX-20261108-7712',
  },
  {
    id: '3',
    name: 'Gaji Pokok',
    amount: 5000000,
    time: 'Hari ini, 08:00 WIB',
    type: 'income',
    category: 'Gaji & Penghasilan',
    paymentMethod: 'BCA Transfer',
    trxId: 'TRX-20261108-1104',
  },
  {
    id: '4',
    name: 'Freelance Design',
    amount: 1200000,
    time: 'Kemarin, 12:00 WIB',
    type: 'income',
    category: 'Gaji & Penghasilan',
    paymentMethod: 'Bank Mandiri',
    trxId: 'TRX-20261107-5531',
  },
];

export const initialWishlists: WishlistItem[] = [
  {
    id: '1',
    title: 'MacBook Pro M3',
    category: 'Gadget & Work',
    targetAmount: 24000000,
    currentAmount: 18000000,
    icon: Laptop,
    color: '#6366f1',
    bgLight: '#eef2ff',
    deadline: 'Desember 2026',
  },
  {
    id: '2',
    title: 'Tiket Konser Coldplay',
    category: 'Entertainment',
    targetAmount: 3500000,
    currentAmount: 2800000,
    icon: Music,
    color: '#ec4899',
    bgLight: '#fdf2f8',
    deadline: 'November 2026',
  },
  {
    id: '3',
    title: 'Sepatu Running Nike',
    category: 'Lifestyle',
    targetAmount: 1800000,
    currentAmount: 900000,
    icon: Gift,
    color: '#f59e0b',
    bgLight: '#fef3c7',
    deadline: 'Januari 2027',
  },
];

export const badges: BadgeItem[] = [
  {
    id: '1',
    name: 'First Saver',
    desc: 'Nabung pertama kali',
    icon: Sparkles,
    color: '#6366f1',
    bg: '#eef2ff',
    unlocked: true,
  },
  {
    id: '2',
    name: 'Streak Master',
    desc: '7 hari nabung rutin',
    icon: Flame,
    color: '#f97316',
    bg: '#fff7ed',
    unlocked: true,
  },
  {
    id: '3',
    name: 'Dream Achiever',
    desc: '1 impian tercapai (Sepatu)',
    icon: Trophy,
    color: '#eab308',
    bg: '#fefce8',
    unlocked: true,
  },
  {
    id: '4',
    name: 'Big Whale',
    desc: 'Total tabungan 50jt',
    icon: Trophy,
    color: '#94a3b8',
    bg: '#f1f5f9',
    unlocked: false,
  },
];

export const initialNotifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Milestone 75% Tercapai! 🎉',
    desc: 'Target MacBook Pro M3 kamu tinggal sedikit lagi tercapai. Terus pertahankan!',
    time: '10 menit yang lalu',
    icon: Trophy,
    color: '#eab308',
    bg: '#fefce8',
    unread: true,
  },
  {
    id: '2',
    title: 'Setoran Otomatis Berhasil',
    desc: 'Tabungan harian sebesar Rp 50.000 berhasil disisihkan ke kantong Target Impian.',
    time: 'Hari ini, 08:00 WIB',
    icon: Sparkles,
    color: '#10b981',
    bg: '#ecfdf5',
    unread: true,
  },
  {
    id: '3',
    title: 'Peringatan Budget Kategori Makanan',
    desc: 'Pengeluaran makanan bulan ini sudah mencapai 85% dari batas budget.',
    time: 'Kemarin, 19:30 WIB',
    icon: Utensils,
    color: '#f97316',
    bg: '#fff7ed',
    unread: false,
  },
  {
    id: '4',
    title: 'Streak 14 Hari Beruntun! 🔥',
    desc: 'Hebat! Kamu sudah mencatat pengeluaran 14 hari berturut-turut tanpa putus.',
    time: '2 hari yang lalu',
    icon: Flame,
    color: '#6366f1',
    bg: '#eef2ff',
    unread: false,
  },
];
