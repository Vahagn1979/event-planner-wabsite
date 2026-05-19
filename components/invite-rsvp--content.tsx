import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { secureHeapUsed } from "crypto";
import { Field, FieldGroup, FieldSet } from "./ui/field";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { submitOrUpdateRsvpAction } from "@/lib/actions/events";


export default async function InviteRsvpContent({token, submitted}: {token: string  | undefined; submitted: boolean}) {
   
    const row = await prisma.eventInvite.findFirst({
        where: { token },
       include: {
        event: {
            select: {
                id: true,
                title: true,
                description: true,
                location: true,
                eventDate: true
            },
        },
       },
    });

    if (!row) {
        notFound();
    }

    const e = row.event;
    const event = {
        title: e.title,
        description: e.description,
        location: e.location,
        eventDate: e.eventDate ? e.eventDate.toISOString() : null,
    }

    const submitRsvpForToken = submitOrUpdateRsvpAction.bind(null, token);

    return (
        <div className="flex flex-1 flex-col gap-6">
            <Card>
                <CardHeader className="space-y-3">
                    <Badge variant="secondary" className="w-fit">
                        RSVP
                    </Badge>
                    <CardTitle>{event.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                        {event.eventDate
                            ? new Date(event.eventDate).toLocaleString()
                            : "No date selected"
                        }
                        {event.location ? ` - ${event.location}` : ""}
                    </p>
                    {event.description ? (
                        <p className="text-sm text-muted-foreground">
                            {event.description}
                        </p>
                    ) : null}
                </CardHeader>
                <CardContent>
                    {submitted ? (
                        <p className="p-4 mb-4 rounded-md border border-accent/50 bg-accent/15">
                            Thanks. Your RSVP has been recorded (or updated).
                        </p>
                    ) : null}
                    <form action={submitRsvpForToken}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" name="name" required placeholder="Your name"/>
                                </Field>
                                 <Field>
                                    <Label htmlFor="email">Email</Label>
                                    <Input 
                                        type="email" 
                                        id="email"
                                        name="email" 
                                        required 
                                        placeholder="you@example.com"
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="status">Attendance</Label>
                                    <select 
                                        id="status"
                                        name="status" 
                                        required
                                        defaultValue="going"
                                        className="flex h-10 w-full rounded-md border border-border bg-accent px-3"
                                    >
                                        <option value="going">Going</option>
                                        <option value="maybe">Maybe</option>
                                        <option value="not_going">Not going</option>
                                    </select>
                                </Field>
                                <Button type="submit">Submit RSVP</Button>
                            </FieldGroup>
                        </FieldSet>
                       
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}