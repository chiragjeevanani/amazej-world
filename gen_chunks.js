const replacements = [
    { line: 873, old: 'grow_your_network: "आफ्नो नेटवर्क बढाउनुहोस्"', new: 'grow_your_network: "रेफरल कोड"' },
    { line: 1199, old: 'grow_your_network: "Crece tu Red"', new: 'grow_your_network: "Código de Referido"' },
    { line: 1525, old: 'grow_your_network: "Développez votre réseau"', new: 'grow_your_network: "Code de Parrainage"' },
    { line: 1847, old: 'grow_your_network: "Cresça sua Rede"', new: 'grow_your_network: "Código de Referência"' },
    { line: 2169, old: 'grow_your_network: "Erweitern Sie Ihr Netzwerk"', new: 'grow_your_network: "Empfehlungscode"' },
    { line: 2491, old: 'grow_your_network: "Fai crescere la tua rete"', new: 'grow_your_network: "Codice di Riferimento"' },
    { line: 2813, old: 'grow_your_network: "Развивайте сеть"', new: 'grow_your_network: "Реферальный код"' },
    { line: 3135, old: 'grow_your_network: "发展您的网络"', new: 'grow_your_network: "推荐码"' },
    { line: 3457, old: 'grow_your_network: "ネットワークを成長させる"', new: 'grow_your_network: "招待コード"' },
    { line: 3779, old: 'grow_your_network: "네트워크 성장"', new: 'grow_your_network: "추천 코드"' },
    { line: 4101, old: 'grow_your_network: "انمِ شبكتك"', new: 'grow_your_network: "كود الإحالة"' },
    { line: 4423, old: 'grow_your_network: "Ağını Büyüt"', new: 'grow_your_network: "Referans Kodu"' },
    { line: 4745, old: 'grow_your_network: "Phát triển mạng lưới của bạn"', new: 'grow_your_network: "Mã Giới Thiệu"' },
    { line: 5067, old: 'grow_your_network: "ขยายเครือข่ายของคุณ"', new: 'grow_your_network: "รหัสอ้างอิง"' },
    { line: 5389, old: 'grow_your_network: "Kembangkan Jaringan Anda"', new: 'grow_your_network: "Kode Referensi"' },
    { line: 5711, old: 'grow_your_network: "Kembangkan Rangkaian Anda"', new: 'grow_your_network: "Kod Rujukan"' },
    { line: 6033, old: 'grow_your_network: "Palaguin ang Iyong Network"', new: 'grow_your_network: "Referral Code"' },
    { line: 6355, old: 'grow_your_network: "আপনার নেটওয়ার্ক বৃদ্ধি করুন"', new: 'grow_your_network: "রেফারেল কোড"' },
    { line: 6677, old: 'grow_your_network: "اپنا نیٹ ورک بڑھائیں"', new: 'grow_your_network: "ریفرل کوڈ"' },
    { line: 6999, old: 'grow_your_network: "شبکه خود را گسترش دهید"', new: 'grow_your_network: "کد معرف"' }
];

const chunks = replacements.map(r => ({
    AllowMultiple: false,
    EndLine: r.line,
    ReplacementContent: `                        ${r.new},`,
    StartLine: r.line,
    TargetContent: `                        ${r.old},`
}));

console.log(JSON.stringify(chunks, null, 2));
