import {title} from "@/components/primitives";
import {ThemeSwitch} from "@/components/theme-switch";

export default function NiliPage() {
    return (
        <div>
            <h1 className={title()}>Nili</h1>
            <ThemeSwitch/>
        </div>
    )
}