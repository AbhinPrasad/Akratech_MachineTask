import Dexie from "dexie";

const db = new Dexie("Users");
db.version(1).stores({
	users: "++id, name, image"
});

export default db;
