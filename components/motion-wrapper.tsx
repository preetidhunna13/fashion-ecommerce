"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  initial?: object
  animate?: object
  transition?: object
  whileHover?: object
  whileTap?: object
  viewport?: object
  delay?: number
}

export function MotionWrapper({
  children,
  className = "",
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.6, ease: "easeOut" },
  whileHover,
  whileTap,
  viewport = { once: true, margin: "-100px" },
  delay = 0,
}: MotionWrapperProps) {
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      transition={{ ...transition, delay }}
      whileHover={whileHover}
      whileTap={whileTap}
      viewport={viewport}
    >
      {children}
    </motion.div>
  )
}

export function MotionButton({
  children,
  className = "",
  onClick,
  ...props
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  [key: string]: any
}) {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
