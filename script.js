// Generate input fields
function generateMatrix(containerId, rows, cols) {
  const container = document.getElementById(containerId);
  container.style.gridTemplateColumns = `repeat(${cols}, 60px)`;
  container.innerHTML = "";
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.id = `${containerId}-${i}-${j}`;
      input.value = 0;
      container.appendChild(input);
    }
  }
}

// Read matrix values
function readMatrix(prefix, rows, cols) {
  const M = [];
  for (let i = 1; i <= rows; i++) {
    const row = [];
    for (let j = 1; j <= cols; j++) {
      const val = parseFloat(
        document.getElementById(`${prefix}-${i}-${j}`).value
      );
      if (isNaN(val)) throw new Error("Isi semua elemen");
      row.push(val);
    }
    M.push(row);
  }
  return M;
}

// Render matrix
function renderMatrix(matrix, targetId) {
  const target = document.getElementById(targetId);
  target.innerHTML = "";
  if (!matrix) {
    target.textContent = "Inputkan angka ke  ordo.";
    return;
  }
  const table = document.createElement("table");
  matrix.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((val) => {
      const td = document.createElement("td");
      td.textContent = Number(val.toFixed(2));
      tr.appendChild(td);
    });
    table.appendChild(tr);
  });
  target.appendChild(table);
}

// Basic operations
function multiplyMatrix(A, B) {
  const rA = A.length,
    cA = A[0].length,
    rB = B.length,
    cB = B[0].length;
  if (cA !== rB) return null;
  const C = Array.from({ length: rA }, () => Array(cB).fill(0));
  for (let i = 0; i < rA; i++)
    for (let j = 0; j < cB; j++)
      for (let k = 0; k < cA; k++) C[i][j] += A[i][k] * B[k][j];
  return C;
}

function inverse2x2(M) {
  const a = M[0][0],
    b = M[0][1],
    c = M[1][0],
    d = M[1][1];
  const det = a * d - b * c;
  if (Math.abs(det) < 1e-12) return null;
  return [
    [d / det, -b / det],
    [-c / det, a / det],
  ];
}

function det3x3(M) {
  const [a, b, c] = M[0];
  const [d, e, f] = M[1];
  const [g, h, i] = M[2];
  return a * (e * i - f * h) - b * (d * i - f * g) + c * (d * h - e * g);
}

// Persamaan Matriks AX = B (B: 2x2)
function calcEquation() {
  const A = readMatrix("EqA-2x2", 2, 2);
  const B = readMatrix("EqB-2x2", 2, 2);
  const inv = inverse2x2(A);
  if (!inv) {
    renderMatrix(null, "result-equation");
    return;
  }
  // X = inv(A) × B
  const X = multiplyMatrix(inv, B);
  renderMatrix(X, "result-equation");
}

// Perkalian UI handler
function calcMultiply() {
  try {
    const A = readMatrix("A-2x2", 2, 2);
    const B = readMatrix("B-2x3", 2, 3);
    const C = multiplyMatrix(A, B);
    if (!C) {
      document.getElementById("result-multiply").textContent = "Ordo matriks tidak cocok untuk perkalian.";
      return;
    }
    renderMatrix(C, "result-multiply");
  } catch (e) {
    document.getElementById("result-multiply").textContent = e.message || String(e);
  }
}

// Invers UI handler
function calcInverse() {
  try {
    const M = readMatrix("Inv-2x2", 2, 2);
    const inv = inverse2x2(M);
    if (!inv) {
      document.getElementById("result-inverse").textContent = "Matriks singular — tidak memiliki invers (det = 0).";
      return;
    }
    renderMatrix(inv, "result-inverse");
  } catch (e) {
    document.getElementById("result-inverse").textContent = e.message || String(e);
  }
}

// Determinan 3x3 UI handler
function calcDet() {
  try {
    const M = readMatrix("Det-3x3", 3, 3);
    const d = det3x3(M);
    document.getElementById("result-det").textContent = `Determinan = ${Number(d.toFixed(2))}`;
  } catch (e) {
    document.getElementById("result-det").textContent = e.message || String(e);
  }
}

// Initialize input fields
window.onload = function () {
  generateMatrix("A-2x2", 2, 2);
  generateMatrix("B-2x3", 2, 3);
  generateMatrix("Inv-2x2", 2, 2);
  generateMatrix("EqA-2x2", 2, 2);
  generateMatrix("EqB-2x2", 2, 2); // gunakan 2x2, bukan fungsi dinamis
  generateMatrix("Det-3x3", 3, 3);
};
