document.getElementById('fileInput').addEventListener('change', handleFile, false);

function handleFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assuming the data is in the first sheet
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        extractStrings(jsonData);
    };

    reader.readAsArrayBuffer(file);
}

function extractStrings(data) {
    const stringList = document.getElementById('stringList');
    stringList.innerHTML = ''; // Clear the list

    data.forEach(row => {
        row.forEach(cell => {
            if (typeof cell === 'string' && cell.length >= 5) {
                const li = document.createElement('li');
                li.textContent = cell;
                stringList.appendChild(li);
            }
        });
    });
}
