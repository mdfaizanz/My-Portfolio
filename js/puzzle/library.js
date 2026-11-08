/* =========================================================
   library.js — every picture the puzzle can show.

   Add a picture:    add  ['🦁', 'Lion']  to any category's `items`.
   Add a category:   copy a block, change id / label / icon / hue.
   Remove anything:  delete the line — nothing else depends on it.

   hue (0–360) sets the colour mood of that category's backgrounds.
   ========================================================= */
App.puzzle = App.puzzle || {};

App.puzzle.library = [
  {
    id: 'animals', label: 'Animals', icon: '🦁', hue: 30,
    items: [
      ['🦁', 'Lion'], ['🐘', 'Elephant'], ['🦒', 'Giraffe'], ['🐼', 'Panda'],
      ['🦊', 'Fox'], ['🐯', 'Tiger'], ['🦓', 'Zebra'], ['🐨', 'Koala'],
      ['🦘', 'Kangaroo'], ['🐺', 'Wolf'], ['🐻', 'Bear'], ['🦌', 'Deer']
    ]
  },
  {
    id: 'fruits', label: 'Fruits', icon: '🍓', hue: 350,
    items: [
      ['🍎', 'Apple'], ['🍌', 'Banana'], ['🍇', 'Grapes'], ['🍉', 'Watermelon'],
      ['🍓', 'Strawberry'], ['🍍', 'Pineapple'], ['🥭', 'Mango'], ['🍑', 'Peach'],
      ['🍒', 'Cherries'], ['🥝', 'Kiwi'], ['🍋', 'Lemon'], ['🍊', 'Orange']
    ]
  },
  {
    id: 'tech', label: 'Tech Devices', icon: '💻', hue: 220,
    items: [
      ['💻', 'Laptop'], ['📱', 'Smartphone'], ['⌚', 'Smartwatch'], ['🎧', 'Headphones'],
      ['📷', 'Camera'], ['🖥️', 'Desktop PC'], ['🎮', 'Game Controller'], ['🖨️', 'Printer'],
      ['🔋', 'Battery'], ['⌨️', 'Keyboard'], ['🖱️', 'Mouse'], ['📺', 'Television']
    ]
  },
  {
    id: 'sea', label: 'Sea Animals', icon: '🐙', hue: 190,
    items: [
      ['🐙', 'Octopus'], ['🐬', 'Dolphin'], ['🐳', 'Whale'], ['🦈', 'Shark'],
      ['🐢', 'Sea Turtle'], ['🦀', 'Crab'], ['🦑', 'Squid'], ['🐠', 'Tropical Fish'],
      ['🐡', 'Pufferfish'], ['🦞', 'Lobster'], ['🐚', 'Seashell'], ['🦐', 'Shrimp']
    ]
  },
  {
    id: 'birds', label: 'Birds', icon: '🦜', hue: 135,
    items: [
      ['🦜', 'Parrot'], ['🦉', 'Owl'], ['🦚', 'Peacock'], ['🦩', 'Flamingo'],
      ['🦅', 'Eagle'], ['🦆', 'Duck'], ['🐧', 'Penguin'], ['🕊️', 'Dove'],
      ['🦢', 'Swan'], ['🐓', 'Rooster'], ['🐦', 'Songbird'], ['🦃', 'Turkey']
    ]
  },
  {
    id: 'mansions', label: 'Mansions & Palaces', icon: '🏰', hue: 265,
    items: [
      ['🏰', 'Grand Castle'], ['🏯', 'Japanese Castle'], ['🏡', 'Country House'],
      ['🏠', 'Family Home'], ['🏨', 'Grand Hotel'], ['⛪', 'Chapel'],
      ['🕌', 'Mosque'], ['🛕', 'Hindu Temple'], ['🏘️', 'Village Houses']
    ]
  },
  {
    id: 'history', label: 'Historical Views', icon: '🏛️', hue: 45,
    items: [
      ['🗽', 'Statue of Liberty'], ['🗿', 'Moai Statue'], ['🏛️', 'Classical Temple'],
      ['🏟️', 'Ancient Arena'], ['⛩️', 'Shinto Shrine'], ['🗼', 'Tokyo Tower'],
      ['🏺', 'Ancient Amphora'], ['🗺️', 'Old World Map'], ['📜', 'Ancient Scroll'],
      ['⚓', 'Old Anchor'], ['🧭', 'Compass'], ['⚔️', 'Crossed Swords']
    ]
  },
  {
    id: 'scenery', label: 'Sceneries', icon: '🌄', hue: 320,
    items: [
      ['🏔️', 'Snowy Mountain'], ['🌋', 'Volcano'], ['🏜️', 'Desert'], ['🏝️', 'Tropical Island'],
      ['🌅', 'Sunrise'], ['🌄', 'Mountain Sunrise'], ['🌌', 'Milky Way'], ['🌈', 'Rainbow'],
      ['🏞️', 'National Park'], ['🌇', 'City Sunset'], ['🌃', 'Night City'], ['🌉', 'Bridge at Night']
    ]
  }
];
