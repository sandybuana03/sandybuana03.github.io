# sandybuana03.github.io


Jika ingin menambahkan file baru atau folder baru, cari dibagian

// File structure configuration - Update this with your actual files and folders



## Beberapa catatan tailwind css yang bisa membantu


// membuat scroll horizontal (umum dan peluang keberhasilan 50%)

overflow-x-auto w-full md:w-100


// membuat scroll horizontal + text tanpa wrap (AMPUH 100%)

whitespace-nowrap overflow-x-auto w-full md:w-100


// membuat scroll horizontal + layout vertical colom (atas ke bawah)

flex flex-col whitespace-nowrap overflow-x-auto w-full md:w-100


// mengubah menjadi layout vertical colom

flex flex-col


// 2 grid pada desktop, 1 grid di hp

<div class="grid grid-cols-1 md:grid-cols-2 gap-4">


// setting scroll horizontal dan tanpa wrap di tag css

.code-block{
	white-space: nowrap; // pake ini saja
        overflow-x: auto;
}


// membuat teks rata kiri

items-start text-left


// di hp bertumpuk (vertical colom), di computer ke samping (horizontal colom)

<div class="mt-4 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
