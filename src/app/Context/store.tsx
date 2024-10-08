"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import {
    SetStateAction,
    Dispatch,
    createContext,
    useState,
    useContext,
    useEffect
} from "react";
import useFollowing from "../hook/getFollowing";
const supabase = supabaseBrowser();
const AppContext = createContext<any>(undefined);

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: ""
};

export async function getAuthed() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error fetching session: ", error.message);
        return { user: initUser, session: null };
    }
    if (data.session?.user) {
        const { data: user } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
        return { user, session: data };
    }
    return { user: initUser, session: null };
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
    let [state, setState] = useState<any | undefined>(undefined);
    let [posts, setPosts] = useState<any>([]);
    let [session, setSession] = useState<any>(null);
    let [tabDisplay, setTabDisplay] = useState<string>("For you");
    useEffect(() => {
        getAuthed()
            .then(({ user, session }) => {
                setState(user);
                setSession(session);
            })
            .catch((error) => {
                console.error("Error fetching access token: ", error);
            });
    }, []);
    return (
        <AppContext.Provider
            value={{
                state,
                setState,
                session,
                setSession,
                posts,
                setPosts,
                tabDisplay,
                setTabDisplay
            }}
        >
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
