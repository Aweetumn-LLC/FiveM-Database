import { Card, CardContent } from "@/components/ui/card";
import {
  Scale,
  AlertTriangle,
  Shield,
  Users,
  Mail,
  FileText,
  Network,
  Ban,
  ShieldCheck,
  Gavel,
  Landmark,
  FileWarning,
  Building2,
  ExternalLink,
  Link2,
  AlertCircle,
  EyeOff,
  Info,
} from "lucide-react";
import { Helmet } from "react-helmet";

const Legal = () => {
  const canonical = typeof window !== "undefined" ? window.location.href : "https://fivemdb.net/legal";
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Legal Disclaimer — Velocity Network</title>
        <meta
          name="description"
          content="Independent, non‑affiliated FiveM Database by Velocity Network: data limits, non‑weaponization, liability, takedown, staff protection, and legal terms."
        />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Legal Disclaimer',
            url: canonical,
            description:
              'Independent, non‑affiliated FiveM Database by Velocity Network: data limits, non‑weaponization, liability, takedown, staff protection, and legal terms.',
            publisher: {
              '@type': 'Organization',
              name: 'Velocity Network',
            },
          })}
        </script>
      </Helmet>
      <main className="flex-grow pt-20 md:pt-32 px-4 md:px-6 pb-8">
        <div className="container mx-auto max-w-4xl">
          <header className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-3 md:mb-4">
              Legal Disclaimer
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Legal terms, responsibilities, and usage restrictions for FiveM Database by Velocity Network
            </p>
            <p className="text-sm text-white/50 mt-4">Last updated: August 11, 2025</p>
          </header>

          <div className="space-y-6">
            {/* Network-Wide Applicability */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Network className="h-6 w-6 text-cyan-400" />
                  <h2 className="text-xl font-bold text-white">Network-Wide Applicability</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  This legal disclaimer applies across the entirety of the Velocity Network, including all websites,
                  subdomains, applications, brands, affiliated projects, and services operated by or on behalf of Velocity
                  Network. Where the term "FiveM Database" ("FiveMDB") is used, it refers to the product and service
                  provided within the Velocity Network.
                </p>
              </CardContent>
            </Card>

            {/* Non-Affiliation & No Endorsement */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ExternalLink className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Non‑Affiliation & No Endorsement</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  FiveM Database by Velocity Network is not affiliated with, endorsed, or sponsored by FiveM, Tebex, Discord,
                  or any other media, social, or marketing platform or company. References to third‑party services are for
                  identification or informational purposes only and do not imply endorsement.
                </p>
              </CardContent>
            </Card>

            {/* Employment & Volunteer Status */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-teal-400" />
                  <h2 className="text-xl font-bold text-white">Employment & Volunteer Status</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  All individuals referred to as "employees" under FiveM Database are employees or volunteers of the Velocity Network.
                  Staff, contributors, and moderators act on behalf of Velocity Network regarding this project. Personal targeting,
                  harassment, or legal service directed at individuals is prohibited; all legal notices must use the contact below.
                </p>
              </CardContent>
            </Card>

            {/* No Legal Advice & Non‑Evidentiary Use */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Gavel className="h-6 w-6 text-red-400" />
                  <h2 className="text-xl font-bold text-white">No Legal Advice & Non‑Evidentiary Use</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-3">
                  Information, listings, flags, reports, and statistics available on this site are provided for
                  informational purposes only. They do not constitute legal advice, legal findings, or determinations,
                  and they must not be presented as legal evidence by any opposing party in any legal, administrative,
                  or regulatory proceeding.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span> Data here is not a substitute for professional legal counsel.</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span> Use of any information for legal purposes is strictly at your own risk and requires independent verification.</li>
                  <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span> No statement on this site should be construed as a definitive fact without corroboration.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Integrity & External Corroboration */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <ShieldCheck className="h-6 w-6 text-green-400" />
                  <h2 className="text-xl font-bold text-white">Data Integrity & External Corroboration</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We strive for statistical accuracy and methodological rigor. Where indicated, statistics may be
                  corroborated using evidence hosted by other entities within the Velocity Network ecosystem and its
                  affiliates. Even so, all information is provided "as is" and "as available" and may be updated,
                  corrected, or removed as new information emerges.
                </p>
              </CardContent>
            </Card>

            {/* Prohibited Uses: Non-Weaponization */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Ban className="h-6 w-6 text-orange-400" />
                  <h2 className="text-xl font-bold text-white">Prohibited Uses: Non‑Weaponization</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  You must not use any data from this website to harass, defame, dox, intimidate, threaten, or target
                  individuals, companies, servers, stores, or communities. Automations that facilitate harassment,
                  blacklisting without due process, or brigading are strictly prohibited. We reserve the right to restrict
                  access or take action against misuse.
                </p>
              </CardContent>
            </Card>

            {/* Ownership & Protection of Staff */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Ownership & Protection of Staff</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-3">
                  FiveM Database is a product owned and maintained by the Velocity Network. Employees, contractors, and
                  volunteers of FiveM Database and Velocity Network must not be individually targeted, harassed, or
                  subject to personal legal threats or demands related to platform content.
                </p>
                <ul className="space-y-2 text-white/70">
                  <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span> All legal notices must be directed to Velocity Network through the official contact listed below.</li>
                  <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span> Service of process to individuals associated with the project is not accepted.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Trademarks & Third‑Party Rights */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Trademarks & Third‑Party Rights</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  All third‑party names, logos, and trademarks mentioned remain the property of their respective owners.
                  Use of such marks is nominative and solely for identification. No infringement is intended.
                </p>
              </CardContent>
            </Card>

            {/* Third‑Party Links & External Services */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Link2 className="h-6 w-6 text-blue-400" />
                  <h2 className="text-xl font-bold text-white">Third‑Party Links & External Services</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Links to external sites are provided for convenience. We do not control and are not responsible for third‑party
                  content, policies, or practices. Use them at your own discretion.
                </p>
              </CardContent>
            </Card>

            {/* No Duty to Monitor; Moderation Discretion */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <EyeOff className="h-6 w-6 text-pink-400" />
                  <h2 className="text-xl font-bold text-white">No Duty to Monitor; Moderation Discretion</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We do not undertake a duty to monitor all content. We may, at our discretion, review, edit, annotate, or remove
                  content for accuracy, policy compliance, or legal reasons; such actions do not create obligations to monitor.
                </p>
              </CardContent>
            </Card>

            {/* Defamation, Opinions, and Fair Comment */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileWarning className="h-6 w-6 text-purple-400" />
                  <h2 className="text-xl font-bold text-white">Defamation, Opinions, and Fair Comment</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  Certain statements on this platform may constitute opinions, community reports, or summaries of third‑party
                  materials. Such statements are not presented as verified facts and are protected where applicable by
                  fair‑comment and opinion doctrines. If you believe a statement is inaccurate or defamatory, please use
                  the notice‑and‑takedown process below.
                </p>
              </CardContent>
            </Card>

            {/* Reservation of Rights & Changes */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Info className="h-6 w-6 text-sky-400" />
                  <h2 className="text-xl font-bold text-white">Reservation of Rights & Changes</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  We may update these terms, our policies, and the services at any time. Continued use after updates constitutes
                  acceptance. We reserve all rights not expressly granted.
                </p>
              </CardContent>
            </Card>

            {/* Severability */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-rose-400" />
                  <h2 className="text-xl font-bold text-white">Severability</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  If any provision is found unenforceable, the remainder shall remain in full force and effect to the maximum extent permitted by law.
                </p>
              </CardContent>
            </Card>

            {/* Notice-and-Takedown / Corrections */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6 text-pink-400" />
                  <h2 className="text-xl font-bold text-white">Notice‑and‑Takedown / Corrections</h2>
                </div>
                <p className="text-white/70 leading-relaxed mb-3">
                  We maintain a good‑faith process to review alleged inaccuracies or rights concerns. To submit a request,
                  include: (1) the URL(s) in question, (2) a clear explanation of the issue, (3) supporting evidence, and
                  (4) your contact information. We will review and respond within a reasonable timeframe.
                </p>
                <p className="text-white/70 leading-relaxed">
                  Submission of a request does not guarantee removal. We may update, annotate, or decline changes where the
                  information is accurate, newsworthy, or in the public interest.
                </p>
              </CardContent>
            </Card>

            {/* Limitation of Liability & No Warranties */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white">Limitation of Liability & No Warranties</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  To the fullest extent permitted by law, Velocity Network and FiveM Database disclaim all warranties, whether
                  express or implied, and shall not be liable for indirect, incidental, special, consequential, exemplary, or
                  punitive damages arising out of or related to your use of this site. Your sole and exclusive remedy is to
                  stop using the service.
                </p>
              </CardContent>
            </Card>

            {/* Indemnification */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="h-6 w-6 text-emerald-400" />
                  <h2 className="text-xl font-bold text-white">Indemnification</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless Velocity Network, FiveM Database, and their respective
                  officers, employees, contractors, and volunteers from and against any claims, liabilities, damages, losses,
                  and expenses (including reasonable attorneys' fees) arising out of or in any way connected with your use of
                  the site, your content submissions, or your violation of these terms.
                </p>
              </CardContent>
            </Card>

            {/* Jurisdiction, Venue, and Dispute Resolution */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Landmark className="h-6 w-6 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Jurisdiction, Venue, and Dispute Resolution</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  These terms are governed by the laws applicable to Velocity Network's principal place of business, without
                  regard to conflict‑of‑law principles. Exclusive venue and jurisdiction shall lie in the competent courts of
                  that location, unless otherwise required by mandatory law. We encourage good‑faith resolution before formal
                  action.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Users className="h-6 w-6 text-teal-400" />
                  <h2 className="text-xl font-bold text-white">Legal Inquiries & Contact</h2>
                </div>
                <p className="text-white/70 leading-relaxed">
                  For legal inquiries, takedown requests, or corrections, contact: <span className="text-teal-400 ml-1">legal@nexoradata.ltd</span>
                </p>
                <p className="text-white/70 leading-relaxed mt-2">
                  Communications to this address do not constitute legal advice and do not create any attorney‑client
                  relationship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Legal;