import PropTypes from 'prop-types';

import {
  Form,
  FormLabel,
  FormInput,
  AddContactBtn,
} from './ContactForm.styled';

export default function ContactForm({
  submitHandler,
  handleChange,
  nameUser,
  number,
}) {
  return (
    <Form onSubmit={submitHandler}>
      <FormLabel>
        Name
        <FormInput
          type="text"
          name="userName"
          onChange={handleChange}
          value={nameUser}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </FormLabel>
      <FormLabel>
        Phone
        <FormInput
          type="tel"
          name="userNumber"
          onChange={handleChange}
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </FormLabel>
      <AddContactBtn type="submit">Add contact</AddContactBtn>
    </Form>
  );
}

ContactForm.propTypes = {
  submitHandler: PropTypes.func,
  handleChange: PropTypes.func,
  nameUser: PropTypes.string,
  number: PropTypes.string,
};
