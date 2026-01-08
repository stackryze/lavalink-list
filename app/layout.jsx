import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { ThemeProvider } from "@/components/theme-provider";
import { NodesProvider } from "@/contexts/NodesContext";

export const metadata = {
    title: 'Lavalink List - Free Public Lavalink Nodes',
    description: 'A comprehensive list of free and public Lavalink nodes for Discord music bots.',
    generator: 'v0.app',
    icons: {
        icon: '/stackryze_logo_white.png',
        apple: '/stackryze_logo_white.png',
    },
};

export default function RootLayout({ children, }) {
    return (<html lang="en" suppressHydrationWarning>
        <body className={`font-sans antialiased`}>
            <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <NodesProvider>
                    {children}
                </NodesProvider>
                <Analytics />
            </ThemeProvider>
        </body>
    </html>);
}
