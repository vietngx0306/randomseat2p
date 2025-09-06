document.addEventListener('DOMContentLoaded', () => {
    const studentNamesInput = document.getElementById('studentList');
    const tableRowsInput = document.getElementById('inputRows');
    const tableColsInput = document.getElementById('inputCols');
    const randomButton = document.getElementById('randomButton');
    const classLayout = document.getElementById('classLayout');
    
    function shuffleArray(array) {
        for(let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    
    randomButton.addEventListener('click', () => {
        const studentNames = studentNamesInput.value.split('\n').filter(name => name.trim() !== '');
        const numberRows = parseInt(tableRowsInput.value);
        const numberCols = parseInt(tableColsInput.value);
        
        if (studentNames.length === 0 || isNaN(numberCols) || isNaN(numberRows) || numberCols <= 0 || numberRows <= 0) {
            alert('Số liệu không hợp lệ. Vui lòng nhập đầy đủ tên học sinh, số hàng và số cột.');
            return;
        }

        shuffleArray(studentNames);

        classLayout.innerHTML = '';
        classLayout.style.setProperty('--cols', numberCols);

        // Tạo mảng 2D để lưu trữ tên học sinh theo cột
        const studentColumns = [];
        for (let i = 0; i < numberCols; i++) {
            studentColumns.push([]);
        }

        // Phân phối học sinh vào các cột
        for (let i = 0; i < studentNames.length; i++) {
            studentColumns[i % numberCols].push(studentNames[i]);
        }

        // Xếp học sinh vào bàn, ưu tiên theo cột từ trên xuống
        let tableIndex = 0;
        for (let r = 0; r < numberRows; r++) {
            for (let c = 0; c < numberCols; c++) {
                const table = document.createElement('div');
                table.classList.add('table');
                table.innerHTML = `<p>Bàn ${tableIndex + 1}</p>`;

                const colStudents = studentColumns[c];
                const studentIndex = r * 2; // Mỗi bàn 2 người
                
                const student1 = colStudents[studentIndex];
                const student2 = colStudents[studentIndex + 1];

                if (student1 && student2) {
                    table.innerHTML += `<p class="studentt">${student1} / ${student2}</p>`;
                } else if (student1) {
                    table.innerHTML += `<p class="studentt">${student1}</p>`;
                } else {
                    table.innerHTML += `<p>Bàn trống</p>`;
                }
                
                classLayout.appendChild(table);
                tableIndex++;
            }
        }
    });
});