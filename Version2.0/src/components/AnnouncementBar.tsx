
import { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg mx-auto">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 text-center">
              <p className="text-sm md:text-base text-white/90 leading-relaxed">
                <span className="inline-flex items-center gap-1">
                  <strong>Announcment</strong>
                </span>{" "}
               Enjoy FiveM DB?{" "}
                <Heart className="inline w-4 h-4 text-pink-400 fill-current" />{" "}
                - <em>Come support the project</em> by clicking this link  <a 
  href="https://ko-fi.com/fivemdb" 
  className="text-pink-400 underline hover:text-pink-300 hover:bg-pink-500/10 rounded px-1 transition-colors"
>
  SUPPORT 5MDB
</a>

              </p>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 h-auto min-w-0 shrink-0"
              aria-label="Close announcement"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
