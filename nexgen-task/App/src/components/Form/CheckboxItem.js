/**
 * Компонент служещ за рентирането на Чекбокс полетата
 *
 */

const CheckboxItem = ({ value, onCheck, clearValidity }) => {
  return (
    <li>
      <label htmlFor={value}>{value}</label>
      <input
        type="checkbox"
        id={value}
        name="tech"
        value={value}
        // При 'onChange' се изпълнява ф-ята 'techArrayHandler' в парънта
        onChange={(e) => onCheck(e)}
        // При 'onClick' се изпълнява ф-ята 'checkboxValidityHandler' в парънта
        onClick={() => clearValidity()}
      />
    </li>
  );
};

export default CheckboxItem;
