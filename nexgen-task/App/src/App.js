import './App.css';
import { useState } from 'react';
import Form from './components/Form/Form';

function App() {
  /**
   * Този стейт приема обекта от фората.
   * Единствената му цел е демонстрационна,
   * да запаси обекта за да може да се дисплейне
   * по- долу в таблица
   */
  const [formData, setFormData] = useState(null);

  /**
   * Ф-я която се подава на 'Child' компонента,
   * за да вземе данните от нея.
   */
  const formHandler = (formData) => {
    setFormData(formData);
  };

  // Условно рендирване на HTML секции
  return (
    <div>
      {!formData ? (
        <section className="app">
          <div className="container">
            <div className="app_header">
              <h1>NexGen</h1>
            </div>
            <div className="app_body">
              <Form onSubmitForm={formHandler} />
            </div>
          </div>
        </section>
      ) : (
        <section className="my-3">
          <div className="container">
            <table className="tableInfo">
              <tbody>
                <tr>
                  <th colSpan="2">
                    <h2>User Info</h2>
                  </th>
                </tr>
                <tr>
                  <td>
                    <h3>First name</h3>
                  </td>
                  <td>{formData.firstName}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Last name</h3>
                  </td>
                  <td>{formData.lastName}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Email</h3>
                  </td>
                  <td>{formData.email}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Position</h3>
                  </td>
                  <td>{formData.position}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Years of experience</h3>
                  </td>
                  <td>{formData.experience}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Birthdate</h3>
                  </td>
                  <td>{formData.birthdate}</td>
                </tr>
                <tr>
                  <td>
                    <h3>Techologies</h3>
                  </td>
                  <td>
                    {formData.tech.map((el) => {
                      return el + ' ';
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    <h3>Quick summary</h3>
                  </td>
                  <td>{formData.summary}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
