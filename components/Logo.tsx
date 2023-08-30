import React from 'react';
import Head from 'next/head';
import styles from './Logo.module.css'; // Import your CSS module

export default function Logo({ ...rest }) {
  // Define common props for img and svg
  const commonProps = {
    ...rest,
    // Add any common props here
  };

  return (
    <div className={styles.logoContainer}>
      {/* Include the favicon */}
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Use the logo.svg image */}
      <img src="/logo.svg" alt="Logo" {...commonProps} />

      {/* Inline SVG */}
      <svg
        id="logo-34"
        width="155"
        height="40"
        viewBox="0 0 155 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...commonProps}
      >
        {/* Your SVG paths here */}
      </svg>
    </div>
  );
}
