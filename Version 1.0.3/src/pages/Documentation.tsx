
import { useState } from "react";
import { Book, Mail, Users, Target, Play, Code, Database, HelpCircle } from "lucide-react";
import Layout from "@/components/Layout";

{/*
   #### USEFULL TOOLS FOR THE DOCUMENTATION!!

  <P></P> //This is paragraphs
  
  <h2 class="text-2xl font-bold mb-4"></h2> // This is for headings and font
  
  <h3 class="text-xl font-semibold mb-2"></h3> // diffirent font heading
  
  // Number based
  <ol>
  >li></li> // Makes libiry drop down same as how discord utilises - text new lines
  </ol>

  // Bullet point based
  <ul>
  >li></li> // Makes libiry drop down same as how discord utilises - text new lines
  </ul>
  
  
  */}

const DOCUMENTATION_SECTIONS = [
  {
    id: "what-is",
    title: "What is FiveM Database?",
    icon: Database,
    content: 
    `
    <h2 class="text-2xl font-bold mb-4">What is FiveM Database?</h2>
    
    <p >FiveM Database is a Guidance tool for server owners & Resource Developers</p>
    <br>
    <p>We are a team of People that care about the FiveM Platform and care about the platform being safe for everyone</p>
    <br>
    <p>We as a team work on Manualy adding blacklists into our System & Fine tuning our automation system that searches resources for possibile IP//COC Detections to help Developers have an easier time to protect there server and make sure that it is compliant with the TOS//COC And so that they can have fun while doing it.</p>

    
    `
  },
  {
    id: "how-to-use",
    title: "How to use FiveM Database",
    icon: HelpCircle,
    content: 
    `
    <h2 class="text-2xl font-bold mb-4">How to use FiveM Database?</h2>
    <br>
    <h3 class="text-xl font-semibold mb-2">Resource Checker</h3>
    <br>
    <p>Using the Resource checker is as easy as Copy the link of the resource you are looking at, Paste the link in, press Check!!</p>
    <br>
    <p>POSSIBILE FLAGS!</p>
    <br
    <ol>

    <il>IP Infringement</il>
    <p>When a Person is Breaking IP Laws</p>

    <br>
    <il>Leaking</il>
    <p>when someone is leaking assets Or is selling leaks</p>

    <br>
    <il>re-selling</il>
    <p>When someone is selling Opensource, paid or free resources</p>

    <br>
    <il>Code of Conduct</il>
    <p>When a store is brekaing Code of conduct ||| Most common case is using Child Peds in there Server's or Selling Child Peds</p>

    <br>
    <il>ILEGAL</il>
    <p>When a website//store//Server is breaking the law</p>
    

    <br>
    <il>Branded Assets</il>
    <p>anything that is branded with a IRL Company//Branding (This is Diffirent from IP Infringement</p>
    

    <br>
    <il>Theft (AKA Ripping Assetts)</il>
    <p>Theth of a framework, vehicle, someone else work</p>
    
    <br>
    <il>Masking</il>
    <p>This is when the creator is pretending to be someone else</p>
    
    <br>
    <il>Dumping(Stealing Servers)</il>
    <p>Someone that is Offering Server Dumping Services</p>
    
    <br>
    <il>Un-Auth Marketplace</il>
    <p>When someone is selling outside of tebex (If a website has a fractor watermark this is still TEBEX!!</p>
    
    <br>
    <il>Misc-Market</il>
    <p>Any sort of market like Fiverr, Etsy, Ebay</p>
    
    <br>
    <il>Unlicensed Sales</il>
    <p>Selling assets that are "Open Sources" from a paid asset that they have purchased " (WE DONT FLAG THIS WITHOUT SOLID PROOF)</p>

    <br>
    <il>Cheats</il>
    <p>Selling Mod menus//Cheat menus</p>

    <br>
    <il>Service Selling</il>
    <p>Selling boosting sevices within FiveM ONLY</p>
    
    </ol>
    
    `
  },
  {
    id: "tools",
    title: "What our tools do",
    icon: Code,
    content: 
    `
    <h2 class="text-2xl font-bold mb-4">What our tools do?</h2>
    <br>
    <h2 class="text-2xl font-bold mb-4"Resource Checker</h2>
    <br>
    <p> Our Resource checker Checks links across the entirety of the Internet and Utilises our Automatic Detection System.
    <br>

    <h2 class="text-2xl font-bold mb-4">5DB Discord Bot</h2>
    <p>Our Discord bot is currently in "Re-Development" This means that we are currently in the progress of entirely re-writing the bot on how it works, what it dose (THIS DOSE NOT HAVE A PLANNED RE-RELEASE DATE)</p>
    <br>

    <h2 class="text-2xl font-bold mb-4">Report Status</h2>
    <p>Report stats is a collection of all reports Created//submited Thruout our Entire team. This is a Public listing to show the Acuracy and Percentage of what Reports are propperly and correctly handled from CFX's Side.</p>
    <br>

    <h2 class="text-2xl font-bold mb-4">Contacts</h2>Resource Checker</h2>
    <br>
    <p>Our Resource checker is a Tool that uses bot Automatic Flags & Manaul blacklists. This is done thru our team's additions Aswell as Our Automation System.</p>
    <br>
    <p>This tool is used to check Websites, Resources and creators sotres based on our blacklist system to Check weather something is in Violation of CFX's Terms of Service or Code of Conduct.</p>
    <br>
    `
  },
  {
    id: "contact",
    title: "Where to contact us",
    icon: Mail,
    content: 
    `
      <h2 class="text-2xl font-bold mb-4">Contacts</h2>

      <p>
        You can join our 
        <a href="https://discord.fivemdb.online" class="text-pink-500 hover:underline font-semibold">
          DISCORD
        </a> 
        and contact us directly there.
      </p>
      <br>

      <p>
        You can also 
        <a href="mailto:sophia@zwrks.com" class="text-pink-500 hover:underline font-semibold">
          EMAIL US
        </a>
      </p>
      <br>

      <p>
        Any enquiries, we will redirect you to our 
        <a href="https://discord.fivemdb.online" class="text-pink-500 hover:underline font-semibold">
          Discord
        </a>
      </p>

    `
  },
  {
    id: "why-use",
    title: "Why use FiveM Database?",
    icon: Target,
    content: 
    `
    <h2 class="text-2xl font-bold mb-4">Why use us?</h2>
    <br>
    <p>You may ask yourself What about is makes us any diffirent from other tools (such as Warden) and well here is Why.</p>
    <ul>
<br>
    <li>Resource Checker Tool</li>
    <p>Our resource checker tool Works in an entirely Diffrent way compared to how any other tools work, WE Check every link that you send using both our MANUAL blacklist and our AUTOMATIC Blacklist. This is the only Automatic blacklist that is on the platform that is in Function order with over 5,000 Automatic Flags & Over 150 Manual Flags related to the system and is Constantly expanding as we work on it </p>
<br>
    <li>We care about Developers.</li>
    <p>We as a community of Creators, Server owners, and just members of the community Care about YOU as the creator's, The server owners And the players. We care that Your SAFTEY is the most important thing on this platform.</p>
<br>
    <li>Our Cares for Saftey.</li>
    <p>FiveM Has ever been an amazing place as Our Founder Joined the platform over 9 YEARS AGO She has experiance the platform grow and grow and grow. With this she has also seen how the Player and Creator saftey has every changed. This is something that we AIM To make the biggest impact on, Attempting to tackel these issues on the platform by having them publicly listed and all of the issues related to the, We at FiveM DB Care about your Saftey and it is our biggest Priority.</p>
<br>
    <li>Our backing</li>
    <p> We are backed by many creators on the platform that support our work, Creators that work on our platform and care to see improvement on the platform </p>
    </ul>
    `
  },
  {
    id: "how-to-work",
    title: "How to work on FiveM Database",
    icon: Users,
    content: 
    `
    <h2 class="text-2xl font-bold mb-4">How to Work With FiveM Database?</h2>
    <br>

    <h2 class="text-2xl font-bold mb-4">Becoming a Partner//Recomened Creator</h2>
    <br>
    <p>There is 2 Key diffirances between Our Partners & Our Recomened Creators</p>
    <br>

    <p>PARTNERS</p>
    <br>
    <p>For partners We give the following, || Creator channels in our discord with an @here ping || Creator store on the FiveM DB Website || Partners Back our work, and are people that support the project</p>
    <br>
    <p>Partners Must have us as a channel in there discord</p>
    <br>
    <p>RECOMEDED CREATORS</p>
    <br>
    <p>Recomeded creators are people that WE have specificly Contacted and Invited is as a Recomeded creator with the same perks as Partners without the @here ping & Channel in there discord. | Recomeded Creators Back our work, and are people that support the project</p>

    <h2 class="text-2xl font-bold mb-4">Working in our team?</h2>
    <br>
    <p>Working in our Team Requires you to message Sophia in our discord.</p>
    
    `
  },
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState(DOCUMENTATION_SECTIONS[0].id);

  const currentSection = DOCUMENTATION_SECTIONS.find(section => section.id === activeSection);

  return (
    <Layout title="Documentation - FiveM DB" description="Complete documentation for FiveM Database">
      <div className="min-h-screen pt-32 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-5xl font-display mb-6 text-gradient animate-fade-in">
            <span className="font-bold">Documentation</span>
          </h1>
          <p className="text-white/70 mb-12 max-w-3xl text-balance">
            Everything you need to know about FiveM Database and how to use our platform effectively.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 rounded-xl sticky top-24">
                <h3 className="font-display text-xl mb-6">Table of Contents</h3>
                <nav className="space-y-2">
                  {DOCUMENTATION_SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all flex items-center gap-3 ${
                        activeSection === section.id
                          ? 'bg-white/10 text-white shadow-lg'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <section.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{section.title}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="glass-card p-8 rounded-xl">
                {currentSection && (
                  <div 
                    className="prose prose-invert max-w-none"
                    dangerouslySetInnerHTML={{ __html: currentSection.content }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Documentation;
