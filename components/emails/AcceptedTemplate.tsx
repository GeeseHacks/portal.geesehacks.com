// components/AcceptanceEmail.tsx
import { Html, Head, Preview, Body, Container, Section, Button, Text, Link, Img } from '@react-email/components';


interface AcceptanceEmailProps {
  name: string;
  email: string;
  qrcode?: string
}

export default function AcceptanceEmail({ name, email, qrcode }: AcceptanceEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>[ACTION REQUIRED] You're accepted to GeeseHacks 2025!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header Image */}
          <Img
            src="/static/images/email-banner.png"
            alt="GeeseHacks 2025"
            style={styles.headerImage}
          />

          {/* Acceptance Section */}
          <Section style={styles.section}>
            <Img
              src="/static/images/accepted-message.png"
              alt="GeeseHacks 2025"
              style={styles.acceptedImage}
            />
            <Text style={styles.text}>
              Congratulations! We're excited to invite you to <strong>GeeseHacks 2025</strong> and see what innovative project you'll bring to the table.
            </Text>
            <Text style={styles.text}>
              Please confirm your attendance below. We will follow up with more details once you've accepted your offer.
            </Text>

          </Section>

          <Section style={styles.centeredSection}>
            <Button
              style={styles.button}
              href={"https://portal.geesehacks.com"}
            >
              RSVP Now
            </Button>
          </Section>
          {/* Event Details */}
          <Section style={styles.centeredSection}>
            <Section>
              <Img
                src="/static/images/event-message.png"
                alt="GeeseHacks 2025"
                style={styles.headingImage}
              />
              <Text style={styles.text}>
                <strong>January 25–26, 2025</strong><br />
                <strong>RCH Building, University of Waterloo</strong><br />
                200 University Ave W,<br />
                Waterloo, ON N2L 3G1
              </Text>
              <Img
                src="/static/images/RCH-Map.png"
                alt="Event Location Map"
                style={styles.mapImage}
              />
            </Section>



          </Section>

          {/* QR Code Section */}

          {qrcode && (
            <Section style={styles.centeredSection}>
              <Text style={styles.subtitle}>Your QR Code</Text>
              <Text style={styles.text}>
                Please present this QR code at the event for a smooth check-in experience.
              </Text>
              <Img
                src={qrcode}
                alt="QR Code"
                style={styles.qrcode}
              />
            </Section>
          )}


          {/* Social Media Links */}
          <Section style={styles.centeredSection}>
            <Text style={styles.subtitle}>Follow us for more updates!</Text>
            <Link href="https://www.instagram.com/geesehacks/" style={styles.socialLink}>Instagram</Link>
            <Link href="https://www.linkedin.com/company/geesehacks/" style={styles.socialLink}>LinkedIn</Link>
          </Section>

          {/* Footer */}
          <Section style={styles.footer}>
            <Img
              src="/static/icons/geesehacks-colorful.png"
              alt="GeeseHacks Icon"
              style={styles.footerIcon}
            />
            <Text style={styles.footerText}>From the GeeseHacks team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const styles = {
  body: {
    backgroundColor: '#0D0E1E',
    fontFamily: 'Arial, sans-serif',
    color: '#FFFFFF',
  },
  container: {
    margin: '0 auto',
    maxWidth: '600px',
    backgroundColor: '#0D0E1E',
  },
  headerImage: {
    width: '100%',
  },
  acceptedImage: {
    width: '50%',
    margin: '15px auto',
  },
  headingImage: {
    width: '40%',
    margin: '15px auto',
  },
  section: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#162447',
    padding: '20px',
  },
  centeredSection: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#162447',
    padding: '10px',
    justifyContent: 'center',
    textAlign: 'center' as const,
  },
  horizontalSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#162447',
    // padding: '20px',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    width: '80%',
    margin: '0px auto 10px',
  },
  button: {
    backgroundColor: '#A082FF',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    // textAlign: 'center' as const,
    margin: '10px auto',
  },
  mapImage: {
    width: '50%',
    marginTop: '15px',
    borderRadius: '1px',
    margin: '10px auto',
  },
  qrcode: {
    width: '150px',
    height: '150px',
    margin: '10px auto',
    border: '2px solid #FFFFFF',
    borderRadius: '8px',
  },
  socialLink: {
    color: '#A082FF',
    margin: '0 10px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center' as const,
    paddingTop: '20px',
    backgroundColor: '#162447',
  },
  footerIcon: {
    width: '50px',
    margin: '10px auto',
  },
  footerText: {
    fontSize: '14px',
    marginTop: '10px',
  },
};
