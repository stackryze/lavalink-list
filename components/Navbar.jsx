import Link from "next/link";
import { Disc, Sun, Moon, Plus, Home, Shield, Server, Github, AlertCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Navbar({ activeTab }) {
    const { theme, setTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <nav className="flex flex-col py-4 px-6 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50">
            <div className="flex items-center justify-between w-full">
                {/* Left Side: Logo & Navigation */}
                <div className="flex items-center gap-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        {/* Light theme logo */}
                        <img
                            src="/stackryze_logo1.png"
                            alt="Lavalink List"
                            className="h-8 w-auto dark:hidden"
                        />
                        {/* Dark theme logo */}
                        <img
                            src="/stackryze_logo_white.png"
                            alt="Lavalink List"
                            className="h-8 w-auto hidden dark:block"
                        />
                        <span className="font-bold text-xl tracking-tight">Lavalink List</span>
                    </Link>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        <Link href="/">
                            <Button variant="ghost" className={`gap-2 ${activeTab === 'home' ? 'text-foreground font-semibold bg-accent' : 'text-muted-foreground'}`}>
                                <Home className="w-4 h-4" /> Home
                            </Button>
                        </Link>
                        <Link href="/ssl">
                            <Button variant="ghost" className={`gap-2 ${activeTab === 'ssl' ? 'text-foreground font-semibold bg-accent' : 'text-muted-foreground'}`}>
                                <Shield className="w-4 h-4" /> SSL Nodes
                            </Button>
                        </Link>
                        <Link href="/non-ssl">
                            <Button variant="ghost" className={`gap-2 ${activeTab === 'non-ssl' ? 'text-foreground font-semibold bg-accent' : 'text-muted-foreground'}`}>
                                <Server className="w-4 h-4" /> Non-SSL Nodes
                            </Button>
                        </Link>
                        <a href="https://github.com/stackryze/lavalink-list" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
                                <Plus className="w-4 h-4" /> Add Node
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center gap-2">
                        <a href="https://github.com/stackryze/lavalink-list" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <Github className="w-5 h-5" />
                            </Button>
                        </a>
                        <a href="https://github.com/stackryze/lavalink-list/issues" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <AlertCircle className="w-5 h-5" />
                            </Button>
                        </a>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-muted-foreground hover:text-foreground"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden flex flex-col gap-2 pt-4 pb-2 border-t border-border mt-4 animate-in slide-in-from-top-2">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start gap-2 ${activeTab === 'home' ? 'text-foreground font-semibold bg-accent' : 'text-muted-foreground'}`}>
                            <Home className="w-4 h-4" /> Home
                        </Button>
                    </Link>
                    <Link href="/ssl" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start gap-2 ${activeTab === 'ssl' ? 'text-foreground font-semibold bg-accent' : 'text-muted-foreground'}`}>
                            <Shield className="w-4 h-4" /> SSL Nodes
                        </Button>
                    </Link>
                    <Link href="/non-ssl" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className={`w-full justify-start gap-2 ${activeTab === 'non-ssl' ? 'text-foreground font-semibold bg-accent' : 'text-muted-foreground'}`}>
                            <Server className="w-4 h-4" /> Non-SSL Nodes
                        </Button>
                    </Link>
                    <a href="https://github.com/stackryze/lavalink-list" target="_blank" rel="noopener noreferrer" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                            <Plus className="w-4 h-4" /> Add Node
                        </Button>
                    </a>
                    <div className="flex items-center gap-2 px-4 py-2 border-t border-border mt-2">
                        <a href="https://github.com/stackryze/lavalink-list" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <Github className="w-5 h-5" />
                            </Button>
                        </a>
                        <a href="https://github.com/stackryze/lavalink-list/issues" target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                                <AlertCircle className="w-5 h-5" />
                            </Button>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
