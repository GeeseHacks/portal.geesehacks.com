"use client";
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import QRCode from 'qrcode';


const QRCodePage: React.FC = () => {

  const { data: session } = useSession();
  const [qrcodeURL, setQrcodeURL] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(session?.user?.email!).then(data => setQrcodeURL(data));
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/users/status');
        const data = await response.json();


        if (data.status === "CONFIRMED") {
          setConfirmed(true);
        }
      } catch (err) {
        console.error("Error loading application status: ", err);
      }
    };
    fetchStatus();
  }, []);

  return (
    <>
      <div>
        <h1 className="text-4xl mt-5 mb-2">QR Code</h1>
        <p className="text-gray-500">Scan to enter the event!</p>
      </div>

      <div className="
          bg-gradient-to-r from-darkpurple to-darkteal 
          p-8 lg:p-12 rounded-xl w-full mx-2 h-5/6 space-y-4
          relative
          flex flex-col justify-center items-center text-center
          overflow-x-scroll
        ">
        <p>You should've also received the QR Code in another email. We recommend taking a screenshot of the QR Code for easier access.</p>
        {!confirmed ? <strong> Warning: Please make sure you have RSVP'd</strong> : qrcodeURL ? (
          <img src={qrcodeURL
          } className="w-full max-w-64" alt="QR Code" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};
export default QRCodePage;
