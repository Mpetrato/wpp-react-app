import "./ChatIntro.css";
import wppBackground from "../../assets/images/wpp-background.jpg";

export const ChatIntro = () => {
  return (
    <div className="chatIntro">
      <img src={wppBackground} alt="Mantenha seu celular conectado" />
      <h1>Mantenha seu celular conectado</h1>
      <h2>
        O Whatsapp conecta ao seu telefone para sincronizar suas mensagens.{" "}
        <br /> Para reduzir o uso de dados, conecte seu telefone a uma rede
        Wi-Fi.
      </h2>
    </div>
  );
};
