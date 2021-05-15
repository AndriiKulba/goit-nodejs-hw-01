const { log } = require("console");
const fs = require("fs");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db", "contacts.json");

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    console.table(contacts);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const getContact = contacts.find((el) => String(el.id) === contactId);
    console.log(getContact);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    const newContacts = contacts.filter((el) => String(el.id) !== contactId);
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
      console.table(newContacts);
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;
    const contacts = JSON.parse(data);
    contacts.push({
      id: v4(),
      name: `${name}`,
      email: `${email}`,
      phone: `${phone}`,
    });
    const newContacts = contacts;
    fs.writeFile(contactsPath, JSON.stringify(newContacts), (err) => {
      if (err) throw err;
      console.table(newContacts);
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
