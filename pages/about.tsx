import Layout from "@/components/layout";
import {title} from "@/components/primitives";
import {Image} from "@nextui-org/react";
import {FC} from "react";



const AboutPage: FC = () => {
    return (
        <div className="flex flex-col gap-8 px-10">
            <div className="text-center pt-20">
                <title className={title() + " text-small !important"}>About Me</title>
            </div>

            {/*<h1 className="text-3xl font-bold text-center pt-20">About Me</h1>*/}
            <Image
                loading="lazy"
                width="4608"
                height="3072"
                radius="none"
                alt="a_girl_with_book"
                src="https://zmhtvmpgfbcmndmudwow.supabase.co/storage/v1/object/public/Nili%20Website/about_slider.webp"
            />
            <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">PHOTOGRAPHER</span>
                <h1 className="text-3xl font-bold">Nili Razaghi</h1>
                <p className="pt-10 text-gray-500 text-xl">I’m Nili Razaghi, a photographer & videographer based in Istanbul. I got my first camera at 15, took formal classes, and at 17 began shooting weddings and children’s portraits professionally in Iran. I then joined GCorp’s media team to dive into commercial photography and cinematic videography, and later served as Media Director at Royal Beauty Clinic for two and a half years.

                    Today I run a freelance practice—creating photo & video content for brands and social channels. I have a passion for cinematic lighting, I love modeling, and I’m eager to break into cinema. For me, every shoot is more than a job: it’s a chance to blend artistic vision with technical craft, capture authentic moments, and keep pushing my skills to the next level.
                </p>
                <div className="w-1/4 pt-10 pb-36">
                    <Image
                        width="79"
                        height="37"
                        radius="none"
                        alt="Nili Razaghi Sign"
                        src="https://zmhtvmpgfbcmndmudwow.supabase.co/storage/v1/object/public/Nili%20Website/nili_sign.png?t=2024-05-11T16%3A59%3A02.385Z"
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutPage
