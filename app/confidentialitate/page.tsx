const PrivacyPolicyPage = () => {
  return (
    <div className="py-4">
      <h1 className="text-2xl font-bold text-center">
        Politica de Confidențialitate
      </h1>
      <div className="privacy-content max-w-4xl mx-auto p-6 space-y-8">
        <section className="company-info">
          <h2 className="text-2xl font-bold mb-4">Informații Companie</h2>
          <p className="mb-4">
            <strong>Politica de Confidențialitate pentru Planyvite.ro</strong>
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
            <br />
            Responsabil cu protecția datelor: contact@planyvite.ro
          </p>
        </section>

        <section className="introduction">
          <p className="mb-4">
            Această Politică de Confidențialitate descrie modul în care
            Planyvite colectează, utilizează, stochează și protejează
            informațiile personale ale utilizatorilor platformei
            www.planyvite.ro.
          </p>
          <p className="mb-4">
            Prin utilizarea site-ului nostru, vă exprimați acordul cu privire la
            colectarea și utilizarea informațiilor în conformitate cu această
            politică. Această politică este în conformitate cu Regulamentul
            General privind Protecția Datelor (GDPR) și legislația română
            aplicabilă.
          </p>
        </section>

        <section className="data-collection">
          <h2 className="text-2xl font-bold mb-4">
            1. Datele pe care le colectăm
          </h2>
          <div className="space-y-4">
            <div>
              <strong>1.1. Date cu caracter personal identificabile:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Nume și prenume</li>
                <li>Adresa de e-mail</li>
                <li>Numărul de telefon</li>
                <li>Adresa de facturare</li>
                <li>Informații despre eveniment</li>
              </ul>
            </div>
            <div>
              <strong>1.2. Date de utilizare:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Adresa IP</li>
                <li>Tipul și versiunea browserului</li>
                <li>Sistemul de operare</li>
                <li>Paginile vizitate și timpul petrecut pe site</li>
                <li>Data și ora accesării</li>
              </ul>
            </div>
            <div>
              <strong>1.3. Cookies și tehnologii similare:</strong>
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Cookie-uri de sesiune și persistente</li>
                <li>Web beacons</li>
                <li>Pixeli de urmărire</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="data-usage">
          <h2 className="text-2xl font-bold mb-4">2. Cum utilizăm datele</h2>
          <div className="space-y-4">
            <p>
              <strong>2.1.</strong> Pentru furnizarea serviciilor de creare și
              personalizare a invitațiilor digitale.
            </p>
            <p>
              <strong>2.2.</strong> Pentru procesarea comenzilor și plăților.
            </p>
            <p>
              <strong>2.3.</strong> Pentru comunicarea cu utilizatorii și
              furnizarea suportului tehnic.
            </p>
            <p>
              <strong>2.4.</strong> Pentru îmbunătățirea serviciilor și
              experiența utilizatorului.
            </p>
            <p>
              <strong>2.5.</strong> Pentru respectarea obligațiilor legale și
              fiscale.
            </p>
            <p>
              <strong>2.6.</strong> Pentru trimiterea de actualizări și
              informații relevante despre servicii (cu acordul dumneavoastră).
            </p>
          </div>
        </section>

        <section className="legal-basis">
          <h2 className="text-2xl font-bold mb-4">
            3. Temeiurile legale pentru prelucrare
          </h2>
          <div className="space-y-4">
            <p>
              <strong>3.1. Executarea contractului:</strong> Pentru furnizarea
              serviciilor solicitate.
            </p>
            <p>
              <strong>3.2. Consimțământul:</strong> Pentru marketing și
              comunicări promoționale.
            </p>
            <p>
              <strong>3.3. Interesul legitim:</strong> Pentru îmbunătățirea
              serviciilor și securitatea platformei.
            </p>
            <p>
              <strong>3.4. Obligația legală:</strong> Pentru respectarea
              legislației fiscale și comerciale.
            </p>
          </div>
        </section>

        <section className="data-sharing">
          <h2 className="text-2xl font-bold mb-4">4. Partajarea datelor</h2>
          <div className="space-y-4">
            <p>
              <strong>4.1.</strong> Nu vindem, închiriem sau distribuim datele
              personale către terți în scopuri comerciale.
            </p>
            <p>
              <strong>
                4.2. Partajăm datele doar în următoarele situații:
              </strong>
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Cu furnizorii de servicii de plată pentru procesarea
                tranzacțiilor
              </li>
              <li>Cu furnizorii de servicii de hosting și cloud</li>
              <li>Când este cerut de lege sau autorități competente</li>
              <li>
                Pentru protejarea drepturilor și siguranței noastre sau a
                utilizatorilor
              </li>
            </ul>
          </div>
        </section>

        <section className="data-security">
          <h2 className="text-2xl font-bold mb-4">5. Securitatea datelor</h2>
          <div className="space-y-4">
            <p>
              <strong>5.1.</strong> Implementăm măsuri tehnice și organizatorice
              adecvate pentru protejarea datelor personale.
            </p>
            <p>
              <strong>5.2.</strong> Utilizăm criptarea SSL pentru transmiterea
              datelor sensibile.
            </p>
            <p>
              <strong>5.3.</strong> Accesul la datele personale este
              restricționat doar la personalul autorizat.
            </p>
            <p>
              <strong>5.4.</strong> Efectuăm backup-uri regulate și monitorizăm
              activitatea sistemelor.
            </p>
          </div>
        </section>

        <section className="data-retention">
          <h2 className="text-2xl font-bold mb-4">6. Păstrarea datelor</h2>
          <div className="space-y-4">
            <p>
              <strong>6.1.</strong> Păstrăm datele personale doar pe perioada
              necesară îndeplinirii scopurilor pentru care au fost colectate.
            </p>
            <p>
              <strong>6.2.</strong> Datele de cont sunt păstrate până la
              ștergerea contului de către utilizator.
            </p>
            <p>
              <strong>6.3.</strong> Datele de facturare sunt păstrate conform
              obligațiilor legale (5 ani).
            </p>
            <p>
              <strong>6.4.</strong> Datele de marketing sunt păstrate până la
              retragerea consimțământului.
            </p>
          </div>
        </section>

        <section className="user-rights">
          <h2 className="text-2xl font-bold mb-4">
            7. Drepturile utilizatorilor
          </h2>
          <div className="space-y-4">
            <p>
              <strong>Aveți următoarele drepturi conform GDPR:</strong>
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Dreptul de acces:</strong> Să solicitați informații
                despre datele prelucrate
              </li>
              <li>
                <strong>Dreptul de rectificare:</strong> Să corectați datele
                inexacte
              </li>
              <li>
                <strong>Dreptul la ștergere:</strong> Să solicitați ștergerea
                datelor
              </li>
              <li>
                <strong>Dreptul la restricționarea prelucrării:</strong> Să
                limitați utilizarea datelor
              </li>
              <li>
                <strong>Dreptul la portabilitatea datelor:</strong> Să primiți
                datele în format structurat
              </li>
              <li>
                <strong>Dreptul de opoziție:</strong> Să vă opuneți prelucrării
              </li>
              <li>
                <strong>Dreptul de a depune plângere:</strong> La autoritatea de
                supraveghere
              </li>
            </ul>
          </div>
        </section>

        <section className="cookies">
          <h2 className="text-2xl font-bold mb-4">8. Cookies</h2>
          <div className="space-y-4">
            <p>
              <strong>8.1.</strong> Utilizăm cookies pentru îmbunătățirea
              experienței utilizatorilor.
            </p>
            <p>
              <strong>8.2.</strong> Puteți controla și șterge cookies prin
              setările browserului.
            </p>
            <p>
              Pentru informații detaliate, consultați
              <a href="#" className="text-blue-600 underline ml-1">
                Politica de Cookies
              </a>
              .
            </p>
          </div>
        </section>

        <section className="third-party">
          <h2 className="text-2xl font-bold mb-4">9. Servicii terțe</h2>
          <div className="space-y-4">
            <p>
              <strong>9.1.</strong> Site-ul poate conține link-uri către
              site-uri terțe care au propriile politici de confidențialitate.
            </p>
            <p>
              <strong>9.2.</strong> Nu suntem responsabili pentru practicile de
              confidențialitate ale acestor site-uri terțe.
            </p>
            <p>
              <strong>9.3.</strong> Vă recomandăm să citiți politicile de
              confidențialitate ale acestor site-uri.
            </p>
          </div>
        </section>

        <section className="policy-updates">
          <h2 className="text-2xl font-bold mb-4">
            10. Actualizări ale politicii
          </h2>
          <div className="space-y-4">
            <p>
              <strong>10.1.</strong> Această politică poate fi actualizată
              periodic pentru a reflecta modificările în practicile noastre.
            </p>
            <p>
              <strong>10.2.</strong> Vă vom notifica despre modificările
              semnificative prin e-mail sau prin afișarea unui anunț pe site.
            </p>
            <p>
              <strong>10.3.</strong> Data ultimei actualizări este afișată în
              partea de sus a acestei politici.
            </p>
          </div>
        </section>

        <section className="contact">
          <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
          <div className="space-y-4">
            <p>
              Pentru întrebări referitoare la această Politică de
              Confidențialitate sau pentru exercitarea drepturilor
              dumneavoastră, ne puteți contacta:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p>
                <strong>E-mail:</strong> contact@planyvite.ro
              </p>
              <p>
                <strong>Adresa:</strong> Municipiul București, Sector 4, Aleea
                Mirea Mioara Luiza, Nr. 1, Bl. N22, Scara 1, Etaj 4, Ap. 13
              </p>
              <p>
                <strong>Responsabil protecția datelor:</strong>{" "}
                contact@planyvite.ro
              </p>
            </div>
          </div>
        </section>

        <section className="effective-date">
          <p className="text-sm text-gray-600 mt-8 pt-4 border-t">
            <strong>Data intrării în vigoare:</strong> [Data]
            <br />
            <strong>Ultima actualizare:</strong> [Data]
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
