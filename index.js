const {
  Client,
  GatewayIntentBits,
  ButtonBuilder,
  ActionRowBuilder,
  Message,
  StringSelectMenuBuilder,
  EmbedBuilder,
} = require("discord.js");

const { token } = require("./token");

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
  { pos: "btnGk", name: "❔" },
  { pos: "btnLb", name: "❔" },
  { pos: "btnCb", name: "❔" },
  { pos: "btnRb", name: "❔" },
  { pos: "btnCm", name: "❔" },
  { pos: "btnLw", name: "❔" },
  { pos: "btnCf", name: "❔" },
  { pos: "btnRw", name: "❔" },
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
      new StringSelectMenuBuilder().setCustomId("menuMsg"),
    ]);
    if (message.content.includes("list")) {
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `GK: ${signeados[0].name} , LB: ${signeados[1].name} , CB: ${signeados[2].name} , RB: ${signeados[3].name} , CM: ${signeados[4].name} , LW: ${signeados[5].name} , CF: ${signeados[6].name} , RW: ${signeados[7].name} `
        );
      message.channel.send({
        content: `Lista`,
        embeds: [exampleEmbed],
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

    setTimeout(() => {
      interaction.deleteReply();
    }, 5000);
  } else if (interaction.customId === "btnUnsign") {
    const userName = interaction.user.username;

    const index = signeados.findIndex((item) => item.name === userName);

    if (index !== -1) {
      signeados[index].name = "❔";
    } else {
      interaction.reply({
        content: "No estas signeado!",
        ephemeral: true,
      });
    }

    interaction.reply({
      content: "Te has unsigneado correctamente",
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

    if (index !== -1) {
      signeados[index].name = userName;

      const defIds = [
        btnDef.components[0].data.custom_id,
        btnDef.components[1].data.custom_id,
        btnDef.components[2].data.custom_id,
      ];
      const delIds = [
        btnDel.components[0].data.custom_id,
        btnDel.components[1].data.custom_id,
        btnDel.components[2].data.custom_id,
      ];

      if (interaction.customId === defIds[0]) {
        btnDef.components[0].setDisabled(true);
        btnDef.components[0].setStyle("Danger");
      } else if (interaction.customId === defIds[1]) {
        btnDef.components[1].setDisabled(true);
        btnDef.components[1].setStyle("Danger");
      } else if (interaction.customId === defIds[2]) {
        btnDef.components[2].setDisabled(true);
        btnDef.components[2].setStyle("Danger");
      } else if (interaction.customId === delIds[0]) {
        btnDel.components[0].setDisabled(true);
        btnDel.components[0].setStyle("Danger");
      } else if (interaction.customId === delIds[1]) {
        btnDel.components[1].setDisabled(true);
        btnDel.components[1].setStyle("Danger");
      } else if (interaction.customId === delIds[2]) {
        btnDel.components[2].setDisabled(true);
        btnDel.components[2].setStyle("Danger");
      } else if (interaction.customId === btnGk.components[1].data.custom_id) {
        btnGk.components[1].setDisabled(true);
        btnGk.components[1].setStyle("Danger");
      } else if (interaction.customId === btnCm.components[1].data.custom_id) {
        btnCm.components[1].setDisabled(true);
        btnCm.components[1].setStyle("Danger");
      }
    }

    console.log(btnCm.components[1]);
    console.log(btnGk.components[1]);

    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle(
        `GK: ${signeados[0].name} , LB: ${signeados[1].name} , CB: ${signeados[2].name} , RB: ${signeados[3].name} , CM: ${signeados[4].name} , LW: ${signeados[5].name} , CF: ${signeados[6].name} , RW: ${signeados[7].name} `
      );
    interaction.reply({
      content: `Lista`,
      embeds: [exampleEmbed],
    });
  }
});

client.login(token);
