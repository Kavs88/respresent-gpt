import React from "react";
import PlatformContactButtons from "../../components/ui/PlatformContactButtons";

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-24 px-4">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Interested in working with Represent+ or have a question? Reach out to us via your preferred platform below.
      </p>
      <PlatformContactButtons />
    </div>
  );
} 