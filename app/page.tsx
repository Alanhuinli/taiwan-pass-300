"use client";

import React, { useState } from 'react';
import { Menu, Volume2, UtensilsCrossed, Bus, GraduationCap, ShoppingBag, ChevronRight, Construction, HeartPulse, CreditCard, Landmark, Briefcase, LayoutGrid } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- 台灣通 300 句：育達科技大學專屬完整資料庫 ---
const taiwan300Data = [
  // 1-50 飲食與交通基礎
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
  // ... (中間省略 16-290 句，請主秘確保貼上時包含我之前提供的 150 句與 300 句完整內容)
  { id: 296, category: "校園", chinese: "校長，謝謝您對我們的照顧。", pinyin: "Xiàozhǎng, xièxie nín duì wǒmen de zhàogù", vietnamese: "Thưa Hiệu trưởng, cảm ơn sự quan tâm của thầy dành cho chúng em." },
  { id: 297, category: "校園", chinese: "我們在育達學到了很多知識。", pinyin: "Wǒmen zài Yùdá xuédàole hěnduō zhīshi", vietnamese: "Chúng em đã học được rất nhiều kiến thức tại Dục Đạt." },
  { id: 298, category: "社交", chinese: "祝大家學業進步，事事順心！", pinyin: "Zhù dàjiā xuéyè jìnbù", vietnamese: "Chúc mọi người học tập tiến bộ, mọi sự thuận lợi!" },
  { id: 299, category: "校園", chinese: "育達科大，我們愛你！", pinyin: "Yùdá kēdà, wǒmen ài nǐ!", vietnamese: "Đại học Dục Đạt, chúng em yêu trường!" },
  { id: 300, category: "生活", chinese: "台灣通三百句，完成！", pinyin: "Táiwān tōng sānbǎi jù, wánchéng!", vietnamese: "Taiwan Pass 300 câu, hoàn thành!" }
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  // 篩選邏輯
  const filteredData = selectedCategory === "全部" 
    ? taiwan300Data 
    : taiwan300Data.filter(item => item.category === selectedCategory);

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
    <div className="min-h-screen bg-orange-50 pb-28">
      <header className="bg-white p-8 shadow-sm text-center border-b-4 border-orange-500 sticky top-0 z-40">
        <h1 className="text-3xl font-extrabold text-orange-600 tracking-tight">台灣通 300 句</h1>
        <p className="text-gray-600 mt-2 font-medium">育達科技大學：{selectedCategory}篇</p>
      </header>

      <main className="max-w-5xl mx-auto p-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {filteredData.map((item) => (
          <Card key={item.id} className="overflow-hidden border-2 hover:border-orange-400 transition-all shadow-md hover:shadow-xl">
            <CardHeader className="bg-orange-50 pb-2 border-b">
              <div className="flex justify-between items-center">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase">{item.category}</span>
                <span className="text-gray-400 text-xs font-mono">#{item.id}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-6 text-center min-h-[200px] flex flex-col justify-center px-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-800 leading-tight">{item.chinese}</h2>
              <p className="text-xs text-orange-600 font-semibold mb-4 tracking-wide">{item.pinyin}</p>
              <p className="text-lg text-blue-800 italic font-medium bg-blue-50 py-3 rounded-lg border border-blue-100">"{item.vietnamese}"</p>
            </CardContent>
            <CardFooter className="bg-white flex justify-center py-5 border-t">
              <Button onClick={() => handlePlayAudio(item.chinese, item.id)} disabled={isLoading === item.id} className="bg-orange-600 hover:bg-orange-700 text-white rounded-full px-10 py-6 text-md shadow-lg transform active:scale-95 transition-all">
                {isLoading === item.id ? "⏳..." : "🔊 播放發音"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </main>

      {/* 分類導覽列 */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t-2 border-orange-100 flex justify-around p-4 text-gray-400 z-50 shadow-2xl">
        <NavItem icon={<LayoutGrid size={24} />} label="全部" active={selectedCategory === "全部"} onClick={() => setSelectedCategory("全部")} />
        <NavItem icon={<UtensilsCrossed size={24} />} label="飲食" active={selectedCategory === "飲食"} onClick={() => setSelectedCategory("飲食")} />
        <NavItem icon={<Bus size={24} />} label="交通" active={selectedCategory === "交通"} onClick={() => setSelectedCategory("交通")} />
        <NavItem icon={<Landmark size={24} />} label="銀行" active={selectedCategory === "銀行"} onClick={() => setSelectedCategory("銀行")} />
        <NavItem icon={<HeartPulse size={24} />} label="醫療" active={selectedCategory === "醫療"} onClick={() => setSelectedCategory("醫療")} />
        <NavItem icon={<Briefcase size={24} />} label="職場" active={selectedCategory === "職場"} onClick={() => setSelectedCategory("職場")} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center transition-all ${active ? "text-orange-600 scale-110" : "text-gray-400 hover:text-orange-300"}`}>
      {icon}
      <span className={`text-[10px] font-bold mt-1 ${active ? "opacity-100" : "opacity-70"}`}>{label}</span>
    </button>
  );
}
