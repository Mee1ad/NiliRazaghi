import Layout from "@/components/layout";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {title} from "@/components/primitives";
import {Input, Textarea, Button} from "@nextui-org/react";
import {MailIcon} from "@nextui-org/shared-icons";
import {GoNumber} from "react-icons/go";
import {MdOutlineDriveFileRenameOutline, MdSubject} from "react-icons/md";
import {BsChatSquareText} from "react-icons/bs";
import {SALT} from "@/config/consts";
import axios from "axios";
import md5 from "md5";

const ContactPage: FC = () => {
    const data: ContactUs = {
        name: '',
        email: '',
        number: '',
        subject: '',
        message: '',
        token: ''
    }
    const [formData, setFormData] = useState<ContactUs>(data)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log('updating')
        const {name, value} = e.target
        console.log(name, value)
        setFormData(prevState => ({...prevState, [name]: value}))
    }

    function handleFormSubmit(e: FormEvent) {
        console.log('sending...')
        console.log(formData)
        e.preventDefault()
        const requestData = { ...formData,
            ['token']: md5(formData.subject + formData.email + formData.number + formData.message + SALT)}

        console.log(requestData)
        axios.post("https://nili-telegram-bot.vercel.app/api/feedback", requestData)
            .then(response => {
                setFormData(data)
            })
            .catch(error => {
                console.error(error);
            })
    }

    return (
        <Layout>
            <div className="text-center px-10 py-20">
                <title className={title()}>Contact Us</title>
                <div className="pt-20 flex">
                    <div className="flex flex-col items-start gap-2 w-1/2">
                        <h4 className="pb-14 text-2xl font-bold">I’m available for worldwide orders.</h4>
                        <h5 className="text-lg"><span className="font-bold">Phone:</span> +98 911 834 5796</h5>
                        <h5 className="text-lg"><span className="font-bold">Email:</span> nilo.razaghi@gmail.com</h5>
                        <h5 className="text-lg"><span className="font-bold">Address:</span> Turkey, Istanbul.</h5>
                    </div>
                    <form className="flex flex-col items-start gap-4 w-1/2 text-lg" onSubmit={handleFormSubmit}>
                        <h4 className="text-2xl font-bold">Contact Form</h4>
                        <h5>Interested to work wiht us?</h5>
                        <Input
                            size="lg"
                            type="text"
                            label="Your Name"
                            name="name"
                            labelPlacement="inside"
                            endContent={
                                <MdOutlineDriveFileRenameOutline
                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                            }
                            onChange={e => handleChange(e)}
                        />
                        <div className="flex gap-4 w-full">
                            <Input
                                size="lg"
                                type="email"
                                label="Your Email"
                                name="email"
                                labelPlacement="inside"
                                endContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                }
                                onChange={e => handleChange(e)}
                            />
                            <Input
                                size="lg"
                                type="text"
                                label="Your Number"
                                name="number"
                                labelPlacement="inside"
                                endContent={
                                    <GoNumber className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                                }
                                onChange={e => handleChange(e)}
                            />
                        </div>

                        <Input
                            size="lg"
                            type="text"
                            label="Subject"
                            name="subject"
                            labelPlacement="inside"
                            endContent={
                                <MdSubject className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                            }
                            onChange={e => handleChange(e)}
                        />
                        <Textarea
                            size="lg"
                            label="Message"
                            name="message"
                            labelPlacement="inside"
                            endContent={
                                <BsChatSquareText
                                    className="text-2xl text-default-400 pointer-events-none flex-shrink-0"/>
                            }
                            onChange={e => handleChange(e)}
                        />
                        <Button type="submit" radius="lg" className="bg-black text-gray-50"> Send Message </Button>
                    </form>

                </div>
            </div>
        </Layout>
    )
}

export default ContactPage