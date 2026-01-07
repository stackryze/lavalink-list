import { Server, Cpu, HardDrive, Activity, Clock, Wifi, Tag, Coffee, Music, Plug, Disc, Hourglass } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function NodeCard({ node, onClick, minimal = false }) {
    const isOnline = node.isConnected;

    return (
        <Card
            className={`group bg-card border-border text-card-foreground transition-all hover:bg-muted/50 hover:border-blue-500 cursor-pointer overflow-hidden relative ${minimal ? 'h-auto' : ''}`}
            onClick={onClick ? () => onClick(node) : undefined}
        >
            <CardHeader className={`${minimal ? 'pb-3 pt-3 px-3' : 'pb-2 pt-3 px-4'} space-y-0`}>
                <div className="flex justify-between items-center mb-1.5">
                    <Badge
                        variant="outline"
                        className={`${isOnline ? "border-emerald-500/50 text-emerald-500 bg-emerald-500/10" : "border-red-500/50 text-red-500 bg-red-500/10"} px-2.5 py-0.5 text-xs h-6`}
                    >
                        <div className={`w-1.5 h-1.5 rounded-full mr-2 ${isOnline ? "bg-emerald-500 animate-pulse" : "bg-red-500"}`} />
                        {isOnline ? "Online" : "Offline"}
                    </Badge>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Hosted by</span>
                        <span className="text-foreground font-semibold">
                            {node.authorId || 'Unknown'}
                        </span>
                    </div>
                </div>

                {/* Identifier shown in header for minimal view too */}
                <div className="space-y-0.5 mt-2">
                    <div className="flex items-center text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                        <Server className="w-3.5 h-3.5 mr-1.5 text-emerald-500" /> Identifier
                    </div>
                    <div className="text-sm font-mono text-foreground truncate" title={node.identifier}>
                        {node.identifier}
                    </div>
                </div>
            </CardHeader>

            {!minimal && (
                <CardContent className="px-4 pb-3 pt-0">
                    {/* Main Stats Grid - 2 Columns */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-2.5">
                        {/* Memory */}
                        <div className="space-y-0.5">
                            <div className="flex items-center text-xs text-muted-foreground font-semibold">
                                <HardDrive className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Memory
                            </div>
                            <div className="text-sm font-mono text-foreground truncate">
                                {node.memory}
                            </div>
                        </div>
                        {/* System Load */}
                        <div className="space-y-0.5">
                            <div className="flex items-center text-xs text-muted-foreground font-semibold">
                                <Activity className="w-3.5 h-3.5 mr-1.5 text-red-500" /> System Load
                            </div>
                            <div className="text-sm font-mono text-foreground truncate">
                                {node.systemLoad}
                            </div>
                        </div>
                        {/* Connections */}
                        <div className="space-y-0.5">
                            <div className="flex items-center text-xs text-muted-foreground font-semibold">
                                <Wifi className="w-3.5 h-3.5 mr-1.5 text-yellow-500" /> Connections
                            </div>
                            <div className="text-sm font-mono text-foreground truncate">
                                {node.connections}
                            </div>
                        </div>
                        {/* CPU Cores */}
                        <div className="space-y-0.5">
                            <div className="flex items-center text-xs text-muted-foreground font-semibold">
                                <Cpu className="w-3.5 h-3.5 mr-1.5 text-purple-500" /> CPU Cores
                            </div>
                            <div className="text-sm font-mono text-foreground truncate">
                                {node.cpuCores}
                            </div>
                        </div>
                        {/* Uptime */}
                        <div className="space-y-0.5 col-span-2">
                            <div className="flex items-center text-xs text-muted-foreground font-semibold">
                                <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-500" /> Uptime
                            </div>
                            <div className="text-sm font-mono text-foreground truncate">
                                {node.uptime}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-border/50 my-2" />

                    {/* Version & Info Grid */}
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                        {/* Version info mapping */}
                        <div className="flex items-center gap-2">
                            <Tag className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="text-xs text-muted-foreground font-semibold">Version:</span>
                            <span className="text-xs font-mono text-foreground truncate">{node.info?.version?.semver || 'v4'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Hourglass className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                            <span className="text-xs text-muted-foreground font-semibold">BuildTime:</span>
                            <span className="text-xs font-mono text-foreground truncate">
                                {node.info?.buildTime ? new Date(node.info.buildTime).toLocaleDateString() : 'Unknown'}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Coffee className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                            <span className="text-xs text-muted-foreground font-semibold">Java:</span>
                            <span className="text-xs font-mono text-foreground truncate">{node.info?.jvm?.split(' ')[0] || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Disc className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                            <span className="text-xs text-muted-foreground font-semibold">Lavaplayer:</span>
                            <span className="text-xs font-mono text-foreground truncate">{node.info?.lavaplayer || 'Unknown'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Music className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            <span className="text-xs text-muted-foreground font-semibold">Source:</span>
                            <span className="text-xs font-mono text-foreground truncate">{node.info?.sourceManagers?.length || 0}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Plug className="w-3.5 h-3.5 text-yellow-500 shrink-0" />
                            <span className="text-xs text-muted-foreground font-semibold">Plugins:</span>
                            <span className="text-xs font-mono text-foreground truncate">{node.info?.plugins?.length || 0}</span>
                        </div>
                    </div>

                </CardContent>
            )}
        </Card>
    );
}
