import { useState, useEffect, useMemo } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notiflix from 'notiflix';
import { nanoid } from 'nanoid';

const initalContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? initalContacts
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    const data = {
      id: nanoid(),
      name,
      number,
    };
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Notiflix.Notify.info(`${name} is already in contacts`);
    }

    setContacts(prevState => [...prevState, data]);
  };

  const deleteContact = contactId => {
    setContacts(state => state.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = useMemo(() => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );
  }, [contacts, filter]);

  // const visibleContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(filter)
  //   );

  return (
    <div className="container">
      <h1 className="title">Phonebook</h1>
      <ContactForm addContact={addContact}></ContactForm>
      <h2 className="subtitle">Contacts</h2>
      <Filter value={filter} onChange={e => setFilter(e.target.value)}></Filter>
      <ContactList
        contacts={visibleContacts}
        onDeleteContact={deleteContact}
      ></ContactList>
    </div>
  );
}

export default App;
