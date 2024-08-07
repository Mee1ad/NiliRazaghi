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
                <p className="pt-10 text-gray-500">Nili Razaghi is a photographer based in Iran. Nili has been
                    professionally pursuing photography since
                    the age of 17, starting as a wedding and kids photographer. Over the years, she expanded her
                    portfolio
                    to include commercial photography and videography, honing her skills by working with GCorp media
                    team
                    After that she served as the media director of Royal Beauty Clinic for two and half years and also works as a freelance
                    Content creator.

                    Nili&apos;s love for her craft shines through in her cinematic photographs, which blend artistry and
                    technical skill to create images. Her relentless pursuit of excellence drives her to
                    continuously
                    improve her skills and learn something new with every photography session.
                </p>
                <div className="w-1/4 pt-10 pb-36">
                    <Image
                        width="100%"
                        radius="none"
                        alt="Nili Razaghi Sign"
                        src="/home/sign.png"
                    />
                </div>
            </div>
        </div>
    );
}

export default AboutPage
