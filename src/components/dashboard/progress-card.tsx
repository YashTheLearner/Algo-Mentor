import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProgressCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h3 className="font-medium">No interview data yet</h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Complete your first interview to start tracking your progress.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}