/**
 * ============================================================
 * 🐱 JOURNEY WITH LEO
 * A cozy, pixel-art, story-driven adventure
 * About two lovers and their black cat companion
 * ============================================================
 * 
 * Design Philosophy:
 * - Leo is not a mascot, he's an emotional anchor
 * - Every interaction should feel warm and intentional
 * - The journey IS the destination
 * - Pixel art = nostalgia + warmth + handcrafted feeling
 * 
 * Technical Notes:
 * - Single file for easy deployment to GitHub Pages
 * - localStorage for progress persistence
 * - Structured for future i18n support
 * - Pure CSS animations (no external libraries)
 */

import React, { useState, useEffect, useCallback } from 'react';

// ============================================================
// 🌍 LOCALIZATION SYSTEM
// Prepared for multilingual support
// ============================================================
const LANG = {
  en: {
    // Game Title
    title: "Journey with Leo",
    subtitle: "A story of love, growth, and a little black cat",
    
    // HUD Elements
    hud: {
      memories: "Memories",
      love: "Love",
      chapter: "Chapter",
    },
    
    // Leo's Moods - He speaks to your heart
    leoMoods: {
      idle: "Leo purrs softly, waiting for your next step...",
      chapter1: "Leo shivers in the rain, but feels safe with you both...",
      chapter2: "Leo chases sunbeams and learns your names...",
      chapter3: "Leo senses the tension, stays close to comfort you...",
      chapter4: "Leo curls between you both, sharing warmth...",
      chapter5: "Leo watches proudly as you build dreams together...",
      chapter6: "Leo found his forever home. So did you.",
      chapter7: "Leo has never been happier. Neither have you.",
      locked: "Leo wonders what adventures await ahead...",
    },
    
    // UI Actions
    actions: {
      startChapter: "Begin Chapter",
      continueJourney: "Continue",
      backToMap: "Return to Map",
      petLeo: "Pet Leo",
      holdHands: "Hold Hands",
      memories: "Memories",
      resetProgress: "Start Over",
      confirmReset: "Are you sure? This will erase all progress.",
    },
    
    // Chapter Data - The heart of the story
    chapters: [
      {
        id: 1,
        title: "The First Meeting",
        location: "A Rainy Street Corner",
        season: "Spring Rain",
        description: "Two souls find each other on a gray afternoon. In the shelter of a doorway, a tiny black kitten shivers alone...",
        story: [
          "The rain hadn't stopped for three days.",
          "You bumped into each other reaching for the same umbrella at the café entrance.",
          "Awkward laughter. Shared shelter. A spark.",
          "Then you both heard it—a tiny mew from the alley.",
          "There he was. A small black kitten, soaked and shivering.",
          "Without words, you both knew: he was coming home with you.",
          "You named him Leo, for the brave heart beating in his tiny chest.",
        ],
        leoMoment: "Leo looked up at you both with wide golden eyes. In that moment, a family was born.",
        memoryUnlock: "First photo together: Two humans, one tiny cat, one umbrella.",
      },
      {
        id: 2,
        title: "Small Beginnings",
        location: "Your First Apartment",
        season: "Summer Sun",
        description: "Days of learning each other's rhythms. Morning coffee, evening walks, and Leo discovering his new world...",
        story: [
          "The apartment was small, but it was yours.",
          "You learned important things:",
          "One of you is a morning person. The other is... not.",
          "Leo prefers the sunny spot by the window at exactly 2:47 PM.",
          "Burnt pancakes taste better when you're laughing together.",
          "Some silences are more comfortable than any words.",
          "Love grows in the ordinary moments.",
        ],
        leoMoment: "Leo knocked over his first plant today. He looked so proud. You couldn't stay mad.",
        memoryUnlock: "Polaroid: Leo sleeping in a sunbeam, tiny paws twitching with dreams.",
      },
      {
        id: 3,
        title: "The Storm",
        location: "The Living Room, Late Night",
        season: "Autumn Winds",
        description: "Not every day is sunshine. Sometimes clouds gather, and you wonder if the rain will ever stop...",
        story: [
          "It started with something small. It always does.",
          "Words that came out wrong. Silence that lasted too long.",
          "The apartment felt bigger somehow. Colder.",
          "You sat on opposite ends of the couch.",
          "Leo walked slowly between you both.",
          "He settled exactly in the middle.",
          "A small, warm bridge.",
          "Sometimes the bravest thing is to stay.",
        ],
        leoMoment: "Leo purred louder than ever that night. As if saying: 'I'm still here. So are you.'",
        memoryUnlock: "No photo. Some moments aren't captured—they're just felt.",
      },
      {
        id: 4,
        title: "Warmth in the Cold",
        location: "By the Window",
        season: "First Snow",
        description: "Winter arrived, and with it, a quiet understanding. Some bonds grow stronger in the cold...",
        story: [
          "The first snow fell on a Tuesday.",
          "You watched it together, wrapped in the same blanket.",
          "An apology that needed no words.",
          "Hot chocolate with too many marshmallows.",
          "Leo tried to catch snowflakes through the glass.",
          "You both laughed—really laughed—for the first time in weeks.",
          "Some storms clear the air.",
          "What remains is stronger than before.",
        ],
        leoMoment: "Leo fell asleep between you, his purr a gentle engine of contentment.",
        memoryUnlock: "Photo: Three silhouettes against a snow-bright window.",
      },
      {
        id: 5,
        title: "Growing Together",
        location: "The Balcony Garden",
        season: "New Spring",
        description: "A new season brings new dreams. You start building something together—something that will last...",
        story: [
          "You bought your first plant together. Then another. Then twelve more.",
          "The balcony became a tiny jungle.",
          "Leo appointed himself Chief Inspector of All Leaves.",
          "You talked about the future for the first time.",
          "Dreams spoken aloud become more real.",
          "A bigger place. Maybe someday, a garden.",
          "For now, this is enough. This is everything.",
        ],
        leoMoment: "Leo is bigger now. His personality, too. He brings you 'gifts'—usually hair ties, sometimes socks.",
        memoryUnlock: "Photo: Leo 'helping' with the plants. Dirt on his nose.",
      },
      {
        id: 6,
        title: "Home",
        location: "The New Place",
        season: "Golden Autumn",
        description: "A new chapter begins. New walls to fill with memories, new corners for Leo to explore...",
        story: [
          "The boxes seemed endless.",
          "But unpacking felt like unwrapping gifts.",
          "Each item a memory: that mug, those books, the blanket from your first winter.",
          "Leo explored every room with serious determination.",
          "He approved of the sunny kitchen.",
          "He claimed the highest shelf in the closet.",
          "Home isn't just a place.",
          "It's wherever you three are together.",
        ],
        leoMoment: "Leo found HIS spot within the first hour: the window seat overlooking the garden.",
        memoryUnlock: "Photo: Moving day chaos. Leo sitting calmly in an empty box, judging.",
      },
      {
        id: 7,
        title: "Forever",
        location: "The Garden, Sunset",
        season: "Endless Summer",
        description: "Not an ending—a beginning. The journey continues, but now you know: you'll walk it together...",
        story: [
          "The garden grew wilder and more beautiful each year.",
          "So did your love.",
          "Leo is older now, a little slower, but his eyes are just as bright.",
          "You've built a life from ordinary moments:",
          "Morning coffee. Evening walks. Lazy Sundays.",
          "Arguments that end in laughter. Silences full of understanding.",
          "This isn't a fairy tale ending.",
          "It's something better: a real one.",
          "The journey with Leo continues...",
          "One day at a time.",
          "Together.",
        ],
        leoMoment: "Leo looks at you both with those knowing golden eyes. He chose well. So did you.",
        memoryUnlock: "The album is full now. Time to start a new one.",
      },
    ],
  },
};

// Get text helper - makes i18n expansion easy
const getText = (path, lang = 'en') => {
  return path.split('.').reduce((obj, key) => obj?.[key], LANG[lang]) || path;
};

// ============================================================
// 💾 PROGRESS SYSTEM
// Persistent storage for GitHub Pages deployment
// ============================================================
const STORAGE_KEY = 'journey_with_leo_save';

const defaultProgress = {
  currentChapter: 1,
  unlockedChapters: [1],
  memoriesCollected: [],
  lovePoints: 0,
  leoInteractions: 0,
  chaptersCompleted: [],
  firstPlayDate: null,
};

const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...progress,
      lastSaved: Date.now(),
    }));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
};

const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultProgress, ...parsed };
    }
  } catch (e) {
    console.warn('Could not load progress:', e);
  }
  return { ...defaultProgress, firstPlayDate: Date.now() };
};

const resetProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn('Could not reset progress:', e);
  }
  return { ...defaultProgress, firstPlayDate: Date.now() };
};

// ============================================================
// 🎨 PIXEL ART CSS COMPONENTS
// Hand-crafted pixel-style elements
// ============================================================

// Pixel Heart Component - Used for love meter
const PixelHeart = ({ filled, size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`transition-all duration-300 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    {/* Pixel heart shape */}
    <rect x="2" y="4" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="4" y="2" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="6" y="2" width="2" height="2" fill={filled ? '#ff8fab' : '#5a5a7a'} />
    <rect x="8" y="2" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="10" y="2" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="12" y="4" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="2" y="6" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="4" y="4" width="2" height="2" fill={filled ? '#ffb3c6' : '#6a6a8a'} />
    <rect x="6" y="4" width="2" height="2" fill={filled ? '#ffb3c6' : '#6a6a8a'} />
    <rect x="8" y="4" width="2" height="2" fill={filled ? '#ff8fab' : '#5a5a7a'} />
    <rect x="10" y="4" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="12" y="6" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="2" y="8" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="4" y="6" width="2" height="2" fill={filled ? '#ff8fab' : '#5a5a7a'} />
    <rect x="6" y="6" width="2" height="2" fill={filled ? '#ff8fab' : '#5a5a7a'} />
    <rect x="8" y="6" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="10" y="6" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="12" y="8" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="4" y="8" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="6" y="8" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="8" y="8" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="10" y="8" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="4" y="10" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="6" y="10" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="8" y="10" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="10" y="10" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="6" y="12" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="8" y="12" width="2" height="2" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
    <rect x="8" y="14" width="0" height="0" fill={filled ? '#ff6b9d' : '#4a4a6a'} />
  </svg>
);

// Pixel Star Component - Used for memories and decorations
const PixelStar = ({ filled, size = 14, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 14 14" 
    className={`transition-all duration-300 ${className}`}
    style={{ imageRendering: 'pixelated' }}
  >
    <rect x="6" y="0" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="6" y="2" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="0" y="4" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="2" y="4" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="4" y="4" width="2" height="2" fill={filled ? '#fff3a0' : '#6a6a8a'} />
    <rect x="6" y="4" width="2" height="2" fill={filled ? '#fff3a0' : '#6a6a8a'} />
    <rect x="8" y="4" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="10" y="4" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="12" y="4" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="4" y="6" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="6" y="6" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="8" y="6" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="2" y="8" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="4" y="8" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="8" y="8" width="2" height="2" fill={filled ? '#ffe066' : '#5a5a7a'} />
    <rect x="10" y="8" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="2" y="10" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
    <rect x="10" y="10" width="2" height="2" fill={filled ? '#ffd93d' : '#4a4a6a'} />
  </svg>
);

// Pixel Leo Component - The star of the show
const PixelLeo = ({ mood = 'idle', size = 48, className = '' }) => {
  // Leo's different states based on mood
  const [blinkState, setBlinkState] = useState(false);
  const [tailWag, setTailWag] = useState(0);
  
  // Blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);
  
  // Tail wagging
  useEffect(() => {
    const tailInterval = setInterval(() => {
      setTailWag(prev => (prev + 1) % 3);
    }, 400);
    return () => clearInterval(tailInterval);
  }, []);
  
  // Color variations based on mood
  const getMoodColors = () => {
    switch(mood) {
      case 'happy': return { eyes: '#ffd93d', cheeks: '#ffb3c6' };
      case 'sad': return { eyes: '#6b9fff', cheeks: '#a0a0b0' };
      case 'worried': return { eyes: '#ff9f6b', cheeks: '#d4a0a0' };
      case 'sleepy': return { eyes: '#4a4a4a', cheeks: '#c0a0b0' };
      case 'love': return { eyes: '#ff6b9d', cheeks: '#ffb3c6' };
      default: return { eyes: '#ffc93d', cheeks: '#b0a0b0' };
    }
  };
  
  const colors = getMoodColors();
  const eyeColor = blinkState ? '#2a2a3a' : colors.eyes;
  const tailOffset = [-1, 0, 1][tailWag];
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      className={`transition-all duration-200 ${className}`}
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Ears */}
      <rect x="4" y="2" width="2" height="2" fill="#2a2a3a" />
      <rect x="6" y="3" width="2" height="2" fill="#2a2a3a" />
      <rect x="5" y="3" width="1" height="1" fill="#ff9f9f" />
      <rect x="16" y="2" width="2" height="2" fill="#2a2a3a" />
      <rect x="14" y="3" width="2" height="2" fill="#2a2a3a" />
      <rect x="17" y="3" width="1" height="1" fill="#ff9f9f" />
      
      {/* Head */}
      <rect x="6" y="4" width="10" height="8" fill="#2a2a3a" />
      <rect x="5" y="6" width="1" height="4" fill="#2a2a3a" />
      <rect x="16" y="6" width="1" height="4" fill="#2a2a3a" />
      
      {/* Eyes */}
      <rect x="8" y="7" width="2" height="2" fill={eyeColor} />
      <rect x="12" y="7" width="2" height="2" fill={eyeColor} />
      {!blinkState && (
        <>
          <rect x="8" y="7" width="1" height="1" fill="#fff" />
          <rect x="12" y="7" width="1" height="1" fill="#fff" />
        </>
      )}
      
      {/* Nose */}
      <rect x="10" y="9" width="2" height="1" fill="#ff9f9f" />
      
      {/* Mouth - changes with mood */}
      {mood === 'happy' || mood === 'love' ? (
        <>
          <rect x="9" y="10" width="1" height="1" fill="#3a3a4a" />
          <rect x="12" y="10" width="1" height="1" fill="#3a3a4a" />
          <rect x="10" y="11" width="2" height="1" fill="#3a3a4a" />
        </>
      ) : mood === 'sad' ? (
        <>
          <rect x="10" y="10" width="2" height="1" fill="#3a3a4a" />
          <rect x="9" y="11" width="1" height="1" fill="#3a3a4a" />
          <rect x="12" y="11" width="1" height="1" fill="#3a3a4a" />
        </>
      ) : (
        <rect x="10" y="10" width="2" height="1" fill="#3a3a4a" />
      )}
      
      {/* Cheeks for happy/love moods */}
      {(mood === 'happy' || mood === 'love') && (
        <>
          <rect x="6" y="9" width="1" height="1" fill={colors.cheeks} opacity="0.7" />
          <rect x="15" y="9" width="1" height="1" fill={colors.cheeks} opacity="0.7" />
        </>
      )}
      
      {/* Body */}
      <rect x="7" y="12" width="8" height="6" fill="#2a2a3a" />
      <rect x="6" y="13" width="1" height="4" fill="#2a2a3a" />
      <rect x="15" y="13" width="1" height="4" fill="#2a2a3a" />
      
      {/* Front paws */}
      <rect x="7" y="18" width="2" height="2" fill="#2a2a3a" />
      <rect x="13" y="18" width="2" height="2" fill="#2a2a3a" />
      
      {/* Tail - animated */}
      <rect x={18 + tailOffset} y="14" width="2" height="2" fill="#2a2a3a" />
      <rect x={19 + tailOffset} y="12" width="2" height="2" fill="#2a2a3a" />
      <rect x={20 + tailOffset} y="10" width="2" height="2" fill="#2a2a3a" />
    </svg>
  );
};

// Pixel Lock Icon
const PixelLock = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
    <rect x="5" y="2" width="2" height="2" fill="#6a6a8a" />
    <rect x="9" y="2" width="2" height="2" fill="#6a6a8a" />
    <rect x="3" y="4" width="2" height="4" fill="#6a6a8a" />
    <rect x="11" y="4" width="2" height="4" fill="#6a6a8a" />
    <rect x="5" y="4" width="6" height="2" fill="#5a5a7a" />
    <rect x="2" y="8" width="12" height="6" fill="#7a7a9a" />
    <rect x="3" y="9" width="10" height="4" fill="#8a8aaa" />
    <rect x="7" y="10" width="2" height="2" fill="#4a4a6a" />
  </svg>
);

// ============================================================
// 🗺️ LEVEL MAP COMPONENT
// The visual journey through the story
// ============================================================
const LevelMap = ({ 
  chapters, 
  progress, 
  onSelectChapter, 
  onPetLeo,
}) => {
  const [hoveredChapter, setHoveredChapter] = useState(null);
  
  // Level positions on the map - creating a winding path
  const levelPositions = [
    { x: 50, y: 88 },  // Chapter 1 - Bottom center
    { x: 22, y: 74 },  // Chapter 2 - Left
    { x: 50, y: 60 },  // Chapter 3 - Center
    { x: 78, y: 48 },  // Chapter 4 - Right
    { x: 50, y: 36 },  // Chapter 5 - Center
    { x: 22, y: 22 },  // Chapter 6 - Left
    { x: 50, y: 8 },   // Chapter 7 - Top center (the goal)
  ];
  
  // Season-based colors for each chapter
  const seasonColors = [
    { bg: 'from-blue-400/30 to-slate-500/30', glow: 'shadow-blue-400/50' },      // Rain
    { bg: 'from-amber-400/30 to-orange-400/30', glow: 'shadow-amber-400/50' },   // Summer
    { bg: 'from-orange-500/30 to-stone-500/30', glow: 'shadow-orange-400/50' },  // Autumn
    { bg: 'from-blue-300/30 to-indigo-400/30', glow: 'shadow-blue-300/50' },     // Winter
    { bg: 'from-green-400/30 to-emerald-400/30', glow: 'shadow-green-400/50' },  // Spring
    { bg: 'from-amber-300/30 to-yellow-400/30', glow: 'shadow-amber-300/50' },   // Golden
    { bg: 'from-purple-400/30 to-pink-400/30', glow: 'shadow-purple-400/50' },   // Forever
  ];
  
  const isUnlocked = (chapterId) => progress.unlockedChapters.includes(chapterId);
  const isCompleted = (chapterId) => progress.chaptersCompleted.includes(chapterId);
  
  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[3/4] rounded-2xl overflow-hidden"
         style={{
           background: 'linear-gradient(to bottom, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
           boxShadow: 'inset 0 0 60px rgba(100, 100, 150, 0.1)',
         }}>
      
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() > 0.7 ? '2px' : '1px',
              height: Math.random() > 0.7 ? '2px' : '1px',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
      
      {/* Path connecting levels */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.6" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Draw path between consecutive levels */}
        {levelPositions.slice(0, -1).map((pos, i) => {
          const nextPos = levelPositions[i + 1];
          const isPathUnlocked = isUnlocked(i + 1);
          return (
            <line
              key={i}
              x1={`${pos.x}%`}
              y1={`${pos.y}%`}
              x2={`${nextPos.x}%`}
              y2={`${nextPos.y}%`}
              stroke={isPathUnlocked ? "url(#pathGradient)" : "#3a3a5a"}
              strokeWidth="3"
              strokeDasharray={isPathUnlocked ? "0" : "6 4"}
              opacity={isPathUnlocked ? 1 : 0.4}
              filter={isPathUnlocked ? "url(#glow)" : "none"}
            />
          );
        })}
      </svg>
      
      {/* Level Nodes */}
      {chapters.map((chapter, i) => {
        const pos = levelPositions[i];
        const unlocked = isUnlocked(chapter.id);
        const completed = isCompleted(chapter.id);
        const isHovered = hoveredChapter === chapter.id;
        const seasonColor = seasonColors[i];
        
        return (
          <button
            key={chapter.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 
                       transition-all duration-300 ease-out z-10
                       ${unlocked ? 'cursor-pointer' : 'cursor-not-allowed'}
                       ${isHovered && unlocked ? 'scale-125 z-20' : ''}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
            onClick={() => unlocked && onSelectChapter(chapter)}
            onMouseEnter={() => setHoveredChapter(chapter.id)}
            onMouseLeave={() => setHoveredChapter(null)}
            disabled={!unlocked}
          >
            {/* Glow effect for unlocked levels */}
            {unlocked && (
              <div className={`absolute inset-0 rounded-full blur-md bg-gradient-to-br ${seasonColor.bg}
                             ${isHovered ? 'opacity-100 scale-150' : 'opacity-60'}
                             transition-all duration-300`}
                   style={{ width: '56px', height: '56px', margin: '-4px' }} />
            )}
            
            {/* Level circle */}
            <div className={`relative w-12 h-12 rounded-full flex items-center justify-center
                           transition-all duration-300
                           ${unlocked 
                             ? `bg-gradient-to-br ${seasonColor.bg} border-2 border-white/60 ${seasonColor.glow} shadow-lg`
                             : 'bg-slate-700/50 border-2 border-slate-600/50'}`}>
              
              {unlocked ? (
                <span className="text-lg font-bold text-white" 
                      style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                  {completed ? '✓' : chapter.id}
                </span>
              ) : (
                <PixelLock size={18} />
              )}
              
              {/* Completion star */}
              {completed && (
                <div className="absolute -top-1 -right-1">
                  <PixelStar filled size={14} />
                </div>
              )}
            </div>
            
            {/* Chapter title - shows on hover */}
            <div className={`absolute top-full mt-2 left-1/2 transform -translate-x-1/2
                           whitespace-nowrap text-xs font-medium
                           transition-all duration-200
                           ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
              <span className={`px-2 py-1 rounded ${unlocked ? 'bg-white/10 text-white' : 'bg-slate-800/80 text-slate-400'}`}>
                {unlocked ? chapter.title : '???'}
              </span>
            </div>
          </button>
        );
      })}
      
      {/* Current position indicator (two figures + Leo) */}
      <div className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
           style={{ 
             left: `${levelPositions[Math.min(progress.currentChapter - 1, 6)].x}%`, 
             top: `${levelPositions[Math.min(progress.currentChapter - 1, 6)].y + 8}%`,
           }}>
        <div className="flex items-end gap-0.5 animate-bounce-slow">
          {/* Left figure */}
          <div className="w-3 h-5 bg-indigo-300 rounded-t-full" />
          {/* Leo between them */}
          <div className="w-2 h-2 bg-slate-800 rounded-full mb-0.5" />
          {/* Right figure */}
          <div className="w-3 h-5 bg-pink-300 rounded-t-full" />
        </div>
      </div>
      
      {/* Map title overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
        <h2 className="text-lg font-bold text-white/80 tracking-wider"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
          Your Journey
        </h2>
      </div>
    </div>
  );
};

// ============================================================
// 📖 CHAPTER VIEW COMPONENT
// Immersive story reading experience
// ============================================================
const ChapterView = ({ chapter, onComplete, onBack, progress }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [showLeoMoment, setShowLeoMoment] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const totalLines = chapter.story.length;
  const isLastLine = currentLine >= totalLines - 1;
  
  const advanceStory = useCallback(() => {
    if (isComplete) {
      onComplete(chapter.id);
      return;
    }
    
    if (isLastLine && !showLeoMoment) {
      setShowLeoMoment(true);
    } else if (showLeoMoment) {
      setIsComplete(true);
    } else {
      setCurrentLine(prev => Math.min(prev + 1, totalLines - 1));
    }
  }, [currentLine, isLastLine, showLeoMoment, isComplete, totalLines, chapter.id, onComplete]);
  
  // Season-based theming
  const seasonThemes = {
    1: { bg: 'from-slate-700 via-blue-900 to-slate-800', accent: 'text-blue-300' },
    2: { bg: 'from-amber-900 via-orange-900 to-yellow-900', accent: 'text-amber-300' },
    3: { bg: 'from-stone-800 via-amber-900 to-stone-900', accent: 'text-orange-300' },
    4: { bg: 'from-slate-800 via-indigo-900 to-blue-900', accent: 'text-blue-200' },
    5: { bg: 'from-emerald-900 via-green-900 to-teal-900', accent: 'text-emerald-300' },
    6: { bg: 'from-amber-800 via-yellow-900 to-orange-900', accent: 'text-yellow-300' },
    7: { bg: 'from-purple-900 via-pink-900 to-indigo-900', accent: 'text-pink-300' },
  };
  
  const theme = seasonThemes[chapter.id] || seasonThemes[1];
  
  // Leo's mood based on chapter
  const leoMoods = {
    1: 'worried', 2: 'happy', 3: 'sad', 4: 'love', 5: 'happy', 6: 'happy', 7: 'love'
  };
  
  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg} p-4 flex flex-col`}>
      {/* Chapter Header */}
      <div className="text-center mb-6 pt-4">
        <p className={`text-sm ${theme.accent} mb-1 tracking-widest uppercase`}>
          {chapter.season}
        </p>
        <h1 className="text-2xl font-bold text-white mb-1">
          {chapter.title}
        </h1>
        <p className="text-sm text-white/60">
          {chapter.location}
        </p>
      </div>
      
      {/* Story Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto w-full">
        
        {!showLeoMoment && !isComplete ? (
          /* Story text display */
          <div className="text-center px-4">
            <p className="text-lg text-white/90 leading-relaxed min-h-[4rem]"
               style={{ 
                 animation: 'fadeSlideIn 0.5s ease-out',
               }}>
              {chapter.story[currentLine]}
            </p>
            
            {/* Progress dots */}
            <div className="flex justify-center gap-1 mt-8">
              {chapter.story.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all duration-300
                             ${i <= currentLine ? 'bg-white/80' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>
        ) : showLeoMoment && !isComplete ? (
          /* Leo's moment */
          <div className="text-center px-4" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
            <div className="mb-6">
              <PixelLeo mood={leoMoods[chapter.id]} size={80} className="mx-auto" />
            </div>
            <p className={`text-lg ${theme.accent} italic leading-relaxed`}>
              "{chapter.leoMoment}"
            </p>
            <p className="text-sm text-white/50 mt-4">
              ~ Leo ~
            </p>
          </div>
        ) : (
          /* Chapter complete */
          <div className="text-center px-4" style={{ animation: 'fadeSlideIn 0.5s ease-out' }}>
            <div className="mb-6 flex justify-center gap-2">
              <PixelStar filled size={24} />
              <PixelHeart filled size={24} />
              <PixelStar filled size={24} />
            </div>
            <p className="text-lg text-white/90 mb-2">
              Memory Unlocked
            </p>
            <p className={`text-sm ${theme.accent} italic`}>
              {chapter.memoryUnlock}
            </p>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="flex justify-between items-center mt-6 pb-4">
        <button
          onClick={onBack}
          className="px-4 py-2 text-white/60 hover:text-white transition-colors"
        >
          ← Back
        </button>
        
        <button
          onClick={advanceStory}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300
                     ${isComplete 
                       ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:scale-105' 
                       : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isComplete 
            ? 'Continue Journey →' 
            : isLastLine && !showLeoMoment 
              ? "Leo's Moment" 
              : 'Continue'}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// 🐱 LEO HUD COMPONENT
// Leo's persistent presence in the game
// ============================================================
const LeoHUD = ({ progress, onPetLeo, currentView }) => {
  const [isPetting, setIsPetting] = useState(false);
  const [petMessage, setPetMessage] = useState('');
  
  const petMessages = [
    "Leo purrs happily...",
    "Leo nuzzles your hand...",
    "Leo's tail swishes with joy...",
    "Leo blinks slowly at you... (that means love)",
    "Leo does a tiny chirp...",
    "Leo kneads the air contentedly...",
  ];
  
  const handlePet = () => {
    setIsPetting(true);
    setPetMessage(petMessages[Math.floor(Math.random() * petMessages.length)]);
    onPetLeo();
    setTimeout(() => setIsPetting(false), 2000);
  };
  
  // Determine Leo's mood based on game state
  const getLeoMood = () => {
    if (isPetting) return 'love';
    if (progress.currentChapter >= 7) return 'love';
    if (progress.currentChapter >= 5) return 'happy';
    if (progress.currentChapter === 3) return 'worried';
    return 'idle';
  };
  
  // Get Leo's message based on current state
  const getLeoMessage = () => {
    if (isPetting) return petMessage;
    const chapterKey = `chapter${progress.currentChapter}`;
    return getText(`leoMoods.${chapterKey}`) || getText('leoMoods.idle');
  };
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 p-3"
         style={{ background: 'linear-gradient(to bottom, rgba(20,20,35,0.95) 0%, rgba(20,20,35,0) 100%)' }}>
      <div className="max-w-lg mx-auto flex items-center gap-3">
        {/* Leo avatar - clickable to pet */}
        <button 
          onClick={handlePet}
          className={`relative p-1 rounded-lg transition-all duration-300 
                     ${isPetting ? 'scale-110 bg-pink-500/20' : 'hover:bg-white/5'}`}
          title="Pet Leo"
        >
          <PixelLeo mood={getLeoMood()} size={40} />
          {isPetting && (
            <div className="absolute -top-1 -right-1 text-pink-400 text-xs animate-bounce">
              ♥
            </div>
          )}
        </button>
        
        {/* Leo's message bubble */}
        <div className="flex-1 min-w-0">
          <p className="text-xs text-purple-200/80 italic truncate leading-relaxed"
             style={{ animation: isPetting ? 'pulse 0.5s ease-in-out' : 'none' }}>
            {getLeoMessage()}
          </p>
        </div>
        
        {/* Stats */}
        <div className="flex items-center gap-3 text-xs">
          {/* Love meter */}
          <div className="flex items-center gap-1">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <PixelHeart key={i} filled={i <= Math.min(progress.lovePoints, 5)} size={12} />
              ))}
            </div>
          </div>
          
          {/* Memories counter */}
          <div className="flex items-center gap-1 text-amber-300/80">
            <PixelStar filled size={12} />
            <span>{progress.memoriesCollected.length}/7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 🎮 MAIN GAME COMPONENT
// Orchestrates the entire experience
// ============================================================
const JourneyWithLeo = () => {
  // Game state
  const [progress, setProgress] = useState(loadProgress);
  const [currentView, setCurrentView] = useState('map'); // 'map', 'chapter', 'memories'
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Get chapters data
  const chapters = getText('chapters');
  
  // Save progress whenever it changes
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);
  
  // Handle chapter selection
  const handleSelectChapter = (chapter) => {
    setSelectedChapter(chapter);
    setCurrentView('chapter');
  };
  
  // Handle chapter completion
  const handleChapterComplete = (chapterId) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      
      // Mark chapter as completed
      if (!newProgress.chaptersCompleted.includes(chapterId)) {
        newProgress.chaptersCompleted = [...newProgress.chaptersCompleted, chapterId];
        newProgress.memoriesCollected = [...newProgress.memoriesCollected, chapterId];
        newProgress.lovePoints = Math.min((newProgress.lovePoints || 0) + 1, 7);
      }
      
      // Unlock next chapter
      const nextChapterId = chapterId + 1;
      if (nextChapterId <= 7 && !newProgress.unlockedChapters.includes(nextChapterId)) {
        newProgress.unlockedChapters = [...newProgress.unlockedChapters, nextChapterId];
        newProgress.currentChapter = nextChapterId;
      }
      
      return newProgress;
    });
    
    setCurrentView('map');
    setSelectedChapter(null);
  };
  
  // Handle petting Leo
  const handlePetLeo = () => {
    setProgress(prev => ({
      ...prev,
      leoInteractions: (prev.leoInteractions || 0) + 1,
    }));
  };
  
  // Handle progress reset
  const handleReset = () => {
    setProgress(resetProgress());
    setShowResetConfirm(false);
    setCurrentView('map');
  };
  
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Global Styles */}
      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        @keyframes fadeSlideIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        /* Custom scrollbar for the cozy feel */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #1a1a2e;
        }
        ::-webkit-scrollbar-thumb {
          background: #4a4a6a;
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #6a6a8a;
        }
      `}</style>
      
      {/* Leo HUD - Always present */}
      <LeoHUD 
        progress={progress} 
        onPetLeo={handlePetLeo}
        currentView={currentView}
      />
      
      {/* Main Content Area */}
      <div className="pt-16 pb-8 px-4 min-h-screen">
        {currentView === 'map' && (
          <div className="max-w-lg mx-auto">
            {/* Game Title */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-white mb-2"
                  style={{ 
                    textShadow: '0 0 20px rgba(168, 85, 247, 0.5)',
                    letterSpacing: '0.05em'
                  }}>
                {getText('title')}
              </h1>
              <p className="text-sm text-purple-300/70 italic">
                {getText('subtitle')}
              </p>
            </div>
            
            {/* Level Map */}
            <LevelMap
              chapters={chapters}
              progress={progress}
              onSelectChapter={handleSelectChapter}
              onPetLeo={handlePetLeo}
            />
            
            {/* Bottom Actions */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={() => setShowResetConfirm(true)}
                className="px-4 py-2 text-sm text-white/40 hover:text-white/70 
                         transition-colors"
              >
                {getText('actions.resetProgress')}
              </button>
            </div>
            
            {/* Progress Summary */}
            <div className="mt-4 text-center text-xs text-white/30">
              {progress.chaptersCompleted.length === 7 ? (
                <span className="text-pink-300/70">
                  ✨ Your journey is complete. Thank you for playing. ✨
                </span>
              ) : (
                <span>
                  Chapter {progress.currentChapter} of 7 • 
                  Leo has been petted {progress.leoInteractions || 0} times
                </span>
              )}
            </div>
          </div>
        )}
        
        {currentView === 'chapter' && selectedChapter && (
          <ChapterView
            chapter={selectedChapter}
            progress={progress}
            onComplete={handleChapterComplete}
            onBack={() => {
              setCurrentView('map');
              setSelectedChapter(null);
            }}
          />
        )}
      </div>
      
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-slate-800 rounded-xl p-6 max-w-sm w-full text-center"
               style={{ animation: 'fadeSlideIn 0.2s ease-out' }}>
            <PixelLeo mood="sad" size={48} className="mx-auto mb-4" />
            <p className="text-white mb-4">
              {getText('actions.confirmReset')}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyWithLeo;
