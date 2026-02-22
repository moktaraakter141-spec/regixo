import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Step 1: onAuthStateChange — async নয়, শুধু state set করে
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Step 2: getSession দিয়ে initial session নাও
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Step 3: session থাকলে background এ status check করো
      if (session?.user) {
        checkAndHandleStatus(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Status check আলাদা function এ — UI block করে না
  const checkAndHandleStatus = async (userId: string) => {
    try {
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      if (roleData) return; // admin হলে কিছু করার দরকার নেই

      const { data } = await supabase
        .from("profiles")
        .select("status, suspended_until")
        .eq("id", userId)
        .single();

      const p = data as any;
      if (!p) return;

      if (p.status === "banned") {
        toast({
          title: "Account Banned",
          description: "Your account has been permanently banned.",
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      if (
        p.status === "suspended" &&
        p.suspended_until &&
        new Date(p.suspended_until) > new Date()
      ) {
        const until = new Date(p.suspended_until).toLocaleDateString();
        toast({
          title: "Account Suspended",
          description: `Your account is suspended until ${until}.`,
          variant: "destructive",
        });
        await supabase.auth.signOut();
        return;
      }

      // Suspend শেষ হলে auto restore
      if (
        p.status === "suspended" &&
        p.suspended_until &&
        new Date(p.suspended_until) <= new Date()
      ) {
        await supabase
          .from("profiles")
          .update({ status: "active", suspended_until: null } as any)
          .eq("id", userId);
      }
    } catch {
      // error হলে কিছু করার দরকার নেই
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
