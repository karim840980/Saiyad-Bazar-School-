function updateWebsite() {
    // 1. Boxes se data nikalna
    const className = document.getElementById('classSelect').value;
    const subjectName = document.getElementById('subjectInput').value;
    const chapterName = document.getElementById('chapterInput').value;
    const bookLink = document.getElementById('linkInput').value;

    // 2. Check karna ki box khali toh nahi hai
    if(subjectName === "" || chapterName === "") {
        alert("Kripya Subject aur Chapter ka naam bharein!");
        return;
    }

    // 3. Data ko Save karna (LocalStorage)
    const nayaData = { className, subjectName, chapterName, bookLink };
    let list = JSON.parse(localStorage.getItem('schoolData')) || [];
    list.push(nayaData);
    localStorage.setItem('schoolData', JSON.stringify(list));

    alert("Success! " + subjectName + " website par update ho gaya.");
    
    // Form ko reset karna
    document.getElementById('addForm').reset();
}
// Page khulte hi list dikhao
window.onload = function() {
    showList();
};

function showList() {
    const listArea = document.getElementById('admin-data-list');
    const savedData = JSON.parse(localStorage.getItem('schoolData')) || [];
    
    if(savedData.length === 0) {
        listArea.innerHTML = "<p style='color:gray;'>Abhi koi subject nahi joda gaya hai.</p>";
        return;
    }

    listArea.innerHTML = ""; // Purani list clear karo

    savedData.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.style = "border-bottom: 1px solid #eee; padding: 10px 0; display: flex; justify-content: space-between; align-items: center;";
        itemDiv.innerHTML = `
            <div>
                <b style="color:#333;">${item.subjectName}</b> <span style="font-size:12px; color:#666;">(Class: ${item.className})</span><br>
                <small style="color:#888;">Chapter: ${item.chapterName}</small>
            </div>
            <button onclick="deleteItem(${index})" style="background:#e74c3c; color:white; border:none; padding:5px 10px; border-radius:4px; cursor:pointer; font-size:12px;">
                Delete
            </button>
        `;
        listArea.appendChild(itemDiv);
    });
}

// Delete karne wala logic
function deleteItem(index) {
    let list = JSON.parse(localStorage.getItem('schoolData')) || [];
    if(confirm("Kya aap sach mein ise hatana chahte hain?")) {
        list.splice(index, 1);
        localStorage.setItem('schoolData', JSON.stringify(list));
        showList(); // List refresh karo
        alert("Item delete ho gaya!");
    }
}
// --- Is line ke niche paste karein (Line 67 onwards) ---

// Ye function naye subjects ko student dashboard par dikhayega
function displayStudentData() {
    const displayArea = document.getElementById('student-list');
    if (!displayArea) return; // Agar dashboard page nahi hai toh ruk jao

    const savedData = JSON.parse(localStorage.getItem('schoolData')) || [];
    
    // Purana list saaf karke naya dikhana
    displayArea.innerHTML = ""; 

    savedData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'subject-box'; // Aapki purani design class
        
        card.innerHTML = `
            <div class="sub-icon">📚</div>
            <div class="sub-name">${item.subjectName}</div>
            <p style="font-size: 13px; color: #666;">${item.chapterName}</p>
            <a href="${item.bookLink}" target="_blank" 
               style="color: #f39c12; font-size: 14px; text-decoration: none; font-weight: bold;">
               Read Book
            </a>
        `;
        displayArea.appendChild(card);
    });
}

// Window load hone par dono kaam karein
window.onload = function() {
    if (document.getElementById('admin-data-list')) showList();
    if (document.getElementById('student-list')) displayStudentData();
};
