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
                            <button type="button" class="btn btn-secondary custom-btn-grey">
                                <i class="bi bi-arrow-repeat rotated-icon-light"></i> Generar nuevas recomendaciones
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
      <div class="header-section"> <!-- Contenedor principal -->
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h2>${header.title}</h2>
            <p>${header.description}</p>
          </div>
          <div class="d-flex justify-content-end">
            ${header.buttons
              .map((button) => {
                if (button.text === "Confirmar Influencer") {
                  return `
                    <button type="button" class="${button.class}">
                      Confirmar <span class="hide-on-mobile">Influencer</span>
                    </button>
                  `;
                } else {
                  return `
                    <button type="button" class="${button.class}">
                      ${button.text}
                    </button>
                  `;
                }
              })
              .join("")}
          </div>
        </div>
        <div class="header-divider"></div> <!-- Línea divisora -->
      </div>
    `;
}

function generateCard(card) {
  return `
      <div class="col-12 col-md-6 col-lg-3 mb-4">
        <div class="card" style="background-color: ${card.bgColor};">
          <div class="card-body d-flex flex-column align-items-start">
            <div class="card-icon">
              <i class="${card.icon}"></i>
            </div>
            <h5 class="card-title">${card.title}</h5>
            <p class="card-text">${card.description}</p>
            <!-- Pie de tarjeta fijo -->
            <div class="card-value-footer mt-auto">
              ${card.value} <i class="${card.icon_seg}"></i>
            </div>
          </div>
        </div>
      </div>
    `;
}

function generateInfluencersTable(influencers) {
  return `
      <div class="table-responsive">
        <table class="table table-bordered mt-4">
          <thead >
            <tr>
              <th >Influencer</th>
              <th >Redes</th>
              <th >N° servicios <i class="bi bi-arrow-down-up"></i></th>
              <th ><i class="bi bi-1-circle"></i> Valor total <i class="bi bi-arrow-down-up"></i></th>
              <th ><i class="bi bi-1-circle"></i> Cambiar</th>
              <th >Eliminar</th>
              <th >Acción</th>
            </tr>
          </thead>
          <tbody>
            ${influencers
              .map(
                (influencer) => `
                <tr>
                  <td>
                    <div class="d-flex align-items-center">
                      <img src="${influencer.photo}" alt="${
                  influencer.name
                }" class="rounded-circle me-2" style="width: 40px; height: 40px;" />
                      ${influencer.name}
                    </div>
                  </td>
                  <td>
                    ${influencer.network
                      .split(",")
                      .map(
                        (network) => `
                        <i class="bi ${getNetworkIcon(
                          network.trim()
                        )} me-2" style="color: ${getNetworkColor(
                          network.trim()
                        )}; font-size: 1.2rem;"></i>
                      `
                      )
                      .join("")}
                  </td>
                  <td>${influencer.services}</td>
                  <td>${influencer.totalValue}</td>
                  <td><button type="button" class="btn btn-outline-secondary btn-sm"><i class="bi bi-arrow-repeat rotated-icon-light"></i></button></td>
                  <td><button type="button" class="btn btn-outline-danger btn-sm"><i class="bi bi-trash"></i></button></td>
                  <td><button type="button" class="btn btn-secondary ">Revisar</button></td>
                </tr>
              `
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
}

// Función para obtener el ícono de la red social
function getNetworkIcon(network) {
  switch (network.toLowerCase()) {
    case "tiktok":
      return "bi-tiktok";
    case "facebook":
      return "bi-facebook";
    case "instagram":
      return "bi-instagram";
    default:
      return "bi-globe"; // Ícono por defecto
  }
}

// Función para obtener el color de la red social
function getNetworkColor(network) {
  switch (network.toLowerCase()) {
    case "tiktok":
      return "#000000"; // Negro (TikTok)
    case "facebook":
      return "#1877F2"; // Azul (Facebook)
    case "instagram":
      return "#E4405F"; // Rosa (Instagram)
    default:
      return "#6F6255"; // Color por defecto
  }
}

function generateSummary(summary) {
  return `
        <div class="card-seg summary-card">
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
      content: "<p>Completar brief</p>",
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
            icon_seg: "bi bi-arrow-up-right",
          },
          {
            title: "Engagement total estimado",
            description: "Participación esperada del público.",
            value: "240,772",
            icon: "bi bi-magnet rotated-icon",
            bgColor: "#EEDCEC",
            icon_seg: "bi bi-arrow-up-right",
          },
          {
            title: "CPM total estimado",
            description:
              "El CPM es cuánto pagas por mostrar tu anuncio mill veces.",
            value: "1,000",
            icon: "bi bi-binoculars",
            bgColor: "#DCF6EB",
            icon_seg: "bi bi-arrow-down-right",
          },
          {
            title: "Interacción total estimada",
            description:
              "Cuántas interacciones se esperan en total con tu anuncio.",
            value: "5,700",
            icon: "bi bi-hand-index",
            bgColor: "#FED992",
            icon_seg: "bi bi-arrow-up-right",
          },
        ],
        influencers: [
          {
            name: "@salud_ays",
            network: "TikTok, Facebook, Instagram",
            services: "3 servicios",
            totalValue: "50 CRTS",
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
          },
          {
            name: "@salud_ays",
            network: "TikTok, Facebook, Instagram",
            services: "6 servicios",
            totalValue: "90 CRTS",
            photo: "https://randomuser.me/api/portraits/men/2.jpg",
          },
          {
            name: "@salud_ays",
            network: "TikTok, Instagram",
            services: "2 servicios",
            totalValue: "40 CRTS",
            photo: "https://randomuser.me/api/portraits/men/3.jpg",
          },
          {
            name: "@salud_ays",
            network: "Facebook, Instagram",
            services: "4 servicios",
            totalValue: "35 CRTS",
            photo: "https://randomuser.me/api/portraits/men/4.jpg",
          },
          {
            name: "@salud_ays",
            network: "Facebook, Instagram",
            services: "2 servicios",
            totalValue: "80 CRTS",
            photo: "https://randomuser.me/api/portraits/men/5.jpg",
          },
          {
            name: "@salud_ays",
            network: "Instagram",
            services: "1 servicio",
            totalValue: "10 CRTS",
            photo: "https://randomuser.me/api/portraits/men/6.jpg",
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
      content: "<p>Enviar campaña</p>",
    },
  },
};
