document.addEventListener("DOMContentLoaded", function () {
  showMenu("menu2");
});

function showMenu(menuId) {
  const menuContainer = document.getElementById("menu-container");
  const menu = database.menus[menuId] || {
    content: "<p>Seleccione un menú</p>",
  };

  let content = "";

  if (typeof menu.content === "string") {
    content = menu.content;
  } else {
    content = `
            ${generateHeader(menu.content.header)}
            <div class="row mt-4">
                <div class="col-12 col-lg-9">
                    <div class="row">
                        ${menu.content.cards.map(generateCard).join("")}
                    </div>
                    <div class="d-flex justify-content-between align-items-center mt-4">
                        <div>
                            <h5>Influencers elegidos</h5>
                            <button type="button" class="btn btn-secondary me-2 custom-btn-grey">
                                <i class="bi bi-arrow-clockwise"></i> Generar nuevas recomendaciones
                            </button>
                            <button type="button" class="btn btn-secondary custom-btn-grey">
                                <i class="bi bi-pencil"></i> Ajustar detalles del brief
                            </button>
                        </div>
                        <div class="btn-container">
                            <button type="button" class="btn btn-outline-secondary me-2 small-btn active">
                                <i class="bi bi-list"></i>
                            </button>
                            <button type="button" class="btn btn-outline-secondary small-btn">
                                <i class="bi bi-grid"></i>
                            </button>
                        </div>
                    </div>
                    ${generateInfluencersTable(menu.content.influencers)}
                </div>
                <div class="col-12 col-lg-3 mt-4 mt-lg-0">
                    ${generateSummary(menu.content.summary)}
                </div>
            </div>
        `;
  }

  menuContainer.innerHTML = content;

  // Manejar la selección de botones
  const buttons = document.querySelectorAll(".btn-option");
  buttons.forEach((button) => button.classList.remove("active"));

  const activeButton = document.querySelector(
    `.btn-option[data-menu="${menuId}"]`
  );
  if (activeButton) {
    activeButton.classList.add("active");
  }
}

function generateHeader(header) {
  return `
        <div class="d-flex justify-content-between align-items-center">
            <div>
                <h2>${header.title}</h2>
                <p>${header.description}</p>
            </div>
            <div class="d-flex justify-content-end">
                ${header.buttons
                  .map(
                    (button) =>
                      `<button type="button" class="${button.class}">${button.text}</button>`
                  )
                  .join("")}
            </div>
        </div>
    `;
}

function generateCard(card) {
  return `
        <div class="col-12 col-md-6 col-lg-3 mb-4">
            <div class="card" style="background-color: ${card.bgColor};">
                <div class="card-body">
                    <div class="card-icon">
                        <i class="${card.icon}"></i>
                    </div>
                    <h5 class="card-title">${card.title}</h5>
                    <p class="card-text">${card.description}</p>
                    <p class="card-text">${card.value} <i class="bi bi-arrow-up-right"></i></p>
                </div>
            </div>
        </div>
    `;
}

function generateInfluencersTable(influencers) {
  return `
        <table class="table table-bordered mt-4">
            <thead style="background-color: #EAE6F5;">
                <tr>
                    <th>Influencer</th>
                    <th>Redes</th>
                    <th>N° servicios <i class="bi bi-arrow-up-down"></i></th>
                    <th><i class="bi bi-1-circle"></i> Valor total <i class="bi bi-arrow-up-down"></i></th>
                    <th><i class="bi bi-1-circle"></i> Cambiar</th>
                    <th>Eliminar</th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                ${influencers
                  .map(
                    (influencer) => `
                    <tr>
                        <td>${influencer.name}</td>
                        <td>${influencer.network}</td>
                        <td>${influencer.services}</td>
                        <td>${influencer.totalValue}</td>
                        <td><button type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-clockwise"></i></button></td>
                        <td><button type="button" class="btn btn-outline-danger btn-sm"><i class="bi bi-trash"></i></button></td>
                        <td><button type="button" class="btn btn-secondary btn-sm" style="background-color: #F1F1F1;">Revisar</button></td>
                    </tr>
                `
                  )
                  .join("")}
            </tbody>
        </table>
    `;
}

function generateSummary(summary) {
  return `
        <div class="card summary-card">
            <div class="card-body">
                <h5 class="card-title">Resumen</h5>
                <div class="summary-item">
                    <i class="bi bi-people"></i> Redes: <span class="summary-value">${
                      summary.networks
                    }</span>
                </div>
                <div class="summary-item">
                    <i class="bi bi-briefcase"></i> Servicios: <span class="summary-value">${
                      summary.services
                    }</span>
                </div>
                <div class="summary-item">
                    <i class="bi bi-person"></i> Influencers: <span class="summary-value">${
                      summary.influencers
                    }</span>
                </div>
                <div class="summary-total">
                    <strong>Valor Total:</strong> <span class="summary-value">${
                      summary.totalValue
                    }</span>
                </div>
                <p class="summary-description">${summary.description}</p>
                <h6>CTR</h6>
                <button type="button" class="btn btn-secondary btn-sm">${
                  summary.ctr
                }</button>
                <h6>Objetivo</h6>
                <div class="objective-tag">${summary.objective}</div>
                <h6>Intereses</h6>
                <div class="interest-tags">
                    ${summary.interests
                      .map((interest) => `<span class="tag">${interest}</span>`)
                      .join("")}
                </div>
            </div>
        </div>
    `;
}

// Data obtenida de una API o base de datos
const database = {
  menus: {
    menu1: {
      title: "Completar brief",
      content: "<p>Contenido del Menú 1: Completar brief</p>",
    },
    menu2: {
      title: "Proyección de tu campaña",
      content: {
        header: {
          title: "Proyección de tu campaña con los influencers elegidos",
          description:
            "Una Guía clara de lo que tu campaña puede lograr en alcance, interacción y ventas.",
          buttons: [
            {
              text: "Atrás",
              class: "btn btn-outline-secondary me-2 custom-btn",
            },
            {
              text: "Guardar",
              class: "btn btn-outline-primary me-2 custom-btn",
            },
            {
              text: "Confirmar Influencer",
              class: "btn btn-primary custom-btn",
            },
          ],
        },
        cards: [
          {
            title: "Alcance total estimado",
            description: "Cuantas personas podrían ver tu campaña.",
            value: "141,487",
            icon: "bi bi-eye",
            bgColor: "#A6E8CC",
          },
          {
            title: "Engagement total estimado",
            description: "Participación esperada del público.",
            value: "240,772",
            icon: "bi bi-magnet rotated-icon",
            bgColor: "#EEDCEC",
          },
          {
            title: "CPM total estimado",
            description:
              "El CPM es cuánto pagas por mostrar tu anuncio mill veces.",
            value: "1,000",
            icon: "bi bi-binoculars",
            bgColor: "#DCF6EB",
          },
          {
            title: "Interacción total estimada",
            description:
              "Cuántas interacciones se esperan en total con tu anuncio.",
            value: "5,700",
            icon: "bi bi-hand-index",
            bgColor: "#FED992",
          },
        ],
        influencers: [
          {
            name: "Influencer 1",
            network: "Instagram",
            services: 5,
            totalValue: "50 CRTS",
          },
          {
            name: "Influencer 2",
            network: "Twitter",
            services: 3,
            totalValue: "90 CRTS",
          },
          {
            name: "Influencer 3",
            network: "Facebook",
            services: 4,
            totalValue: "40 CRTS",
          },
          {
            name: "Influencer 4",
            network: "YouTube",
            services: 2,
            totalValue: "35 CRTS",
          },
          {
            name: "Influencer 5",
            network: "TikTok",
            services: 6,
            totalValue: "80 CRTS",
          },
          {
            name: "Influencer 6",
            network: "TikTok",
            services: 6,
            totalValue: "10 CRTS",
          },
        ],
        summary: {
          networks: 5,
          services: 10,
          influencers: 3,
          totalValue: "450 CRTS",
          description:
            "Este es un resumen de tu campaña con los influencers seleccionados.",
          ctr: "500 CRTS",
          objective: "Aumentar ventas y tráfico web",
          interests: ["Salud", "Ejercicio y Fitness", "Ergonomía"],
        },
      },
    },
    menu3: {
      title: "Enviar campaña",
      content: "<p>Contenido del Menú 3: Enviar campaña</p>",
    },
  },
};
