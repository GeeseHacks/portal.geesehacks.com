import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Button,
  Text,
  Link,
  Img,
} from '@react-email/components';

interface AcceptanceEmailProps {
  name: string;
  email: string;
  qrcode?: string;
}

export default function AcceptanceEmail({
  name,
  email,
  qrcode,
}: AcceptanceEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>[ACTION REQUIRED] You're accepted to GeeseHacks 2025!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          {/* Header Image */}
          <table style={styles.table}>
            <tr>
              <Img
                src="https://portal.geesehacks.com/static/images/email-banner.png"
                alt="GeeseHacks 2025"
                style={{ display: 'block', width: '100%', margin: 0, padding: 0 }}
              />
            </tr>
            {/* Acceptance Section */}
            <tr>
              <td style={styles.centeredTd}>
                <Img
                  src="https://portal.geesehacks.com/static/images/accepted-message.png"
                  alt="You're Accepted"
                  style={{ display: 'block', width: '50%', margin: '15px auto' }}
                />
                <p style={styles.text}>
                  Congratulations! We're excited to invite you to{' '}
                  <strong>GeeseHacks 2025</strong> and see what innovative
                  project you'll bring to the table.
                </p>
                <p style={styles.text}>
                  Please confirm your attendance below. We will follow up with
                  more details once you've accepted your offer.
                </p>
              </td>
            </tr>
            {/* RSVP Button */}
            <tr>
              <td style={styles.centeredTd}>
                <Button
                  style={styles.button}
                  href="https://portal.geesehacks.com"
                >
                  RSVP Now
                </Button>
              </td>
            </tr>
            {/* Event Details */}
            <tr>
              <td style={styles.centeredTd}>
                <p style={styles.text}>
                  <strong>January 25–26, 2025</strong>
                  <br />
                  <strong style={{color: 'white'}}>RCH Building, University of Waterloo</strong>
                  <br />
                  200 University Ave W,
                  <br />
                  Waterloo, ON N2L 3G1
                </p>
                <Img
                  src="https://portal.geesehacks.com/static/images/RCH-Map.png"
                  alt="Event Location Map"
                  style={{ display: 'block', width: '50%', margin: '15px auto' }}
                />
              </td>
            </tr>
            {/* QR Code Section */}
            {qrcode && (
              <tr>
                <td style={styles.centeredTd}>
                  <p style={styles.subtitle}>Your QR Code</p>
                  <p style={styles.text}>
                    Please present this QR code at the event for a smooth
                    check-in experience. If it doesn't load (probably due to mail service incompatability), it's also in <a href='http://localhost:3000/dashboard/qrcode'>your portal</a>
                  </p>
                  <Img
                    src={qrcode}
                    alt="QR Code"
                    style={{
                      display: 'block',
                      width: '150px',
                      height: '150px',
                      margin: '15px auto',
                      border: '2px solid #FFFFFF',
                      borderRadius: '8px',
                    }}
                  />
                </td>
              </tr>
            )}
            {/* Social Media Links */}
            <tr>
              <td style={styles.centeredTd}>
                <p style={styles.subtitle}>Follow us for more updates!</p>
                <p>
                  <Link
                    href="https://www.instagram.com/geesehacks/"
                    style={styles.socialLink}
                  >
                    Instagram
                  </Link>{' '}
                  |{' '}
                  <Link
                    href="https://www.linkedin.com/company/geesehacks/"
                    style={styles.socialLink}
                  >
                    LinkedIn
                  </Link>
                </p>
              </td>
            </tr>
            {/* Footer */}
            <tr>
              <td style={styles.centeredTd}>
                <Img
                  src="https://portal.geesehacks.com/static/icons/geesehacks-colorful.png"
                  alt="GeeseHacks Icon"
                  style={{ width: '50px', margin: '15px auto' }}
                />
                <p style={styles.footerText}>From the GeeseHacks team</p>
              </td>
            </tr>
          </table>
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
    width: '100%',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#162447',
  },
  table: {
    width: '100%',
    maxWidth: '600px',
    borderCollapse: 'collapse' as const,
    margin: '0 auto',
  },
  centeredTd: {
    textAlign: 'center' as const,
    padding: '20px 65px',
    color: '#FFFFFF',
  },
  text: {
    fontSize: '14px',
    lineHeight: '1.5',
    color: '#FFFFFF',
    margin: '0 auto 10px',
  },
  button: {
    display: 'inline-block',
    backgroundColor: '#A082FF',
    color: '#FFFFFF',
    padding: '10px 20px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  subtitle: {
    width: '100%',
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 auto 10px',
  },
  socialLink: {
    color: '#A082FF',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: '12px',
    color: '#FFFFFF',
    marginTop: '10px',
  },
};
