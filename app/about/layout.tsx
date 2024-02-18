import {Sidebar} from "@/components/sidebar";

export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
            <Sidebar />
        </>
	);
}
