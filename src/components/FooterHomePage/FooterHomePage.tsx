import styles from "@/components/FooterHomePage/FooterHomePageStyles.module.css";

function FooterHomePage() {
  const jumpToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section id="footer" className={styles.footerContainer}>
      <p onClick={jumpToTop}>
        &copy; 2024 Botao He. <br />
        All rights reserved.
      </p>
    </section>
  );
}

export default FooterHomePage;
