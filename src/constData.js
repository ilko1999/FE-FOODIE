export const foodMojis = [
  {
    emoji: "🍞",
    easterEgg: "",
  },
  {
    emoji: "🥞",
    easterEgg: "",
  },
  {
    emoji: "🌮",
    easterEgg: "",
  },
  {
    emoji: "🍔",
    easterEgg: "",
  },
  {
    emoji: "🥗",
    easterEgg: "Ilko hates this one 🤢",
  },
  {
    emoji: "🥘",
    easterEgg: "",
  },
  {
    emoji: "🥪",
    easterEgg: "",
  },
  {
    emoji: "🍕",
    easterEgg: "",
  },
  {
    emoji: "🍟",
    easterEgg: "Ilko`s favourite food 😋",
  },
  {
    emoji: "🍲",
    easterEgg: "",
  },
  {
    emoji: "🍣",
    easterEgg: "",
  },
  {
    emoji: "🍰",
    easterEgg: "",
  },
  {
    emoji: "🧁",
    easterEgg: "",
  },
  {
    emoji: "🍳",
    easterEgg: "",
  },
];

export function bake_cookie(name, value) {
  var cookie = [name, "=", JSON.stringify(value)].join("");
  document.cookie = cookie;
}

export function read_cookie(name) {
  var result = document.cookie.match(new RegExp(name + "=([^;]+)"));
  result && (result = JSON.parse(result[1]));
  return result;
}

export function delete_cookie(name) {
  document.cookie = name + "=; Max-Age=0";
}

export function download(e) {
  fetch(e.target.src, {
    method: "GET",
    headers: {},
  })
    .then((response) => {
      response.arrayBuffer().then(function (buffer) {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "qrCode.png");
        document.body.appendChild(link);
        link.click();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
