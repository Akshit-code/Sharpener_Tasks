const refreshLeadBoardBtn = document.createElement('button');
refreshLeadBoardBtn.textContent = "Refresh LeaderBoard"
const leaderboardContainer = document.querySelector('.leaderboard');
leaderBoardDiv.appendChild(refreshLeadBoardBtn);
leaderBoardDiv.appendChild(leaderboardContainer);

refreshLeadBoardBtn.addEventListener("click", getLeaderBoardDetails);

async function getLeaderBoardDetails() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/premium/getLeaderBoardDetails', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        const users = await response.json();
        const leaderboard = document.getElementById("leaderboard");
        leaderboard.style.display = "block";
        leaderboard.innerHTML="";
        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');

            const name = document.createElement('span');
            name.classList.add('name');
            name.textContent = `${user.firstName} ${user.lastName}`;
            userDiv.appendChild(name);

            const expense = document.createElement('span');
            expense.classList.add('expense');
            expense.textContent = `Total Expense: ${user.totalExpense}`;
            userDiv.appendChild(expense);

            leaderboardContainer.appendChild(userDiv);
        });
    } catch (error) {
        console.log(error);
    }
}