# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

   # Smart Budget & Wishlist Tracker (DreamSaver)                                                                                       
                                                                                                                                         
    Aplikasi *mobile hybrid* berbasis **React Native** dan **Expo (SDK 58)** untuk pencatatan anggaran keuangan harian (*smart           
    budget*) sekaligus pelacak target impian (*wishlist tracker*) dengan pendekatan gamifikasi visual.                                               
    ## 1. Konsep & Cara Kerja React Native                                                                                               
    React Native memungkinkan pengembangan aplikasi *cross-platform* (Android & iOS) menggunakan satu basis kode (*single codebase*) JavaScript/TypeScript dan React.                                                                                                     
   ### Cara Kerja                                           
   React Native menjalankan logika aplikasi pada **JavaScript Thread**, sedangkan antarmuka pengguna dirender langsung oleh Native Thread platform (Java/Kotlin di Android, Obj-C/Swift di iOS). Komunikasi antar-thread dijembatani oleh antarmuka modern yang memanggil komponen UI bawaan platform secara *real-time* tanpa mengorbankan performa seperti   *web-view*.                                                                        
    ### 3 Keunggulan untuk Aplikasi Hybrid:                                                                                              
    1. **Cross-Platform Efficiency**: Menulis kode sekali (*write once*), berjalan identik di Android dan iOS sehingga menghemat waktu   
    dan biaya pengembangan.                                                                                                              
    2. **Native Performance & Look-and-Feel**: Elemen yang dirender adalah komponen UI asli sistem operasi (bukan HTML/CSS biasa),       
    menghasilkan animasi yang mulus (*60+ FPS*).                                                                                         
    3. **Fast Refresh & Ekosistem Luas**: Perubahan kode langsung terlihat di perangkat secara instan tanpa perlu *rebuild* ulang dari   
    awal, didukung modul Expo yang kaya.                                                                                                 
                                                                                                                                         
    ---                                                                                                                                  
                                                                                                                                         
    ## 2. Implementasi Konsep Inti React Native                                                                                          
                                                                                                                                         
    ### A. Komponen & Props                                                                                                              
    Komponen dibuat modular dan menerima parameter melalui `props` agar dapat digunakan ulang (*reusable*):                              
    ```tsx                                                                                                                               
    // src/components/ProgressBar.tsx                                              
    interface ProgressBarProps {                                                                                                 progress: number; // nilai 0 - 1
    color: string;                                        
    
             
    }                                                                                                                                    
                                                                                                                                         
    export function ProgressBar({ progress, color }: ProgressBarProps) {                                                                 
      return (                
        <View className="h-2 rounded-full bg-slate-100 overflow-hidden">                                                                 
          <View style={{ width: `${progress * 100}%`, backgroundColor: color, height: '100%' }} />                                       
        </View>                                        
      );                                                                 
    }                                                                                                                                    
                                                                                                                                         
  ### B. State (Hooks useState)                                          State mengelola data dinamis yang memperbarui tampilan saat terjadi interaksi:                               
    // src/app/(tabs)/home.tsx                                                                                                           
    const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);                                            
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);                                                                         
                                                                                                                                         
    const handleAddTransaction = (newTx: TransactionItem) => {                                                                           
      setTransactions([newTx, ...transactions]); // Update state & render ulang UI                                                       
    };                                                                                                                                   
                                                                                                                                         
  ### C. Navigasi (Expo Router)                                                                                                          
                                                                                                                                         
  Menggunakan navigasi berbasis berkas (file-based routing) dengan pengiriman parameter dinamis:                                         
                                                                                                                                         
    // Berpindah dan mengirim data dinamis:                                                                                              
    router.push({                                                                                                                        
      pathname: '/transaction-detail',                                                                                                   
      params: { name: 'Gojek Ride', amount: '-25000', type: 'expense' }                                                                  
    });                                                                                                                                  
                                                                                                                                         
    // Menerima parameter di halaman tujuan:                                                                                             
    const params = useLocalSearchParams<{ name: string; amount: string }>();                                                             
---                                                                                                                                 
  ## 3. Analisis Kebutuhan Sistem                                
  ### Masalah:                                                                                                                           
  Banyak generasi muda kesulitan mengontrol pengeluaran harian dan kehilangan motivasi dalam menabung karena aplikasi pencatat           
  keuangan konvensional terasa kaku, rumit, dan membosankan.                                                                             
                                                                                                                                         
  ### Target Pengguna:                       
  Mahasiswa, fresh graduate, dan first-jobber yang ingin mengelola uang saku/gaji harian secara teratur dan memiliki target belanja      
  barang impian.                                                                                                                         
                                                                                                                                         
  ### 5 Kebutuhan Pengguna:                                                                                                              
                                                                                                                                         
  1. Mencatat transaksi pemasukan dan pengeluaran secara instan.                                                                         
  2. Memantau batas kuota anggaran bulanan (spending limit) beserta persentasenya.                                                       
  3. Membuat daftar barang impian (wishlist) dengan progres tabungan visual.                                                             
  4. Mengetahui estimasi hari tercapainya target impian melalui kalkulator tabungan harian.                                              
  5. Melihat rincian kuitansi transaksi lengkap serta riwayat status baca notifikasi.     


4.Tabel Pemetaan Kebutuhan ke layar dan komponen
| Kebutuhan Pengguna | Layar (*Screen*) | Komponen Utama |
| --- | --- | --- |
| Autentikasi Pengguna | index.tsx, (auth)/login.tsx | TextInput, Pressable, Form Validation State |
| Ringkasan Anggaran & Catat Transaksi | (tabs)/home.tsx | ProgressBar, Card Modal Catat, Filter Tabs |
| Wishlist & Kalkulator Tabungan | (tabs)/explore.tsx | ProgressBar, Milestone Indicator, Modal Impian |
| Verifikasi Kuitansi & Kategori | transaction-detail.tsx | HeaderBar, Category Selector Modal, Native Share |
| Profil Akun & Prestasi Gamifikasi | profile.tsx | HeaderBar, BadgeCard, Modal Dompet/Keamanan |
| Riwayat Peringatan & Info Tabungan | notifications.tsx | HeaderBar, Notification Item Toggle |

## 5. Keputusan Desain & Rencana Pengembangan                                                                                          
                                                                                                                                         
  ### Alasan Keputusan Desain:                                                                                                           
                                                                                                                                         
  • Tema Cerah (Bright Indigo Theme): Menggunakan warna dasar slate-50 dipadukan aksen indigo (#4f46e5) agar aplikasi terasa segar,      
  modern, dan tidak mengintimidasi pengguna baru.                                                                                        
  • Gamifikasi & Efek Visual: Menghadirkan Streak Menabung, Badge Koleksi, serta animasi halus dari react-native-reanimated untuk        
  memicu kebiasaan positif menabung seperti bermain game.                                                                                
                                                                                                                                         
  ### Rencana Pengembangan Lanjutan:                                                                                                     
                                                                                                                                         
  1. Sinkronisasi Cloud: Integrasi RESTful API / Supabase untuk penyimpanan multi-perangkat.                                             
  2. OCR Smart Scan: Pemindaian struk belanja otomatis menggunakan kamera ponsel.                                                        
  3. Ekspor Laporan: Fitur unduh laporan keuangan bulanan dalam format PDF / Excel

  Link Video Demo : 
  
