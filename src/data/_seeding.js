import { faker } from "@faker-js/faker";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const mediaDirPath = path.join(__dirname, "../assets/images/data");
const avatarDirPath = path.join(__dirname, "../assets/images/profile");

const mediaFiles = fs.readdirSync("../assets/images/data");
const avatarFiles = fs.readdirSync("../assets/images/profile");

const difficulties = ["Easy", "Medium", "Hard"];

const mediaNb = 50;
const avatarNb = 4;
const userNb = 4;
const trekNb = 25;

let medias = [];
let avatars = [];
let users = [];
let treks = [];

const createMedias = () => {
  for (let i = 0; i < mediaNb; i++) {
    const media = {
      id: i + 1,
      media: `${mediaDirPath}${mediaFiles[i]}`,
      // url: `../assets/images/data/${mediaFiles[i]}`,
    };

    medias.push(media);
  }

  return medias;
};

const createAvatars = () => {
  for (let i = 0; i < avatarNb; i++) {
    const avatar = {
      id: i + 1,
      url: `${avatarDirPath}${avatarFiles[i]}`,
      // url: `../assets/images/profile/${avatarFiles[i]}`,
    };

    avatars.push(avatar);
  }

  return avatars;
};

const createUsers = () => {
  for (let i = 0; i < userNb; i++) {
    const randAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const user = {
      id: i + 1,
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "1234",
      bookmarks: [],
      treksDone: [],
      avatar: randAvatar.url,
      confirmed: true,
    };

    users.push(user);
  }

  return users;
};

const createTreks = () => {
  for (let i = 0; i < trekNb; i++) {
    const userRand = users[Math.floor(Math.random() * users.length)];
    const trekMedias = [];

    for (let j = 0; j < 5; j++) {
      const mediaRand = medias[Math.floor(Math.random() * medias.length)];

      trekMedias.push(mediaRand);
    }

    const trek = {
      id: i + 1,
      name: faker.address.street(),
      region: faker.address.county(),
      startLocation: faker.address.city(),
      endLocation: faker.address.city(),
      upElev: faker.datatype.number({ min: 10, max: 1000 }),
      downElev: faker.datatype.number({ min: 10, max: 1000 }),
      difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
      duration: faker.datatype.number({ min: 1800, max: 172800 }),
      distance: faker.datatype.number({ min: 5, max: 100 }),
      description: faker.lorem.paragraphs(2, "\n\n"),
      creator: userRand,
      medias: trekMedias,
    };

    treks.push(trek);
  }

  return treks;
};

const updateUsers = () => {
  for (let user of users) {
    for (let i = 0; i < 5; i++) {
      user.bookmarks.push(treks[Math.floor(Math.random() * treks.length)].id);
    }

    for (let i = 0; i < 5; i++) {
      user.treksDone.push(treks[Math.floor(Math.random() * treks.length)].id);
    }
  }

  return users;
};

(async () => {
  const generatedMedias = createMedias(mediaNb);
  const generatedAvatars = createAvatars(avatarNb);
  let generatedUsers = createUsers(userNb);
  const generatedTreks = createTreks(trekNb);

  let mediasJson = JSON.stringify(generatedMedias);
  let avatarsJson = JSON.stringify(generatedAvatars);
  let treksJson = JSON.stringify(generatedTreks);

  generatedUsers = updateUsers();

  let usersJson = JSON.stringify(generatedUsers);

  fs.writeFile("medias.json", mediasJson, "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  fs.writeFile("avatars.json", avatarsJson, "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  fs.writeFile("users.json", usersJson, "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });

  fs.writeFile("treks.json", treksJson, "utf8", (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
})();
