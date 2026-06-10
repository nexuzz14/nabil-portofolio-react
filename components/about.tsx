"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="mb-24 scroll-mt-24 md:mb-36 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground lg:sr-only">About</h2>
      </div>
      
      <div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4 text-muted-foreground leading-relaxed"
        >
          <p>
            Back in 2021, I decided to dive headfirst into the world of web development. Fast-forward to today, and I've had the privilege of building software for various freelance clients, creating full-stack applications, and constantly learning new ways to solve complex digital problems.
          </p>
          <p>
            My main focus these days is building accessible, inclusive products and digital experiences at the intersection of design and engineering. I specialize in <span className="font-semibold text-foreground">React, Next.js, and Laravel</span>, creating seamless user interfaces that connect with robust backends.
          </p>
          <p>
            When I'm not at the computer, I'm usually hanging out with friends, reading up on the latest tech trends, or exploring new creative hobbies.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
