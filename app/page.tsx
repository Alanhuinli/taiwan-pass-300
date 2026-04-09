"use client";

import React, { useState } from 'react';
import { Menu, Volume2, UtensilsCrossed, Bus, GraduationCap, ShoppingBag, ChevronRight, Construction } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- 台灣通 300 句資料倉庫 (目前已更新至 15 句) ---
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
  { id: 12, category: "生活", chinese: "我想辦手機門號。", pinyin: "Wǒ xiǎng bàn shǒujī ménhào", vietnamese: "Tôi muốn làm số điện thoại di động." },
  { id: 13, category: "飲食", chinese: "我不吃牛肉。", pinyin: "Wǒ bù chī niúròu", vietnamese: "Tôi không ăn thịt bò." },
  { id: 14, category: "生活", chinese: "可以用悠遊卡付錢嗎？", pinyin: "Kěyǐ yòng yōuyóukǎ fùqián ma?", vietnamese: "Có thể dùng thẻ EasyCard để trả tiền không?" },
  { id: 15, category: "校園", chinese: "請問辦公室在哪裡？", pinyin: "Qǐngwèn bàngōngshì zài nǎlǐ?", vietnamese: "Cho hỏi văn phòng ở đâu?" }
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<number | null>(null);

  // 動態發音功能
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
      {/* 頂部標題 */}
      <header className="bg-white p-6 shadow-sm text-center">
        <h1 className="text-3xl font-bold text-orange-600">台灣通 300 句</h1>
        <p className="text-gray-500 mt-2">專為越南學生設計的台灣生活必備實用短語 - 育達科技大學</p>
      </header>

      {/* 單字卡片列表 */}
      <main className="max-w-4xl mx-auto p-4 grid gap-6 md:grid-cols-2">
        {taiwan300Data.map((item) => (
          <Card key={item.id} className="overflow-hidden border-2 hover:border-orange-400 transition-colors shadow-lg">
            <CardHeader className="bg-orange-100 pb-2">
              <div className="flex justify-between items-center">
                <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {item.category}
                </span>
                <span className="text-gray-400 text-sm font-mono"># {item.id}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 text-center min-h-[180px] flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{item.chinese}</h2>
              <p className="text-sm text-orange-600 font-medium mb-4">{item.pinyin}</p>
              <p className="text-lg text-blue-700 italic border-t border-dashed border-gray-200 pt-4 px-2">
                "{item.vietnamese}"
              </p>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-center py-4 border-t">
              <Button 
                onClick={() => handlePlayAudio(item.chinese, item.id)}
                disabled={isLoading === item.id}
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-10 shadow-md transform active:scale-95 transition-transform"
              >
                {isLoading === item.id ? "⏳ 語音載入中..." : "🔊 播放台灣腔發音"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      {/* 底部導覽 (裝飾用) */}
      <nav className="fixed bottom-0 w-full bg-white border-t flex justify-around p-3 text-orange-600 z-50">
        <div className="flex flex-col items-center opacity-80"><UtensilsCrossed size={24} /> <span className="text-[10px] mt-1">飲食</span></div>
        <div className="flex flex-col items-center opacity-80"><Bus size={24} /> <span className="text-[10px] mt-1">交通</span></div>
        <div className="flex flex-col items-center opacity-80"><ShoppingBag size={24} /> <span className="text-[10px] mt-1">生活</span></div>
        <div className="flex flex-col items-center opacity-80"><GraduationCap size={24} /> <span className="text-[10px] mt-1">校園</span></div>
      </nav>
    </div>
  );
}
