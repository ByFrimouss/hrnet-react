import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.scss";

/**
 * @component Modal
 * @description Fenêtre modale accessible et animée.
 * Remplace le plugin jQuery.modal.js utilisé dans l'ancienne version de HRnet.
 *
 * Fonctionnalités :
 * - Fermeture par clic sur l'overlay
 * - Fermeture par touche Escape
 * - Blocage du scroll du body quand ouverte
 * - Attributs ARIA pour l'accessibilité
 * - Animation d'entrée CSS
 *
 * @param {Object}          props
 * @param {boolean}         props.isOpen    - Contrôle la visibilité de la modale
 * @param {Function}        props.onClose   - Callback appelé pour fermer la modale
 * @param {string}          [props.title]   - Titre affiché en haut de la modale
 * @param {string}          [props.message] - Message principal affiché
 * @param {React.ReactNode} [props.children] - Contenu JSX personnalisé
 *
 * @example
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Success!"
 *   message="Employee has been created."
 * />
 *
 * @returns {JSX.Element|null}
 */
function Modal({ isOpen, onClose, title, message, children }) {
  /**
   * Ferme la modale quand l'utilisateur appuie sur Escape
   * @param {KeyboardEvent} e - L'événement clavier
   */
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
    },
    [onClose],
  );

  /**
   * Gère les effets de bord liés à l'ouverture/fermeture de la modale
   * - Bloque le scroll du body quand ouverte
   * - Ecoute la touche Escape
   * - Nettoie les effets quand fermée
   */
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Ne rend rien si la modale est fermée
  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "modal-title" : undefined}
    >
      {/* stopPropagation empêche le clic dans la modale de fermer l'overlay */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>

        {title && (
          <h2 id="modal-title" className={styles.title}>
            {title}
          </h2>
        )}

        {message && <p className={styles.message}>{message}</p>}

        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  /** Contrôle si la modale est visible */
  isOpen: PropTypes.bool.isRequired,
  /** Fonction appelée pour fermer la modale */
  onClose: PropTypes.func.isRequired,
  /** Titre affiché en haut de la modale */
  title: PropTypes.string,
  /** Message principal */
  message: PropTypes.string,
  /** Contenu JSX personnalisé */
  children: PropTypes.node,
};

Modal.defaultProps = {
  title: "",
  message: "",
  children: null,
};

export default Modal;
