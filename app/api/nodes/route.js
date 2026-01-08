import { NextResponse } from 'next/server';
import localNodes from '@/nodes.json';
import dns from 'node:dns';

// Force prioritize IPv4 over IPv6 to fix connectivity issues on localhost
dns.setDefaultResultOrder('ipv4first');

// Helper to format bytes
function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 B';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

// Default author object for nodes
const DEFAULT_AUTHOR = {
    username: "Unknown",
    url: "#",
    avatar: "https://github.com/shadcn.png"
};

// Helper to format duration
function formatDuration(ms) {
    if (!ms) return '0s';
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));

    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0) parts.push(`${seconds}s`);

    return parts.join(' ') || '0s';
}

async function fetchWithRetry(url, options, maxRetries = 1) {
    let lastError;
    for (let i = 0; i <= maxRetries; i++) {
        try {
            const response = await fetch(url, options);
            return response;
        } catch (error) {
            lastError = error;
            if (i < maxRetries) {
                // Wait 500ms before retry
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        }
    }
    throw lastError;
}

export async function GET() {
    try {

        const nodePromises = localNodes.map(async (node) => {
            const protocol = node.secure ? "https" : "http";
            const baseUrl = `${protocol}://${node.host}:${node.port}`;
            const version = node.restVersion || 'v4';
            const statsUrl = `${baseUrl}/${version}/stats`;
            const infoUrl = `${baseUrl}/${version}/info`;

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

            try {
                const fetchOptions = {
                    headers: { Authorization: node.password },
                    signal: controller.signal
                };

                const [statsRes, infoRes] = await Promise.all([
                    fetchWithRetry(statsUrl, fetchOptions),
                    fetchWithRetry(infoUrl, fetchOptions)
                ]).finally(() => clearTimeout(timeoutId));

                if (!statsRes.ok) throw new Error(`Stats failed: ${statsRes.status}`);

                const stats = await statsRes.json();
                const info = infoRes.ok ? await infoRes.json() : null;

                const systemLoad = (stats.cpu?.systemLoad * 100 || 0).toFixed(2);

                return {
                    isConnected: true,
                    identifier: node.identifier,
                    memory: formatBytes(stats.memory?.used || 0),
                    cpu: `${systemLoad}%`,
                    connections: `${stats.playingPlayers || 0}/${stats.players || 0}`,
                    systemLoad: `${systemLoad}%`,
                    cpuCores: stats.cpu?.cores || 0,
                    uptime: formatDuration(stats.uptime || 0),
                    uptimeMillis: stats.uptime || 0,
                    restVersion: node.restVersion,
                    info: info || {},
                    host: node.host,
                    port: node.port,
                    password: node.password,
                    secure: node.secure,
                    authorId: node.authorId,
                    website: node.website,
                    discord: node.discord,
                    author: DEFAULT_AUTHOR
                };

            } catch (error) {
                clearTimeout(timeoutId);
                // Only log non-timeout errors to reduce console noise
                if (error.name !== 'AbortError') {
                    console.error(`[Node API] Failed to fetch node ${node.identifier} (${baseUrl}):`, error.message || error);
                }
                return {
                    isConnected: false,
                    identifier: node.identifier,
                    memory: "0 B",
                    cpu: "0%",
                    connections: "0/0",
                    systemLoad: "0%",
                    cpuCores: 0,
                    uptime: "0s",
                    uptimeMillis: 0,
                    restVersion: node.restVersion,
                    info: null,
                    host: node.host,
                    port: node.port,
                    password: node.password,
                    secure: node.secure,
                    authorId: node.authorId,
                    website: node.website,
                    discord: node.discord,
                    author: DEFAULT_AUTHOR
                };
            }
        });

        const results = await Promise.all(nodePromises);
        return NextResponse.json(results);

    } catch (error) {
        console.error("Error processing nodes:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
