// Story page for premium templates
export interface StoryPage {
  id: string;
  title: string;
  content: string;
  interactionType: 'tap-to-reveal' | 'swipe-hearts' | 'shake-unlock' | 'hold-to-fill' | 'scratch-reveal' | 'puzzle-piece';
  imageUrl?: string;
}

// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'valentine' | 'birthday' | 'congratulations' | 'anniversary' | 'custom';
  subCategory?: string; // For grouping templates like "Be My Valentine"
  previewImage: string;
  primaryColor: string;
  secondaryColor: string;
  icon: string;
  interactionType?: string;
  isPremium?: boolean;
  defaultPages?: StoryPage[]; // Default story pages for premium templates
}

// Surprise data type
export interface Surprise {
  id: string;
  templateId: string;
  senderName: string;
  recipientName: string;
  message: string;
  createdAt: string;
  viewed: boolean;
  // Premium template fields
  storyPages?: StoryPage[];
  finalMessage?: string;
  // Media enhancements
  imageUrl?: string;
  musicUrl?: string;
}

// Template definitions
export const templates: Template[] = [
  // ========== BE MY VALENTINE - 6 UNIQUE TEMPLATES ==========
  {
    id: 'valentine-escape',
    name: 'Escaping Love',
    description: 'Fun "No" button that runs away - they have no choice but to say YES! 🏃',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/valentine.jpg',
    primaryColor: '#ff6b9d',
    secondaryColor: '#ff3366',
    icon: '💘',
    interactionType: 'escaping-button'
  },
  {
    id: 'valentine-love-lock',
    name: 'Love Lock',
    description: 'Unlock hearts to reveal your Valentine proposal with a magical key 🔐',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/love-lock.jpg',
    primaryColor: '#e91e63',
    secondaryColor: '#c2185b',
    icon: '🔐',
    interactionType: 'love-lock'
  },
  {
    id: 'valentine-heart-explosion',
    name: 'Heart Explosion',
    description: 'Hearts burst from the center when they click - explosive love! 💥',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/heart-burst.jpg',
    primaryColor: '#ff4081',
    secondaryColor: '#f50057',
    icon: '💗',
    interactionType: 'heart-explosion'
  },
  {
    id: 'valentine-love-meter',
    name: 'Love Meter',
    description: 'Interactive slider that fills with love - watch it overflow! 💕',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/love-meter.jpg',
    primaryColor: '#ec407a',
    secondaryColor: '#d81b60',
    icon: '💝',
    interactionType: 'love-meter'
  },
  {
    id: 'valentine-fortune-heart',
    name: 'Fortune Heart',
    description: 'Crack open a fortune cookie heart to reveal your love message 🥠',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/fortune.jpg',
    primaryColor: '#f06292',
    secondaryColor: '#e91e63',
    icon: '🥠',
    interactionType: 'fortune-heart'
  },
  {
    id: 'valentine-spin-wheel',
    name: 'Wheel of Love',
    description: 'Spin the wheel - every option leads to "Be My Valentine!" 🎡',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/wheel.jpg',
    primaryColor: '#ad1457',
    secondaryColor: '#880e4f',
    icon: '🎡',
    interactionType: 'spin-wheel'
  },
  // ========== PREMIUM VALENTINE TEMPLATE ==========
  {
    id: 'valentine-love-story',
    name: 'Love Story Journey',
    description: '✨ PREMIUM: A multi-page love story with 5 interactive chapters - customize each page with your own messages and photos!',
    category: 'valentine',
    subCategory: 'be-my-valentine',
    previewImage: '/templates/love-story.jpg',
    primaryColor: '#ff1744',
    secondaryColor: '#d50000',
    icon: '📖',
    interactionType: 'story-pages',
    isPremium: true,
    defaultPages: [
      {
        id: 'page-1',
        title: 'Chapter 1: The Beginning',
        content: 'When I first saw you, my heart knew something magical was about to happen...',
        interactionType: 'tap-to-reveal'
      },
      {
        id: 'page-2',
        title: 'Chapter 2: Growing Closer',
        content: 'Every moment with you became a treasure I never knew I was looking for...',
        interactionType: 'swipe-hearts'
      },
      {
        id: 'page-3',
        title: 'Chapter 3: The Realization',
        content: 'I realized you were not just someone special - you were my everything...',
        interactionType: 'hold-to-fill'
      },
      {
        id: 'page-4',
        title: 'Chapter 4: My Promise',
        content: 'I promise to love you, cherish you, and make you smile every single day...',
        interactionType: 'scratch-reveal'
      },
      {
        id: 'page-5',
        title: 'Chapter 5: The Question',
        content: 'And now, I have one very important question to ask you...',
        interactionType: 'puzzle-piece'
      }
    ]
  },
  // ========== OTHER VALENTINE TEMPLATES ==========
  {
    id: 'love-letter-reveal',
    name: 'Love Letter',
    description: 'A romantic letter that reveals your message with typewriter effect',
    category: 'valentine',
    previewImage: '/templates/love-letter.jpg',
    primaryColor: '#e74c88',
    secondaryColor: '#8b0a3d',
    icon: '💌',
    interactionType: 'typewriter'
  },
  {
    id: 'roses-bloom',
    name: 'Roses Bloom',
    description: 'Watch roses bloom and reveal your heartfelt message',
    category: 'valentine',
    previewImage: '/templates/roses.jpg',
    primaryColor: '#ff0a54',
    secondaryColor: '#a4133c',
    icon: '🌹',
    interactionType: 'bloom'
  },
  // ========== BIRTHDAY TEMPLATES ==========
  {
    id: 'birthday-blast',
    name: 'Birthday Blast',
    description: 'Celebrate with confetti, balloons, and cake!',
    category: 'birthday',
    previewImage: '/templates/birthday.jpg',
    primaryColor: '#ffd93d',
    secondaryColor: '#ff6b6b',
    icon: '🎂'
  },
  {
    id: 'party-vibes',
    name: 'Party Vibes',
    description: 'Get the party started with neon lights and music',
    category: 'birthday',
    previewImage: '/templates/party.jpg',
    primaryColor: '#6c5ce7',
    secondaryColor: '#ff0080',
    icon: '🎉'
  },
  // ========== CONGRATULATIONS TEMPLATES ==========
  {
    id: 'congratulations-gold',
    name: 'Golden Achievement',
    description: 'Celebrate success with sparkling gold confetti',
    category: 'congratulations',
    previewImage: '/templates/congrats.jpg',
    primaryColor: '#ffd700',
    secondaryColor: '#b8860b',
    icon: '🏆'
  },
  // ========== ANNIVERSARY TEMPLATES ==========
  {
    id: 'anniversary-love',
    name: 'Anniversary Special',
    description: 'Celebrate your beautiful journey together',
    category: 'anniversary',
    previewImage: '/templates/anniversary.jpg',
    primaryColor: '#e91e63',
    secondaryColor: '#9c27b0',
    icon: '💍'
  }
];

// Get template by ID
export function getTemplateById(id: string): Template | undefined {
  return templates.find(t => t.id === id);
}

// Get templates by category
export function getTemplatesByCategory(category: Template['category']): Template[] {
  return templates.filter(t => t.category === category);
}

// Get "Be My Valentine" templates
export function getBeMyValentineTemplates(): Template[] {
  return templates.filter(t => t.subCategory === 'be-my-valentine');
}

// Get Valentine templates that are NOT "Be My Valentine"
export function getOtherValentineTemplates(): Template[] {
  return templates.filter(t => t.category === 'valentine' && !t.subCategory);
}
