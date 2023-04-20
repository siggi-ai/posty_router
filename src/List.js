import { useEffect, useContext } from 'react';
import { ContactContext } from './ContactContext';
import './List.css';
import ListItem from './ListItem';
import { Link } from 'react-router-dom';

  function List() {
    const [contacts, setContacts] = useContext(ContactContext);

    useEffect(() => {
        fetch('http://localhost:3000/contacts')
        .then((response) => response.json())
        .then((data) => setContacts(data));
    }, []);

    async function handleDelete(contact) {
      const url = `http://localhost:3000/contacts/${contact.id}`;
      const response = await fetch(url, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        setContacts((prevState) =>
          prevState.filter((prevContact) => prevContact.id !== contact.id),
        );
      }
    }

    return (
      <>
      <h1 style={{ textDecoration: 'underline'}}>Kontaktliste</h1>
      <table className='contactTable'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Vorname</th>
            <th>Nachname</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <ListItem 
              key={contact.id} 
              contact={contact} 
              onDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
      <Link to="/form">Neu</Link>
      </>
    );
  }
  
  export default List;