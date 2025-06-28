"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "./theme-toggle"

const navItems = [
	{ name: "Home", link: "#home" },
	{ name: "About", link: "#about" },
	{ name: "Skills", link: "#skills" },
	{ name: "Tech", link: "#technologies" },
	{ name: "Projects", link: "#projects" },
	{ name: "Experience", link: "#experience" },
	{ name: "Contact", link: "#contact" },
]

interface MobileMenuProps {
	activeSection: string
	onSectionClick: (sectionId: string) => void
}

export function MobileMenu({ activeSection, onSectionClick }: MobileMenuProps) {
	const [isOpen, setIsOpen] = useState(false)
	const menuRef = useRef<HTMLDivElement>(null)

	// Lock scroll on menu open
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : ""
		return () => {
			document.body.style.overflow = ""
		}
	}, [isOpen])

	// Close menu if click outside nav area
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				isOpen &&
				menuRef.current &&
				!menuRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [isOpen])

	const handleSectionClick = (link: string) => {
		onSectionClick(link)
		setIsOpen(false)
	}

	return (
		<div className="md:hidden">
			<div className="flex items-center gap-12 px-4 py-3 rounded-lg">
				<ThemeToggle />
				<Button
					variant="ghost"
					size="icon"
					aria-label={isOpen ? "Close menu" : "Open menu"}
					onClick={() => setIsOpen(!isOpen)}
					className="w-10 h-10 rounded-full flex items-center justify-center text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
				>
					<AnimatePresence mode="wait">
						<motion.div
							key={isOpen ? "close" : "menu"}
							initial={{ rotate: -90, opacity: 0 }}
							animate={{ rotate: 0, opacity: 1 }}
							exit={{ rotate: 90, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							{isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
						</motion.div>
					</AnimatePresence>
				</Button>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="fixed inset-0 bg-white dark:bg-gray-950 z-50 md:hidden flex flex-col"
						initial={{ opacity: 0, x: "100%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "100%" }}
						transition={{ duration: 0.3 }}
					>
						<div className="flex justify-end p-6">
							<Button
								variant="ghost"
								size="icon"
								onClick={() => setIsOpen(false)}
								className="text-gray-900 dark:text-white"
								aria-label="Close menu"
							>
								<X className="h-6 w-6" />
							</Button>
						</div>
						<nav className="flex flex-col items-center bg-white dark:bg-gray-950 w-full justify-center  gap-8">
							{navItems.map((item, index) => (
								<motion.button
									key={item.name}
									initial={{ opacity: 0, y: 30 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 30 }}
									transition={{ duration: 0.3, delay: index * 0.08 }}
									onClick={() => handleSectionClick(item.link)}
									className={cn(
										"text-3xl font-light font-serif text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300 transition-colors",
										activeSection === item.link.substring(1) ? "underline" : ""
									)}
									style={{ minWidth: 180 }}
								>
									{item.name}
								</motion.button>
							))}
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
