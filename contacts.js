import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = (contactList) =>
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));

export const listContacts = async () => {
  const contactsList = await fs.readFile(contactsPath);
  return JSON.parse(contactsList);
};

export const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find((item) => item.id === contactId);
  return contact || null;
};

export const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contactsList.splice(idx, 1);
  await updateContacts(contactsList);
  return removedContact;
};

export const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contactsList.push(newContact);
  await updateContacts(contactsList);
  return newContact;
};
