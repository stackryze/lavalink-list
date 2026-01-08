"use client";
import { Navbar } from "@/components/Navbar";
import { NodeList } from "@/components/NodeList";
import { Footer } from "@/components/Footer";
import { Server } from "lucide-react";

export default function NonSSLNodesPage() {
    return (
        <div className="min-h-screen bg-background font-sans text-foreground pb-20">
            <Navbar activeTab="non-ssl" />

            <NodeList
                filterSecure={false}
                title={<><span className="text-blue-500">Non-SSL</span> Lavalink Nodes</>}
                description="A list of free and available public Non-SSL Lavalink nodes with their live status."
                icon={<Server className="w-8 h-8 text-muted-foreground" />}
            />
            <Footer />
        </div>
    );
}
