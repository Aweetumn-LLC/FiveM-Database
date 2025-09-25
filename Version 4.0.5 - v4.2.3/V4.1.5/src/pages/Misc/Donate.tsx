
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ExternalLink, Gift, Info } from "lucide-react";
import { Helmet } from "react-helmet";

const Donate = () => {
  const charities = [
    {
      name: "Mermaids UK",
      url: "https://mermaidsuk.org.uk/",
      description: "Supporting transgender and gender-diverse children and young people"
    },
    {
      name: "Trans Actual",
      url: "https://transactual.org.uk/",
      description: "Campaigning for trans rights and equality in the UK"
    },
    {
      name: "Chance UK",
      url: "https://chanceuk.com/exclusions-2/",
      description: "Supporting young people at risk of social exclusion"
    },
    {
      name: "Cancer Research UK",
      url: "https://www.cancerresearchuk.org/",
      description: "Leading charity dedicated to beating cancer through research"
    },
    {
      name: "Macmillan Cancer Support",
      url: "https://www.macmillan.org.uk/",
      description: "Providing support for people affected by cancer"
    }
  ];

  return (
    <Layout 
      title="Donate | FiveM DB" 
      description="Learn about FiveM DB's non-profit nature and find recommended charities to support."
    >
      <Helmet>
        <title>Donate & Support | FiveM Database - Support Meaningful Causes</title>
        <meta name="description" content="Learn about FiveM Database's donation policy and discover meaningful charities to support instead. Find organizations making a real difference in communities." />
        <meta name="keywords" content="FiveM Database donations, charity support, community giving, transgender rights, cancer research, youth support, charitable organizations" />
        <link rel="canonical" href="https://fivemdb.net/donate" />
        <meta property="og:title" content="Donate & Support | FiveM Database - Support Meaningful Causes" />
        <meta property="og:description" content="Learn about FiveM Database's donation policy and discover meaningful charities to support instead." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/donate" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Donate & Support | FiveM Database" />
        <meta name="twitter:description" content="Learn about our donation policy and discover meaningful charities to support instead." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
      </Helmet>
      <div className="min-h-screen bg-gradient-radial from-background to-black/50">
        <div className="responsive-container py-responsive">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-red-400" />
              <h1 className="text-responsive-3xl font-display font-bold text-gradient">
                Donate
              </h1>
            </div>
            <p className="text-responsive-base text-white/70 max-w-3xl mx-auto leading-relaxed">
              Learn about our approach to donations and discover meaningful charities you can support instead.
            </p>
          </div>

          {/* FiveM DB Information */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-10 lg:mb-12">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gradient text-responsive-lg">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6" />
                  About FiveM DB
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-responsive-sm">
                      <strong>FiveM DB is entirely free to use</strong> - We believe in providing our service without any cost barriers to the community.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-responsive-sm">
                      <strong>FiveM DB  Uses Kofi</strong> - We strongly Work as a team and with this sometimes costs can be Expected to Arise, We take donations However we Hevily ablige that you spend your money else wise.
                      <p>
                        <strong>If you would like to donate you can do here </strong><a href="https://ko-fi.com/fivemdb" className="text-pink-400 underline hover:text-pink-300 hover:bg-pink-500/10 rounded px-1 transition-colors">
  Support FiveM DB
</a>
                      </p>
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-responsive-sm">
                      <strong>FiveM DB is entirely non-profit</strong> - Our platform operates without any profit motive or commercial interests.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-responsive-sm">
                      <strong>FiveM DB does not run adverts</strong> - We maintain a clean, ad-free experience for all our users.
                    </p>
                  </div>
                  
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-pink-400 mt-2 flex-shrink-0"></div>
                    <p className="text-white/90 text-responsive-sm">
                      <strong>FiveM DB's giveaways come out of pocket from Sophia</strong> - Unless a creator has done a partnership with FiveM DB, all giveaways are personally funded.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recommended Charities */}
          <div className="max-w-4xl mx-auto">
            <Card className="glass-card border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gradient text-responsive-lg">
                  <Gift className="h-5 w-5 sm:h-6 sm:w-6" />
                  Recommended Charities
                </CardTitle>
                <p className="text-white/70 text-responsive-sm">
                  Rather than support us, Why not support a Meaningfull Charity, here are some meaningful charities you might consider supporting instead:
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {charities.map((charity, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-white text-responsive-base mb-2">
                            {charity.name}
                          </h3>
                          <p className="text-white/70 text-responsive-xs leading-relaxed">
                            {charity.description}
                          </p>
                        </div>
                        <a
                          href={charity.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-responsive-xs font-medium whitespace-nowrap"
                        >
                          Visit Site
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Thank You Message */}
          <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
            <Card className="glass-card border-white/10 max-w-3xl mx-auto">
              <CardContent className="p-responsive">
                <h2 className="text-responsive-lg font-semibold text-gradient mb-3">
                  Thank You for Your Understanding
                </h2>
                <p className="text-white/70 text-responsive-sm leading-relaxed">
                  We appreciate your interest in supporting our mission. By keeping FiveM DB free and 
                  independent, we can continue serving the community without any conflicts of interest. 
                  If you'd like to make a positive impact, consider supporting one of the charities listed above.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Donate;
