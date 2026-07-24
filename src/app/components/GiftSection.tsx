import { colors } from "../../styles/theme";

export function GiftSection() {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "0 auto",
        padding: "90px 24px 130px",
        textAlign: "center",
        color: colors.textLight || "#FFFFFF",
      }}
    >
      <h2
        style={{
          fontSize: "2.2rem",
          marginBottom: 20,
          fontFamily: "'Playfair Display', serif",
        }}
      >
        Regalos
      </h2>

      <p
        style={{
          maxWidth: 620,
          margin: "0 auto 18px",
          lineHeight: 1.8,
          fontSize: "1.05rem",
        }}
      >
        El mejor regalo es su presencia en nuestro gran día.
      </p>

      <p
        style={{
          maxWidth: 620,
          margin: "0 auto 28px",
          lineHeight: 1.8,
          fontSize: "1.05rem",
        }}
      >
        Pero si desean hacernos un obsequio, pueden hacerlo mediante este código QR.
      </p>

      <div
        style={{
          background: "#FFFFFF",
          padding: 16,
          borderRadius: 20,
          width: "fit-content",
          margin: "0 auto 20px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src="assets/qr-regalo.jpeg"
          alt="Código QR para regalo"
          style={{
            width: 190,
            height: 190,
            display: "block",
          }}
        />
      </div>

   
    </div>
  );
}