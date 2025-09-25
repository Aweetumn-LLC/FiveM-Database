import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Crown, Shield, GitBranch, Github } from "lucide-react";
import { Helmet } from "react-helmet";

const Credits = () => {
  const owners = [
    {
      name: "Sophia",
      role: "Founder & Lead Developer",
      contribution: "Created and maintains the FiveM DB platform",
      discord: "@sophia.c33",
      github: "SophiaDLL"
    }
  ];

  const management = [
    {
      name: "badass falcon",
      role: "Technical Manager",
      contribution: "Oversees technical development",
      discord: "@badassfalcon",
      github: "Ezio121"
    }
  ];

  const contributors = [
    {
      name: "baldwin",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@baldwinthekingiv",
      github: "baldwinthekingiv"
    },
    {
      name: "Maddy",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@pkmaddy",
      github: "TRDMADDY"
    },
    {
      name: "rwixy",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@rwix",
      github: "rwixy"
    },
    {
      name: "Tabby",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@jbthemr.mood",
      github: "Tabby-Labs"
    },
    {
      name: "Marat",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@maratwc",
      github: "MaratWC"
    },
    {
      name: "lueflue",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@lueflue",
      github: "lueflue"
    },
    {
      name: "avocato",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@x_avocato_x",
      github: "xNaokix-exe"
    },
    {
      name: "Quasar",
      role: "Report Contributor",
      contribution: "Helps with Reporting Servers & Resources Directly with FiveM DB",
      discord: "@imnotquasar",
      github: "quasar-scripts"
    },
  ];

  const TeamSection = ({ title, members, icon: Icon, badgeColor }: {
    title: string;
    members: typeof owners;
    icon: any;
    badgeColor: string;
  }) => (
    <Card className="glass-card border-white/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gradient text-responsive-lg">
          <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-responsive">
        {members.map((member, index) => (
          <div key={index} className="p-3 sm:p-4 lg:p-6 rounded-lg bg-white/5 border border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <h3 className="font-semibold text-white text-responsive-base">{member.name}</h3>
              <Badge variant="outline" className={`${badgeColor} border-current text-xs sm:text-sm w-fit`}>
                {member.role}
              </Badge>
            </div>
            <p className="text-white/70 text-responsive-xs leading-relaxed mb-3">{member.contribution}</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-white/50 text-sm">Discord:</span>
                <span className="text-blue-400 text-sm font-mono">{member.discord}</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-white/50" />
                <span className="text-white/50 text-sm">GitHub:</span>
                <a 
                  href={`https://github.com/${member.github}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 text-sm font-mono hover:text-blue-300 transition-colors underline"
                >
                  {member.github}
                </a>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-radial from-background to-black/50">
      <Helmet>
        <title>Credits | FiveM DB</title>
        <meta name="description" content="Meet the FiveM DB team and contributors who power the community-driven compliance and blacklist database." />
        <link rel="canonical" href="https://fivemdb.net/credits" />
      </Helmet>
      <div className="responsive-container py-responsive">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-primary" />
            <h1 className="text-responsive-3xl font-display font-bold text-gradient">
              Credits
            </h1>
          </div>
          <p className="text-responsive-base text-white/70 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated team behind FiveM DB who work tirelessly to maintain and improve this community-driven platform.
          </p>
        </div>

        {/* Team Sections */}
        <div className="space-responsive max-w-5xl mx-auto">
          <TeamSection
            title="Owners"
            members={owners}
            icon={Crown}
            badgeColor="text-yellow-400"
          />
          
          <TeamSection
            title="Management"
            members={management}
            icon={Shield}
            badgeColor="text-blue-400"
          />
          
          <TeamSection
            title="Contributors"
            members={contributors}
            icon={GitBranch}
            badgeColor="text-green-400"
          />
        </div>

        {/* Thank You Section */}
        <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
          <Card className="glass-card border-white/10 max-w-3xl mx-auto">
            <CardContent className="p-responsive">
              <h2 className="text-responsive-lg font-semibold text-gradient mb-3">
                Thank You to Our Community
              </h2>
              <p className="text-white/70 text-responsive-sm leading-relaxed">
                We also want to thank all the community members who contribute by reporting issues, 
                providing feedback, and helping to make FiveM DB better for everyone. This platform 
                wouldn't be possible without your support.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Credits;
