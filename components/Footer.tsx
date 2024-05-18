import clsx from "clsx";

const footerHeight = "h-32"

export const Footer = () => {
    return (
        <>
            <div className={footerHeight}/>
            <div
                className={clsx("absolute left-0 right-0 bottom-0 flex flex-col py-10",
                    "items-center bg-black text-gray-50", footerHeight)}>
                <h4 className="text-3xl"> Nili Razaghi</h4>
                <h6 className="text-xs pt-2 text-gray-300">Designed With ❤️ by
                    <span className="font-bold ml-1">
                    Soheil Ravasani
                </span>
                </h6>
            </div>
        </>
    )
}