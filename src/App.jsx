import React, { useState, useEffect } from 'react';
import { Shield, Clock, Heart, Feather, Sparkles, ArrowDown, ChevronLeft, ChevronRight, BookOpen, Map, Users, Compass, Crown, Gem, Star } from 'lucide-react';

import image16 from './assets/Image16.jpeg';
import image17 from './assets/Image17.jpg';
import image18 from './assets/Image18.jpg';
import image19 from './assets/Image19.jpg';
import image20 from './assets/Image20.jpg';
import image15 from './assets/Image15.jpg';

// -- Interactive "Obstacles" Component --
const CuteObstacles = () => {
  const [bubbles, setBubbles] = useState([
    { id: 1, x: 10, y: 20, emoji: '💖', message: "You're a Queen! 👑", popped: false },
    { id: 2, x: 80, y: 40, emoji: '✨', message: "Slay! 💅", popped: false },
    { id: 3, x: 20, y: 70, emoji: '🦋', message: "Independent! 💎", popped: false },
    { id: 4, x: 75, y: 85, emoji: '🥂', message: "Boss Vibes! ✨", popped: false },
  ]);

  const popBubble = (id) => {
    setBubbles(bubbles.map(b => b.id === id ? { ...b, popped: true } : b));
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className={`absolute transition-all duration-500 ease-out ${bubble.popped ? 'scale-150 opacity-0' : 'animate-bounce-slow pointer-events-auto cursor-pointer hover:scale-110'}`}
          style={{ left: `${bubble.x}%`, top: `${bubble.y}%` }}
          onClick={() => popBubble(bubble.id)}
        >
          {bubble.popped ? (
            <div className="text-pink-500 font-bold bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-xl border border-pink-200 text-sm whitespace-nowrap">
              {bubble.message}
            </div>
          ) : (
            <div className="w-14 h-14 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.3)] border border-pink-100 text-2xl animate-pulse">
              {bubble.emoji}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// -- Background Emojis Animation --
const FloatingEmojis = () => {
  const emojis = ['💖', '✨', '💎', '🌸', '👑', '💅'];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float-up opacity-0"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${10 + Math.random() * 10}s`,
            fontSize: `${1 + Math.random() * 1.5}rem`
          }}
        >
          {emojis[Math.floor(Math.random() * emojis.length)]}
        </div>
      ))}
    </div>
  );
};


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Book State
  const [bookPage, setBookPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);

  const bookPages = [
    {
      chapter: "Chapters 40-55",
      title: "Trusting in God's Power",
      text: "Known as the \"Book of Comfort,\" these chapters emphasize God’s sovereignty over creation and history, encouraging us to trust in His promise of restoration."
    },
    {
      chapter: "Chapter 7",
      title: "The Call to Stand Firm",
      text: "Isaiah tells King Ahaz to \"stand firm in faith, or you won't stand at all,\" emphasizing that active, daily trust in God is required for stability."
    },
    {
      chapter: "Chapter 53",
      title: "The Suffering Servant",
      text: "This chapter highlights faith in a promised messiah who bears the sins of the people, a foundational text for Christian faith in Jesus."
    },
    {
      chapter: "Chapter 40",
      title: "The Promise of Renewal",
      text: "Isaiah 40:31 offers comfort to the exhausted, promising renewed strength to those who wait upon and trust in the Lord."
    },
    {
      chapter: "Chapter 43",
      title: "God's Faithfulness",
      text: "God promises to be with His people through trials, such as walking through fire or water, ensuring that faith replaces fear."
    }
  ];

  const turnPage = (direction) => {
    if (isFlipping) return;
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === 'next' && bookPage < bookPages.length - 1) setBookPage(p => p + 1);
      if (direction === 'prev' && bookPage > 0) setBookPage(p => p - 1);
      setIsFlipping(false);
    }, 400); 
  };

  const slides = [
    { image: image16, text: '"The least of you will become a thousand,' },
    { image: image17, text: 'the smallest a mighty nation.' },
    { image: image18, text: 'I am the LORD;' },
    { image: image19, text: 'in its time,' },
    { image: image20, text: 'I will do this swiftly."' }
  ];

  useEffect(() => {
    setLoaded(true);
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const smoothScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-rose-950 font-sans selection:bg-pink-300 selection:text-pink-900 overflow-x-hidden relative">
      
      {/* Custom Keyframe Styles */}
      <style>{`
        @keyframes float-up {
          0% { transform: translateY(100vh) scale(0.5) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-20vh) scale(1.2) rotate(360deg); opacity: 0; }
        }
        .animate-float-up { animation: float-up linear infinite; }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>

      {/* Background ambient accents - Bougee Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-300 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30rem] h-[30rem] bg-fuchsia-300 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-[40%] left-[60%] w-[20rem] h-[20rem] bg-rose-400 rounded-full blur-3xl opacity-20"></div>
      </div>

      <FloatingEmojis />
      <CuteObstacles />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10">
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 transform ${loaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex justify-center mb-6 space-x-3">
            <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" strokeWidth={1.5} />
            <Crown className="w-8 h-8 text-yellow-500 animate-bounce-slow" strokeWidth={1.5} />
          </div>
          <p className="text-sm tracking-[0.3em] uppercase text-pink-500 font-bold mb-4 bg-white/50 inline-block px-4 py-1 rounded-full border border-pink-200 shadow-sm backdrop-blur-sm">
            Made Especially For
          </p>
          <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-600 mb-6 tracking-tight drop-shadow-sm">
            Justine
          </h1>
          <p className="text-sm tracking-[0.3em] uppercase text-pink-500 font-bold mb-4 bg-white/50 inline-block px-4 py-1 rounded-full border border-pink-200 shadow-sm backdrop-blur-sm">
            By Tyrone
          </p>
          <p className="text-lg md:text-2xl text-rose-800/80 leading-relaxed max-w-lg mx-auto font-medium">
            I was thinking about our conversation, and I wanted to put together a few reminders to encourage you on your journey. <br/> <span className="text-pink-600 font-bold">Keep shining. ✨</span>
          </p>
        </div>
        
        <button 
          onClick={() => smoothScroll('the-promise')}
          className="absolute bottom-12 animate-bounce p-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 shadow-[0_0_20px_rgba(236,72,153,0.4)] text-white hover:scale-110 transition-all focus:outline-none"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </section>

      {/* The Anchor Verse - Flowing Images Section */}
      <section id="the-promise" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500/20 mx-auto mb-6 animate-pulse" strokeWidth={1.5} />
            <p className="text-sm tracking-widest uppercase text-pink-600 font-bold bg-white/60 inline-block px-6 py-2 rounded-full shadow-sm border border-pink-100">
              Isaiah 60:22
            </p>
          </div>

          {/* Image Slider */}
          <div className="relative h-[60vh] md:h-[75vh] w-full rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(236,72,153,0.3)] group border-4 border-white/50 backdrop-blur-sm">
            {slides.map((slide, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  activeSlide === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                }`}
              >
                {/* Background Image */}
                <div 
                  className={`absolute inset-0 bg-cover ${index === 0 ? 'bg-top' : 'bg-center'}`}
                  style={{ backgroundImage: `url(${slide.image})` }}
                ></div>
                
                {/* Bougee Overlay for Text Readability - Fuchsia tint */}
                <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-900/80 via-rose-900/40 to-transparent"></div>

                {/* Scripture Text */}
                <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 text-center">
                  <h2 className={`text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight transition-all duration-1000 delay-300 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${
                    activeSlide === index ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                  }`}>
                    {slide.text}
                  </h2>
                </div>
              </div>
            ))}

            {/* Controls */}
            <button 
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all focus:outline-none shadow-lg border border-white/30"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all focus:outline-none shadow-lg border border-white/30"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`h-3 rounded-full transition-all duration-500 focus:outline-none shadow-sm ${
                    activeSlide === index ? 'bg-gradient-to-r from-pink-400 to-rose-400 w-10' : 'bg-white/50 hover:bg-white w-3'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Book of Comfort - Interactive Bible Section */}
      <section className="py-24 px-6 relative z-10 border-y border-pink-100/50 bg-white/30 backdrop-blur-sm">
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <BookOpen className="w-10 h-10 text-rose-500 mx-auto mb-6 drop-shadow-sm" strokeWidth={1.5} />
            <h2 className="text-4xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-700 to-pink-600 mb-4">The Book of Comfort</h2>
            <p className="text-rose-800/70 max-w-lg mx-auto font-medium text-lg">
              A reminder that in seasons of planning and decision-making, there is a promise of guidance, strength, and unwavering faithfulness.
            </p>
          </div>

          <div className="relative w-full max-w-4xl mx-auto min-h-[400px] bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(236,72,153,0.15)] rounded-3xl border border-pink-100 flex flex-col md:flex-row overflow-hidden">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-16 -ml-8 bg-gradient-to-r from-transparent via-pink-100/50 to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-pink-100 relative bg-gradient-to-br from-white to-pink-50/50">
              <div className="absolute top-6 left-6 text-pink-300">
                <Feather size={24} strokeWidth={1.5} />
              </div>
              
              <div className={`transition-all duration-400 ${isFlipping ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
                <p className="text-pink-500 font-bold tracking-widest text-sm uppercase mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-400" /> {bookPages[bookPage].chapter}
                </p>
                <h3 className="text-3xl md:text-5xl font-serif text-rose-900 leading-tight">
                  {bookPages[bookPage].title}
                </h3>
              </div>
            </div>

            <div className="flex-1 p-8 md:p-16 flex flex-col justify-center relative bg-white">
              <div className={`transition-all duration-400 ${isFlipping ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}>
                <p className="text-rose-800/80 leading-relaxed text-lg md:text-xl font-serif text-justify">
                  "{bookPages[bookPage].text}"
                </p>
              </div>

               <div className="absolute bottom-6 right-8 text-pink-400 text-sm font-serif font-bold bg-pink-50 px-4 py-1 rounded-full">
                 Page {bookPage + 1} of {bookPages.length}
               </div>
            </div>

          </div>

          <div className="mt-12 flex justify-center items-center space-x-4 md:space-x-8">
            <button 
              onClick={() => turnPage('prev')} 
              disabled={bookPage === 0} 
              className="flex items-center space-x-2 px-8 py-4 rounded-full bg-white shadow-lg border border-pink-100 text-pink-600 hover:bg-pink-50 hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-white transition-all focus:outline-none font-bold"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm tracking-wider uppercase">Turn Back</span>
            </button>
            <button 
              onClick={() => turnPage('next')} 
              disabled={bookPage === bookPages.length - 1} 
              className="flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 to-rose-400 shadow-[0_0_15px_rgba(236,72,153,0.3)] text-white hover:scale-105 disabled:opacity-40 disabled:hover:scale-100 transition-all focus:outline-none font-bold"
            >
              <span className="text-sm tracking-wider uppercase">Turn Page</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* The Conversation - Breaking it down */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-2xl mx-auto space-y-12 md:space-y-16">
          
          {/* On Planning and Moving */}
          <div className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-xl border border-pink-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-pink-200">
              <Map className="w-8 h-8 text-pink-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-rose-900 mb-4">On planning your next move. 🗺️</h3>
            <p className="text-rose-800/80 leading-relaxed text-lg">
              <strong className="text-pink-600">Proverbs 16:9</strong> says, <em>"In their hearts humans plan their course, but the Lord establishes their steps."</em> Keep making your plans, but take comfort in knowing you don't have to have it all perfectly figured out. God is guiding your steps.
            </p>
          </div>

          {/* On Family and Teamwork */}
          <div className="bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-xl border border-pink-100 hover:-translate-y-2 transition-transform duration-300">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-fuchsia-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-200">
              <Users className="w-8 h-8 text-fuchsia-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-rose-900 mb-4">You and I could make a great team. 👯‍♀️</h3>
            <p className="text-rose-800/80 leading-relaxed text-lg">
              <strong className="text-fuchsia-600">Ecclesiastes 4:9</strong> reminds us, <em>"Two are better than one, because they have a good return for their labor."</em> It's awesome that you guys have each other's backs through the ups and downs.
            </p>
          </div>

          {/* On Making Decisions */}
          <div className="bg-gradient-to-br from-white to-pink-50 p-8 md:p-12 rounded-[2rem] shadow-2xl border border-pink-200 hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full blur-3xl opacity-50"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-rose-200 relative z-10">
              <Compass className="w-8 h-8 text-rose-600" strokeWidth={1.5} />
            </div>
            <h3 className="text-3xl font-serif text-rose-900 mb-4 relative z-10">Figuring things out as time goes on. 💎</h3>
            <p className="text-rose-800/80 leading-relaxed text-lg relative z-10">
              <strong className="text-rose-600">Proverbs 3:5-6</strong> says, <em>"Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."</em> Whenever you feel stuck on a choice, we can always pause and seek wisdom together. I'm here to help, step by step.
            </p>
          </div>

        </div>
      </section>

      {/* Footer / Outro */}
      <footer className="py-24 px-6 text-center border-t border-pink-200/50 bg-white/40 backdrop-blur-md relative z-10">
        <div className="max-w-xl mx-auto flex flex-col items-center">
          <Gem className="w-10 h-10 text-pink-400 mb-6 animate-bounce-slow" strokeWidth={1.5}/>
          <h4 className="font-serif text-3xl text-rose-900 mb-4 drop-shadow-sm">You're special and deserve the best. 💖</h4>
          <p className="text-rose-800/60 mb-8 font-medium text-lg">
            No pressure. Just taking it one step at a time.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto rounded-full"></div>
          <p className="mt-8 text-sm text-pink-500 font-bold tracking-widest uppercase bg-white/50 px-6 py-2 rounded-full inline-block border border-pink-100 shadow-sm">
            Made with patience and care, for Justine. 💅
          </p>
        </div>
      </footer>
    </div>
  );
}