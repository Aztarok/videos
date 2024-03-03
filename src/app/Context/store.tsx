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
const supabase = supabaseBrowser();
const AppContext = createContext<any>(undefined);

const initUser = {
    created_at: "",
    display_name: "",
    email: "",
    id: "",
    image_url: ""
};

async function getAuthed() {
    const { data } = await supabase.auth.getSession();
    if (data.session?.user) {
        const { data: user } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", data.session.user.id)
            .single();
        return user;
    }
    return initUser;
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
    let [state, setState] = useState<any | undefined>(undefined);
    useEffect(() => {
        getAuthed()
            .then((token) => {
                setState(token);
            })
            .catch((error) => {
                console.error("Error fetching access token: ", error);
            });
    }, []);
    return (
        <AppContext.Provider value={{ state, setState }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppContext() {
    return useContext(AppContext);
}
