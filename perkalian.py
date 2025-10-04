def input_matrix(rows, cols):
    print(f"Masukkan elemen matriks {rows}x{cols}:")
    matrix = []
    for i in range(rows):
        row = []
        for j in range(cols):
            val = int(input(f"Elemen [{i+1},{j+1}] = "))
            row.append(val)
        matrix.append(row)
    return matrix

def multiply_matrix(A, B):
    rows_A, cols_A = len(A), len(A[0])
    rows_B, cols_B = len(B), len(B[0])

    if cols_A != rows_B:
        raise ValueError("Ukuran matriks tidak sesuai untuk perkalian")

    C = [[0 for _ in range(cols_B)] for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            for k in range(cols_A):
                C[i][j] += A[i][k] * B[k][j]
    return C

# MAIN PROGRAM
print("=== Perkalian Matriks 2x2 dengan 2x3 ===")
A = input_matrix(2, 2)  # matriks 2x2
B = input_matrix(2, 3)  # matriks 2x3

print("\nMatriks A (2x2):")
for row in A:
    print(row)

print("\nMatriks B (2x3):")
for row in B:
    print(row)

C = multiply_matrix(A, B)

print("\nHasil perkalian (2x3):")
for row in C:
    print(row)
