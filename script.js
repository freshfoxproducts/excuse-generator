const STRIPE_LINK = "https://buy.stripe.com/dRm7sL093bOD6X6dd24F201";

const category = document.getElementById("category");
const style = document.getElementById("style");
const customInput = document.getElementById("customInput");
const output = document.getElementById("output");
const limitText = document.getElementById("limitText");

const generateBtn = document.getElementById("generateBtn");
const unlockBtn = document.getElementById("unlockBtn");

let uses = Number(localStorage.getItem("uses")) || 0;
const isPaid = localStorage.getItem("paid") === "true";

category.addEventListener("change", () => {
  customInput.style.display =
    category.value === "custom" ? "block" : "none";
});

generateBtn.onclick = () => {
  if (!isPaid && uses >= 5) {
    window.location.href = STRIPE_LINK;
    return;
  }

  uses++;
  localStorage.setItem("uses", uses);

  output.innerHTML = "";

  const excuses = getExcuses();
  const count = isPaid ? 3 : 1;

  excuses.slice(0, count).forEach(text => {
    const div = document.createElement("div");
    div.className = "excuse";
    div.textContent = text;

    if (isPaid) {
      const btn = document.createElement("button");
      btn.textContent = "Copy";
      btn.className = "copy";
      btn.onclick = () => navigator.clipboard.writeText(text);
      div.appendChild(btn);
    }

    output.appendChild(div);
  });

  if (!isPaid) {
    limitText.textContent = `Free uses left: ${5 - uses}`;
  }
};

unlockBtn.onclick = () => {
  window.location.href = STRIPE_LINK;
};

function getExcuses() {
  const c = category.value;
  const s = style.value;
  const custom = customInput.value || "something happened";

  const base = {
    regretful: `I'm really sorry — ${custom}. It genuinely wasn't intentional.`,
    confident: `Quick heads-up: ${custom}. It's handled now.`,
    apologetic: `I messed up. ${custom}. I take full responsibility.`
  };

  return [
    base[s],
    `${base[s]} I understand if you're upset.`,
    `${base[s]} Appreciate your patience.`
  ];
}
