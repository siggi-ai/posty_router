import { useContext, useState} from 'react';
import { ContactContext } from './ContactContext';
import { Link,  useNavigate } from 'react-router-dom';
const initialContact = {
    firstName: '',
    lastName: '',
    email: '',
  };

function Form() {
    const [contacts, setContacts] = useContext(ContactContext);
    const [contact, setContact] = useState(initialContact);
    const navigate =  useNavigate();

    async function handleSave(contact) {
        const response = await fetch(`http://localhost:3000/contacts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(contact),
        });
        if (response.status === 201) {
          const id = response.headers.get('Location').split('/').pop();
          setContacts((prevContacts) => [...prevContacts, {...contact, id}]);
        }
      }

    function handleChange(e) {
        const key = e.currentTarget.name;
        const value = e.currentTarget.value;
        setContact((prevContact) => ({ ...prevContact, [key]: value}));
    }

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSave(contact);
                setContact(initialContact);
                navigate('/list');
            }}
        >
            <label>
                Vorname:
                <input
                    type="text"
                    name="firstName"
                    value={contact.firstName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Nachname:
                <input
                    type="text"
                    name="lastName"
                    value={contact.lastName}
                    onChange={handleChange}
                />
            </label>
            <label>
                Email:
                <input
                    type="text"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                />
            </label>
            <button type="submit">Schreiben</button>
            <Link to="/list">Abbrechen</Link>
        </form>
    );
}

export default Form;