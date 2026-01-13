"use client";

import { X, Moon, Sun, User, Settings, Phone, HelpCircle, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { theme, setTheme } = useTheme();
    const { generalProfile, logout } = useUserStore();
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
        onClose();
    };

    const handleLogout = () => {
        logout();
        router.push("/auth");
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        className="fixed top-0 left-0 h-full w-[280px] bg-background shadow-2xl z-50 flex flex-col pt-safe-top border-r border-border"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                        <div className="p-4 border-b border-border flex justify-between items-center bg-primary text-primary-foreground">
                            <div>
                                <h2 className="font-bold text-lg">ShramSetu</h2>
                                <p className="text-xs opacity-80">Welcome, {generalProfile?.name || "Guest"}</p>
                            </div>
                            <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            <nav className="space-y-1 px-2">
                                <SidebarItem icon={User} label="My Profile" onClick={() => handleNavigation('/general-profile')} />
                                <SidebarItem icon={Settings} label="Settings" onClick={() => handleNavigation('/settings')} />
                                <SidebarItem icon={HelpCircle} label="Help & Support" onClick={() => handleNavigation('/help')} />
                                <SidebarItem icon={Phone} label="Contact Us" onClick={() => handleNavigation('/contact')} />
                            </nav>

                            <div className="mt-6 px-4">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                                    Preferences
                                </p>
                                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <span className="text-sm font-medium text-foreground">Dark Mode</span>
                                    <button
                                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                        className="p-2 rounded-full bg-background shadow-sm border border-input"
                                    >
                                        {theme === "dark" ? (
                                            <Moon className="w-4 h-4 text-blue-400" />
                                        ) : (
                                            <Sun className="w-4 h-4 text-orange-400" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 border-t border-border">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 w-full p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Logout</span>
                            </button>
                            <div className="text-center mt-4 text-[10px] text-muted-foreground">
                                v1.0.0 Production Build
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

const SidebarItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="flex items-center gap-3 w-full p-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
    >
        <Icon className="w-5 h-5 text-muted-foreground" />
        <span className="font-medium text-sm">{label}</span>
    </button>
);
