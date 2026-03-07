import "./globals.css";
import { ThemeProvider, CssBaseline, Box, Typography } from "@mui/material";
import { theme } from "@/theme";
import Link from "next/link";
import Providers from "@/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
              
              {/* Sidebar */}
              <Box
                sx={{
                  width: 240,
                  bgcolor: "primary.main",
                  color: "white",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
                    KANBAN
                  </Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Link href="/">🏠 Dashboard</Link>
                    <Link href="/focus">⏱️ Focus Mode</Link>
                    <Link href="/analytics">📊 Analytics</Link>
                    <Link href="/settings">⚙️ Settings</Link>
                  </Box>
                </Box>

                <Typography variant="caption" align="center">
                  v0.1.0
                </Typography>
              </Box>

              {/* Content */}
              <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {children}
              </Box>

            </Box>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
