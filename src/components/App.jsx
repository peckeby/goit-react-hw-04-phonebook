import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { GlobalStyle } from './GlobalStyles';
import { Container } from './Container/Container.styled';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Section from './Section/Section';
import SearchBar from './SearchBar/SearchBar';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const persistedContacts = localStorage.getItem('contacts');
    if (persistedContacts) {
      return JSON.parse(persistedContacts);
    }
    return [];
  });
  const [filter, setFilter] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onHandleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'filter':
        setFilter(value.toLowerCase());
        break;
      case 'userName':
        setNameUser(value.toLowerCase());
        break;
      case 'userNumber':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const addNewContact = () => {
    setContacts(prevState => [
      ...prevState,
      {
        name: nameUser,
        id: nanoid(),
        tel: number,
      },
    ]);
  };

  const fiterChange = filter => {
    return contacts.filter(contact => contact.name.includes(filter));
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (contacts.length > 0 && fiterChange(nameUser).length > 0) {
      alert(`${nameUser} is already in contacts.`);
    } else {
      addNewContact();
    }
    setNameUser('');
    setNumber('');
  };

  const handleDelete = evt => {
    const listItem = evt.currentTarget.parentNode;
    const itemId = listItem.getAttribute('id');
    setContacts(contacts.filter(contact => contact.id !== itemId));
  };

  return (
    <>
      <Container>
        <Section title="Phonebook" />
        <Section title="Contacts">
          <ContactForm
            submitHandler={handleSubmit}
            handleChange={onHandleChange}
            nameUser={nameUser}
            number={number}
          />
          {contacts.length > 0 && (
            <>
              <SearchBar filter={filter} handleChange={onHandleChange} />
              {filter !== '' ? (
                <ContactList
                  contacts={fiterChange(filter)}
                  handleDelete={handleDelete}
                />
              ) : (
                <ContactList contacts={contacts} handleDelete={handleDelete} />
              )}
            </>
          )}
        </Section>
      </Container>
      <GlobalStyle />
    </>
  );
};
