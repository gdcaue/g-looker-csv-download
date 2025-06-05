const dscc = window.dscc;
const LOCAL = true;

function csvExport(data) {
  const columns = data.fields.map(field => field.name);
  const rows = data.data.map(row => 
    row.map(cell => cell.formatted)
  );

  let csvContent = [columns.join(",")];
  rows.forEach(row => {
    csvContent.push(row.join(","));
  });

  const csvBlob = new Blob([csvContent.join("\n")], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(csvBlob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function drawViz(data) {
  const container = document.getElementById('container');
  container.innerHTML = `
    <button id="exportButton" style="
      background-color: #4285F4;
      color: white;
      border: none;
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 5px;
      cursor: pointer;
    ">
      Exportar CSV
    </button>
  `;

  document.getElementById('exportButton').onclick = () => {
    csvExport(data);
  };
}

if (LOCAL) {
  dscc.subscribeToData(drawViz, {transform: dscc.tableTransform});
}
