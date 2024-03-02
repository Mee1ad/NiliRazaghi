import {Image} from "@nextui-org/react";
import {title} from "@/components/primitives";
import {IoCameraOutline} from "react-icons/io5";
import {MdCameraAlt} from "react-icons/md";
import {Input} from "@nextui-org/input";
import Layout from "@/components/Layout";

export default function FeedbackPage() {
    return (
        <Layout>
            <div className="py-20 px-10">
                <title className={title()}>Feedback</title>
                <div className="text-center">
                    <span className="text-sm text-gray-500">REVIEWS</span>
                    <h1 className="text-3xl font-bold">Feedback</h1>
                </div>
                <h4 className="pt-20 pb-10">Leave Feedback</h4>
                <div className="flex flex-col">
                    {
                        Array.from({length: 7}).map((_, index) =>
                            <div key={index} className="flex gap-10 mb-10">
                                <Image
                                    key={index}
                                    shadow="sm"
                                    loading="eager"
                                    isBlurred={true}
                                    width="100"
                                    height="100"
                                    radius="full"
                                    alt="test"
                                    src={`/feedback/${index}.png`}/>
                                <div className="flex flex-col">
                                    <h3>name</h3>
                                    <h4>id</h4>
                                    <p>text</p>
                                </div>
                            </div>
                        )}
                </div>
                <h5 className="text-2xl font-bold">Leave Feedback</h5>
                <div className="flex py-10 gap-20">
                    <div className="flex h-28 w-28 bg-gray-400 justify-center items-center rounded-full">
                        <MdCameraAlt className="text-7xl text-white"/>
                    </div>
                    <div className="flex flex-col gap-4 w-7/12">
                        <Input type="text" autoComplete="off" placeholder="Your Name"/>
                        <Input type="text" autoComplete="off" placeholder="Link To Your Social Network Account"/>
                        <Input type="text" autoComplete="off" placeholder="Your Feedback"/>

                    </div>
                </div>
            </div>
        </Layout>
    )
}