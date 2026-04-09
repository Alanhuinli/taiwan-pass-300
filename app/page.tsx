"use client";

import React, { useState } from 'react';
import { Menu, Volume2, UtensilsCrossed, Bus, GraduationCap, ShoppingBag, ChevronRight, Construction, HeartPulse, CreditCard, Landmark, Briefcase } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- 台灣通 300 句：育達科技大學專屬完整資料庫 ---
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
  { id: 15, category: "校園", chinese: "請問辦公室在哪裡？", pinyin: "Qǐngwèn bàngōngshì zài nǎlǐ?", vietnamese: "Cho hỏi văn phòng ở đâu?" },
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
  { id: 51, category: "租屋", chinese: "我想在學校附近租房子。", pinyin: "Wǒ xiǎng zài xuéxiào fùjìn zū fángzi", vietnamese: "Em muốn thuê nhà ở gần trường." },
  { id: 52, category: "租屋", chinese: "每個月房租是多少錢？", pinyin: "Měi gè yuè fángzū shì duōshǎo qián?", vietnamese: "Tiền thuê nhà mỗi tháng là bao nhiêu?" },
  { id: 53, category: "租屋", chinese: "押金要付幾個月？", pinyin: "Yājīn yào fù jǐ gè yuè?", vietnamese: "Tiền đặt cọc phải trả mấy tháng?" },
  { id: 54, category: "租屋", chinese: "水電費怎麼計算？", pinyin: "Shuǐdiànfèi zěnme jìsuàn?", vietnamese: "Tiền điện nước tính như thế nào?" },
  { id: 55, category: "租屋", chinese: "這裡可以煮東西嗎？", pinyin: "Zhèlǐ kěyǐ zhǔ dōngxi ma?", vietnamese: "Ở đây có thể nấu ăn không?" },
  { id: 56, category: "租屋", chinese: "房間有網路和冷氣嗎？", pinyin: "Fángjiān yǒu wǎnglù hàn lěngqì ma?", vietnamese: "Phòng có internet và điều hòa không?" },
  { id: 57, category: "生活", chinese: "我想買棉被和枕頭。", pinyin: "Wǒ xiǎng mǎi miánbèi hàn zhěntóu", vietnamese: "Em muốn mua chăn và gối." },
  { id: 58, category: "生活", chinese: "哪裡可以倒垃圾？", pinyin: "Nǎlǐ kěyǐ dào lājī?", vietnamese: "Đổ rác ở đâu ạ?" },
  { id: 59, category: "生活", chinese: "這附近有全聯或家樂福嗎？", pinyin: "Zhè fùjìn yǒu Quánlián huò Jiālèfú ma?", vietnamese: "Gần đây có siêu thị PX Mart hay Carrefour không?" },
  { id: 60, category: "生活", chinese: "我要去郵局領包裹。", pinyin: "Wǒ yào qù yóujú lǐng bāoguǒ", vietnamese: "Tôi muốn đi bưu điện nhận bưu kiện." },
  { id: 61, category: "法律", chinese: "我的居留證快要過期了。", pinyin: "Wǒ de jūliúzhèng kuàiyào guòqīle", vietnamese: "Thẻ cư trú của em sắp hết hạn rồi." },
  { id: 62, category: "法律", chinese: "請問移民署在哪裡？", pinyin: "Qǐngwèn Yímínshǔ zài nǎlǐ?", vietnamese: "Cho hỏi Cục Di dân ở đâu?" },
  { id: 63, category: "法律", chinese: "辦居留證需要什麼資料？", pinyin: "Bàn jūliúzhèng xūyào shénme zīliào?", vietnamese: "Làm thẻ cư trú cần những giấy tờ gì?" },
  { id: 64, category: "法律", chinese: "我想申請更換工作許可證。", pinyin: "Wǒ xiǎng shēnqǐng gēnghuàn gōngzuò xǔkězhèng", vietnamese: "Em muốn xin đổi giấy phép lao động." },
  { id: 65, category: "法律", chinese: "在台灣騎機車要駕照嗎？", pinyin: "Zài Táiwān qí jīchē yào jiàzhào ma?", vietnamese: "Ở Đài Loan lái xe máy có cần bằng lái không?" },
  { id: 66, category: "緊急", chinese: "救命！有人受傷了。", pinyin: "Jiùmìng! Yǒurén shòushāngle", vietnamese: "Cứu với! Có người bị thương rồi." },
  { id: 67, category: "緊急", chinese: "我的錢包被偷了。", pinyin: "Wǒ de qiánbāo bèi tōule", vietnamese: "Ví tiền của tôi bị trộm rồi." },
  { id: 68, category: "緊急", chinese: "我要報警，電話是 110。", pinyin: "Wǒ yào bàojǐng", vietnamese: "Tôi muốn báo cảnh sát, điện thoại là 110." },
  { id: 69, category: "緊急", chinese: "失火了！快點叫消防車。", pinyin: "Shīhuǒle! Kuài diǎn jiào xiāofángchē", vietnamese: "Cháy rồi! Mau gọi xe cứu hỏa (119)." },
  { id: 70, category: "緊急", chinese: "我不小心迷路了。", pinyin: "Wǒ bù xiǎoxīn mílùle", vietnamese: "Tôi vô tình bị lạc đường rồi." },
  { id: 71, category: "飲食", chinese: "這道菜會辣嗎？", pinyin: "Zhè dào cài huì là ma?", vietnamese: "Món này có cay không?" },
  { id: 72, category: "飲食", chinese: "我不加香菜。", pinyin: "Wǒ bù jiā xiāngcài", vietnamese: "Tôi không cho rau mùi (ngò rí)." },
  { id: 73, category: "飲食", chinese: "我要滷肉飯和大腸蚵仔麵線。", pinyin: "Wǒ yào lǔròufàn hàn dàcháng ézǐ miànxiàn", vietnamese: "Tôi muốn cơm thịt kho và mì tuyến hàu lòng lợn." },
  { id: 74, category: "飲食", chinese: "請問有素食嗎？", pinyin: "Qǐngwèn yǒu sùshí ma?", vietnamese: "Cho hỏi có món chay không?" },
  { id: 75, category: "飲食", chinese: "可以給我一張統一發票嗎？", pinyin: "Kěyǐ gěi wǒ fāpiào ma?", vietnamese: "Có thể cho tôi hóa đơn không?" },
  { id: 76, category: "購物", chinese: "請問現在有打折嗎？", pinyin: "Qǐngwèn xiànzài yǒu dǎzhé ma?", vietnamese: "Cho hỏi bây giờ có giảm giá không?" },
  { id: 77, category: "購物", chinese: "買二送一嗎？", pinyin: "Mǎi èr sòng yī ma?", vietnamese: "Mua hai tặng một phải không?" },
  { id: 78, category: "購物", chinese: "這雙鞋子可以試穿嗎？", pinyin: "Zhè shuāng xiézi kěyǐ shìchuān ma?", vietnamese: "Đôi giày này có thể thử không?" },
  { id: 79, category: "購物", chinese: "這件衣服太大了，有小號的嗎？", pinyin: "Zhè jiàn yīfú tài dàle", vietnamese: "Cái áo này to quá, có size nhỏ hơn không?" },
  { id: 80, category: "購物", chinese: "我想退貨。", pinyin: "Wǒ xiǎng tuìhuò", vietnamese: "Tôi muốn trả lại hàng." },
  { id: 81, category: "校園", chinese: "導師辦公室在哪裡？", pinyin: "Dǎoshī bàngōngshì zài nǎlǐ?", vietnamese: "Văn phòng giáo viên chủ nhiệm ở đâu?" },
  { id: 82, category: "校園", chinese: "這門課要怎麼選？", pinyin: "Zhè mén kè yào zěnme xuǎn?", vietnamese: "Môn học này phải đăng ký như thế nào?" },
  { id: 83, category: "校園", chinese: "我想參加中文歌唱比賽。", pinyin: "Wǒ xiǎng cānjiā gēchàng bǐsài", vietnamese: "Em muốn tham gia cuộc thi hát tiếng Trung." },
  { id: 84, category: "校園", chinese: "請問成績單什麼時候出來？", pinyin: "Qǐngwèn chéngjīdān shénme shíhou chūlái?", vietnamese: "Cho hỏi khi nào có bảng điểm?" },
  { id: 85, category: "校園", chinese: "我需要辦理離校手續。", pinyin: "Wǒ xūyào bànlǐ líxiào shǒuxù", vietnamese: "Em cần làm thủ tục ra trường." },
  { id: 86, category: "生活", chinese: "我要去便利商店繳卡費。", pinyin: "Wǒ yào qù chāoshāng jiǎo kǎfèi", vietnamese: "Tôi ra cửa hàng tiện lợi nộp tiền thẻ." },
  { id: 87, category: "生活", chinese: "我想剪頭髮，這附近有理髮店嗎？", pinyin: "Wǒ xiǎng jiǎn tóufa", vietnamese: "Tôi muốn cắt tóc, gần đây có tiệm cắt tóc không?" },
  { id: 88, category: "生活", chinese: "這張悠遊卡壞了，不能用。", pinyin: "Zhè zhāng yōuyóukǎ huàile", vietnamese: "Thẻ EasyCard này hỏng rồi, không dùng được." },
  { id: 89, category: "生活", chinese: "請問這附近有公園嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu gōngyuán ma?", vietnamese: "Cho hỏi gần đây có công viên không?" },
  { id: 90, category: "生活", chinese: "我想辦電信公司的吃到飽方案。", pinyin: "Wǒ xiǎng bàn chīdàobǎo fāng'àn", vietnamese: "Tôi muốn đăng ký gói cước mạng không giới hạn." },
  { id: 91, category: "職場", chinese: "老闆，請問什麼時候領薪水？", pinyin: "Lǎobǎn, qǐngwèn shénme shíhou lǐng xīnshuǐ?", vietnamese: "Chủ quán ơi, cho hỏi khi nào nhận lương ạ?" },
  { id: 92, category: "職場", chinese: "我今天身體不舒服，想請假。", pinyin: "Wǒ jīntiān shēntǐ bù shūfú", vietnamese: "Hôm nay trong người không khỏe, tôi muốn xin nghỉ." },
  { id: 93, category: "職場", chinese: "這件事要怎麼做？請教教我。", pinyin: "Zhè jiàn shì yào zěnme zuò?", vietnamese: "Việc này làm như thế nào? Xin hãy dạy tôi." },
  { id: 94, category: "職場", chinese: "下班了，大家辛苦了！", pinyin: "Xià bān le, dàjiā xīnkǔle!", vietnamese: "Tan làm rồi, mọi người vất vả rồi!" },
  { id: 95, category: "職場", chinese: "請問有工作合約嗎？", pinyin: "Qǐngwèn yǒu gōngzuò héyuē ma?", vietnamese: "Cho hỏi có hợp đồng lao động không?" },
  { id: 96, category: "醫療", chinese: "我覺得喉嚨痛，有點發燒。", pinyin: "Wǒ juéde hóulóng tòng", vietnamese: "Tôi thấy đau họng, hơi sốt." },
  { id: 97, category: "醫療", chinese: "醫生，我對這種藥過敏。", pinyin: "Yīshēng, wǒ duì zhèzhǒng yào guòmǐn", vietnamese: "Bác sĩ, tôi bị dị ứng với loại thuốc này." },
  { id: 98, category: "醫療", chinese: "這藥要怎麼吃？一天幾次？", pinyin: "Zhè yào yào zěnme chī?", vietnamese: "Thuốc này uống như thế nào? Một ngày mấy lần?" },
  { id: 99, category: "醫療", chinese: "我要掛號看中醫。", pinyin: "Wǒ yào guàhào kàn zhōngyī", vietnamese: "Tôi muốn lấy số khám đông y." },
  { id: 100, category: "醫療", chinese: "請問健保卡要怎麼申請？", pinyin: "Qǐngwèn jiànbǎokǎ yào zěnme shēnqǐng?", vietnamese: "Cho hỏi làm thế nào để xin thẻ bảo hiểm y tế?" },
  { id: 101, category: "生活", chinese: "我想去KTV唱歌。", pinyin: "Wǒ xiǎng qù KTV chànggē", vietnamese: "Tôi muốn đi hát KTV." },
  { id: 102, category: "校園", chinese: "請問育達科技大學的校門口在哪？", pinyin: "Qǐngwèn Yùdá kējì dàxué de xiàoménkǒu zài nǎ?", vietnamese: "Cho hỏi cổng trường đại học Dục Đạt ở đâu?" },
  { id: 103, category: "校園", chinese: "苗栗的客家菜很有名。", pinyin: "Miáolì de Kèjiācài hěn yǒumíng", vietnamese: "Món ăn Khách Gia ở Miêu Lật rất nổi tiếng." },
  { id: 104, category: "交通", chinese: "我要去高鐵苗栗站。", pinyin: "Wǒ yào qù gāotiě Miáolì zhàn", vietnamese: "Tôi muốn đến ga tàu cao tốc Miêu Lật." },
  { id: 105, category: "生活", chinese: "這附近的氣候很悶熱。", pinyin: "Zhè fùjìn de qìhòu hěn mēnrè", vietnamese: "Khí hậu vùng này rất oi bức." },
  { id: 106, category: "生活", chinese: "我喜歡吃鹹酥雞。", pinyin: "Wǒ xǐhuān chī xiánsūjī", vietnamese: "Tôi thích ăn gà rán muối tiêu." },
  { id: 107, category: "生活", chinese: "請問附近有自助洗衣店嗎？", pinyin: "Qǐngwèn fùjìn yǒu zìzhù xǐyīdiàn ma?", vietnamese: "Cho hỏi gần đây có tiệm giặt tự động không?" },
  { id: 108, category: "社交", chinese: "很高興認識你！", pinyin: "Hěn gāoxìng rènshi nǐ!", vietnamese: "Rất vui được làm quen với bạn!" },
  { id: 109, category: "社交", chinese: "你有 LINE 或臉書嗎？", pinyin: "Nǐ yǒu LINE huò liǎnshū ma?", vietnamese: "Bạn có LINE hay Facebook không?" },
  { id: 110, category: "社交", chinese: "週末一起出去玩吧！", pinyin: "Zhōumò yīqǐ chūqù wán ba!", vietnamese: "Cuối tuần cùng đi chơi đi!" },
  { id: 111, category: "生活", chinese: "請問哪裡可以買到越南食品？", pinyin: "Qǐngwèn nǎlǐ kěyǐ mǎi dào Yuènán shípǐn?", vietnamese: "Cho hỏi ở đâu mua được thực phẩm Việt Nam?" },
  { id: 112, category: "醫療", chinese: "我牙齒痛，想看牙醫。", pinyin: "Wǒ yáchǐ tòng, xiǎng kàn yáyī", vietnamese: "Tôi bị đau răng, muốn đi khám nha sĩ." },
  { id: 113, category: "飲食", chinese: "我要一杯拿鐵，不加糖。", pinyin: "Wǒ yào yī bēi nátiě, bù jiātáng", vietnamese: "Cho tôi một ly latte, không đường." },
  { id: 114, category: "交通", chinese: "這班火車有停靠造橋站嗎？", pinyin: "Zhè bān huǒchē yǒu tíngkào Zàoqiáo zhàn ma?", vietnamese: "Chuyến tàu này có dừng ở ga Tạo Kiều không?" },
  { id: 115, category: "交通", chinese: "我想叫計程車。", pinyin: "Wǒ xiǎng jiào jìchéngchē", vietnamese: "Tôi muốn gọi xe taxi." },
  { id: 116, category: "生活", chinese: "明天天氣怎麼樣？", pinyin: "Míngtiān tiānqì zěnmeyàng?", vietnamese: "Thời tiết ngày mai thế nào?" },
  { id: 117, category: "生活", chinese: "聽說下週有颱風要來。", pinyin: "Tīngshuō xiàzhōu yǒu táifēng yào lái", vietnamese: "Nghe nói tuần sau có bão về." },
  { id: 118, category: "生活", chinese: "哪裡有圖書館可以讀書？", pinyin: "Nǎlǐ yǒu túshūguǎn kěyǐ dúshū?", vietnamese: "Ở đâu có thư viện để học bài?" },
  { id: 119, category: "校園", chinese: "我要去學務處申請文件。", pinyin: "Wǒ yào qù xuéwùchù shēnqǐng wénjiàn", vietnamese: "Em ra phòng công tác sinh viên xin giấy tờ." },
  { id: 120, category: "校園", chinese: "教務處在哪一棟樓？", pinyin: "Jiàowùchù zài nǎ yī dòng lóu?", vietnamese: "Phòng giáo vụ ở tòa nhà nào ạ?" },
  { id: 121, category: "校園", chinese: "這學期有什麼有趣的課程？", pinyin: "Zhè xuéqī yǒu shénme yǒuqù de kèchéng?", vietnamese: "Học kỳ này có môn học nào thú vị không?" },
  { id: 122, category: "校園", chinese: "我想找校長拍照。", pinyin: "Wǒ xiǎng zhǎo xiàozhǎng pāizhào", vietnamese: "Em muốn tìm Hiệu trưởng để chụp ảnh." },
  { id: 123, category: "法律", chinese: "工作證過期會被罰款嗎？", pinyin: "Gōngzuòzhèng guòqī huì bèi fákuǎn ma?", vietnamese: "Giấy phép lao động hết hạn có bị phạt không?" },
  { id: 124, category: "生活", chinese: "請問這台飲水機有熱水嗎？", pinyin: "Qǐngwèn zhè tái yǐnshuǐjī yǒu rèshuǐ ma?", vietnamese: "Cho hỏi máy lọc nước này có nước nóng không?" },
  { id: 125, category: "生活", chinese: "廁所在哪裡？", pinyin: "Cèsuǒ zài nǎlǐ?", vietnamese: "Nhà vệ sinh ở đâu ạ?" },
  { id: 126, category: "飲食", chinese: "這家店的牛肉麵很好吃。", pinyin: "Zhè jiā diàn de niúròumiàn hěn hǎochī", vietnamese: "Mì bò của quán này rất ngon." },
  { id: 127, category: "飲食", chinese: "可以幫我加熱嗎？", pinyin: "Kěyǐ bāng wǒ jiārè ma?", vietnamese: "Có thể hâm nóng giúp tôi không?" },
  { id: 128, category: "生活", chinese: "我想買口罩。", pinyin: "Wǒ xiǎng mǎi kǒuzhào", vietnamese: "Tôi muốn mua khẩu trang." },
  { id: 129, category: "校園", chinese: "請問操場在哪裡？", pinyin: "Qǐngwèn cāochǎng zài nǎlǐ?", vietnamese: "Cho hỏi sân vận động ở đâu?" },
  { id: 130, category: "校園", chinese: "我想報名校運會的跑步比賽。", pinyin: "Wǒ xiǎng bàomíng xiàoyùnhuì", vietnamese: "Em muốn đăng ký thi chạy trong hội thao trường." },
  { id: 131, category: "生活", chinese: "今天好像會下雨，要記得帶傘。", pinyin: "Jīntiān hǎoxiàng huì xiàyǔ", vietnamese: "Hôm nay hình như sẽ mưa, nhớ mang theo ô." },
  { id: 132, category: "生活", chinese: "我想去苗栗老街走走。", pinyin: "Wǒ xiǎng qù Miáolì lǎojiē zǒuzǒu", vietnamese: "Tôi muốn đi dạo phố cổ Miêu Lật." },
  { id: 133, category: "社交", chinese: "祝你生日快樂！", pinyin: "Zhù nǐ shēngrì kuàilè!", vietnamese: "Chúc bạn sinh nhật vui vẻ!" },
  { id: 134, category: "社交", chinese: "你可以教我說中文嗎？", pinyin: "Nǐ kěyǐ jiāo wǒ shuō Zhōngwén ma?", vietnamese: "Bạn có thể dạy tôi nói tiếng Trung không?" },
  { id: 135, category: "社交", chinese: "我也會教你說越南話。", pinyin: "Wǒ yě huì jiāo nǐ shuō Yuènánhuà", vietnamese: "Tôi cũng sẽ dạy bạn nói tiếng Việt." },
  { id: 136, category: "法律", chinese: "如果遇到法律問題，可以找誰幫忙？", pinyin: "Rúguǒ yùdào fǎlǜ wèntí", vietnamese: "Nếu gặp vấn đề pháp lý, có thể nhờ ai giúp đỡ?" },
  { id: 137, category: "生活", chinese: "這件衣服多少錢？有其他顏色嗎？", pinyin: "Zhè jiàn yīfú duōshǎo qián?", vietnamese: "Cái áo này bao nhiêu tiền? Có màu khác không?" },
  { id: 138, category: "生活", chinese: "這雙鞋太小了，我穿不下。", pinyin: "Zhè shuāng xié tài xiǎole", vietnamese: "Đôi giày này nhỏ quá, tôi đi không vừa." },
  { id: 139, category: "交通", chinese: "高鐵票可以在便利商店買嗎？", pinyin: "Gāotiěpiào kěyǐ zài chāoshāng mǎi ma?", vietnamese: "Vé tàu cao tốc có thể mua ở cửa hàng tiện lợi không?" },
  { id: 140, category: "交通", chinese: "我需要買一張火車票去台中。", pinyin: "Wǒ xūyào mǎi yī zhāng huǒchēpiào", vietnamese: "Tôi cần mua một vé tàu đi Đài Trung." },
  { id: 141, category: "校園", chinese: "請問學校的餐廳幾點開始營業？", pinyin: "Qǐngwèn xuéxiào cāntīng jǐ diǎn yíngyè?", vietnamese: "Cho hỏi căn tin trường mấy giờ bắt đầu bán?" },
  { id: 142, category: "校園", chinese: "我想在校園裡找一份工讀的工作。", pinyin: "Wǒ xiǎng zài xiàoyuán lǐ zhǎo gōngdú", vietnamese: "Em muốn tìm một công việc làm thêm ngay trong trường." },
  { id: 143, category: "校園", chinese: "這堂課的教室在哪一間？", pinyin: "Zhè táng kè de jiàoshì zài nǎ yī jiān?", vietnamese: "Phòng học của tiết này ở đâu ạ?" },
  { id: 144, category: "生活", chinese: "請問這附近有電影院嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu diànyǐngyuàn ma?", vietnamese: "Cho hỏi gần đây có rạp chiếu phim không?" },
  { id: 145, category: "飲食", chinese: "我要點一份炸雞排。", pinyin: "Wǒ yàodiǎn yī fèn zhájīpái", vietnamese: "Tôi muốn đặt một phần gà rán miếng lớn." },
  { id: 146, category: "飲食", chinese: "這裡可以刷卡還是只能付現金？", pinyin: "Zhèlǐ kěyǐ shuākǎ ma?", vietnamese: "Ở đây có thể quẹt thẻ hay chỉ trả tiền mặt?" },
  { id: 147, category: "生活", chinese: "我想買一支雨傘。", pinyin: "Wǒ xiǎng mǎi yī zhī yǔsǎn", vietnamese: "Tôi muốn mua một cây ô." },
  { id: 148, category: "校園", chinese: "下週有全校大掃除，大家要參加。", pinyin: "Xiàzhōu yǒu quánxiào dàsǎochú", vietnamese: "Tuần sau có tổng vệ sinh toàn trường, mọi người phải tham gia." },
  { id: 149, category: "法律", chinese: "護照遺失了要怎麼補辦？", pinyin: "Hùzhào yíshīle zěnme bǔbàn?", vietnamese: "Mất hộ chiếu thì phải làm lại như thế nào?" },
  { id: 150, category: "生活", chinese: "謝謝你的幫忙，辛苦了！", pinyin: "Xièxie nǐ de bāngmáng", vietnamese: "Cảm ơn sự giúp đỡ của bạn, bạn vất vả rồi!" },
  { id: 151, category: "生活", chinese: "這附近的治安好嗎？", pinyin: "Zhè fùjìn de zhì'ān hǎo ma?", vietnamese: "An ninh khu này có tốt không ạ?" },
  { id: 152, category: "生活", chinese: "我想買一個行動電源。", pinyin: "Wǒ xiǎng mǎi yīgè xíngdòng diànyuán", vietnamese: "Tôi muốn mua một cái sạc dự phòng." },
  { id: 153, category: "生活", chinese: "哪裡有文具店？", pinyin: "Nǎlǐ yǒu wénjùdiàn?", vietnamese: "Ở đâu có tiệm văn phòng phẩm?" },
  { id: 154, category: "生活", chinese: "我的手機螢幕裂開了，哪裡可以修？", pinyin: "Wǒ de shǒujī yíngmù lièkāile", vietnamese: "Màn hình điện thoại của tôi bị nứt rồi, sửa ở đâu được nhỉ?" },
  { id: 155, category: "生活", chinese: "我想去苗栗火車站。", pinyin: "Wǒ xiǎng qù Miáolì huǒchēzhàn", vietnamese: "Tôi muốn đi đến ga tàu hỏa Miêu Lật." },
  { id: 156, category: "生活", chinese: "請問這附近有健身房嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu jiànshēnfáng ma?", vietnamese: "Cho hỏi gần đây có phòng tập gym không?" },
  { id: 157, category: "社交", chinese: "你可以幫我拍張照嗎？", pinyin: "Nǐ kěyǐ bāng wǒ pāizhāngzhào ma?", vietnamese: "Bạn có thể chụp giúp tôi một kiểu ảnh không?" },
  { id: 158, category: "社交", chinese: "我們拍張合照吧！", pinyin: "Wǒmen pāizhāng hézhào ba!", vietnamese: "Chúng mình cùng chụp ảnh chung nhé!" },
  { id: 159, category: "生活", chinese: "這家超市幾點打烊？", pinyin: "Zhè jiā chāoshì jǐ diǎn dǎyáng?", vietnamese: "Siêu thị này mấy giờ đóng cửa?" },
  { id: 160, category: "生活", chinese: "我想買當地的特產送朋友。", pinyin: "Wǒ xiǎng mǎi tèchǎn sòng péngyǒu", vietnamese: "Tôi muốn mua đặc sản địa phương tặng bạn bè." },
  { id: 161, category: "職場", chinese: "老闆，這件工作我做完了。", pinyin: "Lǎobǎn, zhè jiàn gōngzuò wǒ zuòwánle", vietnamese: "Chủ quán ơi, việc này tôi làm xong rồi ạ." },
  { id: 162, category: "職場", chinese: "請問這裡有勞保和健保嗎？", pinyin: "Qǐngwèn zhèlǐ yǒu láobǎo hàn jiànbǎo ma?", vietnamese: "Cho hỏi ở đây có bảo hiểm lao động và bảo hiểm y tế không?" },
  { id: 163, category: "職場", chinese: "我需要領薪資單。", pinyin: "Wǒ xūyào lǐng xīnzīdān", vietnamese: "Tôi cần nhận phiếu lương." },
  { id: 164, category: "職場", chinese: "下個月我想調整排班。", pinyin: "Xià gè yuè wǒ xiǎng tiáozhěng páibān", vietnamese: "Tháng sau em muốn điều chỉnh lịch làm việc." },
  { id: 165, category: "法律", chinese: "我換了住址，要報備嗎？", pinyin: "Wǒ huànle zhùzhǐ", vietnamese: "Tôi thay đổi địa chỉ, có phải khai báo không?" },
  { id: 166, category: "法律", chinese: "請問遺失護照要先去警察局嗎？", pinyin: "Qǐngwèn yíshī hùzhào", vietnamese: "Cho hỏi mất hộ chiếu có phải ra đồn cảnh sát trước không?" },
  { id: 167, category: "生活", chinese: "哪裡有賣郵票？", pinyin: "Nǎlǐ yǒu mài yóupiào?", vietnamese: "Ở đâu có bán tem nhỉ?" },
  { id: 168, category: "生活", chinese: "我要寄掛號信回越南。", pinyin: "Wǒ yào jì guàhàoxìn huí Yuènán", vietnamese: "Tôi muốn gửi thư bảo đảm về Việt Nam." },
  { id: 169, category: "生活", chinese: "這包裹幾天會到？", pinyin: "Zhè bāoguǒ jǐ tiān huì dào?", vietnamese: "Bưu kiện này mấy ngày thì tới nơi?" },
  { id: 170, category: "飲食", chinese: "我要點一份炸豆腐和甜不辣。", pinyin: "Wǒ yào zhà dòufu hàn tiánbùlà", vietnamese: "Tôi muốn một phần đậu phụ rán và chả cá." },
  { id: 171, category: "校園", chinese: "期末考考完了，好輕鬆！", pinyin: "Qīmòkǎo kǎowánle, hǎo qīngsōng!", vietnamese: "Thi xong kỳ thi cuối kỳ rồi, thật nhẹ nhõm!" },
  { id: 172, category: "校園", chinese: "恭喜你畢業了！", pinyin: "Gōngxǐ nǐ bìyèle!", vietnamese: "Chúc mừng bạn đã tốt nghiệp!" },
  { id: 173, category: "校園", chinese: "我要參加校園博覽會。", pinyin: "Wǒ yào cānjiā xiàoyuán bólǎnhuì", vietnamese: "Em tham gia hội chợ triển lãm trong trường." },
  { id: 174, category: "生活", chinese: "這家早點店的飯糰很好吃。", pinyin: "Zhè jiā zǎodiǎndiàn de fàntuán hěn hǎochī", vietnamese: "Cơm nắm của quán ăn sáng này rất ngon." },
  { id: 175, category: "生活", chinese: "我想去逛大創(Daiso)。", pinyin: "Wǒ xiǎng qù guàng Dàchuàng", vietnamese: "Tôi muốn đi dạo cửa hàng Daiso." },
  { id: 176, category: "生活", chinese: "請問這附近有屈臣氏嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu Qūchénshì ma?", vietnamese: "Cho hỏi gần đây có Watsons không?" },
  { id: 177, category: "生活", chinese: "我想買這瓶化妝水。", pinyin: "Wǒ xiǎng mǎi zhè píng huàzhuāngshuǐ", vietnamese: "Tôi muốn mua chai nước hoa hồng này." },
  { id: 178, category: "醫療", chinese: "我有過敏性鼻炎。", pinyin: "Wǒ yǒu guòmǐnxìng bíyán", vietnamese: "Tôi bị viêm mũi dị ứng." },
  { id: 179, category: "醫療", chinese: "我皮膚過敏，很癢。", pinyin: "Wǒ pífū guòmǐn, hěn yǎng", vietnamese: "Da tôi bị dị ứng, rất ngứa." },
  { id: 180, category: "醫療", chinese: "這藥膏要怎麼擦？", pinyin: "Zhè yàogāo yào zěnme cā?", vietnamese: "Thuốc mỡ này bôi như thế nào?" },
  { id: 181, category: "生活", chinese: "今天天氣很濕冷。", pinyin: "Jīntiān tiānqì hěn shīlěng", vietnamese: "Thời tiết hôm nay rất ẩm và lạnh." },
  { id: 182, category: "生活", chinese: "除濕機要開著嗎？", pinyin: "Chúshījī yào kāizhe ma?", vietnamese: "Có phải bật máy hút ẩm không?" },
  { id: 183, category: "生活", chinese: "我想要洗衣服，有烘衣機嗎？", pinyin: "Wǒ xiǎng xǐ yīfu, yǒu hōngyījī ma?", vietnamese: "Tôi muốn giặt quần áo, có máy sấy không?" },
  { id: 184, category: "生活", chinese: "洗衣粉用完了，要去買。", pinyin: "Xǐyīfěn yòngwánle", vietnamese: "Bột giặt dùng hết rồi, phải đi mua thôi." },
  { id: 185, category: "交通", chinese: "請問客運站怎麼走？", pinyin: "Qǐngwèn kèyùnzhàn zěnme zǒu?", vietnamese: "Cho hỏi bến xe khách đi như thế nào?" },
  { id: 186, category: "交通", chinese: "我要買一張去新竹的票。", pinyin: "Wǒ yào mǎi yī zhāng qù Xīnzhú de piào", vietnamese: "Tôi muốn mua một vé đi Tân Trúc." },
  { id: 187, category: "交通", chinese: "車票多少錢？", pinyin: "Chēpiào duōshǎo qián?", vietnamese: "Vé xe bao nhiêu tiền ạ?" },
  { id: 188, category: "交通", chinese: "請問這班車還有位置嗎？", pinyin: "Qǐngwèn zhè bān chē hái yǒu wèizhi ma?", vietnamese: "Cho hỏi chuyến xe này còn chỗ không?" },
  { id: 189, category: "校園", chinese: "我今天不舒服，沒辦法去上課。", pinyin: "Wǒ jīntiān bù shūfú", vietnamese: "Hôm nay em không khỏe nên không thể đi học." },
  { id: 190, category: "校園", chinese: "我要去系辦找系秘。", pinyin: "Wǒ yào qù xìbàn zhǎo xìmì", vietnamese: "Em ra văn phòng khoa tìm thư ký khoa." },
  { id: 191, category: "生活", chinese: "這裡的環境很整潔。", pinyin: "Zhèlǐ de huánjìng hěn zhěngjié", vietnamese: "Môi trường ở đây rất sạch sẽ." },
  { id: 192, category: "生活", chinese: "大家要一起愛護校園環境。", pinyin: "Dàjiā yào yīqǐ àihù xiàoyuán huánjìng", vietnamese: "Mọi người cùng nhau giữ gìn môi trường trường học nhé." },
  { id: 193, category: "生活", chinese: "我想去誠品書店看書。", pinyin: "Wǒ xiǎng qù Chéngpǐn shūdiàn kànshū", vietnamese: "Tôi muốn đi nhà sách Eslite đọc sách." },
  { id: 194, category: "生活", chinese: "請問這附近有五金行嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu wǔjīnháng ma?", vietnamese: "Cho hỏi gần đây có cửa hàng kim khí không?" },
  { id: 195, category: "社交", chinese: "辛苦了！謝謝你的幫忙。", pinyin: "Xīnkǔle! Xièxie nǐ de bāngmáng", vietnamese: "Bạn vất vả rồi! Cảm ơn sự giúp đỡ của bạn." },
  { id: 196, category: "社交", chinese: "下次換我請你吃飯。", pinyin: "Xià cì huàn wǒ qǐng nǐ chīfàn", vietnamese: "Lần sau đến lượt tôi mời bạn đi ăn cơm nhé." },
  { id: 197, category: "生活", chinese: "今天天氣真好，適合出去玩。", pinyin: "Jīntiān tiānqì zhēn hǎo", vietnamese: "Thời tiết hôm nay thật tốt, thích hợp đi chơi." },
  { id: 198, category: "飲食", chinese: "我要一杯青草茶，去冰。", pinyin: "Wǒ yào yī bēi qīngcǎochá, qùbīng", vietnamese: "Cho tôi một ly trà thảo mộc, không đá." },
  { id: 199, category: "飲食", chinese: "這家店的小籠包很有名。", pinyin: "Zhè jiā diàn de xiǎolóngbāo hěn yǒumíng", vietnamese: "Tiểu long bao của quán này rất nổi tiếng." },
  { id: 200, category: "生活", chinese: "我要去剪頭髮，請問哪家理髮店好？", pinyin: "Wǒ yào qù jiǎn tóufa", vietnamese: "Tôi đi cắt tóc đây, cho hỏi tiệm cắt tóc nào tốt ạ?" },
  { id: 201, category: "校園", chinese: "育達科大的風景很優美。", pinyin: "Yùdá kēdà de fēngjǐng hěn yōuměi", vietnamese: "Phong cảnh đại học Dục Đạt rất ưu mỹ." },
  { id: 202, category: "校園", chinese: "我想參加苗栗的文化節活動。", pinyin: "Wǒ xiǎng cānjiā Miáolì de wénhuàjié", vietnamese: "Em muốn tham gia hoạt động lễ hội văn hóa Miêu Lật." },
  { id: 203, category: "校園", chinese: "這學期我要修三十個學分。", pinyin: "Zhè xuéqī wǒ yào xiū sānshí gè xuéfèn", vietnamese: "Học kỳ này em đăng ký 30 tín chỉ." },
  { id: 204, category: "生活", chinese: "我想買一雙襪子。", pinyin: "Wǒ xiǎng mǎi yī shuāng wàzi", vietnamese: "Tôi muốn mua một đôi tất." },
  { id: 205, category: "生活", chinese: "這附近有游泳池嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu yóuyǒngchí ma?", vietnamese: "Cho hỏi gần đây có hồ bơi không?" },
  { id: 206, category: "飲食", chinese: "我要一個紅豆餅。", pinyin: "Wǒ yào yīgè hóngdòubǐng", vietnamese: "Cho tôi một cái bánh đậu đỏ." },
  { id: 207, category: "飲食", chinese: "我不加辣，也不要香菜。", pinyin: "Wǒ bù jiā là, yě bùyào xiāngcài", vietnamese: "Tôi không cho cay, cũng không lấy rau mùi." },
  { id: 208, category: "交通", chinese: "捷運大安站怎麼轉車？", pinyin: "Jiéyùn Dà'ānzhàn zěnme zhuǎnchē?", vietnamese: "Ga tàu điện ngầm Đại An chuyển tàu như thế nào?" },
  { id: 209, category: "生活", chinese: "我想買一個大同電鍋。", pinyin: "Wǒ xiǎng mǎi yīgè Dàtóng diànguō", vietnamese: "Tôi muốn mua một cái nồi cơm điện Tatung." },
  { id: 210, category: "校園", chinese: "老師，這題我可以問一下嗎？", pinyin: "Lǎoshī, zhè tí wǒ kěyǐ wèn yīxià ma?", vietnamese: "Thầy ơi, câu này em có thể hỏi một chút không ạ?" },
  { id: 211, category: "生活", chinese: "我打算過年回越南看父母。", pinyin: "Wǒ dǎsuàn guònián huí Yuènán", vietnamese: "Em định Tết về Việt Nam thăm bố mẹ." },
  { id: 212, category: "生活", chinese: "機票已經訂好了。", pinyin: "Jīpiào yǐjīng dìng hǎole", vietnamese: "Vé máy bay đã đặt xong rồi." },
  { id: 213, category: "社交", chinese: "祝你一路順風！", pinyin: "Zhù nǐ yīlù shùnfēng!", vietnamese: "Chúc bạn thượng lộ bình an!" },
  { id: 214, category: "生活", chinese: "台灣的便利商店真的好方便。", pinyin: "Táiwān de chāoshāng zhēn de hǎo fāngbiàn", vietnamese: "Cửa hàng tiện lợi ở Đài Loan thật sự rất thuận tiện." },
  { id: 215, category: "生活", chinese: "我可以幫你拿東西嗎？", pinyin: "Wǒ kěyǐ bāng nǐ ná dōngxi ma?", vietnamese: "Tôi puede giúp bạn cầm đồ không?" },
  { id: 216, category: "飲食", chinese: "我要一份蚵仔煎。", pinyin: "Wǒ yào yī fèn ézǐjiān", vietnamese: "Cho tôi một phần hàu chiên trứng." },
  { id: 217, category: "生活", chinese: "我要去全家買拿鐵。", pinyin: "Wǒ yào qù Quánjiā mǎi nátiě", vietnamese: "Tôi ra Family Mart mua latte đây." },
  { id: 218, category: "生活", chinese: "我的電腦中毒了，開不了機。", pinyin: "Wǒ de diànnǎo zhòngdúle", vietnamese: "Máy tính của tôi bị nhiễm virus rồi, không khởi động được." },
  { id: 219, category: "生活", chinese: "請問這附近有印表機嗎？", pinyin: "Qǐngwèn zhè fùjìn yǒu yìnbiaojī ma?", vietnamese: "Cho hỏi gần đây có máy in không?" },
  { id: 220, category: "校園", chinese: "學務處通知大家要開會。", pinyin: "Xuéwùchù tōngzhī dàjiā yào kāihuì", vietnamese: "Phòng công tác sinh viên thông báo mọi người họp." },
  { id: 221, category: "校園", chinese: "我是育達科大的學生，請多指教。", pinyin: "Wǒ shì Yùdá kēdà de xuésheng", vietnamese: "Em là sinh viên đại học Dục Đạt, xin được chỉ giáo nhiều hơn." },
  { id: 222, category: "交通", chinese: "我要買定期票。", pinyin: "Wǒ yào mǎi dìngqīpiào", vietnamese: "Tôi muốn mua vé định kỳ." },
  { id: 223, category: "社交", chinese: "你說得太快了，我聽不懂。", pinyin: "Nǐ shuō de tài kuàile", vietnamese: "Bạn nói nhanh quá, tôi không hiểu." },
  { id: 224, category: "社交", chinese: "可以請你再說一遍嗎？", pinyin: "Qǐng nǐ zài shuō yībiàn ma?", vietnamese: "Có thể phiền bạn nói lại một lần nữa không?" },
  { id: 225, category: "飲食", chinese: "我要兩張電影票。", pinyin: "Wǒ yào liǎng zhāng diànyǐngpiào", vietnamese: "Tôi muốn hai vé xem phim." },
  { id: 226, category: "飲食", chinese: "我要中份爆米花，甜的。", pinyin: "Wǒ yào zhōng fèn bàomǐhuā, tián de", vietnamese: "Cho tôi bắp rang bơ cỡ vừa, vị ngọt." },
  { id: 227, category: "生活", chinese: "台灣的垃圾分類很細。", pinyin: "Táiwān de lājī fēnlèi hěn xì", vietnamese: "Phân loại rác ở Đài Loan rất chi tiết." },
  { id: 228, category: "生活", chinese: "要把紙盒攤平再回收。", pinyin: "Yào bǎ zhǐhé tānpíng zài huíshōu", vietnamese: "Phải ép phẳng vỏ hộp giấy rồi mới tái chế." },
  { id: 229, category: "生活", chinese: "資源回收車什麼時候來？", pinyin: "Zīyuán huíshōuchē shénme shíhou lái?", vietnamese: "Xe thu gom rác tái chế mấy giờ đến?" },
  { id: 230, category: "生活", chinese: "這件外套很暖和。", pinyin: "Zhè jiàn wàitào hěn nuǎnhuo", vietnamese: "Cái áo khoác này rất ấm áp." },
  { id: 231, category: "生活", chinese: "我想買一雙手套。", pinyin: "Wǒ xiǎng mǎi yī shuāng shǒutào", vietnamese: "Tôi muốn mua một đôi găng tay." },
  { id: 232, category: "交通", chinese: "今天路上塞車很嚴重。", pinyin: "Jīntiān lùshàng sāichē hěn yánzhòng", vietnamese: "Hôm nay đường tắc rất nghiêm trọng." },
  { id: 233, category: "交通", chinese: "我遲到了，不好意思。", pinyin: "Wǒ chídàole, bù hǎoyìsi", vietnamese: "Tôi đến muộn rồi, xin lỗi ạ." },
  { id: 234, category: "生活", chinese: "這家豆花店很有名，要排隊。", pinyin: "Zhè jiā dòuhuādiàn hěn yǒumíng", vietnamese: "Quán tào phớ này rất nổi tiếng, phải xếp hàng." },
  { id: 235, category: "生活", chinese: "請幫我裝袋子。", pinyin: "Qǐng bāng wǒ zhuāng dàizi", vietnamese: "Làm ơn cho vào túi giúp tôi." },
  { id: 236, category: "生活", chinese: "不需要吸管，謝謝。", pinyin: "Bù xūyào xīguǎn, xièxie", vietnamese: "Không cần ống hút đâu, cảm ơn." },
  { id: 237, category: "醫療", chinese: "我需要量體溫。", pinyin: "Wǒ xūyào liáng tǐwēn", vietnamese: "Tôi cần đo nhiệt độ cơ thể." },
  { id: 238, category: "醫療", chinese: "這裡可以預約打疫苗嗎？", pinyin: "Zhèlǐ kěyǐ yùyuē dǎ yìmiáo ma?", vietnamese: "Ở đây có thể hẹn tiêm vắc xin không?" },
  { id: 239, category: "生活", chinese: "我要去便利商店寄快遞。", pinyin: "Wǒ yào qù chāoshāng jì kuàidì", vietnamese: "Tôi ra cửa hàng tiện lợi gửi chuyển phát nhanh." },
  { id: 240, category: "生活", chinese: "運費是多少錢？", pinyin: "Yùnfèi shì duōshǎo qián?", vietnamese: "Phí vận chuyển là bao nhiêu tiền?" },
  { id: 241, category: "校園", chinese: "期中報告要準備好了嗎？", pinyin: "Qīzhōng bàogào yào zhǔnbèi hǎole ma?", vietnamese: "Báo cáo giữa kỳ đã chuẩn bị xong chưa?" },
  { id: 242, category: "校園", chinese: "我們這組下週要上台報告。", pinyin: "Wǒmen zhè zǔ xiàzhōu yào shàngtái bàogào", vietnamese: "Nhóm chúng mình tuần sau phải lên thuyết trình." },
  { id: 243, category: "校園", chinese: "投影片做好了嗎？", pinyin: "Tóuyǐngpiàn zuò hǎole ma?", vietnamese: "Slide thuyết trình làm xong chưa?" },
  { id: 244, category: "法律", chinese: "我要補辦全民健保卡。", pinyin: "Wǒ yào bǔbàn quánmín jiànbǎokǎ", vietnamese: "Em muốn làm lại thẻ bảo hiểm y tế toàn dân." },
  { id: 245, category: "法律", chinese: "身分證明文件要帶哪些？", pinyin: "Shēnfèn zhèngmíng wénjiàn", vietnamese: "Cần mang theo những giấy tờ chứng minh nhân thân nào?" },
  { id: 246, category: "生活", chinese: "我想換手機外殼。", pinyin: "Wǒ xiǎng huàn shǒujī wàiké", vietnamese: "Tôi muốn thay ốp điện thoại." },
  { id: 247, category: "生活", chinese: "哪裡有賣運動鞋？", pinyin: "Nǎlǐ yǒu mài yùndòngxié?", vietnamese: "Ở đâu có bán giày thể thao nhỉ?" },
  { id: 248, category: "生活", chinese: "這件衣服打八折後是多少錢？", pinyin: "Zhè jiàn yīfu dǎ bāzhé hòu", vietnamese: "Cái áo này sau khi giảm giá 20% là bao nhiêu tiền?" },
  { id: 249, category: "社交", chinese: "不用客氣，大家都是好朋友。", pinyin: "Bùyòng kèqi", vietnamese: "Đừng khách sáo, mọi người đều là bạn tốt mà." },
  { id: 250, category: "社交", chinese: "有空來我宿舍玩！", pinyin: "Yǒukòng lái wǒ sùshè wán!", vietnamese: "Khi nào rảnh qua ký túc xá mình chơi nhé!" },
  { id: 251, category: "生活", chinese: "台灣的捷運非常準時。", pinyin: "Táiwān de jiéyùn fēicháng zhǔnshí", vietnamese: "Tàu điện ngầm ở Đài Loan rất đúng giờ." },
  { id: 252, category: "生活", chinese: "我想去台北101看風景。", pinyin: "Wǒ xiǎng qù Táiběi 101 kàn fēngjǐng", vietnamese: "Tôi muốn đến Taipei 101 ngắm cảnh." },
  { id: 253, category: "生活", chinese: "跨年夜要去哪裡看煙火？", pinyin: "Kuàniányè yào qù nǎlǐ kàn yānhuǒ?", vietnamese: "Đêm giao thừa đi đâu xem pháo hoa nhỉ?" },
  { id: 254, category: "交通", chinese: "我要搭客運去桃園機場。", pinyin: "Wǒ yào dā kèyùn qù Táoyuán jīchǎng", vietnamese: "Tôi muốn đi xe khách ra sân bay Đào Viên." },
  { id: 255, category: "交通", chinese: "請問這班車會到第一航廈嗎？", pinyin: "Qǐngwèn zhè bān chē huì dào dì yī hángxià ma?", vietnamese: "Cho hỏi chuyến xe này có đến nhà ga số 1 không?" },
  { id: 256, category: "飲食", chinese: "我要一個雞肉飯便當，飯少一點。", pinyin: "Wǒ yào yīgè jīròufàn biàndāng", vietnamese: "Cho tôi một hộp cơm gà, ít cơm thôi." },
  { id: 257, category: "飲食", chinese: "這家店的滷味很有名。", pinyin: "Zhè jiā diàn de lǔwèi hěn yǒumíng", vietnamese: "Món kho của quán này rất nổi tiếng." },
  { id: 258, category: "生活", chinese: "我要去全聯買鮮奶。", pinyin: "Wǒ yào qù Quánlián mǎi xiānnǎi", vietnamese: "Tôi đi PX Mart mua sữa tươi đây." },
  { id: 259, category: "生活", chinese: "這張發票中獎了兩百塊！", pinyin: "Zhè zhāng fāpiào zhòngjiǎngle liǎngbǎi kuài", vietnamese: "Tờ hóa đơn này trúng thưởng 200 tệ này!" },
  { id: 260, category: "生活", chinese: "哪裡可以兌換發票獎金？", pinyin: "Nǎlǐ kěyǐ duìhuàn fāpiào jiǎngjīn?", vietnamese: "Đổi tiền thưởng hóa đơn ở đâu ạ?" },
  { id: 261, category: "生活", chinese: "我想買一支自動鉛筆。", pinyin: "Wǒ xiǎng mǎi yī zhī zìdòng qiānbǐ", vietnamese: "Tôi muốn mua một cây bút chì kim." },
  { id: 262, category: "生活", chinese: "這附近有書局嗎？", pinyin: "Zhè fùjìn yǒu shūjú ma?", vietnamese: "Gần đây có hiệu sách không?" },
  { id: 263, category: "生活", chinese: "我要印這份檔案。", pinyin: "Wǒ yào yìn zhè fèn dàng'àn", vietnamese: "Tôi muốn in tài liệu này." },
  { id: 264, category: "生活", chinese: "這張照片要洗出來。", pinyin: "Zhè zhāng zhàopiàn yào xǐ chūlái", vietnamese: "Bức ảnh này cần phải rửa ra." },
  { id: 265, category: "醫療", chinese: "我需要買止痛藥。", pinyin: "Wǒ xūyào mǎi zhǐtòngyào", vietnamese: "Tôi cần mua thuốc giảm đau." },
  { id: 266, category: "醫療", chinese: "我有健保，請問費用是多少？", pinyin: "Wǒ yǒu jiànbǎo, qǐngwèn fèiyòng shì duōshǎo?", vietnamese: "Tôi có bảo hiểm y tế, cho hỏi chi phí là bao nhiêu?" },
  { id: 267, category: "生活", chinese: "我想去苗栗客家文化館。", pinyin: "Wǒ xiǎng qù Miáolì Kèjiā wénhuàguǎn", vietnamese: "Tôi muốn đến Bảo tàng Văn hóa Khách Gia Miêu Lật." },
  { id: 268, category: "生活", chinese: "這道菜的味道很道地。", pinyin: "Zhè dào cài de wèidào hěn dàodì", vietnamese: "Hương vị món này rất chuẩn vị." },
  { id: 269, category: "生活", chinese: "我喜歡喝木瓜牛奶。", pinyin: "Wǒ xǐhuān hē mùguā niúnǎi", vietnamese: "Tôi thích uống sữa đu đủ." },
  { id: 270, category: "生活", chinese: "台灣的夏天雨水很多。", pinyin: "Táiwān de xiàtiān yǔshuǐ hěn duō", vietnamese: "Mùa hè ở Đài Loan mưa rất nhiều." },
  { id: 271, category: "校園", chinese: "圖書館的冷氣好強，要穿外套。", pinyin: "Túshūguǎn de lěngqì hǎo qiáng", vietnamese: "Điều hòa ở thư viện mạnh quá, phải mặc áo khoác." },
  { id: 272, category: "校園", chinese: "這學期的選修課我都選好了。", pinyin: "Zhè xuéqī de xuǎnxiūkè wǒ dōu xuǎnhǎole", vietnamese: "Các môn tự chọn học kỳ này em đã đăng ký xong cả rồi." },
  { id: 273, category: "校園", chinese: "我要去諮商中心預約。", pinyin: "Wǒ yào qù zīshāng zhōngxīn yùyuē", vietnamese: "Em ra trung tâm tư vấn hẹn lịch." },
  { id: 274, category: "法律", chinese: "護照過期了，要去領事事務局換發。", pinyin: "Hùzhào guòqīle", vietnamese: "Hộ chiếu hết hạn rồi, phải ra Cục Lãnh sự để đổi mới." },
  { id: 275, category: "生活", chinese: "請問這台提款機可以跨行轉帳嗎？", pinyin: "Qǐngwèn zhè tái tíkuǎnjī kěyǐ kuàháng zhuǎnzhàng ma?", vietnamese: "Cho hỏi máy ATM này có thể chuyển khoản liên ngân hàng không?" },
  { id: 276, category: "生活", chinese: "手續費要多少錢？", pinyin: "Shǒuxùfèi yào duōshǎo qián?", vietnamese: "Phí giao dịch là bao nhiêu tiền?" },
  { id: 277, category: "生活", chinese: "我要領十萬塊現金。", pinyin: "Wǒ yào lǐng shíwàn kuài xiànjīn", vietnamese: "Tôi muốn rút 100 nghìn tiền mặt." },
  { id: 278, category: "生活", chinese: "這家店的價格很公道。", pinyin: "Zhè jiā diàn de jiàgé hěn gōngdào", vietnamese: "Giá cả của cửa hàng này rất hợp lý." },
  { id: 279, category: "生活", chinese: "我打算買一台二手機車。", pinyin: "Wǒ dǎsuàn mǎi yī tái èrshǒu jīchē", vietnamese: "Tôi định mua một chiếc xe máy cũ." },
  { id: 280, category: "生活", chinese: "機車要定期換機油。", pinyin: "Jīchē yào dìngqī huàn jīyóu", vietnamese: "Xe máy phải thay dầu máy định kỳ." },
  { id: 281, category: "交通", chinese: "這附近哪裡有加油站？", pinyin: "Zhè fùjìn nǎlǐ yǒu jiāyóuzhàn?", vietnamese: "Gần đây có trạm xăng không?" },
  { id: 282, category: "交通", chinese: "我要加九五，加滿，謝謝。", pinyin: "Wǒ yào jiā jiǔwǔ, jiāmǎn", vietnamese: "Cho tôi đổ xăng 95, đổ đầy, cảm ơn." },
  { id: 283, category: "生活", chinese: "這週末我們去淡水逛逛吧。", pinyin: "Zhè zhōumò wǒmen qù Dànshuǐ guàngguàng ba", vietnamese: "Cuối tuần này chúng mình đi dạo Đạm Thủy đi." },
  { id: 284, category: "生活", chinese: "我想吃淡水的阿給和魚酥。", pinyin: "Wǒ xiǎng chī Dànshuǐ de Ā-gěi hàn yúsū", vietnamese: "Tôi muốn ăn đậu phụ nhồi và chả cá chiên Đạm Thủy." },
  { id: 285, category: "生活", chinese: "這附近有全家便利商店嗎？", pinyin: "Zhè fùjìn yǒu Quánjiā biànlì shāngdiàn ma?", vietnamese: "Gần đây có cửa hàng Family Mart không?" },
  { id: 286, category: "社交", chinese: "這張照片拍得真好看，可以傳給我嗎？", pinyin: "Zhè zhāng zhàopiàn pāi de zhēn hǎokàn", vietnamese: "Bức ảnh này chụp đẹp quá, có thể gửi cho tôi không?" },
  { id: 287, category: "社交", chinese: "你的越南文說得越來越好了！", pinyin: "Nǐ de Yuènánwén shuō de yuèláiyuè hǎole!", vietnamese: "Tiếng Việt của bạn nói ngày càng tốt hơn rồi!" },
  { id: 288, category: "生活", chinese: "今天天氣很涼爽，適合散步。", pinyin: "Jīntiān tiānqì hěn liángshuǎng", vietnamese: "Thời tiết hôm nay rất mát mẻ, hợp đi dạo." },
  { id: 289, category: "飲食", chinese: "我要點一份蛋餅和冰奶茶。", pinyin: "Wǒ yào diǎn yī fèn dànbǐng hàn bīng nǎichá", vietnamese: "Cho tôi đặt một phần bánh trứng chiên và trà sữa đá." },
  { id: 290, category: "飲食", chinese: "這家豆漿店二十四小時營業。", pinyin: "Zhè jiā dòujiāngdiàn èrshísì xiǎoshí yíngyè", vietnamese: "Quán sữa đậu nành này mở cửa 24 giờ." },
  { id: 291, category: "生活", chinese: "我想買一雙拖鞋。", pinyin: "Wǒ xiǎng mǎi yī shuāng tuōxié", vietnamese: "Tôi muốn mua một đôi dép lê." },
  { id: 292, category: "生活", chinese: "哪裡有大創百貨？", pinyin: "Nǎlǐ yǒu Dàchuàng bǎihuò?", vietnamese: "Ở đâu có bách hóa Daiso?" },
  { id: 293, category: "生活", chinese: "我要買這個指甲油。", pinyin: "Wǒ yào mǎi zhège zhǐjiǎyóu", vietnamese: "Tôi muốn mua lọ sơn móng tay này." },
  { id: 294, category: "生活", chinese: "這附近有大創嗎？", pinyin: "Zhè fùjìn yǒu Dàchuàng ma?", vietnamese: "Gần đây có Daiso không?" },
  { id: 295, category: "生活", chinese: "我要買一本筆記本。", pinyin: "Wǒ yào mǎi yī běn bǐjìběn", vietnamese: "Tôi muốn mua một cuốn sổ ghi chép." },
  { id: 296, category: "校園", chinese: "校長，謝謝您對我們的照顧。", pinyin: "Xiàozhǎng, xièxie nín duì wǒmen de zhàogù", vietnamese: "Thưa Hiệu trưởng, cảm ơn sự quan tâm của thầy dành cho chúng em." },
  { id: 297, category: "校園", chinese: "我們在育達學到了很多知識。", pinyin: "Wǒmen zài Yùdá xuédàole hěnduō zhīshi", vietnamese: "Chúng em đã học được rất nhiều kiến thức tại Dục Đạt." },
  { id: 298, category: "社交", chinese: "祝大家學業進步，事事順心！", pinyin: "Zhù dàjiā xuéyè jìnbù", vietnamese: "Chúc mọi người học tập tiến bộ, mọi sự thuận lợi!" },
  { id: 299, category: "校園", chinese: "育達科大，我們愛你！", pinyin: "Yùdá kēdà, wǒmen ài nǐ!", vietnamese: "Đại học Dục Đạt, chúng em yêu trường!" },
  { id: 300, category: "生活", chinese: "台灣通三百句，完成！", pinyin: "Táiwān tōng sānbǎi jù, wánchéng!", vietnamese: "Taiwan Pass 300 câu, hoàn thành!" }
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
