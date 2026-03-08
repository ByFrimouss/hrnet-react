import { useState } from "react";
import { useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { addEmployee } from "../../features/employees/employeesSlice";
import { US_STATES, DEPARTMENTS } from "../../data/constants";
import styles from "./CreateEmployee.module.scss";

/**
 * @component CreateEmployee
 * @description Page de création d'un nouvel employé.
 * Contient un formulaire complet avec validation basique.
 * Dispatche l'action addEmployee vers Redux au submit.
 * @returns {JSX.Element}
 */
function CreateEmployee() {
  const dispatch = useDispatch();

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
    if (!form.firstName || !form.lastName) {
      alert("First name and last name are required.");
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

    alert("Employee created successfully!");

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
              />
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
              />
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
                maxDate={new Date()}
              />
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
              />
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
              <label>State</label>
              <Select
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
              />
            </div>
          </div>
        </section>

        {/* ── Département ── */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Department</h2>

          <div className={styles.field} style={{ maxWidth: "300px" }}>
            <label>Department</label>
            <Select
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
    </main>
  );
}

export default CreateEmployee;
