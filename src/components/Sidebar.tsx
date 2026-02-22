import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LogOut,
  LayoutDashboard,
  CalendarDays,
  BarChart3,
  UserCircle,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export interface NavItem {
  icon: any;
  label: string;
  path?: string; // dashboard এর জন্য
  tab?: string; // admin এর জন্য
  onClick?: () => void; // custom action
}

const DASHBOARD_NAV: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: CalendarDays, label: "Events", path: "/events/new" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  activeTab?: string; // admin tab tracking এর জন্য
  onTabChange?: (tab: string) => void; // admin tab change
  title?: string; // "Regixo" বা "Admin Panel"
  titleIcon?: any; // optional icon beside title
}

export const Sidebar = ({
  open,
  onClose,
  navItems = DASHBOARD_NAV,
  activeTab,
  onTabChange,
  title = "Regixo",
  titleIcon: TitleIcon,
}: SidebarProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    onClose();
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (item: NavItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (item.tab && onTabChange) {
      onTabChange(item.tab);
      onClose();
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const isItemActive = (item: NavItem) => {
    if (item.tab) return activeTab === item.tab;
    if (item.path) return location.pathname === item.path;
    return false;
  };

  return (
    <>
      {/* ── Mobile Backdrop ── */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300
          ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{
          backgroundColor: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(4px)",
        }}
        onClick={onClose}
      />

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen flex flex-col shrink-0
          border-r border-sidebar-border
          transition-all duration-300 ease-in-out
          w-60
          ${collapsed ? "lg:w-[68px]" : "lg:w-60"}
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
        style={{ backgroundColor: "hsl(var(--sidebar-background))" }}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border shrink-0">
          <Link
            to="/"
            className={`flex items-center gap-2 text-lg font-bold tracking-tight whitespace-nowrap overflow-hidden
              transition-all duration-300
              ${collapsed ? "lg:w-0 lg:opacity-0 lg:pointer-events-none" : "opacity-100"}`}
            style={{
              fontFamily: "'DM Serif Display', serif",
              color: "hsl(var(--sidebar-accent-foreground))",
            }}
          >
            {TitleIcon && <TitleIcon className="h-5 w-5 shrink-0" />}
            {title}
          </Link>

          <button
            onClick={() => setCollapsed((c) => !c)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>

          <button
            onClick={onClose}
            className="lg:hidden flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-sidebar-accent"
            style={{ color: "hsl(var(--sidebar-foreground))" }}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Nav ── */}
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden">
          {navItems.map((item) => {
            const isActive = isItemActive(item);
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`
                  relative w-full flex items-center gap-3 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer group px-3 py-2.5
                  ${collapsed ? "lg:justify-center lg:px-0" : ""}
                  ${isActive ? "bg-sidebar-accent" : "hover:bg-sidebar-accent/50"}
                `}
                style={{
                  color: isActive
                    ? "hsl(var(--sidebar-accent-foreground))"
                    : "hsl(var(--sidebar-foreground))",
                }}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span
                  className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? "lg:w-0 lg:opacity-0" : "opacity-100"}`}
                >
                  {item.label}
                </span>
                {collapsed && (
                  <span
                    className="absolute left-full ml-3 px-2.5 py-1.5 text-xs rounded-md shadow-lg whitespace-nowrap pointer-events-none z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 hidden lg:block"
                    style={{
                      backgroundColor: "hsl(var(--sidebar-accent))",
                      color: "hsl(var(--sidebar-accent-foreground))",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* ── User Footer ── */}
        <div className="p-2 border-t border-sidebar-border shrink-0">
          <div
            className={`flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent/30 ${collapsed ? "lg:flex-col lg:px-0" : ""}`}
          >
            <div
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold"
              style={{
                backgroundColor: "hsl(var(--sidebar-accent))",
                color: "hsl(var(--sidebar-accent-foreground))",
              }}
            >
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <div
              className={`flex flex-1 items-center justify-between min-w-0 overflow-hidden transition-all duration-300 ${collapsed ? "lg:w-0 lg:h-0 lg:opacity-0 lg:pointer-events-none" : "opacity-100"}`}
            >
              <p
                className="text-xs font-medium truncate"
                style={{ color: "hsl(var(--sidebar-accent-foreground))" }}
              >
                {user?.email}
              </p>
              <button
                onClick={signOut}
                className="ml-2 shrink-0 transition-opacity hover:opacity-60"
                style={{ color: "hsl(var(--sidebar-foreground))" }}
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={signOut}
              className={`transition-opacity hover:opacity-60 ${collapsed ? "lg:flex hidden" : "hidden"}`}
              style={{ color: "hsl(var(--sidebar-foreground))" }}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
