import { useState } from "react";
import { X, ExternalLink, Image as ImageIcon, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EvidenceViewerProps {
  imageUrls?: unknown;
  linkUrls?: unknown;
  // Backward compatibility with older usages
  evidenceLinks?: unknown;
}

export const EvidenceViewer = ({ imageUrls, linkUrls, evidenceLinks }: EvidenceViewerProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<Set<string>>(new Set());

  const handleImageError = (link: string) => {
    setImageError(prev => new Set([...prev, link]));
  };

  // Normalize a single link (force https, trim)
  const normalizeLink = (raw: string) => {
    try {
      let url = raw.trim();
      if (!url) return url;
      url = url.replace(/^http:\/\//i, 'https://');
      return url;
    } catch {
      return raw as string;
    }
  };

  // Normalize incoming evidence to an array of strings
  const normalizeEvidenceArray = (links: unknown): string[] => {
    if (!links) return [];
    if (Array.isArray(links)) {
      return links
        .filter(Boolean)
        .map((l) => String(l))
        .flatMap((l) => l.split(/\s+|\n|,|\|/))
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    }
    if (typeof links === 'string') {
      return links
        .split(/\s+|\n|,|\|/)
        .map((l) => l.trim())
        .filter((l) => l.length > 0);
    }
    // attempt common keys
    // @ts-ignore
    const candidate = (links as any)?.evidence_links || (links as any)?.evidence || (links as any)?.proof_images || (links as any)?.images || [];
    return normalizeEvidenceArray(candidate);
  };

  const isImageUrl = (url: string) => {
    try {
      const clean = url.split('?')[0].toLowerCase();
      return /\.(jpg|jpeg|png|gif|webp|bmp|svg|heic|heif)$/i.test(clean);
    } catch {
      return false;
    }
  };

  // Collect inputs
  const rawImages = normalizeEvidenceArray(imageUrls ?? []);
  const rawLinks = normalizeEvidenceArray(linkUrls ?? []);
  const fallback = normalizeEvidenceArray(evidenceLinks ?? []);

  // Split fallback into images vs links, merge with explicit arrays
  const combinedImages = [...rawImages, ...fallback.filter(isImageUrl)].map(normalizeLink);
  const combinedLinks = [...rawLinks, ...fallback.filter((l) => !isImageUrl(l))].map(normalizeLink);

  // Deduplicate and avoid overlap
  const imageSet = new Set(combinedImages.filter(Boolean));
  const linkSet = new Set(combinedLinks.filter(Boolean));

  const finalImages = Array.from(imageSet);
  const finalLinks = Array.from(linkSet).filter((l) => !imageSet.has(l));

  if (finalImages.length === 0 && finalLinks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {finalImages.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-medium text-white">Evidence</h3>
            <span className="text-sm text-white/60">({finalImages.length} item{finalImages.length !== 1 ? 's' : ''})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {finalImages.map((link, index) => (
              <div key={index} className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div className="space-y-3">
                  {!imageError.has(link) && (
                    <div 
                      className="relative group cursor-pointer overflow-hidden rounded-lg border border-white/20"
                      onClick={() => setSelectedImage(link)}
                    >
                      <img 
                        src={normalizeLink(link)} 
                        alt={`Evidence ${index + 1}`}
                        className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                        onError={() => handleImageError(link)}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm">
                          Click to expand
                        </div>
                      </div>
                    </div>
                  )}

                  {imageError.has(link) && (
                    <div className="w-full h-40 bg-gray-800/50 border border-gray-600 rounded-lg flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Image failed to load</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1 text-xs"
                    >
                      <a 
                        href={link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Open Image
                      </a>
                    </Button>
                  </div>

                  <div className="text-xs text-white/50 break-all">
                    {link.length > 60 ? `${link.substring(0, 60)}...` : link}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {finalLinks.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-medium text-white">Evidence Links</h3>
            <span className="text-sm text-white/60">({finalLinks.length} link{finalLinks.length !== 1 ? 's' : ''})</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalLinks.map((link, index) => (
              <div key={index} className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="text-xs"
                  >
                    <a 
                      href={normalizeLink(link)} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Open Link
                    </a>
                  </Button>
                  <span className="text-xs text-white/70 break-all">
                    {link.length > 60 ? `${link.substring(0, 60)}...` : link}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl w-full p-0 bg-black/95 border-white/20">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="text-white flex items-center justify-between">
              Evidence Image
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImage(null)}
                className="text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          <div className="p-4">
            {selectedImage && (
              <div className="relative">
                <img 
                  src={normalizeLink(selectedImage)} 
                  alt="Evidence full size"
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-sm text-white/70 break-all">{selectedImage}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="mt-2"
                  >
                    <a 
                      href={selectedImage} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in New Tab
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};