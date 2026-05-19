import EventDetailContent from "@/components/event-detail-content";
import { getSession } from "@/lib/auth/server";


export default async function EventsDetailsPage({params} : { params: Promise<{ eventId: string}> }) {

    const  { eventId } = await params;

    const session = await getSession();
    const userId = session.data?.user.id || "";

    return <EventDetailContent userId={userId} eventId={eventId}/>
}