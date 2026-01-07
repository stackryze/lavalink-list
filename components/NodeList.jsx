"use client";
import { useState } from "react";
import { NodeCard } from "@/components/NodeCard";
import { NodeDetailsDialog } from "@/components/NodeDetailsDialog";
import { RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNodes } from "@/contexts/NodesContext";

export function NodeList({ filterSecure, title, description, icon }) {
    const { nodes, loading, fetchNodes, lastFetch } = useNodes();
    const [selectedNode, setSelectedNode] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const filteredNodes = nodes
        .filter((node) => node.secure === filterSecure)
        .sort((a, b) => {
            // Sort by connected status (online first)
            if (a.isConnected !== b.isConnected) return (a.isConnected ? -1 : 1);
            // Then sort by uptime (highest first)
            return (b.uptimeMillis || 0) - (a.uptimeMillis || 0);
        });
    const onlineNodes = filteredNodes.filter(n => n.isConnected);
    const offlineNodes = filteredNodes.filter(n => !n.isConnected);

    const handleNodeClick = (node) => {
        setSelectedNode(node);
        setDialogOpen(true);
    };

    // Format last refresh time
    const formatLastRefresh = () => {
        if (!lastFetch) return 'Never';
        const now = Date.now();
        const diff = now - lastFetch;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);

        if (minutes < 1) return `${seconds}s ago`;
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        return `${hours}h ago`;
    };

    return (
        <>
            <NodeDetailsDialog
                node={selectedNode}
                open={dialogOpen}
                onOpenChange={setDialogOpen}
            />

            <main className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground">
                            {icon}
                            {title}
                        </h1>
                        <p className="text-muted-foreground mt-2 text-sm">
                            {description}
                        </p>
                    </div>

                    <Button
                        variant="outline"
                        className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                        onClick={fetchNodes}
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                        {loading ? "Refreshing..." : "Refresh"}
                    </Button>
                </div>

                {/* Status Indicators */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-sm text-muted-foreground">Online: <span className="text-foreground font-medium">{loading ? '-' : onlineNodes.length}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-sm text-muted-foreground">Offline: <span className="text-foreground font-medium">{loading ? '-' : offlineNodes.length}</span></span>
                        </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Last refresh: <span className="text-foreground font-medium">{formatLastRefresh()}</span>
                    </div>
                </div>

                {/* Nodes Grid */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Online Grid */}
                        {onlineNodes.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                                    Online Nodes
                                </h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                                    {onlineNodes.map((node, index) => (
                                        <NodeCard key={`online-${index}-${node.host}:${node.port}`} node={node} onClick={handleNodeClick} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Offline Grid */}
                        {offlineNodes.length > 0 && (
                            <section>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                                    Offline Nodes
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {offlineNodes.map((node, index) => (
                                        <NodeCard key={`offline-${index}-${node.host}:${node.port}`} node={node} onClick={handleNodeClick} minimal={true} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                )}

                {!loading && filteredNodes.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        No nodes found in this category.
                    </div>
                )}
            </main>
        </>
    );
}
