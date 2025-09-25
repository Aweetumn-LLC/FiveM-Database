
import { Heart } from 'lucide-react';

const AnnouncementBar = () => {

  return (
    <div className="fixed top-4 right-4 z-50 w-auto max-w-sm hidden md:block">
      <div className="bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 backdrop-blur-xl border border-white/10 rounded-xl shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
              <p className="text-xs text-white/90">
                <strong>Announcement</strong><br/>
                <Heart className="inline w-3 h-3 text-pink-400 fill-current mr-1" />
                <a 
                  href="https://ko-fi.com/fivemdb" 
                  className="text-pink-400 underline hover:text-pink-300 transition-colors text-xs"
                >
                  Support Nexora Data
                </a>
              </p>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
