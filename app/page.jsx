"use client";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Shield, Server, ArrowRight, Users } from "lucide-react";
import Link from "next/link";
import { useNodes } from "@/contexts/NodesContext";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { nodes, loading } = useNodes();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Calculate stats
  const totalNodes = nodes.length;
  const onlineNodes = nodes.filter(n => n.isConnected).length;
  const offlineNodes = totalNodes - onlineNodes;
  const sslNodes = nodes.filter(n => n.secure).length;
  const nonSslNodes = nodes.filter(n => !n.secure).length;
  const totalPlayers = nodes.reduce((acc, node) => {
    if (!node.connections) return acc;
    const playing = parseInt(node.connections.split('/')[0], 10) || 0;
    return acc + playing;
  }, 0);

  return (
    <div className="min-h-screen bg-[#0a0a0c] font-sans text-foreground flex flex-col selection:bg-blue-500/20">

      {/* Static Background Grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <div className="relative z-10 w-full shrink-0">
        <Navbar activeTab="home" />
      </div>

      <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center min-h-0 relative z-10 pb-16">

        {/* Statistics Pills */}
        {mounted && (
          <div className="flex flex-col gap-3 items-center mb-6 md:mb-10 shrink-0">
            {loading ? (
              <div className="flex flex-col gap-3 items-center animate-pulse">
                <div className="flex gap-3">
                  <div className="h-7 w-24 bg-zinc-800 rounded-full border border-zinc-700/50"></div>
                  <div className="h-7 w-24 bg-zinc-800 rounded-full border border-zinc-700/50"></div>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 w-16 bg-zinc-800/50 rounded-full border border-zinc-700/30"></div>
                  <div className="h-5 w-16 bg-zinc-800/50 rounded-full border border-zinc-700/30"></div>
                  <div className="h-5 w-16 bg-zinc-800/50 rounded-full border border-zinc-700/30"></div>
                </div>
              </div>
            ) : (
              <>
                {/* Primary Stats */}
                <div className="flex flex-wrap justify-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/20 text-xs font-medium text-blue-200 backdrop-blur-sm">
                    <Server className="w-3.5 h-3.5" />
                    <span>{totalNodes} Nodes</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/5 border border-purple-500/20 text-xs font-medium text-purple-200 backdrop-blur-sm">
                    <Users className="w-3.5 h-3.5" />
                    <span>{totalPlayers} Players</span>
                  </div>
                </div>

                {/* Secondary Stats */}
                <div className="flex flex-wrap justify-center gap-2">
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-[10px] font-medium text-emerald-200 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{onlineNodes} Online</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/5 border border-red-500/20 text-[10px] font-medium text-red-200 backdrop-blur-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    <span>{offlineNodes} Offline</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-400/5 border border-blue-400/20 text-[10px] font-medium text-blue-200 backdrop-blur-sm">
                    <Shield className="w-3 h-3" />
                    <span>{sslNodes} SSL</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-500/5 border border-zinc-500/20 text-[10px] font-medium text-zinc-300 backdrop-blur-sm">
                    <Server className="w-3 h-3" />
                    <span>{nonSslNodes} Non-SSL</span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-12 shrink-0">

          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70">
            Lavalink List
          </h1>

          <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            A curated collection of public Lavalink nodes for your Discord music bot.
            <br className="hidden md:block" />
            <span className="text-zinc-500">Community Hosted. Free to use.</span>
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          <Link href="/ssl" className="flex-1">
            <button className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl px-8 py-5 hover:bg-zinc-900/80 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Shield className="w-5 h-5 text-blue-400" />
                </div>
                <span className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors flex-1 text-left">SSL Nodes</span>
                <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </button>
          </Link>

          <Link href="/non-ssl" className="flex-1">
            <button className="w-full bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-xl px-8 py-5 hover:bg-zinc-900/80 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10 flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <Server className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors flex-1 text-left">Non-SSL Nodes</span>
                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
