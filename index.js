const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); 

const apiId = 19290869;
const apiHash = "3a276cb6dfa5cd57ed2b5e8329a051b4";
const stringSession = new StringSession(""); 

(async () => {
  console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: async () => await input.text("Please enter your number: "),
    password: async () => await input.text("Please enter your password: "),
    phoneCode: async () =>
      await input.text("Please enter the code you received: "),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");
  console.log(client.session.save());
  await client.sendMessage("me", { message: "Hello!" });
})();
