'use client'

import { Header, Footer, Marquee } from '@/components/layout'
import { Button, Input, Textarea } from '@/components/ui'
import { useState } from 'react'

export default function ComponentShowcase() {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [errorInput, setErrorInput] = useState('')

  return (
    <div className="min-h-screen flex flex-col bg-dark-grey">
      <Marquee />
      <Header />

      <main className="flex-1 px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          <section>
            <h1 className="text-4xl font-black mb-4 text-lime-green">
              Component Showcase
            </h1>
            <p className="text-light-text/70">
              All components from the design system in one place for testing and verification.
            </p>
          </section>

          {/* Buttons */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-green border-b border-lime-green/30 pb-2">
              Buttons
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">Outline Variant (Default)</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline">READ THE MANIFESTO</Button>
                  <Button variant="outline" disabled>DISABLED STATE</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">Solid Variant</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="solid">JOIN THE AGENCY</Button>
                  <Button variant="solid" disabled>DISABLED STATE</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">As Links</h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" href="/manifesto">GO TO MANIFESTO</Button>
                  <Button variant="solid" href="/work">VIEW WORK</Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">Full Width (Mobile)</h3>
                <Button variant="outline" fullWidth>FULL WIDTH BUTTON</Button>
              </div>
            </div>
          </section>

          {/* Inputs */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-green border-b border-lime-green/30 pb-2">
              Inputs
            </h2>

            <div className="space-y-6 max-w-2xl">
              <Input
                label="Name"
                placeholder="Enter your name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="your@email.com"
                helperText="We'll never share your email with anyone else."
              />

              <Input
                label="Error State Example"
                placeholder="This field has an error"
                value={errorInput}
                onChange={(e) => setErrorInput(e.target.value)}
                error={errorInput.length < 3 && errorInput.length > 0 ? "Must be at least 3 characters" : undefined}
              />

              <Input
                label="Disabled Input"
                placeholder="This input is disabled"
                disabled
                value="Cannot edit this"
              />
            </div>
          </section>

          {/* Textareas */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-green border-b border-lime-green/30 pb-2">
              Textareas
            </h2>

            <div className="space-y-6 max-w-2xl">
              <Textarea
                label="Message"
                placeholder="Enter your message here..."
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                helperText={`${textareaValue.length} characters`}
              />

              <Textarea
                label="Bio"
                placeholder="Tell us about yourself"
                rows={6}
              />

              <Textarea
                label="Error Example"
                placeholder="This textarea has an error"
                error="This field is required"
              />

              <Textarea
                label="Disabled Textarea"
                disabled
                value="This textarea is disabled and cannot be edited."
              />
            </div>
          </section>

          {/* Layout Components */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-green border-b border-lime-green/30 pb-2">
              Layout Components
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">Marquee</h3>
                <p className="text-light-text/70 mb-4">Visible at the top of the page with 80s infinite scroll animation.</p>
                <div className="border-2 border-lime-green/30 p-4">
                  <Marquee />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">Header</h3>
                <p className="text-light-text/70 mb-4">3-column grid layout, responsive mobile menu. Check the top of the page.</p>
                <ul className="text-light-text/70 space-y-1 list-disc list-inside">
                  <li>Left: HUMAN. logo</li>
                  <li>Center: Main navigation (MANIFESTO, WORK, ENQUIRE, IMPACT, SHOP)</li>
                  <li>Right: Account link</li>
                  <li>Mobile: Hamburger menu with overlay</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-3 text-light-text">Footer</h3>
                <p className="text-light-text/70 mb-4">Lime green background, 3-column layout. Check the bottom of the page.</p>
                <ul className="text-light-text/70 space-y-1 list-disc list-inside">
                  <li>Left: Info icon (i)</li>
                  <li>Center: Copyright text</li>
                  <li>Right: Social media links</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-green border-b border-lime-green/30 pb-2">
              Typography Examples
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-light-text/70 mb-2">Hero H1 (80px / 900)</p>
                <h1 className="text-hero font-black leading-hero">HUMAN.</h1>
              </div>

              <div>
                <p className="text-sm text-light-text/70 mb-2">Manifesto H1 (113.75px / 900)</p>
                <h1 className="text-manifesto-h1 font-black leading-manifesto-h1">THE HUMANIFESTO</h1>
              </div>

              <div>
                <p className="text-sm text-light-text/70 mb-2">Manifesto H2 (70.7px / 800)</p>
                <h2 className="text-manifesto-h2 font-heavy">SECTION HEADING</h2>
              </div>

              <div>
                <p className="text-sm text-light-text/70 mb-2">Navigation (22px / 400)</p>
                <p className="text-nav font-regular">MANIFESTO | WORK | ENQUIRE</p>
              </div>

              <div>
                <p className="text-sm text-light-text/70 mb-2">Body Text (18px / 400)</p>
                <p className="text-manifesto-body font-regular leading-manifesto-body">
                  This is body text using the Azeret Mono font family. It maintains excellent readability
                  at 18px with a line height of 28.8px, perfect for longer content sections.
                </p>
              </div>
            </div>
          </section>

          {/* Color Palette */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-lime-green border-b border-lime-green/30 pb-2">
              Color Palette
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <div className="w-full h-24 bg-lime-green border-2 border-light-text"></div>
                <p className="text-sm text-light-text">Lime Green</p>
                <p className="text-xs text-light-text/70">#DAFA92</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-dark-grey border-2 border-light-text"></div>
                <p className="text-sm text-light-text">Dark Grey</p>
                <p className="text-xs text-light-text/70">#1a1a1a</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-light-text border-2 border-dark-grey"></div>
                <p className="text-sm text-light-text">Light Text</p>
                <p className="text-xs text-light-text/70">#ffffff</p>
              </div>
              <div className="space-y-2">
                <div className="w-full h-24 bg-dark-text border-2 border-light-text"></div>
                <p className="text-sm text-light-text">Dark Text</p>
                <p className="text-xs text-light-text/70">#000000</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
