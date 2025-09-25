// this still exists aparently... 
export interface BlacklistEntry {
  name: string;
  links?: string[];
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  blacklistedSince?: string;
  category: 'discord' | 'tebex' | 'other'; 
  keyword: string; // Added keyword field
  flaggedBy: string; // Added what flags it field
  discordServerId?: string; // Added Discord server ID field
}

// Global whitelist words - these will be exempted from flagging
export const GLOBAL_WHITELIST = [
  "FiveM",
  "fivem",
  "5m"
];

// This can be easily extended with more entries
//'low' | 'medium' | 'high' | 'critical';
export const BLACKLISTED_CREATORS: BlacklistEntry[] = [
   // FiveM 0
   {
    name: "FIVEM 0",
    links: ["https://discord.gg/fivem0"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "18-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1302150541454868551", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  // Kali Leaks
  {
    name: "kalileaks",
    links: ["https://www.kalileaks.com/"],
    reason: "Cheats,Leaking,Stolen Assets,Reselling,None Auth Marketplace",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "18-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "", // Use this if there is a discord server If applicable
    flaggedBy: "Rwixy" //
  },
  //Launcher Leaks
  {
    name: "launcherleaks",
    links: ["https://launcherleaks.net/"],
    reason: "Leaking,Stolen Assets,Reselling,None Auth Marketplace",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "18-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "", // Use this if there is a discord server If applicable
    flaggedBy: "Rwixy" //
  },
  // Eulen 
  {
    name: "Eulen Cheats",
    links: ["https://discord.com/invite/CsfPRDp", "https://eulencheats.com/", "https://t.me/EulenCC"],
    reason: "Cheats",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem-cheat", //search keyword
    discordServerId: "1136029776080023563", // Use this if there is a discord server If applicable
    flaggedBy: "Lueflue" //
  },
  //NS LEAKS
  {
    name: "NS Leaks",
    links: ["https://discord.gg/DYR49Qp8p2"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "18-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1169213387817877514", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  //Tebex store
  {
    name: "Tebex Store",
    links: ["https://tebex.store/"],
    reason: "Leaking, Stolen Assets,Reselling,None Auth Marketplace",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem-store", //search keyword
    flaggedBy: "Rwix" //
  },
  // Fivem Store
  {
    name: "Fivem Store",
    links: ["https://fivem.shop/", "https://test.fivem.shop/shop"],
    reason: "Leaking, Stolen Assets,Reselling,None Auth Marketplace",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem-shop", //search keyword
    flaggedBy: "Rwix" //
  },
  //V FiveM
  {
    name: "vFivem",
     links: ["https://vfivem.com/"],
     reason: "IP Infringement, Leaking, Code Of Conduct",
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "17-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "vFivem", //search keyword
     flaggedBy: "Baldwin" //
   },
    //High Leaks
  {
    name: "HighLeaks",
     links: ["https://highleaks.com/", "https://discord.com/invite/BBHYGHDWZG", "https://discord.gg/BBHYGHDWZG"],
     reason: "Re-selling, Code Of Conduct, Leaking, Theft, Branded Assets, IP Infringement, Unauthorized Marketplace",
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "17-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "HighLeaks", //search keyword
     flaggedBy: "Baldwin" //
   },
    //Real Dudes Inc
  {
    name: "RealDudesInc",
     links: ["https://realdudesinc.com/", "https://discord.com/invite/3wRHFEvMCc", "https://discord.gg/3wRHFEvMCc", "https://www.youtube.com/@realdudesinc"],
     reason: "Code Of Conduct, Cheats",
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "17-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "RealDudesInc", //search keyword
     discordServerId: "929061040266829894",
     flaggedBy: "Baldwin" //
   },
    //Ducks Services
  {
    name: "Ducks‑Services",
     links: ["https://www.ducks-services.com/, https://www.youtube.com/@DucksServicesYT"],
     reason: "Code Of Conduct, Cheats",
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "17-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Ducks‑Services", //search keyword
     flaggedBy: "Baldwin" //
   },
    //Battle log
  {
     name: "Battlelog",
     links: ["https://battlelog.co/"],
     reason: "Code Of Conduct, Cheats",
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "17-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Battlelog", //search keyword
     flaggedBy: "Baldwin" //
   },
    //QLM Shop
  {
    name: "Qlmshop",
     links: ["https://qlmshop.com/"],
     reason: "Code Of Conduct, Cheats",
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "17-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Qlmshop", //search keyword
     discordServerId: "",
     flaggedBy: "Baldwin" //
   },
  // CosmoCheats
  {
    name: "CosmoCheats",
    links: ["https://cosmocheats.com/", "https://discord.com/invite/3YRYNNX5cw", "https://discord.gg/3YRYNNX5cw"],
    reason: "Code Of Conduct, Cheats",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "CosmoCheats", //search keyword
    discordServerId: "1094532317613133856",
    flaggedBy: "Baldwin" //
  },
    //Veteran Cheats
  {
    name: "VeteranCheats",
    links: ["https://veterancheats.com/", "https://discord.com/invite/FWpucD92N8", "https://discord.gg/FWpucD92N8"],
    reason: "Code Of Conduct, Cheats",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "VeteranCheats", //search keyword
    discordServerId: "1045754727494852679",
    flaggedBy: "Baldwin" //
  },
    //FiveM Booster
  {
    name: "FiveBooster",
    links: ["https://fivebooster.com/"],
    reason: "Service Selling, Code Of Conduct",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "FiveBooster", //search keyword
    flaggedBy: "Baldwin" //
  },
    // recovery Kings
  {
    name: "RecoveryKings",
    links: ["https://recoverykings.net/", "https://discord.com/invite/6wfhetNQJM", "https://discord.gg/6wfhetNQJM", "https://www.youtube.com/channel/UCFT1ZOc0dPkPgje68a4VPuw"],
    reason: "Code Of Conduct, Cheats",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "RecoveryKings", //search keyword
    discordServerId: "1138291208515502151",
    flaggedBy: "Baldwin" //
  },
    //Palm Keys
  {
    name: "PalmKeys",
    links: ["https://palmkeys.com/", "https://discord.com/invite/WGdprhtWfJ", "https://discord.gg/WGdprhtWfJ", "https://www.youtube.com/channel/UCZcenBtRIaIazEPsywWgC-A"],
    reason: "Service Selling, Cheats,",
    severity: "low", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "PalmKeys", //search keyword
    discordServerId: "911453864883011684",
    flaggedBy: "Baldwin" //
  },
  //FiveM Upvotes
  {
    name: "FivemupVotes",
    links: ["https://fivemupvotes.com/", "https://discord.com/invite/BBHYGHDWZG", "https://discord.gg/BBHYGHDWZG"],
    reason: "Service Selling, Code Of Conduct",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "FivemupVotes", //search keyword
    discordServerId: "1046810800070852759",
    flaggedBy: "Baldwin" //
  },
  // TC HUB
  {
    name: "TC HUB | 8K ?",
    links: ["https://discord.gg/28fdwwHB4h"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1141682590718369822", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  //leak house
  {
    name: "Leak House",
    links: ["https://discord.gg/leakhouse"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1119186840008806410", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  // BRATY STORE
  {
    name: "B3AZTY STOR3",
    links: ["https://discord.com/invite/REA4rBPSbF"],
    reason: "Leaking,re-selling",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17/05/2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1295247664899821630", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  // POSIDENT LEAKS
  {
    name: "Poseidonleaks",
    links: ["https://discord.gg/vVSVvgAP", "https://www.poseidonleaks.com/"],
    reason: "Leaking,re-selling,ILEGAL,Cheats",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17/05/2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1104169239243411587", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  // CR LEAKS
  {
    name: "CR LEAKS",
    links: ["https://discord.gg/gyrmuHYVmf","https://cr5m.com/"],
    reason: "Leaking,re-selling",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "discord",//ord//tebex/other
    keyword: "CR5M", //search keyword
    discordServerId: "1351603273848848466", // Use this if there is a discord server If applicable
    flaggedBy: "Rwixy" //
  },
  //ESX SCRIPT
  {
    name: "ESX Scripts",
    links: ["https://www.esxscript.com/store/"],
    reason: "Scamming, leaking, TOS, Theft, Reselling, Stolen Assets, None Auth Marketplace",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "leak", //search keyword
    flaggedBy: "Fezz" //
  },
  //X Studio
  {
    name: "X Studio",
    links: ["https://discord.gg/xstudios | https://www.xstudiosfivem.com/"],
    reason: "TOS, IP, theft and Resellling",
    severity: "medium", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "17-05-2025", // day-month-year
    category: "tebex", // discord//tebex/other
    keyword: "resell", //search keyword
    discordServerId: "1102830970119397388",
    flaggedBy: "Fezz" //
  },
  // Brothers Fivem
  {
    name: "Brothers Fivem",
    links: ["https://discord.gg/cg2s7ucAjV"],
    reason: "Leaking, Stolen Assets, Reselling",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1322275793954406400",
    flaggedBy: "Rwix" 
  },
  // Auto Leaks
  {
    name: "Auto Leaks",
    links: ["https://discord.gg/cq53SPFeHw"],
    reason: "Leaking, Stolen Assets",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "790888749864189963",
    flaggedBy: "Rwix" //
  },
  // FiveMX
  {
    name: "Fivemx",
    links: ["https://fivemx.com/"],
    reason: "None Auth Marketplace, IP Infringement, Reselling, Leaking, Stolen Assets",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivemx", //search keyword
    flaggedBy: "Baldwin" //
  },
  // AIO CARS
  {
    name: "Aiocars",
    links: ["https://aiocars.net/", "https://discord.gg/5kgesahFgJ"],
    reason: "None Auth Marketplace, IP Infringement",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "aiocars", //search keyword
    discordServerId: "1086196327601414185",
    flaggedBy: "Baldwin" //
  },
  //FivemCar
  {
    name: "Fivemcar",
    links: ["https://fivemcar.com/", "https://discord.gg/qualitycar", "https://www.youtube.com/@fivemcar"],
    reason: "None Auth Marketplace, Leaking, Stolen Assets, IP Infringement",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivemcar", //search keyword
    discordServerId: "1179358932305723453",
    flaggedBy: "Baldwin" //
  },
  // DigitialLatvia
  {
    name: "DigitialLatvia",
    links: ["https://digitiallatvia.com/", "https://discord.com/invite/4qp2bDEJbv", "https://discord.gg/4qp2bDEJbv"],
    reason: "Selling NOT on Tebex, IP Infringement",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "DigitialLatvia", //search keyword
    discordServerId: "1034752490199056454",
    flaggedBy: "Baldwin" //
  }, 
  // Five.gg
  {
    name: "Fivem.gg",
    links: ["https://fivem.gg/", "https://discord.com/invite/RYVS7Z3CPd", "https://discord.gg/RYVS7Z3CPd"],
    reason: "Selling NOT on Tebex, IP Infringement, Reselling, Leaking, Stolen Assets",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem.gg", //search keyword
    discordServerId: "835577326997078037",
    flaggedBy: "Baldwin" //
  },
  // MenanAk47
  {
    name: "MenanAk47",
    links: ["https://menanak47.tebex.io/", "https://discord.com/invite/menanak47", "https://discord.gg/menanak47"],
    reason: "Stealing Assets, Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "tebex", // discord//tebex/other
    keyword: "MenanAk47", //search keyword
    discordServerId: "732300641451638896",
    flaggedBy: "Baldwin" //
  },
  // Fiverr
  {
    name: "Fiverr",
    links: ["https://www.fiverr.com/"],
    reason: "None Auth Marketplace",
    severity: "medium", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fiverr", //search keyword
    flaggedBy: "Baldwin" //
  },
  // Esty
  {
    name: "Etsy",
    links: ["https://www.etsy.com/"],
    reason: "None Auth Marketplace",
    severity: "medium", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "Etsy", //search keyword
    flaggedBy: "Baldwin" //
  },
  // FiveM Store
  {
    name: "Fivem-Store",
    links: ["https://fivem-store.com/", "https://discord.com/invite/78JAQvFXYu", "https://discord.gg/78JAQvFXYu"],
    reason: "Selling NOT on Tebex, IP Infringement, Leaking, Stolen Assets, Reselling, ", 
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivem store", //search keyword
    discordServerId: "692518894442643479",
    flaggedBy: "Baldwin" //
  }, 
  //5mservers
  {
    name: "5mservers",
    links: ["https://www.5mservers.com/", "https://discord.com/invite/cZEZbjzxN5", "https://discord.gg/cZEZbjzxN5", "https://www.youtube.com/@Team.5M"],
    reason: "IP Infringement, Leaking, re-selling, Theft, Un-Auth Marketplace, illegal",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "5mservers", //search keyword
    discordServerId: "897143527727841322",
    flaggedBy: "Baldwin" //
  },
  // Dracula Scripts
  {
    name: "Dracula Scripts",
    links: ["https://www.youtube.com/@DraculaScripts", "https://discord.com/invite/F9YsMUwnWK", "https://discord.gg/F9YsMUwnWK", "https://buymeacoffee.com/draculaservice"],
    reason: "IP Infringement, Leaking, Stolen Assets, None Auth Marketplace",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "16-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "Dracula-Scripts", //search keyword
    discordServerId: "1067264593044451380",
    flaggedBy: "Baldwin" //
  },
  // Liberty City (GTA5 Mods Wanna Be)
  { 
    name: "libertycity",
    links: ["https://libertycity.net/"],
    reason: "Leaking Assets",
    severity: "critical", 
    blacklistedSince: "16-05-2025",
    category: "other",
    keyword: "libertycity.net",
    flaggedBy: "Sophia"
  },
  // V5 Leaks | Fivem
  {
      name: "V5 Leaks | Fivem",
      links: ["https://discord.gg/v5leaks"],
      reason: "Leaking",
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "18-05-2025", // day-month-year
      category: "discord", // discord//tebex/other
      keyword: "fivem-leak", //search keyword
      discordServerId: "1107445116551037092", // Use this if there is a discord server If applicable
      flaggedBy: "Roda" //
  },
  // 420 Services
  {
      name: "420-Services",
      links: ["https://discord.gg/420-servicesnet", "https://420-services.net/"],
      reason: "Sell Cheats",
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "18-05-2025", // day-month-year
      category: "tebex", // discord//tebex/other
      keyword: "fivem-cheat", //search keyword
      discordServerId: "1320136497638281297", // Use this if there is a discord server If applicable
      flaggedBy: "Roda" //
    },
  // Hopeleaks
    {
    name: "HopeLeaks",
    links: ["https://discord.gg/BR7yKg7cze"],
    reason: "Distributes leaked and stolen scripts without permission from original authors and Support DDoS Tools",
    severity: "high",
    blacklistedSince: "18-05-2025",
    category: "discord",
    keyword: "leak",
    discordServerId: "1339625499122466890",
    flaggedBy: "Avocato"
    },
  // Civez Leaks
  {
    name: "Civez Leaks",
    links: ["https://discord.gg/ZSNhZJexJ2"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1358118695892685172", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  // XX Leaks
  {
    name: "XX Leaks | v1 |TA & Eu",
    links: ["https://discord.gg/N4Z9xaeH2p"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1350465517928054855", // Use this if there is a discord server If applicable
    flaggedBy: "Maddy" //
  },
  // Toxic FiveM
  {
    name: "Toxic FiveM Community",
    links: ["https://discord.gg/MSnw2yKMtx"],
    reason: "Leaking, reselling",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1050399314242973706", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  // Unreal Leaks
  {
    name: "< Unreal Leaks >",
    links: ["https://discord.gg/JjRwcGMZUB"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1319155442236129290", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  // Bobbis x JL Store
  {
    name: "Bobbis x JL Store",
    links: ["https://discord.gg/G9fUchkJ2k"],
    reason: "Reselling",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "1162010226069880912", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  //Black Leaks
  {
    name: "Black Leaks",
    links: ["https://discord.gg/x26NwFN4xC"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "899720622815444993", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  //Bloss Premium 
  {
    name: "Bloss Premium",
    links: ["https://discord.gg/EqkaFm7wSe"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "905846194838839296", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  // Polo Leaks
  {
    name: "Polo Leaks",
    links: ["https://discord.gg/rEKz9tZXUr"],
    reason: "Leaking",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "20-05-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-leak", //search keyword
    discordServerId: "749048313990479953", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  // MT Development
    {
    name: "MT - DEVELOPMENT ❄",
    links: ["https://mt-development.tebex.io"],
    reason: "Reselling scripts without permission", // Reason of blacklist
    severity: "high", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "21-5-2025", // day-month-year
    category: "tebex", // discord//tebex/other
    keyword: "Reselling", //search keyword
    discordServerId: "1235303563010375783", // Use this if there is a discord server If applicable
    flaggedBy: "Marat" //
  },
  // Kill store (Asked to remain anonomus)
  {
    name: "Killstore",
    links: ["https://killstore.net/", "https://discord.gg/dxD44nkcAs"],
    reason: "Not using Tebex, IP Related Violations",
    severity: "medium", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "21-5-2025", // day-month-year
    category: "tebex",
    keyword: "Un-auth", //search keyword
    discordServerId: "894339222905958471", // Use this if there is a discord server If applicable
    flaggedBy: "Asked to Remain Un-named" //
  },
  // Motion Life
  {
    name: "Motion Life",
    links: ["https://discord.gg/motionlife", "https://motionlife.mysellauth.com/"],
    reason: "Cheats", // Reason of blacklist
    severity: "high", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "21.5.2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "fivem-cheats", // Search Keywords
    discordServerId: "1150749163332571137", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  // FiveM Assets
  {
    name: "Fivemassets",
    links: ["https://fivemassets.com/", "https://discord.gg/2dfHQjxwKv"],
    reason: "IP Infringement, Code Of Conduct, Illegal, Branded Assets, Resellling", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "22.5.2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "fivemassets", // Search Keywords
    discordServerId: "738371943136231474", // Use this if there is a discord server If applicable
    flaggedBy: "Baldwin" //
  },
  // GOM Modeling
  {
    name: "GOMModeling",
    links: ["https://gom-modeling.com/", "https://discord.com/invite/gom-modeling", "https://discord.gg/gom-modeling"],
    reason: "IP Infringement, Branded Assets, Unauthorized Marketplace", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "22.5.2025", // day-month-year
    category: "tebex", // discord//tebex/other
    keyword: "gommodeling", // Search Keywords
    discordServerId: "775103322935918602", // Use this if there is a discord server If applicable
    flaggedBy: "Baldwin" //
  },
  // FiveM Scripts
  {
    name: "Fivemscript",
    links: ["https://fivemscript.store"],
    reason: "IP Infringement, Code Of Conduct, Branded Assets, Resellling, Leaking, Illegal", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "22.5.2025", // day-month-year
    category: "tebex", // discord//tebex/other
    keyword: "Fivemscript", // Search Keywords
    flaggedBy: "Baldwin" //
  },
  // Fuzzy Family
  {
    name: "Fuzzy's Family",
    links: ["https://discord.gg/fuzzy"],
    reason: "Cheats",
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "24/05/25", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "cheats", //search keyword
    discordServerId: "914375192246112257", // Use this if there is a discord server If applicable
    flaggedBy: "LueFlue" //
  },
  // KT Store
  {
    name: "KT Store",
    links: ["https://fakecrime.bio/Dennda39"],
    reason: "Reselling cheats", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "25-5-2025", // day-month-year
    category: "discord", // discord//tebex/other
    keyword: "Cheats", // Search Keywords
    discordServerId: "1287166843748089936", // Use this if there is a discord server If applicable
    flaggedBy: "Marat" //
  },
  // FiveM Turk
  {
    name: "FiveM Turk",
    links: ["https://www.fivemturk.net/", "https://discord.gg/ejsrcXEgMU", "https://discord.com/invite/ejsrcXEgMU"],
    reason: "Leaking, IP, TOS/COC", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "26-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "Leaking", // Search Keywords
    discordServerId: "564521854908235777", // Use this if there is a discord server If applicable
    flaggedBy: "Sophia" //
  },
  //fivem cheap 
  {
    name: "FiveM Cheep",
    links: ["https://www.fivem.cheap/"],
    reason: "Leaking, Reselling, IP, COC", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "26-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "Flagged_word", // Search Keywords
    discordServerId: "N/a", // Use this if there is a discord server If applicable
    flaggedBy: "Sophia" //
  },
// Big Daddy Scripts
  {
  name: "Big Daddy Scripts",
  links: ["https://bigdaddyscripts.com/", "https://discord.gg/Qn3D4Wvx3H", "https://discord.com/invite/Qn3D4Wvx3H"],
  reason: "Un-Auth Market place", // Reason of blacklist
  severity: "low", //'low' | 'medium' | 'high' | 'critical';
  blacklistedSince: "26-05-2025", // day-month-year
  category: "other", // discord//tebex/other
  keyword: "Un-Auth", // Search Keywords
  discordServerId: "478580360855289884", // Use this if there is a discord server If applicable
  flaggedBy: "Sophia" //
  },
  // Nulled BB
  {
    name: "Nulled BB",
    links: ["https://nulledbb.com/"],
    reason: "Leaking", // Reason of blacklist
    severity: "critical", //'low' | 'medium' | 'high' | 'critical';
    blacklistedSince: "26-05-2025", // day-month-year
    category: "other", // discord//tebex/other
    keyword: "Leaking", // Search Keywords
    discordServerId: "", // Use this if there is a discord server If applicable
    flaggedBy: "Sophia" //
    },
    // FiveM Store
    {
     name: "FiveM Store",
     links: ["https://www.fivem.store/", "https://discord.gg/yM6T6z9jK4"],
     reason: "Leaking, Reselling, Un-auth market, Tos, COC", // Reason of blacklist
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "26-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Leaking", // Search Keywords
     discordServerId: "1133747922765357158", // Use this if there is a discord server If applicable
     flaggedBy: "Sophia" //
    },
     // Leak GG
    {
     name: "Leak GG",
     links: ["https://leakgg.com/", "link_2"],
     reason: "Leaking, Reselling, IP, COC, TOS", // Reason of blacklist
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "26-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Leaking", // Search Keywords
     discordServerId: "", // Use this if there is a discord server If applicable
     flaggedBy: "Sophia" //
    },
     // FiveM Leak
    {
     name: "Fivem Leak",
     links: ["https://fivemleak.org/", "link_2"],
     reason: "Leaking, TOS, COC. IP", // Reason of blacklist
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "26-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Leaking", // Search Keywords
     discordServerId: "Taken Down", // Use this if there is a discord server If applicable
     flaggedBy: "Sophia" //
    },
     // High Leak
    {
     name: "High Leaks",
     links: ["https://highleaks.com/", "link_2"],
     reason: "Leaking, TOS, COC, reselling", // Reason of blacklist
     severity: "critical", //'low' | 'medium' | 'high' | 'critical';
     blacklistedSince: "26-05-2025", // day-month-year
     category: "other", // discord//tebex/other
     keyword: "Leaking", // Search Keywords
     discordServerId: "", // Use this if there is a discord server If applicable
     flaggedBy: "Sophia" //
    },
     // Kali Leaks
    {
      name: "Kali Leaks",
      links: ["https://kalileaks.com/", "https://discord.com/invite/4wDHevvMDv"],
      reason: "Leaking, Reselling, TOS, COC", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "26-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "1157956199640207390", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
    // vag GG
    {
      name: "vag",
      links: ["https://vag.gg/"],
      reason: "Cheats,Leaking,Stolen Assets,Reselling,None Auth Marketplace",
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "26-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "fivem-leak", //search keyword
      discordServerId: "", // Use this if there is a discord server If applicable
      flaggedBy: "Avocato" //
    },
      //https://fivemods.io/
    {
      name: "fivemods",
      links: ["https://fivemods.io/", "https://discord.gg/fivemods"],
      reason: "Reselling, Leaking, IP", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Fivemods", // Search Keywords
      discordServerId: "1017158794100351128", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
        // CFX Tebex
    {
      name: "CFX Tebex",
      links: ["https://cfx-tebex.io/"],
      reason: "Leaking, Reselling, TOS", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "N/a", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
          // fivem-store  
    {
      name: "FiveM Store.net",
      links: ["https://fivem-store.net/"],
      reason: "Leaking, Reseling, TOS, IP", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "N/a", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
            // FiveM Script  
    {
      name: "FiveM Script",
      links: ["https://fivemscript.store/"],
      reason: "Leaking, Reselling", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
              // FiveM store.nl https://www.fivemstore.nl/
    {
      name: "FiveM Store.nl",
      links: ["https://www.fivemstore.nl/"],
      reason: "Leaking, Reselling, IP, Tos", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "N/a", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
    {
      name: "fivem-shop.com/",
      links: ["https://fivem-shop.com/", "https://discord.gg/BhxVsgfX8G"],
      reason: "Leaking, Reselling, IP, Tos", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "1180569136196239391", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
    },
    {
      name: "fivem-zone",
      links: ["https://fivem-zone.com/", "link_2"],
      reason: "Leaking, Reselling, Tos, Ip", // Reason of blacklist
      severity: "critical", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "28-05-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Leaking", // Search Keywords
      discordServerId: "N/a", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
      },
      {
        name: "ffivem.com",
        links: ["https://ffivem.com/"],
        reason: "Leaking, Reselling, ToS", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Leaking", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "JA Designs",
        links: ["https://jadesignsfivem.com/"],
        reason: "Unauthorised Marketplace, IP", // Reason of blacklist
        severity: "high", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Un-Authorised Marketplace, IP", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "redsaint mods",
        links: ["https://redsaintmods.com/", "link_2"],
        reason: "Unauthorised Marketplace, IP", // Reason of blacklist
        severity: "high", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Un-Authorised Marketplace, IP", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "thinlinesanctuary",
        links: ["https://www.thinlinesanctuary.com/", "link_2"],
        reason: "Unauthorised Marketplace", // Reason of blacklist
        severity: "high", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Un-Authorised Marketplace", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "shamods",
        links: ["https://shamods.com/", "link_2"],
        reason: "Cheats, Clients, Tools", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "cheats", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "Fivem mlo",
        links: ["https://fivemmlo.store/", "link_2"],
        reason: "Leaking, Reselling, Un-auth Market", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Leaking", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "fivemstore",
        links: ["https://fivemstore.shop/", "link_2"],
        reason: "Reselling, Leaking, IP, TOS", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Leaking,Reselling", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "fivemstore.fun",
        links: ["https://fivemstore.fun/", "link_2"],
        reason: "Cheats, Tools", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Cheats", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "fivemstore.us",
        links: ["https://fivemstore.us/", "link_2"],
        reason: "Leaking, Reselling, IP, TOS", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Leaking", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "Fivemm.org",
        links: ["https://www.fivemm.org/", "link_2"],
        reason: "Leaking, Reselling, Tos, Coc", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "28-05-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Leaking", // Search Keywords
        discordServerId: "N/a", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
      {
        name: "justscripts",
        links: ["https://justscripts.net/", "https://discord.gg/f6f3gW9XeM"],
        reason: "Leak Promoting",
        severity: "critical",
        blacklistedSince: "29-05-2025",
        category: "other",
        keyword: "Leak-Promo",
        flaggedBy: "Sophia",
        discordServerId: "995413505085812766"
      },
      {
        name: "kingmaps",
        links: ["https://kingmaps.net/", "https://discord.gg/4wAdDaeh6p"],
        reason: "Leak Promoting",
        severity: "critical",
        blacklistedSince: "29-05-2025",
        category: "other",
        keyword: "Leak-Promo",
        flaggedBy: "Sophia",
        discordServerId: "1210970235801174146"
      },
      {
        name: "fiveguard",
        links: ["https://fiveguard.net/", "https://discord.gg/fiveguard"],
        reason: "Leak Promoting",
        severity: "critical",
        blacklistedSince: "29-05-2025",
        category: "other",
        keyword: "Leak-Promo",
        flaggedBy: "Sophia",
        discordServerId: "901177948248367135"
      },
      {
        name: "fivebooster",
        links: ["https://fivebooster.com/"],
        reason: "Leak Promoting, Service Selling, Cheats",
        severity: "critical",
        blacklistedSince: "29-05-2025",
        category: "other",
        keyword: "Boosting",
        flaggedBy: "Sophia"
      },
      {
        name: "wanexia",
        links: ["https://www.patreon.com/wanexia"],
        reason: "Un-Auth Marketplace",
        severity: "critical",
        blacklistedSince: "29-05-2025",
        category: "other",
        keyword: "wanexia",
        flaggedBy: "Sophia"
      },
      {
        name: "FiveM Elite Hub",
        links: ["https://discord.gg/ZEJXhqd8"],
        reason: "Leaking, Reselling",
        severity: "critical",
        blacklistedSince: "30-05-2025",
        category: "discord",
        keyword: "Elite hub",
        flaggedBy: "Sophia",
        discordServerId: "1326286980480237650"
      },
      {
      name: "Susano.re",
      links: ["https://susano.re/"],
      reason: "Cheats",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "other",
      keyword: "cheats",
      flaggedBy: "V1 / Fiveworld"
      },
      {
      name: "BX Shop Big Leak",
      links: ["https://discord.gg/uJVjmWf5bp"],
      reason: "Un-Auth Marketplace, Service Selling, Branded Assets, IP Infringement, Leaking, Leak Promoting",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "leaks,",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "975061719934173235"
      },
      {
      name: "Godsdrip",
      links: ["https://discord.gg/znWuNuRn4C"],
      reason: "Un-Auth Marketplace, Service Selling, Branded Assets",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "license, cheats",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "1089931748944650300"
      },
      {
      name: "FivemTool",
      links: ["https://discord.gg/4xEYR4yznH"],
      reason: "ESX License, Cheats",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "license, cheats",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "1065480279801745428"
      },
      {
      name: "GLO Shop FiveM",
      links: ["https://discord.gg/WUkxzvN6M9"],
      reason: "Leaking, Leak Promoting, re-selling, IP Infringement",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "leaks",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "1125830251184918670"
      },
      {
      name: "SIFIR'6",
      links: ["https://discord.gg/BnbpusmNaY"],
      reason: "Leaking, Leak Promoting, re-selling, Service Selling, IP Infringement",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "leaks",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "761589598634770435"
      },
      {
      name: "5M Leaks Bulgaria",
      links: ["https://discord.gg/7hgky5kW6Z"],
      reason: "IP Infringement, Leaking, Leak Promoting, Branded Assets",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "leaks",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "975908517787627570"
      },
      {
      name: "RedLeaks",
      links: ["https://discord.gg/UbZkBYyz4c"],
      reason: "IP Infringement, Leaking, Leak Promoting, Branded Assets",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "leaks",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "1281278412425658409"
      },
      {
      name: "FiveM West Leaks",
      links: ["https://discord.gg/zdtxmEawwm"],
      reason: "IP Infringement, Leaking, Branded Assets",
      severity: "critical",
      blacklistedSince: "02-06-2025",
      category: "discord",
      keyword: "leaks",
      flaggedBy: "V1 / Fiveworld",
      discordServerId: "1267522942858821712"
      },
      {
      	name: "PSR STORE",
      	links: ["https://discord.gg/BMwY8M9xCC"],
      	reason: "Un-Auth Marketplace",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "discord",
      	keyword: "PSR STORE",
      	flaggedBy: "Sophia",
      	discordServerId: "1115188570144116806"
      },
      {
      	name: "the finalhosting",
      	links: ["https://thefinalhosting.com/"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "thefinalhosting",
      	flaggedBy: "Sophia"
      },
      {
      	name: "iceline",
      	links: ["https://iceline-hosting.com/", "https://discord.gg/8NyZWUb"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "iceline-hosting",
      	flaggedBy: "Sophia",
      	discordServerId: "315241449178529792"
      },
      {
      	name: "gtxgaming",
      	links: ["https://www.gtxgaming.co.uk/", "https://discord.gg/f6VKHYGHKp"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "gtxgaming",
      	flaggedBy: "Sophia",
      	discordServerId: "755714463105024062"
      },
      {
      	name: "gravel host",
      	links: ["https://gravelhost.com/", "https://discord.gg/gravelhost"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "gravelhost",
      	flaggedBy: "Sophia",
      	discordServerId: "1044323241071755284"
      },
      {
      	name: "rocketnode",
      	links: ["https://rocketnode.com/", "https://discord.gg/rocketnode"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "rocketnode",
      	flaggedBy: "Sophia",
      	discordServerId: "895818164573732874"
      },
      {
      	name: "godlike",
      	links: ["https://godlike.host/", "https://discord.gg/godlike-en"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "godlike",
      	flaggedBy: "Sophia"
      },
      {
      	name: "freakhosting",
      	links: ["https://freakhosting.com/"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "freakhosting",
      	flaggedBy: "Sophia"
      },
      {
      	name: "eugamehost",
      	links: ["https://www.eugamehost.com/"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "eugamehost",
      	flaggedBy: "Sophia"
      },
      {
          name: "FiveM Development 6.0K",
          links: ["https://discord.gg/kTkewVDAAQ"],
          reason: "IP Infringement, Leaking",
          severity: "critical",
          blacklistedSince: "03-06-2025",
          category: "discord",
          keyword: "leaks",
          flaggedBy: "V1 / Fiveworld",
          discordServerId: "1251166093930664048"
      },
      {
      	name: "Lux (Leaks)",
      	links: ["https://discord.gg/WZNSgjAety"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "Lux",
      	flaggedBy: "Sophia",
      	discordServerId: "813858132098285629"
      },
      {
      	name: "qbcore.net (fivemX)",
      	links: ["https://qbcore.net/"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "FiveMX",
      	flaggedBy: "Sophia"
      },
      {
      	name: "leaked-vehicles",
      	links: ["https://discord.gg/9B5vwbU", "https://leaked-vehicles.weebly.com/"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "leaked-vehicles",
      	flaggedBy: "Sophia",
      	discordServerId: "676233312875839507"
      },
      {
      	name: "Five-rp (FiveMX)",
      	links: ["https://five-rp.de/en/"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "Five-rp",
      	flaggedBy: "Sophia"
      },
      {
      	name: "oneX",
      	links: ["https://shop.onex.lt/"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "oneX",
      	flaggedBy: "Sophia"
      },
      {
      	name: "Lewix FiveM Leaks",
      	links: ["https://discord.gg/acFznbJB5H"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "Lewix",
      	flaggedBy: "Sophia",
      	discordServerId: "807213432860180480"
      },
      {
      	name: "5M LEAKS",
      	links: ["https://discord.gg/49GxrnHEU3"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "5M-LEAKS",
      	flaggedBy: "Sophia",
      	discordServerId: "773858749458546730"
      },
      {
      	name: "blossleaks",
      	links: ["https://discord.gg/6gk2A4x9J9", "https://discord.gg/blossleaks"],
      	reason: "Unlicensed Sales, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "blossleaks",
      	flaggedBy: "Sophia",
      	discordServerId: "905846194838839296"
      },
      {
      	name: "LuxeHost",
      	links: ["https://LuxeHost.nl"],
      	reason: "Un-Auth GSP",
      	severity: "high",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "LuxeHost",
      	flaggedBy: "Sophia"
      },
      {
      	name: "fivemupvotes",
      	links: ["https://fivemupvotes.com"],
      	reason: "Unlicensed Sales, Service Selling, ILEGAL",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "fivemupvotes",
      	flaggedBy: "Sophia"
      },
      {
      	name: "FiveM Car Plug",
      	links: ["https://discord.gg/X4VpJ25Mha"],
      	reason: "Unlicensed Sales, ILEGAL, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "discord",
      	keyword: "Fivem-car-plug",
      	flaggedBy: "Sophia",
      	discordServerId: "977031297744666646"
      },
      {
      	name: "Karamers Car Hub",
      	links: ["https://discord.gg/Nxxq8wsevE"],
      	reason: "Unlicensed Sales, ILEGAL, re-selling, Leaking, IP Infringement",
      	severity: "critical",
      	blacklistedSince: "04-06-2025",
      	category: "other",
      	keyword: "Karamers-Car-Hub",
      	flaggedBy: "Sophia",
      	discordServerId: "1282282308056911933"
      },
      {
      	name: "Salty CC",
      	links: ["https://saltyshop.cc"],
      	reason: "Unlicensed Sales, ILEGAL, Cheats",
      	severity: "critical",
      	blacklistedSince: "23-06-2025",
      	category: "other",
      	keyword: "Salty",
      	flaggedBy: "Sophia"
      },
      {
        name: "AcidLeaks",
        links: ["https://discord.gg/leaksfivem,https://discord.gg/7C9jWqApqQ"],
        reason: "Leaking,Stolen Assets,Reselling,None Auth Marketplace",
        severity: "critical",
        blacklistedSince: "08-07-2025", 
        category: "discord",
        keyword: "fivem-leak", 
        discordServerId: "1154875454625431612", 
        flaggedBy: "Rwixy" 
      },
      {
        name: "SCC Network",
        links: ["https://scc-dv.tebex.io/package/6735598", "https://discord.com/invite/6JtNbccumm"],
        reason: "Stolen Assets,Reselling",
        severity: "critical",
        blacklistedSince: "12-07-2025",
        category: "tebex",
        keyword: "uwucafe",
        discordServerId: "976293800777482281",
        flaggedBy: "entangld" 
      },
      {
      name: "idhosting",
      links: ["https://idhosting.dk/", "https://discord.gg/9AVmS8dsRJ"],
      reason: "Unautorised GSP", // Reason of blacklist
      severity: "high", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "19-07-2025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Hosting", // Search Keywords
      discordServerId: "833066974988599356", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
      },
      {
      name: "walehost",
      links: ["https://walehost.com/", "https://discord.gg/walehost"],
      reason: "Unautorised GSP", // Reason of blacklist
      severity: "high", //'low' | 'medium' | 'high' | 'critical';
      blacklistedSince: "20-0572025", // day-month-year
      category: "other", // discord//tebex/other
      keyword: "Hosting", // Search Keywords
      discordServerId: "837456692475330562", // Use this if there is a discord server If applicable
      flaggedBy: "Sophia" //
      },
      {
        name: "CFX Bot",
        links: ["https://cfx.bot/", "https://discord.gg/fakeplayers"],
        reason: "Fake Players Service", // Reason of blacklist
        severity: "critical", //'low' | 'medium' | 'high' | 'critical';
        blacklistedSince: "20-07-2025", // day-month-year
        category: "other", // discord//tebex/other
        keyword: "Sophia", // Search Keywords
        discordServerId: "1299037301510246493", // Use this if there is a discord server If applicable
        flaggedBy: "Sophia" //
      },
          ];

          /// https://cfx.bot/

// {
// name: "Store_Creator_Discord_name",
// links: ["link_1", "link_2"],
// reason: "Reasons_of_Blacklist", // Reason of blacklist
// severity: "Report_Severity", //'low' | 'medium' | 'high' | 'critical';
// blacklistedSince: "26-05-2025", // day-month-year
// category: "discord_tebex_other", // discord//tebex/other
// keyword: "Flagged_word", // Search Keywords
// discordServerId: "000000", // Use this if there is a discord server If applicable
// flaggedBy: "Sophia" //
// },

// Keywords for automatic detection
export const IP_VIOLATION_KEYWORDS = [
  "Acura",
  "Alfa Romeo",
  "Alpina",
  "Apollo",
  "Ariel",
  "Aston Martin",
  "aston-martin",
  "Audi",
  "Abarth",
  "Bentley",
  "BMW",
  "Bugatti",
  "Buick",
  "Brabus",
  "BYD",
  "Bollinger",
  "BAC",
  "Cadillac",
  "Chevrolet",
  "Chrysler",
  "Citroën",
  "Cupra",
  "Caterham",
  "Chery",
  "Cizeta",
  "Czinger",
  "Canoo",
  "Dacia",
  "Daewoo",
  "Daihatsu",
  "Datsun",
  "Dodge",
  "Donkervoort",
  "DS Automobiles",
  "DeLorean",
  "Eagle",
  "Elemental",
  "Exeed",
  "Elio Motors",
  "Elio-Motors",
  "Elio",
  "Edison Motors",
  "Edison-Motors",
  "Elaris",
  "Eunos",
  "Evolve",
  "Engler",
  "Evergrande Auto",
  "Evergrande-Auto",
  "Ferrari",
  "Fiat",
  "Fisker",
  "Ford",
  "Foton",
  "Faraday Future",
  "Faw",
  "Force Motors",
  "Freightliner",
  "Facel Vega",
  "Genesis",
  "GMC",
  "Geely",
  "Ginetta",
  "GAC",
  "Great Wall Motors",
  "Gumpert",
  "Gillet",
  "Gordon Murray",
  "GM Daewoo",
  "Honda",
  "Hummer",
  "Hyundai",
  "Hennessey",
  "Holden",
  "Hispano Suiza",
  "Haval",
  "Haima",
  "Hongqi",
  "Horch",
  "Infiniti",
  "Isuzu",
  "Iveco",
  "Italdesign",
  "Intermeccanica",
  "Irmscher",
  "Invicta",
  "Ioniq",
  "Ikco",
  "Imperia",
  "Jaguar",
  "Jeep",
  "JAC Motors",
  "Jensen",
  "Jinbei",
  "Joint Venture",
  "Jiangling",
  "Jiotto",
  "Jonway",
  "Jordan",
  "Kia",
  "Koenigsegg",
  "KTM",
  "Karma",
  "Kenworth",
  "Kamaz",
  "Keating",
  "Kandi",
  "King Long",
  "Kremer",
  "Lamborghini",
  "Lancia",
  "Land Rover",
  "Lexus",
  "Lincoln",
  "Lotus",
  "Lucid Motors",
  "Lada",
  "Lynk & Co",
  "Lightyear",
  "Maserati",
  "Mazda",
  "McLaren",
  "Mercedes-Benz",
  "Mini",
  "Mitsubishi",
  "Morgan",
  "Mahindra",
  "Maybach",
  "Marussia",
  "MAN",
  "Nissan",
  "Nio",
  "Noble",
  "Navistar",
  "Neoplan",
  "Nash",
  "Opel",
  "Oldsmobile",
  "Osca",
  "Ora",
  "Oullim",
  "Oka",
  "Porsche",
  "Peugeot",
  "Pagani",
  "Pontiac",
  "Polestar",
  "Perodua",
  "Plymouth",
  "Proton",
  "Pininfarina",
  "Qoros",
  "Quant",
  "Qvale",
  "Qiantu",
  "Rivian",
  "Renault",
  "Ram",
  "Rimac",
  "Roewe",
  "Rezvani",
  "Radical",
  "Rossion",
  "Rolls-Royce",
  "rolls Royce",
  "royce",
  "Saab",
  "Subaru",
  "Suzuki",
  "Seat",
  "Skoda",
  "Smart",
  "Scion",
  "Shelby",
  "SsangYong",
  "Spyker",
  "SRT",
  "Saleen",
  "Saturn",
  "Singer",
  "Tesla",
  "Toyota",
  "Tata",
  "Triumph",
  "Troller",
  "Tramontana",
  "TVR",
  "Think",
  "UAZ",
  "Ultima",
  "UM Motors",
  "Uniti",
  "Urban Automotive",
  "Vauxhall",
  "Volkswagen",
  "Volvo",
  "VinFast",
  "Venturi",
  "Vector",
  "Vanderhall",
  "Wiesmann",
  "Wuling",
  "Westfield",
  "W Motors",
  "Wartburg",
  "Waymo",
  "Xpeng",
  "Xinkai",
  "Xiamen Golden Dragon",
  "Yugo",
  "Yulon",
  "Yamaha",
  "Yema",
  "Yes!",
  "Zotye",
  "Zenvo",
  "Zagato",
  "ZAZ",
  "Zhongtong",
  "ZiL",
  "Zenos",
  // Clothing// Acses
  "A Bathing Ape",
  "BAPE",
  "Abercrombie & Fitch",
  "Adidas",
  "Akris",
  "Aldo",
  "AllSaints",
  "Alpha Industries",
  "American Apparel",
  "American Eagle Outfitters",
  "Anthropologie",
  "Arc'teryx",
  "Balenciaga",
  "Balmain",
  "Banana Republic",
  "Barbour",
  "Benetton",
  "Bershka",
  "Billabong",
  "Birkenstock",
  "BODE",
  "Bogner",
  "BOSS (Hugo Boss)",
  "Hugo boss",
  "Boohoo",
  "Bottega Veneta",
  "Brooks Brothers",
  "Brunello Cucinelli",
  "Calvin Klein",
  "Canada Goose",
  "Carhartt",
  "Celine",
  "Chanel",
  "Christian Dior",
  "Christopher Kane",
  "Chrome Hearts",
  "Club Monaco",
  "Coach",
  "Columbia Sportswear",
  "Converse",
  "COS",
  "D&G",
  "Daily Paper",
  "Daks",
  "Dapper Dan",
  "Diesel",
  "Dior Homme",
  "DKNY",
  "Dr. Martens",
  "Dries Van Noten",
  "Dunhill",
  "Ecko Unlimited",
  "Eddie Bauer",
  "Ed Hardy",
  "Elie Saab",
  "Ellesse",
  "Emporio Armani",
  "End Clothing",
  "Erdem",
  "Ermenegildo Zegna",
  "Etro",
  "Fabletics",
  "Fendi",
  "FILA",
  "Finisterre",
  "Fiorucci",
  "Forever 21",
  "Free People",
  "French Connection",
  "Fred Perry",
  "Fruit of the Loom",
  "G-Star RAW",
  "Ganni",
  "GAP",
  "Giorgio Armani",
  "Givenchy",
  "Gildan",
  "Goyard",
  "Gramicci",
  "Guess",
  "Gymshark",
  "H&M",
  "Hanes",
  "Hardy Amies",
  "Helmut Lang",
  "Helly Hansen",
  "Hermès",
  "Heron Preston",
  "Hollister",
  "House of CB",
  "Hugo Boss",
  "HUF",
  "Iceberg",
  "Icon Denim",
  "Incotex",
  "India Circus",
  "Indian Terrain",
  "Inditex",
  "Industrie",
  "Intersport",
  "Isabel Marant",
  "Issey Miyake",
  "J.Crew",
  "Jack & Jones",
  "Jacquemus",
  "Jil Sander",
  "Jimmy Choo",
  "Joe Fresh",
  "John Elliott",
  "John Lewis",
  "Jordan Brand",
  "Juicy Couture",
  "Karl Lagerfeld",
  "Kate Spade",
  "Kenzo",
  "Kering",
  "Khaite",
  "Kickers",
  "Kiko Kostadinov",
  "Kith",
  "Kiton",
  "Ksubi",
  "Lacoste",
  "Lands' End",
  "Lanvin",
  "Lardini",
  "Levi's",
  "L.L. Bean",
  "Loewe",
  "London Fog",
  "Longchamp",
  "Louis Vuitton",
  "Loro Piana",
  "Lululemon",
  "Lucky Brand",
  "Lush Clothing",
  "Madewell",
  "Mango",
  "Marc Jacobs",
  "Marine Serre",
  "Marni",
  "Massimo Dutti",
  "Maison Kitsuné",
  "Maison Margiela",
  "Mavi",
  "Missguided",
  "Napapijri",
  "Nautica",
  "New Balance",
  "New Era",
  "New Look",
  "Next",
  "Nike",
  "Nili Lotan",
  "Norse Projects",
  "North Face",
  "Oakley",
  "Off-White",
  "Old Navy",
  "Opening Ceremony",
  "Outdoor Voices",
  "PacSun",
  "Patagonia",
  "Paul Smith",
  "Pepe Jeans",
  "Prada",
  "Quiksilver",
  "Rag & Bone",
  "Ralph Lauren",
  "Reebok",
  "Rick Owens",
  "Roxy",
  "Saint Laurent",
  "Shein",
  "Supreme",
  "Tommy Hilfiger",
  "Topshop",
  "Tory Burch",
  "Ted Baker",
  "Telfar",
  "True Religion",
  "Under Armour",
  "Uniqlo",
  "Ulla Johnson",
  "Urban Outfitters",
  "Umbro",
  "Ugg",
  "Valentino",
  "Van Heusen",
  "Vans",
  "Versace",
  "Vetements",
  "Victoria's Secret",
  "Vivienne Westwood",
  "Vince",
  "Wrangler",
  "Woolrich",
  "Weekday",
  "WTAPS",
  "Warehouse",
  "We11done",
  "X-girl",
  "Xuly Bët",
  "Xersion",
  "Xander Zhou",
  "Y-3",
  "Yeezy",
  "Yohji Yamamoto",
  "YMC (You Must Create)",
  "Yoox",
  "Zadig & Voltaire",
  "Zegna",
  "Zara",
  "Zanerobe",
  "Zappos",
  "Zac Posen",
  //Tech
  "Apple",
  "Microsoft",
  "Google (Alphabet)",
  "Amazon",
  "Meta (Facebook)",
  "Samsung",
  "Intel",
  "NVIDIA",
  "Tesla",
  "IBM",
  "Sony",
  "Dell Technologies",
  "HP (Hewlett-Packard)",
  "Adobe",
  "Oracle",
  "Cisco Systems",
  "ASUS",
  "Acer",
  "Lenovo",
  "Snap Inc.",
  "Spotify",
  "Netflix",
  "Uber",
  "Airbnb",
  "Zoom",
  "Salesforce",
  "AMD",
  "Dropbox",
  "PayPal",
  "Square (Block, Inc.)",
  "Shopify",
  "TikTok (ByteDance)",
  "Alibaba",
  "Tencent",
  "TSMC (Taiwan Semiconductor)",
  "LG Electronics",
  "Panasonic",
  "Xiaomi",
  "Huawei",
  "Baidu",
  "Slack (Salesforce)",
  "Red Hat (IBM)",
  "GitHub (Microsoft)",
  // Characters and said what
  "superman",
  "Mario",
  "Luigi",
  "Princess Peach",
  "Bowser",
  "Link",
  "Zelda",
  "Ganondorf",
  "Samus Aran",
  "Kirby",
  "Donkey Kong",
  "Pikachu",
  "Charizard",
  "Mewtwo",
  "Sonic the Hedgehog",
  "Tails",
  "Knuckles",
  "Master Chief",
  "Cortana",
  "Kratos",
  "Aloy",
  "Cloud Strife",
  "Sephiroth",
  "Lara Croft",
  "Geralt of Rivia",
  "Arthur Morgan",
  "John Marston",
  "Solid Snake",
  "Big Boss",
  "Ezio Auditore",
  "Altair Ibn-La'Ahad",
  "Connor Kenway",
  "Sam Fisher",
  "Scorpion",
  "Sub-Zero",
  "Raiden",
  "Ryu",
  "Ken",
  "Chun-Li",
  "Mega Man",
  "Pac-Man",
  "Donkey Kong Jr.",
  "Crash Bandicoot",
  "Spyro the Dragon",
  "Jin Kazama",
  "Kazuya Mishima",
  "Heihachi Mishima",
  "Claptrap",
  "Handsome Jack",
  "Marcus Fenix",
  "Dom Santiago",
  "Travis Touchdown",
  "Phoenix Wright",
  "Monokuma",
  "Jill Valentine",
  "Leon S. Kennedy",
  "Chris Redfield",
  "Nathan Drake",
  "Sackboy",
  "Yoshi",
  "Wario",
  "Waluigi",
  "Ridley",
  "Bayonetta",
  "Inkling",
  "Isabelle",
  "Tom Nook",
  "Shulk",
  // Specific Creator Flags
  "dr-"
];

// Code of conduct violation keywords with enhanced contextual filtering
export const COC_VIOLATION_KEYWORDS = [
  // Direct violation terms that should always be flagged
  "porn",
  "porno",
  "pornography",
  "nude",
  "nudity",
  "nsfw",
  "explicit",
  "fetish",
  "erotic",
  "rape",
  "rapist",
  "molest",
  "molester",
  "groom",
  "groomer",
  "pedophile",
  "pedophilia",
  "pedo",
  
  // These require additional context to be a violation
  // They will only be considered violations when paired with other suspicious terms
  "sex",
  "sexual",
  "sexy",
  
  // Contextual words - these will ONLY be flagged when they appear with violation terms
  // By themselves, these are innocent and should not trigger a flag
  "child:",       // The colon suffix indicates these need context to be violations
  "children:",
  "kid:",
  "kiddy:",
  "minor:",
  "underage:",
  "young:",
  "youth:",
  "school:",
  "kindergarten:",
  "preschool:",
  "teen:",
  "toddler:",
  "infant:",
  "baby:",
  "loli:",
  "lolicon:",
  "shotacon:",
  "ageplay:",
  "kidped:",
  "childped:",
  "cp:",
  
  // Cheating-related terms
  "cheat",
  "cheater",
  "cheating",
  "hack",
  "hacker",
  "hacking",
  "exploit",
  "exploiting",
  "exploiter",
  "modmenu",
  "bypass",
  "aimbot",
  "esp",
  "injector",
  "trainer",
  "ddos",
  "dos",
  "swat",
  "dox",
  "doxx",
  "doxxing",
  "grooming"
];

// Additional contextual phrase patterns for more accurate detection
export const COC_CONTEXTUAL_PATTERNS = [
  // These are suspicious pattern combinations that should be flagged
  ["school", "sex"],
  ["school", "porn"],
  ["school", "nude"],
  ["young", "sex"],
  ["young", "porn"],
  ["young", "nude"],
  ["child", "sex"],
  ["child", "porn"],
  ["child", "nude"],
  ["teen", "sex"],
  ["teen", "porn"],
  ["teen", "nude"],
  ["kid", "sex"],
  ["kid", "porn"],
  ["kid", "nude"]
];

export const IP_BYPASS_KEYWORDS = [
  "fivem",
  "qs-",  // Quasar
  "apx",  // Apex Scripts (OLD)
  "apex_",  //Apex Scripts (NEW)
  "RxZ_",
  "Rx",
  "rtx_",  // RTX Development
  "dynyx_",  // Dynyx Scripts (OLD)
  "dynyx-",  // Dynyx Scripts (NEW)
  "wassabi", // Wassabi Scripts
  "jg-",  // JG Scripts
  "drc_",  // DRC Scripts
  "mrc-", // Mr Crowly
  "mrc_" // Mr Crowly
];

export const COC_BYPASS_KEYWORDS = [
  "fivem",
  "qs-",  // Quasar
  "apx",  // Apex Scripts (OLD)
  "apex_",  //Apex Scripts (NEW)
  "RxZ_",
  "Rx",
  "rtx_",  // RTX Development
  "dynyx_",  // Dynyx Scripts (OLD)
  "dynyx-",  // Dynyx Scripts (NEW)
  "wassabi", // Wassabi Scripts
  "jg-",  // JG Scripts
  "drc_",  // DRC Scripts
  "mrc-", // Mr Crowly
  "mrc_" // Mr Crowly
];
