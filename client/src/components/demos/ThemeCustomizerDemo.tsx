import { useState } from "react";
import { motion } from "framer-motion";
import { FaPalette, FaFont, FaAdjust } from "react-icons/fa";

interface ThemeConfig {
  primaryColor: string;
  fontSize: number;
  borderRadius: number;
  spacing: number;
}

const defaultTheme: ThemeConfig = {
  primaryColor: '#6366f1',
  fontSize: 14,
  borderRadius: 8,
  spacing: 16,
};

const colorOptions = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Purple', value: '#9333ea' },
  { name: 'Blue', value: '#3b82f6' },
  { name: 'Green', value: '#10b981' },
  { name: 'Pink', value: '#ec4899' },
  { name: 'Orange', value: '#f97316' },
];

export function ThemeCustomizerDemo() {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'layout'>('colors');

  const updateTheme = (updates: Partial<ThemeConfig>) => {
    setTheme(prev => ({ ...prev, ...updates }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 max-w-md">
      <h4 className="font-semibold mb-4 text-center">Theme Customizer</h4>
      
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        {[
          { id: 'colors', label: 'Colors', icon: <FaPalette /> },
          { id: 'typography', label: 'Type', icon: <FaFont /> },
          { id: 'layout', label: 'Layout', icon: <FaAdjust /> },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-1 px-3 py-2 rounded-md text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`tab-${tab.id}`}
          >
            {tab.icon}
            <span className="hidden sm:inline">{tab.label}</span>
          </motion.button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'colors' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Primary Color</label>
              <div className="grid grid-cols-3 gap-2">
                {colorOptions.map((color) => (
                  <motion.button
                    key={color.value}
                    onClick={() => updateTheme({ primaryColor: color.value })}
                    className={`w-full h-10 rounded-lg border-2 flex items-center justify-center text-xs font-medium text-white ${
                      theme.primaryColor === color.value ? 'border-foreground' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    data-testid={`color-${color.name.toLowerCase()}`}
                  >
                    {color.name}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'typography' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Font Size: {theme.fontSize}px</label>
              <input
                type="range"
                min="12"
                max="20"
                value={theme.fontSize}
                onChange={(e) => updateTheme({ fontSize: parseInt(e.target.value) })}
                className="w-full"
                data-testid="font-size-slider"
              />
            </div>
          </motion.div>
        )}

        {activeTab === 'layout' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-3"
          >
            <div>
              <label className="text-sm font-medium mb-2 block">Border Radius: {theme.borderRadius}px</label>
              <input
                type="range"
                min="0"
                max="20"
                value={theme.borderRadius}
                onChange={(e) => updateTheme({ borderRadius: parseInt(e.target.value) })}
                className="w-full"
                data-testid="border-radius-slider"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Spacing: {theme.spacing}px</label>
              <input
                type="range"
                min="8"
                max="32"
                value={theme.spacing}
                onChange={(e) => updateTheme({ spacing: parseInt(e.target.value) })}
                className="w-full"
                data-testid="spacing-slider"
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Preview Card */}
      <div className="mt-4 p-3 bg-background border rounded-lg">
        <div className="text-sm font-medium mb-2">Preview</div>
        <motion.div
          className="p-3 text-white rounded-lg"
          style={{
            backgroundColor: theme.primaryColor,
            fontSize: `${theme.fontSize}px`,
            borderRadius: `${theme.borderRadius}px`,
            padding: `${theme.spacing}px`,
          }}
          animate={{
            backgroundColor: theme.primaryColor,
            borderRadius: theme.borderRadius,
            padding: theme.spacing,
            fontSize: theme.fontSize,
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="font-medium">Sample Component</div>
          <div className="text-sm opacity-90 mt-1">This is how your theme looks!</div>
        </motion.div>
      </div>

      {/* Reset Button */}
      <motion.button
        onClick={resetTheme}
        className="w-full mt-4 px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm font-medium"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        data-testid="reset-theme-button"
      >
        Reset to Default
      </motion.button>

      <div className="mt-3 text-xs text-muted-foreground text-center">
        Demonstrates: State Management, Dynamic Styling, Component Props
      </div>
    </div>
  );
}