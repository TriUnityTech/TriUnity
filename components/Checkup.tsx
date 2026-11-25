"use client";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FaNetworkWired, FaDatabase, FaLaptop, FaShieldHalved } from "react-icons/fa6";

import { CHECKUP_LINK } from "@/data";
import MagicButton from "./MagicButton";
import { ScrollReveal } from "./ui/ScrollReveal";
import { Magnetic } from "./ui/Magnetic";

const items = [
  { icon: FaNetworkWired, title: "Rede e internet", desc: "Descobrimos se a lentidão é da operadora ou de dentro da empresa." },
  { icon: FaDatabase, title: "Backup", desc: "Onde estão seus dados, com que frequência são copiados e se dá pra recuperar." },
  { icon: FaLaptop, title: "Computadores", desc: "Idade, desempenho, antivírus e o que está perto de dar problema." },
  { icon: FaShieldHalved, title: "Segurança e LGPD", desc: "Senhas, acessos e dados de clientes ou pacientes protegidos." },
];

const steps = [
  "Você agenda pelo WhatsApp",
  "Visitamos sua empresa por 1 hora",
  "Você recebe um relatório de 1 página",
];

const Checkup = () => (
  <section id="checkup" className="py-20" aria-label="Checkup gratuito">
    <ScrollReveal y={40}>
      <h2 className="heading">
        Checkup de TI <span className="text-purple">gratuito</span>
      </h2>
      <p className="text-zinc-400 text-center max-w-2xl mx-auto mt-4">
        Sem compromisso: se não fechar com a gente, o relatório é seu e pode
        ser usado por quem já cuida da sua TI.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-3xl border border-white/10 p-6 bg-[rgb(4,7,29)]">
            <Icon className="w-6 h-6 text-purple" />
            <h3 className="text-lg font-semibold mt-4">{title}</h3>
            <p className="text-zinc-400 text-sm mt-2">{desc}</p>
          </div>
        ))}
      </div>

      <ol className="flex flex-col md:flex-row justify-center gap-6 mt-12 text-center">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-3 justify-center">
            <span className="w-8 h-8 rounded-full bg-purple text-zinc-950 font-bold flex items-center justify-center">
              {i + 1}
            </span>
            <span className="text-zinc-200">{s}</span>
          </li>
        ))}
      </ol>

      <div className="flex justify-center mt-10">
        <Magnetic>
          <a href={CHECKUP_LINK} target="_blank" rel="noopener noreferrer">
            <MagicButton title="Quero meu checkup" icon={<WhatsAppIcon />} position="right" />
          </a>
        </Magnetic>
      </div>
    </ScrollReveal>
  </section>
);

export default Checkup;
