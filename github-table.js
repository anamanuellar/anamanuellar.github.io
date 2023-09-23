


const username = "anamanuellar";
const accessToken = mySecretToken;
const apiUrl = "https://api.github.com/graphql";

const query = `
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

fetch(apiUrl, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
})
  .then((response) => response.json())
  .then((data) => {
    const contributions = data.data.user.contributionsCollection.contributionCalendar;
    const weeks = contributions.weeks;

    // Recuperar a tabela de contribuição
    const contributionTable = document.getElementById("contribution-table");

    // Limpar a tabela (caso já exista)
    contributionTable.innerHTML = "";

    // Criar cabeçalho com os dias da semana na parte lateral esquerda
    const tbody = document.createElement("tbody");
    const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

    for (let dayIndex = 0; dayIndex < daysOfWeek.length; dayIndex++) {
      const row = document.createElement("tr");
      const th = document.createElement("th");
      th.textContent = daysOfWeek[dayIndex];
      row.appendChild(th);

      for (let weekIndex = 0; weekIndex < weeks.length; weekIndex++) {
        const week = weeks[weekIndex];
        const contributionDay = week.contributionDays[dayIndex];
        const contributionCount = contributionDay ? contributionDay.contributionCount : 0;
        const td = document.createElement("td");
        let contributionColor;
        if (contributionCount < 1) {
          contributionColor = 0;
        } else if (contributionCount < 2) {
          contributionColor = 1;
        } else if (contributionCount < 4) {
          contributionColor = 2;
        } else if (contributionCount < 8) {
          contributionColor = 3;
        } else {
          contributionColor = 4;
        }
        td.className = `color-${contributionColor}`;
        row.appendChild(td);
      }

      tbody.appendChild(row);
    }

    contributionTable.appendChild(tbody);
  })
  .catch((error) => {
    console.error("Error fetching GitHub contributions:", error);
  });


/* Modal */

const modal = document.getElementById('modal');
const opModal = document.getElementById('opModal');
const clModal = document.getElementById('clModal');
const modalBg = document.getElementById('modalBg');
const toggle = [opModal,clModal,modalBg];

for (let i = 0; i<toggle.length ; i++){
  toggle[i].addEventListener('click',function(){
    modal.classList.toggle('is-show');
  },false);
}
