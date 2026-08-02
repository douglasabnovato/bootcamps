// Dados dos Palestrantes (Facilidade para atualizar mensalmente)
const speakersData = [
  {
    name: "Marcus",
    topic: "Aguardando Confirmação",
    role: "Speaker Convidado",
    img: "./assets/inspiracao/homer-2.jpg", // Substituir pelas fotos reais
  },
  {
    name: "Lucas",
    topic: "Aguardando Confirmação",
    role: "Speaker Convidado",
    img: "./assets/inspiracao/homer-1.jpg",
  },
];

// Função para renderizar palestrantes
function renderSpeakers() {
  const container = document.getElementById("speakers-container");
  container.innerHTML = speakersData
    .map(
      (speaker) => `
        <div class="speaker-card">
            <img src="${speaker.img}" alt="${speaker.name}" class="speaker-img">
            <div class="speaker-info">
                <span class="tag-speaker">${speaker.role}</span>
                <h4>${speaker.name}</h4>
                <p>Palestra: <strong>${speaker.topic}</strong></p>
            </div>
        </div>
    `,
    )
    .join("");
}

// Manipulação do Formulário
document.getElementById("event-form").addEventListener("submit", function (e) {
  e.preventDefault();

  // Captura de dados
  const formData = {
    nome: document.getElementById("name").value,
    email: document.getElementById("email").value,
    whatsapp: document.getElementById("phone").value,
    stack: document.getElementById("job").value,
  };

  console.log("Dados capturados:", formData);

  // Feedback ao usuário
  alert(
    `Obrigado, ${formData.nome}! Inscrição realizada com sucesso para o BQ Café e Tecnologia.`,
  );
  this.reset();
});

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderSpeakers();
});
