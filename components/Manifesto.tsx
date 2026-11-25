import { ScrollReveal } from "./ui/ScrollReveal";

// ponytail: frase estática; a versão pinada travava a rolagem no celular
const Manifesto = () => (
  <section aria-label="Manifesto" className="py-20">
    <ScrollReveal y={30}>
      <p className="max-w-4xl mx-auto text-center font-semibold tracking-tight leading-snug text-2xl md:text-4xl text-white">
        Quando o sistema trava, sua empresa para. Por isso a TriUnity atende
        daqui de <span className="text-purple">Pitangui</span>:{" "}
        <span className="text-purple">rápido, seguro</span> e sem enrolação.
      </p>
    </ScrollReveal>
  </section>
);

export default Manifesto;
