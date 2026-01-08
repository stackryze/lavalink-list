"use client";
import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

const NodesContext = createContext();

const CACHE_KEY = "lavalink_nodes_cache";
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function NodesProvider({ children }) {
    const [nodes, setNodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [lastFetch, setLastFetch] = useState(null);
    const isMountedRef = useRef(true);

    const fetchNodes = useCallback(async (force = false) => {
        // Check if we need to fetch
        if (!force && lastFetch && (Date.now() - lastFetch < CACHE_TTL)) {
            return; // Use cached data
        }

        setLoading(true);
        setError(null);
        try {
            const apiUrl = "/api/nodes";

            const res = await fetch(apiUrl);

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`API Error (${res.status}): ${text.slice(0, 100)}`);
            }

            const data = await res.json();

            if (isMountedRef.current) {
                setNodes(data);
                const timestamp = Date.now();
                setLastFetch(timestamp);

                // Cache to localStorage
                localStorage.setItem(
                    CACHE_KEY,
                    JSON.stringify({ data, timestamp })
                );
            }
        } catch (err) {
            console.error("Failed to fetch nodes:", err);
            if (isMountedRef.current) {
                setError(err.message || "Failed to fetch nodes");
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [lastFetch]);

    // Load from cache on mount
    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const { data, timestamp } = JSON.parse(cached);
                const age = Date.now() - timestamp;

                if (age < CACHE_TTL) {
                    setNodes(data);
                    setLastFetch(timestamp);
                    setLoading(false);
                    return;
                }
            } catch (e) {
                console.error("Failed to parse cache:", e);
            }
        }

        // If no valid cache, fetch
        fetchNodes();
    }, [fetchNodes]);

    // Auto-refresh every 2 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            fetchNodes(true);
        }, 2 * 60 * 1000); // 2 minutes

        return () => clearInterval(interval);
    }, [fetchNodes]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    return (
        <NodesContext.Provider value={{ nodes, loading, error, fetchNodes, lastFetch }}>
            {children}
        </NodesContext.Provider>
    );
}

export function useNodes() {
    const context = useContext(NodesContext);
    if (!context) {
        throw new Error("useNodes must be used within NodesProvider");
    }
    return context;
}
