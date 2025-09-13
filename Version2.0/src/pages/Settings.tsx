
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Check, 
  Palette, 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff,
  Zap,
  Save,
  RotateCcw,
  Paintbrush
} from "lucide-react";
import { toast } from "sonner";

// Sound effect utility
const playSound = (type: 'success' | 'error' | 'click' = 'click') => {
  // Create a simple beep sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Different frequencies for different sound types
  const frequencies = {
    success: 800,
    error: 400,
    click: 600
  };
  
  oscillator.frequency.setValueAtTime(frequencies[type], audioContext.currentTime);
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0, audioContext.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.1);
};

const Settings = () => {
  const { currentTheme, setTheme, setCustomTheme, themes } = useTheme();
  
  // Custom theme state
  const [customTheme, setCustomThemeState] = useState({
    id: 'custom',
    name: 'Custom',
    background: '#080818',
    backgroundSecondary: '#0c0c1e',
    accent: '#6366f1',
    accentHover: '#4f46e5'
  });
  
  // Settings state
  const [settings, setSettings] = useState({
    darkMode: true,
    soundEffects: true,
    animations: true,
    autoSave: true,
    compactMode: false,
    showAnimations: true,
    reducedMotion: false
  });

  // Auto-save functionality
  const [autoSaveTimeout, setAutoSaveTimeout] = useState<NodeJS.Timeout | null>(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('user-settings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error('Failed to parse saved settings:', error);
      }
    }

    // Load custom theme if it exists
    const savedCustomTheme = localStorage.getItem('custom-theme');
    if (savedCustomTheme) {
      try {
        const parsed = JSON.parse(savedCustomTheme);
        setCustomThemeState(parsed);
      } catch (error) {
        console.error('Failed to parse custom theme:', error);
      }
    }
  }, []);

  // Apply settings whenever they change
  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('user-settings', JSON.stringify(settings));
    
    // Apply dark mode
    document.documentElement.classList.toggle('dark', settings.darkMode);
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
      document.documentElement.style.setProperty('--transition-duration', '0s');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      document.documentElement.style.removeProperty('--transition-duration');
    }
    
    // Apply compact mode
    if (settings.compactMode) {
      document.documentElement.classList.add('compact-mode');
      document.documentElement.style.setProperty('--spacing-multiplier', '0.75');
    } else {
      document.documentElement.classList.remove('compact-mode');
      document.documentElement.style.removeProperty('--spacing-multiplier');
    }

    // Apply animations setting
    if (!settings.animations) {
      document.documentElement.classList.add('no-animations');
    } else {
      document.documentElement.classList.remove('no-animations');
    }
  }, [settings]);

  // Auto-save functionality
  useEffect(() => {
    if (settings.autoSave && unsavedChanges) {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
      
      const timeout = setTimeout(() => {
        localStorage.setItem('user-settings', JSON.stringify(settings));
        setUnsavedChanges(false);
        if (settings.soundEffects) {
          playSound('success');
        }
        toast.success("Settings auto-saved!");
      }, 2000);
      
      setAutoSaveTimeout(timeout);
    }
    
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout);
      }
    };
  }, [settings, unsavedChanges, autoSaveTimeout]);

  const updateSetting = (key: keyof typeof settings, value: boolean) => {
    // Play sound effect if enabled
    if (settings.soundEffects) {
      playSound('click');
    }
    
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    setUnsavedChanges(true);
    
    // Show different toast based on the setting
    const settingNames: Record<keyof typeof settings, string> = {
      darkMode: 'Dark Mode',
      soundEffects: 'Sound Effects',
      animations: 'Animations',
      autoSave: 'Auto Save',
      compactMode: 'Compact Mode',
      showAnimations: 'Show Animations',
      reducedMotion: 'Reduced Motion'
    };
    
    toast.success(`${settingNames[key]} has been ${value ? 'enabled' : 'disabled'}.`);
  };

  const handleCustomThemeChange = (property: string, value: string) => {
    setCustomThemeState(prev => ({
      ...prev,
      [property]: value
    }));
  };

  const applyCustomTheme = () => {
    if (settings.soundEffects) {
      playSound('success');
    }
    setCustomTheme(customTheme);
    toast.success("Custom theme applied successfully!");
  };

  const resetToDefaults = () => {
    if (settings.soundEffects) {
      playSound('click');
    }
    
    const defaultSettings = {
      darkMode: true,
      soundEffects: true,
      animations: true,
      autoSave: true,
      compactMode: false,
      showAnimations: true,
      reducedMotion: false
    };
    
    setSettings(defaultSettings);
    setTheme('pride');
    
    toast.success("All settings have been reset to their default values.");
  };

  const exportSettings = () => {
    if (settings.soundEffects) {
      playSound('success');
    }
    
    const settingsData = {
      userSettings: settings,
      selectedTheme: currentTheme.id,
      customTheme: customTheme,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(settingsData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
    
    toast.success("Your settings have been exported successfully.");
  };

  const manualSave = () => {
    if (settings.soundEffects) {
      playSound('success');
    }
    
    localStorage.setItem('user-settings', JSON.stringify(settings));
    setUnsavedChanges(false);
    toast.success("Settings saved manually!");
  };

  return (
    <div className="responsive-container py-responsive">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <SettingsIcon className="h-8 w-8 text-primary" />
            <h1 className="text-responsive-3xl font-bold text-gradient">
              Settings
            </h1>
            <Palette className="h-6 w-6 text-primary/60" />
          </div>
          <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
            Customize your experience and make the app truly yours.
          </p>
          {unsavedChanges && !settings.autoSave && (
            <div className="mt-4">
              <Badge variant="outline" className="text-amber-500 border-amber-500">
                You have unsaved changes
              </Badge>
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Theme Settings */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Themes
                </CardTitle>
                <CardDescription>
                  Choose your preferred color scheme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 hover:scale-102 ${
                        currentTheme.id === theme.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => {
                        if (settings.soundEffects) {
                          playSound('click');
                        }
                        setTheme(theme.id);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            <div 
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: theme.background }}
                            />
                            <div 
                              className="w-4 h-4 rounded-full border border-border"
                              style={{ backgroundColor: theme.accent }}
                            />
                          </div>
                          <span className="font-medium">{theme.name}</span>
                        </div>
                        {currentTheme.id === theme.id && (
                          <Check className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Custom Theme Editor */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Paintbrush className="h-5 w-5" />
                  Custom Theme
                </CardTitle>
                <CardDescription>
                  Create your own color scheme
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bg-color" className="text-sm font-medium">Background Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="bg-color"
                        type="color"
                        value={customTheme.background}
                        onChange={(e) => handleCustomThemeChange('background', e.target.value)}
                        className="w-12 h-10 p-1 border-0"
                      />
                      <Input
                        type="text"
                        value={customTheme.background}
                        onChange={(e) => handleCustomThemeChange('background', e.target.value)}
                        className="flex-1"
                        placeholder="#080818"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="bg-secondary-color" className="text-sm font-medium">Secondary Background</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="bg-secondary-color"
                        type="color"
                        value={customTheme.backgroundSecondary}
                        onChange={(e) => handleCustomThemeChange('backgroundSecondary', e.target.value)}
                        className="w-12 h-10 p-1 border-0"
                      />
                      <Input
                        type="text"
                        value={customTheme.backgroundSecondary}
                        onChange={(e) => handleCustomThemeChange('backgroundSecondary', e.target.value)}
                        className="flex-1"
                        placeholder="#0c0c1e"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent-color" className="text-sm font-medium">Accent Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="accent-color"
                        type="color"
                        value={customTheme.accent}
                        onChange={(e) => handleCustomThemeChange('accent', e.target.value)}
                        className="w-12 h-10 p-1 border-0"
                      />
                      <Input
                        type="text"
                        value={customTheme.accent}
                        onChange={(e) => handleCustomThemeChange('accent', e.target.value)}
                        className="flex-1"
                        placeholder="#6366f1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent-hover-color" className="text-sm font-medium">Accent Hover Color</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="accent-hover-color"
                        type="color"
                        value={customTheme.accentHover}
                        onChange={(e) => handleCustomThemeChange('accentHover', e.target.value)}
                        className="w-12 h-10 p-1 border-0"
                      />
                      <Input
                        type="text"
                        value={customTheme.accentHover}
                        onChange={(e) => handleCustomThemeChange('accentHover', e.target.value)}
                        className="flex-1"
                        placeholder="#4f46e5"
                      />
                    </div>
                  </div>

                  <Button onClick={applyCustomTheme} className="w-full">
                    <Paintbrush className="mr-2 h-4 w-4" />
                    Apply Custom Theme
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* App Settings */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SettingsIcon className="h-5 w-5" />
                  App Preferences
                </CardTitle>
                <CardDescription>
                  Customize how the app behaves
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                      <div>
                        <Label htmlFor="dark-mode" className="font-medium">Dark Mode</Label>
                        <p className="text-xs text-muted-foreground">Toggle between light and dark themes</p>
                      </div>
                    </div>
                    <Switch
                      id="dark-mode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => updateSetting('darkMode', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.soundEffects ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                      <div>
                        <Label htmlFor="sound-effects" className="font-medium">Sound Effects</Label>
                        <p className="text-xs text-muted-foreground">Play sounds for interactions</p>
                      </div>
                    </div>
                    <Switch
                      id="sound-effects"
                      checked={settings.soundEffects}
                      onCheckedChange={(checked) => updateSetting('soundEffects', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <div>
                        <Label htmlFor="animations" className="font-medium">Animations</Label>
                        <p className="text-xs text-muted-foreground">Enable smooth animations</p>
                      </div>
                    </div>
                    <Switch
                      id="animations"
                      checked={settings.animations}
                      onCheckedChange={(checked) => updateSetting('animations', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Save className="h-4 w-4" />
                      <div>
                        <Label htmlFor="auto-save" className="font-medium">Auto Save</Label>
                        <p className="text-xs text-muted-foreground">Automatically save changes</p>
                      </div>
                    </div>
                    <Switch
                      id="auto-save"
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => updateSetting('autoSave', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {settings.compactMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      <div>
                        <Label htmlFor="compact-mode" className="font-medium">Compact Mode</Label>
                        <p className="text-xs text-muted-foreground">Reduce spacing for denser layout</p>
                      </div>
                    </div>
                    <Switch
                      id="compact-mode"
                      checked={settings.compactMode}
                      onCheckedChange={(checked) => updateSetting('compactMode', checked)}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <div>
                        <Label htmlFor="reduced-motion" className="font-medium">Reduced Motion</Label>
                        <p className="text-xs text-muted-foreground">Minimize animations for accessibility</p>
                      </div>
                    </div>
                    <Switch
                      id="reduced-motion"
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Settings Actions */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Settings Management</CardTitle>
                <CardDescription>
                  Manage your settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  {!settings.autoSave && (
                    <Button 
                      onClick={manualSave}
                      className="w-full"
                      disabled={!unsavedChanges}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Settings
                    </Button>
                  )}
                  
                  <Button 
                    onClick={exportSettings}
                    variant="outline"
                    className="w-full"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Export Settings
                  </Button>
                  
                  <Button 
                    onClick={resetToDefaults}
                    variant="outline"
                    className="w-full"
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                </div>
                
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Current Theme</Badge>
                    <span className="text-sm font-medium">{currentTheme.name}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Settings are {settings.autoSave ? 'automatically' : 'manually'} saved to your browser's local storage.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
