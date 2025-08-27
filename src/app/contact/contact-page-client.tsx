'use client'

import { motion } from 'framer-motion'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ClosingCTA } from '@/components/closing-cta'
import { fadeUpVariants } from '@/lib/animations'
import { Mail, MapPin, Send, Clock, MessageSquare } from 'lucide-react'

export function ContactPageClient() {
  const contactMethods = [
    {
      icon: Mail,
      title: "Email",
      description: "Send us a message directly",
      contact: "connect@rubixkube.ai",
      href: "mailto:connect@rubixkube.ai"
    },
    {
      icon: MessageSquare,
      title: "Live Chat",
      description: "Get instant support",
      contact: "Available 24/7",
      href: "#"
    },
    {
      icon: Clock,
      title: "Response Time",
      description: "We typically respond within",
      contact: "2-4 hours",
      href: "#"
    }
  ]

  const officeInfo = {
    icon: MapPin,
    title: "Office",
    description: "SLOW RABBIT DESIGNS PRIVATE LIMITED",
    contact: "India",
    href: "#"
  }

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-24 pb-12 bg-background border-b border-border">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
              variants={fadeUpVariants}
            >
              Get in Touch
            </motion.h1>
            <motion.p 
              className="text-lg text-foreground-muted max-w-2xl mx-auto"
              variants={fadeUpVariants}
            >
              Have questions about RubixKube? Need help getting started? We&apos;re here to help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 bg-background">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Information */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                {/* Contact Methods */}
                {contactMethods.map((method, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 bg-card-background rounded-lg border border-border hover:border-primary/20 transition-colors"
                  >
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <method.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-1">{method.title}</h3>
                      <p className="text-foreground-muted text-sm mb-2">{method.description}</p>
                      <a 
                        href={method.href}
                        className="text-primary hover:underline font-medium"
                      >
                        {method.contact}
                      </a>
                    </div>
                  </motion.div>
                ))}

                {/* Office Info */}
                <motion.div
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-4 bg-card-background rounded-lg border border-border"
                >
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <officeInfo.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{officeInfo.title}</h3>
                    <p className="text-foreground-muted text-sm mb-2">{officeInfo.description}</p>
                    <span className="text-foreground font-medium">{officeInfo.contact}</span>
                  </div>
                </motion.div>
              </div>

              {/* Additional Info */}
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-8 p-6 bg-background-secondary rounded-lg border border-border"
              >
                <h3 className="font-semibold text-foreground mb-3">Why Contact Us?</h3>
                  <ul className="space-y-2 text-foreground-muted text-sm">
                    <li>• Get help with platform setup and configuration</li>
                    <li>• Discuss enterprise pricing and custom solutions</li>
                    <li>• Report bugs or request new features</li>
                    <li>• Schedule a consultation call</li>
                    <li>• Learn about integration possibilities</li>
                  </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-semibold text-foreground mb-6">
                Send us a Message
              </h2>
              <p className="text-lg text-foreground-muted mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <motion.div
                className="rounded-2xl border border-border bg-card-background shadow-xl p-8"
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter your full name"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <Input 
                        type="text" 
                        placeholder="Enter company name"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input 
                        type="email" 
                        placeholder="Enter your email address"
                        className="w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input 
                        type="text" 
                        placeholder="What's this about?"
                        className="w-full"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea 
                      placeholder="Tell us how we can help you..."
                      className="w-full min-h-[120px]"
                      required
                    />
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg py-6"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </div>

                  <p className="text-sm text-foreground-muted text-center">
                    By submitting this form, you agree to our{' '}
                    <a href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</a>
                    {' '}and{' '}
                    <a href="/legal/terms" className="text-primary hover:underline">Terms of Service</a>.
                  </p>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <ClosingCTA />
      <Footer />
    </>
  )
}
