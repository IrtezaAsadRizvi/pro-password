"use client";
import { useState, useRef, useEffect } from "react";

const Dropdown = ({ title = null, items = [], initialValue = null, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button className='icon-button'
                onClick={() => setIsOpen(!isOpen)}>
                {title ? (typeof title === 'function' ? title() : title) : (
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 13.5C12.5523 13.5 13 13.0523 13 12.5C13 11.9477 12.5523 11.5 12 11.5C11.4477 11.5 11 11.9477 11 12.5C11 13.0523 11.4477 13.5 12 13.5Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M19 13.5C19.5523 13.5 20 13.0523 20 12.5C20 11.9477 19.5523 11.5 19 11.5C18.4477 11.5 18 11.9477 18 12.5C18 13.0523 18.4477 13.5 19 13.5Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 13.5C5.55228 13.5 6 13.0523 6 12.5C6 11.9477 5.55228 11.5 5 11.5C4.44772 11.5 4 11.9477 4 12.5C4 13.0523 4.44772 13.5 5 13.5Z" stroke="#676879" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </button>
            {isOpen && (
                <ul className="absolute top-full right-0 transition-all duration-300 grid min-w-max
                    bg-body-light dark:bg-body-dark rounded-xl shadow-menu py-2 px-2 grid-cols-1 gap-1
                    opacity-1 pointer-events-auto translate-y-0 bg-[--body-light] dark:bg-[--body-dark]
                    shadow">
                    {items.map((item, index) => (
                        <li key={index}
                            className={`min-w-40 rounded-[10px] px-4 py-2 hover:bg-[#dfdfdf] 
                            dark:hover:bg-[#1c1c1c] cursor-pointer 
                            ${initialValue === item.value ? 'bg-[#d3d3d3] dark:bg-action-hover-dark' : ''}`}
                            onClick={() => {
                                onSelect(item.value);
                                setIsOpen(false); // Close on selection
                            }}>
                            {item.text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
