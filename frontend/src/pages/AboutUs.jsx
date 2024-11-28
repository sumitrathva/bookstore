import React from 'react';

const BookHeaven = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.headerTitle}>Welcome to Book Heaven</h1>
                <p style={styles.headerSubtitle}>Your ultimate destination for books</p>
            </header>
            <main style={styles.main}>
                <section style={styles.about}>
                    <h2 style={styles.sectionTitle}>About Us</h2>
                    <p style={styles.paragraph}>Welcome to Book Heaven!</p>
                    <p style={styles.paragraph}>At Book Heaven, we are dedicated to providing you with a curated selection of books that cater to every taste and interest. Our bookstore is built on the belief that books have the power to enrich our lives and transform our perspectives.</p>
                    <h3 style={styles.subTitle}>Our Team</h3>
                    <p style={styles.paragraph}>Book Heaven is the result of the hard work and creativity of three passionate individuals. Together, we’ve combined our love for reading with our skills in technology and design to create a unique platform that makes finding and enjoying books easier and more enjoyable.</p>
                    <h3 style={styles.subTitle}>Our Mission</h3>
                    <p style={styles.paragraph}>Our mission is simple: to offer a diverse range of books that inspire and engage readers of all kinds. We aim to provide an excellent browsing experience and make it easy for you to discover your next great read.</p>
                    <p style={styles.paragraph}>Thank you for visiting Book Heaven. We’re excited to share our passion for books with you and look forward to helping you find your next favorite book.</p>
                </section>
            </main>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        margin: 0,
        padding: 0,
        background: '#e0f7fa', // Light cyan background for the whole page
    },
    header: {
        background: 'linear-gradient(to right, #006064, #004d40)', // Gradient background for header
        color: '#fff',
        textAlign: 'center',
        padding: '60px 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        borderBottom: '5px solid #004d40',
    },
    headerTitle: {
        fontSize: '4em',
        margin: 0,
        fontWeight: 'bold',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    headerSubtitle: {
        fontSize: '1.8em',
        margin: '10px 0 0',
        fontStyle: 'italic',
    },
    main: {
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
    },
    about: {
        background: '#ffffff', // White background for the about section
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)',
        lineHeight: '1.6',
    },
    sectionTitle: {
        fontSize: '2.5em',
        borderBottom: '2px solid #006064',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    subTitle: {
        fontSize: '2em',
        marginTop: '20px',
        color: '#00796b',
    },
    paragraph: {
        fontSize: '1.2em',
        margin: '15px 0',
    },
    footer: {
        textAlign: 'center',
        padding: '20px',
        background: '#004d40', // Dark background for footer
        color: '#fff',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    footerText: {
        margin: 0,
        fontSize: '1em',
    },
};

export default BookHeaven;
