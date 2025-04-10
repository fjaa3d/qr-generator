import { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';

export default function Home() {
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');
  const canvasRef = useRef(null);

  const generateQRCode = async () => {
    try {
      const url = await QRCode.toDataURL(text);
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (qrUrl && canvasRef.current) {
      const img = new Image();
      img.src = qrUrl;
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
      };
    }
  }, [qrUrl]);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <h1 className="text-3xl font-bold mb-4">Generador de Códigos QR Gratis</h1>
      <p className="mb-6 text-gray-600 max-w-xl">
        Introduce un enlace, texto o número y genera tu código QR al instante.
      </p>
      <input
        type="text"
        placeholder="Escribe aquí..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 border rounded w-full max-w-md mb-4"
      />
      <button
        onClick={generateQRCode}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Generar QR
      </button>

      {qrUrl && (
        <div className="mt-6">
          <canvas ref={canvasRef} className="mx-auto border rounded" />
          <a
            href={qrUrl}
            download="qrcode.png"
            className="block mt-4 text-blue-600 hover:underline"
          >
            Descargar QR
          </a>
        </div>
      )}
    </main>
  );
}
