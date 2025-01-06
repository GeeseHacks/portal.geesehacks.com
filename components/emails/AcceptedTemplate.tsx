import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Preview,
  Button,
  Link,
  Tailwind,
} from '@react-email/components';
import * as React from 'react';

interface AcceptanceEmailProps {
  name: string;
  email: string;
  instagramLink?: string;
  linkedinLink?: string;
}

export const AcceptanceEmail = ({
  name = 'John Doe',
  email = 'test@example.com',
  instagramLink = 'https://instagram.com/example',
  linkedinLink = 'https://linkedin.com/example',
}: AcceptanceEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>You’re Accepted to GeeseHacks 2025!</Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                background: '#0D0D1F',
                card: '#1E1E2E',
                gradientStart: '#A78BFA',
                gradientEnd: '#8B5CF6',
                buttonBg: '#A78BFA',
              },
            },
          },
        }}
      >
        <Body className="bg-background text-white font-sans">
          {/* Header Section */}
          <Section className="bg-gradient-to-r from-gradientStart to-gradientEnd text-center py-8">
            <Text className="text-5xl font-bold mb-2">GeeseHacks 2025</Text>
            <Text className="text-md">January 25-26, 2025 • Waterloo, Ontario</Text>
          </Section>

          {/* Main Acceptance Card */}
          <Container className="bg-card mx-auto rounded-lg p-8 my-10 w-[90%] max-w-lg shadow-md">
            <Text className="text-3xl font-bold text-center mb-4">You’re accepted!</Text>
            <Text className="text-md text-center mb-6">
              Congratulations, {name}! We're excited to invite you to <strong>GeeseHacks 2025</strong> and see what innovative project you'll bring to the table.
            </Text>

            <Section className="text-center">
              <Button
                href="https://portal.geesehacks.com/dashboard"
                className="bg-buttonBg text-white font-semibold py-2 px-6 rounded-md shadow-md hover:opacity-90"
              >
                Accept your offer
              </Button>
            </Section>
          </Container>

          {/* Event Details */}
          <Container className="mx-auto text-center w-[90%] max-w-lg">
            <Section className="bg-card rounded-lg p-4 shadow-md mb-4">
              <Text className="text-lg font-bold">Event details</Text>
              <Text className="text-md">
                January 25-26, 2025<br />
                <strong>RCH Building, University of Waterloo</strong><br />
                200 University Ave W,<br />
                Waterloo, ON N2L 3G1
              </Text>
            </Section>
          </Container>

          {/* Social Media Links */}
          <Container className="mx-auto text-center w-[90%] max-w-lg">
            <Text className="text-lg font-bold mb-2">Follow us for more updates!</Text>
            <Section className="flex justify-center gap-4 mb-8">
              <Link href={instagramLink} className="text-sm text-gradientStart underline">Instagram</Link>
              <Link href={linkedinLink} className="text-sm text-gradientStart underline">LinkedIn</Link>
            </Section>
          </Container>

          {/* Footer */}
          <Section className="text-center mt-8">
            <Text className="text-lg font-bold">Mark the date!</Text>
            <Text className="text-md mb-4">We can’t wait to see you in January</Text>
            <Img
              src="https://via.placeholder.com/50"
              alt="GeeseHacks Logo"
              className="mx-auto mb-2"
            />
            <Text className="text-sm opacity-50">From the GeeseHacks team</Text>
          </Section>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default AcceptanceEmail;
