import {Sidebar} from "@/components/sidebar";

export default function NiliLayout({
    children,
}: {
    children: React.ReactNode;
}){
    return (
        <>
            { children }
        </>
    );
}