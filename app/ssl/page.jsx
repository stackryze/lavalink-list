"use client";
import { Navbar } from "@/components/Navbar";
import { NodeList } from "@/components/NodeList";
import { Footer } from "@/components/Footer";
import { Shield } from "lucide-react";

export default function SSLNodesPage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground pb-20">
      <Navbar activeTab="ssl" />

      <NodeList
        filterSecure={true}
        title={<><span className="text-blue-500">SSL</span> Lavalink Nodes</>}
        description="A list of free and available public SSL Lavalink nodes with their live status."
        icon={<Shield className="w-8 h-8 text-blue-500" />}
      />
      <Footer />
    </div>
  );
}
