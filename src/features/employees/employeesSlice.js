import { createSlice } from "@reduxjs/toolkit";

/**
 * @typedef {Object} Employee
 * @property {string} firstName   - Prénom de l'employé
 * @property {string} lastName    - Nom de famille
 * @property {string} dateOfBirth - Date de naissance (format ISO string)
 * @property {string} startDate   - Date d'embauche (format ISO string)
 * @property {string} street      - Rue
 * @property {string} city        - Ville
 * @property {string} state       - État (abréviation US, ex: "CA")
 * @property {string} zipCode     - Code postal
 * @property {string} department  - Département (ex: "Engineering")
 */

/**
 * Charge les employés depuis localStorage au démarrage.
 * @returns {Employee[]}
 */
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem("hrnet_employees");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const employeesSlice = createSlice({
  name: "employees",
  initialState: {
    /** @type {Employee[]} */
    list: loadFromStorage(),
  },
  reducers: {
    /**
     * Ajoute un nouvel employé à la liste et sauvegarde dans localStorage.
     * @param {Object} state - État Redux actuel
     * @param {{ payload: Employee }} action - L'action avec l'employé en payload
     */
    addEmployee(state, action) {
      state.list.push(action.payload);
      localStorage.setItem("hrnet_employees", JSON.stringify(state.list));
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
