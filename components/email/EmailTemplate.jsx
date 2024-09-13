import { Html, Body, Head, Heading, Hr, Container, Preview, Section, Text } from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const EmailTemplate = ({ contactMessage, senderEmail, senderName }) => {
  return (
    <Html>
      <Head />
      <Preview>New message from your website</Preview>
      <Tailwind>
        <Body className="bg-gray-100 text-black">
          <Container>
            <Section className="bg-white borderBlack my-10 px-10 py-4 rounded-md">
              <Heading className="leading-tight">Mr.Patrick a new message from SpacePlan Contact Form</Heading>
              <Text>
                <p className="font-bold">Sender&apos;s Name:</p> {senderName}
              </Text>
              <Text>
                <p className="font-bold">Sender&apos;s email:</p> {senderEmail}
              </Text>
              <Hr />
              <Text className="bg-black text-white rounded-md p-4">{contactMessage}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
