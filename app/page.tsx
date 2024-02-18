import {Image} from "@nextui-org/react"

export default function Home() {
    return (
        <div className="flex flex-col text-xl text-gray-500 items-center">
            <Image
                width="100%"
                radius="none"
                alt="Nili Razaghi"
                src="/home/slider/01.webp"/>
            <p className="px-56 pt-28">While there is perhaps a province in which the photograph can tell us nothing
                more than what we see with
                our own eyes, there is another in which it proves to us how little our eyes permit us to see.</p>
            <div className="w-1/4 pt-10">
                <Image
                    width="100%"
                    radius="none"
                    alt="Nili Razaghi"
                    src="/home/sign.png"/>
            </div>
            <div className="flex w-full flex-wrap gap-8 justify-between px-10 py-10">
                {
                    Array.from({ length: 9}).map((_, index) =>
                        <div key={index} className="w-album-image">
                            <Image
                                key={index}
                                shadow="sm"
                                loading="eager"
                                isBlurred={true}
                                width="100%"
                                radius="none"
                                alt="test"
                                src={`/home/album/${index}.webp`} />
                        </div>
                )}
            </div>


        </div>
    );
}
