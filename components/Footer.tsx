import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { socialMedia, CHECKUP_LINK } from "@/data";
import MagicButton from "./MagicButton";
import { ScrollReveal } from "./ui/ScrollReveal";
import { WordReveal } from "./ui/WordReveal";
import { Magnetic } from "./ui/Magnetic";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      {/* background grid */}
      <div className="w-full absolute left-0 -bottom-72 min-h-96">
        <img
          src="/footer-grid.svg"
          alt="grid"
          className="w-full h-full opacity-50 "
        />
      </div>

      {/* Glow roxo suave iluminando o encerramento da página */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[48rem] h-[48rem] max-w-[100vw]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(203,172,249,0.16), transparent 70%)",
        }}
      />

      <div className="flex flex-col items-center relative">
        <WordReveal
          as="h1"
          className="heading lg:max-w-[45vw]"
          segments={[
            { text: "Comece pelo ", className: "text-purple" },
            { text: "checkup gratuito." },
          ]}
        />
        <ScrollReveal y={40} className="flex flex-col items-center">
          <p className="text-white-200 md:mt-10 my-5 text-center">
            Em uma hora a gente olha rede, backup e computadores e te entrega um
            relatório com o que precisa de atenção. Sem compromisso.
          </p>
          <Magnetic>
            <a href={CHECKUP_LINK} target="_blank" rel="noopener noreferrer">
              <MagicButton
                title="Agendar pelo WhatsApp"
                icon={<WhatsAppIcon />}
                position="right"
              />
            </a>
          </Magnetic>
        </ScrollReveal>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base pb-8 md:pb-0 text-sm md:font-normal font-light">
          © 2026 TriUnity Tech · Pitangui-MG
        </p>

        <div className="flex items-center md:gap-3 gap-6">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
            >
              <img src={info.img} alt="icons" width={20} height={20} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
