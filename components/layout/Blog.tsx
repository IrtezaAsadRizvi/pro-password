"use client";
import Link from "next/link";
import { Twitter, Facebook, Linkedin, Link as LinkIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";


export type RelatedBlog = {
    title: string;
    image: string;
    date: string;
    excerpt: string;
    url: string;
};

type BlogProps = {
    title: string;
    heroImage: string;
    heroImageCaption: string;
    excerpt: string;
    content: React.ReactNode;
    publishDate: string;
    readDuration: string;
    tags?: string[];
    author: {
        name: string;
        image: string;
    };
    related?: RelatedBlog[];
};

const Blog: React.FC<BlogProps> = ({
    title,
    heroImage,
    heroImageCaption,
    excerpt,
    content,
    publishDate,
    readDuration,
    tags = [],
    author,
    related = [],
}) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [shareUrl, setShareUrl] = useState("");
    useEffect(() => {
        // prefer explicit site origin via env; fallback to window.origin
        const origin =
            process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
            (typeof window !== "undefined" ? window.location.origin : "");
        const qs = searchParams?.toString();
        const full = `${origin}${pathname}${qs ? `?${qs}` : ""}`;
        setShareUrl(full);
    }, [pathname, searchParams]);

    if (!shareUrl) return null; // avoid empty hrefs on first SSR pass

    const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
    )}&url=${encodeURIComponent(shareUrl)}`;

    const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
    )}`;

    const li = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
    )}`;
    return (
        <article className="mx-auto max-w-3xl px-4 sm:px-6">
            {/* Title */}
            <header className="pt-10">
                <h1 className="text-3xl font-semibold leading-tight tracking-tight 
                    sm:text-4xl md:text-5xl mb-10">
                    {title}
                </h1>


                {/* Excerpt */}
                {excerpt && (
                    <p className="mt-6 text-[17px] leading-7 text-gray-700 dark:text-gray-300">
                        {excerpt}
                    </p>
                )}

                {/* Hero image */}
                {heroImage && (
                    <figure className="mt-6 overflow-hidden">
                        <img
                            src={heroImage}
                            alt={title}
                            className="h-auto w-full object-cover rounded-xl"
                            loading="lazy"
                        />
                        <figcaption className="px-4 py-2 text-center text-xs text-gray-500">
                            {heroImageCaption} {heroImageCaption && <span className="font-bold mx-2">·</span>} {readDuration} 
                        </figcaption>
                    </figure>
                )}
            </header>

            {/* Body */}
            <section className="prose prose-neutral mt-10 max-w-none prose-h2:mt-10 prose-h2:text-xl prose-p:text-[17px] prose-p:leading-7 prose-li:leading-7">
                {content}
            </section>

            {/* Tags */}
            {tags.length > 0 && (
                <div className="mt-10 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-black/5 dark:bg-white/5 px-3 py-1 text-xs text-gray-700 dark:text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <hr className="my-16 border-gray-300 dark:border-gray-500" />

            <div className="flex justify-between">
                {/* Author row + actions */}
                <div className="flex items-center gap-3">
                    <img
                        src={author.image}
                        alt={author.name}
                        className="h-10 w-10 rounded-full object-cover"
                        loading="lazy"
                    />
                    <div className="leading-tight">
                        <p className="text-sm font-medium">{author.name}</p>
                        <p className="text-xs text-gray-500">
                            {publishDate}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                    <a
                        className="hover:text-gray-800"
                        href={tw}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Share on X/Twitter"
                    >
                        <Twitter className="h-4 w-4" />
                    </a>

                    <a
                        className="hover:text-gray-800"
                        href={fb}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Share on Facebook"
                    >
                        <Facebook className="h-4 w-4" />
                    </a>

                    <a
                        className="hover:text-gray-800"
                        href={li}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label="Share on LinkedIn"
                    >
                        <Linkedin className="h-4 w-4" />
                    </a>
                    <button
                        className="hover:text-gray-800"
                        onClick={async () => {
                            try {
                                await navigator.clipboard.writeText(window.location.href);
                                alert("Link copied");
                            } catch {
                                alert("Copy failed");
                            }
                        }}
                    >
                        <LinkIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <hr className="my-16 border-gray-300 dark:border-gray-500" />

            {/* Related */}
            {related.length > 0 && (
                <section className="mb-16">
                    <h2 className="text-lg font-semibold">
                        More from Irteza Asad and ProPassword
                    </h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2">
                        {related.map((item) => (
                            <Link
                                key={item.url}
                                href={item.url}
                                className="group rounded-xl transition hover:shadow-sm"
                            >
                                <div className="overflow-hidden rounded-lg">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-40 w-full object-cover transition group-hover:scale-[1.02]"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="mt-3 text-xs text-gray-500">{item.date}</div>
                                <h3 className="mt-1 line-clamp-2 text-base font-semibold group-hover:underline">
                                    {item.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                                    {item.excerpt}
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

        </article>
    );
};

export default Blog;
