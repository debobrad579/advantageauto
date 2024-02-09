import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
} from "@react-email/components"

type EmailProps = {
  name: string
  phone: string
  email: string
  year: string
  make: string
  model: string
  services: string
  date: string
  time: string
  additional?: string
}

export default function Email({
  name = "test",
  phone = "(519) 732-TEST",
  email = "test@example.com",
  year = "2000",
  make = "Hyundai",
  model = "Accent",
  services = "Service 1, Service 2, Service 3",
  date = "July 8th, 2024",
  time = "9:00 AM",
  additional = "",
}: EmailProps) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>
        {name} ({email})
      </Preview>
      <Body style={main}>
        <Container>
          <Heading style={heading}>Client Information</Heading>
          <Section>
            <Row>
              <Column style={label}>Name:</Column>
              <Column>{name}</Column>
            </Row>
            <Row>
              <Column style={label}>Phone:</Column>
              <Column>{phone}</Column>
            </Row>
            <Row>
              <Column style={label}>Email:</Column>
              <Column>{email}</Column>
            </Row>
          </Section>
          <Hr style={hr} />
          <Heading style={heading}>Vehicle Information</Heading>
          <Section>
            <Row>
              <Column style={label}>Year:</Column>
              <Column>{year}</Column>
            </Row>
            <Row>
              <Column style={label}>Make:</Column>
              <Column>{make}</Column>
            </Row>
            <Row>
              <Column style={label}>Model:</Column>
              <Column>{model}</Column>
            </Row>
          </Section>
          <Hr style={hr} />
          <Heading style={heading}>Requested Service Information</Heading>
          <Section>
            <Row>
              <Column style={label}>Requested Service(s):</Column>
              <Column>{services}</Column>
            </Row>
            <Row>
              <Column style={label}>Requested Date:</Column>
              <Column>{date}</Column>
            </Row>
            <Row>
              <Column style={label}>Requested Time:</Column>
              <Column>{time}</Column>
            </Row>
          </Section>
          {additional !== "" && (
            <>
              <Hr style={hr} />
              <Heading style={heading}>Additional Information</Heading>
              <Section>{additional}</Section>
            </>
          )}
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: "white",
  padding: "30px 5px",
}

const heading = {
  margin: "0 0 20px 0",
}

const hr = {
  margin: "20px 0",
}

const label = {
  width: "170px",
}
