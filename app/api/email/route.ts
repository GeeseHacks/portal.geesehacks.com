import QRCode from 'qrcode';
import AcceptanceEmail from "@/components/emails/AcceptedTemplate";
import { Resend } from "resend";
import { render } from "@react-email/render";
import HackerEmail from '@/components/emails/HackerPackageTemplate';

const ADMIN_EMAILS = ['benny.wu.new@gmail.com', 'chd-james@skillinsight.ca', 'riri.hong@gmail.com', 'a.zhong3528@gmail.com'];

export async function POST(req: Request) {

  const { to, sender } = await req.json();

  if (!ADMIN_EMAILS.includes(sender)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const emailList = await Promise.all(
    to.map(async (email: string) => {
      const qrCodeDataURL = await QRCode.toDataURL(email);
      return {
        from: "no-reply@geesehacks.com",
        to: email, // Send to individual email
        subject: "Thank you for applying to GeeseHacks 2025!",
        react: HackerEmail({ name: "", email: email, qrcode: qrCodeDataURL }), // Render as JSX
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
