import { nanoid } from 'nanoid';
import { Component } from 'react';
import ContactList from './ContactList/ContactList';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (localStorage.getItem('contacts') === null) {
      return [];
    }
    try {
      const contacts = JSON.parse(localStorage.getItem('contacts'));
      this.setState({ contacts });
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  }

  handleSubmit = (contactName, contactNumber) => {
    this.setState(prevState => {
      const isInclude = prevState.contacts.some(
        contact => contact.name === contactName
      );
      if (isInclude) {
        alert(`${contactName} is already in contacts`);
        return prevState;
      } else {
        const newContact = {
          id: nanoid(4),
          name: contactName,
          number: contactNumber,
        };
        const contactArr = [newContact, ...prevState.contacts];
        return { contacts: contactArr };
      }
    });
  };

  handleFilterChange = e => {
    const filterValue = e.target.value;
    this.setState({ filter: filterValue });
  };

  filterByName = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  deleteContact = id => {
    const { contacts } = this.state;

    const filtered = contacts.filter(contact => contact.id !== id);

    this.setState(() => {
      return { contacts: filtered };
    });
  };

  render() {
    const filteredContacts = this.filterByName();

    return (
      <div
        style={{
          height: '100vh',
          margin: '30px',
          display: 'flex',
          flexDirection: 'column',
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handleSubmit={this.handleSubmit} />
        <h2>Contacts</h2>
        <Filter
          value={this.state.filter}
          handleChange={this.handleFilterChange}
        />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
