import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { EventForm } from "@/components/admin/EventForm";
import Link from "next/link";

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await db.event.findUnique({ where: { id } });
  if (!event) notFound();

  // Format dates for datetime-local input (YYYY-MM-DDTHH:mm)
  function toDatetimeLocal(d: Date | null) {
    if (!d) return "";
    return new Date(d).toISOString().slice(0, 16);
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/admin/events" style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b" }}>
          ← Meropriatia
        </Link>
        <span style={{ color: "#9ca3af" }}>/</span>
        <h1 style={{ fontFamily: "var(--font-commissioner)", fontSize: "28px", fontWeight: 700, color: "#1c1d1e" }}>
          {event.title}
        </h1>
      </div>

      <EventForm
        mode="edit"
        eventId={event.id}
        initial={{
          title: event.title,
          slug: event.slug,
          description: event.description,
          content: event.content ?? "",
          coverImage: event.coverImage ?? "",
          startDate: toDatetimeLocal(event.startDate),
          endDate: toDatetimeLocal(event.endDate),
          location: event.location ?? "",
          published: event.published,
          isFeatured: event.isFeatured,
          isEveningOfPraise: event.isEveningOfPraise,
          hasForm: event.hasForm,
        }}
      />
    </div>
  );
}
