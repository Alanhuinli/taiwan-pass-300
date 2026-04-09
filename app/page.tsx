"use client";

import React, { useState } from 'react';
import { Menu, Volume2, UtensilsCrossed, Bus, GraduationCap, ShoppingBag, ChevronRight, Construction, HeartPulse, CreditCard, Landmark, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- 台灣通 300 句 終極資料庫 ---
const taiwan300Data = [
  // 1-15 基礎與飲食
  { id: 1, category: "飲食", chinese: "我要一杯珍珠奶茶，半糖少冰。", pinyin: "Wǒ yào yī bēi zhēnzhū nǎichá", vietnamese: "Tôi muốn một ly trà sữa trân châu, nửa đường ít đá." },
  { id: 2, category: "飲食", chinese: "內用還是外帶？", pinyin: "Nèiyòng háishì wàidài?", vietnamese: "Ăn tại đây hay mang về?" },
  { id: 3, category: "交通", chinese: "請問捷運站在哪裡？", pinyin: "Qǐngwèn jiéyùnzhàn zài nǎlǐ?", vietnamese: "Cho hỏi trạm tàu điện ngầm ở đâu?" },
  { id: 4, category: "交通", chinese: "我想買一張悠遊卡。", pinyin: "Wǒ xiǎng mǎi yī zhāng yōuyóukǎ", vietnamese: "Tôi muốn mua một thẻ EasyCard." },
  { id: 5, category: "生活", chinese: "請問這附近有便利商店嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu biànlì shāngdiàn ma?", vietnamese: "Cho hỏi gần đây có cửa hàng tiện lợi không?" },
  { id: 6, category: "生活", chinese: "這個多少錢？", pinyin: "Zhège duōshǎo qián?", vietnamese: "Cái này bao nhiêu tiền?" },
  { id: 7, category: "生活", chinese: "可以便宜一點嗎？", pinyin: "Kěyǐ piányí yīdiǎn ma?", vietnamese: "Có thể rẻ hơn một chút không?" },
  { id: 8, category: "生活", chinese: "我不需要塑膠袋。", pinyin: "Wǒ bù xūyào sùjiāodài", vietnamese: "Tôi không cần túi nilon." },
  { id: 9, category: "校園", chinese: "老師好，我想請假。", pinyin: "Lǎoshī hǎo, wǒ xiǎng qǐngjià", vietnamese: "Chào thầy/cô, em muốn xin nghỉ phép." },
  { id: 10, category: "校園", chinese: "這張表格要怎麼填？", pinyin: "Zhè zhāng biǎogé yào zěnme tián?", vietnamese: "Tờ mẫu này điền như thế nào?" },
  { id: 11, category: "交通", chinese: "請問這台公車有到育達大學嗎？", pinyin: "Qǐngwèn zhè tái gōngchē yǒu dào Yùdá dàxué ma?", vietnamese: "Cho hỏi xe buýt này có đến đại học Dục Đạt không?" },
  { id: 12, category: "生活", chinese: "我想辦手機門號。", pinyin: "Wǒ xiǎng bàn shǒujī ménhào", vietnamese: "Tôi muốn làm số điện thoại di động." },
  { id: 13, category: "飲食", chinese: "我不吃牛肉。", pinyin: "Wǒ bù chī niúròu", vietnamese: "Tôi không ăn thịt bò." },
  { id: 14, category: "生活", chinese: "可以用悠遊卡付錢嗎？", pinyin: "Kěyǐ yòng yōuyóukǎ fùqián ma?", vietnamese: "Có thể dùng thẻ EasyCard để trả tiền không?" },
  { id: 15, category: "校園", chinese: "請問辦公室在哪裡？", pinyin: "Qǐngwèn bàngōngshì zài nǎlǐ?", vietnamese: "Cho hỏi văn phòng ở đâu?" },
  // 16-30 交通與醫療
  { id: 16, category: "校園", chinese: "請問圖書館怎麼走？", pinyin: "Qǐngwèn túshūguǎn zěnme zǒu?", vietnamese: "Cho hỏi thư viện đi như thế nào?" },
  { id: 17, category: "校園", chinese: "我想借這本書。", pinyin: "Wǒ xiǎng jiè zhè běn shū", vietnamese: "Em muốn mượn quyển sách này." },
  { id: 18, category: "生活", chinese: "哪裡有提款機(ATM)？", pinyin: "Nǎlǐ yǒu tíkuǎnjī?", vietnamese: "Ở đâu có máy rút tiền tự động (ATM)?" },
  { id: 19, category: "醫療", chinese: "我頭很痛，想看醫生。", pinyin: "Wǒ tóu hěn tòng, xiǎng kàn yīshēng", vietnamese: "Tôi rất đau đầu, muốn đi khám bác sĩ." },
  { id: 20, category: "醫療", chinese: "我感冒了，一直流鼻涕。", pinyin: "Wǒ gǎnmàole, yīzhí liú bítì", vietnamese: "Tôi bị cảm rồi, cứ bị chảy nước mũi hoài." },
  { id: 21, category: "生活", chinese: "請問這裡的 Wi-Fi 密碼是什麼？", pinyin: "Qǐngwèn zhèlǐ de Wi-Fi mìmǎ shì shénme?", vietnamese: "Cho hỏi mật khẩu Wi-Fi ở đây là gì?" },
  { id: 22, category: "交通", chinese: "請問公車還要多久才會到？", pinyin: "Qǐngwèn gōngchē hái yào duōjiǔ cái huì dào?", vietnamese: "Cho hỏi xe buýt còn bao lâu nữa mới đến?" },
  { id: 23, category: "飲食", chinese: "我要一個排骨便當。", pinyin: "Wǒ yào yīgè páigǔ biàndāng", vietnamese: "Tôi muốn một hộp cơm sườn." },
  { id: 24, category: "飲食", chinese: "請問有菜單嗎？", pinyin: "Qǐngwèn yǒu càidān ma?", vietnamese: "Cho hỏi có thực đơn không?" },
  { id: 25, category: "生活", chinese: "我想買一張手機預付卡。", pinyin: "Wǒ xiǎng mǎi yī zhāng shǒujī yùfùkǎ", vietnamese: "Tôi muốn mua một thẻ điện thoại trả trước." },
  { id: 26, category: "交通", chinese: "請問這台車有去台北嗎？", pinyin: "Qǐngwèn zhè tái chē yǒu qù Táiběi ma?", vietnamese: "Cho hỏi xe này có đi Đài Bắc không?" },
  { id: 27, category: "醫療", chinese: "請問這附近有藥局嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu yàojú ma?", vietnamese: "Cho hỏi gần đây có hiệu thuốc không?" },
  { id: 28, category: "生活", chinese: "請問這附近有夜市嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu yèshì ma?", vietnamese: "Cho hỏi gần đây có chợ đêm không?" },
  { id: 29, category: "生活", chinese: "我想換錢，哪裡有銀行？", pinyin: "Wǒ xiǎng huànqián, nǎlǐ yǒu yínháng?", vietnamese: "Tôi muốn đổi tiền, ở đâu có ngân hàng?" },
  { id: 30, category: "生活", chinese: "請問垃圾車幾點會來？", pinyin: "Qǐngwèn lājīchē jǐ diǎn huì lái?", vietnamese: "Cho hỏi xe rác mấy giờ sẽ đến?" },
  // 31-50 校園生活進階
  { id: 31, category: "校園", chinese: "我的學生證丟了，怎麼辦？", pinyin: "Wǒ de xuéshengzhèng diūle", vietnamese: "Thẻ sinh viên của em bị mất rồi, phải làm sao ạ?" },
  { id: 32, category: "校園", chinese: "我想參加社團活動。", pinyin: "Wǒ xiǎng cānjiā shètuán huódòng", vietnamese: "Em muốn tham gia hoạt động câu lạc bộ." },
  { id: 33, category: "校園", chinese: "這學期的學費是多少？", pinyin: "Zhè xuéqī de xuéfèi shì duōshǎo?", vietnamese: "Học phí học kỳ này là bao nhiêu?" },
  { id: 34, category: "校園", chinese: "請問下週有考試嗎？", pinyin: "Qǐngwèn xiàzhōu yǒu kǎoshì ma?", vietnamese: "Cho hỏi tuần sau có thi không?" },
  { id: 35, category: "校園", chinese: "我聽不懂老師說的話。", pinyin: "Wǒ tīng bù dǒng lǎoshī shuō de huà", vietnamese: "Em không hiểu những gì thầy cô nói." },
  { id: 36, category: "校園", chinese: "我想申請獎學金。", pinyin: "Wǒ xiǎng shēnqǐng jiǎngxuéjīn", vietnamese: "Em muốn nộp đơn xin học bổng." },
  { id: 37, category: "校園", chinese: "宿舍的熱水壞了。", pinyin: "Sùshè de rèshuǐ huàile", vietnamese: "Nước nóng trong ký túc xá bị hỏng rồi." },
  { id: 38, category: "校園", chinese: "請問哪裡可以影印？", pinyin: "Qǐngwèn nǎlǐ kěyǐ yǐngyìn?", vietnamese: "Cho hỏi ở đâu có thể photocopy?" },
  { id: 39, category: "校園", chinese: "我要補辦學生證。", pinyin: "Wǒ yào bǔbàn xuéshengzhèng", vietnamese: "Em muốn làm lại thẻ sinh viên." },
  { id: 40, category: "校園", chinese: "這題數學我不會做。", pinyin: "Zhè tí shùxué wǒ bù huì zuò", vietnamese: "Bài toán này em không biết làm." },
  { id: 41, category: "銀行", chinese: "我要開戶。", pinyin: "Wǒ yào kāihù", vietnamese: "Tôi muốn mở tài khoản ngân hàng." },
  { id: 42, category: "銀行", chinese: "我想匯款回越南。", pinyin: "Wǒ xiǎng huìkuǎn huí Yuènán", vietnamese: "Tôi muốn chuyển tiền về Việt Nam." },
  { id: 43, category: "銀行", chinese: "我的提款卡密碼忘了。", pinyin: "Wǒ de tíkuǎnkǎ mìmǎ wàngle", vietnamese: "Tôi quên mật khẩu thẻ rút tiền rồi." },
  { id: 44, category: "銀行", chinese: "我要存錢。", pinyin: "Wǒ yào cúnqián", vietnamese: "Tôi muốn gửi tiền vào tài khoản." },
  { id: 45, category: "銀行", chinese: "我要領錢。", pinyin: "Wǒ yào lǐngqián", vietnamese: "Tôi muốn rút tiền." },
  { id: 46, category: "職場", chinese: "請問有打工的機會嗎？", pinyin: "Qǐngwèn yǒu dǎgōng de jīhuì ma?", vietnamese: "Cho hỏi có cơ hội làm thêm không ạ?" },
  { id: 47, category: "職場", chinese: "我要辦理工作許可證。", pinyin: "Wǒ yào bànlǐ gōngzuò xǔkězhèng", vietnamese: "Em muốn làm giấy phép lao động." },
  { id: 48, category: "職場", chinese: "我的時薪是多少錢？", pinyin: "Wǒ de shíxīn shì duōshǎo qián?", vietnamese: "Lương theo giờ của em là bao nhiêu tiền?" },
  { id: 49, category: "職場", chinese: "我今天想請病假。", pinyin: "Wǒ jīntiān xiǎng qǐng bìngjià", vietnamese: "Hôm nay tôi muốn xin nghỉ ốm." },
  { id: 50, category: "職場", chinese: "我要領薪水了。", pinyin: "Wǒ yào lǐng xīnshuǐle", vietnamese: "Tôi sắp được nhận lương rồi." },
  // ... (下略 250 句，將在第二步提供)
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<number | null>(null);

  const handlePlayAudio = async (text: string, id: number) => {
    if (isLoading !== null) return;
    setIsLoading(id);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.play();
      }
    } catch (error) {
      console.error("發音出錯:", error);
    } finally {
      setIsLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 pb-20">
      <header className="bg-white p-8 shadow-sm text-center border-b-4 border-orange-500">
        <h1 className="text-4xl font-extrabold text-orange-600 tracking-tight">台灣通 300 句</h1>
        <p className="text-gray-600 mt-3 font-medium text-lg">育達科技大學專屬：300 句越南學生生活教材</p>
      </header>

      <main className="max-w-5xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {taiwan300Data.map((item) => (
          <Card key={item.id} className="overflow-hidden border-2 hover:border-orange-400 transition-all shadow-md hover:shadow-xl group">
            <CardHeader className="bg-orange-50 pb-2 border-b">
              <div className="flex justify-between items-center">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase shadow-sm">
                  {item.category}
                </span>
                <span className="text-gray-400 text-sm font-mono">#{item.id}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-8 text-center min-h-[220px] flex flex-col justify-center px-6">
              <h2 className="text-2xl font-bold mb-3 text-gray-800 leading-snug">{item.chinese}</h2>
              <p className="text-sm text-orange-600 font-semibold mb-6 tracking-wide">{item.pinyin}</p>
              <p className="text-lg text-blue-800 italic font-medium bg-blue-50 py-3 rounded-lg border border-blue-100">
                "{item.vietnamese}"
              </p>
            </CardContent>
            <CardFooter className="bg-white flex justify-center py-5 border-t">
              <Button 
                onClick={() => handlePlayAudio(item.chinese, item.id)} 
                disabled={isLoading === item.id} 
                className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-12 py-6 text-lg shadow-lg transform active:scale-95 transition-all"
              >
                {isLoading === item.id ? "⏳ 發音中..." : "🔊 台灣腔發音"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      <footer className="bg-gray-800 text-white p-10 mt-20 text-center">
        <p className="text-lg font-bold">育達科技大學 Yu Da University of Science and Technology</p>
        <p className="text-gray-400 mt-2">© 2026 台灣通 300 句數位平台</p>
      </footer>

      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t-2 border-orange-100 flex justify-around p-4 text-orange-600 z-50 shadow-2xl">
        <div className="flex flex-col items-center hover:scale-110 transition-transform"><UtensilsCrossed size={28} /> <span className="text-xs font-bold mt-1">飲食</span></div>
        <div className="flex flex-col items-center hover:scale-110 transition-transform"><Bus size={28} /> <span className="text-xs font-bold mt-1">交通</span></div>
        <div className="flex flex-col items-center hover:scale-110 transition-transform"><Landmark size={28} /> <span className="text-xs font-bold mt-1">銀行</span></div>
        <div className="flex flex-col items-center hover:scale-110 transition-transform"><HeartPulse size={28} /> <span className="text-xs font-bold mt-1">醫療</span></div>
        <div className="flex flex-col items-center hover:scale-110 transition-transform"><Briefcase size={28} /> <span className="text-xs font-bold mt-1">職場</span></div>
      </nav>
    </div>
  );
}
