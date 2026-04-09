"use client";

import React, { useState } from 'react';
import { Menu, Volume2, UtensilsCrossed, Bus, GraduationCap, ShoppingBag, ChevronRight, Construction, HeartPulse } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- 台灣通 300 句資料倉庫 (目前已更新至 30 句) ---
const taiwan300Data = [
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
  { id: 12, category: "生活", chinese: "我想辦手機門號。", pinyin: "Wǒ xiǎng bàn shǒujī ménhào", vietnamese: "Tôi muốn làm số điện thoại di動." },
  { id: 13, category: "飲食", chinese: "我不吃牛肉。", pinyin: "Wǒ bù chī niúròu", vietnamese: "Tôi không ăn thịt bò." },
  { id: 14, category: "生活", chinese: "可以用悠遊卡付錢嗎？", pinyin: "Kěyǐ yòng yōuyóukǎ fùqián ma?", vietnamese: "Có thể dùng thẻ EasyCard để trả tiền không?" },
  { id: 15, category: "校園", chinese: "請問辦公室在哪裡？", pinyin: "Qǐngwèn bàngōngshì zài nǎlǐ?", vietnamese: "Cho hỏi văn phòng ở đâu?" },
  { id: 16, category: "校園", chinese: "請問圖書館怎麼走？", pinyin: "Qǐngwèn túshūguǎn zěnme zǒu?", vietnamese: "Cho hỏi thư viện đi như thế nào?" },
  { id: 17, category: "校園", chinese: "我想借這本書。", pinyin: "Wǒ xiǎng jiè zhè běn shū", vietnamese: "Em muốn mượn quyển sách này." },
  { id: 18, category: "生活", chinese: "哪裡有提款機(ATM)？", pinyin: "Nǎlǐ yǒu tíkuǎnjī?", vietnamese: "Ở đâu có máy rút tiền tự動 (ATM)?" },
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
  { id: 30, category: "生活", chinese: "請問垃圾車幾點會來？", pinyin: "Qǐngwèn lājīchē jǐ diǎn huì lái?", vietnamese: "Cho hỏi xe rác mấy giờ sẽ đến?" }
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
      <header className="bg-white p-6 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-orange-600">台灣通 300 句</h1>
        <p className="text-gray-500 mt-2">育達科技大學專屬：30 句台灣生活必備實用短語</p>
      </header>

      <main className="max-w-4xl mx-auto p-4 grid gap-6 md:grid-cols-2">
        {taiwan300Data.map((item) => (
          <Card key={item.id} className="overflow-hidden border-2 hover:border-orange-400 transition-colors shadow-lg">
            <CardHeader className="bg-orange-100 pb-2">
              <div className="flex justify-between items-center">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">{item.category}</span>
                <span className="text-gray-400 text-sm"># {item.id}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 text-center min-h-[180px] flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.chinese}</h2>
              <p className="text-sm text-orange-600 font-medium mb-4">{item.pinyin}</p>
              <p className="text-lg text-blue-700 italic border-t border-dashed border-gray-200 pt-4">"{item.vietnamese}"</p>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-center py-4 border-t">
              <Button onClick={() => handlePlayAudio(item.chinese, item.id)} disabled={isLoading === item.id} className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10 shadow-md">
                {isLoading === item.id ? "⏳ 載入中..." : "🔊 播放台灣腔發音"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-3 text-orange-600 z-50">
        <div className="flex flex-col items-center opacity-80"><UtensilsCrossed size={24} /> <span className="text-[10px] mt-1">飲食</span></div>
        <div className="flex flex-col items-center opacity-80"><Bus size={24} /> <span className="text-[10px] mt-1">交通</span></div>
        <div className="flex flex-col items-center opacity-80"><ShoppingBag size={24} /> <span className="text-[10px] mt-1">生活</span></div>
        <div className="flex flex-col items-center opacity-80"><HeartPulse size={24} /> <span className="text-[10px] mt-1">醫療</span></div>
      </nav>
    </div>
  );
}
