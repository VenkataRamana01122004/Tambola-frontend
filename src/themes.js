const themes = {
   darkGradient: {
  name: "Dark Gradient",
  colors: {
    primaryGradient: "linear-gradient(145deg, #0a1221, #111827)",
    border: "rgba(148, 163, 184, 0.25)",
    shadow: "rgba(0, 0, 0, 0.5)",
    text: "#e5e7eb",       // light text for dark background
    background: "#0a1221", // fallback background
  },
  borderRadius: 16,
  padding: 16,
},
midnightBlue: {
    name: "Midnight Blue",
    colors: {
      primaryGradient: "linear-gradient(145deg, #020617, #020b2d)",
      border: "rgba(99, 102, 241, 0.25)",
      shadow: "rgba(0, 0, 0, 0.6)",
      text: "#e0e7ff",
      background: "#020617",
    },
    borderRadius: 16,
    padding: 16,
  },

  cyberPurple: {
    name: "Cyber Purple",
    colors: {
      primaryGradient: "linear-gradient(145deg, #1e0033, #3b0764)",
      border: "rgba(192, 132, 252, 0.35)",
      shadow: "rgba(0, 0, 0, 0.55)",
      text: "#f5d0fe",
      background: "#1e0033",
    },
    borderRadius: 16,
    padding: 16,
  },

  forestDark: {
    name: "Forest Dark",
    colors: {
      primaryGradient: "linear-gradient(145deg, #052e16, #064e3b)",
      border: "rgba(52, 211, 153, 0.3)",
      shadow: "rgba(0, 0, 0, 0.5)",
      text: "#d1fae5",
      background: "#052e16",
    },
    borderRadius: 16,
    padding: 16,
  },

  sunsetGlow: {
    name: "Sunset Glow",
    colors: {
      primaryGradient: "linear-gradient(145deg, #7c2d12, #9a3412)",
      border: "rgba(251, 146, 60, 0.4)",
      shadow: "rgba(0, 0, 0, 0.45)",
      text: "#ffedd5",
      background: "#7c2d12",
    },
    borderRadius: 16,
    padding: 16,
  },

  graphite: {
    name: "Graphite",
    colors: {
      primaryGradient: "linear-gradient(145deg, #111111, #1f1f1f)",
      border: "rgba(255, 255, 255, 0.15)",
      shadow: "rgba(0, 0, 0, 0.7)",
      text: "#f3f4f6",
      background: "#111111",
    },
    borderRadius: 16,
    padding: 16,
  },
  aurora: {
    name: "Aurora",
    colors: {
      primaryGradient: "linear-gradient(145deg, #0f2027, #203a43, #2c5364)",
      border: "rgba(56, 189, 248, 0.35)",
      shadow: "rgba(0, 0, 0, 0.55)",
      text: "#e0f2fe",
      background: "#0f2027",
    },
    borderRadius: 18,
    padding: 16,
  },

  neonNight: {
    name: "Neon Night",
    colors: {
      primaryGradient: "linear-gradient(145deg, #020024, #090979, #00d4ff)",
      border: "rgba(34, 211, 238, 0.45)",
      shadow: "rgba(0, 0, 0, 0.65)",
      text: "#ecfeff",
      background: "#020024",
    },
    borderRadius: 18,
    padding: 16,
  },

  roseObsidian: {
    name: "Rose Obsidian",
    colors: {
      primaryGradient: "linear-gradient(145deg, #1f0a15, #4a044e)",
      border: "rgba(236, 72, 153, 0.4)",
      shadow: "rgba(0, 0, 0, 0.55)",
      text: "#fce7f3",
      background: "#1f0a15",
    },
    borderRadius: 18,
    padding: 16,
  },

  emeraldGlow: {
    name: "Emerald Glow",
    colors: {
      primaryGradient: "linear-gradient(145deg, #022c22, #064e3b)",
      border: "rgba(16, 185, 129, 0.45)",
      shadow: "rgba(0, 0, 0, 0.5)",
      text: "#d1fae5",
      background: "#022c22",
    },
    borderRadius: 18,
    padding: 16,
  },

  cosmicVoid: {
    name: "Cosmic Void",
    colors: {
      primaryGradient: "linear-gradient(145deg, #05010a, #0f0529, #1b0c3f)",
      border: "rgba(168, 85, 247, 0.35)",
      shadow: "rgba(0, 0, 0, 0.7)",
      text: "#ede9fe",
      background: "#05010a",
    },
    borderRadius: 20,
    padding: 16,
  },

  moltenGold: {
    name: "Molten Gold",
    colors: {
      primaryGradient: "linear-gradient(145deg, #2a1500, #7c2d12, #f59e0b)",
      border: "rgba(245, 158, 11, 0.45)",
      shadow: "rgba(0, 0, 0, 0.55)",
      text: "#fffbeb",
      background: "#2a1500",
    },
    borderRadius: 18,
    padding: 16,
  },
  lavaRed: {
    name: "Lava Red",
    colors: {
      primaryGradient: "linear-gradient(145deg, #3b0000, #7f1d1d, #dc2626)",
      border: "rgba(248, 113, 113, 0.45)",
      shadow: "rgba(0, 0, 0, 0.6)",
      text: "#fee2e2",
      background: "#3b0000",
    },
    borderRadius: 20,
    padding: 16,
  },

  infernoOrange: {
    name: "Inferno Orange",
    colors: {
      primaryGradient: "linear-gradient(145deg, #431407, #9a3412, #f97316)",
      border: "rgba(251, 146, 60, 0.5)",
      shadow: "rgba(0, 0, 0, 0.55)",
      text: "#ffedd5",
      background: "#431407",
    },
    borderRadius: 20,
    padding: 16,
  },

  hotPink: {
    name: "Hot Pink",
    colors: {
      primaryGradient: "linear-gradient(145deg, #2a001f, #831843, #ec4899)",
      border: "rgba(244, 114, 182, 0.5)",
      shadow: "rgba(0, 0, 0, 0.55)",
      text: "#fce7f3",
      background: "#2a001f",
    },
    borderRadius: 20,
    padding: 16,
  },

  electricCrimson: {
    name: "Electric Crimson",
    colors: {
      primaryGradient: "linear-gradient(145deg, #1f0000, #5f0000, #b91c1c)",
      border: "rgba(239, 68, 68, 0.45)",
      shadow: "rgba(0, 0, 0, 0.65)",
      text: "#fee2e2",
      background: "#1f0000",
    },
    borderRadius: 20,
    padding: 16,
  },

  solarFlare: {
    name: "Solar Flare",
    colors: {
      primaryGradient: "linear-gradient(145deg, #2e0f00, #92400e, #facc15)",
      border: "rgba(250, 204, 21, 0.55)",
      shadow: "rgba(0, 0, 0, 0.5)",
      text: "#fefce8",
      background: "#2e0f00",
    },
    borderRadius: 20,
    padding: 16,
  },

  magmaPurple: {
    name: "Magma Purple",
    colors: {
      primaryGradient: "linear-gradient(145deg, #1a001f, #4a044e, #a21caf)",
      border: "rgba(217, 70, 239, 0.45)",
      shadow: "rgba(0, 0, 0, 0.6)",
      text: "#fae8ff",
      background: "#1a001f",
    },
    borderRadius: 20,
    padding: 16,
  },
  pinkGradient: {
    name: "Pink Gradient",
    colors: {
      primaryGradient: "linear-gradient(145deg, #ffc0cb, #ffb6c1)",
      border: "rgba(255, 192, 203, 0.5)",
      shadow: "rgba(255, 105, 180, 0.5)",
      text: "#333",
      background: "#fff",
    },
    borderRadius: 16,
    padding: 16,
  },
  blueGradient: {
    name: "Blue Gradient",
    colors: {
      primaryGradient: "linear-gradient(145deg, #4a90e2, #50a0f0)",
      border: "rgba(74, 144, 226, 0.5)",
      shadow: "rgba(74, 144, 226, 0.3)",
      text: "#fff",
      background: "#f0f8ff",
    },
    borderRadius: 16,
    padding: 16,
  },
  orangeGradient: {
  name: "Orange Gradient",
  colors: {
    primaryGradient: "linear-gradient(145deg, #ffa500, #ff8c00)", // orange tones
    border: "rgba(255, 165, 0, 0.5)",
    shadow: "rgba(255, 140, 0, 0.5)",
    text: "#333",           // dark text for light orange
    background: "#fff3e0",  // light orange background
  },
  borderRadius: 16,
  padding: 16,
},

yellowGradient: {
  name: "Yellow Gradient",
  colors: {
    primaryGradient: "linear-gradient(145deg, #fff700, #ffea00)", // yellow tones
    border: "rgba(255, 235, 0, 0.5)",
    shadow: "rgba(255, 214, 0, 0.5)",
    text: "#333",          // dark text for bright yellow
    background: "#fffde7", // light yellow background
  },
  borderRadius: 16,
  padding: 16,
},
greenGradient: {
  name: "Green Gradient",
  colors: {
    primaryGradient: "linear-gradient(145deg, #32cd32, #228b22)", // lime to forest green
    border: "rgba(50, 205, 50, 0.5)",
    shadow: "rgba(34, 139, 34, 0.5)",
    text: "#fff",          // light text for dark green
    background: "#1e3a1e", // fallback dark green background
  },
  borderRadius: 16,
  padding: 16,
},

purpleGradient: {
  name: "Purple Gradient",
  colors: {
    primaryGradient: "linear-gradient(145deg, #9370db, #6a5acd)", // medium purple to slate blue
    border: "rgba(147, 112, 219, 0.5)",
    shadow: "rgba(106, 90, 205, 0.5)",
    text: "#fff",          // light text for purple
    background: "#2e1a4c", // dark fallback background
  },
  borderRadius: 16,
  padding: 16,
}

  // Add more themes here like green, purple, etc.
};

export default themes;