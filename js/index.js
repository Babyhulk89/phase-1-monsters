document.addEventListener('DOMContentLoaded', () => {
    const monsterForm = document.getElementById('monster-form');
    const monsterContainer = document.getElementById('monster-container');
    const loadMoreBtn = document.getElementById('load-more');
  
    const apiUrl = 'http://localhost:3000/monsters';
    let currentPage = 1;
  
    const fetchMonsters = async () => {
      const response = await fetch(`${apiUrl}?_limit=50&_page=${currentPage}`);
      const monsters = await response.json();
      return monsters;
    };
  
    const renderMonsters = (monsters) => {
      monsters.forEach(monster => {
        const monsterDiv = document.createElement('div');
        monsterDiv.innerHTML = `
          <h3>${monster.name}</h3>
          <p>Age: ${monster.age}</p>
          <p>Description: ${monster.description}</p>
        `;
        monsterContainer.appendChild(monsterDiv);
      });
    };
  
    const createMonster = async (name, age, description) => {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name, age, description }),
      });
  
      const newMonster = await response.json();
      return newMonster;
    };
  
    const loadMoreMonsters = async () => {
      currentPage++;
      const monsters = await fetchMonsters();
      renderMonsters(monsters);
    };
  
    monsterForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
  
      if (name && age && description) {
        const newMonster = await createMonster(name, age, description);
        renderMonsters([newMonster]);
        monsterForm.reset();
      } else {
        alert('Please fill in all fields');
      }
    });
  
    loadMoreBtn.addEventListener('click', loadMoreMonsters);
  
    // Initial load of monsters
    fetchMonsters().then(renderMonsters);
  });
  