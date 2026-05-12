export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";
import { ZistitViac } from "@/components/shared/ZistitViac";
import { PodporteNasSection } from "@/components/home/PodporteNasSection";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/FadeIn";

export const metadata = {
  title: "Ľudia | Marana Tha",
  description: "Zoznámte sa s líderským tímom spoločenstva Marana Tha.",
};

function getColumns(count: number): number {
  if (count <= 4) return 4;
  if (count <= 8) return 4;
  if (count <= 15) return 5;
  return 6;
}

export default async function LudiaPage() {
  const leaders = await db.person.findMany({
    where: { published: true, ministryId: null, group: null },
    orderBy: [{ order: "asc" }, { createdAt: "asc" }],
  });

  const groupedPeople = await db.person.findMany({
    where: { published: true, group: { not: null } },
    orderBy: [{ group: "asc" }, { order: "asc" }],
  });

  const customGroups: Record<string, typeof groupedPeople> = {};
  for (const p of groupedPeople) {
    const key = p.group!;
    if (!customGroups[key]) customGroups[key] = [];
    customGroups[key].push(p);
  }

  const ministriesPeople = await db.ministry.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
    select: {
      id: true, title: true,
      people: {
        where: { published: true, group: null },
        orderBy: { order: "asc" },
        select: { id: true, name: true, role: true, photo: true },
      },
    },
  });

  const isEmpty = leaders.length === 0 && groupedPeople.length === 0 && ministriesPeople.every(m => m.people.length === 0);

  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Ľudia" description="Poznaj ľudí, ktorí slúžia v spoločenstve Marana Tha." image="/images/ludia-hero.jpg" titleTop={467} />

        {/* Líderský tím */}
        {leaders.length > 0 && (
          <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "60px" }}>
            <div className="px-4 sm:px-8 lg:px-[235px]">
              <FadeIn>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "48px" }}>
                  Líderský tím
                </p>
              </FadeIn>
              <Stagger style={{ display: "grid", gridTemplateColumns: `repeat(${getColumns(leaders.length)}, 174px)`, gap: "43px" }}>
                {leaders.map((person) => (
                  <StaggerItem key={person.id}>
                    <PersonCard person={person} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        )}

        {/* Custom groups */}
        {Object.entries(customGroups).map(([groupName, people]) => (
          <section key={groupName} className="bg-[var(--color-cream)]" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
            <div className="px-4 sm:px-8 lg:px-[235px]">
              <FadeIn>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", marginBottom: "16px" }}>{groupName}</p>
                <div style={{ height: "1px", backgroundColor: "#bea055", marginBottom: "32px" }} />
              </FadeIn>
              <Stagger style={{ display: "grid", gridTemplateColumns: `repeat(${getColumns(people.length)}, 174px)`, gap: "43px" }}>
                {people.map((person) => (
                  <StaggerItem key={person.id}>
                    <PersonCard person={person} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        ))}

        {/* Ministry people */}
        {ministriesPeople.filter(m => m.people.length > 0).map((ministry) => (
          <section key={ministry.id} className="bg-[var(--color-cream)]" style={{ paddingTop: "40px", paddingBottom: "60px" }}>
            <div className="px-4 sm:px-8 lg:px-[235px]">
              <FadeIn>
                <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "30px", fontWeight: 700, lineHeight: "55px", color: "#1c1d1e", marginBottom: "16px" }}>{ministry.title}</p>
                <div style={{ height: "1px", backgroundColor: "#bea055", marginBottom: "32px" }} />
              </FadeIn>
              <Stagger style={{ display: "grid", gridTemplateColumns: `repeat(${getColumns(ministry.people.length)}, 174px)`, gap: "43px" }}>
                {ministry.people.map((person) => (
                  <StaggerItem key={person.id}>
                    <PersonCard person={person} />
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>
        ))}

        {isEmpty && (
          <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", color: "#635f5b" }}>Ľudia budú čoskoro pridaní.</p>
            </div>
          </section>
        )}

        <ZistitViac />
        <PodporteNasSection />
      </main>
      <Footer />
    </>
  );
}

function PersonCard({ person }: { person: { id: string; name: string; role: string; photo: string | null } }) {
  return (
    <div className="bg-white flex flex-col" style={{ width: "174px", minHeight: "310px", borderRadius: "15px", overflow: "hidden" }}>
      <div className="relative overflow-hidden" style={{ margin: "11px auto 0", width: "154px", height: "198px", borderRadius: "15px", backgroundColor: "#e6ded5", flexShrink: 0 }}>
        {person.photo && <Image src={person.photo} alt={person.name} fill className="object-cover object-top" />}
      </div>
      <div style={{ padding: "10px 17px 16px" }}>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: "18px", fontWeight: 400, lineHeight: "1.4", color: "#000000", margin: 0 }}>{person.name}</p>
        {person.role && <p style={{ fontFamily: "var(--font-inter)", fontSize: "13px", color: "#977d3e", marginTop: "3px" }}>{person.role}</p>}
      </div>
    </div>
  );
}
