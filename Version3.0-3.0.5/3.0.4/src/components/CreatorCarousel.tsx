
import { useEffect, useState } from "react";

// Manual creator data with shop names and logo links
const MANUAL_CREATORS_DATA = [
  {
    id: 1,
    name: "BS-Development",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/0957c952fe7116e460da23ee1dfe02045a4cbda1.png"
  },
  {
    id: 2,
    name: "IC3D MARKETPLACE",
    image: "https://i.ibb.co/Y44778WM/LOGO-IC3-D-Marketplace-2000x2000-Transparente-by-Design-Ideal-Copy.png"
  },
  {
    id: 3,
    name: "Uniqers Scripts",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/9312b8d8655fb1abc0d1adfe148ca0e081134c99.png"
  },
  {
    id: 4,
    name: "Pegasus Anticheat",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/1c502ec0d63eb6158e7e467b165f243c9d2ab9d0.png"
  },
  {
    id: 5,
    name: "BOII Development",
    image: "https://i.ibb.co/Myx615bZ/BG-LOGO-7.jpg"
  },
  {
    id: 6,
    name: "Revel Scripts",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/f659c805399b4ae3170baa6d281c5208ca1e1553.png"
  },
  {
    id: 7,
    name: "RTX Development",
    image: "https://cdn.laurelnwk.com/image_2025-05-24_163304781.png"
  },
  {
    id: 8,
    name: "Dynyx Scripts",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/558a2424dfac63bd9c53711157728cce3e93d84b.png"
  },
  {
    id: 9,
    name: "MRC",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/d227cf4764797085db757a3df0aa820f14a120d9.png"
  },
  {
    id: 10,
    name: "RAINMAD Scripts",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/eaeafef0c28a1dc1a2f3be1eafdcaaf9e12953ad.png"
  },
  {
    id: 11,
    name: "JG Scripts",
    image: "https://jgscripts.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fjg-scripts-logo.4d8a9a1c.png&w=3840&q=75"
  },
  {
    id: 12,
    name: "Quasar",
    image: "https://cdn.laurelnwk.com/image_2025-05-24_163358243.png"
  },
  {
    id: 13,
    name: "Wix Development",
    image: "https://dunb17ur4ymx4.cloudfront.net/webstore/logos/623791e4967ff2f8d9b7917e8dfb1cf13592ae95.png"
  },
  {
    id: 14,
    name: "Evolent",
    image: "https://i.ibb.co/nZ3s56g/Frame-1.png"
  },
  {
    id: 15,
    name: "CodeForge",
    image: "https://cdn.laurelnwk.com/Uploads/codeforge.png"
  },
  {
    id: 16,
    name: "1 of 1 Servers",
    image: "https://1of1servers.com/logos/1of1default.svg"
  },
  {
    id: 17,
    name: "Luxu",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/luxu2.png"
  },
  {
    id: 18,
    name: "Carotto Studios",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/carotto.png"
  },
  {
    id: 19,
    name: "Pro Gamer Netwokr",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/pgn.jpg"
  },
  {
    id: 20,
    name: "Velocity Network",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/VelocityNetwork.png"
  },
  {
    id: 21,
    name: "Big Bang Scripts",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/BBS.png"
  },
  {
    id: 22,
    name: "UZ Scripts",
    image: "https://cdn.laurelnwk.com/VelocityDriftNetwork/UZlogo.png"
  }
  // {
  //   id: 21,
  //   name: "REPLACE_NAME_HERE",
  //   image: "REPLACE_LINK_HERE" 
  // },
];

const CreatorCarousel = () => {
  const [duplicatedCreators, setDuplicatedCreators] = useState<any[]>([]);

  useEffect(() => {
    // Create multiple copies for seamless infinite scroll
    const duplicated = [
      ...MANUAL_CREATORS_DATA,
      ...MANUAL_CREATORS_DATA,
      ...MANUAL_CREATORS_DATA,
      ...MANUAL_CREATORS_DATA
    ];
    setDuplicatedCreators(duplicated);
  }, []);

  return (
    <div className="w-full max-w-12xl mx-auto overflow-hidden">
      <div className="text-center mb-8">
        <h3 className="text-4xl font-bold text-white mb-2">
          Creators that recommend our project
        </h3>
      </div>
      
      <div className="relative">
        <div 
          className="flex will-change-transform"
          style={{
            animation: 'scroll-infinite 60s linear infinite'
          }}
        >
          {duplicatedCreators.map((creator, index) => (
            <div
              key={`${creator.id}-${index}`}
              className="flex-shrink-0 w-80 mx-4 bg-gray-900/30 rounded-2xl border border-gray-700 p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 flex-shrink-0">
                  <img 
                    src={creator.image} 
                    alt={creator.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/64x64/333/fff?text=?";
                    }}
                  />
                </div>
                <div className="text-left">
                  <div className="text-white font-medium text-lg">
                    {creator.name}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">
                    Trusted Partner
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${MANUAL_CREATORS_DATA.length * 352}px);
          }
        }
      `}</style>
    </div>
  );
};

export default CreatorCarousel;
