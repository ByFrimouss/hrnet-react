import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployee } from "../../features/employees/employeesSlice";
import { US_STATES, DEPARTMENTS } from "../../data/constants";
import styles from "./CreateEmployee.module.scss";
import Modal from "../../components/Modal/Modal";

/**
 * @component CreateEmployee
 * @description Page de création d'un nouvel employé.
 * Contient un formulaire complet avec validation basique.
 * Dispatche l'action addEmployee vers Redux au submit.
 * @returns {JSX.Element}
 */
function CreateEmployee() {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * État du formulaire — tous les champs sont contrôlés
   * @type {[Object, Function]}
   */
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    startDate: null,
    street: "",
    city: "",
    state: null,
    zipCode: "",
    department: null,
  });

  /**
   * ==============================
   * STATE POUR LES MESSAGES D'ERREUR
   * ==============================
   * Permet d'afficher les erreurs directement sous les champs
   * du formulaire au lieu d'utiliser uniquement des alert().
   */
  const [errors, setErrors] = useState({});

  /**
   * ==============================
   * LIMITES DE DATES
   * ==============================
   * Ajout d'une logique métier réaliste :
   * - âge minimum pour travailler : 16 ans
   * - âge maximum cohérent : 100 ans
   */

  const today = new Date();

  const minBirthDate = new Date();
  minBirthDate.setFullYear(today.getFullYear() - 100);

  const maxBirthDate = new Date();
  maxBirthDate.setFullYear(today.getFullYear() - 16);

  /**
   * Gestionnaire pour les champs texte
   * @param {React.ChangeEvent<HTMLInputElement>} e - Événement change
   */
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Gestionnaire pour les DatePickers
   * @param {string} field - Nom du champ
   * @param {Date|null} date - Date sélectionnée
   */
  const handleDate = (field, date) => {
    setForm((prev) => ({ ...prev, [field]: date }));
  };

  /**
   * Gestionnaire pour les menus déroulants react-select
   * @param {string} field - Nom du champ
   * @param {{ value: string, label: string }|null} option - Option choisie
   */
  const handleSelect = (field, option) => {
    setForm((prev) => ({ ...prev, [field]: option }));
  };

  /**
   * Soumet le formulaire et dispatche l'action Redux
   */
  const handleSubmit = () => {
    /**
     * ==============================
     * RÉINITIALISATION DES ERREURS
     * ==============================
     */

    const newErrors = {};

    /* VALIDATION NOM / PRÉNOM */

    if (form.firstName.trim().length < 3) {
      newErrors.firstName = "First name must contain at least 3 characters.";
    }

    if (form.lastName.trim().length < 3) {
      newErrors.lastName = "Last name must contain at least 3 characters.";
    }

    /**
     * ==============================
     * VALIDATION DATE DE NAISSANCE
     * ==============================
     */

    if (!form.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required.";
    } else {
      const age = today.getFullYear() - form.dateOfBirth.getFullYear();

      if (age < 16) {
        newErrors.dateOfBirth = "Employee must be at least 16 years old.";
      }

      if (age > 100) {
        newErrors.dateOfBirth = "Employee age cannot exceed 100 years.";
      }
    }

    /**
     * ==============================
     * VALIDATION DATE D'EMBAUCHE
     * ==============================
     */

    if (!form.startDate) {
      newErrors.startDate = "Start date is required.";
    } else {
      if (form.startDate > today) {
        newErrors.startDate = "Start date cannot be in the future.";
      }

      if (form.dateOfBirth && form.startDate < form.dateOfBirth) {
        newErrors.startDate = "Start date cannot be before birth date.";
      }
    }

    /**
     * ==============================
     * VALIDATION ZIP CODE
     * ==============================
     */

    const zipRegex = /^\d{5}$/;

    if (!zipRegex.test(form.zipCode)) {
      newErrors.zipCode = "Zip code must contain exactly 5 digits.";
    }

    /**
     * ==============================
     * BLOQUE LA SOUMISSION
     * SI ERREURS
     * ==============================
     */

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(
      addEmployee({
        firstName: form.firstName,
        lastName: form.lastName,
        dateOfBirth: form.dateOfBirth?.toISOString() ?? "",
        startDate: form.startDate?.toISOString() ?? "",
        street: form.street,
        city: form.city,
        state: form.state?.value ?? "",
        zipCode: form.zipCode,
        department: form.department?.value ?? "",
      }),
    );

    setIsModalOpen(true);

    setErrors({});

    // Remet le formulaire à zéro
    setForm({
      firstName: "",
      lastName: "",
      dateOfBirth: null,
      startDate: null,
      street: "",
      city: "",
      state: null,
      zipCode: "",
      department: null,
    });
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Create Employee</h1>

      <div className={styles.card}>
        {/* ── Informations personnelles ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Personal Information</h2>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={form.firstName}
                onChange={handleInput}
                placeholder="Alice"
                required
                minLength={3}
              />

              {/* Affichage erreur */}
              {errors.firstName && (
                <p className={styles.error}>{errors.firstName}</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={form.lastName}
                onChange={handleInput}
                placeholder="Dupont"
                required
                minLength={3}
              />

              {errors.lastName && (
                <p className={styles.error}>{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Date of Birth</label>
              <DatePicker
                selected={form.dateOfBirth}
                onChange={(date) => handleDate("dateOfBirth", date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select date"
                showYearDropdown
                dropdownMode="select"
                minDate={minBirthDate}
                maxDate={maxBirthDate}
              />

              {errors.dateOfBirth && (
                <p className={styles.error}>{errors.dateOfBirth}</p>
              )}
            </div>

            <div className={styles.field}>
              <label>Start Date</label>
              <DatePicker
                selected={form.startDate}
                onChange={(date) => handleDate("startDate", date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Select date"
                showYearDropdown
                dropdownMode="select"
                maxDate={today}
              />

              {errors.startDate && (
                <p className={styles.error}>{errors.startDate}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Adresse ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Address</h2>

          <div className={styles.field}>
            <label htmlFor="street">Street</label>
            <input
              id="street"
              name="street"
              type="text"
              value={form.street}
              onChange={handleInput}
              placeholder="123 Main Street"
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                type="text"
                value={form.city}
                onChange={handleInput}
                placeholder="New York"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="state-select">State</label>
              <Select
                inputId="state-select"
                options={US_STATES}
                value={form.state}
                onChange={(opt) => handleSelect("state", opt)}
                placeholder="Select state..."
                classNamePrefix="react-select"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="zipCode">Zip Code</label>
              <input
                id="zipCode"
                name="zipCode"
                type="text"
                value={form.zipCode}
                onChange={handleInput}
                placeholder="10001"
                pattern="\d{5}"
                maxLength={5}
              />

              {errors.zipCode && (
                <p className={styles.error}>{errors.zipCode}</p>
              )}
            </div>
          </div>
        </section>

        {/* ── Département ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Department</h2>

          <div className={styles.field} style={{ maxWidth: "300px" }}>
            <label htmlFor="department-select">Department</label>
            <Select
              inputId="department-select"
              options={DEPARTMENTS}
              value={form.department}
              onChange={(opt) => handleSelect("department", opt)}
              placeholder="Select department..."
              classNamePrefix="react-select"
            />
          </div>
        </section>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Save Employee
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Employee Created!"
        message="The new employee has been successfully saved."
      />
    </main>
  );
}

export default CreateEmployee;
