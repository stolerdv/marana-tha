import { TestimonialsCarousel } from "@/components/shared/TestimonialsCarousel";

const testimonials = [
  {
    quote: "Keď som prvýkrát prišiel na večer chvál, ani som netušil, že sa tu stanem súčasťou rodiny. Ľudia ma prijali takého, aký som bol.",
    name: "Martin K.",
    role: "Člen spoločenstva 3 roky",
    photo: "/images/o-nas-testimonial-person.jpg",
  },
  {
    quote: "Hľadala som miesto kde môžem rásť vo viere aj v živote. Marana Tha mi dala komunitu, priateľov a zmysel. Nikdy som nič také nezažila.",
    name: "Lucia M.",
    role: "Sympatizantka",
    photo: "/images/o-nas-testimonial-2.jpg",
  },
  {
    quote: "Prvý krok bol najťažší — ale len zdanlivo. Hneď pri vstupe som bol privítaný ako starý priateľ. Dnes tu slúžim v hudobnej službe.",
    name: "Peter S.",
    role: "Člen spoločenstva 5 rokov",
    photo: "/images/o-nas-testimonial-person.jpg",
  },
];

export function PridajSaTestimonials() {
  return <TestimonialsCarousel testimonials={testimonials} title="Čo hovoria ostatní" />;
}
