import styled from "styled-components";

const About = () => {
  return (
    <Container>
      <Title>Who We Are</Title>
      <P>
        Hey there! We're five buddies who love watches and decided to create a
        website to share our passion with others. We spent countless hours
        geeking out over different brands, styles, and movements, and realized
        we wanted to turn our obsession into a business.
      </P>
      <P>
        Our selection is curated with love and care to offer the latest trends
        in the industry, all at affordable prices. We believe that buying a
        watch should be fun and stress-free, so we've made it our mission to
        provide exceptional customer service.
      </P>
      <P>
        We're excited to have you join us on this journey, and we can't wait to
        help you find the perfect timepiece to match your style and personality.
        So let's get started and find you the watch of your dreams!
      </P>
    </Container>
  );
};

export default About;

const Container = styled.div`
  background-color: #1f1f1f;
  border: 1px solid #b59575;
  border-radius: 2px;
  margin-top: 40px;
  padding: 50px;
  text-align: center;
`;

const P = styled.p`
  color: white;
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  // color: #333;
  color: #b59575;
`;
