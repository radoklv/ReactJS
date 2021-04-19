import './Form.css';
import Button from '../UI/Button';
import CheckboxItem from './CheckboxItem';
import { useState } from 'react';

const Form = ({ onSubmitForm }) => {
  /**
   * Инициализиране на динамични променливи за всички инпут полета.
   * Всяка променлива се състои от обект, който съдържа стойността на поменливата
   * и дали тя е валидна. Първоначално всички са валидни с цел да се избегне
   * показване на ерори за всички полета.
   */
  const [firstName, setFirstName] = useState({ val: '', isValid: true });
  const [lastName, setLastName] = useState({ val: '', isValid: true });
  const [email, setEmail] = useState({ val: '', isValid: true });
  const [position, setPosition] = useState({ val: '', isValid: true });
  const [experience, setExperience] = useState({ val: 0, isValid: true });
  const [birthdate, setBirthdate] = useState({ val: '', isValid: true });
  const [tech, setTech] = useState({ val: [], isValid: true });
  const [summary, setSummary] = useState({ val: '', isValid: true });
  const [texareaCounter, setTexareaCounter] = useState(0);

  // Инициализиране на масив от елементи които служат за стойности на чекбоксовете.
  const checkboxValues = ['Vue', 'React', 'Angular', 'Node', 'Php', 'Java'];

  // Regex pattern за валидиране на имейл
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;

  // Handler функция която се извиква всеки път при въвеждане на текст в Textarea полето.
  const counterHandler = (e) => {
    // Присвояване на стойността от евента.
    let value = e.target.value.trim();

    // Сетване на 'texareaCounter' с дължината на подадения текст.
    setTexareaCounter(value.length);
  };

  // Ф-я който се извиква от възникване на евент от чекбокс.
  const techArrayHandler = (e) => {
    //Взима се тойността от евента.
    const value = e.target.value;

    /**
     * Правим копие на масива от 'state' променливата 'tech'
     * за да се избегне забавянето при промяна на стейта.
     */
    const techArr = tech.val;

    /**
     * Ако стойността не се съдържа в масина, се добавя,
     * в противен случай се премахва от него.
     */
    if (!techArr.includes(value)) {
      techArr.push(value);
      setTech({ val: techArr, isValid: true });
    } else {
      // Взимаме индекса на елемента от масива.
      let elementIndex = techArr.indexOf(value);

      // И го премахваме посредством Array метода splice
      techArr.splice(elementIndex, 1);

      // Сетване 'tech' с обновения масив.
      setTech({ val: techArr, isValid: true });
    }
  };

  /**
   * Ф-я която се подава на Child компонента 'CheckboxItem'
   * която служи за връщане на полето isValid в true,
   * за да се изчисти нотификацията за грешка.
   */
  const checkboxValidityHandler = () => {
    setTech({ ...tech, isValid: true });
  };

  /**
   * Ф-я която се извиква от метода 'submitFromHandler',
   * която валидира всички инпут полета.
   */
  const validateFormHandler = () => {
    // Сетване на първоначална стойност за валидна форма.
    let isFormValid = true;

    // Ако полето не отговори на зададения критерии.
    if (firstName.val.length < 3) {
      /**
       * Старите стойости на обекта се копират и 'isValid' се сетва на false.
       * Останалите If-ове по-надолу, следват същата логика.
       */
      setFirstName({ ...firstName, isValid: false });

      // И локалната променлива за 'isFormValid' приема стойност false
      isFormValid = false;
    }

    if (lastName.val.length < 3) {
      setLastName({ ...lastName, isValid: false });
      isFormValid = false;
    }

    if (!email.val.match(emailRegex)) {
      setEmail({ ...email, isValid: false });
      isFormValid = false;
    }

    if (position.val === '') {
      setPosition({ ...position, isValid: false });
      isFormValid = false;
    }

    if (experience.val === 0) {
      setExperience({ ...experience, isValid: false });
      isFormValid = false;
    }

    if (birthdate.val === '') {
      setBirthdate({ ...birthdate, isValid: false });
      isFormValid = false;
    }

    if (tech.val.length === 0) {
      setTech({ val: [], isValid: false });
      isFormValid = false;
    }

    if (texareaCounter < 50 || texareaCounter > 1000) {
      setSummary({ ...summary, isValid: false });
      isFormValid = false;
    }

    // Тук връщаме стойсността на променливата, указваща дали формата е валидна.
    return isFormValid;
  };

  // Ф-я която се извиква след Submit на формата
  const submitFromHandler = (e) => {
    // Прекратява се дефолтното поведение при Submit
    e.preventDefault();

    /**
     * Проверяваме стойостта която връща 'validateFormHandler'.
     * При TRUE, 'submitFromHandler' продължава изпълнението си.
     * При FALSE, 'submitFromHandler' прекратява изпълнението си.
     *
     */
    if (!validateFormHandler()) {
      return;
    }

    //Създаваме нов обект от данните на всички полета.
    const formData = {
      firstName: firstName.val,
      lastName: lastName.val,
      birthdate: birthdate.val,
      email: email.val,
      position: position.val,
      experience: experience.val,
      tech: tech.val,
      summary: summary.val,
    };

    // Чрез ф-ят 'onSubmitForm' изпращаме данните към парънта
    onSubmitForm(formData);
  };

  return (
    /**
     * При събмит на формата извикваме ф-ята 'submitFromHandler'
     */
    <form className="form row" onSubmit={submitFromHandler}>
      {/**
       * При невалидност на полето се добавя класа 'error'
       */}
      <div className="col-12 col-md-6">
        <div className={`form_controls ${!firstName.isValid ? 'error' : ''}`}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            // Dual-Bind
            value={firstName.val}
            /**
             * При 'onChange' евент, сетнаве 'State' променливата за конкретното поле
             * с новата стойност, като копираме старият обект и презаписваме
             * val- key с новата стойност. Останалите Input полета следват същата логика.
             */
            onChange={(e) =>
              setFirstName({ ...firstName, val: e.target.value })
            }
            /**
             * При 'onFocus' евент връщаме стойността на 'isValid' в true.
             * Това се прави с цел, ако възникне грешка в полето, и му се добавят CSS
             * стилове за невалидно поле, да се премахнат.
             * Останалите Input полета следват същата логика.
             */
            onFocus={() => setFirstName({ ...firstName, isValid: true })}
          />

          {
            /**
             * При невалидност на полето, този текст се показва.
             * Останалите Input полета следват същата логика.
             */
            !firstName.isValid && (
              <p>This field must contain at least 3 characters</p>
            )
          }
        </div>

        <div className={`form_controls ${!lastName.isValid ? 'error' : ''}`}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName.val}
            onChange={(e) => setLastName({ ...lastName, val: e.target.value })}
            onFocus={() => setLastName({ ...lastName, isValid: true })}
          />
          {!lastName.isValid && (
            <p>This field must contain at least 3 characters</p>
          )}
        </div>

        <div className={`form_controls ${!experience.isValid ? 'error' : ''}`}>
          <label htmlFor="amount">Years of experience</label>
          <input
            type="number"
            id="amount"
            min="1"
            max="50"
            value={experience.val}
            onChange={(e) =>
              setExperience({ ...experience, val: e.target.value })
            }
            onFocus={() => setExperience({ ...experience, isValid: true })}
          />
          {!experience.isValid && <p>You must choose years of experience</p>}
        </div>
      </div>

      <div className="col-12 col-md-6">
        <div className={`form_controls ${!email.isValid && 'error'}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email.val}
            onChange={(e) => {
              setEmail({ ...email, val: e.target.value });
            }}
            onFocus={() => setEmail({ ...email, isValid: true })}
          />
          {!email.isValid && <p>Email is not valid</p>}
        </div>

        <div className={`form_controls ${!position.isValid ? 'error' : ''}`}>
          <label>Position</label>
          <select
            onChange={(e) => setPosition({ ...position, val: e.target.value })}
            onFocus={() => setPosition({ ...position, isValid: true })}
          >
            <option value="" defaultValue></option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="Fullstack">Fullstack</option>
          </select>
          {!position.isValid && <p>You must choose one option</p>}
        </div>

        <div className={`form_controls ${!birthdate.isValid ? 'error' : ''}`}>
          <label htmlFor="date">Birthdate</label>
          <input
            type="date"
            id="date"
            min={`${new Date().getFullYear() - 80}-01-01`}
            max={`${new Date().getFullYear() - 18}-01-01`}
            onChange={(e) =>
              setBirthdate({ ...birthdate, val: e.target.value })
            }
            onFocus={() => setBirthdate({ ...birthdate, isValid: true })}
          />
          {!birthdate.isValid && <p>You must choose a date</p>}
        </div>
      </div>

      {/**
       * Тази секвия се състои от 'Child' компонента 'CheckboxItem'
       */}
      <div className="col-12">
        <div className={`form_controls ${!tech.isValid ? 'error' : ''}`}>
          <label htmlFor="date">Technologies</label>

          <ul className="check-controls">
            {checkboxValues.map((value, index) => {
              return (
                <CheckboxItem
                  key={index}
                  // При всяка итерация се подава стойност на компонента
                  value={value}
                  // При 'onCheck' се изпълва 'techArrayHandler' от 'CheckboxItem' компонента
                  onCheck={techArrayHandler}
                  // Пропъртито 'clearValidity' подава ф-ята 'checkboxValidityHandler'
                  clearValidity={checkboxValidityHandler}
                />
              );
            })}
          </ul>
          {!tech.isValid && <p>You must choose at least one tech</p>}
        </div>
      </div>

      <div className="col-12">
        <div className={`form_controls ${!summary.isValid ? 'error' : ''}`}>
          <label htmlFor="summary">Quick summary about you</label>
          <textarea
            name="summary"
            id="summary"
            rows="5"
            placeholder="Field needs at least 50 characters..."
            value={summary.val}
            onKeyUp={(e) => counterHandler(e)}
            onChange={(e) => setSummary({ ...summary, val: e.target.value })}
            onFocus={() => setSummary({ ...summary, isValid: true })}
          ></textarea>
          <span className="counter">{texareaCounter}</span>

          {!summary.isValid && (
            <p>This field needs at least 50 or maximum 1000 characters</p>
          )}
        </div>
      </div>

      <Button type={'submit'}>Submit Form</Button>
    </form>
  );
};

export default Form;
