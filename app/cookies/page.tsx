const CookiesPolicy = () => {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-center">Politica de Cookies</h1>
      <div className="cookies-content max-w-4xl mx-auto p-6 space-y-8">
        <section className="company-info">
          <h2 className="text-2xl font-bold mb-4">Informații Companie</h2>
          <p className="mb-4">
            <strong>Politica de Cookies pentru Planyvite.ro</strong>
            <br />
            Administrat de: SC PLANYVITE SRL, cu sediul social în Municipiul
            București, Sector 4, Aleea Mirea Mioara Luiza, Nr. 1, Bl. N22, Scara
            1, Etaj 4, Ap. 13, înregistrată la Registrul Comerțului sub nr.
            J2025024868001, CUI 51584427, denumită în continuare "Planyvite" sau
            "Site-ul".
          </p>
          <p className="mb-4">
            <strong>Date de contact:</strong>
            <br />
            Adresă de e-mail: contact@planyvite.ro
          </p>
        </section>

        <section className="introduction">
          <p className="mb-4">
            Această Politică de Cookies explică ce sunt cookies-urile, cum le
            utilizăm pe site-ul nostru www.planyvite.ro, și cum puteți controla
            utilizarea acestora.
          </p>
          <p className="mb-4">
            Prin continuarea utilizării site-ului nostru, vă exprimați acordul
            cu utilizarea cookies-urilor în conformitate cu această politică.
          </p>
        </section>

        <section className="what-are-cookies">
          <h2 className="text-2xl font-bold mb-4">1. Ce sunt cookies-urile?</h2>
          <div className="space-y-4">
            <p>
              <strong>1.1.</strong> Cookies-urile sunt fișiere mici de text care
              sunt stocate pe dispozitivul dumneavoastră atunci când vizitați un
              site web.
            </p>
            <p>
              <strong>1.2.</strong> Acestea permit site-ului să vă recunoască și
              să rețină anumite informații despre preferințele sau acțiunile
              dumneavoastră.
            </p>
            <p>
              <strong>1.3.</strong> Cookies-urile nu pot accesa alte fișiere de
              pe computerul dumneavoastră și nu pot instala viruși.
            </p>
          </div>
        </section>

        <section className="types-of-cookies">
          <h2 className="text-2xl font-bold mb-4">
            2. Tipurile de cookies pe care le utilizăm
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                2.1. Cookies esențiale
              </h3>
              <p className="mb-2">
                Aceste cookies sunt necesare pentru funcționarea corectă a
                site-ului:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Cookies de sesiune pentru autentificare</li>
                <li>Cookies pentru coșul de cumpărături</li>
                <li>Cookies pentru securitatea site-ului</li>
                <li>Cookies pentru preferințele de limbă</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                2.2. Cookies de performanță
              </h3>
              <p className="mb-2">
                Aceste cookies colectează informații despre modul în care
                utilizați site-ul:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Google Analytics pentru analiza traficului</li>
                <li>Măsurarea timpului de încărcare a paginilor</li>
                <li>Identificarea erorilor și problemelor tehnice</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                2.3. Cookies de funcționalitate
              </h3>
              <p className="mb-2">
                Aceste cookies îmbunătățesc experiența utilizatorului:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Reținerea preferințelor de design</li>
                <li>Salvarea setărilor utilizatorului</li>
                <li>Personalizarea conținutului</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                2.4. Cookies de marketing
              </h3>
              <p className="mb-2">
                Aceste cookies sunt utilizate pentru publicitatea țintită:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Facebook Pixel pentru remarketing</li>
                <li>Google Ads pentru urmărirea conversiilor</li>
                <li>Cookies pentru personalizarea reclamelor</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="cookie-duration">
          <h2 className="text-2xl font-bold mb-4">3. Durata cookies-urilor</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                3.1. Cookies de sesiune
              </h3>
              <p>
                Sunt șterse automat când închideți browserul. Sunt utilizate
                pentru funcționalitatea de bază a site-ului.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                3.2. Cookies persistente
              </h3>
              <p>
                Rămân pe dispozitivul dumneavoastră pentru o perioadă
                specificată sau până când le ștergeți manual:
              </p>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Preferințe utilizator: 1 an</li>
                <li>Analytics cookies: 2 ani</li>
                <li>Marketing cookies: 30-90 zile</li>
                <li>Cookies funcționale: 6 luni</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="third-party-cookies">
          <h2 className="text-2xl font-bold mb-4">4. Cookies terțe</h2>
          <div className="space-y-4">
            <p>
              <strong>4.1.</strong> Site-ul nostru utilizează servicii terțe
              care pot seta propriile cookies:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <strong>Google Analytics:</strong> Pentru analiza traficului
                  și comportamentului utilizatorilor
                </li>
                <li>
                  <strong>Google Ads:</strong> Pentru urmărirea conversiilor și
                  remarketing
                </li>
                <li>
                  <strong>Facebook Pixel:</strong> Pentru publicitatea pe
                  rețelele sociale
                </li>
                <li>
                  <strong>Stripe/PayPal:</strong> Pentru procesarea plăților
                </li>
              </ul>
            </div>
            <p>
              <strong>4.2.</strong> Aceste servicii au propriile politici de
              confidențialitate și cookies pe care vă încurajăm să le
              consultați.
            </p>
          </div>
        </section>

        <section className="managing-cookies">
          <h2 className="text-2xl font-bold mb-4">
            5. Gestionarea cookies-urilor
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                5.1. Prin setările browserului
              </h3>
              <p className="mb-2">
                Puteți controla și șterge cookies-urile prin setările
                browserului:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <strong>Chrome:</strong> Setări → Avansate → Confidențialitate
                  și securitate → Cookies
                </li>
                <li>
                  <strong>Firefox:</strong> Opțiuni → Confidențialitate și
                  securitate
                </li>
                <li>
                  <strong>Safari:</strong> Preferințe → Confidențialitate
                </li>
                <li>
                  <strong>Edge:</strong> Setări → Cookies și permisiuni site
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">
                5.2. Prin panoul de consent
              </h3>
              <p>
                Puteți modifica preferințele pentru cookies prin panoul nostru
                de consent care apare la prima vizită pe site.
              </p>
            </div>
          </div>
        </section>

        <section className="consequences">
          <h2 className="text-2xl font-bold mb-4">
            6. Consecințele dezactivării cookies-urilor
          </h2>
          <div className="space-y-4">
            <p>
              <strong>6.1.</strong> Dezactivarea cookies-urilor esențiale poate
              afecta funcționarea site-ului.
            </p>
            <p>
              <strong>6.2.</strong> S-ar putea să nu puteți:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Să vă autentificați în cont</li>
              <li>Să utilizați coșul de cumpărături</li>
              <li>Să salvați preferințele</li>
              <li>Să accesați anumite funcționalități personalizate</li>
            </ul>
            <p>
              <strong>6.3.</strong> Dezactivarea cookies-urilor de performanță
              și marketing nu afectează funcționarea de bază a site-ului.
            </p>
          </div>
        </section>

        <section className="updates">
          <h2 className="text-2xl font-bold mb-4">7. Actualizări</h2>
          <div className="space-y-4">
            <p>
              <strong>7.1.</strong> Această politică poate fi actualizată
              periodic pentru a reflecta modificările în utilizarea
              cookies-urilor.
            </p>
            <p>
              <strong>7.2.</strong> Vă recomandăm să verificați această pagină
              periodic pentru a fi la curent cu orice modificări.
            </p>
            <p>
              <strong>7.3.</strong> Modificările semnificative vor fi comunicate
              prin panoul de consent sau prin e-mail.
            </p>
          </div>
        </section>

        <section className="contact">
          <h2 className="text-2xl font-bold mb-4">8. Contact</h2>
          <div className="space-y-4">
            <p>
              Pentru întrebări referitoare la această Politică de Cookies sau
              pentru exercitarea drepturilor dumneavoastră, ne puteți contacta:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>
                <strong>E-mail:</strong> contact@planyvite.ro
              </p>
              <p>
                <strong>Adresa:</strong> Municipiul București, Sector 4, Aleea
                Mirea Mioara Luiza, Nr. 1, Bl. N22, Scara 1, Etaj 4, Ap. 13
              </p>
            </div>
          </div>
        </section>

        <section className="effective-date">
          <p className="text-sm text-gray-600 mt-8 pt-4 border-t">
            <strong>Data intrării în vigoare:</strong> [12.11.2025]
            <br />
            <strong>Ultima actualizare:</strong> [12.11.2025]
          </p>
        </section>
      </div>
    </div>
  );
};

export default CookiesPolicy;
