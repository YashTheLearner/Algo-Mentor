import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function RecentInterviews() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Interviews</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="rounded-lg border border-dashed p-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        You haven't completed any interviews yet.
                    </p>
                    <Link href="/interview">
                        <Button className="mt-6">

                            Start Your First Interview

                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}