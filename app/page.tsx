"use client";

import React, { useState } from 'react';
import { Menu, Volume2, UtensilsCrossed, Bus, GraduationCap, ShoppingBag, ChevronRight, Construction, HeartPulse, Landmark, Briefcase, LayoutGrid, Users, ShieldAlert } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// --- 台灣通 300 句資料倉庫 (第一部分：1-150 句) ---
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
  { id: 51, category: "生活", chinese: "我想在學校附近租房子。", pinyin: "Wǒ xiǎng zài xuéxiào fùjìn zū fángzi", vietnamese: "Em muốn thuê nhà ở gần trường." },
  { id: 52, category: "生活", chinese: "每個月房租是多少錢？", pinyin: "Měi gè yuè fángzū shì duōshǎo qián?", vietnamese: "Tiền thuê nhà mỗi tháng là bao nhiêu?" },
  { id: 53, category: "生活", chinese: "押金要付幾個月？", pinyin: "Yājīn yào fù jǐ gè yuè?", vietnamese: "Tiền đặt cọc phải trả mấy tháng?" },
  { id: 54, category: "生活", chinese: "水電費怎麼計算？", pinyin: "Shuǐdiànfèi zěnme jìsuàn?", vietnamese: "Tiền điện nước tính như thế nào?" },
  { id: 55, category: "生活", chinese: "這裡可以煮東西嗎？", pinyin: "Zhèlǐ kěyǐ zhǔ dōngxi ma?", vietnamese: "Ở đây có thể nấu ăn không?" },
  { id: 56, category: "生活", chinese: "房間有網路和冷氣嗎？", pinyin: "Fángjiān yǒu wǎnglù hàn lěngqì ma?", vietnamese: "Phòng có internet và điều hòa không?" },
  { id: 57, category: "生活", chinese: "我想買棉被和枕頭。", pinyin: "Wǒ xiǎng mǎi miánbèi hàn zhěntóu", vietnamese: "Em muốn mua chăn và gối." },
  { id: 58, category: "生活", chinese: "哪裡可以倒垃圾？", pinyin: "Nǎlǐ kěyǐ dào lājī?", vietnamese: "Đổ rác ở đâu ạ?" },
  { id: 59, category: "生活", chinese: "這附近有全聯或家樂福嗎？", pinyin: "Zhè fùjìn yǒu Quánlián huò Jiālèfú ma?", vietnamese: "Gần đây có siêu thị PX Mart hay Carrefour không?" },
  { id: 60, category: "生活", chinese: "我要去郵局領包裹。", pinyin: "Wǒ yào qù yóujú lǐng bāoguǒ", vietnamese: "Tôi muốn đi bưu điện nhận bưu kiện." },
  { id: 61, category: "生活", chinese: "我的居留證快要過期了。", pinyin: "Wǒ de jūliúzhèng kuàiyào guòqīle", vietnamese: "Thẻ cư trú của em sắp hết hạn rồi." },
  { id: 62, category: "生活", chinese: "請問移民署在哪裡？", pinyin: "Qǐngwèn Yímínshǔ zài nǎlǐ?", vietnamese: "Cho hỏi Cục Di dân ở đâu?" },
  { id: 63, category: "生活", chinese: "辦居留證需要什麼資料？", pinyin: "Bàn jūliúzhèng xūyào shénme zīliào?", vietnamese: "Làm thẻ cư trú cần những giấy tờ gì?" },
  { id: 64, category: "生活", chinese: "我想申請更換工作許可證。", pinyin: "Wǒ xiǎng shēnqǐng gēnghuàn gōngzuò xǔkězhèng", vietnamese: "Em muốn xin đổi giấy phép lao động." },
  { id: 65, category: "生活", chinese: "在台灣騎機車要駕照嗎？", pinyin: "Zài Táiwān qí jīchē yào jiàzhào ma?", vietnamese: "Ở Đài Loan lái xe máy có cần bằng lái không?" },
  { id: 66, category: "生活", chinese: "救命！有人受傷了。", pinyin: "Jiùmìng! Yǒurén shòushāngle", vietnamese: "Cứu với! Có người bị thương rồi." },
  { id: 67, category: "生活", chinese: "我的錢包被偷了。", pinyin: "Wǒ de qiánbāo bèi tōule", vietnamese: "Ví tiền của tôi bị trộm rồi." },
  { id: 68, category: "生活", chinese: "我要報警，電話是 110。", pinyin: "Wǒ yào bàojǐng", vietnamese: "Tôi muốn báo cảnh sát, điện thoại là 110." },
  { id: 69, category: "生活", chinese: "失火了！快點叫消防車。", pinyin: "Shīhuǒle! Kuài diǎn jiào xiāofángchē", vietnamese: "Cháy rồi! Mau gọi xe cứu hỏa (119)." },
  { id: 70, category: "生活", chinese: "我不小心迷路了。", pinyin: "Wǒ bù xiǎoxīn mílùle", vietnamese: "Tôi vô tình bị lạc đường rồi." },
  { id: 71, category: "飲食", chinese: "這道菜會辣嗎？", pinyin: "Zhè dào cài huì là ma?", vietnamese: "Món này có cay không?" },
  { id: 72, category: "飲食", chinese: "我不加香菜。", pinyin: "Wǒ bù jiā xiāngcài", vietnamese: "Tôi không cho rau mùi (ngò rí)." },
  { id: 73, category: "飲食", chinese: "我要滷肉飯和大腸蚵仔麵線。", pinyin: "Wǒ yào lǔròufàn hàn dàcháng ézǐ miànxiàn", vietnamese: "Tôi muốn cơm thịt kho và mì tuyến hàu lòng lợn." },
  { id: 74, category: "飲食", chinese: "請問有素食嗎？", pinyin: "Qǐngwèn yǒu sùshí ma?", vietnamese: "Cho hỏi có món chay không?" },
  { id: 75, category: "飲食", chinese: "可以給我一張統一發票嗎？", pinyin: "Kěyǐ gěi wǒ fāpiào ma?", vietnamese: "Có thể cho tôi hóa đơn không?" },
  { id: 76, category: "生活", chinese: "請問現在有打折嗎？", pinyin: "Qǐngwèn xiànzài yǒu dǎzhé ma?", vietnamese: "Cho hỏi bây giờ có giảm giá không?" },
  { id: 77, category: "生活", chinese: "買二送一嗎？", pinyin: "Mǎi èr sòng yī ma?", vietnamese: "Mua hai tặng một phải không?" },
  { id: 78, category: "生活", chinese: "這雙鞋子可以試穿嗎？", pinyin: "Zhè shuāng xiézi kěyǐ shìchuān ma?", vietnamese: "Đôi giày này có thể thử không?" },
  { id: 79, category: "生活", chinese: "這件衣服太大了，有小號的嗎？", pinyin: "Zhè jiàn yīfú tài dàle", vietnamese: "Cái áo này to quá, có size nhỏ hơn không?" },
  { id: 80, category: "生活", chinese: "我想退貨。", pinyin: "Wǒ xiǎng tuìhuò", vietnamese: "Tôi muốn trả lại hàng." },
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
  { id: 108, category: "社交", chinese: "很高興認識你！", pinyin: "Hěn gāoxìng rènshi nǐ!", vietnamese: "Rất vui được làm quen with bạn!" },
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
  { id: 123, category: "生活", chinese: "工作證過期會被罰款嗎？", pinyin: "Gōngzuòzhèng guòqī huì bèi fákuǎn ma?", vietnamese: "Giấy phép lao động hết hạn có bị phạt không?" },
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
  { id: 136, category: "生活", chinese: "如果遇到法律問題，可以找誰幫忙？", pinyin: "Rúguǒ yùdào fǎlǜ wèntí", vietnamese: "Nếu gặp vấn đề pháp lý, có thể nhờ ai giúp đỡ?" },
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
  { id: 149, category: "生活", chinese: "護照遺失了要怎麼補辦？", pinyin: "Hùzhào yíshīle zěnme bǔbàn?", vietnamese: "Mất hộ chiếu thì phải làm lại như thế nào?" },
  { id: 150, category: "生活", chinese: "謝謝你的幫忙，辛苦了！", pinyin: "Xièxie nǐ de bāngmáng", vietnamese: "Cảm ơn sự giúp đỡ của bạn, bạn vất vả rồi!" },
  // --- 接下來請在下方貼上 151-300 句 ---
];

export default function HomePage() {
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("全部");

  // 篩選邏輯：支援多種分類
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

      <footer className="bg-gray-800 text-white p-10 mt-20 text-center">
        <p className="text-lg font-bold">育達科技大學 Yu Da University of Science and Technology</p>
        <p className="text-gray-400 mt-2">© 2026 台灣通 300 句數位平台</p>
      </footer>

      {/* 修正後的導覽列：包含全部、飲食、交通、生活、校園、職場、醫療、銀行 */}
      <nav className="fixed bottom-0 w-full bg-white/95 backdrop-blur-md border-t-2 border-orange-100 flex justify-around p-4 text-gray-400 z-50 shadow-2xl overflow-x-auto">
        <NavItem icon={<LayoutGrid size={24} />} label="全部" active={selectedCategory === "全部"} onClick={() => setSelectedCategory("全部")} />
        <NavItem icon={<UtensilsCrossed size={24} />} label="飲食" active={selectedCategory === "飲食"} onClick={() => setSelectedCategory("飲食")} />
        <NavItem icon={<Bus size={24} />} label="交通" active={selectedCategory === "交通"} onClick={() => setSelectedCategory("交通")} />
        <NavItem icon={<ShoppingBag size={24} />} label="生活" active={selectedCategory === "生活"} onClick={() => setSelectedCategory("生活")} />
        <NavItem icon={<GraduationCap size={24} />} label="校園" active={selectedCategory === "校園"} onClick={() => setSelectedCategory("校園")} />
        <NavItem icon={<Briefcase size={24} />} label="職場" active={selectedCategory === "職場"} onClick={() => setSelectedCategory("職場")} />
        <NavItem icon={<HeartPulse size={24} />} label="醫療" active={selectedCategory === "醫療"} onClick={() => setSelectedCategory("醫療")} />
        <NavItem icon={<Landmark size={24} />} label="銀行" active={selectedCategory === "銀行"} onClick={() => setSelectedCategory("銀行")} />
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center min-w-[60px] transition-all ${active ? "text-orange-600 scale-110" : "text-gray-400 hover:text-orange-300"}`}>
      {icon}
      <span className={`text-[10px] font-bold mt-1 ${active ? "opacity-100" : "opacity-70"}`}>{label}</span>
    </button>
  );
}
