const { readFile, writeFile } = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

const read = async () => JSON.parse(await readFile(contactsPath, "utf8"));

const write = (contacts) =>
	writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => await read();

const getContactById = async (contactId) => {
	const contacts = await read();

	const foundContact = contacts.find((contact) => contact.id === contactId);

	return foundContact || null;
};

const removeContact = async (contactId) => {
	const contacts = await read();

	const updateContacts = contacts.filter((contact) => contact.id !== contactId);

	await write(updateContacts);

	return "Success!";
};

const addContact = async ({ name, email, phone }) => {
	const contacts = await read();

	const newContact = { name, email, phone, id: crypto.randomUUID() };

	contacts.push(newContact);

	await write(contacts);

	return newContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
