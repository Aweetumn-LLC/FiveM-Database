import { Helmet } from "react-helmet";
import Home from "./Home";

export default function Index() {
  return (
    <>
      <Helmet>
        <title>FiveM Database - Community-Driven FiveM Resource Compliance & Security Platform</title>
        <meta name="description" content="FiveM Database is the trusted community platform for checking FiveM resources, servers, and creators for TOS/COC compliance. Protect your server with comprehensive blacklist checking and violation reporting." />
        <meta name="keywords" content="FiveM database, FiveM resource checker, CFX compliance, FiveM blacklist, TOS violations, COC violations, FiveM security, resource verification, server protection, FiveM tools, compliance checker" />
        <link rel="canonical" href="https://fivemdb.net/" />
        <meta property="og:title" content="FiveM Database - Community-Driven FiveM Resource Compliance & Security Platform" />
        <meta property="og:description" content="FiveM Database is the trusted community platform for checking FiveM resources, servers, and creators for TOS/COC compliance. Protect your server with comprehensive blacklist checking." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://fivemdb.net/" />
        <meta property="og:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FiveM Database - Community-Driven Resource Compliance Platform" />
        <meta name="twitter:description" content="Protect your FiveM server with comprehensive resource compliance checking and community-driven security reports." />
        <meta name="twitter:image" content="https://cdn.velocitynet.work/5DB/Data/5DBEmbed.png" />
      </Helmet>
      <Home />
    </>
  );
}