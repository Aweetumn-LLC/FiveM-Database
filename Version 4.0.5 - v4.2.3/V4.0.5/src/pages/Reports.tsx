
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, AlertTriangle, CheckCircle, Clock, Users, XCircle } from "lucide-react";
import { toast } from "sonner";

// Updated mock data with new format
const mockReports = [
  {
    id: "1",
    serverName: "Next Level",
    serverCode: "/kk8xyr",
    connectionCode: "/kk8xyr",
    description: "Next Level",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non TOS Compliant Vehicles",
      "Clothing",
      "MLO's",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/JustBull/summary"
  },
  {
    id: "2",
    serverName: "Lowkey Roleplay",
    serverCode: "/ll7rjv",
    connectionCode: "/ll7rjv",
    description: "Lowkey Roleplay",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non-TOS Compliant Vehicles",
      "Clothing",
      "MLO's",
      "Unauthorized monetization",
      "Blacklisted Resources"
    ],
    ownerProfile: "https://forum.cfx.re/u/bobmarleynug420/summary"
  },
  {
    id: "3",
    serverName: "San Andreas State Roleplay",
    serverCode: "/bmjebd",
    connectionCode: "/bmjebd",
    description: "San Andreas State Roleplay",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non-TOS Compliant Vehicles",
      "Clothing",
      "MLO's",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/SRTJake/summary"
  },
  

  {
    id: "4",
    serverName: "Speed Labs",
    serverCode: "/ry6778",
    connectionCode: "/ry6778",
    description: "Speed Labs",
    status: "resolved" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non-TOS Compliant Vehicles",
      "Clothing",
      "MLO's"
    ],
    ownerProfile: "https://forum.cfx.re/u/5mspeedlab/summary"
  },

  {
    id: "5",
    serverName: "Rice City | Japan | Free roam",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "Rice City | Japan | Free roam",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non-TOS Compliant Vehicles",
      "Clothing",
      "MLO's",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/Miiisty/summary"
  },

  {
    id: "6",
    serverName: "VeraCity",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "VeraCity",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Map related IP",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "Nill"
  },

  {
    id: "7",
    serverName: "PoliceMP",
    serverCode: "/xxkprx",
    connectionCode: "/xxkprx",
    description: "PoliceMP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Map related IP",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/PMPDev/summary"
  },

  {
    id: "8",
    serverName: "PARADISE STATE ROLEPLAY",
    serverCode: "/zy9l6p",
    connectionCode: "/zy9l6p",
    description: "PARADISE STATE ROLEPLAY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/Georgie15/profile-hidden"
  },

  {
    id: "9",
    serverName: "SWITCHED RP",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "SWITCHED RP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/radz_ryan/summary"
  },

  {
    id: "10",
    serverName: "TRIGZ WORLD RP",
    serverCode: "/lz7vjj",
    connectionCode: "/lz7vjj",
    description: "TRIGZ WORLD RP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/TriGz_World/summary"
  },

  {
    id: "11",
    serverName: "DC CARS",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "DC CARS",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Selling Non Compliant Vehicles"
    ],
    ownerProfile: "https://dc-cars.tebex.io/category/cars"
  },

  {
    id: "12",
    serverName: "British frontlise rp",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "British frontlise rp",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Selling Non Compliant Vehicles",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "Nill"
  },

  {
    id: "13",
    serverName: "pohodari WL",
    serverCode: "/av3pmk",
    connectionCode: "/av3pmk",
    description: "pohodari WL",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Selling Non Compliant Vehicles",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/squizer/summary"
  },

  {
    id: "14",
    serverName: "pohodari non WL",
    serverCode: "/av3pmk",
    connectionCode: "/av3pmk",
    description: "pohodari non WL",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Selling Non Compliant Vehicles",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/squizer/summary"
  },

  {
    id: "15",
    serverName: "British Enforcement RP",
    serverCode: "/b36akp",
    connectionCode: "/b36akp",
    description: "British Enforcement RP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Selling Non Compliant Vehicles",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/British_Enforcement/summary"
  },

  {
    id: "16",
    serverName: "Trident Network 1.0",
    serverCode: "/4jbrl9",
    connectionCode: "/4jbrl9",
    description: "Trident Network 1.0",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Selling Non Compliant Vehicles",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/jsabzz_1/summary"
  },

  {
    id: "17",
    serverName: "Static RP",
    serverCode: "/bqzoop",
    connectionCode: "/bqzoop",
    description: "Static RP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/N93/summary"
  },

  {
    id: "18",
    serverName: "fury Roleplay",
    serverCode: "/v5xkkx",
    connectionCode: "/v5xkkx",
    description: "fury Roleplay",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/furyrp.ro/summary"
  },

  {
    id: "19",
    serverName: "BlueSkyRP",
    serverCode: "/g5dogz",
    connectionCode: "/g5dogz",
    description: "BlueSkyRP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/Mr.Jacob/summary"
  },

  {
    id: "20",
    serverName: "DRAGON ROLEPLAY",
    serverCode: "/8ve5e3",
    connectionCode: "/8ve5e3",
    description: "DRAGON ROLEPLAY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/dragon_rp4/summary"
  },

  {
    id: "21",
    serverName: "RICH CITY ROLEPLAY",
    serverCode: "/4vabjo",
    connectionCode: "/4vabjo",
    description: "RICH CITY ROLEPLAY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/richcityrp_pk/summary"
  },

  {
    id: "22",
    serverName: "DRAGON ROLEPLAY",
    serverCode: "/8ve5e3",
    connectionCode: "/8ve5e3",
    description: "DRAGON ROLEPLAY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/dragon_rp4/summary"
  },

  {
    id: "23",
    serverName: "Thin Line",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "Thin Line",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://thinlinesanctuary.com"
  },

  {
    id: "24",
    serverName: "SARP",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "SARP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://www.patreon.com/saroleplay1"
  },

  {
    id: "25",
    serverName: "cidade alta rp",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "cidade alta rp",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://cidadealtarp.com/"
  },

  {
    id: "26",
    serverName: "av-scripts",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "av-scripts",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "CODE OF CONDUCT",
      "SELLING CHILD PEDS",
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://av-scripts.tebex.io/package/4449637"
  },

  {
    id: "27",
    serverName: "kentuckyrp",
    serverCode: "/lok5k7",
    connectionCode: "/lok5k7",
    description: "kentuckyrp",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/kentuckyroleplay/summary"
  },

  {
    id: "28",
    serverName: "Capital City",
    serverCode: "/zkd335",
    connectionCode: "/zkd335",
    description: "Capital City",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/HigorBourges/summary"
  },

  {
    id: "29",
    serverName: "Gun Game V",
    serverCode: "/m9kvd7",
    connectionCode: "/m9kvd7",
    description: "Gun Game V",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "N/a"
  },

  {
    id: "30",
    serverName: "Drill-UK",
    serverCode: "/e3r47a",
    connectionCode: "/e3r47a",
    description: "Drill-UK",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/DRILL-UK/summary"
  },

  {
    id: "31",
    serverName: "PA Scripts",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "PA Scripts",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Unauthorized monetization"
    ],
    ownerProfile: "https://www.patreon.com/pafivemscripts/shop"
  },

  {
    id: "32",
    serverName: "MNRP",
    serverCode: "/4eedg9",
    connectionCode: "/4eedg9",
    description: "MNRP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/kFxDaKing/summary"
  },

  {
    id: "33",
    serverName: "VineWood RP",
    serverCode: "/pprvvy",
    connectionCode: "/pprvvy",
    description: "VineWood RP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/VisionGames/summary"
  },

  {
    id: "34",
    serverName: "MaldivasRP",
    serverCode: "/mkyv9d",
    connectionCode: "/mkyv9d",
    description: "MaldivasRP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/MaldivasRPV1/summary"
  },

  {
    id: "35",
    serverName: "Empyrean City",
    serverCode: "/qgarq9",
    connectionCode: "/qgarq9",
    description: "Empyrean City",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/juswaaaax/summary"
  },

  {
    id: "36",
    serverName: "Life In Chiraq",
    serverCode: "/brelvd",
    connectionCode: "/brelvd",
    description: "Life In Chiraq",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Non tos compliant Vehicles",
      "Clothing and mlos",
      "Unauthorized monetization"
    ],
    ownerProfile: "https://forum.cfx.re/u/ITZ_SWISH/summary"
  },

  {
    id: "38",
    serverName: "ST TOWN",
    serverCode: "/63o3l8",
    connectionCode: "/63o3l8",
    description: "ST TOWN",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/czdev"
  },

  {
    id: "39",
    serverName: "^6圣罗兰 Q群820171122招团队入驻给扶持KOOK搜索1066",
    serverCode: "/bz7aal",
    connectionCode: "/bz7aal",
    description: "^6圣罗兰 Q群820171122招团队入驻给扶持KOOK搜索1066",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/ShangYin111"
  },

  {
    id: "40",
    serverName: "^6梦幻Dreamy",
    serverCode: "/d4rxay",
    connectionCode: "/d4rxay",
    description: "^6梦幻Dreamy",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/Isazs777"
  },

  {
    id: "41",
    serverName: "^6起点-半RP生活服丨Q群698954445丨美女接待⭐",
    serverCode: "/egrvlp",
    connectionCode: "/egrvlp",
    description: "^6起点-半RP生活服丨Q群698954445丨美女接待⭐",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/1026096026"
  },

  {
    id: "42",
    serverName: "^4 HYBRID TOWN",
    serverCode: "/3q788z",
    connectionCode: "/3q788z",
    description: "^4 HYBRID TOWN",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/kbkeyshop03"
  },

  {
    id: "43",
    serverName: "Brasilia RP server 1",
    serverCode: "/xl9dex",
    connectionCode: "/xl9dex",
    description: "Brasilia RP server 1",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/Getaway_Driver"
  },

  {
    id: "44",
    serverName: "CLOUD COMMUNITY & STORY",
    serverCode: "/87k9d4",
    connectionCode: "/87k9d4",
    description: "CLOUD COMMUNITY & STORY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/No.1_Key_VIP"
  },

  {
    id: "45",
    serverName: "Brasilia RP server 2",
    serverCode: "/3abzey",
    connectionCode: "/3abzey",
    description: "Brasilia RP server 2",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/Getaway_Driver"
  },

  {
    id: "46",
    serverName: "^3VITAL RP NEW WHITELIST 18+ ECONOMY SERVER",
    serverCode: "/ogpvmv",
    connectionCode: "/ogpvmv",
    description: "^3VITAL RP NEW WHITELIST 18+ ECONOMY SERVER",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/GrumpyMonroe"
  },

  {
    id: "47",
    serverName: "^8STATIC ^8FIVEPD 🚔",
    serverCode: "/egmomd",
    connectionCode: "/egmomd",
    description: "^8STATIC ^8FIVEPD 🚔",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/Nergotoo"
  },

  {
    id: "48",
    serverName: "CrimeInTheD Serious RP",
    serverCode: "/rd9e38",
    connectionCode: "/rd9e38",
    description: "CrimeInTheD Serious RP",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/CrimeInTheD"
  },

  {
    id: "49",
    serverName: "^4GUAYAQUIL RP ☀️",
    serverCode: "/eb3dga",
    connectionCode: "/eb3dga",
    description: "^4GUAYAQUIL RP ☀️",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/LJA-STUDIOS"
  },

  {
    id: "50",
    serverName: "STATIC FIVEPD: RED",
    serverCode: "/3ddyrr",
    connectionCode: "/3ddyrr",
    description: "STATIC FIVEPD: RED",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/Nergotoo"
  },

  {
    id: "52",
    serverName: "^Belgium City 🌴",
    serverCode: "/9k9m4a",
    connectionCode: "/9k9m4a",
    description: "^Belgium City 🌴",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/BelgiumCity"
  },

  {
    id: "53",
    serverName: "^4Central London V1.5",
    serverCode: "/e7kbqb",
    connectionCode: "/e7kbqb",
    description: "^4Central London V1.5",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/Baileyy_YT24"
  },

  {
    id: "54",
    serverName: "^4Cops ^0Vs ^1Robbers",
    serverCode: "/g9k35o",
    connectionCode: "/g9k35o",
    description: "^4Cops ^0Vs ^1Robbers",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/monte_monte"
  },

  {
    id: "55",
    serverName: "^5Tennessee State Roleplay ^0| ^8vMenu ^0| ^4LEO ^0| ^2CIV",
    serverCode: "/xqa6og",
    connectionCode: "/xqa6og",
    description: "^5Tennessee State Roleplay ^0| ^8vMenu ^0| ^4LEO ^0| ^2CIV",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/JonathaF"
  },

  {
    id: "56",
    serverName: "My Way RP V2",
    serverCode: "/zeyj34",
    connectionCode: "/zeyj34",
    description: "My Way RP V2",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/MyWayRP"
  },

  {
    id: "57",
    serverName: "^3Streets Of Florida💥 ^2 ^4|| ^4Streetlife🎲 Based || ^4Starting Cash 3.5 Million💰 || ^4E-Girl Friendly♥️ || ^4Community Friendly😎 || ^4Real Economy💯 || ^4Real Jobs🦾 || ^4Custom Cars🏁 || ^4Rob NPC's🔫 || ^4Play as Ped👼🏾 || ^4Drugs💊 || ^4Gangs Welcome🩸 ||",
    serverCode: "/77kr7v",
    connectionCode: "/77kr7v",
    description: "^3Streets Of Florida💥 ^2 ^4|| ^4Streetlife🎲 Based || ^4Starting Cash 3.5 Million💰 || ^4E-Girl Friendly♥️ || ^4Community Friendly😎 || ^4Real Economy💯 || ^4Real Jobs🦾 || ^4Custom Cars🏁 || ^4Rob NPC's🔫 || ^4Play as Ped👼🏾 || ^4Drugs💊 || ^4Gangs Welcome🩸 ||",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct Violation",
      "Breaking IP Laws"
    ],
    ownerProfile: "https://forum.cfx.re/u/FlawdaBoi"
  },

  {
    id: "58",
    serverName: "SPACE RolePlay 3.0",
    serverCode: "/dlgap3",
    connectionCode: "/dlgap3",
    description: "SPACE RolePlay 3.0",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/Tianshao999"
  },

  {
    id: "59",
    serverName: "三叶TreFoil RP4.0丨登陆器进服丨整顿重来丨不权限丨极致优化丨顶尖玩法",
    serverCode: "/r8rrpg",
    connectionCode: "/r8rrpg",
    description: "三叶TreFoil RP4.0丨登陆器进服丨整顿重来丨不权限丨极致优化丨顶尖玩法",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/sansan7777"
  },

  {
    id: "60",
    serverName: "魔都2.0>新人2000万>组队副本>QQ群386396772>极致玩法>奖励丰富>结婚系统>宠物系统>",
    serverCode: "/47k9ko",
    connectionCode: "/47k9ko",
    description: "魔都2.0>新人2000万>组队副本>QQ群386396772>极致玩法>奖励丰富>结婚系统>宠物系统>",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/wansi111"
  },

  {
    id: "61",
    serverName: "夜玫瑰｜招团队入驻有扶持",
    serverCode: "/q6lgy6",
    connectionCode: "/q6lgy6",
    description: "夜玫瑰｜招团队入驻有扶持",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/Foxlyy"
  },

  {
    id: "62",
    serverName: "英雄 半RP 进群下载登录器 Q群632400909 KOOK 166666",
    serverCode: "/7z7dqv",
    connectionCode: "/7z7dqv",
    description: "英雄 半RP 进群下载登录器 Q群632400909 KOOK 166666",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/lianming1"
  },

  {
    id: "63",
    serverName: "Devaus älpee  SIGMA👑",
    serverCode: "/kydvg7",
    connectionCode: "/kydvg7",
    description: "Devaus älpee  SIGMA👑",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/lussu62"
  },

  {
    id: "64",
    serverName: "曼德拉Mandela 半RP角色扮演 1.0 进群过白名单 QQ群：231926901",
    serverCode: "/kkgpg6",
    connectionCode: "/kkgpg6",
    description: "曼德拉Mandela 半RP角色扮演 1.0 进群过白名单 QQ群：231926901",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/TangYINN"
  },

  {
    id: "65",
    serverName: "达芬奇-半R-无权限-无管理-纯玩家服务器-免白名单-无需下载器-Q群:216231015",
    serverCode: "/d7rzkd",
    connectionCode: "/d7rzkd",
    description: "达芬奇-半R-无权限-无管理-纯玩家服务器-免白名单-无需下载器-Q群:216231015",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/BB9999"
  },

  {
    id: "66",
    serverName: "[LTU] MEMORY RP | 🏙️ GYVENIMAS MIESTE | 🚔 POLICIJA & MAFIJOS | 🏡 NUOSAVI NAMAI | 🚗 REALISTINĖ EKONOMIKA | 💼 DARBAI SU RANGŲ SISTEMA | 📜 TEISINĖ SISTEMA | 🔫 GINKLŲ PREKYBA | 🎭 NELEGALIOS VEIKLOS |",
    serverCode: "/lg6doj",
    connectionCode: "/lg6doj",
    description: "[LTU] MEMORY RP | 🏙️ GYVENIMAS MIESTE | 🚔 POLICIJA & MAFIJOS | 🏡 NUOSAVI NAMAI | 🚗 REALISTINĖ EKONOMIKA | 💼 DARBAI SU RANGŲ SISTEMA | 📜 TEISINĖ SISTEMA | 🔫 GINKLŲ PREKYBA | 🎭 NELEGALIOS VEIKLOS |",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/Augis_II"
  },

  {
    id: "67",
    serverName: "DMVRP Dev By JayRuger",
    serverCode: "/3q4oxy",
    connectionCode: "/3q4oxy",
    description: "DMVRP Dev By JayRuger",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/JayRuger"
  },

  {
    id: "68",
    serverName: "Stories of Southside Chiraq 💥| #1 Serious Chicago | JOIN NOW ⚡ Serious Roleplay",
    serverCode: "/dqgemq",
    connectionCode: "/dqgemq",
    description: "Stories of Southside Chiraq 💥| #1 Serious Chicago | JOIN NOW ⚡ Serious Roleplay",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/ChicagoReborn"
  },

  {
    id: "69",
    serverName: "⚡6HE RAQ RP V2⚡│🔥Real Roleplay🔥|📈Most Optimized Gang Server📈│💊Custom Drugs💊│🎥Stremer Prio🎥│👧Female Prio👧│🦺Active Staff🦺│📊High FPS📊│📚discord.gg/theraqrp📚|🚔ctive PD & EMS🚔",
    serverCode: "/53yp9d",
    connectionCode: "/53yp9d",
    description: "⚡6HE RAQ RP V2⚡│🔥Real Roleplay🔥|📈Most Optimized Gang Server📈│💊Custom Drugs💊│🎥Stremer Prio🎥│👧Female Prio👧│🦺Active Staff🦺│📊High FPS📊│📚discord.gg/theraqrp📚|🚔ctive PD & EMS🚔",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/lidrxpxff"
  },

  {
    id: "70",
    serverName: "Black Side RP | 𝘐𝘮𝘮𝘦𝘳𝘴𝘪𝘰𝘯 𝘙𝘰𝘭𝘦𝘱𝘭𝘢𝘺 𝘍𝘰𝘳𝘮𝘪𝘥𝘢𝘣𝘭𝘦",
    serverCode: "/9kdklm",
    connectionCode: "/9kdklm",
    description: "Black Side RP | 𝘐𝘮𝘮𝘦𝘳𝘴𝘪𝘰𝘯 𝘙𝘰𝘭𝘦𝘱𝘭𝘢𝘺 𝘍𝘰𝘳𝘮𝘪𝘥𝘢𝘣𝘭𝘦",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/kimmypelletier"
  },

  {
    id: "71",
    serverName: "醉幻之都1.0 半rp正式启航 | Q群1043779130 | 过白找管理",
    serverCode: "/o78kgr",
    connectionCode: "/o78kgr",
    description: "醉幻之都1.0 半rp正式启航 | Q群1043779130 | 过白找管理",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/1094757896"
  },

  {
    id: "72",
    serverName: "◆云顶Yun Ding 1.0半RP欢迎你QQ群：991358421◆",
    serverCode: "/jdqozl",
    connectionCode: "/jdqozl",
    description: "◆云顶Yun Ding 1.0半RP欢迎你QQ群：991358421◆",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/Lao.A"
  },

  {
    id: "73",
    serverName: "奥斯卡 𝙊𝙎𝙘𝙖𝙧半RP扮演 & QQ：129267587 & KOOK:11100307",
    serverCode: "/el3xrp",
    connectionCode: "/el3xrp",
    description: "奥斯卡 𝙊𝙎𝙘𝙖𝙧半RP扮演 & QQ：129267587 & KOOK:11100307",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/laomaogeigei"
  },

  {
    id: "74",
    serverName: "^天使之翼>新人500万>结婚系统>真人玩家>德州扑克>",
    serverCode: "/qo7jy4",
    connectionCode: "/qo7jy4",
    description: "^天使之翼>新人500万>结婚系统>真人玩家>德州扑克>",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/TianTianAiYaoGun"
  },

  {
    id: "75",
    serverName: "黎明之都半RP免白名单 QQ群719131793多玩法千辆精车模",
    serverCode: "/b5r3rp",
    connectionCode: "/b5r3rp",
    description: "黎明之都半RP免白名单 QQ群719131793多玩法千辆精车模",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/suqi666"
  },

  {
    id: "76",
    serverName: "MIA猫咖屋 |进群下载登录器|美女接待|服主听劝",
    serverCode: "/eljmv3",
    connectionCode: "/eljmv3",
    description: "MIA猫咖屋 |进群下载登录器|美女接待|服主听劝",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/God-Z1"
  },

  {
    id: "77",
    serverName: "Grand closeding Came From Nothing NYC Serious RP | CUSTOM DRUGS | FREE GANGS | CUSTOM HOUSING | SREAMER FRIENDLY",
    serverCode: "/pmavlm",
    connectionCode: "/pmavlm",
    description: "Grand closeding Came From Nothing NYC Serious RP | CUSTOM DRUGS | FREE GANGS | CUSTOM HOUSING | SREAMER FRIENDLY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/oRojo"
  },

  {
    id: "78",
    serverName: "✨ HoodDreamsRp ✨ | 🔥 Serious RP 🔥 | 🌿 Full Drug System 🌿 | 💼 Player-Owned Jobs 💼 | 🚗 Player-Owned Dealerships 🚗 | 🔧 Player-Owned Mechanics 🔧 | 🎉 Weekly Events & Prizes 🎉 | 💖 eGirl Friendly 💖 | 🤝 Caring Community 🤝",
    serverCode: "/5xllmr",
    connectionCode: "/5xllmr",
    description: "✨ HoodDreamsRp ✨ | 🔥 Serious RP 🔥 | 🌿 Full Drug System 🌿 | 💼 Player-Owned Jobs 💼 | 🚗 Player-Owned Dealerships 🚗 | 🔧 Player-Owned Mechanics 🔧 | 🎉 Weekly Events & Prizes 🎉 | 💖 eGirl Friendly 💖 | 🤝 Caring Community 🤝",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/SimplyDK"
  },

  {
    id: "79",
    serverName: "Dope Wars Roleplay 🔥 | 18+ SEMI GANG RP | iring LEO and EMS | Custom Vehicles | Custom Clothing | Custom Drugs | Realistic Economy | 1500+ Houses | Sell Drugs Anywhere | Streamer Friendly |",
    serverCode: "/ybzm55",
    connectionCode: "/ybzm55",
    description: "Dope Wars Roleplay 🔥 | 18+ SEMI GANG RP | iring LEO and EMS | Custom Vehicles | Custom Clothing | Custom Drugs | Realistic Economy | 1500+ Houses | Sell Drugs Anywhere | Streamer Friendly |",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/DopeWarsRoleplay"
  },

  {
    id: "80",
    serverName: "life in chi city",
    serverCode: "/53a4rz",
    connectionCode: "/53a4rz",
    description: "life in chi city",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/PrettyBoyDj"
  },

  {
    id: "81",
    serverName: "🌎💰GRAND closedING🌎💰 FREE GANGS TRAPLOVERP🌎 | 💰  FRESH ECONOMY💰 | 🔫 #1 Serious RP🔫 |  E Girl/Stream Friendly🎥 | 👕 Custom Drip 👕 | 🔪 Gang Wars 🔪 | 👷 Active Staff 👷 | 💻 HIGH FPS 💻| 🌎",
    serverCode: "/97o6qk",
    connectionCode: "/97o6qk",
    description: "🌎💰GRAND closedING🌎💰 FREE GANGS TRAPLOVERP🌎 | 💰  FRESH ECONOMY💰 | 🔫 #1 Serious RP🔫 |  E Girl/Stream Friendly🎥 | 👕 Custom Drip 👕 | 🔪 Gang Wars 🔪 | 👷 Active Staff 👷 | 💻 HIGH FPS 💻| 🌎",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/kwl-uda"
  },

  {
    id: "82",
    serverName: "Dirty South RP |🔥 GRAND closedING 🔥| 🚔 NOW HIRING POLICE & EMS 🚑 | Streamer Friendly 🎥 | 🚗 Custom Cars & Jobs |🏢 Player-Owned Businesses | Active & Friendly Staff 👮",
    serverCode: "/j7xp7p",
    connectionCode: "/j7xp7p",
    description: "Dirty South RP |🔥 GRAND closedING 🔥| 🚔 NOW HIRING POLICE & EMS 🚑 | Streamer Friendly 🎥 | 🚗 Custom Cars & Jobs |🏢 Player-Owned Businesses | Active & Friendly Staff 👮",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/DirtySouth-RP"
  },

  {
    id: "83",
    serverName: "BankRoll Fresh RP$ Custom Car$ Custom items$ Custom Drugs$ Gangs AND MORE QBCore Framework",
    serverCode: "/yzagr5",
    connectionCode: "/yzagr5",
    description: "BankRoll Fresh RP$ Custom Car$ Custom items$ Custom Drugs$ Gangs AND MORE QBCore Framework",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/Timmy_U_fuNNy"
  },

  {
    id: "84",
    serverName: "大内蒙半RP1.0 加QQ群579732284 ⭐",
    serverCode: "/j7qej4",
    connectionCode: "/j7qej4",
    description: "大内蒙半RP1.0 加QQ群579732284 ⭐",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/ShiQ"
  },

  {
    id: "85",
    serverName: "👿 Forgotten LA | V3 👿 | ⭐ CUSTOM COIN GUNS⭐ | 🪽 FPS OPTIMIZED SERVER 🪽 | 📊 LA MAP BASED SEMI SERIOUS 📊 | 📦 STARTER PACKS 📦 | ☠️ GANG ROLEPLAY ☠️ | ⚔️ BLOCK TO BLOCK KOS ⚔️ | 👕 CUSTOM CLOTHING 👕 | 💊 CUSTOM DRUGS 💊 | 🛡️ ACTIVE & FAIR STAFF 🛡️ | 🎥 STREAMER FRIENDLY 🎥 | 🏥 CUSTOM EMS 🏥 | 🌿 DIFFERENT DRUG LOCATIONS 🌿 | 👾 NEW-PLAYER FRIENDLY 👾 | 🔗 DISCORD.GG/FGLA 🚀 #1 SEMI SERIOUS SERVER",
    serverCode: "/3vkyxz",
    connectionCode: "/3vkyxz",
    description: "👿 Forgotten LA | V3 👿 | ⭐ CUSTOM COIN GUNS⭐ | 🪽 FPS OPTIMIZED SERVER 🪽 | 📊 LA MAP BASED SEMI SERIOUS 📊 | 📦 STARTER PACKS 📦 | ☠️ GANG ROLEPLAY ☠️ | ⚔️ BLOCK TO BLOCK KOS ⚔️ | 👕 CUSTOM CLOTHING 👕 | 💊 CUSTOM DRUGS 💊 | 🛡️ ACTIVE & FAIR STAFF 🛡️ | 🎥 STREAMER FRIENDLY 🎥 | 🏥 CUSTOM EMS 🏥 | 🌿 DIFFERENT DRUG LOCATIONS 🌿 | 👾 NEW-PLAYER FRIENDLY 👾 | 🔗 DISCORD.GG/FGLA 🚀 #1 SEMI SERIOUS SERVER",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/e1venk"
  },

  {
    id: "86",
    serverName: "曼德拉Mandela 半RP角色扮演 1.0 进群过白名单 QQ群：231926901",
    serverCode: "/kkgpg6",
    connectionCode: "/kkgpg6",
    description: "曼德拉Mandela 半RP角色扮演 1.0 进群过白名单 QQ群：231926901",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/TangYINN"
  },

  {
    id: "87",
    serverName: "达芬奇-半R-无权限-无管理-纯玩家服务器-免白名单-无需下载器-Q群:216231015",
    serverCode: "/d7rzkd",
    connectionCode: "/d7rzkd",
    description: "达芬奇-半R-无权限-无管理-纯玩家服务器-免白名单-无需下载器-Q群:216231015",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/BB9999"
  },

  {
    id: "88",
    serverName: "GNB City",
    serverCode: "/qdek79",
    connectionCode: "/qdek79",
    description: "GNB City",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/gnbcity"
  },

  {
    id: "89",
    serverName: "Stories of Southside Chiraq 💥| #1 Serious Chicago | JOIN NOW ⚡ Serious Roleplay",
    serverCode: "/dqgemq",
    connectionCode: "/dqgemq",
    description: "Stories of Southside Chiraq 💥| #1 Serious Chicago | JOIN NOW ⚡ Serious Roleplay",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/ChicagoReborn"
  },

  {
    id: "90",
    serverName: "MidNightRP | 1.1 | WL-OFF | PL",
    serverCode: "/pzmgma",
    connectionCode: "/pzmgma",
    description: "MidNightRP | 1.1 | WL-OFF | PL",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/BenZekko"
  },

  {
    id: "91",
    serverName: "Fiinesse The Bag |18+ semi serious roleplay💯|💗E-girl/Streamer Friendly🎥|Realistic Economy 💰|Player owned Jobs & Businesses|Hiring EMS 🚑/PD👮/Staff🖥️ |Custom Vehicles 🏎️",
    serverCode: "/m9qrza",
    connectionCode: "/m9qrza",
    description: "Fiinesse The Bag |18+ semi serious roleplay💯|💗E-girl/Streamer Friendly🎥|Realistic Economy 💰|Player owned Jobs & Businesses|Hiring EMS 🚑/PD👮/Staff🖥️ |Custom Vehicles 🏎️",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/BIGTM"
  },

  {
    id: "92",
    serverName: "🌴 Gangsters Paradice🌴 | 💜 E-Girl / Streamer Friendly 📷 |😈 Serious Gang RP | 🏡 Custom Houses 🏡 | 👮 Hiring Police 👮 | 🚑 Hiring EMS 🚑 |  🚗 Custom Vehicles🚗 | 👼 Active Staff 👼 |discord.gg/hVgGS6tvd4| 💊 Custom Drugs💊 | 🕶️ Custom Drip",
    serverCode: "/odgzjr",
    connectionCode: "/odgzjr",
    description: "🌴 Gangsters Paradice🌴 | 💜 E-Girl / Streamer Friendly 📷 |😈 Serious Gang RP | 🏡 Custom Houses 🏡 | 👮 Hiring Police 👮 | 🚑 Hiring EMS 🚑 |  🚗 Custom Vehicles🚗 | 👼 Active Staff 👼 |discord.gg/hVgGS6tvd4| 💊 Custom Drugs💊 | 🕶️ Custom Drip",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/BagBoyTeazy"
  },

  {
    id: "93",
    serverName: "欲都 半Rp 最新版本 QQ群：988888861 免登录器",
    serverCode: "/qxqb46",
    connectionCode: "/qxqb46",
    description: "欲都 半Rp 最新版本 QQ群：988888861 免登录器",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/A-565758"
  },

  {
    id: "94",
    serverName: "醉幻之都1.0 半rp正式启航 | Q群1043779130 | 过白找管理",
    serverCode: "/o78kgr",
    connectionCode: "/o78kgr",
    description: "醉幻之都1.0 半rp正式启航 | Q群1043779130 | 过白找管理",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/1094757896"
  },

  {
    id: "95",
    serverName: "◆云顶Yun Ding 1.0半RP欢迎你QQ群：991358421◆",
    serverCode: "/jdqozl",
    connectionCode: "/jdqozl",
    description: "◆云顶Yun Ding 1.0半RP欢迎你QQ群：991358421◆",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/Lao.A"
  },

  {
    id: "96",
    serverName: "奥斯卡 𝙊𝙎𝙘𝙖𝙧半RP扮演 & QQ：129267587 & KOOK:11100307",
    serverCode: "/el3xrp",
    connectionCode: "/el3xrp",
    description: "奥斯卡 𝙊𝙎𝙘𝙖𝙧半RP扮演 & QQ：129267587 & KOOK:11100307",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/laomaogeigei"
  },

  {
    id: "97",
    serverName: "MIA猫咖屋 |进群下载登录器|美女接待|服主听劝",
    serverCode: "/eljmv3",
    connectionCode: "/eljmv3",
    description: "MIA猫咖屋 |进群下载登录器|美女接待|服主听劝",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/God-Z1"
  },

  {
    id: "98",
    serverName: "Outside RP | True-to-Life Roleplay | Grand closeding | Active Community | Semi-Serious RP | Active Staff | Fresh Economy",
    serverCode: "/ak68ak",
    connectionCode: "/ak68ak",
    description: "Outside RP | True-to-Life Roleplay | Grand closeding | Active Community | Semi-Serious RP | Active Staff | Fresh Economy",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/PabloShoota"
  },

  {
    id: "99",
    serverName: "黎明之都半RP免白名单 QQ群719131793多玩法千辆精车模",
    serverCode: "/b5r3rp",
    connectionCode: "/b5r3rp",
    description: "黎明之都半RP免白名单 QQ群719131793多玩法千辆精车模",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement",
      "Code of Conduct"
    ],
    ownerProfile: "https://forum.cfx.re/u/suqi666"
  },

  {
    id: "100",
    serverName: "Grand closeding Came From Nothing NYC Serious RP | CUSTOM DRUGS | FREE GANGS | CUSTOM HOUSING | SREAMER FRIENDLY",
    serverCode: "/pmavlm",
    connectionCode: "/pmavlm",
    description: "Grand closeding Came From Nothing NYC Serious RP | CUSTOM DRUGS | FREE GANGS | CUSTOM HOUSING | SREAMER FRIENDLY",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/oRojo"
  },

  {
    id: "101",
    serverName: "Swargarajyam Roleplay V2 | Beta Phase",
    serverCode: "/85m89b",
    connectionCode: "/85m89b",
    description: "Swargarajyam Roleplay V2 | Beta Phase",
    status: "closed" as const,
    type: "TOS//COC",
    reportDate: "2025",
    reportedBy: "Maddy",
    violations: [
      "Code of Conduct",
      "IP Infringement"
    ],
    ownerProfile: "https://forum.cfx.re/u/SwargarajyamRP"
  },
  {
    id: "102",
    serverName: "rpworksmods",
    serverCode: "N/a",
    connectionCode: "N/a",
    description: "RP WORDS (TEBEX STORE)",
    status: "closed" as const,
    type: "TOS",
    reportDate: "2025",
    reportedBy: "Sophia",
    violations: [
      "IP Infringement"
    ],
    ownerProfile: "https://shop.rpworksmods.com/"
  }
];

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { data: reports = mockReports, isLoading } = useQuery({
    queryKey: ['reports', searchTerm, selectedCategory, selectedStatus],
    queryFn: async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filtered = mockReports;
      
      if (searchTerm) {
        filtered = filtered.filter(report => 
          report.serverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.serverCode.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      if (selectedCategory !== "all") {
        filtered = filtered.filter(report => 
          report.type.toLowerCase() === selectedCategory.toLowerCase()
        );
      }
      
      if (selectedStatus !== "all") {
        filtered = filtered.filter(report => 
          report.status.toLowerCase() === selectedStatus.toLowerCase()
        );
      }
      
      return filtered;
    }
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "resolved":
        return <Badge className="bg-green-500/20 text-green-400"><CheckCircle className="w-3 h-3 mr-1" />Resolved</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "closed":
        return <Badge className="bg-red-500/20 text-red-400"><XCircle className="w-3 h-3 mr-1" />Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusCounts = () => {
    return {
      closed: reports.filter(r => r.status === "closed").length,
      resolved: reports.filter(r => r.status === "resolved").length,
      total: reports.length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen">
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4 px-2">
              Community Reports
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto px-4">
              Track and monitor community-submitted reports for FiveM resources and creators
            </p>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card border-0 mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 h-4 w-4" />
                  <Input
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="tos//coc">TOS//COC</TabsTrigger>
                  </TabsList>
                </Tabs>
                <Tabs value={selectedStatus} onValueChange={setSelectedStatus} className="w-auto">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all">All Status</TabsTrigger>
                    <TabsTrigger value="closed">closed</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    <TabsTrigger value="closed">Closed</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="space-y-4 mb-8">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                <p className="text-white/70 mt-4">Loading reports...</p>
              </div>
            ) : reports.length === 0 ? (
              <Card className="glass-card border-0">
                <CardContent className="pt-6 text-center">
                  <AlertTriangle className="h-12 w-12 text-white/50 mx-auto mb-4" />
                  <p className="text-white/70">No reports found matching your criteria.</p>
                </CardContent>
              </Card>
            ) : (
              reports.map((report) => (
                <Card key={report.id} className="glass-card border-0 hover:border-white/20 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-medium text-white">{report.serverName}</h3>
                          {getStatusBadge(report.status)}
                          <Badge variant="outline" className="text-blue-400">
                            {report.type}
                          </Badge>
                        </div>
                        <p className="text-white/70 mb-2">{report.description}</p>
                        <div className="flex flex-wrap gap-2 text-sm text-white/50 mb-3">
                          <span>#{report.id}</span>
                          <span>•</span>
                          <span>Server Code: {report.serverCode}</span>
                          <span>•</span>
                          <span>Reported by: {report.reportedBy}</span>
                          <span>•</span>
                          <span>{report.reportDate}</span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="text-sm font-medium text-white/80">Violations:</h4>
                          <div className="space-y-1">
                            {report.violations.slice(0, 3).map((violation, index) => (
                              <p key={index} className="text-xs text-white/60 line-clamp-1">
                                • {violation}
                              </p>
                            ))}
                            {report.violations.length > 3 && (
                              <p className="text-xs text-white/50">
                                +{report.violations.length - 3} more violations
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(report.ownerProfile, '_blank')}
                        >
                          View Profile
                        </Button>
                        {/* <Button variant="outline" size="sm">
                          View Details
                        </Button> */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card border-0">
              <CardContent className="pt-6 text-center">
                <Clock className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{statusCounts.closed}</p>
                <p className="text-sm text-white/70">closed Reports</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{statusCounts.resolved}</p>
                <p className="text-sm text-white/70">Resolved</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="pt-6 text-center">
                <XCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{statusCounts.closed}</p>
                <p className="text-sm text-white/70">Closed</p>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardContent className="pt-6 text-center">
                <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{statusCounts.total}</p>
                <p className="text-sm text-white/70">Total Reports</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
