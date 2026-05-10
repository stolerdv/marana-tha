import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/shared/PageHero";

export const metadata = {
  title: "GDPR | Marana Tha",
  description: "Ochrana osobných údajov — zásady spracovania osobných údajov spoločenstva Marana Tha.",
};

const sections = [
  {
    title: "1. Správca osobných údajov",
    content: `Správcom osobných údajov je Spoločenstvo Marana Tha, so sídlom na Švábska 22, 080 05 Prešov. Kontaktná e-mailová adresa: info@maranathapo.sk.`,
  },
  {
    title: "2. Aké údaje zbierame",
    content: `Zbierame iba osobné údaje, ktoré nám dobrovoľne poskytnete pri registrácii na podujatia, pri prihlásení sa na odber noviniek alebo pri kontaktovaní nás prostredníctvom formulárov na tejto webovej stránke. Ide predovšetkým o:\n\n• Meno a priezvisko\n• E-mailová adresa\n• Telefónne číslo (ak je poskytnuté)\n• Mesto (ak je poskytnuté)`,
  },
  {
    title: "3. Účel spracovania",
    content: `Vaše osobné údaje spracúvame na nasledovné účely:\n\n• Zaslanie potvrdenia registrácie na podujatie\n• Zasielanie informácií o aktivitách spoločenstva (newsletter)\n• Odpoveď na vaše otázky a správy\n• Organizácia podujatí a stretnutí`,
  },
  {
    title: "4. Právny základ spracovania",
    content: `Spracúvanie Vašich osobných údajov je založené na Vašom súhlase (čl. 6 ods. 1 písm. a) GDPR), ktorý vyjadrujete vyplnením príslušného formulára. Súhlas môžete kedykoľvek odvolať.`,
  },
  {
    title: "5. Doba uchovávania",
    content: `Vaše osobné údaje uchovávame po dobu nevyhnutnú na splnenie účelu, na ktorý boli zhromaždené, alebo po dobu, na ktorú ste súhlasili. V prípade newslettera uchovávame Vašu e-mailovú adresu do doby, kým sa z odberu neodhlásite.`,
  },
  {
    title: "6. Vaše práva",
    content: `V súlade s GDPR máte nasledovné práva:\n\n• Právo na prístup k Vašim osobným údajom\n• Právo na opravu nesprávnych údajov\n• Právo na vymazanie (právo byť zabudnutý)\n• Právo na obmedzenie spracovania\n• Právo na prenosnosť údajov\n• Právo namietať spracovanie\n• Právo odvolať súhlas kedykoľvek\n\nPre uplatnenie svojich práv nás kontaktujte na info@maranathapo.sk.`,
  },
  {
    title: "7. Súbory cookie",
    content: `Táto webová stránka používa iba nevyhnutné technické súbory cookie potrebné na základné fungovanie stránky. Nepoužívame analytické ani marketingové cookies.`,
  },
  {
    title: "8. Bezpečnosť",
    content: `Prijaté primerané technické a organizačné opatrenia na ochranu Vašich osobných údajov pred neoprávneným prístupom, zmenou, zverejnením alebo zničením.`,
  },
  {
    title: "9. Kontakt",
    content: `V prípade akýchkoľvek otázok týkajúcich sa ochrany Vašich osobných údajov nás kontaktujte:\n\nE-mail: info@maranathapo.sk\nAdresa: Švábska 22, 080 05 Prešov`,
  },
];

export default function GdprPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="GDPR"
          description="Ochrana osobných údajov — zásady spracovania."
          image="/images/hero-bg.jpg"
          titleTop={467}
        />

        <section className="bg-[var(--color-cream)]" style={{ paddingTop: "80px", paddingBottom: "80px" }}>
          <div style={{ paddingLeft: "235px", paddingRight: "235px" }}>
            <div style={{ maxWidth: "800px" }}>
              <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "50px", fontWeight: 400, lineHeight: "55px", color: "#977d3e", marginBottom: "16px" }}>
                Ochrana osobných údajov
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "#635f5b", marginBottom: "56px" }}>
                Platné od 1. januára 2026
              </p>

              <div className="flex flex-col gap-0">
                {sections.map((section, i) => (
                  <div key={i}>
                    <div style={{ height: "1px", backgroundColor: "#e4d5b2" }} />
                    <div style={{ padding: "32px 0" }}>
                      <p style={{ fontFamily: "var(--font-commissioner)", fontSize: "20px", fontWeight: 700, color: "#1c1d1e", marginBottom: "12px" }}>
                        {section.title}
                      </p>
                      <p style={{ fontFamily: "var(--font-inter)", fontSize: "16px", color: "#635f5b", lineHeight: "1.75", whiteSpace: "pre-line" }}>
                        {section.content}
                      </p>
                    </div>
                  </div>
                ))}
                <div style={{ height: "1px", backgroundColor: "#e4d5b2" }} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
