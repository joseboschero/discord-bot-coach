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
  new ButtonBuilder().setLabel("LB").setStyle("Primary").setCustomId("btnLb"),
  new ButtonBuilder().setLabel("CB").setStyle("Primary").setCustomId("btnCb"),
  new ButtonBuilder().setLabel("RB").setStyle("Primary").setCustomId("btnRb"),
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
    if (message.author.username !== "Coach de la salada") {
      console.log(message.author.username + " tageo para signear");
    }
    const menu = new ActionRowBuilder().addComponents([
      new StringSelectMenuBuilder().setCustomId("menuMsg"),
    ]);
    if (message.content.includes("list")) {
      if (message.author.username !== "Coach de la salada") {
        console.log(message.author.username + " tiro list");
      }
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
      if (message.author.username !== "Coach de la salada") {
        console.log(message.author.username + " tiro reset");
      }
      signeados.forEach((item) => (item.name = "❔"));
      btnDel.components[1].setDisabled(false);
      btnDel.components[1].setStyle("Primary");
      btnDel.components[0].setDisabled(false);
      btnDel.components[0].setStyle("Primary");
      btnDel.components[2].setDisabled(false);
      btnDel.components[2].setStyle("Primary");
      btnCm.components[1].setDisabled(false);
      btnCm.components[1].setStyle("Primary");
      btnDef.components[0].setDisabled(false);
      btnDef.components[0].setStyle("Primary");
      btnDef.components[1].setDisabled(false);
      btnDef.components[1].setStyle("Primary");
      btnDef.components[2].setDisabled(false);
      btnDef.components[2].setStyle("Primary");
      btnGk.components[1].setDisabled(false);
      btnGk.components[1].setStyle("Primary");
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `GK: ${signeados[0].name} , LB: ${signeados[1].name} , CB: ${signeados[2].name} , RB: ${signeados[3].name} , CM: ${signeados[4].name} , LW: ${signeados[5].name} , CF: ${signeados[6].name} , RW: ${signeados[7].name} `
        );
      message.channel.send({
        content: `Lista`,
        embeds: [exampleEmbed],
      });
    } else {
      const sentMessage = await message.channel.send({
        components: [btnSigns],
        ephemeral: true,
      });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "btnSign") {
    const userName = interaction.user.username;
    const index = signeados.findIndex((item) => item.name === userName);
    if (index !== -1) {
      interaction.reply({
        content: "Ya estas signeado flaco, no rompas las bolas",
        ephemeral: true,
      });
    } else {
      interaction.reply({
        content: "Selecciona la posicion",
        components: [btnDel, btnCm, btnDef, btnGk],
        ephemeral: true,
      });
      setTimeout(() => {
        interaction.deleteReply();
      }, 5000);
    }
  } else if (interaction.customId === "btnUnsign") {
    const userName = interaction.user.username;
    console.log(userName + " se quiso unsignear");
    const index = signeados.findIndex((item) => item.name === userName);

    if (index !== -1) {
      const position = signeados.filter((pos) => pos.name === userName);
      switch (position[0].pos) {
        case "btnCf":
          btnDel.components[1].setDisabled(false);
          btnDel.components[1].setStyle("Primary");
          break;
        case "btnLw":
          btnDel.components[0].setDisabled(false);
          btnDel.components[0].setStyle("Primary");
          break;
        case "btnRw":
          btnDel.components[2].setDisabled(false);
          btnDel.components[2].setStyle("Primary");
          break;
        case "btnCm":
          btnCm.components[1].setDisabled(false);
          btnCm.components[1].setStyle("Primary");
          break;
        case "btnLb":
          btnDef.components[0].setDisabled(false);
          btnDef.components[0].setStyle("Primary");
          break;
        case "btnCb":
          btnDef.components[1].setDisabled(false);
          btnDef.components[1].setStyle("Primary");
          break;
        case "btnRb":
          btnDef.components[2].setDisabled(false);
          btnDef.components[2].setStyle("Primary");
          break;
        case "btnGk":
          btnGk.components[1].setDisabled(false);
          btnGk.components[1].setStyle("Primary");
          break;
      }
      signeados[index].name = "❔";
      const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(
          `GK: ${signeados[0].name} , LB: ${signeados[1].name} , CB: ${signeados[2].name} , RB: ${signeados[3].name} , CM: ${signeados[4].name} , LW: ${signeados[5].name} , CF: ${signeados[6].name} , RW: ${signeados[7].name} `
        );
      interaction.reply({
        content: "Lista",
        embeds: [exampleEmbed],
      });
    } else {
      interaction.reply({
        content: "No estas signeado!",
        ephemeral: true,
      });
    }
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
    const position = interaction.customId;
    console.log(interaction.user.username + " signeo de " + position.slice(3));
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
