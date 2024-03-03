import {Image} from "@nextui-org/react";
import {IMAGE_TABLE} from "@/config/consts";
import {FC} from "react";
import {Feedback} from "@/interface/feedback.interface"

const FeedbackCard: FC<{ feedback: Feedback }> = ({feedback}) => {
    const {id, name, social_media_id, text} = feedback
    const imageURL = feedback[IMAGE_TABLE].url
    const imageAlt = feedback[IMAGE_TABLE].alt

    return (
        <div key={id} className="flex gap-10 mb-10 items-start">
            <Image
                shadow="sm"
                loading="eager"
                isBlurred={true}
                width="100"
                height="100"
                radius="full"
                alt={imageAlt}
                src={imageURL}/>
            <div className="w-5/6 flex flex-col">
                <h3 className="font-bold">{name}</h3>
                <h4 className="text-gray-500 text-xs">@{social_media_id}</h4>
                <p className="text-gray-500 mt-4">{text}</p>
            </div>
        </div>
    )
}

export default FeedbackCard