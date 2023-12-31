import * as contactService from "./contacts.js";
import { Command } from "commander";
const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contactService.listContacts();
      return console.log(contactList);
    case "get":
      const contact = await contactService.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact = await contactService.addContact(name, email, phone);
      return console.log(newContact);

    case "remove":
      const removeContact = await contactService.removeContact(id);
      return console.log(removeContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
