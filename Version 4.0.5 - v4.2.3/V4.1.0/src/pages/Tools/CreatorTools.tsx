
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CreatorTools = () => {
  const tools = [
    {
      name: "FiveM Resources Checker",
      creator: "Sophia",
      description: "FiveM Resource checker is your GOTO Resources checker weather it is for Seeing if a creator is blacklisted OR it is checking if a resources is Compliant with the FiveM TOS//COC",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/FiveM-Resource-Checker.png",
      url: "https://fivemdb.net/resource-checker"
    },
    {
      name: "Rainmad FiveM & RedM Image Lib",
      creator: "Rainmad",
      description: "Rainmad imag lib is a Libary of Images for your FiveM & RedM Servers!",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/Rainmad-Image-Lib.png",
      url: "https://items.rainmad.com/"
    },
    {
      name: "FiveM Lore Friendly Car Pack",
      creator: "Sophia",
      description: "The largest Drag and Drop Lore Friendly FiveM Car Pack",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/FiveM-Lore-Vehicle-Pack.png",
      url: "https://github.com/SophiaDLL/FiveM-Lore-Civ-Car-Pack"
    },
    {
      name: "5Metrics",
      creator: "Loaf",
      description: "5 Metrics is a Server list tool that allows you to search for servers & resources!!",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/5Metrics.png",
      url: "https://5metrics.dev/"
    },
    {
      name: "Resources Converter",
      creator: "ZeroDream",
      description: "ZeroDream's Resources converter is an easy tool where you upload the rar file and it converts it to a FiveM Ready resources like that.",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/Resource-Converter.png",
      url: "https://gta5mods.hk416.org/"
    },
    {
      name: "jgscripts Artifacts Tool",
      creator: "JGScripts",
      description: "This is a tool made to see what FiveM Server Artifacts is stable and has no issues.",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/JGScripts-Artifacts-Tool.png",
      url: "https://artifacts.jgscripts.com/"
    },
    {
      name: "sky-systems images",
      creator: "sky-systems",
      description: "an open lib or FiveM & RedM Images",
      image: "https://cdn.velocitynet.work/5DB/Creator%20Tools/Sky-System-Image-Lib.png",
      url: "https://images.sky-systems.net/"
    },
    {
      name: "FiveList",
      creator: "Steelzz",
      description: "A powerful, fully branded whitelist system built for FiveM servers. FiveList makes applications easy with Discord login, automatic role assignment, SEO-optimised listings, and clean dashboards — all without needing forums or clunky forms",
      image: "https://firebasestorage.googleapis.com/v0/b/fivelist-d4a5d.firebasestorage.app/o/logos%2F1751237815894_FiveListFill.png?alt=media&token=bdf0c348-1353-4df1-8267-a9bd43c6b3b2", // Please do not upload a discord CDN Link, if you do not own a CDN Please provide us the logo in 1080x1080 (SQUARE)
      url: "https://fivelist.app/"
    } 

  ];

  const handleToolClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              Creator Tools
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Discover powerful tools created by the community to enhance your FiveM development experience
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {tools.map((tool, index) => (
              <Card 
                key={index} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                onClick={() => handleToolClick(tool.url)}
              >
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={tool.image} 
                    alt={tool.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2 md:pb-3 p-4 md:p-6">
                  <CardTitle className="text-white text-base md:text-lg line-clamp-2">
                    {tool.name}
                  </CardTitle>
                  <CardDescription className="text-blue-400 font-medium text-sm">
                    by {tool.creator}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 p-4 md:p-6">
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
                    {tool.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreatorTools;
