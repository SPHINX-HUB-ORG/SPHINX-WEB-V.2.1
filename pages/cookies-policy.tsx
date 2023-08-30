import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';

export default function ContactPage() {
  return (
    <Page title="Cookies policy">
      <CookiesPolicyContainer>
        <RichText>
          <p>
            This is the Cookies Policy of SPHINX, an open-source post-quantum blockchain layer 1. In this policy, "we," "our," and "us" refer to
            SPHINX. This policy outlines how we use cookies on our website and your options regarding their use. By using our website, you
            consent to the use of cookies as described in this policy.
          </p>
          <strong>
            What Are Cookies?
          </strong>
          <p>
            Cookies are small text files that are stored on your device when you visit a website. They are widely used to make websites work
            or work more efficiently, as well as to provide reporting information and personalized content. Cookies do not damage your device
            and are not harmful to your files.
          </p>
          <ul>
            <li>
              <strong>Session Cookies:</strong> These cookies are temporary and are deleted from your device once you close your browser. They
              help us remember your actions during a single browsing session.
            </li>
            <li>
              <strong>Persistent Cookies:</strong> These cookies remain on your device even after you close your browser or complete your
              browsing session. They are used to remember your preferences and actions across multiple sessions.
            </li>
            <li>
              <strong>Third-Party Cookies:</strong> These cookies are placed by third-party services that we use, such as analytics or
              advertising services. We have no control over these cookies and their use is governed by the third party's own privacy policy.
            </li>
          </ul>

          <table>
            <tr>
              <th>Cookie Name</th>
              <th>Purpose</th>
              <th>Expiration</th>
            </tr>
            <tr>
              <td>cookie_name_1</td>
              <td>Description of how this cookie is used.</td>
              <td>Expiry date of the cookie.</td>
            </tr>
            <tr>
              <td>cookie_name_2</td>
              <td>Explanation of the purpose of this cookie.</td>
              <td>Expiration date for this cookie.</td>
            </tr>
            <tr>
              <td>cookie_name_3</td>
              <td>Detail the use of this cookie.</td>
              <td>Expiry information for this cookie.</td>
            </tr>
            <tr>
              <td>cookie_name_4</td>
              <td>How this cookie contributes to user experience.</td>
              <td>When this cookie will expire.</td>
            </tr>
          </table>
        </RichText>
      </CookiesPolicyContainer>
    </Page>
  );
}

const CookiesPolicyContainer = styled.div`
  max-width: 90rem;
  margin: auto;
  overflow-x: auto;
`;
