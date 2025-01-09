import QRCode from 'qrcode';
import AcceptanceEmail from "@/components/emails/AcceptedTemplate";
import { Resend } from "resend";
import { render } from "@react-email/render";





export async function POST(req: Request) {
  const { to } = await req.json();

  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailList = await Promise.all(
    to.map(async (email: string) => {
      const qrCodeDataURL = await QRCode.toDataURL(email);
      return {
        from: "no-reply@geesehacks.com",
        to: email, // Send to individual email
        subject: "[ACTION REQUIRED] Congratulations on your acceptance to GeeseHacks 2025! 🎉",
        react: AcceptanceEmail({ name: "", email: email, qrcode: qrCodeDataURL }), // Render as JSX
      };
    })
  );


  try {
   
    const { data, error } = await resend.batch.send(emailList);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
