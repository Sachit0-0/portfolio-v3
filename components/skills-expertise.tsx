"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Code2, Database, ArrowRight } from "lucide-react"
import { useRef, memo, useMemo } from "react"
import dynamic from "next/dynamic"
import { useIsMobile } from "@/lib/useIsMobile"

const TechShowcase = dynamic(() => import("./tech-showcase"), { ssr: false })

const skillsData = Object.freeze([
	{
		category: "Frontend Mastery",
		icon: Code2,
		gradient: "from-blue-600 via-purple-600 to-indigo-600",
		skills: [
			{ name: "React & Next.js", level: 95, years: "3+" },
			{ name: "TypeScript", level: 90, years: "2+" },
			{ name: "Tailwind CSS", level: 90, years: "2+" },
			{ name: "Framer Motion", level: 85, years: "1+" },
		],
	},
	{
		category: "Backend Excellence",
		icon: Database,
		gradient: "from-emerald-600 via-teal-600 to-cyan-600",
		skills: [
			{ name: "Node.js & Express", level: 92, years: "2+" },
			{ name: "Python & Django", level: 85, years: "2+" },
			{ name: "PostgreSQL", level: 88, years: "2+" },
			{ name: "GraphQL", level: 80, years: "1+" },
		],
	},
])

const FloatingSkillBadge = memo(({ skill, index, categoryIndex, isMobile }: any) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { once: true })

	return (
		<motion.div
			ref={ref}
			initial={isMobile ? false : { opacity: 0, scale: 0.95, rotate: -6 }}
			animate={isInView && !isMobile ? { opacity: 1, scale: 1, rotate: 0 } : {}}
			transition={
				isMobile
					? {}
					: {
							duration: 0.5,
							delay: categoryIndex * 0.15 + index * 0.07,
							type: "spring",
							stiffness: 180,
							damping: 18,
					  }
			}
			whileHover={isMobile ? {} : { scale: 1.04, y: -4 }}
			className="group cursor-pointer"
		>
			<div
				className={`relative p-6 rounded-2xl border ${
					isMobile
						? "bg-white dark:bg-gray-900 shadow"
						: "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl"
				} border-white/20 dark:border-gray-700/30 transition-all duration-400`}
			>
				{/* Skill level arc */}
				{!isMobile && (
					<div className="absolute -top-2 -right-2">
						<div className="relative w-12 h-12">
							<svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
								<path
									d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeDasharray={`${skill.level}, 100`}
									className="text-blue-500 drop-shadow-sm"
								/>
							</svg>
							<div className="absolute inset-0 flex items-center justify-center">
								<span className="text-xs font-bold text-gray-700 dark:text-gray-300">{skill.level}</span>
							</div>
						</div>
					</div>
				)}

				<div className="space-y-3">
					<h4 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
						{skill.name}
					</h4>
					<div className="flex items-center gap-2">
						<Badge
							variant="outline"
							className="text-xs bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
						>
							{skill.years} experience
						</Badge>
					</div>
				</div>

				{/* Hover effect */}
				{!isMobile && (
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
				)}
			</div>
		</motion.div>
	)
})

FloatingSkillBadge.displayName = "FloatingSkillBadge"

export function SkillsExpertise() {
	const isMobile = useIsMobile()
	const containerRef = useRef(null)
	const isInView = useInView(containerRef, { once: true, margin: "-100px" })

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	})

	const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -40])
	const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], isMobile ? [1, 1, 1, 1] : [0, 1, 1, 0])

	const categories = useMemo(() => skillsData, [])

	return (
		<section id="skills" ref={containerRef} className="relative py-32 overflow-hidden">
			{/* Background */}
			<div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-950 dark:via-blue-950/30 dark:to-indigo-950/50" />

			{/* Animated orbs */}
			{!isMobile && (
				<motion.div style={{ y }} className="absolute inset-0 overflow-hidden pointer-events-none">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
					<div
						className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"
						style={{ animationDelay: "1s" }}
					/>
				</motion.div>
			)}

			<motion.div style={{ opacity }} className="container mx-auto px-4 relative z-10">
				{/* Header */}
				<motion.div
					initial={isMobile ? false : { opacity: 0, y: 40 }}
					animate={isInView && !isMobile ? { opacity: 1, y: 0 } : {}}
					transition={{ duration: 0.7, ease: "easeOut" }}
					className="text-center mb-20"
				>
					<h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
						<span className="bg-gradient-to-r caveat-text text-primary">
							Crafting Digital
						</span>
						<br />
						<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent caveat-bold">
							Experiences
						</span>
					</h2>
				
				</motion.div>

				{/* Skills list */}
				<div className="space-y-24">
					{categories.map((category, categoryIndex) => (
						<motion.div
							key={category.category}
							initial={isMobile ? false : { opacity: 0, y: 80 }}
							animate={isInView && !isMobile ? { opacity: 1, y: 0 } : {}}
							transition={{
								duration: 0.7,
								delay: categoryIndex * 0.22,
								ease: "easeOut",
							}}
							className="relative"
						>
							{/* Category header */}
							<div className="flex items-center gap-6 mb-12">
								<motion.div
									whileHover={isMobile ? {} : { scale: 1.07, rotate: 4 }}
									className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-2xl`}
								>
									<category.icon className="w-10 h-10 text-white" />
								</motion.div>
								<div className="flex-1">
									<h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
										{category.category}
									</h3>
									<div className="flex items-center gap-3">
										<div className={`h-1 w-24 bg-gradient-to-r ${category.gradient} rounded-full`} />
										<span className="text-gray-500 dark:text-gray-400 font-medium">
											{category.skills.length} Technologies
										</span>
									</div>
								</div>
								{!isMobile && (
									<motion.div whileHover={{ x: 4 }} className="hidden md:flex items-center gap-2 text-gray-400 dark:text-gray-500">
										<span className="text-sm font-medium">Explore</span>
										<ArrowRight className="w-4 h-4" />
									</motion.div>
								)}
							</div>

							{/* Skills grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
								{category.skills.map((skill, skillIndex) => (
									<FloatingSkillBadge
										key={skill.name}
										skill={skill}
										index={skillIndex}
										categoryIndex={categoryIndex}
										isMobile={isMobile}
									/>
								))}
							</div>
						</motion.div>
					))}
					{!isMobile && <TechShowcase />}
				</div>
			</motion.div>
		</section>
	)
}
