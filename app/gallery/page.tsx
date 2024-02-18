import {Card, CardFooter, Image} from "@nextui-org/react";

export default function GalleryPage() {
    return (
        <div className="columns-1 sm:columns-2 md:columns-3 gap-10 p-10">
            {
                Array.from({length: 13}).map((_, index) =>
                    <div key={index} className="mb-10">
                        <Image
                            key={index}
                            shadow="sm"
                            loading="eager"
                            isBlurred={true}
                            width="100%"
                            radius="none"
                            alt="test"
                            src={`/gallery/${index}.jpg`}/>
                    </div>
                )}
        </div>
    )
}