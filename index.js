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
			const contactsList = await listContacts();
			return console.log(contactsList);
		case "get":
			const getContact = await getContactById(id);
			return console.log(getContact);
		case "add":
			const newContact = await addContact({ name, email, phone });
			return console.log(newContact);
		case "remove":
			const deleteContact = await removeContact(id);
			return console.log(deleteContact);
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
