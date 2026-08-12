import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <h1 className="text-4xl font-bold">
            AlgoMentor Design System
          </h1>
          <p className="mt-2 text-muted">
            Preview of reusable UI components.
          </p>
        </div>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">
            Buttons
          </h2>

          <div className="flex flex-wrap gap-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button >Loading</Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">
            Inputs
          </h2>

          <div className="space-y-4">
            <Input placeholder="Enter email" />
            <Textarea placeholder="Write feedback..." />
          </div>
        </Card>

        <Card>
          <h2 className="mb-4 text-xl font-semibold">
            Badges
          </h2>

          <div className="flex flex-wrap gap-4">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </div>
        </Card>
      </div>
    </main>
  );
}