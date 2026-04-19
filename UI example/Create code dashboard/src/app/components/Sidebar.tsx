import { motion, AnimatePresence } from "motion/react";
import { Database, FileText, Gauge, Upload, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ activeSection, onSectionChange, isCollapsed, onToggleCollapse }: SidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Gauge },
    { id: "pengajar", label: "Data Pengajar", icon: Database },
    { id: "rekapan", label: "Rekapan Klasifikasi", icon: FileText },
    { id: "preprocessing", label: "Pre-Processing", icon: Upload },
  ];

  const SidebarContent = ({ collapsed = false }: { collapsed?: boolean }) => (
    <>
      <div className="p-8 border-b border-sidebar-border">
        {!collapsed ? (
          <>
            <h1
              className="text-3xl font-black tracking-tight text-sidebar-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Skripsi<span className="text-sidebar-primary">.</span>
            </h1>
            <p className="text-sm text-sidebar-foreground/70 mt-2">
              Classification System
            </p>
          </>
        ) : (
          <h1
            className="text-2xl font-black tracking-tight text-sidebar-foreground text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            S<span className="text-sidebar-primary">.</span>
          </h1>
        )}
      </div>

      <nav className="p-6 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => {
                onSectionChange(item.id);
                setIsMobileOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-lg transition-all relative overflow-hidden group ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              } ${collapsed ? "justify-center" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: collapsed ? 0 : 4 }}
              whileTap={{ scale: 0.98 }}
              title={collapsed ? item.label : undefined}
            >
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-sidebar-primary to-secondary opacity-90"
                  layoutId={collapsed ? "activeSectionCollapsed" : "activeSection"}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon className="w-5 h-5 relative z-10 flex-shrink-0" />
              {!collapsed && (
                <span className="font-medium relative z-10">{item.label}</span>
              )}
            </motion.button>
          );
        })}
      </nav>

      <div className="mt-auto p-6 border-t border-sidebar-border">
        {!collapsed ? (
          <div className="bg-sidebar-accent rounded-lg p-5">
            <p className="text-sm text-sidebar-accent-foreground/90">
              Logged in as
            </p>
            <p
              className="text-lg font-semibold text-sidebar-accent-foreground mt-1"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Administrator
            </p>
          </div>
        ) : (
          <div className="bg-sidebar-accent rounded-lg p-4 flex items-center justify-center">
            <div className="w-10 h-10 bg-sidebar-primary rounded-full flex items-center justify-center text-sidebar-primary-foreground font-bold">
              A
            </div>
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-3 bg-primary text-primary-foreground rounded-lg shadow-lg"
      >
        {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-0 h-full w-80 bg-sidebar z-50 flex flex-col shadow-2xl"
          >
            <SidebarContent collapsed={false} />
          </motion.aside>
        )}
      </AnimatePresence>

      <motion.aside
        animate={{ width: isCollapsed ? 96 : 320 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="hidden lg:flex sticky top-0 h-screen bg-sidebar flex-col shadow-xl relative"
      >
        <SidebarContent collapsed={isCollapsed} />

        <motion.button
          onClick={onToggleCollapse}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute -right-4 top-8 w-8 h-8 bg-sidebar-primary text-sidebar-primary-foreground rounded-full shadow-lg flex items-center justify-center z-50 hover:bg-secondary transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </motion.button>
      </motion.aside>
    </>
  );
}
