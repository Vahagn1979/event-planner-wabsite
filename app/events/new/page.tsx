import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createEventAction } from "@/lib/actions/events";
import Link from "next/link";
 
export default async function NewEventPage() {
    return (
        <div className="mx-auto w-full max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle>Create Event</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action={createEventAction}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="title">Title</Label>
                                    <Input 
                                        id="title" 
                                        name="title" 
                                        required 
                                        placeholder="Team dinner..." 
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea 
                                        id="description" 
                                        name="description" 
                                        placeholder="OPtional dewtails about the event"
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="location">Location</Label>
                                    <Input 
                                        id="location" 
                                        name="location" 
                                        placeholder="Optional location"
                                    />
                                </Field>
                                <Field>
                                    <Label htmlFor="eventDate">Date and time</Label>
                                    <Input 
                                        id="eventDate" 
                                        name="eventDate" 
                                        type="datetime-local"
                                    />
                                    <FieldDescription>
                                        Optional, you can set this later.
                                    </FieldDescription>
                                </Field>

                                <div className="flex items-center gap-3">
                                    <Button type="submit">Create event</Button>
                                    <Button type="button" variant={"outline"} asChild>
                                        <Link href={"/dashboard"}>Cancel</Link>
                                    </Button>
                                </div>
                            </FieldGroup>
                        </FieldSet>
                   </form>
                </CardContent>
            </Card>
        </div>
    )
}