const datePickerDiv = document.getElementById("date-picker-div");
const startDateInput = document.getElementById("startDate");
const endDateInput = document.getElementById("endDate");
const reportFileName = document.getElementById("report-file-name");
const downloadBtn = document.getElementById("downloadBtn");
const filterBtn = document.getElementById("filterBtn");
const reportTableDiv = document.getElementById("reportTableDiv");
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
};

startDateInput.addEventListener("change", ()=> {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (startDate > currentDate || startDate > endDate) {
        startDateInput.value = ""; // Clear invalid start date
        downloadBtn.disabled = true;
        return;
    }

    if (endDateInput.value !== "" && endDate >= startDate) {
        downloadBtn.disabled = false;
    }
});

endDateInput.addEventListener("change", ()=> {
    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    if (endDate < startDate) {
        endDateInput.value = ""; // Clear invalid end date
        downloadBtn.disabled = true;
        return;
    }

    if (startDateInput.value !== "" && endDate >= startDate) {
        downloadBtn.disabled = false;
    }
});

downloadBtn.addEventListener("click", async ()=> {

    if(reportFileName.value == '') {
        (console.log("File name can't be empty"));
        return;
    };

    const startDate = new Date(startDateInput.value);
    const endDate = new Date(endDateInput.value);

    const filteredExpenses = expenseData.filter(expense => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate >= startDate && expenseDate <= endDate;
    });

    let csvContent = 'Amount,Description,Category,Date\n';

    filteredExpenses.forEach(expense => {
        const date = new Date((expense.updatedAt));
        const formattedDate = date.toLocaleDateString('en-GB', { timeZone: 'UTC' });
        csvContent += `${expense.amount},${expense.desc},${expense.category},${formattedDate}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    await uploadToS3(blob, reportFileName.value);
    
    startDateInput.value = '';
    endDateInput.value = '';
});

async function uploadToS3(file, fileName) {
    try {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        const response = await fetch('http://localhost:3000/premium/generateReport', {
            method:'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body:formData
        });

        if (response.ok) {
            console.log('File uploaded to S3 successfully');
            const url = response.url;
            const a = document.createElement('a');
            a.href = url;
            a.download = `${fileName}.csv`;
            a.click();
            await fetchReports();
            // Handle success
          } else {
            console.error('Failed to upload file to S3');
            // Handle failure
          }
    } catch (error) {
        console.log(error);
    }
}

async function fetchReports() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/premium/reports', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const reports = await response.json();
            console.log("Response => ", reports);
            displayReports(reports);
        } else {
            console.error('Failed to fetch reports');
        }
    } catch (error) {
        
    }
}

function displayReports(reports) {
    const reportsTableBody = document.getElementById('reportsTableBody');

    reports.forEach(report => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = report.fileName;
        row.appendChild(nameCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = report.generatedDate; // Replace with actual date
        row.appendChild(dateCell);

        const downloadCell = document.createElement('td');
        const downloadButton = document.createElement('button');
        downloadButton.textContent = 'Download';
        downloadButton.addEventListener('click', () => {
            // Implement download logic for the corresponding report
            downloadReport(report.url, report.fileName);
        });
        downloadCell.appendChild(downloadButton);
        row.appendChild(downloadCell);

        reportsTableBody.appendChild(row);
    });
}

function downloadReport(reportUrl, fileName) {
    // Implement the logic to download the report using the provided URL
    // For example:
    const a = document.createElement('a');
    a.href = reportUrl;
    a.download = `${fileName}.csv`; // Set desired filename
    a.click();
}

// filterBtn.addEventListener("click", ()=> {
//     const startDate = new Date(startDateInput.value);
//     //const formatedtartDate = startDate.toLocaleDateString('en-GB', { timeZone: 'UTC' });
//     const endDate = new Date (endDateInput.value);
//     //const formattedEndDate = endDate.toLocaleDateString('en-GB', { timeZone: 'UTC' });
//     console.log(expenseData);
//     const filteredExpenses = expenseData.filter(expense => {
//         const expenseDate = new Date(expense.updatedAt);
//         return expenseDate >= startDate && expenseDate <= endDate;
//     });
//     console.log(filteredExpenses);
//     filteredExpenses.forEach(element => {
//         const expense = {
//             amount: element.amount,
//             desc: element.desc,
//             category: element.category, 
//             expensesId : element.id,
//             date: element.updatedAt
//         };
//         displayExpense(expense);
//     });
//     console.log("Start Date:", startDate);
//     console.log("End Date:", endDate);
//     startDateInput.value = '';
//     endDateInput.value = '';
// });

