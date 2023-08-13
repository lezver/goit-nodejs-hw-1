const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
} = require("./contacts");
console.log("test");
const { program } = require("commander");

const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case "list":
			try {
				const contactsList = await listContacts();
				return console.log(contactsList);
			} catch (error) {
				return console.error(error);
			}

		case "get":
			try {
				const getContact = await getContactById(id);
				return console.log(getContact);
			} catch (error) {
				return console.error(error);
			}
		case "add":
			try {
				const newContact = await addContact({ name, email, phone });
				return console.log(newContact);
			} catch (error) {
				return console.error(error);
			}
		case "remove":
			try {
				const deleteContact = await removeContact(id);
				return console.log(deleteContact);
			} catch (error) {
				return console.error(error);
			}
		default:
			return console.log("Unknown aciton");
	}
};

program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const options = program.opts();

invokeAction(options).catch(console.error);
