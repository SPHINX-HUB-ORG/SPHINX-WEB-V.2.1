import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';

export default function ContactPage() {
  return (
    <Page title="Privacy policy">
      <PrivacyPolicyContainer>
        <RichText>
          <p>
            Welcome to the Privacy Policy page of Sphinx, the open-source post-quantum blockchain layer 1. In this policy, we outline
            the types of information we collect, how we use and protect it, and your choices regarding your personal data.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We may collect various types of information from you when you use our website or services. This information may include your
            name, email address, and other contact details you provide to us.
          </p>

          <h2>How We Use Your Information</h2>
          <p>
            The information we collect may be used to improve our services, communicate with you, and provide relevant updates and
            information. We may also use the information for research and analysis purposes.
          </p>

          <h2>Sharing Your Information</h2>
          <p>
            We do not share your personal information with third parties for marketing purposes. However, we may share your information
            with our trusted partners who assist us in providing our services and improving our website.
          </p>

          <h2>Security of Your Information</h2>
          <p>
            We take reasonable measures to protect your information from unauthorized access, disclosure, or destruction. However, no
            data transmission over the internet is entirely secure, and we cannot guarantee the security of your information.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            This Privacy Policy may be updated from time to time. We will notify you of any significant changes by posting the updated
            policy on our website.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, please contact us at privacy@sphinx.org.
          </p>
        </RichText>
      </PrivacyPolicyContainer>
    </Page>
  );
}

const PrivacyPolicyContainer = styled.div`
  max-width: 90rem;
  margin: auto;
  overflow-x: auto;
`;
