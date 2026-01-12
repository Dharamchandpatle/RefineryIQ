/**
 * Design System Examples
 * Showcases all button variants and text color combinations
 */

import AnimatedHeading from "@/components/ui/animated-heading";
import { Button } from "@/components/ui/button";

export const DesignSystemExamples = () => {
  return (
    <div className="p-8 space-y-12 max-w-4xl mx-auto">
      {/* Animated Heading Example */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-[#003A8F] mb-4">
          ✨ Animated Header Text Border
        </h3>
        <AnimatedHeading as="h1" className="text-5xl">
          RefineryIQ Platform
        </AnimatedHeading>
        <p className="text-gray-500">
          This heading has an animated gradient border effect that moves from
          orange to blue continuously.
        </p>
      </section>

      {/* Button Examples */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-[#003A8F] mb-4">
          Button Design
        </h3>

        {/* Primary Button */}
        <div className="space-y-2">
          <h4 className="font-medium text-[#003A8F]">Primary Button</h4>
          <p className="text-sm text-gray-500 mb-3">
            Orange background (#F37021) that transitions to Blue (#003A8F) on
            hover, with scale animation
          </p>
          <Button variant="primary">Get Started</Button>
        </div>

        {/* Secondary Button */}
        <div className="space-y-2">
          <h4 className="font-medium text-[#003A8F]">Secondary Button</h4>
          <p className="text-sm text-gray-500 mb-3">
            Blue background (#003A8F) that transitions to darker blue (#002B6B)
            on hover
          </p>
          <Button variant="brandSecondary">Learn More</Button>
        </div>

        {/* Outline Button */}
        <div className="space-y-2">
          <h4 className="font-medium text-[#003A8F]">Outline Button</h4>
          <p className="text-sm text-gray-500 mb-3">
            Blue border and text that fills with blue background on hover
          </p>
          <Button variant="brandOutline">Contact Us</Button>
        </div>

        {/* Multiple Buttons in a Row */}
        <div className="space-y-2">
          <h4 className="font-medium text-[#003A8F]">Button Group Example</h4>
          <div className="flex gap-4">
            <Button variant="primary">Get Started</Button>
            <Button variant="brandSecondary">Learn More</Button>
            <Button variant="brandOutline">Contact Us</Button>
          </div>
        </div>
      </section>

      {/* Text Color Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-[#003A8F] mb-4">
          📝 Text Color Combinations
        </h3>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Main Heading</p>
            <h2 className="text-3xl font-bold text-[#003A8F]">
              Your Main Heading
            </h2>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Highlight Text</p>
            <p className="text-lg text-[#F37021] font-semibold">
              This is highlighted important text
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Body Text</p>
            <p className="text-gray-700 dark:text-gray-300">
              This is regular body text that's readable and comfortable for long
              content. It adapts between light and dark modes.
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Muted Text</p>
            <p className="text-gray-500 dark:text-gray-400">
              This is muted text for less important information like captions or
              secondary details.
            </p>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold text-[#003A8F] mb-4">
          💻 Usage Examples
        </h3>

        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {`<Button variant="primary">Get Started</Button>`}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {`<Button variant="brandSecondary">Learn More</Button>`}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {`<Button variant="brandOutline">Contact Us</Button>`}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {`<h1 className="text-[#003A8F]">Main Heading</h1>`}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {`<p className="text-[#F37021]">Highlight Text</p>`}
            </p>
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
              {`<AnimatedHeading as="h1">Animated Title</AnimatedHeading>`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DesignSystemExamples;
