import Image from "next/image";
import linkedinIcon from "/public/linkedin.svg";
import instagramIcon from "/public/instagram.svg";
import facebookIcon from "/public/facebook.svg";
import xIcon from "/public/x.svg";

type Social = {
    name: string;
    url: string;
    icon: string;
};

export default function Footer() {
    const socials: Social[] = [
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/company/nus-fintech-society/",
            icon: linkedinIcon,
        },
        {
            name: "Instagram",
            url: "https://www.instagram.com/nusfintech",
            icon: instagramIcon,
        },
        {
            name: "Facebook",
            url: "https://www.facebook.com/NUSfintech/",
            icon: facebookIcon,
        },
        { name: "X", url: "", icon: xIcon },
    ];

    return (
        <div className="flex justify-end p-4 font-header bg-[url('/footer.png')] bg-cover bg-center bg-no-repeat">
            <div className="flex flex-col gap-4 px-4">
                <div className="flex justify-center">
                    <p className="text-white font-bold text-2xl">
                        Let&#39;s Connect
                    </p>
                </div>
                <div className="flex space-x-4">
                    {socials.map((social) => (
                        <a key={social.name} href={social.url}>
                            <Image
                                src={social.icon}
                                alt={social.name}
                                width={26}
                                height={26}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
