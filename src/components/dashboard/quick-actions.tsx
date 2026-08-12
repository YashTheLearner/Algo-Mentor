import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function QuickActions() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-4">
                <Link
                    href="/interview">
                    <Button >
                        Start Interview
                    </Button>
                </Link>
                <Link
                    href="/interview">
                    <Button variant="outline">
                        View Reports
                    </Button>
                </Link>

                <Link
                    href="/interview">
                    <Button variant="outline">
                        Settings
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}