import { Coffee } from "lucide-react";

const Footer: React.FC = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="border-b border-black dark:border-gray-600">
            <div className="mx-auto flex flex-col-reverse md:flex-row gap-4 max-w-[1280px] items-center justify-between px-2 py-10 text-sm">
                <p>© ProPassword All rights reserved ({year})</p>

                <a
                    href="https://buymeacoffee.com/irtezaasad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:underline font-semibold text-[#9261fb]"
                    aria-label="Buy me a coffee"
                    title="Buy me a coffee"
                >
                    <Coffee className="h-6 w-6" size={24} />
                    <span>Buy me a Coffee</span>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
