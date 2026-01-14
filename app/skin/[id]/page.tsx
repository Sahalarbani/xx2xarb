import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, Download, Calendar, User, CheckCircle, XCircle, Share2, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const skin = await prisma.skin.findUnique({
    where: { id: params.id },
  });

  if (!skin) return { title: "Skin Not Found" };

  return {
    title: `${skin.title} - ArbSkinz`,
    description: skin.description,
  };
}

export default async function SkinPage({ params }: Props) {
  const session = await auth();

  const skin = await prisma.skin.findUnique({
    where: { id: params.id },
  });

  if (!skin) return notFound();

  const formattedDate = new Date(skin.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <Link 
          href="/dashboard"
          className="inline-flex items-center text-gray-400 hover:text-brand-accent transition-colors mb-8 group"
        >
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Dashboard
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Kolom Kiri: Gambar Skin */}
          <div className="space-y-6">
            <div className="relative aspect-video w-full gaming-card-clip overflow-hidden border border-white/10 bg-white/5 group shadow-2xl shadow-brand-accent/5">
              
              {/* ✅ KEMBALI KE IMG BIASA (Solusi Anti Ribet) */}
              {skin.image ? (
                <img 
                  src={skin.image} 
                  alt={skin.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-white/5 text-gray-500">
                   <AlertTriangle size={32} />
                   <span className="ml-2">No Visual Source</span>
                </div>
              )}
              
              {/* Overlay Gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
              
              <div className="absolute top-4 right-4 z-10">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md border ${
                  skin.category === 'minecraft' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                  skin.category === 'mobile-legends' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                  'bg-brand-accent/20 text-brand-accent border-brand-accent/30'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse mr-2" />
                  {skin.category}
                </span>
              </div>
            </div>

            {/* Statistik */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:border-brand-accent/30 transition-colors group">
                <Download className="mx-auto mb-2 text-brand-accent group-hover:scale-110 transition-transform" size={20} />
                <div className="text-2xl font-oxanium font-bold">{skin.downloads}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">Downloads</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:border-purple-500/30 transition-colors group">
                <Calendar className="mx-auto mb-2 text-purple-400 group-hover:scale-110 transition-transform" size={20} />
                <div className="text-sm font-bold mt-2">{formattedDate}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Released</div>
              </div>
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg text-center hover:border-blue-500/30 transition-colors group">
                <User className="mx-auto mb-2 text-blue-400 group-hover:scale-110 transition-transform" size={20} />
                <div className="text-sm font-bold mt-2 truncate px-2">{skin.author}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Creator</div>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Detail & Action */}
          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-4xl md:text-5xl font-oxanium font-bold mb-4 text-white uppercase tracking-tight">
                {skin.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                {skin.published ? (
                  <div className="flex items-center text-green-400 text-sm font-medium bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <CheckCircle size={14} className="mr-1.5" />
                    Public Access
                  </div>
                ) : (
                  <div className="flex items-center text-yellow-400 text-sm font-medium bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                    <XCircle size={14} className="mr-1.5" />
                    Private / Draft
                  </div>
                )}
                
                <button className="flex items-center text-gray-400 hover:text-white text-sm transition-colors uppercase tracking-wider text-xs font-bold">
                  <Share2 size={14} className="mr-1.5" />
                  Share Uplink
                </button>
              </div>

              <div className="prose prose-invert max-w-none mb-10">
                <h3 className="text-xs font-oxanium font-bold text-brand-accent mb-4 tracking-[0.2em] border-b border-brand-accent/20 pb-2 inline-block">
                  MISSION BRIEFING / DESCRIPTION
                </h3>
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap font-light text-sm md:text-base">
                  {skin.description}
                </p>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-white/10">
              <a 
                href={skin.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full relative group overflow-hidden bg-brand-accent hover:bg-brand-accent/90 text-black font-oxanium font-bold text-xl py-5 rounded-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_40px_rgba(0,240,255,0.5)]"
              >
                <div className="absolute inset-0 bg-white/40 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
                <Download className="relative z-10" strokeWidth={3} />
                <span className="relative z-10">INITIATE DOWNLOAD SEQUENCE</span>
              </a>
              <p className="text-center text-gray-500 text-[10px] mt-4 uppercase tracking-widest">
                By downloading, you agree to the creator&apos;s terms of use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
