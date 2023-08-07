const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ActionRowBuilder,
  Message,
  SelectMenuBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const signeados = [
  { pos: "btnGk", name: "" },
  { pos: "btnLb", name: "" },
  { pos: "btnCb", name: "" },
  { pos: "btnRb", name: "" },
  { pos: "btnCm", name: "" },
  { pos: "btnLw", name: "" },
  { pos: "btnCf", name: "" },
  { pos: "btnRw", name: "" },
];

client.once("ready", () => {
  console.log("El bot está listo y conectado.");
});

const btnSigns = new ActionRowBuilder().addComponents([
  new ButtonBuilder()
    .setLabel("✅ SIGN")
    .setStyle("Success")
    .setCustomId("btnSign"),
  new ButtonBuilder()
    .setLabel("❌ UNSIGN")
    .setStyle("Danger")
    .setCustomId("btnUnsign"),
]);

const btnGk = new ActionRowBuilder().addComponents([
  new ButtonBuilder()
    .setLabel("ㅤ")
    .setDisabled(true)
    .setStyle("Secondary")
    .setCustomId("btnRight1"),
  new ButtonBuilder().setLabel("GK").setStyle("Primary").setCustomId("btnGk"),
  new ButtonBuilder()
    .setLabel("ㅤ")
    .setDisabled(true)
    .setStyle("Secondary")
    .setCustomId("btnLeft1"),
]);

const btnDef = new ActionRowBuilder().addComponents([
  new ButtonBuilder().setLabel("RB").setStyle("Primary").setCustomId("btnRb"),
  new ButtonBuilder().setLabel("CB").setStyle("Primary").setCustomId("btnCb"),
  new ButtonBuilder().setLabel("LB").setStyle("Primary").setCustomId("btnLb"),
]);

const btnCm = new ActionRowBuilder().addComponents([
  new ButtonBuilder()
    .setLabel("ㅤ")
    .setDisabled(true)
    .setStyle("Secondary")
    .setCustomId("btnRight2"),
  new ButtonBuilder().setLabel("CM").setStyle("Primary").setCustomId("btnCm"),
  new ButtonBuilder()
    .setLabel("ㅤ")
    .setDisabled(true)
    .setStyle("Secondary")
    .setCustomId("btnLeft2"),
]);

const btnDel = new ActionRowBuilder().addComponents([
  new ButtonBuilder().setLabel("LW").setStyle("Primary").setCustomId("btnLw"),
  new ButtonBuilder().setLabel("CF").setStyle("Primary").setCustomId("btnCf"),
  new ButtonBuilder().setLabel("RW").setStyle("Primary").setCustomId("btnRw"),
]);

client.on("messageCreate", async (message) => {
  if (message.mentions.has(client.user)) {
    const menu = new ActionRowBuilder().addComponents([
      new SelectMenuBuilder().setCustomId("menuMsg"),
    ]);
    if (message.content.includes("list")) {
      message.channel.send({
        content: `GK: ${signeados[0].name} , LB: ${signeados[1].name} , CB: ${signeados[2].name} , RB: ${signeados[3].name} , CM: ${signeados[4].name} , LW: ${signeados[5].name} , CF: ${signeados[6].name} , RW: ${signeados[7].name}`,
      });
    } else if (message.content.includes("reset")) {
      message.channel.send({
        content: "Lista reseteada",
      });
      signeados.forEach((item) => (item.name = ""));
    } else {
      message.channel.send({ components: [btnSigns], ephemeral: true });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "btnSign") {
    interaction.reply({
      content: "Selecciona la posicion",
      components: [btnDel, btnCm, btnDef, btnGk],
      ephemeral: true,
    });
  } else if (interaction.customId === "btnUnsign") {
    interaction.reply({
      content: "Clickeaste el boton UNSIGN!",
      ephemeral: true,
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  const userName = interaction.user.username;
  if (
    interaction.customId === "btnLw" ||
    interaction.customId === "btnRw" ||
    interaction.customId === "btnCf" ||
    interaction.customId === "btnCm" ||
    interaction.customId === "btnLb" ||
    interaction.customId === "btnCb" ||
    interaction.customId === "btnRb" ||
    interaction.customId === "btnGk"
  ) {
    const index = signeados.findIndex(
      (item) => item.pos === interaction.customId
    );
    console.log(index);
    // Verificar si el índice es válido antes de actualizar el objeto en el array
    if (index !== -1) {
      // Actualizar el objeto en el array con el nombre del usuario
      signeados[index].name = userName;
    }

    // const signeadosContent = signeados
    //   .map((item) => `${item.pos}: ${item.name}`)
    //   .join("\n");

    interaction.reply({
      content: `Hola ${userName}, Clickeaste en ${interaction.customId}`,
      ephemeral: true,
    });

    console.log(signeados);
  }
});

client.login(
  "MTEzNzg3MDg1NDYzNDYyMzEwOQ.G-gq-w.zm4Y1SsKJl1nQeAQ3NNq1MVHJrrdTAVjVUEKyg"
);
