'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { 
  Menu, 
  Volume2, 
  UtensilsCrossed, 
  Bus, 
  GraduationCap, 
  ShoppingBag,
  ChevronRight,
  Construction
} from 'lucide-react'

export default function HomePage() {
  const [lang, setLang] = useState<'TW' | 'VN'>('TW')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const categories = [
    {
      icon: UtensilsCrossed,
      title: lang === 'TW' ? '點餐與飲食' : 'Gọi món & Ăn uống',
      description: lang === 'TW' ? '買手搖飲、去餐廳' : 'Mua trà sữa, đi nhà hàng',
      color: 'bg-gradient-to-br from-orange-400 to-orange-500',
      iconColor: 'text-orange-600'
    },
    {
      icon: Bus,
      title: lang === 'TW' ? '交通與出行' : 'Giao thông & Đi lại',
      description: lang === 'TW' ? '搭火車、坐公車' : 'Đi tàu, đi xe buýt',
      color: 'bg-gradient-to-br from-emerald-400 to-emerald-500',
      iconColor: 'text-emerald-600'
    },
    {
      icon: GraduationCap,
      title: lang === 'TW' ? '校園與住宿' : 'Trường học & Ký túc xá',
      description: lang === 'TW' ? '請假、報修設備' : 'Xin nghỉ, báo sửa chữa',
      color: 'bg-gradient-to-br from-blue-400 to-blue-500',
      iconColor: 'text-blue-600'
    },
    {
      icon: ShoppingBag,
      title: lang === 'TW' ? '購物與生活' : 'Mua sắm & Đời sống',
      description: lang === 'TW' ? '超市買東西、看醫生' : 'Mua đồ siêu thị, đi khám bệnh',
      color: 'bg-gradient-to-br from-amber-400 to-amber-500',
      iconColor: 'text-amber-600'
    }
  ]

  const navItems = [
    { label: lang === 'TW' ? '情境學習' : 'Học theo tình huống', href: '#scenarios' },
    { label: lang === 'TW' ? '單字卡' : 'Thẻ từ vựng', href: '#flashcards' },
    { label: lang === 'TW' ? '發音練習' : 'Luyện phát âm', href: '#pronunciation' }
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileMenuOpen(false)
  }

  const handlePlayAudio = async () => {
    if (isLoading || isPlaying) return
    
    const textToSpeak = '我要一杯珍珠奶茶，半糖少冰。'
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSpeak }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate speech')
      }
      
      const blob = await response.blob()
      const audioUrl = URL.createObjectURL(blob)
      const audio = new Audio(audioUrl)
      
      setIsLoading(false)
      setIsPlaying(true)
      
      audio.onended = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(audioUrl)
      }
      
      audio.onerror = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(audioUrl)
        alert(lang === 'TW' ? '播放失敗，請稍後再試' : 'Phát âm thất bại, vui lòng thử lại')
      }
      
      await audio.play()
    } catch (error) {
      console.error('TTS error:', error)
      setIsLoading(false)
      setIsPlaying(false)
      alert(lang === 'TW' ? '無法生成語音，請稍後再試' : 'Không thể tạo giọng nói, vui lòng thử lại')
    }
  }

  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Under Development Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Construction className="h-6 w-6 text-amber-500" />
              {lang === 'TW' ? '單元開發中' : 'Đang phát triển'}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {lang === 'TW' 
                ? `「${selectedCategory}」單元正在建置中，敬請期待！`
                : `Đơn vị "${selectedCategory}" đang được xây dựng, vui lòng chờ đợi!`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end pt-4">
            <Button onClick={() => setModalOpen(false)}>
              {lang === 'TW' ? '關閉' : 'Đóng'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                台
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">台灣通300句</span>
                <span className="text-xs text-muted-foreground">Taiwan Pass 300</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleSmoothScroll(e, item.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-1 font-bold"
                onClick={() => setLang(lang === 'TW' ? 'VN' : 'TW')}
              >
                <span className={lang === 'TW' ? 'text-primary' : 'text-muted-foreground'}>TW</span>
                <span className="text-muted-foreground">/</span>
                <span className={lang === 'VN' ? 'text-primary' : 'text-muted-foreground'}>VN</span>
              </Button>

              {/* User Avatar */}
              <Avatar className="h-8 w-8 hidden sm:flex">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=user" />
                <AvatarFallback>VN</AvatarFallback>
              </Avatar>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                        onClick={(e) => handleSmoothScroll(e, item.href)}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-emerald-50 py-12 md:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mx-auto max-w-4xl text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance mb-4 leading-tight">
              {lang === 'TW' ? (
                <>
                  輕鬆開口說中文！
                  <br />
                  <span className="text-primary">Tự tin giao tiếp tiếng Trung!</span>
                </>
              ) : (
                <>
                  Tự tin giao tiếp tiếng Trung!
                  <br />
                  <span className="text-primary">輕鬆開口說中文！</span>
                </>
              )}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground mb-8 text-balance">
              {lang === 'TW' 
                ? '專為越南學生設計的 300 句台灣生活必備實用語'
                : '300 câu tiếng Trung thực dụng cho sinh hoạt tại Đài Loan'}
            </p>
            <Button size="lg" className="rounded-full text-base md:text-lg px-6 md:px-8 py-5 md:py-6 shadow-lg hover:shadow-xl transition-all">
              {lang === 'TW' ? '開始學習' : 'Bắt đầu học'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          {/* Taiwan Campus Illustration */}
          <div className="mx-auto max-w-4xl mt-12">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1470004914212-05527e49370b?w=1200&auto=format&fit=crop&q=80" 
                alt="Taiwan street scene with traditional architecture"
                className="w-full h-auto object-cover aspect-[16/9]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-2xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
      </section>

      {/* Categories Section */}
      <section id="scenarios" className="py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'TW' ? '生活情境分類' : 'Phân loại theo tình huống'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {lang === 'TW' 
                ? '選擇您想學習的情境，開始您的中文學習之旅'
                : 'Chọn tình huống bạn muốn học và bắt đầu hành trình học tiếng Trung'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {categories.map((category, index) => {
              const Icon = category.icon
              return (
                <Card 
                  key={index} 
                  className="group cursor-pointer border-2 hover:border-primary hover:shadow-xl transition-all duration-300 overflow-hidden"
                  onClick={() => handleCategoryClick(category.title)}
                >
                  <CardContent className="p-0">
                    <div className={`${category.color} p-6 text-white`}>
                      <Icon className="h-12 w-12 mb-3" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {category.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-medium">
                        {lang === 'TW' ? '開始學習' : 'Bắt đầu học'}
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Flashcard Demo Section */}
      <section id="flashcards" className="py-16 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'TW' ? '互動式學習卡片' : 'Thẻ học tập tương tác'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {lang === 'TW' 
                ? '點擊喇叭圖示聆聽標準發音'
                : 'Nhấn vào biểu tượng loa để nghe phát âm chuẩn'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="border-2 shadow-2xl">
              <CardContent className="p-8 md:p-12">
                <div className="space-y-6">
                  {/* Chinese Text */}
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                      我要一杯珍珠奶茶，
                    </p>
                    <p className="text-3xl md:text-4xl font-bold text-foreground">
                      半糖少冰。
                    </p>
                  </div>

                  {/* Vietnamese Translation */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-xl md:text-2xl text-muted-foreground">
                      Cho tôi một ly trà sữa trân châu,
                    </p>
                    <p className="text-xl md:text-2xl text-muted-foreground">
                      nửa đường ít đá.
                    </p>
                  </div>

                  {/* Audio Button */}
                  <div className="flex flex-col items-center gap-3 pt-6">
                    <Button 
                      size="lg" 
                      className={`rounded-full gap-2 shadow-lg hover:shadow-xl transition-all ${
                        isPlaying ? 'bg-secondary hover:bg-secondary scale-105' : ''
                      }`}
                      onClick={handlePlayAudio}
                      disabled={isLoading || isPlaying}
                    >
                      <Volume2 className={`h-5 w-5 ${isPlaying ? 'animate-pulse' : ''}`} />
                      {isLoading 
                        ? (lang === 'TW' ? '載入語音中...' : 'Đang tải âm thanh...')
                        : isPlaying
                        ? (lang === 'TW' ? '播放中...' : 'Đang phát...')
                        : (lang === 'TW' ? '播放音檔' : 'Phát âm thanh')}
                    </Button>
                  </div>

                  {/* Pinyin/Phonetic */}
                  <div className="text-center pt-4 border-t">
                    <p className="text-xs text-muted-foreground mb-1">
                      {lang === 'TW' ? '拼音' : 'Phiên âm'}
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
                      wǒ yào yì bēi zhēnzhū nǎichá, bàn táng shǎo bīng
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pronunciation Section */}
      <section id="pronunciation" className="py-16 md:py-24 scroll-mt-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {lang === 'TW' ? '發音練習' : 'Luyện phát âm'}
            </h2>
            <p className="text-muted-foreground text-lg">
              {lang === 'TW' 
                ? '即將推出更多發音練習功能'
                : 'Sắp ra mắt thêm nhiều tính năng luyện phát âm'}
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-dashed">
              <CardContent className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Volume2 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {lang === 'TW' ? '敬請期待' : 'Vui lòng chờ đợi'}
                </h3>
                <p className="text-muted-foreground">
                  {lang === 'TW' 
                    ? '我們正在開發更完整的發音練習系統'
                    : 'Chúng tôi đang phát triển hệ thống luyện phát âm hoàn chỉnh hơn'}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                台
              </div>
              <span className="font-bold text-lg">台灣通300句</span>
            </div>
            <p className="text-muted-foreground mb-4">
              {lang === 'TW' 
                ? '讓在台灣的越南學生輕鬆學習中文'
                : 'Giúp sinh viên Việt Nam tại Đài Loan học tiếng Trung dễ dàng'}
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Taiwan Pass 300. {lang === 'TW' ? '保留所有權利' : 'Bảo lưu mọi quyền'}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
